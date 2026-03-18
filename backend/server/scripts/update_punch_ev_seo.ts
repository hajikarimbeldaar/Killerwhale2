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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-punch-ev' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Punch EV 2026 Price, Range & Specs – India's best-value electric micro SUV from ₹9.69 lakh. Up to 468 km range, V2L/V2V, DC fast charge in 26 mins, 360° camera, 6 airbags, and acti.ev platform.";

        m.summary = "The Tata Punch EV is the electric micro SUV that's making India fall in love with EVs — again. Built on the dedicated acti.ev platform, it offers a choice of 30 kWh (365 km) and 40 kWh (468 km) batteries, V2L capability to power your appliances, and DC fast charging that adds 135 km in just 15 minutes. With 6 airbags, 360° camera, 10.25-inch twin screens, and a voice-assisted sunroof, it's packed with premium features starting at just ₹9.69 lakh.";

        m.description = "The Tata Punch EV is the first car built on Tata's revolutionary acti.ev platform — a pure-EV architecture designed from the ground up for electric performance. This isn't just an ICE car converted to electric; it's born electric.\n\nTwo battery options serve different needs: the 30 kWh MR (87 bhp, 154 Nm) offers 365 km of range, while the 40 kWh LR (129 hp, 154 Nm) stretches that to an impressive 468 km. Both use advanced LFP prismatic cells for safety and longevity. DC fast charging is blazing fast — 20-80% in just 26 minutes with a 65 kW charger, and a quick 15-minute top-up adds up to 135 km.\n\nThe acti.ev platform enables game-changing features: V2L (Vehicle-to-Load) to power external devices, V2V (Vehicle-to-Vehicle) to boost another EV, a flat floor for maximized cabin space, and a frunk for extra storage. The 6-in-1 EV drive unit ensures reliability and efficiency.\n\nInside, it's loaded: 10.25-inch Harman touchscreen, 10.25-inch digital cockpit, 360° camera with blind spot monitor, voice-assisted electric sunroof, ventilated front seats, wireless charger, and Arcade.ev 2.0 app suite with OTA updates. Safety is fortress-level with 6 airbags, ESP, hill hold/descent control, electronic parking brake with auto-hold, and ISOFIX. Available in Smart, Smart+, Adventure, Empowered, and Empowered+ trims from ₹9.69 to ₹12.59 lakh. Also available under BaaS from ₹6.49 lakh.";

        m.pros = "- Built on the dedicated acti.ev platform — born electric with flat floor, frunk, and V2L/V2V capability.\n- Up to 468 km ARAI range (40 kWh LR) — class-leading for an electric micro SUV.\n- Blazing DC fast charging: 20-80% in just 26 minutes. 15 minutes adds 135 km — perfect for quick stops.\n- 6 airbags standard, ESP, hill hold/descent, electronic parking brake, and 360° camera — uncompromising safety.\n- Battery-as-a-Service (BaaS) option from ₹6.49 lakh reduces upfront cost to near-hatchback levels.\n- V2L technology lets you power appliances, laptops, and camping gear — your car is now a portable power station.";

        m.cons = "- Real-world range in mixed/highway driving can drop to 280–350 km from the claimed 468 km — plan charges on long trips.\n- The 30 kWh MR variant's 87 bhp motor feels adequate but not sporty — the 40 kWh LR is the sweet spot.\n- Public fast-charging infrastructure is still maturing outside metro cities and major highways.\n- No spare tyre (puncture repair kit) — standard for EVs but worth noting for rural/off-road scenarios.\n- Rear seat space is micro-SUV adequate — cozy for two adults, tight for three on longer drives.";

        m.exteriorDesign = "The Punch EV looks distinct from its ICE sibling thanks to the acti.ev platform's design freedom. Smart Digital DRLs create a futuristic light signature, while LED headlamps and fog lamps with cornering function improve visibility. The digital infinity glow end-to-end tail lamp is a visual marvel. On higher trims, 16-inch diamond-cut alloy wheels and a frunk (front trunk) add functionality to form. Roof rails and a bold SUV stance with 190 mm ground clearance complete the rugged-yet-refined look.";

        m.comfortConvenience = "The Punch EV's cabin leverages the acti.ev platform's flat floor for outstanding space efficiency. The 10.25-inch Harman touchscreen handles infotainment with Arcade.ev 2.0 and wireless Apple CarPlay/Android Auto, while the 10.25-inch digital cockpit displays range and navigation. The voice-assisted electric sunroof, ventilated front seats, leatherette upholstery, and wireless charger create a premium ambiance. Multi-mode regen with paddle shifters gives you control over energy recovery. The iRA connected car system with smartwatch connectivity and over 50 features keeps you connected at all times. And when you're off the grid, V2L technology lets you power your devices directly from the car.";

        m.engineSummaries = [
            {
                title: "30 kWh Medium Range (MR)",
                summary: "Permanent Magnet Synchronous Motor with 30 kWh LFP prismatic battery. 6-in-1 EV drive unit on acti.ev platform.",
                transmission: "Single-Speed Automatic",
                power: "87 BHP (65 kW)",
                torque: "154 Nm (instant)",
                speed: "365 km ARAI range"
            },
            {
                title: "40 kWh Long Range (LR)",
                summary: "Permanent Magnet Synchronous Motor with 40 kWh LFP prismatic battery. Lifetime HV battery warranty.",
                transmission: "Single-Speed Automatic",
                power: "129 HP (95 kW)",
                torque: "154 Nm (instant)",
                speed: "468 km ARAI range"
            }
        ];

        m.mileageData = [
            { engineName: "30 kWh MR", companyClaimed: "365 km (ARAI)", cityRealWorld: "280–320 km", highwayRealWorld: "220–260 km" },
            { engineName: "40 kWh LR", companyClaimed: "468 km (ARAI)", cityRealWorld: "350–400 km", highwayRealWorld: "280–320 km" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Punch EV in 2026?", answer: "The 2026 Punch EV starts at ₹9.69 lakh (Smart 30 kWh) and goes up to ₹12.59 lakh (Empowered+ 40 kWh), ex-showroom. Under BaaS (Battery-as-a-Service), prices start at just ₹6.49 lakh." },
            { question: "What is the range of the Tata Punch EV?", answer: "The 30 kWh MR variant offers 365 km ARAI range (280–320 km real-world city). The 40 kWh LR variant delivers 468 km ARAI range (350–400 km real-world city)." },
            { question: "How fast does the Punch EV charge?", answer: "With a 65 kW DC fast charger, the Punch EV charges from 20-80% in just 26 minutes. A 15-minute quick charge adds up to 135 km of range (40 kWh). Home charging with a 7.2 kW wall box takes 4.5–5.3 hours." },
            { question: "What is V2L in the Punch EV?", answer: "V2L (Vehicle-to-Load) lets you use the Punch EV as a portable power source. You can power laptops, camping gear, electric grills, and even small appliances directly from the car's battery. V2V lets you charge another EV." },
            { question: "What is the acti.ev platform?", answer: "acti.ev is Tata's purpose-built pure-EV platform. It provides a flat floor, frunk, V2L/V2V, up to 600 km range capability, 5-star safety architecture, Level 2 ADAS compatibility, and 5G connectivity with OTA updates." },
            { question: "Is the Tata Punch EV safe?", answer: "Yes, the Punch EV comes with 6 airbags, ESP, Hill Hold & Descent Control, electronic parking brake with auto-hold, 360° camera, blind spot monitor, ISOFIX, iTPMS, and SOS calling — comprehensive safety at every level." },
            { question: "What variants is the Punch EV available in?", answer: "Five variants: Smart (30 kWh), Smart+ (30/40 kWh), Adventure (40 kWh), Empowered (40 kWh), and Empowered+ (40 kWh). Higher trims add ventilated seats, leatherette, and the 10.25-inch dual-screen setup." }
        ];

        await m.save();
        console.log("✅ Tata Punch EV — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
