import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const variantSchema = new mongoose.Schema({}, { collection: 'variants', strict: false });
const modelSchema = new mongoose.Schema({}, { collection: 'models', strict: false });

const Variant = mongoose.models.Variant || mongoose.model('Variant', variantSchema);
const Model = mongoose.models.Model || mongoose.model('Model', modelSchema);

const BRAND_ID = 'brand-tata-motors'; // Changed to match tata motors
const MODEL_ID = 'model-brand-tata-motors-punch';

const ENGINES = {
    'Petrol MT': {
        engineName: '1.2L Revotron',
        engineType: '3 Cylinder Revotron',
        displacement: '1199',
        maxPower: '87 Bhp',
        power: '87 Bhp',
        enginePower: '87 Bhp',
        maxTorque: '115 Nm @ 3250 rpm',
        torque: '115 Nm',
        engineTorque: '115 Nm',
        transmission: 'Manual',
        engineTransmission: '5-Speed MT',
        noOfGears: '5',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        araiMileage: '20.1 kmpl',
    },
    'Petrol AMT': {
        engineName: '1.2L Revotron',
        engineType: '3 Cylinder Revotron',
        displacement: '1199',
        maxPower: '87 Bhp',
        power: '87 Bhp',
        enginePower: '87 Bhp',
        maxTorque: '115 Nm @ 3250 rpm',
        torque: '115 Nm',
        engineTorque: '115 Nm',
        transmission: 'Automatic',
        engineTransmission: '5-Speed Smart AMT',
        noOfGears: '5',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        araiMileage: '18.97 kmpl',
    },
    'Turbo MT': {
        engineName: '1.2L Turbocharged',
        engineType: '3 Cylinder Turbocharged',
        displacement: '1199',
        maxPower: '118 Bhp',
        power: '118 Bhp',
        enginePower: '118 Bhp',
        maxTorque: '170 Nm @ 1750-4000 rpm',
        torque: '170 Nm',
        engineTorque: '170 Nm',
        transmission: 'Manual',
        engineTransmission: '6-Speed MT',
        noOfGears: '6',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        araiMileage: '17.5 kmpl',
    },
    'CNG MT': {
        engineName: '1.2L Revotron iCNG',
        engineType: '3 Cylinder iCNG',
        displacement: '1199',
        maxPower: '72 Bhp',
        power: '72 Bhp',
        enginePower: '72 Bhp',
        maxTorque: '103 Nm @ 3500 rpm',
        torque: '103 Nm',
        engineTorque: '103 Nm',
        transmission: 'Manual',
        engineTransmission: '5-Speed MT',
        noOfGears: '5',
        fuelType: 'CNG',
        fuel: 'CNG',
        araiMileage: '26.99 km/kg',
    },
    'CNG AMT': {
        engineName: '1.2L Revotron iCNG',
        engineType: '3 Cylinder iCNG',
        displacement: '1199',
        maxPower: '72 Bhp',
        power: '72 Bhp',
        enginePower: '72 Bhp',
        maxTorque: '103 Nm @ 3500 rpm',
        torque: '103 Nm',
        engineTorque: '103 Nm',
        transmission: 'Automatic',
        engineTransmission: '5-Speed AMT',
        noOfGears: '5',
        fuelType: 'CNG',
        fuel: 'CNG',
        araiMileage: '28.06 km/kg',
    }
};

const COMMON_SPECS_2026 = {
    length: '3876',
    width: '1742',
    height: '1615',
    wheelbase: '2445',
    groundClearance: '193 mm',
    seatingCapacity: '5',
    doors: '5',
    fuelTankCapacity: '37 Litres',
    emissionStandard: 'BS6 Phase 2',
    frontSuspension: 'Independent, Lower Wishbone, McPherson Strut with Coil Spring',
    rearSuspension: 'Semi-independent Twist Beam with Coil Spring and Shock Absorber',
    frontBrake: 'Disc',
    rearBrake: 'Drum',
    abs: 'Yes',
    ebd: 'Yes',
    esc: 'Yes',
    hillAssist: 'Yes',
    vsm: 'Yes / ESP',
    airbags: '6',
    airbagsLocation: 'Driver, Passenger, Side & Curtain',
    isofix: 'Yes',
    tpms: 'iTPMS',
    parkingSensors: 'Yes (Rear)',
};

