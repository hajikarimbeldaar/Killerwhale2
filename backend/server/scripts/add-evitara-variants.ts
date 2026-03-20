import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function addEvitaraVariants() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection.db;

        const brandId = 'brand-maruti-suzuki';
        const modelId = 'model-brand-maruti-suzuki-e-vitara';

        const variantsData = [
            {
                name: "Delta 49.0 kWh",
                price: 1599000,
                battery: "49 kWh",
                range: "440 km",
                power: "144 hp (105.8 kW)",
                torque: "193 Nm",
                trim: "Delta"
            },
            {
                name: "Zeta 61.0 kWh",
                price: 1749000,
                battery: "61 kWh",
                range: "543 km",
                power: "174 hp (128 kW)",
                torque: "193 Nm",
                trim: "Zeta"
            },
            {
                name: "Alpha 61.0 kWh",
                price: 1979000,
                battery: "61 kWh",
                range: "543 km",
                power: "174 hp (128 kW)",
                torque: "193 Nm",
                trim: "Alpha"
            },
            {
                name: "Alpha 61.0 kWh Dual Tone",
                price: 2001000,
                battery: "61 kWh",
                range: "543 km",
                power: "174 hp (128 kW)",
                torque: "193 Nm",
                trim: "Alpha Dual Tone"
            }
        ];

        console.log(`Adding ${variantsData.length} variants for e-Vitara...`);

        for (const data of variantsData) {
            const variantId = `variant-evitara-${data.name.toLowerCase().replace(/ /g, '-').replace(/\./g, '-')}`;
            
            // Features mapping
            let keyFeaturesArr = ['7 Airbags', '10.25-inch Digital Cluster', 'Automatic AC', 'LED DRLs', 'Electronic Parking Brake'];
            if (data.trim === 'Delta') {
                keyFeaturesArr.push('10.1-inch Infotainment', 'Projector Headlamps', '4 Speakers');
            } else if (data.trim === 'Zeta') {
                keyFeaturesArr.push('18-inch Alloy Wheels', 'Rear Wiper', 'Reverse Camera', 'Wireless Charger');
            } else if (data.trim.startsWith('Alpha')) {
                keyFeaturesArr.push('ADAS Level 2', '360° Camera', 'Ventilated Front Seats', 'Panoramic Sunroof', 'Leatherette Upholstery');
            }

            const keyFeatures = keyFeaturesArr.join(', ');
            const headerSummary = `${data.name} is the premium electric SUV from Maruti Suzuki, featuring a ${data.battery} battery and a range of ${data.range}. Equipped with ${data.trim} trim highlights, it offers a sustainable and high-tech driving experience.`;
            const description = `${data.name} delivers ${data.power} power and ${data.torque} torque. Built on the dedicated Heartect-e platform, it includes ${keyFeatures}.`;

            const variantDoc = {
                id: variantId,
                name: data.name,
                brandId: brandId,
                modelId: modelId,
                price: data.price,
                status: 'active',
                isVisible: true,
                fuelType: 'Electric',
                transmission: 'Automatic',
                
                // Specifications
                evBatteryCapacity: data.battery,
                evRange: data.range,
                maxPower: data.power,
                maxTorque: data.torque,
                driveType: "2WD",
                length: "4275 mm",
                width: "1800 mm",
                height: "1640 mm",
                wheelbase: "2700 mm",
                groundClearance: "180 mm",
                seatingCapacity: "5",
                doors: "5",
                
                // Tech & Suspension
                frontSuspension: "MacPherson Strut",
                rearSuspension: "Multi Link",
                frontBrake: "Disc",
                rearBrake: "Disc",
                alloyWheels: data.trim !== 'Delta' ? "18-inch Alloy" : "Steel with Cover",
                
                // Features
                airbags: "7",
                abs: "Yes",
                ebd: "Yes",
                esc: "Yes",
                adasLevel: data.trim.startsWith('Alpha') ? "2" : "0",
                sunroof: data.trim.startsWith('Alpha') ? "Panoramic" : "No",
                ventilatedSeats: data.trim.startsWith('Alpha') ? "Yes (Front Only)" : "No",
                touchScreenInfotainment: "Yes",
                infotainmentScreen: "10.1 inch",
                
                // Content
                keyFeatures: keyFeatures,
                headerSummary: headerSummary,
                description: description,
                exteriorDesign: `The e-Vitara ${data.trim} features Maruti's new electric design language with 3-point Matrix LED DRLs and signature rear lamps.`,
                comfortConvenience: `Experience the future of mobility with a high-tech cabin, dual screens, and premium ${data.trim.startsWith('Alpha') ? 'leatherette' : 'fabric'} seats.`,
                
                updatedAt: new Date(),
                createdAt: new Date()
            };

            await db.collection('variants').updateOne(
                { id: variantId },
                { $set: variantDoc },
                { upsert: true }
            );

            console.log(`Uploaded: ${data.name}`);
        }

        console.log('e-Vitara variants added successfully!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Failed to add variants:', err);
    }
}

addEvitaraVariants();
