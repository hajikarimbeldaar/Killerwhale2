import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model, Variant } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function convertToBhpString(str: string): string {
    if (!str) return str;
    
    let newStr = str.replace(/([\d\.]+)\s*PS/gi, (match, p1) => {
        let psVal = parseFloat(p1);
        let bhpVal = psVal * 0.98632;
        let roundedBhp = psVal % 1 !== 0 ? bhpVal.toFixed(1) : Math.round(bhpVal).toString();
        return `${roundedBhp} Bhp`;
    });
    
    newStr = newStr.replace(/([\d\.]+)\s*kW/gi, (match, p1) => {
        let kwVal = parseFloat(p1);
        let bhpVal = Math.round(kwVal * 1.34102);
        return `${bhpVal} Bhp`;
    });

    return newStr;
}

function convertToSimpleBhp(str: string): string {
    if (!str) return str;
    
    const psMatch = str.match(/([\d\.]+)\s*PS/i);
    if (psMatch) {
        let psVal = parseFloat(psMatch[1]);
        let bhpVal = psVal * 0.98632;
        let roundedBhp = psVal % 1 !== 0 ? bhpVal.toFixed(1) : Math.round(bhpVal).toString();
        return `${roundedBhp} Bhp`;
    }
    
    const kwMatch = str.match(/([\d\.]+)\s*kW/i);
    if (kwMatch) {
        let kwVal = parseFloat(kwMatch[1]);
        let bhpVal = Math.round(kwVal * 1.34102);
        return `${bhpVal} Bhp`;
    }
    
    if (str.toLowerCase().includes('bhp')) {
        const match = str.match(/([\d\.]+)\s*bhp/i);
        if (match) return `${match[1]} Bhp`;
    }
    
    return str;
}

async function convertAll() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    try {
        const variants = await Variant.find({}).lean(); // Use lean for faster readonly
        const variantOps = [];
        
        for (const v of variants) {
            let changed = false;
            let updateDoc: any = {};
            
            if (v.power && (v.power.includes('PS') || v.power.includes('kW') || v.power.toLowerCase().includes('bhp'))) {
                const newPower = convertToSimpleBhp(v.power);
                if (newPower !== v.power) {
                    updateDoc.power = newPower;
                    changed = true;
                }
            }
            if (v.maxPower && (v.maxPower.includes('PS') || v.maxPower.includes('kW') || v.maxPower.toLowerCase().includes('bhp'))) {
                const newMaxPower = convertToSimpleBhp(v.maxPower);
                if (newMaxPower !== v.maxPower) {
                    updateDoc.maxPower = newMaxPower;
                    changed = true;
                }
            }
            if (v.enginePower && (v.enginePower.includes('PS') || v.enginePower.includes('kW'))) {
                const newEnginePower = convertToBhpString(v.enginePower);
                if (newEnginePower !== v.enginePower) {
                    updateDoc.enginePower = newEnginePower;
                    changed = true;
                }
            }
            
            if (changed) {
                variantOps.push({
                    updateOne: {
                        filter: { _id: v._id },
                        update: { $set: updateDoc }
                    }
                });
            }
        }
        
        console.log(`Prepared ${variantOps.length} variant updates.`);
        if (variantOps.length > 0) {
            await Variant.bulkWrite(variantOps);
            console.log(`Variants bulk update complete.`);
        }
        
        const models = await Model.find({}).lean();
        const modelOps = [];
        
        for (const m of models) {
            let changed = false;
            let updatedSummaries = m.engineSummaries ? [...m.engineSummaries] : [];
            
            if (updatedSummaries.length > 0) {
                for (let i = 0; i < updatedSummaries.length; i++) {
                    const engine = updatedSummaries[i];
                    if (engine.power && (engine.power.includes('PS') || engine.power.includes('kW'))) {
                        engine.power = convertToBhpString(engine.power);
                        changed = true;
                    }
                }
            }
            
            if (changed) {
                modelOps.push({
                    updateOne: {
                        filter: { _id: m._id },
                        update: { $set: { engineSummaries: updatedSummaries as any } }
                    }
                });
            }
        }
        
        console.log(`Prepared ${modelOps.length} model updates.`);
        if (modelOps.length > 0) {
            await Model.bulkWrite(modelOps);
            console.log(`Models bulk update complete.`);
        }
        
        console.log(`✅ Converted power to standard Bhp.`);
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

convertAll();
