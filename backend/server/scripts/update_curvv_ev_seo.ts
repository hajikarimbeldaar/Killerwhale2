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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-curvv-ev' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Curvv EV 2025 Price, Range & Specs – India's first electric SUV Coupe from ₹17.49 lakh. Up to 585 km range (55 kWh), acti.ev platform, Level 2 ADAS, V2L/V2V tech, panoramic sunroof, and 500L boot.";

        m.summary = "The Tata Curvv EV isn't just a stunning SUV-Coupe; it's a technological powerhouse built on the Gen 2 acti.ev platform. Offering two large battery options (45 kWh and 55 kWh) for an ARAI range of up to 585 km, it eliminates range anxiety entirely. Packed with Level 2 ADAS, V2L (Vehicle-to-Load) to power your campsite, a panoramic sunroof, and ultra-fast 1.2C charging (10-80% in 40 mins), it's the ultimate premium electric SUV starting at ₹17.49 lakh.";

        m.description = "The Tata Curvv EV shatters the compromise between jaw-dropping design and electric practicality. As India's first mass-market electric SUV-Coupe, it brings flagship styling and the advanced 'acti.ev' platform to the sub-₹25 lakh space.\n\nRange anxiety is history: choose between the 45 kWh battery (502 km ARAI / ~350 km real-world) and the massive 55 kWh battery (585 km ARAI / ~425 km real-world). The 55 kWh variant gets a potent 167 PS motor that hits 0-100 km/h in just 8.6 seconds. Charging is equally impressive with up to 1.2C charging rates — a 70 kW DC fast charger gets you from 10-80% in 40 minutes, adding 150 km of range in just 15 minutes.\n\nThe acti.ev platform unlocks V2L (powering appliances up to 3.3 kVA) and V2V (charging other EVs up to 5 kVA). It's also fully equipped with Level 2 ADAS (Adaptive Cruise Control, Auto Emergency Braking, Lane Keep Assist) and boasts a 5-star Bharat NCAP safety rating.\n\nThe cabin feels like a luxury lounge: 12.3-inch Harman touchscreen, 10.25-inch digital cockpit, panoramic sunroof, ventilated seats, 9-speaker JBL audio, and a powered tailgate. Available in Creative, Accomplished, and Empowered personas, the Curvv EV redefines what a premium Indian EV can be.";

        m.pros = "- Breathtaking SUV-Coupe design that makes it the best-looking EV in its segment by a wide margin.\n- Massive 55 kWh battery option provides up to 585 km ARAI range (400+ km real-world) — perfect for highway touring.\n- Ultra-fast DC charging capability adds 150 km of range in just 15 minutes.\n- Built on the born-electric acti.ev platform enabling V2L (to power appliances) and V2V (to charge other EVs) functionality.\n- Level 2 ADAS, 6 airbags, and a proven 5-star Bharat NCAP safety rating make it incredibly safe.\n- Exceptional 500-litre boot space with a gesture-controlled powered tailgate offers massive practicality.";

        m.cons = "- Rearward visibility is heavily restricted by the sloping coupe roofline — the 360° camera is essential, not just a luxury.\n- Rear headroom is tight for passengers over 6 feet tall compared to traditional upright SUVs like the Nexon EV.\n- The low-set rear bench results in a knee-up seating posture, compromising under-thigh support on long journeys.\n- NVH levels, while good, still let in noticeable tyre and wind noise at speeds above 100 km/h.\n- The sheer number of touch-sensitive controls on the dashboard can be distracting to use while driving.";

        m.exteriorDesign = "The Tata Curvv EV is a masterclass in automotive sculpture. The front fascia is uniquely electric, featuring a closed-off grille and a full-width LED light bar that welcomes you with an animation. The flush door handles pop out automatically, adding to the aerodynamic efficiency. The dramatic sloping roofline flows elegantly into the rear deck, which is finished with a sharp spoiler and a connected LED taillight signature. 18-inch aerodynamic alloy wheels, aerodynamic covers, and 190mm of ground clearance give it the perfect blend of sportscar sleekness and SUV ruggedness. The EV-exclusive Virtual Sunrise exterior color is particularly striking.";

        m.comfortConvenience = "Inside, the Curvv EV is a minimalist tech sanctuary. The 12.3-inch Cinematic touchscreen runs the intuitive Arcade.ev suite with wireless smartphone mirroring, paired perfectly with the 9-speaker JBL sound system. The 10.25-inch digital instrument cluster displays maps and ADAS info directly in your line of sight. Phygital control panels handle the automatic climate control. Comfort is guaranteed via ventilated front seats, a 6-way powered driver's seat, a panoramic sunroof, and multi-color ambient lighting. Smart EV features include remote cabin pre-cooling, V2L to power your laptop or camping gear, and a powered tailgate for hands-free access to the 500L boot.";

        m.engineSummaries = [
            {
                title: "45 kWh Electric (Standard Range)",
                summary: "Permanent Magnet Synchronous Motor with 45 kWh battery. Supported by acti.ev architecture.",
                transmission: "Single-Speed Automatic",
                power: "150 PS (110 kW)",
                torque: "215 Nm (instant)",
                speed: "502 km ARAI range | 0-100 in ~9.0s"
            },
            {
                title: "55 kWh Electric (Long Range)",
                summary: "Permanent Magnet Synchronous Motor with massive 55 kWh battery pack. 1.2C fast charging capable.",
                transmission: "Single-Speed Automatic",
                power: "167 PS (123 kW)",
                torque: "215 Nm (instant)",
                speed: "585 km ARAI range | 0-100 in 8.6s"
            }
        ];

        m.mileageData = [
            { engineName: "45 kWh Battery", companyClaimed: "502 km (ARAI)", cityRealWorld: "330–350 km", highwayRealWorld: "280–310 km" },
            { engineName: "55 kWh Battery", companyClaimed: "585 km (ARAI)", cityRealWorld: "400–425 km", highwayRealWorld: "340–370 km" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Curvv EV in 2025?", answer: "The Tata Curvv EV ranges from ₹17.49 lakh to ₹22.24 lakh (ex-showroom). It is available in variants like Creative 45, Accomplished 55, and the top-end Empowered Plus A 55." },
            { question: "What is the real-world range of the Tata Curvv EV?", answer: "The 45 kWh battery yields about 330-350 km in real-world city driving. The larger 55 kWh battery delivers an impressive 400-425 km, making it excellent for inter-city travel." },
            { question: "How fast does the Tata Curvv EV charge?", answer: "The Curvv EV supports 1.2C charging rates. With a 70 kW DC fast charger, it goes from 10% to 80% in just 40 minutes, and can add 150 km of range in a quick 15-minute top-up." },
            { question: "What does the acti.ev platform offer?", answer: "The Gen 2 acti.ev platform is a born-electric architecture. It optimizes space, improves battery protection for a 5-star BNCAP rating, supports 5G OTA updates, and enables advanced tech like V2L and V2V." },
            { question: "What are V2L and V2V features?", answer: "V2L (Vehicle-to-Load) lets you use the Curvv EV's battery to power appliances (up to 3.3 kVA) like laptops or camping equipment. V2V (Vehicle-to-Vehicle) lets you share charge (up to 5 kVA) with another EV." },
            { question: "Does the Curvv EV have ADAS?", answer: "Yes, the top variants (Empowered Plus A) feature Level 2 ADAS with 20 functions, including Adaptive Cruise Control, Auto Emergency Braking, Lane Keep Assist, and Blind Spot Detection." },
            { question: "Is the boot space compromised by the coupe design?", answer: "Surprisingly, no. The Curvv EV boasts a massive 500-litre boot — larger than many traditional SUVs in its segment — and features a gesture-controlled powered tailgate for easy access." }
        ];

        await m.save();
        console.log("✅ Tata Curvv EV — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
