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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-tigor-ev' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Tigor EV 2025 Price, Range & Specs – India's electric sedan with 315 km ARAI range, 170 Nm instant torque, 0-60 in 5.7s. Starts at ₹12.49 lakh. Ziptron tech, 4-star GNCAP, DC fast charging, and Harman Kardon audio.";

        m.summary = "The Tata Tigor EV brings sedan elegance to the EV world. With 170 Nm of instant torque, a 0-60 km/h sprint in 5.7 seconds, and 315 km ARAI range from its 26 kWh Ziptron battery, this is the electric sedan that proves green can be thrilling. Add in the 8-speaker Harman Kardon sound system, connected car tech, and a 4-star GNCAP safety rating, and you've got a premium electric commuter that costs just ₹1 per km to run.";

        m.description = "The Tata Tigor EV is the bridge between affordable electric mobility and sedan sophistication. Powered by Tata's proven Ziptron technology, it packs a 26 kWh lithium-ion battery that's liquid-cooled and IP67-rated for all-weather safety, delivering a healthy 315 km ARAI-certified range.\n\nThe permanent magnet synchronous motor produces 74 bhp and a punchy 170 Nm of instant torque — resulting in a fun 0-60 km/h time of just 5.7 seconds. Four levels of regenerative braking and two drive modes (Drive and Sport) let you tailor the experience to your driving style.\n\nInside, the dual-tone cabin with leatherette upholstery (on higher variants) feels premium. The digital instrument cluster displays range, battery percentage, and drive mode in real time. Comfort features include automatic climate control, cruise control, auto headlamps, rain-sensing wipers, electrically adjustable and foldable ORVMs, and an 8-speaker Harman Kardon sound system.\n\nSafety is robust with a 4-star Global NCAP rating, dual airbags, ABS/EBD, ESC, Hill Assist, Corner Stability Control, TPMS, and rear parking camera. The ZConnect app offers 35+ connected car features including remote commands, geo-fencing, and stolen vehicle tracking.\n\nCharging is flexible: DC fast charging gets you from 10-80% in ~57 minutes, while a standard 15A home socket takes about 9 hours for a full charge. Available in XE, XT, XZ+, and XZ+ Lux variants from ₹12.49 lakh to ₹13.75 lakh.";

        m.pros = "- 170 Nm instant torque and 0-60 in 5.7s — the most fun electric sedan in its segment.\n- 315 km ARAI range from the 26 kWh IP67-rated, liquid-cooled Ziptron battery.\n- Premium 8-speaker Harman Kardon sound system and leatherette upholstery on higher trims.\n- 4-star Global NCAP safety with ESC, Hill Assist, Corner Stability Control, and TPMS.\n- Connected car tech with ZConnect app — 35+ features including remote commands, geo-fencing, and vehicle tracking.";

        m.cons = "- Real-world range drops to 200-220 km in city and less on highways — not ideal for long-distance without planning.\n- Top speed is electronically limited to 120 km/h — adequate for urban use but limiting on expressways.\n- Boot space at 316 litres is less than the petrol Tigor's 419 litres due to battery placement.\n- Charging from a standard 15A socket takes about 9 hours — a dedicated wall box is recommended.\n- The infotainment system is a 7-inch unit, not the 10.25-inch seen in the petrol Tigor facelift.";

        m.exteriorDesign = "The Tigor EV wears its electric identity with subtle sophistication. The signature closed-off front grille features tri-arrow patterns with blue accents that signify its EV status. Projector headlamps with LED DRLs, 14-inch dual-tone alloy wheels with blue highlights, and 'EV' badges on the grille and doors create a distinct yet elegant persona. The sedan silhouette remains unchanged — 3,993 mm long with 172 mm ground clearance — giving it the same premium stance as its petrol sibling. Three colour options — Signature Teal Blue, Magnetic Red, and Daytona Grey — keep things classy.";

        m.comfortConvenience = "The Tigor EV's cabin is a serene, tech-rich space. The digital instrument cluster provides all critical EV data at a glance, while the 7-inch touchscreen handles infotainment with Android Auto and Apple CarPlay support. The 8-speaker Harman Kardon sound system is a standout — rare at this price. Automatic climate control, cruise control, height-adjustable driver's seat, push-button start, and electrically adjustable ORVMs ensure convenience. The electric tailgate release is a thoughtful touch. And because it's an EV, the cabin is whisper-quiet, making even peak-hour traffic feel relaxed. The ZConnect app lets you monitor charge status, pre-cool the cabin remotely, and track your car's location — all from your phone.";

        m.engineSummaries = [
            {
                title: "26 kWh Ziptron Electric",
                summary: "Permanent Magnet Synchronous Motor with 26 kWh liquid-cooled, IP67-rated lithium-ion battery. Ziptron technology.",
                transmission: "Single-Speed Automatic",
                power: "74 BHP (55 kW)",
                torque: "170 Nm (instant)",
                speed: "315 km (ARAI range) | 120 km/h top speed"
            }
        ];

        m.mileageData = [
            { engineName: "26 kWh Electric", companyClaimed: "315 km (ARAI)", cityRealWorld: "200–220 km", highwayRealWorld: "160–180 km" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Tigor EV in 2025?", answer: "The Tata Tigor EV 2025 is priced from ₹12.49 lakh (XE) to ₹13.75 lakh (XZ+ Lux), ex-showroom. It's available in 4 variants." },
            { question: "What is the real-world range of the Tata Tigor EV?", answer: "In real-world city conditions, the Tigor EV delivers 200–220 km on a full charge. Highway driving at higher speeds reduces this to approximately 160–180 km." },
            { question: "How long does the Tata Tigor EV take to charge?", answer: "DC fast charging takes about 57 minutes (10-80%). A 7.2 kW AC wall box does a full charge in approximately 3.5 hours. A standard 15A home socket takes about 9 hours." },
            { question: "What is the safety rating of the Tigor EV?", answer: "The Tigor EV holds a 4-star Global NCAP safety rating. It comes with dual airbags, ABS/EBD, ESC, Hill Assist, Corner Stability Control, TPMS, and a rear parking camera." },
            { question: "Does the Tigor EV have regenerative braking?", answer: "Yes, the Tigor EV offers a four-level regenerative braking system alongside two drive modes (Drive and Sport), giving you greater control over energy recovery and driving dynamics." },
            { question: "What connected car features does the Tigor EV offer?", answer: "The ZConnect app provides 35+ features including remote AC on/off, charge status monitoring, geo-fencing, stolen vehicle tracking, emergency SOS, and vehicle health reports — all from your smartphone." }
        ];

        await m.save();
        console.log("✅ Tata Tigor EV — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
