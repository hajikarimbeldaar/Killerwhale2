import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: backendEnv });

async function updateRenaultDuster() {
    console.log('Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";
    await mongoose.connect(mongoUri);

    try {
        const duster = await Model.findOne({ id: 'model-brand-renault-triber' });

        if (!duster) {
            console.error('Model not found (id: model-brand-renault-triber).');
            return;
        }

        console.log(`Found model: ${duster.name}, updating to 2026 Renault Duster...`);

        // We also want to rename it from Triber (if it was named that) to Duster
        // Although the previous log showed Name: Duster, let's ensure it's explicitly set
        duster.name = 'Duster';

        duster.headerSeo = `The 2026 Renault Duster marks a triumphant return to India, redefining the mid-size SUV segment with a bold new design, advanced technology, and aggressive pricing starting at ₹10.49 lakh. Available in 1.0L Turbo, 1.3L Turbo, and an upcoming 1.8L Strong-Hybrid powertrain, the new Duster combines rugged heritage with modern refinement. Book now with the exclusive R-Pass to secure introductory pricing.`;

        duster.summary = `Launched on March 17, 2026, the all-new Renault Duster makes a powerful comeback. Retaining its signature rugged stance while embracing a highly aggressive, modern aesthetic, the SUV offers cutting-edge features across five variants: Authentic, Evolution, Techno, Techno+, and Iconic. Armed with robust turbo-petrol engines and premium cabin features, the 2026 Duster is built to conquer both urban commutes and off-road adventures.`;

        duster.description = `Built on the localized CMF-B platform, the 2026 Renault Duster is an engineering marvel designed for the Indian market. It offers unparalleled driving dynamics with a choice of two potent turbo-petrol engines and a future-ready 1.8L strong-hybrid system landing around Diwali 2026. The spacious 5-seater cabin boasts premium upholstery, a large floating touchscreen infotainment system with wireless smartphone connectivity, a digital instrument cluster, and an array of active safety features including standard 6 airbags and advanced ADAS on top trims.`;

        duster.pros = `Competitive Pricing: Aggressive introductory starting price of ₹10.49 lakh (ex-showroom).
Engine Variety: Multiple powertrain options including 1.0L Turbo, 1.3L Turbo, and a highly anticipated 1.8L Strong-Hybrid.
Rugged Design: Iconic muscular stance paired with futuristic LED styling.
Premium Interior: High-quality cabin with a digital cockpit and modern convenience features.`;

        duster.cons = `Hybrid Availability: Strong-hybrid variants are launching much later (Diwali 2026) and reportedly sold out in pre-allocation.
No Diesel Option: Missing the classic diesel torque that made the original Duster famous.`;

        duster.exteriorDesign = `The 2026 Renault Duster commands the road with its muscular silhouette, sharply sculpted hood, and a striking front grille integrated with Y-shaped LED daytime running lights. Its flared wheel arches, prominent roof rails, and high ground clearance stay true to its core DNA, presenting a vehicle that looks as robust as it drives.`;

        duster.comfortConvenience = `Inside, the 2026 Duster offers a sanctuary of comfort and technology. It features an ergonomic dashboard layout dominated by a massive central touchscreen, an informative digital driver's display, automatic climate control, ventilated front seats, and a panoramic sunroof on top variants. Soft-touch materials and intelligent storage spaces ensure a premium experience for all occupants.`;

        duster.engineSummaries = [
            {
                title: '1.0L Turbo-Petrol',
                summary: 'Delivering an engaging mix of fuel efficiency and peppy city performance.',
                transmission: 'Manual / Automatic',
                power: 'Adequate for city commutes',
                torque: 'Punchy low-end',
                speed: 'N/A'
            },
            {
                title: '1.3L Turbo-Petrol',
                summary: 'A powerhouse for enthusiasts demanding highway supremacy and robust torque.',
                transmission: 'Manual / Automatic',
                power: 'High Output',
                torque: 'Strong mid-range',
                speed: 'N/A'
            },
            {
                title: '1.8L Strong-Hybrid',
                summary: 'Combining stellar fuel economy with silent, smooth electric-assisted driving. (Launching Diwali 2026)',
                transmission: 'Automatic (e-CVT)',
                power: 'Efficient',
                torque: 'Instant electric torque',
                speed: 'N/A'
            }
        ] as any;

        duster.faqs = [
            {
                question: "What is the launch price of the 2026 Renault Duster?",
                answer: "It starts at ₹10.49 lakh (ex-showroom), with a special R-Pass introductory price of ₹10.29 lakh valid till March 31, 2026."
            },
            {
                question: "What engine options are available?",
                answer: "Buyers can choose between a 1.0L turbo-petrol, a 1.3L turbo-petrol, and a 1.8L strong-hybrid."
            },
            {
                question: "When will the hybrid version of the Renault Duster be available in India?",
                answer: "The strong-hybrid variant is scheduled for release around the Diwali 2026 festival."
            }
        ] as any;

        await duster.save();
        console.log('Successfully updated 2026 Renault Duster model data.');

    } catch (error) {
        console.error('Error updating model:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

updateRenaultDuster();
