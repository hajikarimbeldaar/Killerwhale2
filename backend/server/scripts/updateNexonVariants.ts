/**
 * Update Tata Nexon Variants
 * Applies standard Bhp, parses Persona Walk (Smart/Pure/Creative/Fearless).
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Variant, Model } from '../db/schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const ENGINES = {
    '1.2L Turbo Petrol 5MT': {
        engineName: '1.2L Turbocharged Revotron Engine',
        engineType: '3-cylinder',
        displacement: '1199',
        engineCapacity: '1199 cc',
        power: '118 Bhp',
        maxPower: '118 Bhp',
        enginePower: '118 Bhp @ 5500 rpm',
        torque: '170 Nm',
        engineTorque: '170 Nm @ 1750-4000 rpm',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        transmission: 'Manual',
        engineTransmission: '5 Speed Manual',
        driveType: 'FWD',
        noOfGears: '5',
        engineSpeed: '5 Speed',
        turboCharged: 'Yes',
        bootSpace: '382 Litres',
    },
    '1.2L Turbo Petrol 6MT': {
        engineName: '1.2L Turbocharged Revotron Engine',
        engineType: '3-cylinder',
        displacement: '1199',
        engineCapacity: '1199 cc',
        power: '118 Bhp',
        maxPower: '118 Bhp',
        enginePower: '118 Bhp @ 5500 rpm',
        torque: '170 Nm',
        engineTorque: '170 Nm @ 1750-4000 rpm',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        transmission: 'Manual',
        engineTransmission: '6 Speed Manual',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
        bootSpace: '382 Litres',
    },
    '1.2L Turbo Petrol AMT': {
        engineName: '1.2L Turbocharged Revotron Engine',
        engineType: '3-cylinder',
        displacement: '1199',
        engineCapacity: '1199 cc',
        power: '118 Bhp',
        maxPower: '118 Bhp',
        enginePower: '118 Bhp @ 5500 rpm',
        torque: '170 Nm',
        engineTorque: '170 Nm @ 1750-4000 rpm',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        transmission: 'Automatic',
        engineTransmission: '6 Speed AMT',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
        bootSpace: '382 Litres',
    },
    '1.2L Turbo Petrol DCT': {
        engineName: '1.2L Turbocharged Revotron Engine',
        engineType: '3-cylinder',
        displacement: '1199',
        engineCapacity: '1199 cc',
        power: '118 Bhp',
        maxPower: '118 Bhp',
        enginePower: '118 Bhp @ 5500 rpm',
        torque: '170 Nm',
        engineTorque: '170 Nm @ 1750-4000 rpm',
        fuelType: 'Petrol',
        fuel: 'Petrol',
        transmission: 'Automatic',
        engineTransmission: '7 Speed DCA (Dual Clutch)',
        driveType: 'FWD',
        noOfGears: '7',
        engineSpeed: '7 Speed',
        turboCharged: 'Yes',
        bootSpace: '382 Litres',
    },
    '1.5L Turbo Diesel 6MT': {
        engineName: '1.5L Turbocharged Revotorq Engine',
        engineType: '4-cylinder',
        displacement: '1497',
        engineCapacity: '1497 cc',
        power: '113 Bhp',
        maxPower: '113 Bhp',
        enginePower: '113 Bhp @ 3750 rpm',
        torque: '260 Nm',
        engineTorque: '260 Nm @ 1500-2750 rpm',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        transmission: 'Manual',
        engineTransmission: '6 Speed Manual',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
        bootSpace: '382 Litres',
    },
    '1.5L Turbo Diesel AMT': {
        engineName: '1.5L Turbocharged Revotorq Engine',
        engineType: '4-cylinder',
        displacement: '1497',
        engineCapacity: '1497 cc',
        power: '113 Bhp',
        maxPower: '113 Bhp',
        enginePower: '113 Bhp @ 3750 rpm',
        torque: '260 Nm',
        engineTorque: '260 Nm @ 1500-2750 rpm',
        fuelType: 'Diesel',
        fuel: 'Diesel',
        transmission: 'Automatic',
        engineTransmission: '6 Speed AMT',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
        bootSpace: '382 Litres',
    },
    '1.2L Turbo CNG 6MT': {
        engineName: '1.2L Turbocharged Revotron CNG Engine',
        engineType: '3-cylinder',
        displacement: '1199',
        engineCapacity: '1199 cc',
        power: '99 Bhp (CNG Mode)',
        maxPower: '99 Bhp',
        enginePower: '99 Bhp @ 5000 rpm (CNG) | 119 Bhp @ 5000 rpm (Petrol)',
        torque: '170 Nm',
        engineTorque: '170 Nm @ 2000 rpm (CNG) | 170 Nm @ 1750 rpm (Petrol)',
        fuelType: 'CNG',
        fuel: 'CNG',
        transmission: 'Manual',
        engineTransmission: '6 Speed Manual',
        driveType: 'FWD',
        noOfGears: '6',
        engineSpeed: '6 Speed',
        turboCharged: 'Yes',
        bootSpace: '321 Litres (due to Twin-Cylinder structure)',
    }
};

const COMMON_SPECS = {
    length: '3995',
    width: '1804',
    height: '1620',
    wheelbase: '2498',
    groundClearance: '208',
    fuelTankCapacity: '44 L',
    seatingCapacity: '5',
    doors: '5',
    frontSuspension: 'Independent, Lower Wishbone, McPherson Strut with Coil Spring',
    rearSuspension: 'Semi-independent, Open Profile Twist Beam with Stabiliser Bar, Coil Spring and Shock Absorber',
    frontBrake: 'Disc',
    rearBrake: 'Drum',
    discBrakes: 'Front',
    drivingModes: 'Multi-Drive Modes (Eco, City, Sport)',
};

function getVariantFeatures(variantName: string) {
    let features: Record<string, any> = {};
    const nameUpper = variantName.toUpperCase();
    
    // Engine/Transmission Detections
    const isAMT = nameUpper.includes('AMT');
    const isDCA = nameUpper.includes('DCT') || nameUpper.includes('DCA');
    const isAT = isAMT || isDCA;
    
    // Special Edition Detections
    const isDark = nameUpper.includes('DARK EDITION') && !nameUpper.includes('RED DARK');
    const isRedDark = nameUpper.includes('RED DARK');
    
    // Trim Detections + Base hierarchy resolving
    // Smart hierarchy
    const isSmartBase = nameUpper.includes('SMART') && !nameUpper.includes('SMART PLUS');
    const isSmartPlus = nameUpper.includes('SMART PLUS') && !nameUpper.includes('SMART PLUS (S)') && !nameUpper.includes('SMART + S');
    const isSmartPlusS = nameUpper.includes('SMART PLUS (S)') || nameUpper.includes('SMART + S');
    
    // Pure hierarchy
    const isPurePlus = nameUpper.includes('PURE PLUS') && !nameUpper.includes('PURE PLUS (S)');
    const isPurePlusS = nameUpper.includes('PURE PLUS (S)');
    
    // Creative hierarchy
    const isCreative = nameUpper.includes('CREATIVE') && !nameUpper.includes('CREATIVE PLUS');
    const isCreativePlusS = nameUpper.includes('CREATIVE PLUS (S)');
    const isCreativePlusPS = nameUpper.includes('CREATIVE PLUS (PS)');
    
    // Fearless hierarchy
    const isFearlessPlusPS = nameUpper.includes('FEARLESS PLUS (PS)');

    // Accumulating Hierarchy Check
    const hasSmartPlus = isSmartPlus || isSmartPlusS || isPurePlus || isPurePlusS || isCreative || isCreativePlusS || isCreativePlusPS || isFearlessPlusPS;
    const hasSmartPlusS = isSmartPlusS || isPurePlusS || isCreativePlusS || isCreativePlusPS || isFearlessPlusPS; // Includes sunroof
    const hasPurePlus = isPurePlus || isPurePlusS || isCreative || isCreativePlusS || isCreativePlusPS || isFearlessPlusPS;
    const hasCreative = isCreative || isCreativePlusS || isCreativePlusPS || isFearlessPlusPS;
    const hasCreativePlusS = isCreativePlusS || isCreativePlusPS || isFearlessPlusPS;
    const hasCreativePlusPS = isCreativePlusPS || isFearlessPlusPS;
    const hasFearlessPlusPS = isFearlessPlusPS;

    // BASE (SMART)
    features.airbags = '6 Airbags';
    features.airbagsLocation = 'Driver, Co-Driver, Curtain & Side Airbags';
    features.headLights = 'LED Head Lamps';
    features.headlights = 'LED';
    features.daytimeRunningLights = 'LED DRLs';
    features.drl = 'Yes';
    features.tailLights = 'LED Tail Lamps';
    features.tailLight = 'LED';
    features.wheelSize = '16 inch';
    features.tyreSize = '195/60 R16';
    features.alloyWheels = 'R16 Steel Wheels (No Cover)';
    features.electronicStabilityProgram = 'Yes (with Traction Control, Roll Over Mitigation)';
    features.esc = 'Yes';
    features.steeringAdjustment = '2-Spoke Steering Wheel with Illuminated Logo';
    features.powerWindows = 'Front Only';
    features.insideRearViewMirror = 'Day/Night IRVM';
    features.isofixMounts = 'Yes';
    features.isofix = 'Yes';
    features.outsideRearViewMirrors = 'Rear Spoiler ORVM with Side Indicators';
    features.instrumentCluster = 'Full Digital Cluster';
    features.centralLocking = 'Central Locking with Key';
    features.heightAdjustableHeadrest = 'All-adjustable Headrest (Front & Rear)';
    
    // SMART + (over Smart)
    if (hasSmartPlus) {
        features.alloyWheels = 'R16 Steel Wheels with Cover';
        features.centralLocking = 'Remote Central Locking Flip Key';
        features.outsideRearViewMirrors = 'Electrically Operated ORVM';
        features.touchScreenInfotainment = '17.78 cm (7") HARMAN Touchscreen with Apple CarPlay/Android Auto';
        features.infotainmentScreen = '7 inch Touchscreen';
        features.androidAppleCarplay = 'Yes (Wired)';
        features.speakers = '4 Speakers'; // Note: Brochure says 2, but practically the tier gets 4 speakers later so 2 is base Smart+
        if (!hasPurePlus) { features.speakers = '2 Speakers'; }
        features.powerWindows = 'All Power Windows (Front & Rear)';
        features.steeringWheelTrim = 'Steering Wheel Controls';
        features.usbChargingPorts = 'USB Charging Port A Type';
        features.followMeHomeHeadlights = 'Follow Me Home Headlamps';
        if (isAT) {
            features.gearShifter = 'E-Shifter';
            features.paddleShifter = 'Paddle Shifters (AMT/DCA)';
        }
    }

    // SMART + S (over Smart +)
    // S variants basically add Sunroof + Auto Wipers/Lights
    if (hasSmartPlusS) {
        features.sunroof = 'Voice-assisted Electric Sunroof';
        features.automaticHeadlamp = 'Auto Headlamps';
        features.rainSensingWipers = 'Rain-Sensing Wipers';
        features.roofRails = 'Yes';
    }

    // PURE + (over Smart +)
    if (hasPurePlus) {
        features.touchScreenInfotainment = '26.03 cm (10.25") Touchscreen Infotainment By HARMAN';
        features.infotainmentScreen = '10.25 inch HD Touchscreen';
        features.androidAppleCarplay = 'Yes (Wireless)';
        features.reverseCamera = 'HD Rear View Camera';
        features.parkingCamera = 'HD Rear';
        features.outsideRearViewMirrors = 'Auto-Fold ORVM';
        features.orvm = 'Auto Fold ORVM';
        features.driverSeatAdjustment = 'Height Adjustable Driver Seat';
        features.frontArmrest = 'Front Armrest';
        features.rearACVents = 'Rear AC Vents';
        features.outsideDoorHandles = 'Body-Coloured Door Handles';
        features.radioAntenna = 'Shark Fin Antenna';
        features.instrumentCluster = '10.16 cm (4") Full Digital Instrument Cluster';
    }

    // CREATIVE (over Pure +)
    if (hasCreative) {
        features.surroundViewMonitor = '360° HD Surround View System with Blind View Monitor';
        features.parkingCamera = '360 View';
        features.tyreSize = '215/60 R16';
        features.alloyWheels = 'R16 Alloy Wheels';
        features.keylessEntry = 'Push Button Start';
        features.pushButtonStart = 'Yes';
        features.ignition = 'Push Button Start';
        features.climateControl = 'Fully Automatic Temperature Control (FATC) with Capacitive touch';
        features.airConditioning = 'Automatic';
        features.cruiseControl = 'Yes';
        features.rearWindshieldWiper = 'Hidden Rear Wiper and Washer';
        features.usbChargingPorts = 'USB Charging port A type + C Type';
        features.cooledGlovebox = 'Cooled Glovebox';
        // Note: Touch Based Control Panel is covered in Capacitive touch info
    }

    // CREATIVE + S (over Creative)
    // Inherits Sunroof & Wipers from hasSmartPlusS hierarchy logic above.

    // CREATIVE + PS (over Creative + S)
    if (hasCreativePlusPS) {
        features.headLights = 'Bi-LED Headlamp';
        features.headlights = 'Bi-LED Projector';
        features.tailLights = 'Wide "X Graphic" Full LED Taillights';
        features.frontFogLights = 'Front Fog Lamp with Cornering';
        features.fogLights = 'Yes (LED with Cornering)';
        features.wirelessCharging = 'Wireless Charger';
        features.tyrePressureMonitor = 'Yes (TPMS)';
        features.rearWindshieldDefogger = 'Rear Defogger';
        features.splitRearSeat = '60:40 Flip & Fold Seats';
        features.rearArmrest = 'Rear Seat Armrest with Cup Holder';
        features.keylessEntry = 'Passive Entry Passive Start';
        features.parcelShelf = 'Parcel Tray';
        features.speakers = '4 Speakers + 2 Tweeters';
        features.tweeters = '2 Tweeters';
        features.parkingSensor = 'Front and Rear Parking Sensor';
        features.parkingSensors = 'Front & Rear';
        features.sunroof = 'Panoramic Sunroof'; // Upgrade from voice-electric to Panoramic
    }

    // FEARLESS + PS (over Creative + PS)
    if (hasFearlessPlusPS) {
        features.daytimeRunningLights = 'Sequential LED DRLs and Taillamp with Welcome/Goodbye Signature';
        features.touchScreenInfotainment = '26.03 cm (10.25") Slim Bezel Touchscreen Infotainment System by HARMAN';
        features.ventilatedSeats = 'Ventilated Driver & Co-Driver Seat';
        features.seatUpholstery = 'Premium Benecke Kaliko Leatherette Seats';
        features.airPurifier = 'Air Purifier';
        features.insideRearViewMirror = 'Auto-dimming IRVM';
        features.lightInBoot = 'Boot Lamp';
        features.frontArmrest = 'Grand Console with Armrest Leatherette';
        features.steeringWheelTrim = 'Leather-wrapped Steering Wheel';
        features.interiorTheme = 'Door Trim with Soft Touch';
        features.usbCChargingPorts = 'A + C type USB Charger Rear 2nd Row';
        features.speakers = '4 Speakers + 4 Tweeters';
        features.tweeters = '4 Tweeters';
        features.coolingTech = 'Xpress Cooling';
        features.chargingPorts = 'Boot Power Outlet';
        features.interiorDoorHandles = 'Chrome Inner Door Handles';
        features.seatbeltAdjustment = 'Height Adjustable Front Seat Belts';
        features.sunroof = 'Voice-assisted Electric Panoramic Sunroof';
        features.audioSystem = 'JBL Branded Speaker System + Subwoofer';
        features.subwoofers = '1 Subwoofer';
        features.sosFunction = 'Emergency Call & Breakdown Call';
        features.connectedCarTech = 'iRA Connected Vehicle Features (Remote Engine Start/Stop, Nav, Diagnostices, OTA, Weather)';
        features.rearWindowSunshade = 'Rear sunshade';
        features.adasLevel = 'ADAS Level 1';
        features.adasFeatures = 'Front Collision Warning, Autonomous Emergency Braking, Lane Centering, Traffic Sign Recognition, Lane Departure Warning, High Beam Assist, Lane Keep Assist';
    }

    // SPECIAL EDITIONS Logic
    if (isDark) {
        features.alloyWheels = 'R16 Black Alloy Wheels';
        features.interiorTheme = '#DARK Black Interior Theme';
        features.exteriorDesign = '#DARK Exterior with Black Roof';
    }
    if (isRedDark) {
        features.alloyWheels = 'R16 Black Alloy Wheels';
        features.interiorTheme = 'Red #DARK Theme with Red Leatherette Seats';
        features.exteriorDesign = '#DARK Exterior with Red Accents';
    }
    
    // SEO Logic
    if (isSmartBase || isSmartPlus) {
        features.headerSummary = `The Tata Nexon ${variantName} is a stellar starting point into the segment's most structurally sound compact SUV.`;
        features.description = `The foundation of the lineup, the ${variantName} trims none of the basics. Featuring 6 airbags, full LED lighting setups, and ESP as standard, it is an extremely safe baseline loaded with digital flair.`;
        features.keyFeatures = '6 Airbags, LED Headlamps/TailLamps, Digital Cluster, ESP';
        features.isValueForMoney = true;
    } else if (isPurePlus) {
        features.headerSummary = `The Tata Nexon ${variantName} is the essential intelligent compact SUV combining HARMAN audio and responsive powertrains.`;
        features.description = `For those who want substantial tech without maxing out their budget, the ${variantName} serves a 10.25-inch infotainment tablet linked to a powerful 4-speaker setup. It strikes an ideal balance.`;
        features.keyFeatures = '10.25" Screen, Wireless CarPlay, HD Reverse Camera, Auto-Fold ORVM';
        features.isValueForMoney = true;
    } else if (hasCreative && !hasCreativePlusPS) {
        features.headerSummary = `The Tata Nexon ${variantName} is stylish and lavish, bringing 360-degree cameras and fully automatic climate controls into the mix.`;
        features.description = `Marking a strong leap into luxury, the ${variantName} outfits the compact SUV with comprehensive 360-degree surround views, sophisticated 16-inch alloy styling, and capacitive touch climate interfaces.`;
        features.keyFeatures = '360 Camera, 16" Alloys, FATC with Touch, Push Button Start';
    } else if (hasCreativePlusPS && !hasFearlessPlusPS) {
        features.headerSummary = `The Tata Nexon ${variantName} adds the premium panoramic sunroof and front parking sensors to the dynamic driving experience.`;
        features.description = `The mid-to-high ${variantName} configuration introduces a breathtaking panoramic sunroof to open up the cabin, paired with front parking sensors and Bi-LED projectors for assured urban maneuvers.`;
        features.keyFeatures = 'Panoramic Sunroof, Bi-LED Projector, Front Parking Sensors, TPMS';
    } else if (hasFearlessPlusPS) {
        features.headerSummary = `The flagship Tata Nexon ${variantName} establishes luxury supremacy with ADAS safety suites, JBL Subwoofers, and ventilated seating.`;
        features.description = `The pinnacle ${variantName} holds nothing back. It guarantees an executive experience via ventilated premium leatherette seats, a thumping JBL speaker and subwoofer system, and critically, an advanced automated ADAS safety net.`;
        features.keyFeatures = 'ADAS (Lane Centering, AEB), Ventilated Seats, JBL Subwoofer, Slim Bezel Screen';
    }

    return features;
}

const VARIANTS = [
    { name: 'Smart Petrol 1.2L Turbo 5 Speed Manual', price: 731890, engineKey: '1.2L Turbo Petrol 5MT' },
    { name: 'Smart Plus Petrol 1.2L Turbo 5 Speed Manual', price: 799990, engineKey: '1.2L Turbo Petrol 5MT' },
    { name: 'Smart Plus (S) Petrol 1.2L Turbo 5 Speed Manual', price: 829990, engineKey: '1.2L Turbo Petrol 5MT' },
    { name: 'Pure Plus Petrol 1.2L Turbo 6 Speed Manual', price: 887390, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Pure Plus (S) Petrol 1.2L Turbo 6 Speed Manual', price: 914890, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Creative Petrol 1.2L Turbo 6 Speed Manual', price: 999990, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Creative Plus (S) Petrol 1.2L Turbo 6 Speed Manual', price: 1033790, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Creative Plus (S) Petrol 1.2L Turbo 6 Speed Manual Dark Edition', price: 1070390, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Creative Plus (PS) Petrol 1.2L Turbo 6 Speed Manual Dual Tone', price: 1125190, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Creative Plus (PS) Petrol 1.2L Turbo 6 Speed Manual Dual Tone Dark Edition', price: 1161790, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo 6 Speed Manual Dark Edition', price: 1234990, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo 6 Speed Manual', price: 1216690, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo 6 Speed Manual Red Dark Edition', price: 1244990, engineKey: '1.2L Turbo Petrol 6MT' },
    { name: 'Smart Plus Petrol 1.2L Turbo Automatic (AMT)', price: 878290, engineKey: '1.2L Turbo Petrol AMT' },
    { name: 'Pure Plus Petrol 1.2L Turbo Automatic (AMT)', price: 951390, engineKey: '1.2L Turbo Petrol AMT' },
    { name: 'Pure Plus (S) Petrol 1.2L Turbo Automatic (AMT)', price: 978890, engineKey: '1.2L Turbo Petrol AMT' },
    { name: 'Creative Petrol 1.2L Turbo Automatic (AMT)', price: 1070390, engineKey: '1.2L Turbo Petrol AMT' },
    { name: 'Creative Plus (S) Petrol 1.2L Turbo Automatic (AMT)', price: 1097790, engineKey: '1.2L Turbo Petrol AMT' },
    { name: 'Creative Petrol 1.2L Turbo Automatic (DCT)', price: 1116090, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Creative Plus (S) Petrol 1.2L Turbo Automatic (AMT) Dark Edition', price: 1134390, engineKey: '1.2L Turbo Petrol AMT' },
    { name: 'Creative Plus (PS) Petrol 1.2L Turbo Automatic (DCT) Dual Tone', price: 1234990, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Creative Plus (PS) Petrol 1.2L Turbo Automatic (DCT)', price: 1271590, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo Automatic (DCT) Dual Tone', price: 1326490, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo Automatic (DCT) Dark Edition', price: 1344790, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo Automatic (DCT)', price: 1353490, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Fearless Plus (PS) Petrol 1.2L Turbo Automatic (DCT) Red Dark Edition', price: 1381790, engineKey: '1.2L Turbo Petrol DCT' },
    { name: 'Smart CNG 1.2L Turbo 6 Speed Manual', price: 823390, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Smart Plus CNG 1.2L Turbo 6 Speed Manual', price: 914890, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Smart Plus (S) CNG 1.2L Turbo 6 Speed Manual', price: 942290, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Pure Plus CNG 1.2L Turbo 6 Speed Manual', price: 978890, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Pure Plus (S) CNG 1.2L Turbo 6 Speed Manual', price: 999990, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Creative CNG 1.2L Turbo 6 Speed Manual', price: 1097790, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Creative Plus (S) CNG 1.2L Turbo 6 Speed Manual', price: 1125190, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Creative Plus (S) CNG 1.2L Turbo 6 Speed Manual Dark Edition', price: 1161790, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Creative Plus (PS) CNG 1.2L Turbo 6 Speed Manual Dual Tone', price: 1216690, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Creative Plus (PS) CNG 1.2L Turbo 6 Speed Manual', price: 1253290, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Fearless Plus (PS) CNG 1.2L Turbo 6 Speed Manual Dual Tone', price: 1308190, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Fearless Plus (PS) CNG 1.2L Turbo 6 Speed Manual Dark Edition', price: 1326490, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Fearless Plus (PS) CNG 1.2L Turbo 6 Speed Manual', price: 1336490, engineKey: '1.2L Turbo CNG 6MT' },
    { name: 'Smart Plus Diesel 1.5L Turbo 6 Speed Manual', price: 900890, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Smart Plus (S) Diesel 1.5L Turbo 6 Speed Manual', price: 927890, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Pure Plus Diesel 1.5L Turbo 6 Speed Manual', price: 990990, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Pure Plus (S) Diesel 1.5L Turbo 6 Speed Manual', price: 1017990, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Creative Diesel 1.5L Turbo 6 Speed Manual', price: 1117090, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Creative Plus (S) Diesel 1.5L Turbo 6 Speed Manual', price: 1144090, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Creative Plus (S) Diesel 1.5L Turbo 6 Speed Manual Dark Edition', price: 1180090, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Creative Plus (PS) Diesel 1.5L Turbo 6 Speed Manual Dual Tone', price: 1234190, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Creative Plus (PS) Diesel 1.5L Turbo 6 Speed Manual Dual Tone Dark Edition', price: 1270190, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Fearless Plus (PS) Diesel 1.5L Turbo 6 Speed Manual Dual Tone', price: 1324190, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Fearless Plus (PS) Diesel 1.5L Turbo 6 Speed Manual Dark Edition', price: 1342290, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Fearless Plus (PS) Diesel 1.5L Turbo 6 Speed Manual', price: 1352290, engineKey: '1.5L Turbo Diesel 6MT' },
    { name: 'Pure Plus Diesel 1.5L Turbo Automatic (AMT)', price: 1053990, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Creative Diesel 1.5L Turbo Automatic (AMT)', price: 1180090, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Creative Plus (S) Diesel 1.5L Turbo Automatic (AMT)', price: 1207090, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Creative Plus (S) Diesel 1.5L Turbo Automatic (AMT) Dark Edition', price: 1243190, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Creative Plus (PS) Diesel 1.5L Turbo Automatic (AMT) Dual Tone', price: 1297190, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Creative Plus (PS) Diesel 1.5L Turbo Automatic (AMT)', price: 1333290, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Fearless Plus (PS) Diesel 1.5L Turbo Automatic (AMT) Dual Tone', price: 1387290, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Fearless Plus (PS) Diesel 1.5L Turbo Automatic (AMT) Dark Edition', price: 1405290, engineKey: '1.5L Turbo Diesel AMT' },
    { name: 'Fearless Plus (PS) Diesel 1.5L Turbo Automatic (AMT)', price: 1415290, engineKey: '1.5L Turbo Diesel AMT' }
];

async function updateVariants() {
    console.log("Starting Tata Nexon Variants Update...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    try {
        const modelId = 'model-brand-tata-motors-nexon';
        const brandId = 'brand-tata-motors';

        const model = await Model.findOne({ id: modelId });
        if (!model) {
            console.error("Nexon model not found!");
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
            console.log(`Success! Bulk updated/inserted ${variantOps.length} Nexon variants.`);
        }
        
        if (minPrice !== Infinity && maxPrice !== 0) {
            await Model.updateOne({ id: modelId }, { $set: { minPrice, maxPrice } });
            console.log(`Updated Nexon price range: ₹${minPrice} - ₹${maxPrice}`);
        }

    } catch (e) {
        console.error("Error updating variants:", e);
    } finally {
        await mongoose.disconnect();
    }
}

updateVariants();
