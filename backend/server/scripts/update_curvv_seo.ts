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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-curvv' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Curvv 2025 SUV Coupe Price, Specs & Review – India's first mass-market SUV Coupe starting at ₹9.65 lakh. 125 PS Hyperion Turbo, Level 2 ADAS, 7-speed DCA, panoramic sunroof, and 5-star Bharat NCAP safety.";

        m.summary = "The Tata Curvv brings the stunning SUV-Coupe design — previously reserved for luxury cars — to the mass market. Built on the new ATLAS platform, it introduces the powerful new 1.2L 'Hyperion' direct-injection turbo petrol (125 PS) alongside a 1.5L diesel, both available with a 7-speed DCA automatic. With Level 2 ADAS, a 5-star Bharat NCAP rating, powered tailgate, and a massive 500-litre boot, the Curvv isn't just a style statement, it's a deeply practical family SUV.";

        m.description = "The Tata Curvv is a watershed moment for Indian car design — it brings the alluring sloping roofline of an SUV-Coupe to the mass market segment without sacrificing the ruggedness of a traditional SUV. Built on the advanced ATLAS (Adaptive Tech Forward Lifestyle Architecture) platform, it starts at a highly aggressive ₹9.65 lakh.\n\nUnder the hood, it introduces Tata's new 'Hyperion' engine — an all-aluminum 1.2L direct-injection (T-GDi) turbo petrol delivering 125 PS and 225 Nm. This joins the standard 1.2L turbo petrol (120 PS) and the 1.5L Revotorq diesel (118 PS). Uniquely, ALL three engines can be paired with either a 6-speed manual or a 7-speed DCA (dual-clutch automatic) — making the Curvv Diesel DCA a rare find in the segment.\n\nThe cabin is a tech sanctuary: 12.3-inch Harman touchscreen, 10.25-inch digital driver's display, panoramic sunroof, ventilated front seats, 6-way powered driver's seat, multi-color ambient lighting, and a powered tailgate with gesture control. \n\nSafety is paramount: 6 airbags standard, ESC, and a 5-star Bharat NCAP crash test rating. Higher trims boast Level 2 ADAS with 20 features including Adaptive Cruise Control, Auto Emergency Braking, and Lane Keep Assist. With 190mm ground clearance and a massive 500-litre boot, the Curvv is ready for both the red carpet and the road trip.";

        m.pros = "- Stunning SUV-Coupe design turns heads everywhere — brings luxury styling to the ₹10-20 lakh segment.\n- New 1.2L 'Hyperion' T-GDi turbo petrol engine handles high-speed cruising with impressive refinement and punch.\n- The 1.5L Diesel is available with a 7-speed DCA automatic — a brilliant combination for effortless highway touring.\n- Massive 500-litre boot space is incredibly practical, made better by the gesture-controlled powered tailgate.\n- 5-star Bharat NCAP safety rating and Level 2 ADAS suite make it one of the safest cars on Indian roads.\n- Feature-loaded cabin with panoramic sunroof, ventilated seats, and 12.3-inch touchscreen.";

        m.cons = "- The sloping roofline restricts rear-seat headroom for passengers taller than 6 feet compared to traditional upright SUVs.\n- Rearward visibility through the IRVM is compromised due to the sharply raked rear windshield — heavily relies on the 360° camera.\n- The standard 1.2L turbo petrol (120 PS) feels a bit strained under full load compared to the new Hyperion engine.\n- NVH insulation could be slightly better at triple-digit speeds, where wind and road noise begin to seep in.\n- The low seating position in the rear bench results in limited under-thigh support for taller occupants.";

        m.exteriorDesign = "The Tata Curvv is defined by its silhouette — a robust, high-riding SUV lower half topped with a sweeping, aerodynamic coupe roofline. The front fascia features an LED light bar and split headlamp setup with a parametric grille that gives it a futuristic face. Flush-fitting door handles deploy cleanly, adding to the aerodynamic profile. The rear is dominated by the sharply raked windshield, a spoiler, and an LED light bar that spans the width of the tailgate. Flared wheel arches housing 18-inch alloy wheels and 190mm of ground clearance ensure it maintains an imposing, muscular stance that isn't intimidated by broken roads.";

        m.comfortConvenience = "The Curvv's interior steps up the premium feel. The dashboard is minimalist, dominated by a 12.3-inch Harman touchscreen with wireless Apple CarPlay/Android Auto and a 9-speaker JBL sound system. The 10.25-inch digital driver's display can project navigation maps natively. For comfort, you get ventilated front seats, a 6-way powered driver's seat, and automatic climate control with rear AC vents. A panoramic sunroof fills the dark-themed cabin with light. Convenience features include a 360-degree camera with a blind-view monitor, an electronic parking brake with auto-hold, a wireless charger, and crucially, a gesture-activated powered tailgate that reveals the cavernous 500L boot.";

        m.engineSummaries = [
            {
                title: "1.2L Hyperion T-GDi Turbo Petrol",
                summary: "All-new 1198cc, 3-cylinder direct-injection turbo petrol. All-aluminum construction.",
                transmission: "6-Speed Manual / 7-Speed DCA",
                power: "125 PS (123 BHP) @ 5,000 rpm",
                torque: "225 Nm @ 1,700–3,500 rpm",
                speed: "~190 km/h (top speed)"
            },
            {
                title: "1.2L Revotron Turbo Petrol",
                summary: "1199cc, 3-cylinder turbocharged petrol. Proven Nexon engine.",
                transmission: "6-Speed Manual / 7-Speed DCA",
                power: "120 PS (118 BHP) @ 5,500 rpm",
                torque: "170 Nm @ 1,750–4,000 rpm",
                speed: "~180 km/h (top speed)"
            },
            {
                title: "1.5L KryoTech Diesel",
                summary: "1497cc, 4-cylinder turbocharged diesel. Segment-first with dual-clutch combo.",
                transmission: "6-Speed Manual / 7-Speed DCA",
                power: "118 PS (116 BHP) @ 4,000 rpm",
                torque: "260 Nm @ 1,500–2,750 rpm",
                speed: "~175 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.2L Hyperion DCA", companyClaimed: "16.3 km/l (ARAI)", cityRealWorld: "11–13 km/l", highwayRealWorld: "15–17 km/l" },
            { engineName: "1.2L Revotron MT", companyClaimed: "17.4 km/l (ARAI)", cityRealWorld: "12–14 km/l", highwayRealWorld: "16–18 km/l" },
            { engineName: "1.5L Diesel MT", companyClaimed: "22.4 km/l (ARAI)", cityRealWorld: "15–17 km/l", highwayRealWorld: "19–21 km/l" },
            { engineName: "1.5L Diesel DCA", companyClaimed: "20.3 km/l (ARAI)", cityRealWorld: "14–16 km/l", highwayRealWorld: "17–19 km/l" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Curvv ICE in 2025?", answer: "The Tata Curvv (Petrol & Diesel) is priced starting at ₹9.65 lakh, with top-end variants going up to ₹18.85 lakh (ex-showroom). It comes in Smart, Pure, Creative, and Accomplished personas." },
            { question: "Is the Tata Curvv diesel available with an automatic?", answer: "Yes, and it's a major highlight! The 1.5L diesel engine on the Curvv is available with a 7-speed DCA (Dual Clutch Automatic) transmission, making it a fantastic and effortless highway cruiser." },
            { question: "What is the new Hyperion engine in the Curvv?", answer: "The Hyperion is Tata's all-new 1.2L direct-injection (T-GDi) turbo-petrol engine. It produces 125 PS and 225 Nm of torque, offering significantly better performance and refinement than the older 1.2L turbo." },
            { question: "What is the boot space of the Tata Curvv?", answer: "Despite its sloping coupe roofline, the Curvv offers a massive 500-litre boot space, which can be expanded to 973 litres with the rear seats folded down. The tailgate is also powered and gesture-controlled." },
            { question: "Does the Curvv have ADAS?", answer: "Yes, higher trims of the Curvv feature Level 2 ADAS with 20 functionalities including Adaptive Cruise Control, Auto Emergency Braking, Lane Keep Assist, Blind Spot Detection, and Rear Cross Traffic Alert." },
            { question: "What is the safety rating of the Tata Curvv?", answer: "The Tata Curvv holds a 5-star Bharat NCAP safety rating for both adult and child occupant protection. Standard safety tech includes 6 airbags, ESC, all-wheel disc brakes (on higher trims), and ISOFIX mounts." },
            { question: "Does the sloping roofline affect rear headroom?", answer: "While Tata has scooped out the roof liner, rear headroom is tighter than in a traditional upright SUV like the Harrier. Passengers over 6 feet tall might find their heads brushing the roof." }
        ];

        await m.save();
        console.log("✅ Tata Curvv — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
