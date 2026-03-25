import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

import { Variant, Model } from '../db/schemas.js';

// 2026 Engine Specs
const ENGINES = {
    'Petrol MT': {
        engineName: '1.5l MPi Petrol',
        power: '113 Bhp', // 115 PS
        torque: '143.8 Nm',
        transmission: 'Manual',
        fuelType: 'Petrol',
    },
    'Petrol IVT': {
        engineName: '1.5l MPi Petrol',
        power: '113 Bhp',
        torque: '143.8 Nm',
        transmission: 'IVT Automatic',
        fuelType: 'Petrol',
    },
    'Turbo MT': {
        engineName: '1.5l Turbo GDi Petrol',
        power: '158 Bhp', // 160 PS
        torque: '253 Nm',
        transmission: 'Manual',
        fuelType: 'Petrol',
    },
    'Turbo DCT': {
        engineName: '1.5l Turbo GDi Petrol',
        power: '158 Bhp',
        torque: '253 Nm',
        transmission: '7-Speed DCT',
        fuelType: 'Petrol',
    },
};

// 2026 Variants & Prices (Estimated based on ₹10.98L - ₹18.25L range)
const VERNA_VARIANTS_2026 = [
    { name: 'EX Petrol MT', price: 1098000 },
    { name: 'S Petrol MT', price: 1215000 },
    { name: 'SX Petrol MT', price: 1320000 },
    { name: 'S Petrol IVT', price: 1350000 },
    { name: 'SX Petrol IVT', price: 1450000 },
    { name: 'SX(O) Petrol MT', price: 1495000 },
    { name: 'SX Turbo GDi Petrol MT', price: 1515000 },
    { name: 'SX(O) Petrol IVT', price: 1615000 },
    { name: 'SX Turbo GDi Petrol DCT', price: 1628000 },
    { name: 'SX(O) Turbo GDi Petrol MT', price: 1650000 },
    { name: 'SX(O) Turbo GDi Petrol DCT', price: 1825000 },
];

const COMMON_SPECS_2026 = {
    length: '4565',
    width: '1765',
    height: '1475',
    wheelbase: '2670',
    bootSpace: '528 Litres',
    globalNCAPRating: '5-Star',
    airbags: '7', // Center airbag added in 2026
    abs: 'Yes',
    ebd: 'Yes',
    esc: 'Yes',
    hillHoldAssist: 'Yes',
    tpms: 'Yes',
    isofix: 'Yes',
    steeringWheel: '3-Spoke Flat-Bottom with Morse Code H Logo',
    digitalClusterGraphics: 'Updated (Creta-spec)',
    dashcam: 'Yes (Built-in)',
    poweredTailgate: 'Yes',
    rearSunshades: 'Yes (Window)',
};

function getFeatures(variantName: string) {
    const isSXO = variantName.includes('SX(O)');
    const isSX = variantName.includes('SX');
    const isTurbo = variantName.includes('Turbo');
    
    let features: any = {
        touchScreenInfotainment: '10.25 inch',
        digitalCluster: '10.25 inch',
        curvedDisplay: 'Yes (Dual 10.25")',
        heatedSeats: 'No (Removed in 2026 Facelift)',
        airPurifier: 'No (Removed in 2026 Facelift)',
    };

    if (isSXO || isSX) {
        features.rainSensingWipers = 'Yes';
    }

    if (isSXO) {
        features.adas = 'Level 2 (20+ Functions)';
        features.ventilatedSeats = 'Yes (Front)';
        features.driverSeatAdjustment = '8-Way Powered with Memory';
        features.passengerSeatAdjustment = '4-Way Powered with Boss Mode';
        features.camera360 = 'Yes';
        features.blindSpotViewMonitor = 'Yes';
    }

    if (isTurbo) {
        features.interiorColor = 'All Black with Red Accents';
        features.alloyWheels = '16 inch Black Alloys';
    } else {
        features.alloyWheels = '16 inch Diamond Cut Alloys';
    }

    return features;
}

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const model = await Model.findOne({ name: { $regex: /Verna/i } });
        if (!model) throw new Error('Verna model not found');

        console.log(`Updating ${VERNA_VARIANTS_2026.length} variants for Verna 2026...`);

        // We delete existing variants and re-add them to keep it clean
        await Variant.deleteMany({ modelId: model.id });

        for (const v of VERNA_VARIANTS_2026) {
            const engineKey = v.name.includes('Turbo') ? (v.name.includes('DCT') ? 'Turbo DCT' : 'Turbo MT') : (v.name.includes('IVT') ? 'Petrol IVT' : 'Petrol MT');
            const specs = {
                ...COMMON_SPECS_2026,
                ...ENGINES[engineKey as keyof typeof ENGINES],
                ...getFeatures(v.name)
            };

            const variantId = `variant-hyundai-verna-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            
            await Variant.create({
                id: variantId,
                name: v.name,
                modelId: model.id,
                brandId: model.brandId,
                price: v.price,
                status: 'active',
                ...specs
            });
            console.log(`✅ Updated variant: ${v.name}`);
        }

        console.log('\n🎉 Hyundai Verna Variants updated to March 2026 standards!');

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

run();
