import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model, Variant } from './backend/server/db/schemas.js';

dotenv.config({ path: 'backend/.env' });
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";

(async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to DB");
        
        const nexon = await Model.findOne({ id: 'model-brand-tata-motors-nexon' }).lean();
        console.log("Nexon Model:", JSON.stringify(nexon, null, 2));
        
        if (nexon) {
            const variants = await Variant.find({ modelId: nexon.id }).countDocuments();
            console.log("Nexon Variant Count:", variants);
            
            const activeVariants = await Variant.find({ modelId: nexon.id, status: 'active' }).countDocuments();
            console.log("Nexon Active Variant Count:", activeVariants);
        } else {
            const allTata = await Model.find({ brandId: 'brand-tata-motors' }).select('id name status').lean();
            console.log("All Tata Models:", JSON.stringify(allTata, null, 2));
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
