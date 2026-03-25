import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
    try {
        await mongoose.connect(MONGODB_URI!);
        
        const carModelSchema = new mongoose.Schema({}, { collection: 'models', strict: false });
        const Model = mongoose.models.Model || mongoose.model('Model', carModelSchema);

        const model = await Model.findOne({ id: 'model-brand-maruti-suzuki-e-vitara' });

        if (!model) {
            console.error('❌ E-Vitara model not found');
            process.exit(1);
        }

        console.log('\n🔍 VERIFICATION RESULTS FOR:', model.get('name'));
        console.log('----------------------------------------');
        console.log('📝 SUMMARY:');
        console.log(model.get('summary'));
        console.log('\n📝 DESCRIPTION:');
        console.log(model.get('description'));
        console.log('\n📝 HEADER SEO:');
        console.log(model.get('headerSeo'));
        console.log('\n📝 PROS:');
        console.log(model.get('pros'));
        console.log('\n📝 CONS:');
        console.log(model.get('cons'));

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

run();
