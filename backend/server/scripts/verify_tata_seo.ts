import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function verify() {
    await mongoose.connect(process.env.MONGODB_URI!);
    try {
        const models = await Model.find({ 'brand': 'Tata Motors' });
        
        let allGood = true;
        
        for (const m of models) {
            console.log(`Verifying: ${m.name} (${m.id})`);
            
            const checks = {
                headerSeo: !!m.headerSeo,
                summary: !!m.summary,
                description: !!m.description,
                pros: !!m.pros,
                cons: !!m.cons,
                exteriorDesign: !!m.exteriorDesign,
                comfortConvenience: !!m.comfortConvenience,
                engineSummaries: m.engineSummaries && m.engineSummaries.length > 0,
                mileageData: m.mileageData && m.mileageData.length > 0,
                faqs: m.faqs && m.faqs.length > 0
            };
            
            const failedChecks = Object.entries(checks).filter(([k, v]) => !v).map(([k]) => k);
            
            if (failedChecks.length > 0) {
                console.log(`❌ FAILED: Missing fields -> ${failedChecks.join(', ')}`);
                allGood = false;
            } else {
                console.log(`✅ OK: All SEO fields populated.`);
            }
            console.log('---');
        }
        
        if (allGood) {
            console.log("\n🎊 SUCCESS: All Tata models successfully verified for SEO data.");
        } else {
            console.error("\n⚠️ WARNING: Some models are missing SEO fields.");
        }
        
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}
verify();
