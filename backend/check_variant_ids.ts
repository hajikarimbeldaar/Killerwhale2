import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Model, Variant } from './server/db/schemas.js';

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

(async () => {
    try {
        await mongoose.connect(mongoUri!);
        
        const nexon = await Model.findOne({ id: 'model-brand-tata-motors-nexon' }).lean();
        if (nexon) {
            console.log("Nexon Model ID:", nexon.id);
            const oneVariant = await Variant.findOne({ modelId: nexon.id }).lean();
            if (oneVariant) {
                console.log("Found variant for Nexon:", oneVariant.name);
                console.log("Variant modelId:", oneVariant.modelId);
                console.log("Variant status:", oneVariant.status);
                console.log("Variant price:", oneVariant.price);
            } else {
                console.log("NO VARIANT FOUND FOR NEXON ID:", nexon.id);
                // Check all variants for anything that looks like Nexon
                const anyVariant = await Variant.findOne({ name: /Nexon/i }).lean();
                if (anyVariant) {
                    console.log("Found a variant with 'Nexon' in name:", anyVariant.name);
                    console.log("Its modelId is:", anyVariant.modelId);
                }
            }
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
