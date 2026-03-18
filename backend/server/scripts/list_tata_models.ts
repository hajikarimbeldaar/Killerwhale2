import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';

dotenv.config({ path: 'backend/.env' });
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";

(async () => {
    await mongoose.connect(mongoUri);
    const models = await Model.find({ brandId: 'brand-tata-motors' }).select('id name').lean();
    console.log(JSON.stringify(models, null, 2));
    await mongoose.disconnect();
})();
