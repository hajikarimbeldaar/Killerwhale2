import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function fixNames() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        // Target BOTH the old (if any remain) and the new ID
        const targetModelId = 'model-brand-mahindra-xuv-7xo';
        const oldModelId = 'model-brand-mahindra-xuv700';

        console.log(`Checking variants for model: ${targetModelId}...`);
        
        let variants = await db.collection('variants').find({ 
            $or: [
                { modelId: targetModelId },
                { modelId: oldModelId }
            ] 
        }).toArray();

        console.log(`Found ${variants.length} variants to process.`);

        for (const variant of variants) {
            const oldVariantId = variant.id;
            // Robust regex to replace 'xuv7xo-N', 'xuv700', 'xuv7x0' with 'xuv-7xo'
            const newVariantId = oldVariantId
                .replace(/xuv7xo-[0-9]+/g, 'xuv-7xo')
                .replace(/xuv700/g, 'xuv-7xo')
                .replace(/xuv7x0/g, 'xuv-7xo');
            
            await db.collection('variants').updateOne(
                { _id: variant._id },
                { 
                    $set: { 
                        id: newVariantId,
                        modelId: targetModelId 
                    } 
                }
            );
            console.log(`Updated variant: ${oldVariantId} -> ${newVariantId}`);
        }

        console.log('Fix completed successfully!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Fix failed:', err);
    }
}

fixNames();
