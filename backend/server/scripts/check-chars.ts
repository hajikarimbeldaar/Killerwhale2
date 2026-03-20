import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function checkChars() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        const model = await db.collection('models').findOne({ id: 'model-brand-mahindra-xuv700' });
        if (model) {
            console.log('Model Name: "' + model.name + '"');
            for (let i = 0; i < model.name.length; i++) {
                console.log(`Char at ${i}: '${model.name[i]}' (Code: ${model.name.charCodeAt(i)})`);
            }
            
            console.log('\nModel ID Chars:');
            for (let i = 0; i < model.id.length; i++) {
                console.log(`Char at ${i}: '${model.id[i]}' (Code: ${model.id.charCodeAt(i)})`);
            }
        }
        await mongoose.disconnect();
    } catch (err) {
        console.error('Check failed:', err);
    }
}

checkChars();
