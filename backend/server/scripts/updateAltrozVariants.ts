/**
 * Update Tata Altroz Variants
 * Based on provided brochure and pricing
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Variant, Model } from '../db/schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENGINES = {
    '1.2L Petrol MT': {
        engineName: '1.2L Revotron Petrol',
        engineType: '3 Cylinders',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '88 PS @ 6000 rpm',
        power: '88 PS',
        maxPower: '88 PS',
        engineTorque: '115 Nm @ 3250 rpm',
        torque: '115 Nm',
        engineTransmission: '5 Speed Manual',
        transmission: 'Manual',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '5',
        driveType: 'FWD',
        engineSpeed: '5 Speed',
    },
    '1.2L Petrol AMT': {
        engineName: '1.2L Revotron Petrol',
        engineType: '3 Cylinders',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '88 PS @ 6000 rpm',
        power: '88 PS',
        maxPower: '88 PS',
        engineTorque: '115 Nm @ 3250 rpm',
        torque: '115 Nm',
        engineTransmission: '5 Speed AMT',
        transmission: 'AMT',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '5',
        driveType: 'FWD',
        engineSpeed: '5 Speed',
    },
    '1.2L Petrol DCA': {
        engineName: '1.2L Revotron Petrol',
        engineType: '3 Cylinders',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '88 PS @ 6000 rpm',
        power: '88 PS',
        maxPower: '88 PS',
        engineTorque: '115 Nm @ 3250 rpm',
        torque: '115 Nm',
        engineTransmission: '6 Speed DCA',
        transmission: 'DCA',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '6',
        driveType: 'FWD',
        engineSpeed: '6 Speed',
        paddleShifter: 'Yes',
    },
    '1.2L CNG MT': {
        engineName: '1.2L iCNG',
        engineType: '3 Cylinders',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: 'CNG: 73.5 PS @ 6000 rpm, Petrol: 88 PS @ 6000 rpm',
        power: '73.5 PS (CNG Mode)',
        maxPower: '73.5 PS',
        engineTorque: 'CNG: 103 Nm @ 3500 rpm, Petrol: 115 Nm @ 3250 rpm',
        torque: '103 Nm (CNG Mode)',
        engineTransmission: '5 Speed Manual',
        transmission: 'Manual',
        fuelType: 'CNG',
        fuel: 'CNG',
        noOfGears: '5',
        driveType: 'FWD',
        engineSpeed: '5 Speed',
    },
    '1.5L Diesel MT': {
        engineName: '1.5L Turbocharged Revotorq Diesel',
        engineType: '4 Cylinders Turbocharged',
        displacement: '1497',
        engineCapacity: '1497 cc',
        enginePower: '90 PS @ 4000 rpm',
        power: '90 PS',
        maxPower: '90 PS',
        engineTorque: '200 Nm @ 1250 - 3000 rpm',
        torque: '200 Nm',
        engineTransmission: '5 Speed Manual',
        transmission: 'Manual',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        noOfGears: '5',
        driveType: 'FWD',
        engineSpeed: '5 Speed',
        turboCharged: 'Yes',
    }
};

const COMMON_SPECS = {
    length: '3990',
    width: '1755',
    height: '1523',
    wheelbase: '2501',
    groundClearance: '165',
    turningRadius: '5',
    seatingCapacity: '5',
    doors: '5',
    frontSuspension: 'Independent MacPherson Dual Path Strut with Coil Spring',
    rearSuspension: 'Twist Beam with Coil Spring and Shock Absorber',
    frontBrake: 'Disc',
    rearBrake: 'Drum',
    radioAntenna: 'Roof Antenna',
    emissionStandard: 'BS6 Phase 2',
    globalNCAPRating: '5-Star (Adult)',
    bootSpace: '345 Litres (Petrol/Diesel), 210 Litres (CNG)',
};

function getVariantFeatures(variantName: string) {
    let features: Record<string, any> = {};
    const nameUpper = variantName.toUpperCase();
    
    // Engine Detection
    const isPetrol = nameUpper.includes('PETROL');
    const isCNG = nameUpper.includes('CNG');
    const isDiesel = nameUpper.includes('DIESEL');
    const isAMT = nameUpper.includes('AMT');
    const isDCA = nameUpper.includes('DCT') || nameUpper.includes('DCA');
    
    // Trim Level Detection
    const isSmart = nameUpper.includes('SMART');
    const isPure = nameUpper.includes('PURE');
    const isPureS = isPure && nameUpper.includes(' S ');
    const isCreative = nameUpper.includes('CREATIVE');
    const isCreativeS = isCreative && nameUpper.includes(' S ');
    const isAccomplishedS = nameUpper.includes('ACCOMPLISHED S');
    const isAccomplishedPlusS = nameUpper.includes('ACCOMPLISHED PLUS S');
    
    // Base features (SMART)
    features.airbags = '6 Airbags';
    features.airbagsLocation = 'Driver, Passenger, Side and Curtain';
    features.abs = 'Yes';
    features.ebd = 'Yes';
    features.electronicStabilityProgram = 'Yes';
    features.esc = 'Yes';
    features.isofixMounts = 'Yes';
    features.isofix = 'Yes';
    features.seatbeltWarning = 'Yes (All Seats with SBR)';
    features.parkingSensor = 'Reverse Parking Sensors';
    features.parkingSensors = 'Reverse';
    
    features.headLights = 'Projector Headlamps';
    features.headlights = 'Projector';
    features.tailLights = 'LED Tail Lamps';
    features.tailLight = 'LED';
    features.frontWindshieldDefogger = 'No';
    features.steeringWheelType = 'Smart Digital Steering Wheel';
    features.powerWindows = 'All doors';
    features.keylessEntry = 'Remote Keyless entry';
    features.followMeHomeHeadlights = 'Yes';
    
    features.instrumentCluster = '10.16cm Digital Cluster';
    features.doorsType = 'Grand Entry 90° Door Opening';
    features.outsideDoorHandles = 'Flush door handles';
    
    if (isPetrol && !isAMT && !isDCA) {
        features.idleStopStart = 'Yes';
    }
    if ((isPetrol || isDiesel) && !isDCA && !isAMT) {
        features.drivingModes = 'Multi Drive Modes - Eco & Sport';
    }
    
    features.alloyWheels = 'R16 Wheel with Half Wheel Caps';
    features.wheelSize = '16 inch';
    features.tyreSize = '185/60 R16';
    
    // PURE specific additions
    if (isPure || isCreative || isAccomplishedS || isAccomplishedPlusS) {
        features.headLights = 'LED Headlamps';
        features.headlights = 'LED';
        features.touchScreenInfotainment = '17.78cm ConnectNext Touchscreen by HARMAN';
        features.infotainmentScreen = '7 inch Touchscreen';
        features.androidAppleCarplay = 'Yes (Wired)';
        features.speakers = '4 Speakers';
        features.cruiseControl = 'Yes';
        features.alloyWheels = 'R16 Dual tone wheel cover';
        features.climateControl = 'Clima Touch Automatic Temperature Control';
        features.airConditioning = 'Automatic';
        features.reverseCamera = 'Yes';
        features.parkingCamera = 'Rear';
        features.orvm = 'Auto Fold ORVM';
        features.outsideRearViewMirrors = 'Electric Foldable';
        features.rearWindshieldDefogger = 'Yes';
        features.driverSeatAdjustment = 'Height adjustable driver seat';
        features.automaticHeadlamp = 'Yes';
        features.rainSensingWipers = 'Yes';
        features.steeringMountedControls = 'Yes';
        features.insideRearViewMirror = 'AntiGlare IRVM';
    }
    
    // PURE S additions
    if (isPureS || isCreativeS || isAccomplishedS || isAccomplishedPlusS) {
        features.sunroof = 'Voice assisted Electric Sunroof';
        features.radioAntenna = 'Shark Fin Antenna';
    }
    
    // CREATIVE specific additions
    if (isCreative || isAccomplishedS || isAccomplishedPlusS) {
        features.headLights = 'Luminate LED Headlamps';
        features.headlights = 'LED';
        features.daytimeRunningLights = 'LED DRLs';
        features.drl = 'Yes';
        features.touchScreenInfotainment = 'Ultra View 26.03cm HD Infotainment by HARMAN';
        features.infotainmentScreen = '10.25 inch HD Touchscreen';
        features.androidAppleCarplay = 'Yes (Wireless)';
        features.surroundViewMonitor = '360° HD Surround View System';
        features.parkingCamera = '360 View';
        features.alloyWheels = 'R16 Hyper style dual tone Wheels';
        features.pushButtonStart = 'Yes';
        features.ignition = 'Push Button Start Stop';
        features.centraLuxeConsole = 'Yes';
        features.rearACVents = 'Yes';
        features.rearWindshieldWiper = 'Yes (with washer)';
        features.chargingPorts = 'Front and rear 65W Charger';
        features.usbCChargingPorts = 'Yes (65W Fast Charging)';
        features.ambientLighting = 'Galaxy Ambient Lighting';
        features.cooledGlovebox = 'Yes';
        features.radioAntenna = 'Shark Fin Antenna';
        features.parcelShelf = 'Yes';
        features.gearKnob = 'Leather wrapped';
        features.driverWindowAutoUpDown = 'One shot down drive side window';
        
        if (isDCA) {
            features.gearShifter = 'Monostable shifter';
            features.paddleShifter = 'Yes';
        }
    }
    
    // ACCOMPLISHED S additions
    if (isAccomplishedS || isAccomplishedPlusS) {
        features.tailLights = 'Infinity Connected LED Tail lamps';
        features.instrumentCluster = '17.78cm Digital Instrument Cluster';
        features.alloyWheels = 'R16 Drag Cut Alloy Wheels';
        features.turnIndicators = 'LED Headlamps with full Turn and position indicators';
        features.frontFogLights = 'LED Fog lamps with cornering';
        features.fogLights = 'Yes (LED with Cornering)';
        features.wirelessCharging = 'Wireless Smartphone Charger - Qi Support';
        features.coolingTech = 'Xpress Cool';
        features.tweeters = '4 Tweeters';
        features.peps = 'Yes (Passive Entry Passive Start)';
        features.tyrePressureMonitor = 'Yes (TPMS)';
        features.driverWindowAutoUpDown = 'One shot up driver window with Anti-pinch guard';
        features.heightAdjustableHeadrest = 'Front and rear adjustable headrests';
        features.rearArmrest = 'Rear seat Arm rest with cup holder';
        features.heightAdjustableSeatbelts = 'Yes';
        features.roofColours = 'Dual tone roof';
    }
    
    // ACCOMPLISHED+ S additions
    if (isAccomplishedPlusS) {
        features.instrumentCluster = 'Ultra View 26.03cm HD Digital Cluster with MAP View & Blind Spot Monitor';
        features.airPurifier = 'Yes';
        features.connectedCarTech = 'iRA - Connected Car Technology';
        features.audioModes = 'AudioWorX - Customizable Audio Modes';
        features.sosFunction = 'SOS Calling Function (E-call/B-call)';
    }

    // Determine SEO descriptions based on level
    if (isSmart) {
        features.headerSummary = `The Tata Altroz ${variantName} is a premium hatchback offering exceptional safety with 6 airbags, robust build quality, and essential digital features.`;
        features.description = `The base Altroz ${variantName} redefines the entry-level premium hatchback segment. It comes standard with 6 airbags, a digital steering wheel, and ISOFIX mounts.`;
        features.keyFeatures = '6 Airbags, Digital Cluster, Flush Door Handles';
        features.isValueForMoney = true;
    } else if (isPure || isPureS) {
        features.headerSummary = `The Tata Altroz ${variantName} provides premium features like a Harman touchscreen, auto climate control, and cruise control.`;
        features.description = `The ${variantName} trim hits the sweet spot for many buyers, offering a 7-inch ConnectNext touchscreen, auto headlamps, and a reverse camera.`;
        features.keyFeatures = '7" Touchscreen, Auto AC, Cruise Control, Reverse Camera';
        if (isPureS) features.keyFeatures += ', Voice Assisted Sunroof';
        features.isValueForMoney = true;
    } else if (isCreative || isCreativeS) {
        features.headerSummary = `The Tata Altroz ${variantName} brings segment-first tech with a massive 10.25-inch infotainment, 360-degree camera, and connected features.`;
        features.description = `The ${variantName} is packed with modern tech. It features a stunning 10.25-inch ultra-view touchscreen, 360 HD surround view system, and galaxy ambient lighting.`;
        features.keyFeatures = '10.25" Ultra HD Touchscreen, 360 Camera, 65W Fast Charger, Push Button Start';
    } else if (isAccomplishedS || isAccomplishedPlusS) {
        features.headerSummary = `The Tata Altroz ${variantName} is the fully-loaded flagship variant featuring premium drag-cut alloys, connected car tech, and wireless charging.`;
        features.description = `The flagship ${variantName} leaves nothing out. From Infinity connected LED tail lamps down to ventilated seats and an onboard air purifier, it elevates the passenger experience to luxury levels.`;
        features.keyFeatures = 'Infinity LED Tail Lamps, Digital Instrument Cluster, Wireless Charger, Premium Alloys';
        if (isAccomplishedPlusS) features.keyFeatures += ', iRA Connected Tech, Blind Spot Monitor';
    }
    
    return features;
}

const VARIANTS = [
    { name: 'Smart Petrol 1.2L Manual', price: 630390, engineKey: '1.2L Petrol MT' },
    { name: 'Pure Petrol 1.2L Manual', price: 703590, engineKey: '1.2L Petrol MT' },
    { name: 'Pure S Petrol 1.2L Manual', price: 736490, engineKey: '1.2L Petrol MT' },
    { name: 'Pure Petrol 1.2L Automatic (AMT)', price: 758490, engineKey: '1.2L Petrol AMT' },
    { name: 'Pure S Petrol 1.2L Automatic (AMT)', price: 791390, engineKey: '1.2L Petrol AMT' },
    { name: 'Creative Petrol 1.2L Manual', price: 794990, engineKey: '1.2L Petrol MT' },
    { name: 'Creative S Petrol 1.2L Manual', price: 827990, engineKey: '1.2L Petrol MT' },
    { name: 'Creative Petrol 1.2L Automatic (AMT)', price: 849890, engineKey: '1.2L Petrol AMT' },
    { name: 'Creative S Petrol 1.2L Automatic (AMT)', price: 882890, engineKey: '1.2L Petrol AMT' },
    { name: 'Accomplished S Petrol 1.2L Manual', price: 913990, engineKey: '1.2L Petrol MT' },
    { name: 'Creative S Petrol 1.2L Automatic (DCT)', price: 942290, engineKey: '1.2L Petrol DCA' },
    { name: 'Accomplished S Petrol 1.2L Automatic (DCT)', price: 1028290, engineKey: '1.2L Petrol DCA' },
    { name: 'Accomplished Plus S Petrol 1.2L Automatic (DCT)', price: 1051190, engineKey: '1.2L Petrol DCA' },
    { name: 'Smart CNG 1.2L Manual', price: 721890, engineKey: '1.2L CNG MT' },
    { name: 'Pure CNG 1.2L Manual', price: 804190, engineKey: '1.2L CNG MT' },
    { name: 'Pure S CNG 1.2L Manual', price: 837090, engineKey: '1.2L CNG MT' },
    { name: 'Creative CNG 1.2L Manual', price: 895690, engineKey: '1.2L CNG MT' },
    { name: 'Creative S CNG 1.2L Manual', price: 914790, engineKey: '1.2L CNG MT' },
    { name: 'Accomplished S CNG 1.2L Manual', price: 1014590, engineKey: '1.2L CNG MT' },
    { name: 'Pure Diesel 1.5L Turbo Manual', price: 809890, engineKey: '1.5L Diesel MT' },
    { name: 'Creative S Diesel 1.5L Turbo Manual', price: 932390, engineKey: '1.5L Diesel MT' },
    { name: 'Accomplished S Diesel 1.5L Turbo Manual', price: 1017090, engineKey: '1.5L Diesel MT' },
];

async function updateVariants() {
    console.log("Starting Tata Altroz Variants Update...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const modelId = 'model-brand-tata-motors-altroz';
        const brandId = 'brand-tata-motors';

        // Get basic model data
        const model = await Model.findOne({ id: modelId });
        if (!model) {
            console.error("Altroz model not found!");
            return;
        }

        let addedCount = 0;
        let updatedCount = 0;
        
        let minPrice = Infinity;
        let maxPrice = 0;

        // Process variants sequentially to avoid race conditions
        for (const vData of VARIANTS) {
            const engineInfo = ENGINES[vData.engineKey as keyof typeof ENGINES];
            const variantFeatures = getVariantFeatures(vData.name);
            const slugPath = vData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const variantId = `variant-${modelId}-${slugPath}`;
            
            // Adjust prices
            if (vData.price < minPrice) minPrice = vData.price;
            if (vData.price > maxPrice) maxPrice = vData.price;
            
            // Fuel Tank logic
            let fuelTankCapacity = '37 L';
            if (vData.engineKey.includes('CNG')) {
                fuelTankCapacity = 'Petrol: 37 L, CNG: 60L (Water Capacity)';
            }

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
                
                fuelTankCapacity: fuelTankCapacity,
            };

            const existing = await Variant.findOne({ id: variantId });
            if (existing) {
                await Variant.updateOne({ id: variantId }, { $set: variantDoc });
                updatedCount++;
                console.log(`Updated: ${vData.name}`);
            } else {
                await Variant.create(variantDoc);
                addedCount++;
                console.log(`Added: ${vData.name}`);
            }
        }
        
        // Update Model Price Range
        if (minPrice !== Infinity && maxPrice !== 0) {
            await Model.updateOne({ id: modelId }, { $set: { minPrice, maxPrice } });
            console.log(`Updated Altroz price range: ₹${minPrice} - ₹${maxPrice}`);
        }

        console.log(`\nSuccess! Added: ${addedCount}, Updated: ${updatedCount}`);
    } catch (e) {
        console.error("Error updating variants:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateVariants();
