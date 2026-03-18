import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';

dotenv.config({ path: 'backend/.env' });
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";

(async () => {
    await mongoose.connect(mongoUri);
    const sierra = await Model.findOne({ id: 'model-brand-tata-sierra' }).lean();
    console.log(JSON.stringify(sierra, null, 2));
    await mongoose.disconnect();
})();
