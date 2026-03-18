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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-tiago-ev' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Tiago EV 2025 Price, Range & Specs – India's most affordable electric hatchback starts at ₹7.99 lakh. Up to 315 km MIDC range, 0-60 km/h in 5.7s, DC fast charging in 58 mins, 10.25-inch touchscreen, and 4-star GNCAP safety.";

        m.summary = "The Tata Tiago EV proves you don't need to spend a fortune to go electric. Starting at just ₹7.99 lakh, it's India's most accessible EV with a zippy permanent magnet motor that rockets from 0-60 km/h in 5.7 seconds. Choose between the 19.2 kWh Medium Range (223 km) or the 24 kWh Long Range (315 km) battery, and enjoy a 10.25-inch touchscreen, 4-star GNCAP safety, and running costs as low as ₹1 per kilometre. It makes the ICE-to-EV switch feel like a no-brainer.";

        m.description = "The Tata Tiago EV has single-handedly democratised electric mobility in India. Since its launch, it has proven that EVs can be affordable, practical, and genuinely fun to drive.\n\nThe 2025 update elevated it further with a 10.25-inch Harman floating touchscreen (wireless Android Auto & Apple CarPlay), a new two-spoke steering wheel with an illuminated Tata logo, and a refreshed grey-and-black dual-tone interior. Safety is robust — it carries a 4-star Global NCAP rating and packs ESC, Hill Hold Control, TPMS, and a rear parking camera.\n\nTwo battery options cater to different needs: the 19.2 kWh Medium Range (MR) with 60 bhp and 110 Nm delivers 223 km MIDC range, while the 24 kWh Long Range (LR) pumps out 74 bhp and 114 Nm for 315 km MIDC range. Both use a liquid-cooled, IP67-rated battery pack for safety in all weather conditions. DC fast charging gets you from 10-80% in just 58 minutes, while a 7.2 kW AC home charger does the full charge in under 4 hours.\n\nDrive modes (City and Sport) and four-level regenerative braking give you control over the driving experience. With colours like Chill Lime, Supernova Copper, and Teal Blue, the Tiago EV is as expressive on the outside as it is efficient on the inside. Available in XE MR, XT MR, XT LR, and XZ+ Tech Lux LR variants.";

        m.pros = "- India's most affordable EV starting at ₹7.99 lakh — makes electric ownership accessible to millions.\n- Punchy acceleration with 0-60 km/h in just 5.7 seconds (Long Range) — faster than many petrol hatchbacks.\n- DC fast charging (10-80% in 58 minutes) and 7.2 kW AC wall box support for convenient home charging.\n- 4-star Global NCAP safety with ESC, Hill Hold, TPMS, and IP67-rated liquid-cooled battery.\n- 2025 update added 10.25-inch Harman touchscreen with wireless connectivity and refreshed interior.";

        m.cons = "- Real-world range drops to around 170-200 km in mixed driving — plan your routes for longer trips.\n- Boot space at 240 litres is adequate for daily use but limits weekend getaway luggage.\n- No spare tyre (puncture repair kit only) — a common EV trade-off for battery packaging.\n- The Medium Range 19.2 kWh variant's 60 bhp can feel underpowered on highway overtaking.\n- Public DC fast charging infrastructure is still developing outside metro cities.";

        m.exteriorDesign = "The 2025 Tiago EV swapped the earlier blue accents for sleek silver surrounds, giving it a more mature, sophisticated look. LED headlamps with integrated DRLs, aerodynamic Hyperstyle wheel covers, and the '.EV' badge repositioned on the front doors create a clean, modern identity. The shark-fin antenna improves both aesthetics and GPS reception. New colours like Chill Lime and Supernova Copper make the Tiago EV the most vibrant-looking EV in its price range. At 3,769 mm long with 165 mm ground clearance, it's nimble enough for tight city parking.";

        m.comfortConvenience = "The cabin of the Tiago EV feels a class above its price. The 10.25-inch Harman floating touchscreen is the centrepiece — crisp, responsive, and loaded with wireless Android Auto and Apple CarPlay. The fully digital instrument cluster displays range, battery status, and drive mode in real time. Comfort features include automatic climate control (which doubles as battery thermal management), cruise control, a 45W USB Type-C fast charger, push-button start with keyless entry, and electrically adjustable ORVMs. The new steering wheel with illuminated logo adds a premium touch. And because it's electric, the cabin is whisper-quiet — perfect for enjoying the available sound system or just the silence.";

        m.engineSummaries = [
            {
                title: "19.2 kWh Medium Range (MR)",
                summary: "Permanent Magnet Synchronous Motor with liquid-cooled, IP67-rated lithium-ion battery.",
                transmission: "Single-Speed Automatic",
                power: "60 BHP (45 kW)",
                torque: "110 Nm (instant)",
                speed: "223 km MIDC range"
            },
            {
                title: "24 kWh Long Range (LR)",
                summary: "Permanent Magnet Synchronous Motor with liquid-cooled, IP67-rated lithium-ion battery.",
                transmission: "Single-Speed Automatic",
                power: "74 BHP (55 kW)",
                torque: "114 Nm (instant)",
                speed: "315 km MIDC range"
            }
        ];

        m.mileageData = [
            { engineName: "19.2 kWh MR", companyClaimed: "223 km (MIDC)", cityRealWorld: "160–180 km", highwayRealWorld: "130–150 km" },
            { engineName: "24 kWh LR", companyClaimed: "315 km (MIDC)", cityRealWorld: "200–220 km", highwayRealWorld: "170–190 km" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Tiago EV in 2025?", answer: "The Tata Tiago EV 2025 starts at ₹7.99 lakh (XE MR) and goes up to ₹11.79 lakh (XZ+ Tech Lux LR Fast Charge), ex-showroom." },
            { question: "What is the real-world range of the Tata Tiago EV?", answer: "In real-world city driving, the 19.2 kWh MR delivers 160–180 km, while the 24 kWh LR offers 200–220 km. Highway range is lower at 130–150 km and 170–190 km respectively." },
            { question: "How long does it take to charge the Tata Tiago EV?", answer: "DC fast charging takes just 58 minutes (10-80%). A 7.2 kW AC wall box charger does a full charge in about 3.6 hours (LR). A standard 15A home socket takes 6.9–8.7 hours depending on the battery." },
            { question: "Is the Tata Tiago EV safe?", answer: "Yes, the Tiago EV has a 4-star Global NCAP safety rating. It comes with dual front airbags, ESC, Hill Hold Control, TPMS, rear parking camera, and an IP67-rated liquid-cooled battery for all-weather safety." },
            { question: "What is the 0-60 km/h time of the Tiago EV?", answer: "The Long Range (24 kWh) variant accelerates from 0-60 km/h in just 5.7 seconds, making it faster than many petrol hatchbacks in its segment." },
            { question: "Does the Tata Tiago EV have fast charging?", answer: "Yes, the Tiago EV supports CCS2 DC fast charging, which charges the battery from 10% to 80% in approximately 58 minutes. It's compatible with all standard public DC fast chargers." },
            { question: "What are the drive modes in the Tiago EV?", answer: "The Tiago EV offers two drive modes — City and Sport — along with four levels of regenerative braking (Off, Level 1, 2, and 3) for maximum range and driving customisation." }
        ];

        await m.save();
        console.log("✅ Tata Tiago EV — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
