import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const BRAND_ID = 'brand-hyundai';
const MODEL_ID = 'model-brand-hyundai-exter';

const ENGINES = {
    'Petrol Manual': {
        engineName: '1.2l Kappa Petrol',
        engineType: '4 Cylinder, 16 Valves DOHC',
        displacement: '1197',
        maxPower: '82 Bhp',
        power: '82 Bhp',
        enginePower: '82 Bhp',
        maxTorque: '113.8 Nm @ 4000 rpm',
        torque: '113.8 Nm',
        engineTorque: '113.8 Nm',
        transmission: 'Manual',
        engineTransmission: '5-Speed Manual',
        noOfGears: '5',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        driveType: 'FWD',
        araiMileage: '19.4 kmpl',
    },
    'Petrol Automatic': {
        engineName: '1.2l Kappa Petrol',
        engineType: '4 Cylinder, 16 Valves DOHC',
        displacement: '1197',
        maxPower: '82 Bhp',
        power: '82 Bhp',
        enginePower: '82 Bhp',
        maxTorque: '113.8 Nm @ 4000 rpm',
        torque: '113.8 Nm',
        engineTorque: '113.8 Nm',
        transmission: 'Automatic',
        engineTransmission: 'Smart Auto AMT',
        noOfGears: '5',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        driveType: 'FWD',
        araiMileage: '19.2 kmpl',
    },
    'CNG Manual': {
        engineName: '1.2l Hy-CNG Duo (Bi-Fuel)',
        engineType: '4 Cylinder, 4 Valves, Kappa',
        displacement: '1197',
        maxPower: '68 Bhp',
        power: '68 Bhp',
        enginePower: '68 Bhp',
        maxTorque: '95.2 Nm @ 4000 rpm',
        torque: '95.2 Nm',
        engineTorque: '95.2 Nm',
        transmission: 'Manual',
        engineTransmission: '5-Speed Manual',
        noOfGears: '5',
        fuelType: 'CNG',
        fuel: 'CNG',
        driveType: 'FWD',
        araiMileage: '27.1 km/kg',
    }
};

const COMMON_SPECS_2026 = {
    length: '3830',
    width: '1723',
    height: '1643', // with roof rails
    wheelbase: '2450',
    groundClearance: '185 mm',
    seatingCapacity: '5',
    doors: '5',
    fuelTankCapacity: '37 Litres',
    emissionStandard: 'BS6 Phase 2',
    frontSuspension: 'McPherson strut with coil spring',
    rearSuspension: 'Coupled torsion beam axle with coil spring',
    frontBrake: 'Disc',
    rearBrake: 'Drum',
    abs: 'Yes',
    ebd: 'Yes',
    esc: 'Yes',
    hillAssist: 'Yes',
    vsm: 'Yes',
    airbags: '6',
    airbagsLocation: 'Driver, Passenger, Side & Curtain',
    isofix: 'Yes',
    speedAlertSystem: 'Yes',
    seatbeltWarning: 'Yes (All Seats)',
    parkingSensors: 'Yes (Rear)',
};

