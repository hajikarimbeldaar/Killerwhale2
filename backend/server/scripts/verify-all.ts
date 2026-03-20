import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function verifyAll() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        console.log('--- Model Verification ---');
        const xuv = await db.collection('models').findOne({ id: 'model-brand-mahindra-xuv700' });
        const evitara = await db.collection('models').findOne({ id: 'model-brand-maruti-suzuki-e-vitara' });

        console.log(`XUV 7XO Hero: ${xuv?.heroImage}`);
        console.log(`e-Vitara Hero: ${evitara?.heroImage}`);

        console.log('\n--- Variant Verification ---');
        const xuvVariants = await db.collection('variants').countDocuments({ modelId: 'model-brand-mahindra-xuv700' });
        const evitaraVariants = await db.collection('variants').countDocuments({ modelId: 'model-brand-maruti-suzuki-e-vitara' });

        console.log(`XUV 7XO Variants: ${xuvVariants}`);
        console.log(`e-Vitara Variants: ${evitaraVariants}`);

        const sampleXuv = await db.collection('variants').findOne({ modelId: 'model-brand-mahindra-xuv700' });
        console.log(`\nSample XUV Variant (${sampleXuv?.name}) Transmission: ${sampleXuv?.transmission}, Gears: ${sampleXuv?.noOfGears}`);

        const sampleEv = await db.collection('variants').findOne({ modelId: 'model-brand-maruti-suzuki-e-vitara' });
        console.log(`Sample e-Vitara Variant (${sampleEv?.name}) Battery: ${sampleEv?.evBatteryCapacity}, Range: ${sampleEv?.evRange}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error('Verification failed:', err);
    }
}

verifyAll();
