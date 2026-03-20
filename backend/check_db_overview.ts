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
        
        const totalModels = await Model.countDocuments();
        console.log("Total Models in DB:", totalModels);
        
        const activeModels = await Model.countDocuments({ status: 'active' });
        console.log("Active Models in DB:", activeModels);

        const tataModels = await Model.find({ brandId: 'brand-tata-motors' }).select('id name status').lean();
        console.log("Tata Models:", JSON.stringify(tataModels, null, 2));

        const nexon = await Model.findOne({ id: 'model-brand-tata-motors-nexon' }).lean();
        if (nexon) {
            console.log("Nexon Status:", nexon.status);
            const variantCount = await Variant.countDocuments({ modelId: nexon.id });
            console.log("Nexon Variant Count:", variantCount);
            const activeVariantCount = await Variant.countDocuments({ modelId: nexon.id, status: 'active' });
            console.log("Nexon Active Variant Count:", activeVariantCount);
        } else {
            console.log("NEXON NOT FOUND BY ID: model-brand-tata-motors-nexon");
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
