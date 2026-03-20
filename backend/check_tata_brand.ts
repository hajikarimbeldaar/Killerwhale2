import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Brand } from './server/db/schemas.js';

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

(async () => {
    try {
        await mongoose.connect(mongoUri!);
        const tata = await Brand.findOne({ id: 'brand-tata-motors' }).lean();
        console.log("Tata Brand:", JSON.stringify(tata, null, 2));
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
})();
