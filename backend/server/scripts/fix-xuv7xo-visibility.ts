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
    const CarModel = mongoose.model('CarModel', new mongoose.Schema({}, { strict: false }), 'carmodels');
    
    const xuv = await CarModel.findOne({ id: "model-brand-mahindra-xuv700" });
    if (xuv) {
        await CarModel.updateOne({ id: "model-brand-mahindra-xuv700" }, { $set: {
            status: 'active',
            price: 1366000,
            lowestPrice: 1366000,
            bodyType: 'SUV',
            fuelTypes: ['Petrol', 'Diesel'],
            transmissions: ['Manual', 'Automatic'],
            seating: 7,
            isElectric: false,
            heroImage: xuv.heroImage || "",
        }});
        console.log('✅ XUV 7XO visibility fields patched successfully!');
    } else {
        console.log('❌ XUV 7XO model not found!');
    }
    
    // Invalidate Redis Cache programmatically using ioredis or redis
    const redis = require('redis');
    const client = redis.createClient();
    await client.connect();
    await client.del('cache:/api/models');
    await client.del('cache:/api/models-with-pricing');
    console.log('✅ Cleared Redis Cache!');
    
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
run();
