import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Model } from '../db/schemas.js';

dotenv.config({ path: 'backend/.env' });
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";

(async () => {
    await mongoose.connect(mongoUri);
    const models = await Model.find({ brandId: { $in: ['brand-tata-motors'] } }).select('id name headerSeo').lean();
    // Also check sierra
    const sierra = await Model.findOne({ id: 'model-brand-tata-sierra' }).select('id name headerSeo').lean();
    const all = [...models];
    if (sierra) all.push(sierra);
    console.log("Total models:", all.length);
    all.forEach(m => console.log(`- ${m.name} (${m.id})`));
    await mongoose.disconnect();
})();