function getVariantFeatures(variantName: string) {
    const isSmart = variantName.includes('Smart');
    const isPure = variantName.includes('Pure') && !variantName.includes('Pure Plus');
    const isPurePlus = variantName.includes('Pure Plus');
    const isPurePlusS = variantName.includes('Pure Plus (S)');
    const isAdventure = variantName.includes('Adventure') && !variantName.includes('Adventure (S)');
    const isAdventureS = variantName.includes('Adventure (S)');
    const isAccomplished = variantName.includes('Accomplished') && !variantName.includes('Plus');
    const isAccomplishedPlusS = variantName.includes('Accomplished Plus (S)') || variantName.includes('Accomplished Plus');

    const isCNG = variantName.includes('CNG');
    const isTurbo = variantName.includes('Turbo');
    const isAutomatic = variantName.includes('Automatic') || variantName.includes('AMT');

    let features: any = { ...COMMON_SPECS_2026 };

    // --- Honest SEO Data ---
    if (isSmart) {
        features.headerSummary = "The ultimate entry point. 6 airbags and ESP standard at a price that makes hatchbacks sweat. It's the honest, safety-first choice for city driving.";
        features.keyFeatures = "• 6 Standard Airbags\n• LED Headlamps\n• 4-inch Digital Cluster\n• ESP & Hill Hold Assist\n• Central Locking & ISOFIX";
    } else if (isPure) {
        features.headerSummary = "The practical choice. Adds rear AC vents and all power windows. It’s for the buyer who wants SUV comfort without paying for flashy tech.";
        features.keyFeatures = "• Rear AC Vents\n• Steering Mounted Controls\n• 4 Speakers\n• All Power Windows\n• Electrical Adjustable ORVMs";
    } else if (isPurePlus || isPurePlusS) {
        features.headerSummary = "The 'Connected' mid-trim. Adds the 8-inch Harman touchscreen and cruise control. It's perfectly balanced for daily commutes and family trips.";
        features.keyFeatures = "• 8-inch Touchscreen (Harman) with Wireless AA/AC\n• Reverse Camera\n• Cruise Control\n• Height Adjustable Driver Seat\n• Electric Sunroof (in S variants)";
    } else if (isAdventure || isAdventureS) {
        features.headerSummary = "Adventure ready. 360-degree camera and blind-view monitor make this the easiest micro-SUV to park. Ideal for first-time drivers.";
        features.keyFeatures = "• 360-degree Surround View Camera\n• Blind View Monitor\n• Push Button Start\n• Auto Climate Control\n• Electric Sunroof (in S variants)";
    } else if (isAccomplished || isAccomplishedPlusS) {
        features.headerSummary = "The High-Tech Flagship. 10.25-inch screen and connected LED tail-lamps transform the Punch into a premium lifestyle SUV.";
        features.keyFeatures = "• 10.25nd Touchscreen & 7nd Digital Cockpit (in Plus)\n• Connected LED Tail-lamps\n• 16nd Diamond Cut Alloy Wheels\n• Extended Thigh Support Seats\n• Wireless Smartphone Charger";
    }

    // Spec Adjustments
    if (isCNG) {
        features.bootSpace = '210 Litres (Twin Cylinder Tech)';
        features.fuelTankCapacity = '60 Litres (Water Equivalent)';
    } else {
        features.bootSpace = '366 Litres';
    }

    if (isAccomplished || isAccomplishedPlusS) {
        features.tyreSize = '195/60 R16';
        features.wheelSize = isAccomplishedPlusS ? '16-inch Diamond Cut Alloy' : '16-inch Alloy';
    } else {
        features.tyreSize = '185/70 R15';
        features.wheelSize = (isAdventure || isAdventureS) ? '15-inch Hyperstyled' : '15-inch Steel';
    }

    // Feature Flags
    features.sunroof = variantName.includes('(S)') ? 'Electric' : 'No';
    features.reverseCamera = (!isSmart && !isPure) ? 'Yes' : 'No';
    features.touchScreenInfotainment = (!isSmart && !isPure) ? (isAccomplishedPlusS ? '10.25-inch' : '8.0-inch') : 'No';
    features.androidAppleCarplay = (!isSmart && !isPure) ? 'Wireless' : 'No';
    features.threeSixtyCamera = (isAdventure || isAdventureS || isAccomplishedPlusS) ? 'Yes' : 'No';
    features.automaticHeadlamp = (isPurePlusS || isAdventureS || isAccomplished) ? 'Yes' : 'No';
    features.paddleShifter = (isAutomatic && isAccomplishedPlusS) ? 'Yes' : 'No';
    features.cruiseControl = (!isSmart && !isPure) ? 'Yes' : 'No';

    return features;
}

