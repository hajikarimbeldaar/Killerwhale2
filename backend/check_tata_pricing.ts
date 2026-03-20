import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Model } from './server/db/schemas.js';

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

(async () => {
    try {
        await mongoose.connect(mongoUri!);
        const tataModels = await Model.find({ brandId: 'brand-tata-motors' }).select('id name minPrice maxPrice status').lean();
        console.log("Tata Models Pricing Status:");
        tataModels.forEach(m => {
            console.log(`${m.name} (${m.id}): Status=${m.status}, MinPrice=${m.minPrice}, MaxPrice=${m.maxPrice}`);
        });
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