function getVariantFeatures(variantName: string) {
    const isHX2 = variantName.includes('HX 2');
    const isHX3 = variantName.includes('HX 3');
    const isHX4 = variantName.includes('HX 4') || variantName.includes('HX 4 Plus');
    const isHX6 = variantName.includes('HX 6');
    const isHX8 = variantName.includes('HX 8');
    const isHX10 = variantName.includes('HX 10');

    const isCNG = variantName.includes('CNG');
    const isAutomatic = variantName.includes('Automatic');

    let features: any = { ...COMMON_SPECS_2026 };

    if (isHX2) {
        features.headerSummary = "The absolute base. 6 airbags and ESC are standard, which is unheard of at this price point. It's honest, basic, and incredibly safe for a starter SUV.";
        features.keyFeatures = "• 6 Standard Airbags\n• Electronic Stability Control (ESC)\n• Digital Cluster with Color TFT MID\n• Central Locking\n• Front Power Windows";
    } else if (isHX3) {
        features.headerSummary = "The smart upgrade. Adds the 8-inch touchscreen and reverse camera. It makes the Exter feel like a modern car without a huge jump in price.";
        features.keyFeatures = "• 8.0-inch Touchscreen with Wireless Android Auto/Apple CarPlay\n• Rear Parking Camera with Dynamic Guidelines\n• Shark Fin Antenna\n• Driver Seat Height Adjustment\n• Steering Mounted Controls";
    } else if (isHX4) {
        features.headerSummary = "The 'Sweet Spot'. Adds LED DRLs, roof rails, and rear AC vents. This is the variant that looks like a proper SUV on the road.";
        features.keyFeatures = "• LED Positioning Lamps & DRLs\n• TPMS (Highline)\n• Roof Rails\n• Rear AC Vents\n• 15-inch Dual Tone Styled Steel Wheels";
    } else if (isHX6) {
        features.headerSummary = "Step into luxury. Electric sunroof, dashcam, and automatic climate control. It's for those who want 'wow' features in a micro-package.";
        features.keyFeatures = "• Electric Sunroof\n• Dashcam with Dual Camera\n• Automatic Climate Control\n• Projector Headlamps\n• Cruise Control (Petrol MT only)";
    } else if (isHX8) {
        features.headerSummary = "The total package. Diamond-cut alloys and a more premium cabin. For the buyer who wants the flagship look and feel.";
        features.keyFeatures = "• 15-inch Diamond Cut Alloy Wheels\n• Leatherette Wraps (Steering & Gear Knob)\n• Footwell Lighting\n• Metal Pedals\n• Rear Wiper & Washer";
    } else if (isHX10) {
        features.headerSummary = "The Absolute Flagship. Bluelink connectivity, smart key, and every single feature the Exter offers. It's as premium as a micro-SUV gets.";
        features.keyFeatures = "• 8.0-inch HD Navigation with Bluelink\n• Smart Key with Push Button Start\n• Wireless Smartphone Charger\n• Paddle Shifters (AMT)\n• Fully Integrated Connected Car Tech";
    }

    if (isCNG) {
        features.bootSpace = '225 Litres';
        features.fuelTankCapacity = '60 Litres (Water Equivalent)';
        features.spareWheels = 'Underbody Mounted';
    } else {
        features.bootSpace = '391 Litres';
    }

    if (isHX2 || isHX3) {
        features.tyreSize = '165/70 R14';
        features.wheelSize = '14-inch Steel';
        features.interiorTheme = 'Black Theme';
        features.seatUpholstery = 'Fabric';
    } else {
        features.interiorTheme = 'Dual Tone (Navy & Grey) Theme';
        features.seatUpholstery = 'Semi-leatherette';
        if (isHX8 || isHX10) {
            features.tyreSize = '175/65 R15';
            features.wheelSize = '15-inch Diamond Cut Alloy';
        } else {
            features.tyreSize = '175/65 R15';
            features.wheelSize = '15-inch Styled Steel';
        }
    }

    features.sunroof = (isHX6 || isHX8 || isHX10) ? 'Electric' : 'No';
    features.reverseCamera = (!isHX2) ? 'Yes' : 'No';
    features.touchScreenInfotainment = (!isHX2) ? 'Yes (8.0-inch)' : 'No';
    features.androidAppleCarplay = (!isHX2) ? 'Wireless' : 'No';
    features.dashcam = (isHX6 || isHX8 || isHX10) ? 'Yes (Dual Camera)' : 'No';
    features.automaticHeadlamp = (isHX6 || isHX8 || isHX10) ? 'Yes' : 'No';
    features.paddleShifter = (isAutomatic && (isHX6 || isHX8 || isHX10)) ? 'Yes' : 'No';
    features.cruiseControl = (isHX10 || (!isAutomatic && (isHX6 || isHX8))) ? 'Yes' : 'No';

    return features;
}

const VARIANTS_LIST = [
    { name: 'HX 2 Petrol Manual', price: 579900, engineType: 'Petrol Manual' },
    { name: 'HX 3 Petrol Manual', price: 623900, engineType: 'Petrol Manual' },
    { name: 'HX 4 Petrol Manual', price: 721900, engineType: 'Petrol Manual' },
    { name: 'HX 6 Petrol Manual', price: 794900, engineType: 'Petrol Manual' },
    { name: 'HX 8 Petrol Manual', price: 835900, engineType: 'Petrol Manual' },
    { name: 'HX 2 CNG Manual', price: 699900, engineType: 'CNG Manual' },
    { name: 'HX 3 CNG Manual', price: 743900, engineType: 'CNG Manual' },
    { name: 'HX 4 CNG Manual', price: 826900, engineType: 'CNG Manual' },
    { name: 'HX 6 CNG Manual', price: 893900, engineType: 'CNG Manual' },
    { name: 'HX 8 CNG Manual', price: 940900, engineType: 'CNG Manual' },
    { name: 'HX 3 Petrol Automatic', price: 690900, engineType: 'Petrol Automatic' },
    { name: 'HX 4 Plus Petrol Automatic', price: 805900, engineType: 'Petrol Automatic' },
    { name: 'HX 6 Petrol Automatic', price: 854900, engineType: 'Petrol Automatic' },
    { name: 'HX 8 Petrol Automatic', price: 907900, engineType: 'Petrol Automatic' },
    { name: 'HX 10 Petrol Automatic', price: 941900, engineType: 'Petrol Automatic' },
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const variantsCol = mongoose.connection.db.collection('variants');

        // 0. CLEANUP: Delete ANY variant with id: null to prevent dup key errors
        await variantsCol.deleteMany({ id: null });
        console.log('✅ Cleaned up any variants with id=null.');

        // 1. Delete ALL existing variants for Exter (using regex for safety if ID matches)
        const deleteResult = await variantsCol.deleteMany({ modelId: MODEL_ID });
        console.log(`✅ Deleted ${deleteResult.deletedCount} old Exter variants.`);

        // 2. Add New Variants
        const variantsToInsert = VARIANTS_LIST.map(v => {
            const engineSpecs = ENGINES[v.engineType as keyof typeof ENGINES];
            const variantFeatures = getVariantFeatures(v.name);
            const variantId = `v-exter-26-${v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            
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
        console.log(`✅ Inserted ${variantsToInsert.length} new 2026 Exter variants.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

run();
