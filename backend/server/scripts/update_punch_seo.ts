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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-punch' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Punch 2026 Price, Specs & Review – India's favourite micro SUV from ₹5.59 lakh. New turbo petrol (120 PS), iCNG AMT, 10.25-inch touchscreen, 360° camera, voice-assisted sunroof, 6 airbags standard, and 5-star Bharat NCAP safety.";

        m.summary = "The Tata Punch is India's best-selling micro SUV, and the January 2026 facelift makes it even more irresistible. A brand-new 1.2L turbo petrol engine (120 PS), 6 airbags standard across ALL variants, a 10.25-inch touchscreen, 360° camera, and a voice-assisted sunroof — all wrapped in a 5-star Bharat NCAP-rated body. Whether you pick the NA petrol, the turbo, or the wallet-friendly iCNG AMT, the Punch delivers SUV attitude at hatchback prices.";

        m.description = "The Tata Punch redefined the micro SUV segment when it launched, and the January 2026 facelift takes things to an entirely new level. It's the highest-selling micro SUV in India for a reason — it combines genuine SUV design with exceptional safety and features at a price that starts at just ₹5.59 lakh.\n\nThe biggest news is the addition of a 1.2L turbo petrol engine producing 120 PS and 170 Nm — shared with larger Tata SUVs — paired with a 6-speed manual gearbox. This joins the existing 1.2L NA petrol (87 bhp/113 Nm) with 5-speed MT/AMT and the iCNG variant (73 PS/103 Nm) with twin-cylinder tech and AMT option.\n\nExterior upgrades include new LED headlamps with DRLs, a redesigned grille, bolder bumpers, connected LED taillights, and new 16-inch alloy wheels. The cabin has been thoroughly modernised with a 10.25-inch touchscreen (wireless Android Auto/Apple CarPlay), a 7-inch digital driver's display, 360° camera, voice-assisted electric sunroof, wireless charger, and iRA 2.0 connected car tech.\n\nSafety is uncompromising — 6 airbags are now standard across every variant, earning the facelift a 5-star Bharat NCAP rating. ESC, TPMS, hill hold, and ISOFIX are all standard. The Punch measures 3,827 mm long with 187 mm of ground clearance and 366 litres of boot space, making it a practical daily driver and weekend adventure companion.";

        m.pros = "- 5-star Bharat NCAP safety rating with 6 airbags STANDARD across every variant — class-leading.\n- New 1.2L turbo petrol engine (120 PS, 170 Nm) with 6-speed MT — brings serious performance to the micro SUV class.\n- Feature-rich cabin with 10.25-inch touchscreen, 360° camera, voice-assisted sunroof, and wireless charger.\n- iCNG AMT option with twin-cylinder tech — automatic CNG convenience without sacrificing boot space.\n- SUV-like 187 mm ground clearance and bold crossover styling at a hatchback price point.\n- 366-litre boot space — best-in-class for the micro SUV segment.";

        m.cons = "- No diesel engine option — buyers wanting diesel economy will need to look elsewhere.\n- The 5-speed AMT, while convenient for city driving, shows a slight lag during aggressive overtaking.\n- The turbo variant is only available with a 6-speed manual — no automatic turbo option yet.\n- Rear seat space is adequate for two adults comfortably but snug for three abreast on longer trips.\n- Highway NVH at speeds above 100 km/h could be better refined for the cabin's premium aspirations.";

        m.exteriorDesign = "The 2026 Punch facelift is a striking evolution. Up front, new LED headlamps with integrated DRLs flank a redesigned grille, while a bolder bumper with silver skid plate accents enhances the SUV stance. Connected LED taillights at the rear give it a more mature, cohesive look. New 16-inch dual-tone alloy wheels and 187 mm of ground clearance reinforce its go-anywhere attitude. With a compact 3,827 mm length and a wide stance, the Punch looks purposeful and ready for anything — from city traffic to weekend trails.";

        m.comfortConvenience = "Inside, the 2026 Punch feels a generation ahead. The 10.25-inch touchscreen with wireless Android Auto and Apple CarPlay is the centrepiece, complemented by a 7-inch fully digital driver's display. The voice-assisted electric sunroof opens up the cabin beautifully. A 360° camera makes tight parking effortless, while the wireless phone charger, automatic climate control, and iRA 2.0 connected car tech ensure daily convenience. The two-spoke steering wheel with illuminated Tata logo, cooled glovebox, and AMT variants with paddle shifters make driving relaxed and fun. The 366L boot swallows weekend luggage with ease.";

        m.engineSummaries = [
            {
                title: "1.2L Revotron NA Petrol",
                summary: "1199cc, 3-cylinder, naturally aspirated. BS6 Phase 2 compliant.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "87 BHP (88 PS) @ 6,000 rpm",
                torque: "113 Nm @ 3,300 rpm",
                speed: "~160 km/h (top speed)"
            },
            {
                title: "1.2L Turbo Petrol",
                summary: "1199cc, 3-cylinder, turbocharged. New addition with the 2026 facelift.",
                transmission: "6-Speed Manual",
                power: "118 BHP (120 PS) @ 5,500 rpm",
                torque: "170 Nm @ 1,750–4,000 rpm",
                speed: "~180 km/h (top speed)"
            },
            {
                title: "1.2L Revotron iCNG",
                summary: "1199cc, 3-cylinder with twin-cylinder iCNG tech. Direct CNG start enabled.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "73 PS (72 BHP) @ 6,000 rpm",
                torque: "103 Nm @ 3,250 rpm",
                speed: "~150 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.2L NA Petrol MT", companyClaimed: "18.97 km/l (ARAI)", cityRealWorld: "14–16 km/l", highwayRealWorld: "17–19 km/l" },
            { engineName: "1.2L NA Petrol AMT", companyClaimed: "18.97 km/l (ARAI)", cityRealWorld: "14–16 km/l", highwayRealWorld: "17–19 km/l" },
            { engineName: "1.2L Turbo Petrol MT", companyClaimed: "17.5 km/l (ARAI)", cityRealWorld: "12–14 km/l", highwayRealWorld: "15–17 km/l" },
            { engineName: "1.2L iCNG MT", companyClaimed: "26.99 km/kg (ARAI)", cityRealWorld: "20–22 km/kg", highwayRealWorld: "24–26 km/kg" },
            { engineName: "1.2L iCNG AMT", companyClaimed: "28.06 km/kg (ARAI)", cityRealWorld: "21–23 km/kg", highwayRealWorld: "25–27 km/kg" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Punch facelift 2026?", answer: "The 2026 Tata Punch facelift is priced from ₹5.59 lakh to ₹10.55 lakh (ex-showroom), offering a wide range across NA petrol, turbo petrol, and iCNG powertrains." },
            { question: "Does the new Tata Punch have a turbo engine?", answer: "Yes! The 2026 Punch facelift introduces a 1.2L turbo petrol engine producing 120 PS and 170 Nm, paired with a 6-speed manual gearbox — making it the most powerful micro SUV in India." },
            { question: "What is the safety rating of the Tata Punch?", answer: "The Punch facelift has a 5-star Bharat NCAP safety rating with 6 airbags standard across ALL variants. Additional safety features include ESC, TPMS, hill hold, ISOFIX, and a 360° camera." },
            { question: "Is the Tata Punch available with automatic and CNG?", answer: "Yes, the Punch iCNG AMT combines automatic convenience with CNG economy. It uses twin-cylinder technology to preserve boot space and offers excellent fuel efficiency of ~28 km/kg." },
            { question: "What are the key features of the 2026 Punch facelift?", answer: "The facelift adds a 10.25-inch touchscreen, 7-inch digital cockpit, 360° camera, voice-assisted sunroof, wireless charger, iRA 2.0 connected car tech, new LED headlamps, connected taillights, and 16-inch alloys." },
            { question: "What is the boot space of the Tata Punch?", answer: "The Punch offers 366 litres of boot space — best-in-class for the micro SUV segment. The iCNG variants retain usable boot space thanks to the twin-cylinder technology." },
            { question: "What is the ground clearance of the Tata Punch?", answer: "The Punch has a ground clearance of 187 mm, which is higher than most hatchbacks and gives it genuine SUV-like capability over rough roads and speed bumps." }
        ];

        await m.save();
        console.log("✅ Tata Punch — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
