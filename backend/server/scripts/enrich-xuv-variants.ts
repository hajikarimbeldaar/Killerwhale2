import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function enrichVariants() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        const modelId = 'model-brand-mahindra-xuv700';
        const variants = await db.collection('variants').find({ modelId }).toArray();

        console.log(`Found ${variants.length} variants to enrich.`);

        for (const variant of variants) {
            const name = variant.name;
            const isPetrol = name.includes('Petrol');
            const isDiesel = name.includes('Diesel');
            const isAutomatic = name.includes('Automatic');
            const isAWD = name.includes('AWD');
            const is6STR = name.includes('6 STR');
            const is7STR = name.includes('7 STR');

            // Determine Trim
            let trim = 'AX';
            if (name.includes('AX3')) trim = 'AX3';
            else if (name.includes('AX5')) trim = 'AX5';
            else if (name.includes('AX7 L')) trim = 'AX7 L';
            else if (name.includes('AX7 T')) trim = 'AX7 T';
            else if (name.includes('AX7')) trim = 'AX7';

            // 1. Key Features based on trim
            let keyFeaturesArr = ['6 Airbags', 'LED DRLs', 'Smart Door Handles', 'Power Windows'];
            if (trim === 'AX') {
                keyFeaturesArr.push('Dual 10.25-inch Screens', 'Android Auto & Apple CarPlay');
            } else if (trim === 'AX3') {
                keyFeaturesArr.push('10.25-inch Digital Cluster', 'Wireless Android Auto', '6 Speakers', 'Rear Wiper');
            } else if (trim === 'AX5') {
                keyFeaturesArr.push('Skyroof (Panoramic Sunroof)', '17" Diamond Cut Alloys', 'Curtain Airbags', 'Fog Lamps');
            } else if (trim === 'AX7') {
                keyFeaturesArr.push('Triple 12.3-inch Screen Layout', 'Level 2 ADAS', 'Dual Zone Climate Control', 'Leatherette Seats', 'Memory Driver Seat');
            } else if (trim === 'AX7 T') {
                keyFeaturesArr.push('16-speaker Harman Kardon Audio', '360° Camera with 540° View', 'Blind View Monitor', 'Wireless Charger');
            } else if (trim === 'AX7 L') {
                keyFeaturesArr.push('Ventilated Front Seats', 'Electronic Parking Brake', 'Passive Entry', 'Adaptive Cruise Control (AT only)');
            }

            const keyFeatures = keyFeaturesArr.join(', ');

            // 2. SEO Content
            const headerSummary = `${name} is a feature-rich SUV offering premium comfort and performance. With a ${isPetrol ? '2.0L Turbo Petrol' : '2.2L Turbo Diesel'} engine and ${trim} trim features, it's designed for modern Indian families.`;
            const description = `${name} (Mahindra XUV 7XO) comes with ${isAutomatic ? 'Automatic' : 'Manual'} transmission and ${isAWD ? 'All-Wheel Drive' : 'Front-Wheel Drive'}. Key highlights include ${keyFeatures}. Prices start at ₹${(variant.price / 100000).toFixed(2)} Lakh (Ex-showroom).`;

            // 3. Technical Specs (The 180+ fields - filling key ones specifically and using pattern for others)
            const specs: any = {
                // Dimensions
                length: "4695 mm",
                width: "1890 mm",
                height: "1755 mm",
                wheelbase: "2750 mm",
                groundClearance: "200 mm",
                fuelTankCapacity: "60 Litres",
                seatingCapacity: is6STR ? "6" : "7",
                doors: "5",

                // Engine & Transmission
                engineName: isPetrol ? "2.0 mStallion Turbo Petrol" : "2.2 mHawk Turbo Diesel",
                displacement: isPetrol ? "1997 cc" : "2184 cc",
                power: isPetrol ? "197 BHP @ 5000 rpm" : "182 BHP @ 3500 rpm",
                torque: isPetrol ? "380 Nm @ 1750-3000 rpm" : (isAutomatic ? "450 Nm @ 1750-2800 rpm" : "420 Nm @ 1750-2800 rpm"),
                transmission: isAutomatic ? "Automatic" : "Manual",
                noOfGears: "6",
                driveType: isAWD ? "AWD" : "FWD",
                fuelType: isPetrol ? "Petrol" : "Diesel",
                cylinders: "4",
                valvesPerCylinder: "4",

                // Suspension & Brakes
                frontSuspension: "McPherson Strut Independent Suspension with FSD and Stabilizer bar",
                rearSuspension: "Multi-link Independent Suspension with FSD and Stabilizer bar",
                frontBrake: "Ventilated Disc",
                rearBrake: "Solid Disc",

                // Safety
                airbags: "6",
                airbagsLocation: "Driver, Passenger, Side & Curtain (AX5+)",
                abs: "Yes",
                ebd: "Yes",
                esc: "Yes (AX5+)",
                adasLevel: (trim.startsWith('AX7')) ? "2" : "0",
                tyrePressureMonitor: (trim !== 'AX') ? "Yes" : "No",

                // Comfort
                sunroof: (trim === 'AX5' || trim.startsWith('AX7')) ? "Panoramic (Skyroof)" : "No",
                climateControl: (trim.startsWith('AX7')) ? "Dual Zone Automatic" : "Manual",
                rearACVents: "Yes",
                ventilatedSeats: (trim === 'AX7 L') ? "Yes (Front Only)" : "No",
                
                // Infotainment
                touchScreenInfotainment: "Yes",
                infotainmentScreen: (trim.startsWith('AX7')) ? "12.3 inch (Triple Layout)" : "10.25 inch",
                speakers: (trim === 'AX7 T' || trim === 'AX7 L') ? "16 (Harman Kardon)" : (trim === 'AX3' || trim === 'AX5' ? "6" : "4"),

                // Status
                status: 'active',
                isVisible: true,
                isValueForMoney: (trim === 'AX5' || trim === 'AX7'),
                keyFeatures: keyFeatures,
                headerSummary: headerSummary,
                description: description,
                exteriorDesign: `The XUV 7XO ${trim} features a bold SUV stance with 7-shaped LED DRLs and ${trim.startsWith('AX7') ? '18-inch' : (trim === 'AX5' ? '17-inch' : '17-inch steel')} wheels.`,
                comfortConvenience: `Experience premium cabin space in the ${name} with ${is6STR ? 'Captain Seats' : 'Bench Seats'} and ${trim.startsWith('AX7') ? 'Leatherette upholstery' : 'Fabric trim'}.`,
                updatedAt: new Date()
            };

            await db.collection('variants').updateOne(
                { _id: variant._id },
                { $set: specs }
            );

            console.log(`Updated: ${name}`);
        }

        console.log('Enrichment completed successfully!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Enrichment failed:', err);
    }
}

enrichVariants();
