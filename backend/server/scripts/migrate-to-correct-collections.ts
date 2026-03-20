import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const MONGODB_URI = process.env.MONGODB_URI;

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB.");

    // The incorrect collections
    const CarModelSchemaObj = mongoose.model('CarModel', new mongoose.Schema({}, { strict: false }), 'carmodels');
    const CarVariantSchemaObj = mongoose.model('CarVariant', new mongoose.Schema({}, { strict: false }), 'carvariants');

    // The correct collections
    const ModelSchemaObj = mongoose.model('Model', new mongoose.Schema({}, { strict: false }), 'models');
    const VariantSchemaObj = mongoose.model('Variant', new mongoose.Schema({}, { strict: false }), 'variants');

    // 1. Move Models
    console.log("Migrating models...");
    const badModels = await CarModelSchemaObj.find({ name: { $in: ['e Vitara', 'XUV 7XO'] } });
    
    for (const bad of badModels) {
      const data = bad.toObject();
      const existing = await ModelSchemaObj.findOne({ id: data.id });
      if (existing) {
         console.log(`Model ${data.name} already exists in 'models', overwriting...`);
         const idToUpdate = data._id;
         delete data._id;
         await ModelSchemaObj.updateOne({ id: data.id }, { $set: data });
         // Restore _id for variants migration later
         data._id = idToUpdate;
      } else {
         await ModelSchemaObj.create(data);
         console.log(`Migrated model: ${data.name}`);
      }
    }

    // 2. Move Variants for XUV 7XO
    console.log("Migrating variants...");
    const xuv7xo = badModels.find(m => m.name === 'XUV 7XO');
    if (xuv7xo) {
        const badVariants = await CarVariantSchemaObj.find({ modelId: xuv7xo._id });
        
        // Ensure they aren't duplicated
        await VariantSchemaObj.deleteMany({ modelId: xuv7xo._id });

        if (badVariants.length > 0) {
            const variantsData = badVariants.map((v, i) => {
                const doc = v.toObject();
                delete doc._id; // strict remove
                doc.id = "variant-xuv7xo-" + i + "-" + String(doc.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return doc;
            });
            await mongoose.connection.collection('variants').insertMany(variantsData);
            console.log(`Migrated ${variantsData.length} variants for XUV 7XO!`);
        }
    }

    // 3. Clear Cache
    const redis = require('redis');
    const client = redis.createClient();
    await client.connect();
    await client.del('cache:/api/models');
    await client.del('cache:/api/models-with-pricing');
    console.log('✅ Cleared Redis Cache!');
    
    console.log("\n🎉 Migration completed successfully.");

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit(0);
  }
};
run();
