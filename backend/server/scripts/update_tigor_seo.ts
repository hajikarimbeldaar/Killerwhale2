import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function update() {
    await mongoose.connect(process.env.MONGODB_URI!);
    try {
        const m = await Model.findOne({ id: 'model-brand-tata-motors-tigor' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Tigor 2025 Price, Specs & Review – India's most feature-rich compact sedan starts at ₹5.99 lakh. 86 PS Revotron petrol & iCNG AMT, 10.25-inch touchscreen, 360° camera, 4-star GNCAP safety, and 419L boot space.";

        m.summary = "The Tata Tigor is the compact sedan that refuses to cut corners. The 2025 facelift packed in a 10.25-inch Harman touchscreen, a segment-first 360-degree camera, and a premium brown-and-off-white dashboard — all wrapped in a stylish coupe-like body with 419 litres of boot space. Whether you pick the 86 PS petrol with cruise control or India's first iCNG AMT sedan, the Tigor gives you sedan comfort at hatchback prices.";

        m.description = "The Tata Tigor continues to dominate the sub-4 metre compact sedan space with its blend of style, safety, and substance. Built on the proven ALFA architecture with a 4-star Global NCAP safety rating, the 2025 facelift brought serious upgrades.\n\nDesign-wise, it gets a refreshed grille, LED headlamps with DRLs, new 15-inch alloy wheels (petrol) or 14-inch wheels (CNG), and a shark-fin antenna. The coupe-like profile remains its signature — elegant from every angle.\n\nInside, the new 10.25-inch Harman floating touchscreen with wireless Apple CarPlay and Android Auto takes centre stage. The brown/off-white dashboard creates a premium ambience, while the two-spoke steering wheel with illuminated Tata logo adds flair. Feature highlights include a 360-degree surround-view camera (XZ+ Lux), cruise control (petrol variants), automatic climate control, rain-sensing wipers, auto headlamps, ESC, TPMS, and an 8-speaker sound system.\n\nMechanically, the 1.2L Revotron petrol engine (86 PS / 113 Nm) pairs with either 5-speed MT or AMT. The innovative iCNG variant (73.5 PS / 95 Nm) features twin-cylinder technology and is also available with AMT — making the Tigor iCNG AMT India's first automatic CNG sedan. All of this in a 3,993 mm package with 170 mm ground clearance and a class-leading 419-litre boot (petrol). Pricing spans ₹5.99 lakh to ₹9.50 lakh across 14 variants.";

        m.pros = "- 4-star Global NCAP safety with dual airbags, ESC, Hill Hold, TPMS, and 360° camera on top trims.\n- The only sub-4 metre sedan with a segment-first 360-degree surround-view camera system (XZ+ Lux).\n- Industry-first iCNG AMT — India's first automatic CNG compact sedan with 28.06 km/kg efficiency.\n- Generous 419-litre boot space — best-in-class for a sub-4 metre sedan, perfect for family trips.\n- Premium 10.25-inch Harman touchscreen with wireless connectivity and 8-speaker sound system.";

        m.cons = "- The 86 PS, 3-cylinder engine is tuned for city efficiency — highway overtaking requires advance planning.\n- Rear headroom is slightly tight for passengers over 5'10\" due to the coupe-like sloping roofline.\n- The AMT gearbox can exhibit noticeable head-nod during upshifts, especially in stop-and-go traffic.\n- iCNG variants get 14-inch wheels instead of the 15-inch alloys on petrol, looking a touch less premium.\n- No sunroof option available — a feature increasingly expected even at this price point.";

        m.exteriorDesign = "The 2025 Tigor carries forward its signature 'Styleback' design — a coupe-like silhouette that looks more expensive than it is. The refreshed front features a parametric grille flanked by LED headlamps with integrated DRLs. Diamond-cut 15-inch alloy wheels (petrol) and a shark-fin antenna add sophistication. The rear gets redesigned tail lamps and a piano-black strip connecting them across the boot lid. New colour options including Meteor Bronze give it an executive appeal. At 3,993 mm long with 170 mm ground clearance, it's city-friendly yet road-trip ready.";

        m.comfortConvenience = "The Tigor's cabin punches well above its segment. The star is the 10.25-inch Harman floating touchscreen — vivid, responsive, and loaded with wireless Apple CarPlay and Android Auto. The brown/off-white dashboard with the illuminated two-spoke steering wheel creates a warm, premium atmosphere. Top-spec variants get the 360° surround-view camera for effortless parking, while automatic climate control, cruise control (petrol), electric tailgate release, cooled glovebox, and rain-sensing wipers ensure everyday comfort. Front seat armrests, height-adjustable driver's seat, and the 8-speaker sound system with USB-C charging complete the package. The iRA connected car tech enables remote vehicle diagnostics, geo-fencing, and emergency SOS.";

        m.engineSummaries = [
            {
                title: "1.2L Revotron Petrol",
                summary: "1199cc, 3-cylinder, naturally aspirated. BS6 Phase 2 & E20 compliant.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "86 PS (84.48 BHP) @ 6,000 rpm",
                torque: "113 Nm @ 3,300 rpm",
                speed: "~160 km/h (top speed)"
            },
            {
                title: "1.2L Revotron iCNG",
                summary: "1199cc, 3-cylinder with twin-cylinder iCNG technology. Seamless petrol-CNG switching.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "73.5 PS (72 BHP) @ 6,000 rpm",
                torque: "95 Nm @ 3,500 rpm",
                speed: "~150 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.2L Petrol MT", companyClaimed: "19.2 km/l (ARAI)", cityRealWorld: "13–15 km/l", highwayRealWorld: "17–19 km/l" },
            { engineName: "1.2L Petrol AMT", companyClaimed: "19.6 km/l (ARAI)", cityRealWorld: "14–16 km/l", highwayRealWorld: "17–19 km/l" },
            { engineName: "1.2L iCNG MT", companyClaimed: "26.49 km/kg (ARAI)", cityRealWorld: "20–22 km/kg", highwayRealWorld: "24–26 km/kg" },
            { engineName: "1.2L iCNG AMT", companyClaimed: "28.06 km/kg (ARAI)", cityRealWorld: "21–23 km/kg", highwayRealWorld: "25–27 km/kg" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Tigor in 2025?", answer: "The Tata Tigor 2025 is priced from ₹5.99 lakh (XM Petrol MT) to ₹9.50 lakh (XZ+ Lux iCNG), ex-showroom. It's available in 14 variants across petrol and iCNG powertrains." },
            { question: "Does the Tata Tigor have a 360-degree camera?", answer: "Yes! The Tigor XZ+ Lux variants feature a 360-degree surround-view camera system — a segment-first for sub-4 metre sedans, making parking in tight spaces effortless." },
            { question: "What is the boot space of the Tata Tigor?", answer: "The Tigor offers 419 litres of boot space (petrol variants) — best-in-class for the sub-4 metre sedan segment. The iCNG variants retain usable boot space thanks to the twin-cylinder technology." },
            { question: "Is the Tata Tigor iCNG available with automatic?", answer: "Yes, the Tigor iCNG AMT is India's first automatic CNG compact sedan. It pairs the 73.5 PS iCNG engine with a 5-speed AMT for convenient city driving with exceptional fuel efficiency of 28.06 km/kg." },
            { question: "What is the safety rating of the Tata Tigor?", answer: "The Tata Tigor holds a 4-star Global NCAP safety rating. Safety features include dual airbags, ABS with EBD, ESC, Hill Hold Control, TPMS, rear parking sensors, and a 360° camera on top trims." },
            { question: "What is the real-world mileage of the Tata Tigor?", answer: "The petrol Tigor delivers 13–15 km/l in the city and 17–19 km/l on highways. The iCNG variant is significantly more efficient at 20–22 km/kg (city) and 24–26 km/kg (highway)." }
        ];

        await m.save();
        console.log("✅ Tata Tigor — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
