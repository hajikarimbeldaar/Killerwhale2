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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-harrier' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Harrier 2026 Price, Specs & Review – India's premium SUV from ₹15.49 lakh. Now with 1.5L Hyperion Petrol & 2.0L Kryotec Diesel, Level 2 ADAS, panoramic sunroof, and 5-star BNCAP.";

        m.summary = "The Tata Harrier is the definitive premium Indian SUV. Built on the Land Rover-derived OMEGA-ARC architecture, it commands respect on the road. The 2026 model boasts a 5-star Bharat NCAP safety rating and now offers the highly anticipated 1.5L Hyperion turbo petrol engine alongside the powerful 2.0L Kryotec diesel. With Level 2 ADAS, a 12.3-inch touchscreen, and a panoramic sunroof, it's the ultimate combination of rugged capability and modern luxury.";

        m.description = "The Tata Harrier brought global SUV standards to the Indian market, and the 2026 model lineup perfects the formula. Built on the robust OMEGA-ARC platform — derived from Land Rover's D8 architecture — the Harrier delivers unmatched driving dynamics and high-speed stability.\n\nNow offering two formidable powertrains: the highly-anticipated new 1.5L Hyperion Turbo GDi petrol engine generating 170 PS and 280 Nm of torque for refined city and highway driving, alongside the proven 2.0L Kryotec turbocharged diesel engine (170 PS, 350 Nm) for massive mid-range punch. Both engines are mated to 6-speed manual or smooth-shifting automatic transmissions.\n\nThe Harrier's presence is undeniable, featuring a striking parametric grille, connected LED DRLs, and massive 18-inch alloy wheels. Inside, the luxury quotient is immense: a 12.3-inch Harman touchscreen with wireless connectivity, a 10.25-inch digital instrument cluster, a 10-speaker JBL audio system, ventilated front seats, dual-zone climate control, and a massive voice-assisted panoramic sunroof.\n\nCrucially, the Harrier is incredibly safe. It achieved a flawless 5-star rating in the Bharat NCAP crash tests for both adult and child occupant protection. Higher trims feature an advanced Level 2 ADAS suite with 11 functions, including Adaptive Cruise Control, Autonomous Emergency Braking, and Lane Keep Assist. With prices ranging from ₹15.49 lakh to ₹26.44 lakh, the Harrier remains the Alpha of Indian SUVs.";

        m.pros = "- Now available with the refined 1.5L Hyperion turbo petrol engine in addition to the workhorse 2.0L Kryotec diesel engine.\n- 5-star Bharat NCAP safety rating paired with a robust Level 2 ADAS suite makes it one of the safest SUVs in India.\n- Built on the Land Rover-derived OMEGA-ARC platform, offering exceptional high-speed stability and ride quality.\n- Stunning road presence with its bold front fascia, connected LED lighting, and muscular stance.\n- Premium cabin experience with a 12.3-inch touchscreen, 10-speaker JBL audio, panoramic sunroof, and ventilated seats.\n- Both engines offer well-calibrated automatic transmission options for effortless cruising.";

        m.cons = "- At lower speeds and idle, the 2.0L diesel engine's NVH (noise, vibration, harshness) levels are noticeable inside the cabin.\n- The steering is slightly heavy at city speeds, which can make tight parking maneuvers a bit of a workout.\n- Missing an All-Wheel Drive (AWD) option — a feature expected in an SUV with this kind of imposing stance.\n- Boot space could be slightly more generous for an SUV of its exterior dimensions.\n- The infotainment system, despite updates, can occasionally exhibit minor UI lags under heavy operation.";

        m.exteriorDesign = "The Harrier's design is all about commanding presence. The bold front fascia features a wide parametric grille flanked by split LED headlamps, with a continuous LED DRL light bar running across the width. The muscular wheel arches house imposing 18-inch aerodynamic alloy wheels. At the rear, connected LED tail lamps and a sculpted tailgate with bold 'HARRIER' lettering complete the aggressive yet sophisticated look. Available in striking colors like Sunlit Yellow and the menacing full-black Dark Edition, the Harrier turns heads effortlessly.";

        m.comfortConvenience = "The Harrier's interior is a massive leap forward in luxury. The dashboard is dominated by a brilliant 12.3-inch Harman touchscreen and a 10.25-inch digital driver's display. The 4-spoke illuminated steering wheel is a piece of art. Comfort is paramount with a 6-way powered driver's seat with memory, ventilated front row seats, and dual-zone automatic climate control. The voice-assisted panoramic sunroof brightens the vast cabin. A 10-speaker JBL sound system, 360-degree camera, electronic parking brake with auto-hold, wireless charger, and a gesture-controlled powered tailgate ensure the Harrier is as convenient as it is capable.";

        m.engineSummaries = [
            {
                title: "1.5L Hyperion Turbo Petrol",
                summary: "New 1498cc, 4-cylinder direct-injection turbo petrol. Quiet and refined.",
                transmission: "6-Speed Manual / 6-Speed Automatic",
                power: "170 PS (168 BHP) @ 5,000 rpm",
                torque: "280 Nm @ 1,750–3,500 rpm",
                speed: "~180 km/h (top speed)"
            },
            {
                title: "2.0L Kryotec Turbo Diesel",
                summary: "1956cc, 4-cylinder turbocharged diesel engine. Unmatched highway capability.",
                transmission: "6-Speed Manual / 6-Speed Automatic",
                power: "170 PS (168 BHP) @ 3,750 rpm",
                torque: "350 Nm @ 1,750–2,500 rpm",
                speed: "~190 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.5L Petrol MT", companyClaimed: "TBA km/l (ARAI)", cityRealWorld: "10-12 km/l", highwayRealWorld: "13-15 km/l" },
            { engineName: "1.5L Petrol AT", companyClaimed: "TBA km/l (ARAI)", cityRealWorld: "9-11 km/l", highwayRealWorld: "12-14 km/l" },
            { engineName: "2.0L Diesel MT", companyClaimed: "16.80 km/l (ARAI)", cityRealWorld: "11–13 km/l", highwayRealWorld: "15–17 km/l" },
            { engineName: "2.0L Diesel AT", companyClaimed: "14.60 km/l (ARAI)", cityRealWorld: "10–12 km/l", highwayRealWorld: "14–16 km/l" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Harrier in 2026?", answer: "The Tata Harrier is priced between ₹15.49 lakh and ₹26.44 lakh (ex-showroom). It is available in Smart, Pure, Adventure, and Fearless personas, including special Dark Editions." },
            { question: "Is a petrol engine available for the Tata Harrier?", answer: "Yes! The Tata Harrier now features the highly anticipated 1.5-liter Hyperion Turbo GDi petrol engine producing 170 PS and 280 Nm of torque, available with both manual and automatic transmissions." },
            { question: "Does the Tata Harrier have ADAS?", answer: "Yes, the higher trims of the Harrier (from Adventure+ A) are equipped with a comprehensive Level 2 ADAS suite offering features like Adaptive Cruise Control, Autonomous Emergency Braking, and Blind Spot Detection." },
            { question: "What is the safety rating of the Tata Harrier?", answer: "The Harrier is one of India's safest SUVs, boasting a 5-star rating in the Bharat NCAP (BNCAP) crash tests for both adult and child occupant protection. It comes with 6 airbags standard (up to 7 on top trims)." },
            { question: "Does the Harrier offer 4x4 or AWD?", answer: "No, the current ICE Tata Harrier is strictly a Front-Wheel Drive (FWD) SUV. It offers specialized rough road driving modes, but no true 4x4 or AWD system is available." },
            { question: "What are the standout features of the top-end Harrier?", answer: "The top-spec Fearless trims offer a 12.3-inch touchscreen, 10.25-inch digital instrument cluster, 10-speaker JBL audio, Level 2 ADAS, panoramic sunroof, ventilated and powered front seats, and a 360-degree camera." },
            { question: "What platform is the Tata Harrier built on?", answer: "The Harrier is built on the OMEGA-ARC (Optimal Modular Efficient Global Advanced Architecture) platform, which is fundamentally derived from Land Rover's renowned D8 platform." }
        ];

        await m.save();
        console.log("✅ Tata Harrier — Petrol + Diesel fields updated successfully.");
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

update();
