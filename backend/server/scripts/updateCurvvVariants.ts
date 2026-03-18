/**
 * Update Tata Curvv Variants
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
    '1.2L Revotron MT': {
        engineName: '1.2 L Revotron',
        engineType: '3 Cylinders, Petrol (E20 Compliant)',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '88.2 kW @ 5500 RPM',
        power: '120 PS (88.2 kW)',
        maxPower: '120 PS',
        engineTorque: '170 Nm @ 1750-4000 RPM',
        torque: '170 Nm',
        engineTransmission: '6 Speed Manual',
        transmission: 'Manual',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '6',
        driveType: 'FWD',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    },
    '1.2L Revotron DCA': {
        engineName: '1.2 L Revotron',
        engineType: '3 Cylinders, Petrol (E20 Compliant)',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '88.2 kW @ 5500 RPM',
        power: '120 PS (88.2 kW)',
        maxPower: '120 PS',
        engineTorque: '170 Nm @ 1750-4000 RPM',
        torque: '170 Nm',
        engineTransmission: '7 Speed DCA',
        transmission: 'Automatic (DCA)',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '7',
        driveType: 'FWD',
        engineSpeed: '7 Speed',
        turboCharged: 'Yes',
        paddleShifter: 'Yes',
    },
    '1.2L Hyperion MT': {
        engineName: 'Hyperion Gasoline Direct Injection',
        engineType: '3 Cylinders, Petrol (E20 Compliant), GDI',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '91.9 kW @ 5000 RPM',
        power: '125 PS (91.9 kW)',
        maxPower: '125 PS',
        engineTorque: '225 Nm @ 1750-3000 RPM',
        torque: '225 Nm',
        engineTransmission: '6 Speed Manual',
        transmission: 'Manual',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '6',
        driveType: 'FWD',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    },
    '1.2L Hyperion DCA': {
        engineName: 'Hyperion Gasoline Direct Injection',
        engineType: '3 Cylinders, Petrol (E20 Compliant), GDI',
        displacement: '1199',
        engineCapacity: '1199 cc',
        enginePower: '91.9 kW @ 5000 RPM',
        power: '125 PS (91.9 kW)',
        maxPower: '125 PS',
        engineTorque: '225 Nm @ 1750-3000 RPM',
        torque: '225 Nm',
        engineTransmission: '7 Speed DCA',
        transmission: 'Automatic (DCA)',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        noOfGears: '7',
        driveType: 'FWD',
        engineSpeed: '7 Speed',
        turboCharged: 'Yes',
        paddleShifter: 'Yes',
    },
    '1.5L Kryojet MT': {
        engineName: '1.5L Kryojet',
        engineType: '4 Cylinders, Diesel Turbocharged',
        displacement: '1497',
        engineCapacity: '1497 cc',
        enginePower: '86.7 kW @ 4000 RPM',
        power: '118 PS (86.7 kW)',
        maxPower: '118 PS',
        engineTorque: '260 Nm @ 1500 - 2750 RPM',
        torque: '260 Nm',
        engineTransmission: '6 Speed Manual',
        transmission: 'Manual',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        noOfGears: '6',
        driveType: 'FWD',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    },
    '1.5L Kryojet DCA': {
        engineName: '1.5L Kryojet',
        engineType: '4 Cylinders, Diesel Turbocharged',
        displacement: '1497',
        engineCapacity: '1497 cc',
        enginePower: '86.7 kW @ 4000 RPM',
        power: '118 PS (86.7 kW)',
        maxPower: '118 PS',
        engineTorque: '260 Nm @ 1500 - 2750 RPM',
        torque: '260 Nm',
        engineTransmission: '7 Speed DCA',
        transmission: 'Automatic (DCA)',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        noOfGears: '7',
        driveType: 'FWD',
        engineSpeed: '7 Speed',
        turboCharged: 'Yes',
        paddleShifter: 'Yes',
    }
};

const COMMON_SPECS = {
    length: '4308',
    width: '1810',
    height: '1630',
    wheelbase: '2560',
    bootSpace: '500 Litres',
    fuelTankCapacity: '44 L',
    seatingCapacity: '5',
    doors: '5',
    frontSuspension: 'Independent, Lower Wishbone, McPherson Strut with Coil Spring',
    rearSuspension: 'Semi-independent, Open Profile Twist Beam with Stabiliser Bar, Coil Spring and Shock Absorber',
    emissionStandard: 'BS6 Phase 2',
    drivingModes: 'Eco, City & Sports',
    spareTyreProfile: '215/65/R16',
};

function getVariantFeatures(variantName: string) {
    let features: Record<string, any> = {};
    const nameUpper = variantName.toUpperCase();
    
    // Feature parsing bools
    const isHyperion = nameUpper.includes('HYPERION');
    const isDiesel = nameUpper.includes('DIESEL');
    const isRevotron = !isHyperion && !isDiesel;
    const isDCA = nameUpper.includes('AUTOMATIC');
    const isDark = nameUpper.includes('DARK');
    const isDualTone = nameUpper.includes('DUAL TONE');
    
    const isSmart = nameUpper.includes('SMART');
    const isPurePlus = nameUpper.includes('PURE PLUS');
    const isPurePlusS = isPurePlus && nameUpper.includes(' S ');
    const isCreative = nameUpper.includes('CREATIVE') && !nameUpper.includes('CREATIVE S') && !nameUpper.includes('CREATIVE PLUS S');
    const isCreativeS = nameUpper.includes('CREATIVE S');
    const isCreativePlusS = nameUpper.includes('CREATIVE PLUS S');
    const isAccomplishedS = nameUpper.includes('ACCOMPLISHED S');
    const isAccomplishedPlusA = nameUpper.includes('ACCOMPLISHED PLUS A');
    
    // Tier progression booleans (hierarchical)
    const hasPurePlus = isPurePlus || isPurePlusS || isCreative || isCreativeS || isCreativePlusS || isAccomplishedS || isAccomplishedPlusA;
    const hasCreative = isCreative || isCreativeS || isCreativePlusS || isAccomplishedS || isAccomplishedPlusA;
    const hasCreativePlusS = isCreativePlusS || isAccomplishedS || isAccomplishedPlusA;
    
    // Brakes
    if ((isAccomplishedS || isAccomplishedPlusA) && (isHyperion || isDiesel)) {
        features.frontBrake = 'Disc';
        features.rearBrake = 'Disc';
        features.discBrakes = 'Front & Rear';
    } else {
        features.frontBrake = 'Disc';
        features.rearBrake = 'Drum';
        features.discBrakes = 'Front';
    }

    // BASE (SMART)
    features.airbags = '6 Airbags';
    features.headLights = 'LED Head Lamp';
    features.headlights = 'LED';
    features.tailLights = 'LED Tail Lamp';
    features.tailLight = 'LED';
    features.daytimeRunningLights = 'LED DRLs';
    features.drl = 'Yes';
    features.outsideDoorHandles = 'Flush Door Handle with Welcome Light';
    features.electronicStabilityProgram = 'Yes';
    features.esc = 'Yes';
    features.powerWindows = 'All Doors';
    features.steeringWheelType = '2 Spoke Illuminated Digital Steering Wheel';
    features.isofix = 'Yes';
    features.isofixMounts = 'Yes';
    features.parkingSensor = 'Reverse Guiding Ultrasonic Sensor';
    features.parkingSensors = 'Reverse';
    features.instrumentCluster = '10.16 cm (4") Digital Instrument Cluster';
    features.centralLocking = 'Remote Central Lock';
    features.seatbeltWarning = '3 Point ELR Seatbelt For All Passengers';
    features.hillHoldAssist = 'Yes';
    features.hillAssist = 'Yes';
    features.childSafetyLock = 'Rear Doors';
    features.insideRearViewMirror = 'Anti-Glare IRVM';
    features.rearSpoiler = 'Yes';
    features.driverSeatAdjustment = 'Height Adjustable Driver Seat';
    features.steeringAdjustment = 'Adjustable Tilt Steering';
    features.abs = 'Yes';
    features.ebd = 'Yes';
    features.splitRearSeat = '100% Flip & Fold Rear Seat';
    features.steeringMountedControls = 'Steering controls for Instrument Cluster';
    features.airConditioning = 'Manual HVAC';
    features.ventilatedSeats = 'R-Comfort Seats with Passive Ventilation';
    features.rearArmrest = 'Rear Arm-Rest with Easysip Cup Docks';
    
    features.wheelSize = '16 inch';
    features.tyreSize = '215/65 R16';
    features.alloyWheels = 'R16 Steel Wheels';

    // PURE+
    if (hasPurePlus) {
        features.touchScreenInfotainment = '17.78 cm (7") Touchscreen Infotainment By HARMAN';
        features.infotainmentScreen = '7 inch Touchscreen';
        features.androidAppleCarplay = 'Yes (Wired)';
        features.cruiseControl = 'Yes';
        features.speakers = '4 Speakers';
        features.outsideRearViewMirrors = 'Electrically Adjustable & Autofold ORVM';
        features.orvm = 'Auto Fold ORVM';
        features.reverseCamera = 'Reverse Camera Park Assist';
        features.parkingCamera = 'Rear';
        features.steeringMountedControls = 'Steering Mounted Controls (Audio & Phone)';
        features.bluetooth = 'Yes';
        features.voiceCommands = 'Voice Commands for Phone & Media';
        features.radioAntenna = 'Shark Fin Antenna';
        if (isDCA) {
            features.gearShifter = 'Leather Smart E-Shifter';
            features.paddleShifter = 'Yes';
        }
        features.climateControl = 'Electric Temperature Control';
        features.airConditioning = 'Electric';
        features.frontArmrest = 'Grand Centre Console with Armrest';
        features.steeringWheelType = '4 Spoke Illuminated Digital Steering Wheel';
        features.usbCChargingPorts = 'USB Mobile Charger: Type A & Type C';
        features.tyrePressureMonitor = 'Yes (iTPMS)';
        features.alloyWheels = 'R16 Steel with Dual Tone Full Wheel Cover';
        features.hvacControl = 'Touch Based HVAC Control';
        features.rearWindowSunshade = 'Serenity Screen Rear Sunshade';
    }

    // PURE+ S
    if (isPurePlusS || isCreativeS || hasCreativePlusS) {
        features.sunroof = 'Voice Assisted Panoramic Sunroof';
        features.rainSensingWipers = 'Yes';
        features.automaticHeadlamp = 'Yes';
        features.wheelSize = '17 inch';
        features.tyreSize = '215/60 R17';
        if (!hasCreativePlusS) features.alloyWheels = 'R17 Hyperstyle Wheels';
    }

    // CREATIVE
    if (hasCreative) {
        features.touchScreenInfotainment = '26.03 cm (10.25") Touchscreen Infotainment By HARMAN';
        features.infotainmentScreen = '10.25 inch Touchscreen';
        features.speakers = '8 Speakers (4 Speakers & 4 Tweeters)';
        features.tweeters = '4 Tweeters';
        features.headLights = 'Bi Function Full LED Head Lamp';
        features.headlights = 'Full LED';
        features.climateControl = 'Fully Automatic Temperature Control';
        features.airConditioning = 'Automatic';
        features.keylessEntry = 'Smart Key with Push-Button Start (PEPS)';
        features.pushButtonStart = 'Yes';
        features.ignition = 'Push Button Start';
        features.androidAppleCarplay = 'Yes (Wireless)';
        features.rearWindshieldDefogger = 'Yes (Rear Defogger)';
        features.heightAdjustableSeatbelts = 'Height Adjustable Driver & Co-Driver Seat Belt';
        features.steeringWheelTrim = 'Leather Wrapped Steering Wheel';
        features.cooledGlovebox = 'Illuminated Cooled Glove Box';
        features.radioAntenna = 'Shark Fin Antenna with GPS';
        features.wifi = 'Wi-Fi Connectivity';
        if (!hasCreativePlusS) {
            features.wheelSize = '17 inch';
            features.tyreSize = '215/60 R17';
            features.alloyWheels = 'R17 Diamond Cut Alloy Wheels';
        }
    }

    // CREATIVE+ S
    if (hasCreativePlusS) {
        features.wheelSize = '18 inch';
        features.tyreSize = '215/55 R18';
        features.alloyWheels = 'R18 Diamond Cut Alloy Wheels';
        features.tailLights = 'Connected LED Tail Lamp with Sequential Turn Indicators';
        features.turnIndicators = 'Sequential Turn Indicators';
        features.frontFogLights = 'LED Fog Lamps with Cornering';
        features.fogLights = 'Yes (LED with Cornering)';
        features.surroundViewMonitor = '360° Surround View System with Blind View Monitor';
        features.parkingCamera = '360 View';
        features.blindSpotMonitor = 'Yes (Blind View Monitor)';
        features.dashboardTrim = 'Themed Dashboard with Mood Lighting';
        features.ambientLighting = 'Mood Lighting';
        features.hillDescentControl = 'Yes';
        features.tyrePressureMonitor = 'Yes (TPMS)';
        features.instrumentCluster = '26.03 cm (10.25") Digital Instrument Cluster';
        features.driverWindowAutoUpDown = 'One-shot Driver Power Up and Down Window';
        features.insideDoorHandles = 'Chrome Based Inner Door Handles';
        if (isDualTone) features.roofColours = 'Dual Tone Roof';
        features.gearKnob = 'Leather Gear Shift Knob';
        features.climateControl = 'Twin Zone Climate Concierge Air Conditioning';
        features.climateZones = 'Dual Zone';
        features.audioModes = 'HARMAN AudioWorX Enhanced';
    }

    // ACCOMPLISHED S
    if (isAccomplishedS || isAccomplishedPlusA) {
        features.driverSeatAdjustment = '6 Way Powered Driver Seat';
        features.seatsAdjustment = 'Driver: Powered 6-Way';
        features.ventilatedSeats = 'Ventilated Front Seats';
        features.sunroof = 'Voice Assisted Panoramic Sunroof with Mood Lighting';
        features.seatUpholstery = 'Plush Benecke-Kaliko Leatherette Seats';
        features.speakers = '9 Speakers (4 Speakers, 4 Tweeters & 1 Subwoofer)';
        features.subwoofers = '1 Subwoofer';
        features.audioSystem = 'JBL Branded Sound System with JBL Sound Modes';
        if (isHyperion || isDiesel) features.electricParkingBrake = 'Electronic Parking Brake with Auto Hold';
        features.passengerSeatAdjustment = 'Height Adjustable Co-driver Seat';
        features.splitRearSeat = '60:40 Rear Split Seats';
        features.rearSeatRecline = 'Rear Seat with Reclining Option';
        features.frontArmrest = 'Grand Centre Console with Leatherette Armrest';
        features.airPurifier = 'Air Purifier with AQI Display';
        features.wirelessCharging = 'Wireless Smartphone Charger';
        if (isDark) {
            features.alloyWheels = 'R18 #DARK Diamond Cut Alloy Wheels';
            features.seatUpholstery = 'Leatherette Seats with #DARK Themed Interiors';
        }
    }

    // ACCOMPLISHED+ A
    if (isAccomplishedPlusA) {
        features.electricTailgate = 'Gesture Controlled Powered Tailgate';
        features.touchScreenInfotainment = '31.24 cm (12.3") Touchscreen Infotainment By HARMAN';
        features.infotainmentScreen = '12.3 inch HD Touchscreen';
        features.welcomeAnimation = 'Sequential LED DRLs & Tail Lamp with Welcome & Goodbye Animation';
        features.connectedCarTech = 'IRA Connected Car Technology';
        features.voiceCommands = 'Alexa Voice Commands with Car to Home Functionality';
        features.insideRearViewMirror = 'Electrochromatic IRVM with Auto Dimming';
        features.coolingTech = 'Xpress Cooling';
        
        // Level 2 ADAS (20 features)
        features.adasLevel = 'Level 2';
        let adasArr = [
            'Lane Departure Warning (LDW)', 'Lane Keep Assist (LKA)', 'Lane Change Alert (LCA)',
            'Adaptive Steering Assist (ASA)', 'Forward Collision Warning (FCW)',
            'Autonomous Emergency Braking (Vehicle/Pedestrian/Cyclist/Junction)',
            'High Beam Assist (HBA)', 'Traffic Sign Recognition (TSR)', 'Over Speed Alert (OSA)',
            'Rear Cross Traffic Alert (RCTA)', 'Rear Collision Warning (RCW)',
            'Blind Spot Detection (BSD)', 'Blind Spot View Monitor (BSM)',
            '360° 3D Surround View Camera System', 'Door Open Alert', 'Driver Doze-off Alert'
        ];
        if (isDCA) adasArr.unshift('Adaptive Cruise Control with Stop and Go (ACC)');
        features.adasFeatures = adasArr.join(', ');
        features.blindSpotMonitor = 'Yes (BSD & BSM)';
    }

    // Header Summary & SEO Description Logic
    if (isSmart) {
        features.headerSummary = `The Tata Curvv ${variantName} is the stunning entry point to the SUV Coupe range, featuring 6 airbags, flush door handles, and LED lighting standard.`;
        features.description = `The base ${variantName} offers an unparalleled entry into the SUV Coupe segment. It is fully loaded with modern safety essentials including 6 airbags, ESC, and a digital instrument cluster.`;
        features.keyFeatures = '6 Airbags, Flush Door Handles, Digital Steering, Drive Modes';
        features.isValueForMoney = true;
    } else if (hasPurePlus && !hasCreative) {
        features.headerSummary = `The Tata Curvv ${variantName} brings severe value with a 7-inch touchscreen, auto climate control, and ${isPurePlusS ? 'a panoramic sunroof' : 'premium connectivity'}.`;
        features.description = `The mid-spec ${variantName} finds the perfect balance of price and features. It enhances comfort with a 7" Harman touchscreen, cruise control, and steering-mounted controls.`;
        features.keyFeatures = '7" Touchscreen, Cruise Control, Auto AC, Reverse Camera';
        if (isPurePlusS) features.keyFeatures += ', Panoramic Sunroof';
        features.isValueForMoney = true;
    } else if (hasCreative && !hasCreativePlusS) {
        features.headerSummary = `The Tata Curvv ${variantName} upgrades the experience with a massive 10.25-inch infotainment, bi-function LEDs, and wireless CarPlay.`;
        features.description = `The ${variantName} trim focuses on technology and premium appeal. Featuring a brilliant 10.25-inch Harman display, 17-inch diamond-cut alloys, and smart key entry.`;
        features.keyFeatures = '10.25" Touchscreen, Wireless CarPlay, Bi-LED Headlamps, 17" Alloys';
    } else if (hasCreativePlusS && !isAccomplishedS && !isAccomplishedPlusA) {
        features.headerSummary = `The Tata Curvv ${variantName} features massive 18-inch alloys, a 360-degree camera, dual-zone climate control, and sequential indicators.`;
        features.description = `The premium ${variantName} is designed to wow. Sitting on commanding 18-inch alloys, it features advanced 360-degree cameras, sequential turn signals, and a dual-zone climate concierge.`;
        features.keyFeatures = '18" Alloys, 360 Camera, Dual Zone AC, Connected LED Tail Lamps';
    } else if (isAccomplishedS && !isAccomplishedPlusA) {
        features.headerSummary = `The Tata Curvv ${variantName} hits luxury levels with ventilated front seats, a power driver's seat, JBL audio, and plush leatherette interiors.`;
        features.description = `Luxury is front and center on the ${variantName}. It offers a sublime cabin experience featuring ventilated front seats, an electric driver seat, a 9-speaker JBL premium sound system, and an onboard air purifier.`;
        features.keyFeatures = 'Ventilated Seats, Powered Driver Seat, JBL Audio, Air Purifier, Leatherette';
    } else if (isAccomplishedPlusA) {
        features.headerSummary = `The Tata Curvv ${variantName} is the ultimate flagship boasting Level 2 ADAS, a massive 12.3-inch display, and a gesture-controlled tailgate.`;
        features.description = `The flagship ${variantName} leaves absolutely nothing on the table. It is an engineering marvel featuring Level 2 ADAS for ultimate safety, a massive 12.3-inch cinematic touchscreen, and effortless gesture-controlled powered tailgate operations.`;
        features.keyFeatures = 'Level 2 ADAS, 12.3" Touchscreen, Gesture Tailgate, Electrochromic IRVM';
    }

    return features;
}

const VARIANTS = [
    { name: 'Smart Petrol 1.2L Turbo Manual', price: 965690, engineKey: '1.2L Revotron MT' },
    { name: 'Pure Plus Petrol 1.2L Turbo Manual', price: 1091190, engineKey: '1.2L Revotron MT' },
    { name: 'Pure Plus S Petrol 1.2L Turbo Manual', price: 1158790, engineKey: '1.2L Revotron MT' },
    { name: 'Creative Petrol 1.2L Turbo Manual', price: 1206990, engineKey: '1.2L Revotron MT' },
    { name: 'Creative S Petrol 1.2L Turbo Manual', price: 1255290, engineKey: '1.2L Revotron MT' },
    { name: 'Creative Plus S Petrol 1.2L Turbo Manual Dual Tone', price: 1351890, engineKey: '1.2L Revotron MT' },
    { name: 'Creative S Petrol 1.2L Turbo Manual Hyperion GDI', price: 1371190, engineKey: '1.2L Hyperion MT' },
    { name: 'Creative Plus S Petrol 1.2L Turbo Manual Dual Tone Hyperion GDI', price: 1467690, engineKey: '1.2L Hyperion MT' },
    { name: 'Accomplished S Petrol 1.2L Turbo Manual Dual Tone', price: 1455390, engineKey: '1.2L Revotron MT' },
    { name: 'Accomplished S Petrol 1.2L Turbo Manual Dark Edition', price: 1592290, engineKey: '1.2L Revotron MT' },
    { name: 'Accomplished S Petrol 1.2L Turbo Manual Dual Tone Hyperion GDI', price: 1571290, engineKey: '1.2L Hyperion MT' },
    { name: 'Accomplished Plus A Petrol 1.2L Turbo Manual Dark Edition', price: 1737090, engineKey: '1.2L Revotron MT' },
    { name: 'Accomplished Plus A Petrol 1.2L Turbo Manual Dual Tone', price: 1716090, engineKey: '1.2L Revotron MT' },
    
    { name: 'Pure Plus Petrol 1.2L Turbo Automatic', price: 1235990, engineKey: '1.2L Revotron DCA' },
    { name: 'Pure Plus S Petrol 1.2L Turbo Automatic', price: 1303590, engineKey: '1.2L Revotron DCA' },
    { name: 'Creative Petrol 1.2L Turbo Automatic', price: 1351890, engineKey: '1.2L Revotron DCA' },
    { name: 'Creative S Petrol 1.2L Turbo Automatic', price: 1400090, engineKey: '1.2L Revotron DCA' },
    { name: 'Creative Plus S Petrol 1.2L Turbo Automatic Dual Tone', price: 1496690, engineKey: '1.2L Revotron DCA' },
    { name: 'Creative Plus S Petrol 1.2L Turbo Automatic Dual Tone Hyperion GDI', price: 1612490, engineKey: '1.2L Hyperion DCA' },
    { name: 'Accomplished S Petrol 1.2L Turbo Automatic Dual Tone', price: 1600190, engineKey: '1.2L Revotron DCA' },
    { name: 'Accomplished S Petrol 1.2L Turbo Automatic Dark Edition', price: 1737090, engineKey: '1.2L Revotron DCA' },
    { name: 'Accomplished S Petrol 1.2L Turbo Automatic Dual Tone Hyperion GDI', price: 1716090, engineKey: '1.2L Hyperion DCA' },
    { name: 'Accomplished Plus A Petrol 1.2L Turbo Automatic Dark Edition', price: 1881890, engineKey: '1.2L Revotron DCA' },
    { name: 'Accomplished Plus A Petrol 1.2L Turbo Automatic Dual Tone', price: 1860890, engineKey: '1.2L Revotron DCA' },

    { name: 'Smart Diesel 1.5L Turbo Manual', price: 1110490, engineKey: '1.5L Kryojet MT' },
    { name: 'Pure Plus Diesel 1.5L Turbo Manual', price: 1235990, engineKey: '1.5L Kryojet MT' },
    { name: 'Pure Plus S Diesel 1.5L Turbo Manual', price: 1303590, engineKey: '1.5L Kryojet MT' },
    { name: 'Creative Diesel 1.5L Turbo Manual', price: 1351890, engineKey: '1.5L Kryojet MT' },
    { name: 'Creative S Diesel 1.5L Turbo Manual', price: 1400090, engineKey: '1.5L Kryojet MT' },
    { name: 'Creative Plus S Diesel 1.5L Turbo Manual Dual Tone', price: 1496690, engineKey: '1.5L Kryojet MT' },
    { name: 'Accomplished S Diesel 1.5L Turbo Manual Dark Edition', price: 1611590, engineKey: '1.5L Kryojet MT' },
    { name: 'Accomplished S Diesel 1.5L Turbo Manual Dual Tone', price: 1600190, engineKey: '1.5L Kryojet MT' },
    { name: 'Accomplished Plus A Diesel 1.5L Turbo Manual', price: 1739990, engineKey: '1.5L Kryojet MT' },
    { name: 'Accomplished Plus A Diesel 1.5L Turbo Manual Dual Tone', price: 1728590, engineKey: '1.5L Kryojet MT' },

    { name: 'Pure Plus Diesel 1.5L Turbo Automatic', price: 1380790, engineKey: '1.5L Kryojet DCA' },
    { name: 'Pure Plus S Diesel 1.5L Turbo Automatic', price: 1448390, engineKey: '1.5L Kryojet DCA' },
    { name: 'Creative S Diesel 1.5L Turbo Automatic', price: 1544990, engineKey: '1.5L Kryojet DCA' },
    { name: 'Creative Plus S Diesel 1.5L Turbo Automatic Dual Tone', price: 1641490, engineKey: '1.5L Kryojet DCA' },
    { name: 'Accomplished S Diesel 1.5L Turbo Automatic Dark Edition', price: 1756390, engineKey: '1.5L Kryojet DCA' },
    { name: 'Accomplished S Diesel 1.5L Turbo Automatic Dual Tone', price: 1745090, engineKey: '1.5L Kryojet DCA' },
    { name: 'Accomplished Plus A Diesel 1.5L Turbo Automatic Dark Edition', price: 1884790, engineKey: '1.5L Kryojet DCA' },
    { name: 'Accomplished Plus A Diesel 1.5L Turbo Automatic Dual Tone', price: 1873490, engineKey: '1.5L Kryojet DCA' }
];

async function updateVariants() {
    console.log("Starting Tata Curvv Variants Update...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const modelId = 'model-brand-tata-motors-curvv';
        const brandId = 'brand-tata-motors';

        const model = await Model.findOne({ id: modelId });
        if (!model) {
            console.error("Curvv model not found!");
            return;
        }

        let addedCount = 0;
        let updatedCount = 0;
        
        let minPrice = Infinity;
        let maxPrice = 0;

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
        
        if (minPrice !== Infinity && maxPrice !== 0) {
            await Model.updateOne({ id: modelId }, { $set: { minPrice, maxPrice } });
            console.log(`Updated Curvv price range: ₹${minPrice} - ₹${maxPrice}`);
        }

        console.log(`\nSuccess! Added/Updated Curvv variants. Total processed: ${VARIANTS.length}`);
    } catch (e) {
        console.error("Error updating variants:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateVariants();
