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
    if (!db) throw new Error("DB connection failed");

    // 1. Fix Models
    console.log("Fixing XUV 7XO and e Vitara in models...");
    await db.collection('models').updateOne(
        { id: 'model-brand-mahindra-xuv700' },
        { $set: { brandId: 'brand-mahindra' } }
    );
    await db.collection('models').updateOne(
        { id: 'model-brand-maruti-suzuki-e-vitara' },
        { $set: { brandId: 'brand-maruti-suzuki' } }
    );

    // 2. Fix XUV 7XO Variants
    console.log("Fixing variants assigned to XUV 7XO...");
    const xuv7xoObjectId = new mongoose.Types.ObjectId('69bda3d00cda93d813d106e5'); // The original modelId we used in variants
    
    // Convert all variants pointing to this ObjectId to point to the string ID
    const updateResult = await db.collection('variants').updateMany(
        { modelId: xuv7xoObjectId },
        { $set: { 
            modelId: 'model-brand-mahindra-xuv700',
            brandId: 'brand-mahindra' 
        }}
    );
    console.log('Fixed variants matched/modified:', updateResult.matchedCount, updateResult.modifiedCount);

    // Some variants might have been migrated with an ObjectId object reference that matches a string lookup? No, let's just update by name prefix just in case.
    const fallbackUpdate = await db.collection('variants').updateMany(
        { id: { $regex: /^variant-xuv7xo/ } },
        { $set: { 
            modelId: 'model-brand-mahindra-xuv700',
            brandId: 'brand-mahindra' 
        }}
    );
    console.log('Fallback variants matched/modified:', fallbackUpdate.matchedCount, fallbackUpdate.modifiedCount);

    // 3. Clear Cache
    try {
        const { createClient } = await import('redis');
        const client = createClient();
        await client.connect();
        await client.del('cache:/api/models');
        await client.del('cache:/api/models-with-pricing');
        console.log('✅ Cleared Redis Cache!');
    } catch (e) {
        console.log('Redis clearing failed (probably not running or lib missing), skipping...');
    }
    
  } catch (error) {
    console.error("Fix failed:", error);
  } finally {
    process.exit(0);
  }
};
run();
