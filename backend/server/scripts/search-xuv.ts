import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function searchXUV() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;
        
        console.log('--- Searching for XUV Models ---');
        const models = await db.collection('models').find({ 
            $or: [
                { name: { $regex: 'XUV', $options: 'i' } }, 
                { id: { $regex: 'XUV', $options: 'i' } }
            ] 
        }).toArray();
        
        console.log('Found Models:', models.map(m => ({ 
            id: m.id, 
            name: m.name, 
            status: m.status,
            variantCount: m.variantCount 
        })));

        const variants = await db.collection('variants').find({ 
            $or: [
                { modelId: { $regex: 'XUV', $options: 'i' } },
                { id: { $regex: 'XUV', $options: 'i' } }
            ] 
        }).toArray();
        
        console.log('\n--- Variant Summary ---');
        const modelGroups = {};
        variants.forEach(v => {
            modelGroups[v.modelId] = (modelGroups[v.modelId] || 0) + 1;
        });
        console.log('Variants grouped by modelId:', modelGroups);

        await mongoose.disconnect();
    } catch (err) {
        console.error('Search failed:', err);
    }
}

searchXUV();
