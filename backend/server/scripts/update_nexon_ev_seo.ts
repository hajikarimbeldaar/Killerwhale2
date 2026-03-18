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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-nexon-ev' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Nexon EV 2025 Price, Range & Specs – India's best-selling electric SUV from ₹12.49 lakh. Up to 489 km range (45 kWh), Level 2 ADAS, V2L/V2V, 12.3-inch screen, JBL audio, panoramic sunroof, and 5-star GNCAP safety.";

        m.summary = "The Tata Nexon EV is the electric SUV that India fell in love with first — and it keeps getting better. Now with a larger 45 kWh battery delivering 489 km of range, Level 2 ADAS, V2L to power your appliances, a stunning 12.3-inch touchscreen, 9-speaker JBL sound, and a panoramic sunroof, it's the most complete electric SUV under ₹18 lakh. With 5-star GNCAP safety and running costs under ₹1/km, the Nexon EV makes the switch to electric effortless.";

        m.description = "The Tata Nexon EV established the electric SUV market in India and remains its unchallenged leader. The current model, facelifted in September 2023 with ongoing updates through 2025, is a thoroughly modern electric vehicle.\n\nTwo battery options: the 30 kWh MR (130 hp, 215 Nm, 325 km MIDC range) for city-focused buyers, and the 45 kWh LR (144 hp, 215 Nm, 489 km MIDC range) for those who want maximum range. The 40.5 kWh battery was discontinued in February 2025, replaced by the superior 45 kWh pack.\n\nLevel 2 ADAS debuted in September 2025 on top-spec 45 kWh variants, bringing Autonomous Emergency Braking, Lane Keep Assist, Lane Centering, Forward Collision Warning, Traffic Sign Recognition, High Beam Assist, and Driver Drowsiness Detection. V2L (Vehicle-to-Load) and V2V (Vehicle-to-Vehicle) technology on Empowered+ trims let you power devices or charge another EV.\n\nThe cabin is flagship-grade: 12.3-inch touchscreen with wireless Apple CarPlay/Android Auto, 10.25-inch digital cockpit, 9-speaker JBL sound with Dolby Atmos, panoramic sunroof, ventilated front seats, leatherette upholstery, wireless charger, and Arcade.ev connected car suite.\n\nDC fast charging gets the 45 kWh from 10-80% in just 40 minutes with a 60 kW charger. A 7.2 kW AC wall box does a full charge in 6 hours. Available in Creative, Fearless, and Empowered personas from ₹12.49 to ₹17.49 lakh.";

        m.pros = "- 489 km MIDC range on the 45 kWh variant — maximum range anxiety-free driving in an electric SUV under ₹18 lakh.\n- Level 2 ADAS with autonomous emergency braking, lane keep/centering, and drowsiness detection — segment-first for electric SUVs.\n- V2L/V2V capability to power appliances or charge another EV — your car is now a mobile power station.\n- Premium cabin with 12.3-inch screen, 9-speaker JBL + Dolby Atmos, panoramic sunroof, and ventilated seats.\n- Fast 40-minute DC charge (10-80%) with the 45 kWh battery — practical for highway trips.\n- 5-star Global NCAP safety with 6 airbags, ESC, and a structurally robust platform.";

        m.cons = "- Real-world highway range drops to around 300-350 km (45 kWh) — highway driving at 100+ km/h reduces efficiency significantly.\n- The 30 kWh MR variant, while cheaper, offers limited range (200-230 km real world) that may not suit longer commuters.\n- Public DC fast charging infrastructure continues to develop outside metro cities — plan ahead for highway travel.\n- No AWD option yet — it's strictly front-wheel-drive.\n- ADAS is limited to top-spec 45 kWh variants only — not available with the 30 kWh battery.\n- Boot space at 350 litres is slightly less than the ICE Nexon's 382 litres.";

        m.exteriorDesign = "The facelifted Nexon EV is the most striking EV in its segment. Connected LED DRLs sweep across the front, flanking a closed-off grille with the 'EV' badge. Projector LED headlamps with cornering function, connected LED taillights, and a flush tailgate handle create a futuristic identity. 16-inch diamond-cut alloy wheels, a muscular shoulder line, and 205mm ground clearance deliver SUV presence. Special colours and the Dark Edition with blacked-out elements offer personalisation. At 3,994 mm long with a 2,498 mm wheelbase, it's identically sized to the ICE Nexon — practical yet bold.";

        m.comfortConvenience = "The Nexon EV's cabin sets the benchmark for electric SUVs in India. The 12.3-inch touchscreen is vivid and responsive, running Tata's Arcade.ev platform with wireless Apple CarPlay/Android Auto. The 10.25-inch digital cockpit displays range prediction, energy flow, ADAS status, and navigation. The 9-speaker JBL sound system with Dolby Atmos turns every drive into a concert. A panoramic sunroof, ventilated front seats, leatherette upholstery, and wireless charger create premium comfort. Multi-mode regenerative braking (4 levels) and drive modes (Eco, City, Sport) tailor the driving experience. Connected car features let you pre-cool the cabin, monitor charging, and locate your car — all from your phone.";

        m.engineSummaries = [
            {
                title: "30 kWh Medium Range (MR)",
                summary: "Permanent Magnet Synchronous Motor with 30 kWh liquid-cooled, IP67-rated lithium-ion battery.",
                transmission: "Single-Speed Automatic",
                power: "130 HP (97 kW)",
                torque: "215 Nm (instant)",
                speed: "325 km MIDC range | 0-100 in 9.2s"
            },
            {
                title: "45 kWh Long Range (LR)",
                summary: "Permanent Magnet Synchronous Motor with 45 kWh liquid-cooled battery. V2L/V2V capable on Empowered+ trims.",
                transmission: "Single-Speed Automatic",
                power: "144 HP (107 kW)",
                torque: "215 Nm (instant)",
                speed: "489 km MIDC range | 0-100 in 8.9s"
            }
        ];

        m.mileageData = [
            { engineName: "30 kWh MR", companyClaimed: "325 km (MIDC)", cityRealWorld: "220–260 km", highwayRealWorld: "180–210 km" },
            { engineName: "45 kWh LR", companyClaimed: "489 km (MIDC)", cityRealWorld: "350–400 km", highwayRealWorld: "280–330 km" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Nexon EV in 2025?", answer: "The Nexon EV 2025 starts at ₹12.49 lakh (Creative+ 30 kWh) and goes up to ₹17.49 lakh (Empowered+ A 45 kWh Red Dark), ex-showroom." },
            { question: "What is the range of the Tata Nexon EV?", answer: "The 30 kWh MR offers 325 km MIDC range (220-260 km real-world city). The 45 kWh LR delivers 489 km MIDC range (350-400 km real-world city). Highway range is lower due to higher speeds." },
            { question: "Does the Nexon EV have ADAS?", answer: "Yes! From September 2025, top-spec 45 kWh variants include Level 2 ADAS with Autonomous Emergency Braking, Lane Keep Assist, Lane Centering, Forward Collision Warning, Traffic Sign Recognition, and Driver Drowsiness Detection." },
            { question: "What happened to the 40.5 kWh battery?", answer: "The 40.5 kWh battery was discontinued in February 2025 and replaced by the superior 45 kWh battery pack, which offers better range (489 km vs 465 km) and faster charging." },
            { question: "How fast does the Nexon EV charge?", answer: "The 45 kWh charges from 10-80% in 40 minutes using a 60 kW DC fast charger. A 7.2 kW AC wall box does a full charge in 6 hours. The 30 kWh takes ~56 minutes for DC fast charging." },
            { question: "Does the Nexon EV have V2L?", answer: "Yes, Empowered+ (Long Range) variants support V2L (Vehicle-to-Load) to power external devices and V2V (Vehicle-to-Vehicle) to charge another EV — making the Nexon EV a mobile power station." },
            { question: "What is the safety rating of the Nexon EV?", answer: "The Nexon platform holds a 5-star Global NCAP safety rating. The Nexon EV comes with 6 airbags, ESC, Hill Hold, TPMS, 360° camera, and ISOFIX — one of the safest electric SUVs in India." }
        ];

        await m.save();
        console.log("✅ Tata Nexon EV — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
