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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-nexon' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Nexon 2026 Price, Specs & Review – India's best-selling compact SUV from ₹7.32 lakh. 1.2L Turbo Petrol, 1.5L Diesel & iCNG options. 7-speed DCA, Level 2 ADAS, 5-star Bharat NCAP, 360° camera, JBL audio, panoramic sunroof.";

        m.summary = "The Tata Nexon is India's undisputed compact SUV king, and for good reason. With a 5-star Bharat NCAP safety rating across all 121 variants, a punchy 1.2L turbo petrol with 7-speed DCA automatic, India's only diesel in this price range, and now Level 2 ADAS on top trims — the Nexon is the complete package. Throw in a panoramic sunroof, dual 10.25-inch screens, 9-speaker JBL audio, and an iCNG option with turbo power, and you understand why it outsells everything in its segment.";

        m.description = "The Tata Nexon is the car that put compact SUVs on India's map, and it continues to dominate the segment with relentless upgrades. The current model boasts a 5-star safety rating from both Global NCAP and Bharat NCAP — across all 121 petrol and diesel variants. That's not marketing, that's engineering.\n\nThe powertrain lineup is unmatched: a 1.2L turbo petrol engine (118 bhp, 170 Nm) with four transmission choices — 5-speed MT, 6-speed MT, 6-speed AMT, and the silky 7-speed DCA; a 1.5L Revotorq turbo diesel (113 bhp, 260 Nm) with 6-speed MT/AMT; and a unique 1.2L turbo iCNG option with 100 PS — the only turbocharged CNG compact SUV in India.\n\nFeatures are flagship-grade: dual 10.25-inch screens (infotainment + cockpit), 9-speaker JBL sound system, 360° camera with blind spot monitor, panoramic sunroof, ventilated front seats, wireless charger, connected car tech, and Level 2 ADAS with autonomous emergency braking, lane-keep assist, and adaptive cruise control on the Fearless+ PS trim.\n\n208mm ground clearance, 382L boot, and a muscular design with LED DRLs, connected taillights, and 16-inch alloys complete the picture. Priced from ₹7.32 lakh to ₹14.15 lakh across 10 persona-based trims, the Nexon offers a variant for every buyer.";

        m.pros = "- 5-star Bharat NCAP + Global NCAP safety across ALL variants — 6 airbags, ESC, TPMS, 360° camera as standard.\n- Unmatched powertrain choice: turbo petrol, diesel, AND turbo iCNG — the only compact SUV offering all three.\n- Level 2 ADAS on top trims — autonomous emergency braking, lane-keep assist, adaptive cruise control.\n- The 7-speed DCA automatic is smooth, quick, and fun — the best automatic gearbox in this segment.\n- 9-speaker JBL sound system with Dolby Atmos, panoramic sunroof, and ventilated seats — premium features at mass-market prices.\n- 208mm ground clearance and SUV-grade ride quality handle Indian road conditions with ease.";

        m.cons = "- The 1.2L turbo petrol, while peppy, loses breath at very high altitudes — the diesel is better for mountain driving.\n- NVH from the diesel engine is noticeable at idle — it's refined on the move but not at standstill.\n- Boot space at 382 litres is merely good, not class-leading — rivals like Creta offer more.\n- The AMT (6-speed) is functional but the DCA is a significantly better automatic — budget accordingly.\n- ADAS is limited to the top-spec Fearless+ PS petrol-automatic variant — not available across the range.\n- No AWD option — it's strictly front-wheel-drive across all variants.";

        m.exteriorDesign = "The Nexon's design language screams confidence. LED DRLs in the signature T-shape flank the parametric grille, while LED headlamps with cornering fog lamps ensure excellent nightscape visibility. Connected LED taillights and a coupe-like roofline give it a premium silhouette. 16-inch diamond-cut alloy wheels, a muscular shoulder line, and 208mm ground clearance create genuine SUV presence. Colours like Grassland Beige and Royal Blue add character, while the Red Dark Edition with blacked-out elements brings a sportier edge. At 3,994 mm long with a 2,498 mm wheelbase, it's compact enough for city parking yet tall enough to command the road.";

        m.comfortConvenience = "Step inside and the Nexon feels a segment above. Dual 10.25-inch screens dominate the dashboard — the infotainment unit supports wireless Android Auto/Apple CarPlay with a 9-speaker JBL sound system, while the digital cockpit displays navigation, ADAS data, and drive info. The panoramic sunroof creates an airy cabin, ventilated front seats keep you cool, and the wireless phone charger eliminates cable clutter. Automatic climate control with rear AC vents, cruise control, push-button start with keyless entry, auto-fold ORVMs, and a height-adjustable driver's seat round out the convenience package. The iRA connected car system offers remote vehicle commands, geo-fencing, and emergency SOS.";

        m.engineSummaries = [
            {
                title: "1.2L Revotron Turbo Petrol",
                summary: "1199cc, 3-cylinder, turbocharged. BS6 Phase 2 compliant.",
                transmission: "5-Speed MT / 6-Speed MT / 6-Speed AMT / 7-Speed DCA",
                power: "118 BHP (120 PS) @ 5,500 rpm",
                torque: "170 Nm @ 1,750–4,000 rpm",
                speed: "~180 km/h (top speed)"
            },
            {
                title: "1.5L Revotorq Turbo Diesel",
                summary: "1497cc, 4-cylinder, turbocharged diesel. Best-in-class torque.",
                transmission: "6-Speed Manual / 6-Speed AMT",
                power: "113 BHP (115 PS) @ 3,750 rpm",
                torque: "260 Nm @ 1,500–2,750 rpm",
                speed: "~175 km/h (top speed)"
            },
            {
                title: "1.2L Turbo iCNG",
                summary: "1199cc, 3-cylinder turbo petrol with iCNG technology. India's only turbo CNG compact SUV.",
                transmission: "6-Speed Manual",
                power: "100 PS @ 5,500 rpm",
                torque: "170 Nm @ 1,750–4,000 rpm",
                speed: "~170 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.2L Turbo Petrol MT", companyClaimed: "17.44 km/l (ARAI)", cityRealWorld: "12–14 km/l", highwayRealWorld: "15–17 km/l" },
            { engineName: "1.2L Turbo Petrol DCA", companyClaimed: "17.01 km/l (ARAI)", cityRealWorld: "11–13 km/l", highwayRealWorld: "14–16 km/l" },
            { engineName: "1.5L Diesel MT", companyClaimed: "24.08 km/l (ARAI)", cityRealWorld: "16–18 km/l", highwayRealWorld: "20–22 km/l" },
            { engineName: "1.5L Diesel AMT", companyClaimed: "23.23 km/l (ARAI)", cityRealWorld: "15–17 km/l", highwayRealWorld: "19–21 km/l" },
            { engineName: "1.2L Turbo iCNG", companyClaimed: "17.44 km/kg (ARAI)", cityRealWorld: "14–16 km/kg", highwayRealWorld: "17–19 km/kg" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Nexon in 2026?", answer: "The Tata Nexon 2026 is priced from ₹7.32 lakh to ₹14.15 lakh (ex-showroom). It's available across Smart, Pure+, Creative, Creative+ PS, Fearless+ PS, and other persona-based trims." },
            { question: "What is the safety rating of the Tata Nexon?", answer: "The Nexon holds both a 5-star Global NCAP and 5-star Bharat NCAP safety rating — making it one of the safest compact SUVs sold in India. All 121 variants get 6 airbags and ESC as standard." },
            { question: "Does the Tata Nexon have ADAS?", answer: "Yes, the top-spec Fearless+ PS petrol-automatic variant features Level 2 ADAS with Forward Collision Warning, Autonomous Emergency Braking, Lane Departure Warning, Lane-Keep Assist, High-Beam Assist, and Traffic Sign Recognition." },
            { question: "Does the Nexon come with a diesel engine?", answer: "Yes, the Nexon is one of the few compact SUVs still offering a diesel engine — a 1.5L Revotorq turbo diesel producing 113 bhp and 260 Nm of torque, available with 6-speed MT and 6-speed AMT." },
            { question: "What automatic options are available in the Nexon?", answer: "The Nexon offers two automatic options: a 6-speed AMT (available on both petrol and diesel) and an excellent 7-speed DCA (Dual Clutch Automatic) on the turbo petrol — one of the smoothest automatics in the segment." },
            { question: "Is the Nexon available with CNG?", answer: "Yes! The Nexon iCNG pairs the 1.2L turbo petrol with CNG technology, producing 100 PS — making it India's only turbocharged CNG compact SUV. It retains the peppy character while offering significant fuel savings." },
            { question: "What are the key features of the Tata Nexon?", answer: "Dual 10.25-inch screens, 9-speaker JBL sound system, 360° camera, panoramic sunroof, ventilated seats, wireless charger, Level 2 ADAS (top trims), connected car tech, 6 airbags, and 208mm ground clearance." }
        ];

        await m.save();
        console.log("✅ Tata Nexon — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
