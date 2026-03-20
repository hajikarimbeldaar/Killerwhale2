import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function checkIds() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        console.log('--- Models with "XUV" ---');
        const models = await db.collection('models').find({ 
            $or: [
                { id: /xuv/i },
                { name: /xuv/i }
            ] 
        }).toArray();
        
        models.forEach(m => {
            console.log(`ID: "${m.id}", Name: "${m.name}"`);
        });

        if (models.length > 0) {
            console.log('\n--- Variants for first XUV model ---');
            const variants = await db.collection('variants').find({ modelId: models[0].id }).limit(5).toArray();
            variants.forEach(v => {
                console.log(`ID: "${v.id}", modelId: "${v.modelId}", Name: "${v.name}"`);
            });
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error('Check failed:', err);
    }
}

checkIds();
