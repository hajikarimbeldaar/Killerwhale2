import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model, Brand as MongoBrand, Variant as MongoVariant } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: backendEnv });

async function checkBrands() {
    console.log('Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";
    await mongoose.connect(mongoUri);

    try {
        const brands = await MongoBrand.find({status: 'active'}).lean();
        console.log(`Total active brands: ${brands.length}`);

        for (const brand of brands) {
            const models = await Model.find({ brandId: brand.id, status: 'active' }).lean();
            let hasQualifyingVariant = false;

            for (const model of models) {
                const variants = await MongoVariant.find({ modelId: model.id, status: 'active' }).lean();
                for (const variant of variants) {
                    if (variant.price >= 100000) {
                        hasQualifyingVariant = true;
                        break;
                    }
                }
                if (hasQualifyingVariant) break;
            }

            console.log(`Brand: ${brand.name.padEnd(15)} | Models: ${models.length.toString().padEnd(3)} | Will Show Up: ${hasQualifyingVariant}`);
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkBrands();
