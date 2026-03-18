import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: backendEnv });

async function dumpData() {
    console.log("Starting data dump...");
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";
    await mongoose.connect(mongoUri);

    try {
        const creta = await Model.findOne({ id: { $regex: /creta/i } });
        console.log("Creta ID:", creta?.id);
        console.log("Creta Name:", creta?.name);
        console.log("Creta summary:", creta?.summary);
        console.log("Creta headerSeo:", creta?.headerSeo);

        const tatas = await Model.find({ id: { $regex: /tata/i } }, 'id name');
        console.log("Tata Models:");
        tatas.forEach(t => console.log(`- ${t.id}: ${t.name}`));

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

dumpData();
