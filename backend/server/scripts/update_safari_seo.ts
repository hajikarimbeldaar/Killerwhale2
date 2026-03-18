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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-safari' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Safari 2025 Price, Specs & Review – India's safest 7-seater SUV from ₹13.29 lakh. 2.0L Diesel, new 1.5L Hyperion Turbo Petrol, 5-star BNCAP, Level 2 ADAS, panoramic sunroof, and 12.3-inch screen.";

        m.summary = "The Tata Safari reclaims its legendary throne with striking modern design, unmatched safety, and luxurious space for six or seven passengers. Holding a prestigious 5-star Bharat NCAP rating, it now offers both the commanding 2.0L Kryotec diesel and the potent new 1.5L Hyperion turbo petrol engine. With Level 2 ADAS, ventilated captain seats, a 12.3-inch touchscreen, and a sprawling panoramic sunroof, the Safari is the ultimate family flagship starting at ₹13.29 lakh.";

        m.description = "The new Tata Safari is a masterclass in evolving an icon. Building upon the Land Rover-derived OMEGA-ARC architecture, the comprehensively facelifted Safari delivers flagship levels of luxury, technology, and space in both 6-seater and 7-seater configurations.\n\nThe big news for 2025-2026 is the introduction of the new 1.5L Hyperion Turbo GDi petrol engine, generating a smooth 170 PS and 280 Nm of torque. It sits alongside the proven 2.0L Kryotec diesel engine that churns out 170 PS and 350 Nm of torque. Both engines are available with 6-speed manual and automatic transmissions, ensuring there's a Safari for every driving preference.\n\nThe exterior is bold and futuristic, highlighted by a parametric grille, connected LED DRLs, and massive 19-inch diamond-cut alloy wheels. Inside, it's a technology sanctuary: a 12.3-inch Harman touchscreen with wireless Apple CarPlay/Android Auto, a 10.25-inch digital cockpit, dual-zone climate control, and a 10-speaker JBL audio system.\n\nComfort is paramount. The 6-seater variants offer luxurious ventilated captain seats in the second row. A voice-assisted panoramic sunroof floods the cabin with light. Crucially, the Safari is a fortress: it achieved a perfect 5-star rating in both Global NCAP and Bharat NCAP crash tests. Top trims feature an advanced Level 2 ADAS suite with 22 functions including Adaptive Cruise Control and Auto Emergency Braking. Prices span from ₹13.29 lakh to ₹26.69 lakh (ex-showroom).";

        m.pros = "- Flawless 5-star safety rating from Global NCAP and Bharat NCAP, making it the safest 3-row SUV in India.\n- The introduction of the new 1.5L Hyperion turbo petrol engine finally offers a refined alternative to the diesel.\n- Distinctive, imposing road presence with connected LED lighting and massive 19-inch alloy wheels.\n- The 6-seater variant with ventilated 2nd-row captain seats offers unmatched luxury and comfort for passengers.\n- Highly advanced Level 2 ADAS suite with 22 functionalities, ensuring maximum safety on highways.\n- Outstanding high-speed stability and ride quality courtesy of the Land Rover-derived OMEGA-ARC platform.";

        m.cons = "- It remains a heavy front-wheel-drive SUV; despite the aggressive styling, there is no 4x4 or AWD option available.\n- While the diesel is excellent on the highway, it can feel vocal and slightly clattery at low city speeds.\n- Third-row seating is best suited for children or short adults on quick trips; it lacks under-thigh support for tall adults.\n- Boot space with all three rows up is severely limited (73 litres), requiring a roof carrier for full-family luggage.\n- The heavy steering at crawling speeds makes navigating tight parking spots and U-turns slightly cumbersome.";

        m.exteriorDesign = "The Tata Safari commands attention. The front fascia is defined by a bold parametric grille finished in body color or gloss black, flanked by vertically stacked LED projector headlamps. A continuous LED DRL strip spans the width of the hood. The side profile retains the iconic stepped roofline — a signature Safari element — while housing massive 19-inch diamond-cut alloy wheels in flared arches. The rear features sharp, connected LED tail lamps and a sculpted bumper. The new 'Stealth Edition' trims coat the Safari in a sinister matte black, perfectly matching its aggressive demeanor.";

        m.comfortConvenience = "Inside, the Safari feels genuinely luxurious. The dashboard features premium soft-touch materials, accented by the 12.3-inch touchscreen and 10.25-inch digital driver display. The illuminated 4-spoke steering wheel is a visual delight. Standard features on higher trims include dual-zone climate control, a 10-speaker JBL audio system, wireless charging, and 360-degree cameras. The 6-seater setup is highly recommended, offering ventilated comfort for both front and second-row passengers. The massive panoramic sunroof features mood lighting, while the powered tailgate with gesture control ensures easy access to the cargo area.";

        m.engineSummaries = [
            {
                title: "2.0L Kryotec Turbo Diesel",
                summary: "1956cc, 4-cylinder turbocharged diesel. Outstanding mid-range punch.",
                transmission: "6-Speed Manual / 6-Speed Automatic",
                power: "170 PS (168 BHP) @ 3,750 rpm",
                torque: "350 Nm @ 1,750–2,500 rpm",
                speed: "~190 km/h (top speed)"
            },
            {
                title: "1.5L Hyperion Turbo Petrol",
                summary: "New 1498cc, 4-cylinder direct-injection turbo petrol. Smooth and silent.",
                transmission: "6-Speed Manual / Automatic pending confirmation",
                power: "170 PS (168 BHP) @ 5,000 rpm",
                torque: "280 Nm @ 1,750–3,500 rpm",
                speed: "~185 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "2.0L Diesel MT", companyClaimed: "16.30 km/l (ARAI)", cityRealWorld: "10–12 km/l", highwayRealWorld: "14–16 km/l" },
            { engineName: "2.0L Diesel AT", companyClaimed: "14.50 km/l (ARAI)", cityRealWorld: "9–11 km/l", highwayRealWorld: "13–15 km/l" },
            { engineName: "1.5L Hyperion Petrol", companyClaimed: "TBA (ARAI)", cityRealWorld: "9–11 km/l (Est.)", highwayRealWorld: "13–15 km/l (Est.)" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Safari in 2025?", answer: "The Tata Safari is priced from ₹13.29 lakh for the base petrol to ₹26.69 lakh (ex-showroom) for the top-end diesel automatic. It's offered in Smart, Pure X, Adventure, and Accomplished personas." },
            { question: "Is the Tata Safari available in petrol?", answer: "Yes! A major update is the introduction of the new 1.5L Hyperion Turbo GDi petrol engine, producing 170 PS and 280 Nm of torque, offering a refined, quiet alternative to the diesel." },
            { question: "Does the Tata Safari have a 4x4 option?", answer: "No, the Safari remains a Front-Wheel Drive (FWD) SUV. While it offers advanced Terrain Response modes (Normal, Rough, Wet) from Land Rover, it does not feature a 4x4 or AWD drivetrain." },
            { question: "Is the Safari a 6-seater or a 7-seater?", answer: "Both! The Safari is available as a standard 7-seater with a bench in the middle row, or as a premium 6-seater equipped with extremely comfortable, ventilated captain seats in the second row." },
            { question: "What are the key ADAS features in the Safari?", answer: "The Safari features Level 2 ADAS with 22 functions, including Adaptive Cruise Control with Stop & Go, Autonomous Emergency Braking, Lane Keep Assist, Blind Spot Detection, and Rear Cross Traffic Alert." },
            { question: "What is the safety rating of the Tata Safari?", answer: "The Tata Safari is incredibly safe, holding a flawless 5-star rating in both Global NCAP and Bharat NCAP crash tests. It features 7 airbags, a robust OMEGA-ARC chassis, and advanced ESP." },
            { question: "What is the boot space of the Safari?", answer: "With all 3 rows up, boot space is limited to 73 litres. Folding the 3rd row expands it to a generous 420 litres, and folding the 2nd row creates a massive 827-litre cargo area." }
        ];

        await m.save();
        console.log("✅ Tata Safari — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