const VARIANTS_LIST = [
    { name: 'Smart Petrol 5 Speed Manual', price: 559900, engineType: 'Petrol MT' },
    { name: 'Pure Petrol 5 Speed Manual', price: 649900, engineType: 'Petrol MT' },
    { name: 'Pure Plus Petrol 5 Speed Manual', price: 699900, engineType: 'Petrol MT' },
    { name: 'Pure Plus (S) Petrol 5 Speed Manual', price: 734900, engineType: 'Petrol MT' },
    { name: 'Adventure Petrol 5 Speed Manual', price: 759900, engineType: 'Petrol MT' },
    { name: 'Adventure (S) Petrol 5 Speed Manual', price: 794900, engineType: 'Petrol MT' },
    { name: 'Accomplished Petrol 5 Speed Manual', price: 829900, engineType: 'Petrol MT' },
    { name: 'Adventure Petrol Turbo 6 Speed Manual', price: 829900, engineType: 'Turbo MT' },
    { name: 'Accomplished Plus (S) Petrol 5 Speed Manual', price: 899900, engineType: 'Petrol MT' },
    { name: 'Accomplished Plus (S) Petrol Turbo 6 Speed Manual', price: 979900, engineType: 'Turbo MT' },
    { name: 'Pure Plus Petrol Automatic', price: 754900, engineType: 'Petrol AMT' },
    { name: 'Pure Plus (S) Petrol Automatic', price: 789900, engineType: 'Petrol AMT' },
    { name: 'Adventure Petrol Automatic', price: 814900, engineType: 'Petrol AMT' },
    { name: 'Accomplished Plus Petrol Automatic', price: 884900, engineType: 'Petrol AMT' },
    { name: 'Accomplished Plus (S) Petrol Automatic', price: 954900, engineType: 'Petrol AMT' },
    { name: 'Smart CNG 5 Speed Manual', price: 669900, engineType: 'CNG MT' },
    { name: 'Pure CNG 5 Speed Manual', price: 749900, engineType: 'CNG MT' },
    { name: 'Pure Plus CNG 5 Speed Manual', price: 799900, engineType: 'CNG MT' },
    { name: 'Pure Plus (S) CNG 5 Speed Manual', price: 834900, engineType: 'CNG MT' },
    { name: 'Adventure CNG 5 Speed Manual', price: 859900, engineType: 'CNG MT' },
    { name: 'Adventure (S) CNG 5 Speed Manual', price: 894900, engineType: 'CNG MT' },
    { name: 'Accomplished CNG 5 Speed Manual', price: 929900, engineType: 'CNG MT' },
    { name: 'Pure Plus CNG Automatic', price: 854900, engineType: 'CNG AMT' },
    { name: 'Adventure CNG Automatic', price: 914900, engineType: 'CNG AMT' },
    { name: 'Adventure (S) CNG Automatic', price: 949900, engineType: 'CNG AMT' },
    { name: 'Accomplished Plus (S) CNG Automatic', price: 1054900, engineType: 'CNG AMT' },
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const variantsCol = mongoose.connection.db.collection('variants');

        // 1. Delete ALL existing variants for Punch (using BOTH new and old modelId for safety)
        await variantsCol.deleteMany({ modelId: 'model-brand-tata-punch' });
        const deleteResult = await variantsCol.deleteMany({ modelId: MODEL_ID });
        console.log(`✅ Deleted ${deleteResult.deletedCount} old Tata Punch variants.`);

        // 2. Add New Variants
        const variantsToInsert = VARIANTS_LIST.map(v => {
            const engineSpecs = ENGINES[v.engineType as keyof typeof ENGINES];
            const variantFeatures = getVariantFeatures(v.name);
            const variantId = `v-punch-26-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            
            return {
                id: variantId,
                name: v.name,
                brandId: BRAND_ID,
                modelId: MODEL_ID,
                price: v.price,
                status: 'active',
                ...engineSpecs,
                ...variantFeatures,
                _id: new mongoose.Types.ObjectId()
            };
        });

        await variantsCol.insertMany(variantsToInsert);
        console.log(`✅ Inserted ${variantsToInsert.length} new 2026 Tata Punch variants.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during Punch update:', error);
        process.exit(1);
    }
}

run();
