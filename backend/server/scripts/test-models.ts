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
    const db = mongoose.connection.db;
    
    // Check XUV 7XO vs Thar
    const xuv = await db.collection('models').findOne({ id: 'model-brand-mahindra-xuv700' });
    console.log('\n--- Full Model Dump ---');
    console.log(JSON.stringify(xuv, null, 2));

    const vCount = await db.collection('variants').countDocuments({ modelId: 'model-brand-mahindra-xuv700' });
    console.log('\n--- Variant Info ---');
    console.log('Total variants for this modelId:', vCount);

    const sampleVariant = await db.collection('variants').findOne({ modelId: 'model-brand-mahindra-xuv700' });
    if (sampleVariant) {
        console.log('\n--- Sample Variant Dump ---');
        console.log(JSON.stringify(sampleVariant, null, 2));
    } else {
        console.log('No variants found for this modelId string!');
    }
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    process.exit(0);
  }
};
run();
