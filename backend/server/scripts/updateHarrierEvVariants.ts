/**
 * Update Tata Harrier EV Variants
 * Standardizes Bhp, parses AWD structure, and advanced feature sets.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Variant, Model } from '../db/schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENGINES = {
    '65 kWh RWD': {
        engineName: 'Electric Motor',
        engineType: 'Permanent Magnet Synchronous Motor (Rear)',
        power: '235 Bhp',
        maxPower: '235 Bhp',
        enginePower: '235 Bhp',
        torque: '315 Nm',
        engineTorque: '315 Nm',
        fuelType: 'Electric',
        fuel: 'Electric',
        transmission: 'Automatic',
        engineTransmission: 'Automatic',
        driveType: 'RWD',
        noOfGears: '1',
        engineSpeed: '1 Speed',
        
        batteryCapacity: '65.0 kWh',
        electricRange: '538 km',
        range: '538 km',
        fastChargingTime: '~25 min (20%-80% with 100kW DC Fast Charger)',
        fastCharging: 'Yes',
        chargerType: '3.3 kW Portable / Optional 7.2 kW AC Wall Box',
    },
    '75 kWh RWD': {
        engineName: 'Electric Motor',
        engineType: 'Permanent Magnet Synchronous Motor (Rear)',
        power: '235 Bhp',
        maxPower: '235 Bhp',
        enginePower: '235 Bhp',
        torque: '315 Nm',
        engineTorque: '315 Nm',
        fuelType: 'Electric',
        fuel: 'Electric',
        transmission: 'Automatic',
        engineTransmission: 'Automatic',
        driveType: 'RWD',
        noOfGears: '1',
        engineSpeed: '1 Speed',
        
        batteryCapacity: '75.0 kWh',
        electricRange: '627 km',
        range: '627 km',
        fastChargingTime: '~25 min (20%-80% with 120kW DC Fast Charger)',
        fastCharging: 'Yes',
        chargerType: '3.3 kW Portable / Optional 7.2 kW AC Wall Box',
    },
    '75 kWh AWD': {
        engineName: 'Dual Electric Motors',
        engineType: 'Front: High Performance Induction Motor | Rear: Permanent Magnet Synchronous Motor',
        power: '391 Bhp',
        maxPower: '391 Bhp',
        enginePower: '391 Bhp (156 Bhp Front + 235 Bhp Rear)',
        torque: '504 Nm',
        engineTorque: '504 Nm',
        fuelType: 'Electric',
        fuel: 'Electric',
        transmission: 'Automatic',
        engineTransmission: 'Automatic',
        driveType: 'AWD',
        noOfGears: '1',
        engineSpeed: '1 Speed',
        
        batteryCapacity: '75.0 kWh',
        electricRange: '622 km',
        range: '622 km',
        fastChargingTime: '~25 min (20%-80% with 120kW DC Fast Charger)',
        fastCharging: 'Yes',
        chargerType: '3.3 kW Portable / Optional 7.2 kW AC Wall Box',
    }
};

const COMMON_SPECS = {
    length: '4607',
    width: '1922',
    height: '1740',
    wheelbase: '2741',
    bootSpace: '502 Litres',
    seatingCapacity: '5',
    doors: '5',
    frontSuspension: 'Independent Front Suspension with McPherson Strut and Stabilizer bar',
    rearSuspension: 'Independent Multilink Rear Suspension with Stabilizer bar',
    frontBrake: 'Disc',
    rearBrake: 'Disc',
    discBrakes: 'Front & Rear with Vacuum Independent Brake Control Architecture (i-VBAC)',
    regenerativeBraking: 'Yes (Multi-Mode 4 Levels)',
    paddleShifter: 'Yes (Paddle Shifters to Control Regen Modes)',
    emissionStandard: 'Zero Tailpipe Emission',
    v2v: 'Yes (5 kVA)',
    v2l: 'Yes (3.3 kVA)',
};

function getVariantFeatures(variantName: string) {
    let features: Record<string, any> = {};
    const nameUpper = variantName.toUpperCase();
    
    // Core detections
    const is75 = nameUpper.includes('75.0');
    const is65 = nameUpper.includes('65.0');
    const isAWD = nameUpper.includes('AWD');
    const hasACFC = nameUpper.includes('ACFC');
    const isStealth = nameUpper.includes('STEALTH');
    
    // Trim level detection
    const isAdventure = nameUpper.includes('ADVENTURE') && !nameUpper.includes('ADVENTURE S');
    const isAdventureS = nameUpper.includes('ADVENTURE S');
    const isFearlessPlus = nameUpper.includes('FEARLESS PLUS') || nameUpper.includes('FEARLESS+');
    const isEmpowered = nameUpper.includes('EMPOWERED');

    // Hierarchy booleans
    const hasAdventureS = isAdventureS || isFearlessPlus || isEmpowered;
    const hasFearlessPlus = isFearlessPlus || isEmpowered;
    const hasEmpowered = isEmpowered;

    // ACFC Modifier
    if (hasACFC) {
        features.chargingTime = is65 ? '9.3 Hrs (10%-100% via 7.2kW AC)' : '10.7 Hrs (10%-100% via 7.2kW AC)';
        features.chargingPorts = '7.2 kW AC Wall Box included';
    } else {
        features.chargingTime = 'Not Specified (15A/3.3kW Standard Charger)';
        features.chargingPorts = '15A Socket / 3.3kW Portable Cable Included';
    }

    // AWD Modifiers & Frunk
    if (isAWD) {
        features.frunk = 'Yes (35 Litres / 17 kg)';
        features.drivingModes = 'Multi Drive Modes - Eco, City, Sport & Boost';
        features.offRoadModes = '6 Terrain Modes (Normal, Snow/Grass, Mud-Ruts, Sand, Rock Crawl, Custom)';
    } else {
        features.frunk = 'Yes (67 Litres / 35 kg)';
        features.drivingModes = 'Multi Drive Modes - Eco, City & Sport';
        features.offRoadModes = hasEmpowered ? '4 Terrain Modes (Normal, Wet, Rough, Custom)' : 'Terrain Modes (Normal, Wet, Rough)';
        features.driveModes = 'Drift Mode';
    }

    // BASE (ADVENTURE)
    features.airbags = '6 Airbags';
    features.daytimeRunningLights = 'Smart Digital DRLs';
    features.drl = 'Yes';
    features.headLights = 'LED Bi-Projector Headlamps';
    features.headlights = 'LED Bi-Projector';
    features.tailLights = 'Centre Position Lamp and Connected Tail Lamps (LED)';
    features.tailLight = 'Connected LED';
    features.seatUpholstery = 'Leatherette Seat Upholstery';
    features.driverSeatAdjustment = '8 way Driver & 4 way Co-Driver adjustable Seat';
    features.frontArmrest = 'Sliding Front Armrest';
    features.splitRearSeat = '60:40 Split Rear Seats';
    features.touchScreenInfotainment = '26.03 cm (10.25") Cinematic Touchscreen Infotainment by HARMAN';
    features.infotainmentScreen = '10.25 inch HD Touchscreen';
    features.instrumentCluster = '26.03 cm (10.25") Digital Cockpit';
    features.navigation = 'Navigation in Cockpit - Driver View Maps';
    features.androidAppleCarplay = 'Yes (Wireless)';
    features.connectedCarTech = 'iRA.ev & Smart Watch Connectivity (4 year free subscription)';
    features.voiceCommands = 'Multiple Voice Assistants (Native, Siri, Google Assistant)';
    features.speakers = '4 Speakers + 2 Tweeters';
    features.tweeters = '2 Tweeters';
    features.tyrePressureMonitor = 'Yes (TPMS)';
    features.electricParkingBrake = 'Electric Parking Brake with Auto Hold';
    features.electronicStabilityProgram = 'ESP with i-VBAC (Hill Descent, Hill Hold, Traction, Corner Stability, Roll Over, etc.)';
    features.esc = 'Yes';
    features.cruiseControl = 'Yes';
    features.keylessEntry = 'Smart Key with Push button start (Passive Keyless Entry)';
    features.pushButtonStart = 'Yes';
    features.ignition = 'Push Button Start';
    features.reverseCamera = 'HD Camera & Sensor Based Reverse Park Assist';
    features.parkingCamera = 'HD Rear';
    features.climateControl = 'Fully Automatic Temperature Control (FATC)';
    features.airConditioning = 'Automatic';
    features.rearACVents = 'B-Pillar integrated Rear AC vents';
    features.rearWindshieldWiper = 'Rear Wiper & Washer';
    features.avas = 'Acoustic Vehicle Alert System (AVAS)';
    features.steeringWheelTrim = 'Leather Wrapped Smart Digital Steering Wheel';
    features.outsideRearViewMirrors = 'Electric adjust, electric fold ORVM with Autofold';
    features.orvm = 'Auto Fold ORVM';
    features.followMeHomeHeadlights = 'Follow Me Home Headlamps';
    features.puddleLamps = 'Puddle Lamp';
    features.usbCChargingPorts = 'Fast Charge USB Type-C 45W';
    features.perimetricAlarm = 'Perimetric Alarm System';
    features.roofRails = 'Yes';
    features.airPurifier = 'Air Purifier (PM 2.5 filter)';
    features.exteriorDesign = 'Dual Tone Exterior (Black roof)';
    
    // Wheels for Adventure
    features.wheelSize = '18 inch';
    features.tyreSize = '245/60 R18';
    features.alloyWheels = 'R18 Alloy Wheels';

    // ADVENTURE S (over Adventure)
    if (hasAdventureS) {
        features.touchScreenInfotainment = '31.24 cm (12.3") Cinematic Touchscreen Infotainment by HARMAN';
        features.infotainmentScreen = '12.3 inch HD Touchscreen';
        features.appsSuite = 'Arcade.ev App Suite';
        features.drivePay = 'DrivePay';
        features.rearArmrest = '60:40 Split rear seats with centre armrest & cup holders';
        features.sunroof = 'Voice Assisted Panoramic Sunroof';
        features.rainSensingWipers = 'Yes';
        features.automaticHeadlamp = 'Yes';
        features.driverDozeOffAlert = 'Yes';
        features.rearWindshieldDefogger = 'Automatic Defogger';
    }

    // FEARLESS+ (over Adventure S)
    if (hasFearlessPlus) {
        features.airbags = '7 Airbags';
        features.airbagsLocation = 'Driver, Co-Driver, Curtain, Side & Knee Airbag';
        features.surroundViewMonitor = '360° 3D Surround View Camera System';
        features.parkingCamera = '360 View';
        features.parkingSensor = 'Front and Rear Parking Sensors';
        features.parkingSensors = 'Front & Rear';
        features.wheelSize = '19 inch';
        features.tyreSize = '245/55 R19';
        features.alloyWheels = 'R19 Alloy Wheels with Aero Inserts';
        features.frontFogLights = 'Front LED Fog Lamps with Cornering Function';
        features.fogLights = 'Yes (LED with Cornering)';
        features.rearFogLights = 'Rear Fog lamp';
        features.welcomeAnimation = 'Smart Digital Lights (Welcome & Goodbye Sequence, Charging Indicator)';
        features.turnIndicators = 'Sequential Indicators';
        features.speakers = '10 JBL Speaker System with Central Speaker & Subwoofer';
        features.subwoofers = '1 Subwoofer';
        features.audioSystem = 'JBL Sound Modes';
        features.driverSeatAdjustment = '6 Way Power adjustable Driver seat with Memory & Welcome Retract';
        features.memorySeats = 'Driver';
        features.passengerSeatAdjustment = '4 Way Power adjustable Co-Driver Seat';
        features.seatsAdjustment = 'Driver: Powered 6-Way Memory, Co-Driver: Powered 4-Way';
        features.ventilatedSeats = 'Front seats ventilation';
        features.rearSeatHeadrest = 'Rear comfort headrests';
        features.rearWindowSunshade = 'Rear Window Sunshade';
        features.climateControl = 'Voice Assisted Dual Zone Fully Automatic Temperature control (DATC)';
        features.climateZones = 'Dual Zone';
        features.airPurifier = 'Air Purifier with AQI display';
        features.ambientLighting = 'Multi Mood Ambient Lighting (Dashboard & Sunroof)';
        features.cooledGlovebox = 'Front Armrest with Cooled Storage';
        features.wirelessCharging = 'Wireless Smartphone Charger';
        features.insideRearViewMirror = 'Auto Dimming IRVM';
        features.usbCChargingPorts = 'Fast Charge USB Type-C 65W';
        features.driverWindowAutoUpDown = 'Driver Side Window Auto Up/Down with Anti-Pinch';
    }

    // EMPOWERED (over Fearless+)
    if (hasEmpowered) {
        features.autoParkAssist = 'Auto Park Assist (APA) with 15 features (Anywhere, Parallel, Perpendicular, Remote, etc.)';
        features.insideRearViewMirror = 'HD Rear View Mirror (E-IRVM with Built-in DVR)';
        features.dashCam = 'Built-in DVR via E-IRVM';
        features.digitalKey = 'Digi Access (Digital key with UWB + NFC + BLE) + Proximity Approach Unlock';
        features.surroundViewMonitor = '540° View (Transparent Mode & 360° SVS)';
        features.blindSpotMonitor = 'Blind Spot View Monitor & Blind Spot Detection';
        features.audioSystem = '10 JBL Speaker System with Dolby Atmos';
        features.touchScreenInfotainment = '36.9 cm (14.5") Cinematic Infotainment Screen by Harman Powered by Samsung Neo QLED';
        features.infotainmentScreen = '14.5 inch Samsung Neo QLED Touchscreen';
        features.navigation = 'In-built Navigation (Mappls)';
        features.outsideRearViewMirrors = 'Memory ORVMs, ORVM auto dip on reverse, ORVMs with logo projection';
        features.bossMode = 'Powered Boss Mode';
        features.electricTailgate = 'Powered Tailgate with Gesture Activation';
        features.offRoadModes = isAWD ? features.offRoadModes : '4 Terrain Modes (Normal, Wet, Rough, Custom) with Bejeweled Display';
        features.ambientLighting = 'Multi Mood Ambient Lighting (Door and Console)';
        features.sosFunction = 'SOS call (E-call / B-call)';
        features.steeringWheelTrim = 'Dual Tone Smart Digital Steering Wheel';
        features.keylessEntry = 'Remote key with UWB';
        features.adasLevel = 'Level 2+';
        features.adasFeatures = 'Advanced Driver Assistance System (ADAS Level 2) with 22 features (ACC, TSR, ISA, LCS, ASA, LDW, LKA, FCW, AEB, RCW, RCTA, BSD, HBA, LCA, OSA, DOA, BSM)';
    }

    // STEALTH Modifier
    if (isStealth) {
        features.exteriorDesign = 'Stealth Edition Matte Exterior';
        features.interiorTheme = 'Stealth Noir Interiors';
    }

    // SEO Text Logics
    if (isAdventure || isAdventureS) {
        features.headerSummary = `The Tata Harrier EV ${variantName} merges towering SUV presence with uncompromising electric architecture on the acti.ev platform.`;
        features.description = `Operating as a dominant rear-wheel-drive EV, the ${variantName} packs sophisticated ultra-glide suspension, bi-projector LEDs, and natively integrates multi-drive & terrain response systems right from the start.`;
        features.keyFeatures = 'RWD Electric Platform, 12.3" Screen (Adventure S), V2L/V2V Standard, Frunk';
        features.isValueForMoney = true;
    } else if (isFearlessPlus) {
        features.headerSummary = `The Tata Harrier EV ${variantName} steps deeply into tech-luxury with dual-zone climate control, ventilated seats, and 360° surround monitoring.`;
        features.description = `The mid-to-high ${variantName} configuration delivers exquisite Harman JBL audio, powered luxury seating with memory, and upgrades its footprint with 19-inch aero-insert alloys.`;
        features.keyFeatures = '19" Aero Alloys, JBL Sound, Dual Zone AC, Ventilated Seats';
    } else if (isEmpowered) {
        let driveSummary = isAWD ? 'Dual Motor QWD (All-Wheel Drive)' : 'Rear-Wheel Drive propulsion';
        features.headerSummary = `The Tata Harrier EV ${variantName} represents the technological pinnacle of Indian EV engineering with a 14.5" QLED screen and Level 2 ADAS.`;
        features.description = `Armed with ${driveSummary}, the flagship ${variantName} provides breathtaking innovations including Auto Park Assist with 15 scenarios, a jaw-dropping Samsung Neo QLED infotainment display, and Level 2+ ADAS covering 22 advanced safeties.`;
        features.keyFeatures = '14.5" QLED Screen, Level 2+ ADAS, Auto Park Assist, Dolby Atmos';
    }

    return features;
}

const VARIANTS = [
    { name: 'Adventure 2WD 65.0 kWh', price: 2149000, engineKey: '65 kWh RWD' },
    { name: 'Adventure 2WD 65.0 kWh ACFC', price: 2198000, engineKey: '65 kWh RWD' },
    { name: 'Adventure S 2WD 65.0 kWh', price: 2199000, engineKey: '65 kWh RWD' },
    { name: 'Adventure S 2WD 65.0 kWh ACFC', price: 2248000, engineKey: '65 kWh RWD' },
    { name: 'Fearless Plus 2WD 65.0 kWh', price: 2399000, engineKey: '65 kWh RWD' },
    { name: 'Fearless Plus 2WD 65.0 kWh ACFC', price: 2448000, engineKey: '65 kWh RWD' },
    { name: 'Fearless Plus 2WD 75.0 kWh', price: 2499000, engineKey: '75 kWh RWD' },
    { name: 'Fearless Plus 2WD 75.0 kWh ACFC', price: 2548000, engineKey: '75 kWh RWD' },
    { name: 'Empowered 2WD 75.0 kWh', price: 2749000, engineKey: '75 kWh RWD' },
    { name: 'Empowered 2WD 75.0 kWh ACFC', price: 2798000, engineKey: '75 kWh RWD' },
    { name: 'Empowered Stealth Edition 2WD 75.0 kWh', price: 2824000, engineKey: '75 kWh RWD' },
    { name: 'Empowered Stealth Edition 2WD 75.0 kWh ACFC', price: 2873000, engineKey: '75 kWh RWD' },
    { name: 'Empowered AWD 75.0 kWh', price: 2899000, engineKey: '75 kWh AWD' },
    { name: 'Empowered AWD 75.0 kWh ACFC', price: 2948000, engineKey: '75 kWh AWD' },
    { name: 'Empowered Stealth Edition AWD 75.0 kWh', price: 2974000, engineKey: '75 kWh AWD' },
    { name: 'Empowered Stealth Edition AWD 75.0 kWh ACFC', price: 3023000, engineKey: '75 kWh AWD' }
];

async function updateVariants() {
    console.log("Starting Tata Harrier EV Variants Update...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const modelId = 'model-brand-tata-motors-harrier-ev';
        const brandId = 'brand-tata-motors';

        const model = await Model.findOne({ id: modelId });
        if (!model) {
            console.error("Harrier EV model not found!");
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
            console.log(`Success! Bulk updated/inserted ${variantOps.length} Harrier EV variants.`);
        }
        
        if (minPrice !== Infinity && maxPrice !== 0) {
            await Model.updateOne({ id: modelId }, { $set: { minPrice, maxPrice } });
            console.log(`Updated Harrier EV price range: ₹${minPrice} - ₹${maxPrice}`);
        }

    } catch (e) {
        console.error("Error updating variants:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateVariants();
