import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';

dotenv.config({ path: 'backend/.env' });
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";

(async () => {
    await mongoose.connect(mongoUri);
    const tigorEv = await Model.findOne({ id: 'model-brand-tata-motors-tigor-ev' }).lean();
    console.log(JSON.stringify(tigorEv, null, 2));
    await mongoose.disconnect();
})();
