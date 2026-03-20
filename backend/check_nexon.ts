import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Model, Variant } from './server/db/schemas.js';

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

(async () => {
    try {
        if (!mongoUri) {
            console.error("MONGODB_URI not found in env");
            return;
        }
        await mongoose.connect(mongoUri);
        console.log("Connected to DB");
        
        const nexon = await Model.findOne({ id: 'model-brand-tata-motors-nexon' }).lean();
        console.log("Nexon Model:", nexon ? JSON.stringify(nexon, null, 2) : "NOT FOUND");
        
        if (nexon) {
            const variants = await Variant.find({ modelId: nexon.id }).lean();
            console.log("Nexon Variant Count:", variants.length);
            const activeVariants = variants.filter(v => v.status === 'active');
            console.log("Nexon Active Variant Count:", activeVariants.length);
        } else {
            const allTata = await Model.find({ brandId: 'brand-tata-motors' }).select('id name status').lean();
            console.log("All Tata Models in DB:", JSON.stringify(allTata, null, 2));
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
