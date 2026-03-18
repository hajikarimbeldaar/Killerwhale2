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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-harrier-ev' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Harrier EV 2025 Price, Range & Specs – India's premium electric AWD SUV from ₹21.49 lakh. Up to 622 km range (75 kWh), Quad Wheel Drive, 390 bhp, Level 2 ADAS, V2L, and 14.5-inch Neo QLED display.";

        m.summary = "Launched in June 2025, the Tata Harrier EV takes the legendary Harrier nameplate and electrifies it on the new acti.ev Plus architecture. Offering massive 65 kWh and 75 kWh battery packs for up to 622 km of ARAI range, it introduces Tata's Quad Wheel Drive (dual-motor AWD) producing a staggering 390 bhp. Packed with a 14.5-inch Neo QLED display, V2L capabilities, Level 2 ADAS, and 5-star BNCAP safety, it's a zero-emission powerhouse starting at ₹21.49 lakh.";

        m.description = "The Tata Harrier EV, officially launched in June 2025, is a masterclass in premium electric SUV engineering. Built on the brand-new 'acti.ev Plus' architecture — a sophisticated evolution of the Gen 2 platform designed specifically for larger vehicles — it offers unparalleled space, efficiency, and dynamic capability.\n\nThe headline feature is performance. The Harrier EV offers two large LFP battery packs: 65 kWh and 75 kWh. The top-tier 75 kWh variant boasts an ARAI-certified range of 622 km (real-world ~480-505 km). For the first time, Tata introduces a dual-motor All-Wheel Drive (AWD) setup, branded as Quad Wheel Drive (QWD). This powertrain generates a massive 390 bhp and 504 Nm of torque, catapulting this large SUV from 0-100 km/h in just 6.3 seconds. It features six terrain response modes (Rock Crawl, Mud Ruts, Snow, etc.) and off-road cruise control.\n\nThe cabin is a technological marvel. Dual screens dominate: a massive 14.5-inch Samsung Neo QLED infotainment display and a 12.25-inch digital instrument cluster. Luxury involves 6-way powered memory driver seats, ventilated front seats, a panoramic sunroof, and an e-IRVM with dashcam function. The acti.ev Plus platform enables V2L (Vehicle-to-Load) and V2V (Vehicle-to-Vehicle) charging.\n\nSafety is uncompromising with a 5-star Bharat NCAP rating, 7 airbags standard, and a comprehensive Level 2 ADAS suite. The Harrier EV isn't just an electric SUV; it's a statement of absolute dominance.";

        m.pros = "- Incredible performance from the dual-motor Quad Wheel Drive (AWD) setup — 390 bhp and 0-100 km/h in 6.3 seconds.\n- Massive 75 kWh battery yields up to 622 km ARAI range, easily delivering 450+ km in real-world highway driving.\n- Best-in-class 14.5-inch Samsung Neo QLED infotainment display offers stunning clarity and responsiveness.\n- Genuine off-road capability with AWD, six terrain response modes, and off-road cruise control.\n- The acti.ev Plus platform brings V2L and V2V tech — power your campsite or charge another stranded EV.\n- 5-star Bharat NCAP safety rating with 7 airbags and Level 2 ADAS suite standard on higher trims.";

        m.cons = "- It's a heavy vehicle due to the massive 75 kWh battery pack, which affects high-speed cornering dynamics slightly.\n- Charging a 75 kWh battery from a standard home AC charger takes significantly long — a 7.2kW or 11kW wall box is mandatory.\n- The sheer width and size of the Harrier EV make narrow city street maneuverability challenging.\n- Despite the premium pricing, AWD is restricted to the higher variants only (though planned for lower trims later).\n- The vast array of digital screens and touch-capacitive buttons have a steep learning curve for older buyers.";

        m.exteriorDesign = "The Harrier EV retains the muscular, imposing footprint of its ICE sibling but refines it with aerodynamic, EV-specific styling. The front features a closed-off aerodynamic grille and a full-width connected LED DRL signature. The main headlamp clusters are sleeker and vertically stacked. The side profile showcases aero-optimized 19-inch alloy wheels (on top trims) and flush, aerodynamic lines. At the rear, connected LED taillamps and a sculpted tailgate with 'HARRIER EV' badging complete the look. The special 'Stealth Edition' with matte black styling adds a sinister, premium appeal.";

        m.comfortConvenience = "Inside, the Harrier EV feels like an electric luxury lounge. The centerpiece is the stunning 14.5-inch Samsung Neo QLED touchscreen running advanced connected car software with built-in Mappls navigation and UPI-based in-car payments. The driver gets a 12.25-inch digital display. Comfort is guaranteed via a 6-way powered driver's seat with memory, a 4-way powered co-driver seat, and ventilated front seats. Rear passengers get an electric 'Boss mode' switch for extra legroom. Additional conveniences include a voice-assisted panoramic sunroof, 540-degree surround-view camera featuring a 'transparent chassis' mode, V2L outport, and an e-IRVM with an integrated dashcam.";

        m.engineSummaries = [
            {
                title: "65 kWh Electric (Front Wheel Drive)",
                summary: "Permanent Magnet Synchronous Motor with 65 kWh LFP battery on acti.ev Plus platform.",
                transmission: "Single-Speed Automatic",
                power: "Estimated ~200 BHP",
                torque: "Estimated ~350 Nm",
                speed: "500+ km ARAI range"
            },
            {
                title: "75 kWh Electric (Quad Wheel Drive / AWD)",
                summary: "Dual-motor All-Wheel Drive setup with massive 75 kWh battery pack.",
                transmission: "Single-Speed Automatic",
                power: "390 BHP (291 kW)",
                torque: "504 Nm (instant)",
                speed: "622 km ARAI range | 0-100 in 6.3s"
            }
        ];

        m.mileageData = [
            { engineName: "65 kWh Battery FWD", companyClaimed: "~520 km (ARAI)", cityRealWorld: "380–410 km", highwayRealWorld: "330–360 km" },
            { engineName: "75 kWh Battery AWD", companyClaimed: "622 km (ARAI)", cityRealWorld: "480–505 km", highwayRealWorld: "420–460 km" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Harrier EV in 2025?", answer: "Launched in June 2025, the Harrier EV starts at ₹21.49 lakh and goes up to ₹30.23 lakh (average ex-showroom) across 16 variants including Adventure, Fearless, Empowered, and Stealth editions." },
            { question: "What is the range of the Tata Harrier EV?", answer: "The top-spec 75 kWh battery offers an ARAI-certified range of 622 km. In real-world conditions, users can expect around 480-505 km in the city and 420-460 km on the highway." },
            { question: "Does the Harrier EV have AWD (4x4)?", answer: "Yes! The Harrier EV introduces a dual-motor All-Wheel Drive setup, which Tata calls Quad Wheel Drive (QWD). It produces 390 bhp and comes with six dedicated terrain response modes for off-roading." },
            { question: "What are the standout features of the Harrier EV cabin?", answer: "The cabin boasts a massive 14.5-inch Samsung Neo QLED touchscreen, a 12.25-inch digital driver display, 6-way powered memory seats, panoramic sunroof, e-IRVM with dashcam, and a 540-degree 'transparent chassis' camera." },
            { question: "Does the Harrier EV support V2L?", answer: "Yes, the acti.ev Plus platform supports both V2L (Vehicle-to-Load) to power external appliances and V2V (Vehicle-to-Vehicle) to share energy with another electric car." },
            { question: "How safe is the Harrier EV?", answer: "Extremely safe. It holds a 5-star Bharat NCAP rating with a perfect 32/32 adult occupant score. It comes standard with 7 airbags and features a comprehensive Level 2 ADAS suite." },
            { question: "How fast is the Harrier EV?", answer: "The dual-motor AWD 75 kWh variant generates 390 bhp and 504 Nm of torque, pushing this heavy SUV from 0-100 km/h in an impressive 6.3 seconds." }
        ];

        await m.save();
        console.log("✅ Tata Harrier EV — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
