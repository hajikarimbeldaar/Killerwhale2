import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Model } from './server/db/schemas.js';

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

(async () => {
    try {
        await mongoose.connect(mongoUri!);
        const tataModels = await Model.find({ brandId: 'brand-tata-motors' })
            .select('id name isPopular popularRank topRank status')
            .lean();
        
        console.log("Tata Models Ranking Status:");
        tataModels.forEach(m => {
            console.log(`${m.name} (${m.id}): Status=${m.status}, Popular=${m.isPopular}, PopularRank=${m.popularRank}, TopRank=${m.topRank}`);
        });
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
