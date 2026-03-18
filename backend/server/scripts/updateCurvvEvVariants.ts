/**
 * Update Tata Curvv EV Variants
 * Applies standard Bhp and formats EVs natively.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Variant, Model } from '../db/schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENGINES = {
    '45 kWh': {
        engineName: 'Electric Motor',
        engineType: 'Permanent Magnet Synchronous Motor',
        power: '148 Bhp',
        maxPower: '148 Bhp',
        enginePower: '148 Bhp',
        torque: '215 Nm',
        engineTorque: '215 Nm',
        fuelType: 'Electric',
        fuel: 'Electric',
        transmission: 'Automatic',
        engineTransmission: 'Automatic',
        driveType: 'FWD',
        noOfGears: '1',
        engineSpeed: '1 Speed',
        
        batteryCapacity: '45.0 kWh',
        electricRange: '430 km',
        range: '430 km',
        chargingTime: '6.5 Hrs (7.2kW AC Fast Charger)',
        fastChargingTime: '40 Min (10%-80% DC Fast Charger)',
        fastCharging: 'Yes',
        chargerType: '7.2 kW AC Wall Box',
        acceleration: '9.0 Sec (0-100 km/h)',
    },
    '55 kWh': {
        engineName: 'Electric Motor',
        engineType: 'Permanent Magnet Synchronous Motor',
        power: '165 Bhp',
        maxPower: '165 Bhp',
        enginePower: '165 Bhp',
        torque: '215 Nm',
        engineTorque: '215 Nm',
        fuelType: 'Electric',
        fuel: 'Electric',
        transmission: 'Automatic',
        engineTransmission: 'Automatic',
        driveType: 'FWD',
        noOfGears: '1',
        engineSpeed: '1 Speed',
        
        batteryCapacity: '55.0 kWh',
        electricRange: '502 km',
        range: '502 km',
        chargingTime: '7.9 Hrs (7.2kW AC Fast Charger)',
        fastChargingTime: '40 Min (10%-80% DC Fast Charger)',
        fastCharging: 'Yes',
        chargerType: '7.2 kW AC Wall Box',
        acceleration: '8.6 Sec (0-100 km/h)',
    }
};

const COMMON_SPECS = {
    length: '4310',
    width: '1810',
    height: '1637',
    wheelbase: '2560',
    bootSpace: '500 Litres',
    seatingCapacity: '5',
    doors: '5',
    frontSuspension: 'Independent McPherson Strut with Coil Spring',
    rearSuspension: 'Twist Beam with Dual Path Strut',
    frontBrake: 'Disc',
    rearBrake: 'Disc',
    discBrakes: 'Front & Rear with i-VBAC',
    drivingModes: 'Multi Drive Modes - Eco, City & Sport',
    paddleShifter: 'Yes (Paddle Shifters to Control Regen Modes)',
    regenerativeBraking: 'Yes (Multi-Mode 4 Levels)',
    emissionStandard: 'Zero Tailpipe Emission',
};

function getVariantFeatures(variantName: string) {
    let features: Record<string, any> = {};
    const nameUpper = variantName.toUpperCase();
    
    // Engine detection (affecting ground clearance, V2V/V2L)
    const is55 = nameUpper.includes('55');
    const is45 = nameUpper.includes('45');
    
    // Trim level detection (hierarchical)
    const isEmpoweredPlusA = nameUpper.includes('EMPOWERED PLUS A') || nameUpper.includes('EMPOWERED+ A');
    const isEmpoweredPlus = isEmpoweredPlusA || nameUpper.includes('EMPOWERED PLUS') || nameUpper.includes('EMPOWERED+');
    const isAccomplishedPlusS = isEmpoweredPlus || nameUpper.includes('ACCOMPLISHED PLUS (S)');
    const isAccomplished_ = isAccomplishedPlusS || nameUpper.includes('ACCOMPLISHED');
    const isCreative = true; // Base variant in this list
    
    const isDark = nameUpper.includes('DARK EDITION');
    
    features.groundClearance = is55 ? '186' : '190';
    
    // V2V and V2L (Only on Empowered+ and above which are also 55kWh only according to table but we tie to Empowered+)
    if (isEmpoweredPlus) {
        features.v2l = 'Yes (3.3 kVA)';
        features.v2v = 'Yes (5 kVA)';
    }

    // BASE (CREATIVE)
    features.airbags = '6 Airbags';
    features.daytimeRunningLights = 'Smart Digital DRLs';
    features.drl = 'Yes';
    features.headLights = 'LED Headlamps';
    features.headlights = 'LED';
    features.outsideDoorHandles = 'Flush Door Handles';
    features.gearShifter = 'Smart Digital Shifter';
    features.steeringWheelType = 'Smart Digital Steering Wheel';
    features.electronicStabilityProgram = 'ESP with i-VBAC';
    features.esc = 'Yes';
    features.driverDozeOffAlert = 'Yes';
    features.electricParkingBrake = 'Yes (with Auto Hold)';
    features.reverseCamera = 'Camera & Sensor Based Reverse Park Assist';
    features.parkingCamera = 'Rear';
    features.touchScreenInfotainment = '17.78 cm (7") Touchscreen Infotainment by HARMAN';
    features.infotainmentScreen = '7 inch Touchscreen';
    features.instrumentCluster = '17.78 cm (7") TFT Instrument Cluster';
    features.androidAppleCarplay = 'Yes';
    features.speakers = '4 Speakers + 2 Tweeters';
    features.tweeters = '2 Tweeters';
    features.airConditioning = 'Automatic';
    features.climateControl = 'Fully Automatic Temperature Control (FATC)';
    features.cruiseControl = 'Yes';
    features.keylessEntry = 'Push Entry Push Start (PEPS)';
    features.pushButtonStart = 'Yes';
    features.ignition = 'Push Button Start';
    features.powerWindows = 'All Doors';
    features.rearACVents = 'Yes';
    features.outsideRearViewMirrors = 'Electric ORVM';
    features.orvm = 'Electric Adjust';
    features.driverSeatAdjustment = '6 Way Adjustable Driver Seat';
    features.airPurifier = 'Yes';
    features.tyrePressureMonitor = 'Yes (i-TPMS)';
    features.connectedCarTech = 'iRA.ev & Smart Watch Connectivity';
    features.voiceCommands = 'Multiple Voice Assistants (Native, Siri, Google Assistant)';
    
    // Wheels for Creative
    features.wheelSize = '17 inch';
    features.tyreSize = '215/60 R17';
    features.alloyWheels = '17" Hyperstyle Steel Wheels';
    
    // ACCOMPLISHED (over Creative)
    if (isAccomplished_) {
        features.headLights = 'LED Projector Headlamps';
        features.headlights = 'LED Projector';
        features.tailLights = 'Centre Position Lamp and Connected Tail Lamps';
        features.tailLight = 'Connected LED';
        features.turnIndicators = 'Sequential Indicators';
        features.frontFogLights = 'Front Fog Lamps with Cornering Function';
        features.fogLights = 'Yes (LED with Cornering)';
        features.alloyWheels = 'R17 Alloy Wheels with Aero Inserts';
        features.outsideRearViewMirrors = 'Electric ORVM with Autofold';
        features.orvm = 'Auto Fold ORVM';
        features.touchScreenInfotainment = '26.03 cm (10.25") Cinematic Touchscreen Infotainment by HARMAN';
        features.infotainmentScreen = '10.25 inch HD Touchscreen';
        features.instrumentCluster = '26.03 cm (10.25") Digital Cockpit';
        features.navigation = 'Navigation in Cockpit - Driver View Maps';
        features.androidAppleCarplay = 'Yes (Wireless over WiFi)';
        features.speakers = '4 Speakers + 4 Tweeters';
        features.tweeters = '4 Tweeters';
        features.parkingCamera = 'HD Rear Camera';
        features.reverseCamera = 'HD Camera Based Reverse Park Assist';
        features.chargingPorts = 'Front & Rear Fast Charge C Type 45W';
        features.usbCChargingPorts = 'Yes (45W Fast Charging)';
        features.cooledGlovebox = 'Cooled & Illuminated Glove Box';
        features.seatUpholstery = 'Leatherette Upholstery';
        features.steeringWheelTrim = 'Leatherette Wrapped Steering Wheel';
        features.frontArmrest = 'Yes';
        features.voiceCommands = 'Alexa Voice Assistant Added';
    }
    
    // ACCOMPLISHED+ S (over Accomplished)
    if (isAccomplishedPlusS) {
        features.surroundViewMonitor = '360° 3D Surround View Camera System';
        features.parkingCamera = '360 View';
        features.blindSpotMonitor = 'Blind Spot View Monitor';
        features.parkingSensor = 'Front & Rear Parking Sensors';
        features.parkingSensors = 'Front & Rear';
        features.sunroof = 'Panoramic Sunroof';
        features.appsSuite = 'Arcade.ev App Suite';
        features.audioModes = 'JBL Sound Modes';
        features.wirelessCharging = 'Wireless Smartphone Charger';
        features.coolingTech = 'Express Cooling';
        features.rainSensingWipers = 'Yes';
        features.automaticHeadlamp = 'Yes';
        features.rearWindshieldDefogger = 'Automatic Defogger';
    }
    
    // EMPOWERED+ (over Accomplished+ S)
    if (isEmpoweredPlus) {
        features.welcomeAnimation = 'Smart Digital Lights (Welcome & Goodbye Sequence, Charging Indicator)';
        features.wheelSize = '18 inch';
        features.tyreSize = '215/55 R18';
        features.alloyWheels = 'R18 Alloy Wheels with Aero Inserts';
        features.ambientLighting = 'Multi Mood Ambient Lighting';
        features.sunroof = 'Voice assisted Panoramic Sunroof with Mood lighting';
        features.driverSeatAdjustment = '6 Way Power Adjustable Driver Seat';
        features.seatsAdjustment = 'Driver: Powered 6-Way, Co-Driver: Manual 6-Way';
        features.passengerSeatAdjustment = '6 Way Adjustable Co-Driver Seat';
        features.splitRearSeat = '60:40 Rear Split Seats with Centre Armrest';
        features.touchScreenInfotainment = '31.24 cm (12.3") Cinematic Touchscreen Infotainment by HARMAN';
        features.infotainmentScreen = '12.3 inch HD Touchscreen';
        features.audioSystem = 'JBL Cinematic Sound System (4 Speakers + 4 Tweeters + Subwoofer)';
        features.subwoofers = '1 Subwoofer';
        features.avas = 'Acoustic Vehicle Alert System (AVAS)';
        features.airPurifier = 'Air Purifier with AQI Display';
        features.insideRearViewMirror = 'Auto Dimming IRVM';
        features.ventilatedSeats = 'Front Seats Ventilation';
        features.rearSeatRecline = '2 Stage Rear Seat Recline';
        features.frunk = 'Yes (11.6 Litres)';
    }
    
    // EMPOWERED+ A (over Empowered+)
    if (isEmpoweredPlusA) {
        features.adasLevel = 'Level 2';
        features.adasFeatures = 'Adaptive Cruise Control with Stop & Go, Lane Departure Warning, Lane Keep Assist, BSD, BSM, 360 Camera, Lane Change Alert, Adaptive Steering Assist, FCW, AEB (Vehicle, Pedestrian, Cyclist, Junction), HBA, TSR, OSA, RCTA, RCW, Door Open Alert, Driver Doze-off Alert';
        features.blindSpotMonitor = 'Yes (BSD Radar based + BSM Camera based)';
        features.sosFunction = 'SOS Call';
        features.electricTailgate = 'Powered Tailgate with Gesture Activation';
    }

    // Header Summary & SEO Description Logic
    if (!isAccomplished_) { 
        features.headerSummary = `The Tata Curvv EV ${variantName} is the feature-packed entry variant into Tata's premium EV SUV Coupe lineup, built on the advanced acti.ev platform.`;
        features.description = `The base ${variantName} sets a high benchmark with 6 airbags, all-wheel disc brakes with i-VBAC, multi-drive modes with regen paddles, and connected car features standard.`;
        features.keyFeatures = '6 Airbags, V2L Compatible, Flush Door Handles, Regeneration Paddles';
        features.isValueForMoney = true;
    } else if (isAccomplished_ && !isAccomplishedPlusS) {
        features.headerSummary = `The Tata Curvv EV ${variantName} upgrades the experience with sequential LEDs, larger 10.25-inch infotainment, and aero-insert alloy wheels.`;
        features.description = `Moving up to the ${variantName} introduces cinematic 10.25-inch HARMAN displays for both infotainment and driver dials, supported by smart navigation mapping and robust V2L battery architecture.`;
        features.keyFeatures = '10.25" Cinematic Screen, LED Projectors, Wireless CarPlay, Leatherette';
        features.isValueForMoney = true;
    } else if (isAccomplishedPlusS && !isEmpoweredPlus) {
        features.headerSummary = `The Tata Curvv EV ${variantName} hits the sweet spot with a panoramic sunroof, 360-degree cameras, and Arcade.ev apps.`;
        features.description = `The mid-to-high ${variantName} comes loaded with lifestyle essentials like a voice-assisted panoramic sunroof, 360-degree 3D surround view, and a high-end JBL audio profile.`;
        features.keyFeatures = 'Panoramic Sunroof, 360 Camera, Wireless Charger, Arcade.ev App Suite';
    } else if (isEmpoweredPlus && !isEmpoweredPlusA) {
        features.headerSummary = `The Tata Curvv EV ${variantName} brings severe luxury with 12.3-inch displays, ventilated seats, and V2V/V2L bidirectional charging.`;
        features.description = `A luxury tech showcase, the ${variantName} offers a massive 12.3-inch infotainment system, JBL cinematic sound with subwoofer, powered driver's seat, and the convenience of a front trunk (frunk).`;
        features.keyFeatures = '12.3" Screen, 18" Aero Alloys, JBL Subwoofer, Ventilated Seats, V2L/V2V';
    } else if (isEmpoweredPlusA) {
        features.headerSummary = `The Tata Curvv EV ${variantName} is the ultimate flagship offering Level 2 ADAS (20 features) and a gesture-controlled tailgate.`;
        features.description = `The flagship ${variantName} is an engineering marvel. Along with its 500+ km range, it packs radar-based Level 2 ADAS for unmatched safety, a gesture-controlled powered tailgate, and every conceivable connected feature.`;
        features.keyFeatures = 'Level 2 ADAS, Gesture Tailgate, 12.3" Screen, 502 km Range';
    }

    return features;
}

const VARIANTS = [
    { name: 'Creative 45.0 kWh', price: 1749000, engineKey: '45 kWh' },
    { name: 'Accomplished 45.0 kWh', price: 1849000, engineKey: '45 kWh' },
    { name: 'Accomplished 55.0 kWh', price: 1925000, engineKey: '55 kWh' },
    { name: 'Accomplished Plus (S) 45.0 kWh', price: 1929000, engineKey: '45 kWh' },
    { name: 'Accomplished Plus (S) 55.0 kWh', price: 1999000, engineKey: '55 kWh' },
    { name: 'Empowered Plus 55.0 kWh', price: 2125000, engineKey: '55 kWh' },
    { name: 'Empowered Plus A 55.0 kWh', price: 2199000, engineKey: '55 kWh' },
    { name: 'Empowered Plus A 55.0 kWh Dark Edition', price: 2224000, engineKey: '55 kWh' }
];

async function updateVariants() {
    console.log("Starting Tata Curvv EV Variants Update...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const modelId = 'model-brand-tata-motors-curvv-ev';
        const brandId = 'brand-tata-motors';

        const model = await Model.findOne({ id: modelId });
        if (!model) {
            console.error("Curvv EV model not found!");
            return;
        }

        let minPrice = Infinity;
        let maxPrice = 0;
        const variantOps = [];

        for (const vData of VARIANTS) {
            const engineInfo = ENGINES[vData.engineKey as keyof typeof ENGINES];
            const variantFeatures = getVariantFeatures(vData.name);
            const slugPath = vData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const variantId = `variant-${modelId}-${slugPath}`;
            
            if (vData.price < minPrice) minPrice = vData.price;
            if (vData.price > maxPrice) maxPrice = vData.price;

            const variantDoc = {
                id: variantId,
                name: vData.name,
                brandId: brandId,
                modelId: modelId,
                price: vData.price,
                status: 'active',
                
                ...COMMON_SPECS,
                ...engineInfo,
                ...variantFeatures,
            };

            // Will use upsert in bulkWrite for cleanliness
            variantOps.push({
                updateOne: {
                    filter: { id: variantId },
                    update: { $set: variantDoc },
                    upsert: true
                }
            });
        }
        
        if (variantOps.length > 0) {
            await Variant.bulkWrite(variantOps);
            console.log(`Success! Bulk updated/inserted ${variantOps.length} Curvv EV variants.`);
        }
        
        if (minPrice !== Infinity && maxPrice !== 0) {
            await Model.updateOne({ id: modelId }, { $set: { minPrice, maxPrice } });
            console.log(`Updated Curvv EV price range: ₹${minPrice} - ₹${maxPrice}`);
        }

    } catch (e) {
        console.error("Error updating variants:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateVariants();
