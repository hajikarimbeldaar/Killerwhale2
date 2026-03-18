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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-altroz' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Altroz 2025 Price, Specs & Review – India's only 5-star safe premium hatchback from ₹6.30 lakh. Petrol, Diesel, Turbo, iCNG & DCA automatic options. 10.25-inch twin screens, 360° camera, 6 airbags, and 90-degree opening doors.";

        m.summary = "The Tata Altroz is the premium hatchback that other manufacturers measure themselves against. It's the only car in its class to hold a 5-star Bharat NCAP safety rating across all its powertrains — petrol, diesel, and CNG. The 2025 facelift upped the ante with twin 10.25-inch screens, flush door handles, 360° camera, and a slick 6-speed DCA automatic. From the punchy turbo petrol to India's only diesel hatchback, the Altroz is the gold standard.";

        m.description = "The Tata Altroz has earned its reputation as India's safest and most premium hatchback, and the 2025 facelift only widens the gap. Built on the ALFA architecture, it remains the only hatchback with a 5-star Bharat NCAP rating across all powertrains — a distinction no rival can match.\n\nThe facelift brought a complete visual overhaul: all-LED headlamps with integrated DRLs, a 3D radiator grille, flush-fitting door handles, sleeker connected LED taillights, and new 16-inch dual-tone alloy wheels. Inside, it's a tech fest — twin 10.25-inch screens (infotainment + digital cluster), touch-sensitive HVAC controls, a 360° camera with blind spot monitor, wireless charger, and ambient lighting.\n\nEngine choices are unmatched in the segment: the 1.2L NA petrol (86 bhp/115 Nm) with MT/AMT/6-speed DCA, the segment-exclusive 1.5L diesel (90 bhp/200 Nm) with MT, and the 1.2L iCNG (74 bhp/103 Nm) with twin-cylinder tech. The Racer edition with its 1.2L turbo petrol (118 bhp/170 Nm) brings hot-hatch thrills.\n\nSafety is fortress-level: 6 airbags standard, ESC, TPMS, 360° camera, ISOFIX anchors, and three-point seat belts for all. The signature 90-degree opening doors make getting in and out effortless even in cramped parking spots. With 345L of boot space, a 2,501 mm wheelbase for generous rear legroom, and prices from ₹6.30 to ₹11.49 lakh, the Altroz is the hatchback that just does everything right.";

        m.pros = "- India's only hatchback with a 5-star Bharat NCAP safety rating across ALL powertrain options (petrol/diesel/CNG).\n- Unmatched engine variety: NA petrol, turbo petrol (Racer), diesel, and iCNG — no rival offers this range.\n- Twin 10.25-inch screens, 360° camera with blind spot monitor, flush door handles, and wireless charger on the 2025 facelift.\n- Signature 90-degree opening doors — an ingenious design for easy ingress/egress in tight spots.\n- The only diesel-powered hatchback in the segment with 200 Nm of torque — perfect for highway cruising.\n- 6-speed DCA automatic transmission on petrol — smooth, quick shifts, and fun to drive.";

        m.cons = "- The 1.2L NA petrol at 86 bhp feels adequate but not exciting — the turbo is where the fun is, but it's limited to the Racer edition.\n- The AMT option (alongside the DCA) can exhibit head-nod during aggressive driving — the DCA is the better auto choice.\n- Boot space drops significantly to 210 litres on iCNG variants due to the CNG tank — plan accordingly.\n- No AWD or all-wheel-drive option — it's strictly a front-wheel-drive hatchback.\n- The diesel, while torquey, is only available with a 5-speed manual — no automatic option for diesel yet.";

        m.exteriorDesign = "The 2025 Altroz facelift is a genuine head-turner. The front gets all-LED headlamps with integrated DRLs and a 3D parametric grille that extends the visual width. Flush-fitting door handles — a first in this segment — add sophistication and improve aerodynamics. At the rear, sleeker connected LED taillights and a restyled bumper complete the modern look. New 16-inch dual-tone alloy wheels, a sunroof (from Pure S onwards), and a shark-fin antenna round out the design. The Altroz measures 3,990 mm in length with 165 mm of ground clearance and retains its signature 90-degree opening doors — a feature unique to the segment.";

        m.comfortConvenience = "The 2025 Altroz cabin is a revelation for the premium hatchback class. Twin 10.25-inch screens dominate the dashboard — the infotainment system supports wireless Android Auto/Apple CarPlay, while the digital cluster can mirror navigation maps. Touch-sensitive HVAC controls, a wireless phone charger (65W), ambient lighting, and cruise control create a grown-up, premium experience. The 360° camera with blind spot monitor takes the stress out of parking. Rear AC vents, a cooled glovebox, and a well-shaped rear bench with excellent legroom (2,501 mm wheelbase) ensure passenger comfort. A single-pane sunroof lets the light in. And the iRA connected car system gives you remote access to vehicle diagnostics and functions.";

        m.engineSummaries = [
            {
                title: "1.2L Revotron NA Petrol",
                summary: "1199cc, 3-cylinder, naturally aspirated. BS6 Phase 2 compliant.",
                transmission: "5-Speed MT / 5-Speed AMT / 6-Speed DCA",
                power: "86 BHP (88 PS) @ 6,000 rpm",
                torque: "115 Nm @ 3,300 rpm",
                speed: "~170 km/h (top speed)"
            },
            {
                title: "1.2L Turbo Petrol (Racer)",
                summary: "1199cc, 3-cylinder, turbocharged. Exclusive to the Altroz Racer edition.",
                transmission: "6-Speed MT / 6-Speed DCA",
                power: "118 BHP (120 PS) @ 5,500 rpm",
                torque: "170 Nm @ 1,750–4,000 rpm",
                speed: "~190 km/h (top speed)"
            },
            {
                title: "1.5L Revotorq Diesel",
                summary: "1497cc, 4-cylinder, turbocharged diesel. Only diesel option in the premium hatchback segment.",
                transmission: "5-Speed Manual",
                power: "90 BHP (89 PS) @ 4,000 rpm",
                torque: "200 Nm @ 1,250–3,000 rpm",
                speed: "~175 km/h (top speed)"
            },
            {
                title: "1.2L Revotron iCNG",
                summary: "1199cc, 3-cylinder petrol with twin-cylinder iCNG technology.",
                transmission: "5-Speed Manual",
                power: "74 BHP (73.5 PS) @ 6,000 rpm",
                torque: "103 Nm @ 3,250 rpm",
                speed: "~155 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.2L NA Petrol MT", companyClaimed: "22.07 km/l (ARAI)", cityRealWorld: "15–17 km/l", highwayRealWorld: "19–21 km/l" },
            { engineName: "1.2L NA Petrol DCA", companyClaimed: "21.5 km/l (ARAI)", cityRealWorld: "14–16 km/l", highwayRealWorld: "18–20 km/l" },
            { engineName: "1.2L Turbo Petrol MT", companyClaimed: "18.0 km/l (ARAI)", cityRealWorld: "12–14 km/l", highwayRealWorld: "16–18 km/l" },
            { engineName: "1.5L Diesel MT", companyClaimed: "25.11 km/l (ARAI)", cityRealWorld: "17–19 km/l", highwayRealWorld: "21–23 km/l" },
            { engineName: "1.2L iCNG MT", companyClaimed: "27.03 km/kg (ARAI)", cityRealWorld: "20–22 km/kg", highwayRealWorld: "24–26 km/kg" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Altroz in 2025?", answer: "The 2025 Tata Altroz is priced from ₹6.30 lakh (Smart Petrol MT) to ₹11.49 lakh (Accomplished Plus S Petrol DCA), ex-showroom. CNG variants start at ₹7.89 lakh." },
            { question: "What is the safety rating of the Tata Altroz?", answer: "The Altroz is the only hatchback in India to achieve a 5-star Bharat NCAP safety rating across ALL powertrain options (petrol, diesel, and CNG). It comes with 6 airbags, ESC, TPMS, 360° camera, and ISOFIX as standard." },
            { question: "What engine options are available in the Altroz?", answer: "The Altroz offers four engine options: 1.2L NA petrol (86 bhp), 1.2L turbo petrol Racer (118 bhp), 1.5L diesel (90 bhp, 200 Nm — segment exclusive), and 1.2L iCNG (74 bhp) with twin-cylinder technology." },
            { question: "Does the Altroz come with automatic transmission?", answer: "Yes, the Altroz is available with a smooth 6-speed DCA (Dual Clutch Automatic) and a 5-speed AMT with the NA petrol engine. The turbo Racer also gets the 6-speed DCA. Diesel and CNG are manual only." },
            { question: "What are the standout features of the 2025 Altroz facelift?", answer: "Twin 10.25-inch screens (infotainment + digital cluster), 360° camera with blind spot monitor, flush door handles, wireless charger, sunroof, 6 airbags standard, touch HVAC controls, and 90-degree opening doors." },
            { question: "What is the real-world mileage of the Tata Altroz?", answer: "Petrol MT: 15–17 km/l (city), 19–21 km/l (highway). Diesel: 17–19 km/l (city), 21–23 km/l (highway). iCNG: 20–22 km/kg (city), 24–26 km/kg (highway)." },
            { question: "Why are the 90-degree opening doors special?", answer: "The Altroz's doors open to a full 90 degrees, making ingress and egress significantly easier — especially in tight parking spaces and for elderly passengers or child seat installation. It's a unique feature in the segment." }
        ];

        await m.save();
        console.log("✅ Tata Altroz — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
