import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: backendEnv });

async function queryTriber() {
    console.log('Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";
    await mongoose.connect(mongoUri);

    try {
        const triber = await Model.findOne({ id: 'model-brand-renault-triber' }).lean();
        console.log('\n=== RENAULT TRIBER (TO BE REPLACED) ===');
        console.log('ID:', triber?.id);
        console.log('Name:', triber?.name);
        console.log('BrandId:', triber?.brandId);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected.');
    }
}

queryTriber();
