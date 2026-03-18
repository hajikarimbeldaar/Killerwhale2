/**
 * Update Tata Harrier Variants
 * Applies standard Bhp, handles complex ADAS & Quad disc parsing.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Variant, Model } from '../db/schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENGINES = {
    '1.5L Petrol MT': {
        engineName: 'Hyperion 1.5L Turbo GDi Petrol Engine',
        engineType: 'In line 4 Cylinder GDi',
        displacement: '1498',
        engineCapacity: '1498 cc',
        power: '168 Bhp',
        maxPower: '168 Bhp',
        enginePower: '168 Bhp @ 5000 rpm',
        torque: '280 Nm',
        engineTorque: '280 Nm @ 1750-3500 rpm',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        transmission: 'Manual',
        engineTransmission: '6 Speed Manual',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    },
    '1.5L Petrol AT': {
        engineName: 'Hyperion 1.5L Turbo GDi Petrol Engine',
        engineType: 'In line 4 Cylinder GDi',
        displacement: '1498',
        engineCapacity: '1498 cc',
        power: '168 Bhp',
        maxPower: '168 Bhp',
        enginePower: '168 Bhp @ 5000 rpm',
        torque: '280 Nm',
        engineTorque: '280 Nm @ 1750-3500 rpm',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        transmission: 'Automatic',
        engineTransmission: '6 Speed Automatic',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    },
    '2.0L Diesel MT': {
        engineName: 'Kryotec 2.0L Turbocharged Diesel Engine',
        engineType: 'In line 4 Cylinder',
        displacement: '1956',
        engineCapacity: '1956 cc',
        power: '168 Bhp',
        maxPower: '168 Bhp',
        enginePower: '168 Bhp @ 3750 rpm',
        torque: '350 Nm',
        engineTorque: '350 Nm @ 1750-2500 rpm',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        transmission: 'Manual',
        engineTransmission: '6 Speed Manual',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    },
    '2.0L Diesel AT': {
        engineName: 'Kryotec 2.0L Turbocharged Diesel Engine',
        engineType: 'In line 4 Cylinder',
        displacement: '1956',
        engineCapacity: '1956 cc',
        power: '168 Bhp',
        maxPower: '168 Bhp',
        enginePower: '168 Bhp @ 3750 rpm',
        torque: '350 Nm',
        engineTorque: '350 Nm @ 1750-2500 rpm',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        transmission: 'Automatic',
        engineTransmission: '6 Speed Automatic',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
    }
};

const COMMON_SPECS = {
    length: '4605',
    width: '1922',
    height: '1718',
    wheelbase: '2741',
    bootSpace: '445 Litres',
    bootSpaceAfterFoldingRearRowSeats: '815 Litres',
    fuelTankCapacity: '50 L',
    seatingCapacity: '5',
    doors: '5',
    frontSuspension: 'Independent, Lower Wishbone, McPherson Strut with Coil Spring & Anti-Roll Bar',
    rearSuspension: 'Semi Independent Twist Blade with Panhard Rod & Coil Spring',
    emissionStandard: 'BS6 Phase 2',
    globalNCAPRating: '5-Star (Adult & Child)',
};

function getVariantFeatures(variantName: string) {
    let features: Record<string, any> = {};
    const nameUpper = variantName.toUpperCase();
    
    // Core detections
    const isAT = nameUpper.includes('AUTOMATIC');
    const isDark = nameUpper.includes('DARK EDITION') || nameUpper.includes('#DARK');
    const isRedDark = nameUpper.includes('RED DARK');
    const isStealth = nameUpper.includes('STEALTH');
    
    // Trim level detection (hierarchical booleans)
    const isSmart = nameUpper.includes('SMART');
    const isPureX = nameUpper.includes('PURE X');
    const isAdventureX = nameUpper.includes('ADVENTURE X') && !nameUpper.includes('ADVENTURE X PLUS') && !nameUpper.includes('ADVENTURE X+');
    const isAdventureXPlus = nameUpper.includes('ADVENTURE X PLUS') || nameUpper.includes('ADVENTURE X+');
    const isFearlessX = nameUpper.includes('FEARLESS X') && !nameUpper.includes('FEARLESS X PLUS') && !nameUpper.includes('FEARLESS X+');
    const isFearlessXPlus = nameUpper.includes('FEARLESS X PLUS') || nameUpper.includes('FEARLESS X+');
    const isFearlessUltra = nameUpper.includes('FEARLESS ULTRA');

    // Hierarchical inclusion flags
    const hasPureX = isPureX || isAdventureX || isAdventureXPlus || isFearlessX || isFearlessXPlus || isFearlessUltra || isStealth;
    const hasAdventureX = isAdventureX || isAdventureXPlus || isFearlessX || isFearlessXPlus || isFearlessUltra || isStealth;
    const hasAdventureXPlus = isAdventureXPlus || isFearlessX || isFearlessXPlus || isFearlessUltra || isStealth;
    const hasFearlessX = isFearlessX || isFearlessXPlus || isFearlessUltra || isStealth;
    const hasFearlessXPlus = isFearlessXPlus || isFearlessUltra || isStealth;

    // Brakes Logic
    if (hasAdventureXPlus) {
        features.frontBrake = 'Disc';
        features.rearBrake = 'Disc';
        features.discBrakes = 'Quad Disc Braking (Front & Rear)';
    } else {
        features.frontBrake = 'Disc';
        features.rearBrake = 'Drum';
        features.discBrakes = 'Front';
    }

    // BASE (SMART)
    features.instrumentCluster = '17.78 cm (7") Digital Cockpit';
    features.airbags = '6 Airbags';
    features.airbagsLocation = 'Driver, Co-Driver, Curtain & Side Airbags';
    features.airConditioning = 'Automatic';
    features.climateControl = 'Fully Automatic Temperature Control';
    features.headLights = 'Bi-LED Projector Head Lamp';
    features.headlights = 'Bi-LED Projector';
    features.steeringAdjustment = 'Tilt & Telescopic Steering Wheel with Illuminated Logo';
    features.turnIndicators = 'LED Turn Indicators';
    features.tailLights = 'LED Tail Lamps';
    features.tailLight = 'LED';
    features.daytimeRunningLights = 'Front LED DRLs';
    features.drl = 'Yes';
    features.tractionControl = 'Traction Control System';
    features.isofixMounts = 'Yes';
    features.isofix = 'Yes';
    features.hillAssist = 'Yes (Hill Ascent)';
    features.splitRearSeat = '2nd Row Seats with 60:40 Split';
    features.heightAdjustableHeadrest = 'Adjustable Headrest for 1st & 2nd Row Seats';
    features.frontRowCupHolders = 'Front Row Cup Holders';
    features.rearACVents = '2nd Row AC Vents';
    features.insideRearViewMirror = 'Antiglare IRVM';
    features.abs = 'Yes (with EBD)';
    features.ebd = 'Yes';
    features.parkingSensor = 'Rear Parking Sensor';
    features.parkingSensors = 'Rear';
    features.seatbeltWarning = '3 Point Seatbelt with Reminder (All Seats)';
    features.perimetricAlarm = 'Perimetric Alarm System';
    features.electricTailgate = 'Electric Tailgate Release with Central Locking';
    features.chargingPorts = 'USB Smart Charger in Console Armrest';
    features.electronicStabilityProgram = 'Yes (Corner Stability, Roll Over Mitigation, Brake Disc Wiping, Panic Brake Alert, After Impact Braking)';
    features.esc = 'Yes';
    features.spareTyreProfile = '235/70 R16 Steel';
    
    features.wheelSize = '17 inch';
    features.tyreSize = '235/65 R17';
    features.alloyWheels = 'R17 Alloy Wheels';

    // PURE X (over Smart)
    if (hasPureX) {
        if (!hasAdventureX) features.seatUpholstery = 'Ash Grey Fabric Upholstery';
        features.sunroof = 'Voice-Assisted Panoramic Sunroof';
        features.surroundViewMonitor = '360° HD Surround View System';
        features.parkingCamera = '360 View';
        features.touchScreenInfotainment = 'Ultra View 26.03 cm (10.25") HD Harman Infotainment Touchscreen';
        features.infotainmentScreen = '10.25 inch HD Touchscreen';
        features.instrumentCluster = 'Ultra View 26.03 cm (10.25") HD Digital Cluster';
        features.cruiseControl = 'Yes';
        features.outsideRearViewMirrors = 'Electrically Adjustable ORVMs with Autofold';
        features.orvm = 'Auto Fold ORVM';
        features.automaticHeadlamp = 'Yes';
        features.rainSensingWipers = 'Yes';
        features.androidAppleCarplay = 'Yes (Wireless)';
        features.frontArmrest = 'Front Armrest with Storage';
        features.keylessEntry = 'Push Button Start with Remote Key';
        features.pushButtonStart = 'Yes';
        features.ignition = 'Push Button Start';
        features.driverSeatAdjustment = '4 Way Height Adjustable Driver Seat';
        features.speakers = '4 Speakers';
        features.centralLocking = 'Remote Central Locking';
        features.rearWindshieldWiper = 'Rear Washer Wiper';
        features.steeringWheelTrim = 'Leather Wrapped Steering Wheel';
        if (isAT) {
            features.paddleShifter = 'Yes';
            features.gearShifter = 'Command Shifter';
        }
        features.voiceCommands = '250+ Native Voice Commands';
        features.radioAntenna = 'Shark Fin Antenna';
        features.usbCChargingPorts = 'Smart A-type and C-type Chargers in 1st & 2nd Row';
        features.roofRails = 'Yes';
    }

    // PURE X #DARK modifier
    if (isPureX && isDark) {
        features.wheelSize = '18 inch';
        features.tyreSize = '235/60 R18';
        features.alloyWheels = 'R18 Dark Alloy Wheels';
        features.interiorTheme = 'Blackstone Interior Theme';
    }

    // ADVENTURE X (over Pure X)
    if (hasAdventureX) {
        if (!hasFearlessX) features.seatUpholstery = 'Onyx Trail Leatherette Interiors';
        features.seatsAdjustment = 'Driver: Powered Ergo Lux';
        features.driverSeatAdjustment = 'Ergo Lux Powered Driver Seat';
        features.drivingModes = 'Multi Drive Modes (City, Sports & Eco)';
        features.offRoadModes = 'Trail Response Modes (Normal, Rough, Wet)';
        features.speakers = '6 Speakers (4 Speakers + 2 Tweeters)';
        features.tweeters = '2 Tweeters';
        features.chargingPorts = 'Front 45W C Type Charger Slot and A Type Docking Module';
        features.rearWindshieldDefogger = 'Yes';
        features.driverWindowAutoUpDown = 'One Touch Auto-up Driver Door Window with Anti Pinch';
        features.parcelShelf = 'Rear Parcel Shelf';
        features.lightInGloveBoxAndBoot = 'Light in Glove Box & Boot';
        features.frontSeatBackPockets = 'Front Seat Back Pockets';
    }

    // ADVENTURE X #DARK modifier
    if (isAdventureX && isDark) {
        features.wheelSize = '18 inch';
        features.tyreSize = '235/60 R18';
        features.alloyWheels = 'R18 Dark Alloy Wheels';
        features.interiorTheme = 'Blackstone Interior Theme';
    }

    // ADVENTURE X+ (over Adventure X)
    if (hasAdventureXPlus) {
        features.adasLevel = 'Level 1+';
        features.adasFeatures = isAT ? 'ADAS with Adaptive Cruise Control (AT) and 12 other functionalities' : 'ADAS with 12 functionalities (Excluding ACC)';
        features.electronicStabilityProgram = 'Advanced Electronic Stability Program (ESP) with Driver Doze-off Alert';
        features.electricParkingBrake = 'Trail Hold Electronic Park Brake (EPB) with Auto Hold';
        if (isAT) features.cruiseControl = 'Adaptive Cruise Control';
    }

    // ADVENTURE X+ #DARK modifier
    if (isAdventureXPlus && isDark) {
        features.wheelSize = '18 inch';
        features.tyreSize = '235/60 R18';
        features.alloyWheels = 'R18 Dark Alloy Wheels';
        features.interiorTheme = 'Blackstone Interior Theme';
    }

    // FEARLESS X (over Adventure X+)
    if (hasFearlessX) {
        features.touchScreenInfotainment = 'Ultra view 31.24 cm (12.3") HD Harman Infotainment Touchscreen';
        features.infotainmentScreen = '12.3 inch HD Touchscreen';
        features.speakers = '9 JBL Speakers with Subwoofer';
        features.subwoofers = '1 Subwoofer';
        features.audioSystem = 'Harman AudioWorX Enhanced with 9 JBL Audio Modes';
        features.interiorTheme = 'Signature Noir Black & Titan Grey Interior Theme';
        if (!isDark && !isRedDark && !isStealth) {
            features.wheelSize = '18 inch';
            features.tyreSize = '235/60 R18';
            features.alloyWheels = 'R18 Alloy Wheels';
        }
        features.ventilatedSeats = 'Ventilated Front Row Seats (Driver & Co-Driver)';
        features.driverSeatAdjustment = 'Ergo Lux powered Driver Seat with Memory & Welcome';
        features.memorySeats = 'Driver';
        features.climateControl = 'Voice-Assisted Dual Zone Fully Automatic Air Conditioning';
        features.climateZones = 'Dual Zone';
        features.rearSeatHeadrest = 'Winged Comfort Head Rest on 2nd Row Seats';
        features.tailLights = 'Front and Rear Connected Lamps with Sequential LED DRL';
        features.wirelessCharging = 'Wireless Smartphone Charger';
        features.ambientLighting = 'Multi Mood Lights on Dashboard';
        features.tyrePressureMonitor = 'Yes (TPMS)';
        features.keylessEntry = 'Smart Key Entry';
        features.rearWindowSunshade = '2nd Row Roll-up Sun Blinds';
        features.insideRearViewMirror = 'Auto-Dimming IRVM';
        features.vanityMirror = 'Illuminated Vanity Mirror with Sunvisor for Co-driver';
        features.rearArmrest = 'Rear Armrest with Cup Holders';
        features.followMeHomeHeadlights = 'Yes';
    }

    // FEARLESS X #DARK modifier
    if (isFearlessX && isDark) {
        features.wheelSize = '19 inch';
        features.tyreSize = '245/55 R19';
        features.alloyWheels = 'R19 Dark Alloy Wheels';
        features.interiorTheme = 'Blackstone Interior Theme';
    }

    // FEARLESS X+ (over Fearless X)
    if (hasFearlessXPlus) {
        features.adasLevel = 'Level 2';
        features.adasFeatures = 'ADAS Level 2 with 20 Functionalities';
        features.speakers = '10 JBL Speakers with Central Speaker & Subwoofer';
        features.airbags = '7 Airbags';
        features.airbagsLocation = 'Driver, Co-Driver, Side, Curtain & Driver Knee Airbag';
        features.electricTailgate = 'Gesture Controlled Powered Tailgate';
        features.passengerSeatAdjustment = '4 Way Powered Co-driver Seat';
        features.seatsAdjustment = 'Driver: Powered Memory, Co-Driver: 4-Way Powered';
        features.connectedCarTech = 'Connected Vehicle Technology with iRA 2.0';
        features.voiceCommands = 'Alexa Voice Commands with Car to Home Functionality';
        features.airPurifier = 'Air Purifier with AQI Display';
        features.offRoadModes = 'Bejeweled Terrain Response Mode Selector with Display';
        features.welcomeAnimation = 'Welcome & Goodbye Animation on Front and Rear LED DRL';
        features.audioSystem = 'Harman AudioWorX Advanced with 13 JBL Audio modes';
        features.frontFogLights = 'Front LED Fog Lamps with Cornering Function';
        features.fogLights = 'Yes (LED with Cornering)';
        features.rearFogLights = 'Rear Fog lamp';
        features.parkingSensor = 'Front and Rear Parking Sensors';
        features.parkingSensors = 'Front & Rear';
        features.sosFunction = 'Emergency Call & Breakdown Call Assist';
        features.hillDescentControl = 'Yes';
        features.cooledGlovebox = 'Front Armrest with Cooled Storage';
        features.climateControl = 'IntelliStart with Climate Sync';
    }

    // FEARLESS X+ #DARK / STEALTH modifiers
    if (isFearlessXPlus && isDark) {
        features.wheelSize = '19 inch';
        features.tyreSize = '245/55 R19';
        features.alloyWheels = 'R19 Dark Alloy Wheels';
        features.interiorTheme = 'Blackstone Interior Theme';
    }
    if (isFearlessXPlus && isStealth) {
        features.wheelSize = '19 inch';
        features.tyreSize = '245/55 R19';
        features.alloyWheels = 'R19 Matte Stealth Black Alloy Wheels';
        features.exteriorDesign = 'Matte Stealth Black exterior color with Exclusive Stealth Mascot';
        features.interiorTheme = 'Carbon Noir Interior Theme';
        features.adasFeatures = 'ADAS Level 2+ with 22 Functionalities';
        features.appsSuite = 'Arcade App Suite (Amazon Prime Video, JioHotstar, etc apps)';
        features.navigation = 'Built-in Navigation with Mappls Auto';
        features.frontArmrest = 'Sliding Arm Rest';
        features.voiceCommands = 'Alexa Home2Car & Car2Home Connectivity';
    }

    // FEARLESS ULTRA (over Fearless X+) (Petrol Only)
    if (isFearlessUltra) {
        features.touchScreenInfotainment = '36.9 cm (14.5") Cinematic Infotainment Screen by Harman powered by Samsung Neo QLED';
        features.infotainmentScreen = '14.5 inch HD Touchscreen';
        features.adasFeatures = 'ADAS Level 2+ with 22 Functionalities';
        features.audioSystem = '10 JBL Speakers with Subwoofer + Dolby Atmos';
        features.insideRearViewMirror = 'VisioneX E-IRVM with Built-in Dual Dash Cam & DVR';
        features.dashCam = 'Built-in Dual Dash Cam & DVR';
        features.interiorTheme = 'Signature Oyster White & Titan Brown Interior Theme';
        features.appsSuite = 'Arcade App Suite (Amazon Prime Video, JioHotstar, etc apps)';
        features.navigation = 'Built-in Navigation with Mappls Auto';
        features.frontArmrest = 'Sliding Arm Rest';
        features.voiceCommands = 'Alexa Home2Car & Car2Home Connectivity';
        features.outsideRearViewMirrors = 'VisionSync Memory ORVM with Auto Reverse Dip';
        features.rearWindshieldWiper = 'ClearView Dual-Camera Washer';
        features.usbCChargingPorts = 'Fast Charge USB Type-C 65W';
    }

    // FEARLESS ULTRA RED #DARK modifier (Petrol Only)
    if (isFearlessUltra && isRedDark) {
        features.wheelSize = '19 inch';
        features.tyreSize = '245/55 R19';
        features.alloyWheels = 'R19 Dark Alloy Wheels';
        features.interiorTheme = 'Exquisite Carnelian Red Interior Theme';
        features.seatUpholstery = 'Carnelian Red Leatherette Seats';
    }

    // SEO Text Logics
    if (isSmart) {
        features.headerSummary = `The Tata Harrier ${variantName} is a towering entry into the premium D-SUV segment, packed with 6 airbags, a digital cockpit, and automatic climate control standard.`;
        features.description = `The base ${variantName} trims no corners on safety and aesthetics. Powered by the proven engine pairing, it brings 17-inch alloys, LED projector headlamps, and a pristine 7-inch digital dial setup.`;
        features.keyFeatures = '17" Alloys, Bi-LED Projector, 6 Airbags, Digital Cockpit';
        features.isValueForMoney = true;
    } else if (isPureX) {
        features.headerSummary = `The Tata Harrier ${variantName} delivers incredible value by adding a panoramic sunroof, 360-degree cameras, and 10.25-inch HARMAN displays.`;
        features.description = `The ${variantName} strikes the perfect equilibrium of premium features and pricing. With voice-assisted panoramic sunroofs and dual 10.25-inch high-definition cinematic modules, it provides an exquisite interior.`;
        features.keyFeatures = 'Panoramic Sunroof, 360 Camera, 10.25" HARMAN Screens, Rain Sensing Wipers';
        features.isValueForMoney = true;
    } else if (isAdventureX && !isAdventureXPlus) {
        features.headerSummary = `The Tata Harrier ${variantName} embraces rugged luxury with multi-drive modes, terrain response, and an Ergo lux powered driver seat.`;
        features.description = `Geared for the enthusiast, the ${variantName} adds terrain response modes for confident exploration, alongside an Ergo lux powered driver's seat and ambient mood lighting for cabin opulence.`;
        features.keyFeatures = 'Ergo Lux Powered Seat, Terrain Modes, 45W Chargers, Premium Leatherette';
    } else if (isAdventureXPlus) {
        features.headerSummary = `The Tata Harrier ${variantName} introduces quad disc brakes and Advanced Driver Assistance Systems (ADAS) to the lineup.`;
        features.description = `The ${variantName} scales up safety natively by appending Quad Disc breaking and 12 native ADAS functionalities (with Adaptive Cruise Control on AT) for highway superiority.`;
        features.keyFeatures = 'Level 1+ ADAS, Quad Disc Braking, Electronic Park Brake';
    } else if (isFearlessX && !isFearlessXPlus && !isFearlessUltra) {
        features.headerSummary = `The Tata Harrier ${variantName} crosses into unbridled luxury with a 12.3-inch screen, 9 JBL speakers, and dual-zone climate control.`;
        features.description = `Luxury reaches new heights in the ${variantName}. Highlighted by signature 18-inch alloys, ventilated front seats, and an enchanting 9 JBL speaker subwoofer system.`;
        features.keyFeatures = '12.3" Screen, 9 JBL Speakers, Ventilated Seats, Dual Zone AC';
    } else if (isFearlessXPlus && !isFearlessUltra) {
        features.headerSummary = `The Tata Harrier ${variantName} is the pinnacle of the line, boasting Level 2 ADAS (20 features), a gesture tailgate, and 7 airbags.`;
        features.description = `The flagship ${variantName} boasts a staggering 20 Level-2 ADAS features paired with a gesture-controlled tailored tailgate, 10-speaker JBL audio, and a 4-way powered co-driver seat.`;
        features.keyFeatures = 'Level 2 ADAS, 7 Airbags, Gesture Tailgate, 10 JBL Speakers';
    } else if (isFearlessUltra) {
        features.headerSummary = `The Tata Harrier ${variantName} is a masterclass in technology, boasting a 14.5-inch Samsung Neo QLED screen, Dolby Atmos, and built-in Dash Cams.`;
        features.description = `Exclusive to the petrol powertrain, the ${variantName} completely reimagines automotive tech. From its ultra-wide 14.5" Samsung Neo QLED module featuring Arcade.ev to Dolby Atmos JBL sound layering and an E-IRVM dual-dash cam.`;
        features.keyFeatures = '14.5" QLED Screen, Dolby Atmos, Dual Dash Cam, Arcade.ev';
    }

    return features;
}

const VARIANTS = [
    { name: 'Smart Petrol 1.5L Turbo Manual', price: 1289000, engineKey: '1.5L Petrol MT' },
    { name: 'Pure X Petrol 1.5L Turbo Manual', price: 1599990, engineKey: '1.5L Petrol MT' },
    { name: 'Pure X Petrol 1.5L Turbo Manual Dark Edition', price: 1663390, engineKey: '1.5L Petrol MT' },
    { name: 'Adventure X Petrol 1.5L Turbo Manual', price: 1686490, engineKey: '1.5L Petrol MT' },
    { name: 'Adventure X Plus Petrol 1.5L Turbo Manual', price: 1713590, engineKey: '1.5L Petrol MT' },
    { name: 'Adventure X Dark Edition Petrol 1.5L Turbo Manual', price: 1738490, engineKey: '1.5L Petrol MT' },
    { name: 'Adventure X Plus Dark Edition Petrol 1.5L Turbo Manual', price: 1765590, engineKey: '1.5L Petrol MT' },
    { name: 'Fearless X Petrol 1.5L Turbo Manual', price: 1999990, engineKey: '1.5L Petrol MT' },
    { name: 'Fearless X Dark Edition Petrol 1.5L Turbo Manual', price: 2065390, engineKey: '1.5L Petrol MT' },
    { name: 'Fearless X Plus Petrol 1.5L Turbo Manual', price: 2211990, engineKey: '1.5L Petrol MT' },
    { name: 'Fearless Plus Dark Edition Petrol 1.5L Turbo Manual', price: 2263990, engineKey: '1.5L Petrol MT' },
    { name: 'Fearless Ultra Petrol 1.5L Turbo Manual', price: 2271990, engineKey: '1.5L Petrol MT' },
    { name: 'Fearless Ultra Red Dark Petrol 1.5L Turbo Manual', price: 2326990, engineKey: '1.5L Petrol MT' },
    { name: 'Pure X Petrol 1.5L Turbo Automatic', price: 1753190, engineKey: '1.5L Petrol AT' },
    { name: 'Pure X Dark Edition Petrol 1.5L Turbo Automatic', price: 1791090, engineKey: '1.5L Petrol AT' },
    { name: 'Adventure X Petrol 1.5L Turbo Automatic', price: 1847290, engineKey: '1.5L Petrol AT' },
    { name: 'Adventure X Plus Petrol 1.5L Turbo Automatic', price: 1874390, engineKey: '1.5L Petrol AT' },
    { name: 'Adventure X Dark Edition Petrol 1.5L Turbo Automatic', price: 1889990, engineKey: '1.5L Petrol AT' },
    { name: 'Adventure X Plus Dark Edition Petrol 1.5L Turbo Automatic', price: 1926390, engineKey: '1.5L Petrol AT' },
    { name: 'Fearless X Petrol 1.5L Turbo Automatic', price: 2178890, engineKey: '1.5L Petrol AT' },
    { name: 'Fearless X Dark Edition Petrol 1.5L Turbo Automatic', price: 2230890, engineKey: '1.5L Petrol AT' },
    { name: 'Fearless X Plus Petrol 1.5L Turbo Automatic', price: 2353890, engineKey: '1.5L Petrol AT' },
    { name: 'Fearless X Plus Dark Edition Petrol 1.5L Turbo Automatic', price: 2405890, engineKey: '1.5L Petrol AT' },
    { name: 'Fearless Ultra Petrol 1.5L Turbo Automatic', price: 2413890, engineKey: '1.5L Petrol AT' },
    { name: 'Fearless Ultra Red Dark Petrol 1.5L Turbo Automatic', price: 2468890, engineKey: '1.5L Petrol AT' },

    { name: 'Smart Diesel 2.0L Turbo Manual', price: 1399990, engineKey: '2.0L Diesel MT' },
    { name: 'Pure X Diesel 2.0L Turbo Manual', price: 1699990, engineKey: '2.0L Diesel MT' },
    { name: 'Pure X Dark Edition Diesel 2.0L Turbo Manual', price: 1763390, engineKey: '2.0L Diesel MT' },
    { name: 'Adventure X Diesel 2.0L Turbo Manual', price: 1796490, engineKey: '2.0L Diesel MT' },
    { name: 'Adventure X Plus Diesel 2.0L Turbo Manual', price: 1829590, engineKey: '2.0L Diesel MT' },
    { name: 'Adventure X Dark Edition Diesel 2.0L Turbo Manual', price: 1848490, engineKey: '2.0L Diesel MT' },
    { name: 'Adventure X Plus Dark Edition Diesel 2.0L Turbo Manual', price: 1881590, engineKey: '2.0L Diesel MT' },
    { name: 'Fearless X Diesel 2.0L Turbo Manual', price: 2113390, engineKey: '2.0L Diesel MT' },
    { name: 'Fearless X Dark Edition Diesel 2.0L Turbo Manual', price: 2165390, engineKey: '2.0L Diesel MT' },
    { name: 'Fearless X Plus Diesel 2.0L Turbo Manual', price: 2311990, engineKey: '2.0L Diesel MT' },
    { name: 'Fearless X Plus Dark Edition Diesel 2.0L Turbo Manual', price: 2363990, engineKey: '2.0L Diesel MT' },
    { name: 'Stealth Edition Diesel 2.0L Turbo Manual', price: 2382990, engineKey: '2.0L Diesel MT' },
    { name: 'Pure X Diesel 2.0L Turbo Automatic', price: 1853190, engineKey: '2.0L Diesel AT' },
    { name: 'Pure X Dark Edition Diesel 2.0L Turbo Automatic', price: 1891090, engineKey: '2.0L Diesel AT' },
    { name: 'Adventure X Diesel 2.0L Turbo Automatic', price: 1957290, engineKey: '2.0L Diesel AT' },
    { name: 'Adventure X Plus Diesel 2.0L Turbo Automatic', price: 1990390, engineKey: '2.0L Diesel AT' },
    { name: 'Adventure X Dark Edition Diesel 2.0L Turbo Automatic', price: 1999990, engineKey: '2.0L Diesel AT' },
    { name: 'Adventure X Plus Dark Edition Diesel 2.0L Turbo Automatic', price: 2042390, engineKey: '2.0L Diesel AT' },
    { name: 'Fearless X Diesel 2.0L Turbo Automatic', price: 2278890, engineKey: '2.0L Diesel AT' },
    { name: 'Fearless X Dark Edition Diesel 2.0L Turbo Automatic', price: 2330890, engineKey: '2.0L Diesel AT' },
    { name: 'Fearless X Plus Diesel 2.0L Turbo Automatic', price: 2453890, engineKey: '2.0L Diesel AT' },
    { name: 'Fearless X Plus Dark Edition Diesel 2.0L Turbo Automatic', price: 2505890, engineKey: '2.0L Diesel AT' },
    { name: 'Stealth Edition Diesel 2.0L Turbo Automatic', price: 2524890, engineKey: '2.0L Diesel AT' }
];

async function updateVariants() {
    console.log("Starting Tata Harrier Variants Update...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const modelId = 'model-brand-tata-motors-harrier';
        const brandId = 'brand-tata-motors';

        const model = await Model.findOne({ id: modelId });
        if (!model) {
            console.error("Harrier model not found!");
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
            console.log(`Success! Bulk updated/inserted ${variantOps.length} Harrier variants.`);
        }
        
        if (minPrice !== Infinity && maxPrice !== 0) {
            await Model.updateOne({ id: modelId }, { $set: { minPrice, maxPrice } });
            console.log(`Updated Harrier price range: ₹${minPrice} - ₹${maxPrice}`);
        }

    } catch (e) {
        console.error("Error updating variants:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateVariants();
