import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: backendEnv });

async function verifyDuster() {
    console.log('Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";
    await mongoose.connect(mongoUri);

    try {
        const duster = await Model.findOne({ id: 'model-brand-renault-triber' }).lean();

        console.log('\n=== NEWLY UPDATED DUSTER 2026 ===');
        console.log('ID:', duster?.id);
        console.log('Name:', duster?.name);
        console.log('\nHeader SEO:', duster?.headerSeo);
        console.log('\nSummary:', duster?.summary);
        console.log('\nPros:', duster?.pros);
        console.log('\nCons:', duster?.cons);
        
    } catch (error) {
        console.error('Error verifying model:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected.');
    }
}

verifyDuster();
