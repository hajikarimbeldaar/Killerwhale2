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
        const m = await Model.findOne({ id: 'model-brand-tata-sierra' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Sierra 2026 Price, Specs & Review – The Legend Returns from ₹11.49 lakh. 1.5L Hyperion Petrol, 4-Seater Lounge, Triple Screens, PanoraMax Sunroof, and Level 2+ ADAS.";

        m.summary = "The legend is back. Reborn in November 2025, the all-new Tata Sierra masterfully blends nostalgic design with cutting-edge technology. Available mostly with the powerful 1.5L Hyperion turbo petrol engine (160 PS) and a 1.5L Kryojet diesel, it's a technological marvel featuring a triple-screen dashboard and Level 2+ ADAS. The standout feature is the ultra-luxurious 4-seater Lounge configuration, offering first-class airline reclining seats. Starting at ₹11.49 lakh, the Sierra is India's most evocative SUV.";

        m.description = "The return of the Tata Sierra is the most significant automotive event in recent Indian history. Launched in late 2025 with deliveries starting January 2026, the new Sierra honours its legendary namesake while pioneering a new era of luxury and technology for Tata Motors.\n\nPowertrain options are extensive. The headliner is the new 1.5L TGDi Hyperion turbo petrol producing a robust 160 PS and 255 Nm, mated to a 6-speed automatic. A 1.5L Revotron NA petrol and a 1.5L Kryojet diesel are also available. (An all-electric Sierra EV, built on the acti.ev platform with 500+ km range, is slated for mid-2026).\n\nThe interior is where the Sierra truly breaks new ground. It features a stunning triple-screen layout: a digital instrument cluster, a central infotainment hub, and a dedicated passenger display. The ultimate party piece is the 4-Seater Lounge variant. This configuration replaces the rear bench with two individual, fully reclining captain seats featuring ottomans (leg extensions), a 'boss mode' to push the front seat forward, fold-out tray tables, and individual armrests — effectively bringing private jet luxury to the road.\n\nSafety is deeply ingrained, holding a 5-star Bharat NCAP rating and featuring a highly advanced Level 2+ ADAS suite with 21 intelligent functions. With its signature blacked-out curved rear windows, a massive 'PanoraMax' sunroof, and a 12-speaker JBL Dolby Atmos auditory experience, the new Sierra (₹11.49 lakh - ₹21.29 lakh) is a triumph of Indian automotive design.";

        m.pros = "- The ultra-luxurious 4-seater Lounge variant offers reclining seats and ottomans — unmatched comfort in this price segment.\n- Stunning retro-modern design that faithfully captures the spirit of the original Sierra with its curved alpine windows.\n- Advanced triple-screen digital dashboard provides a highly immersive and futuristic cabin experience.\n- Comprehensive powertrain options, spearheaded by the powerful 1.5L Hyperion turbo petrol and 6-speed AT.\n- 5-star Bharat NCAP safety rating paired with a sophisticated Level 2+ ADAS suite.\n- Premium 12-speaker JBL audio system with Dolby Atmos delivers world-class sound quality.";

        m.cons = "- The 4-seater Lounge configuration sacrifices boot space and carrying capacity in favour of rear-seat opulence.\n- The sheer amount of technology and touchscreens might be overwhelming for drivers who prefer physical, tactile controls.\n- Currently, there is no all-wheel-drive (AWD) ICE variant announced, though the upcoming EV version will offer it.\n- Rearward visibility is slightly compromised by the thick C-pillars and the unique rear window design.\n- It faces immense in-house competition from the established Tata Harrier and Safari occupying similar price brackets.";

        m.exteriorDesign = "The new Sierra's design is a brilliant exercise in neo-retro styling. It retains the iconic, boxy silhouette of the 90s original, seamlessly integrated with modern, flush surfacing. The front fascia acts as a canvas for a full-width LED light bar and a minimalist grille. The most striking element is the side profile: the B-pillar backwards features a massive, continuous glasshouse with a distinct curved upper edge, brilliantly mimicking the original's alpine windows through a clever blacked-out effect. Squared-off wheel arches housing large aero-designed alloy wheels complete its futuristic yet nostalgic stance.";

        m.comfortConvenience = "The cabin redefines Tata's luxury ceiling. The dashboard is a digital command center featuring a massive central touchscreen, a digital driver's display, and a segment-first dedicated passenger screen. The 'PanoraMax' sunroof bathes the interior in natural light. Standard seating is a comfortable 5-seater, but the 4-seater Lounge variant is the star. It offers airline-style reclining rear seats with extending leg rests (ottomans), fold-out tray tables, and an electric 'Boss Mode' to push the front co-driver seat away. Add to this dual-zone climate control, an onboard air purifier, and a 12-speaker JBL Dolby Atmos sound system, and the Sierra becomes a sanctuary on wheels.";

        m.engineSummaries = [
            {
                title: "1.5L Hyperion Turbo Petrol",
                summary: "All-new 1.5L TGDi turbo petrol engine. Benchmark refinement.",
                transmission: "6-Speed Automatic",
                power: "160 PS (158 BHP) @ 5,000 rpm",
                torque: "255 Nm @ 1,750–4,000 rpm",
                speed: "~195 km/h (top speed)"
            },
            {
                title: "1.5L Revotron NA Petrol",
                summary: "Naturally aspirated petrol engine for city-focused efficiency.",
                transmission: "6-Speed Manual / 7-Speed DCA",
                power: "106 PS (104 BHP)",
                torque: "145 Nm",
                speed: "~170 km/h (top speed)"
            },
            {
                title: "1.5L Kryojet Turbo Diesel",
                summary: "1.5L turbocharged diesel engine. High torque for long journeys.",
                transmission: "6-Speed Manual / 6-Speed Automatic",
                power: "115 PS (113 BHP)",
                torque: "260 Nm",
                speed: "~175 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.5L Hyperion AT", companyClaimed: "16.5 km/l (ARAI)", cityRealWorld: "10–12 km/l", highwayRealWorld: "14–16 km/l" },
            { engineName: "1.5L NA Petrol DCA", companyClaimed: "17.8 km/l (ARAI)", cityRealWorld: "12–14 km/l", highwayRealWorld: "16–18 km/l" },
            { engineName: "1.5L Diesel MT", companyClaimed: "21.5 km/l (ARAI)", cityRealWorld: "14–16 km/l", highwayRealWorld: "18–20 km/l" }
        ];

        m.faqs = [
            { question: "What is the launch date and price of the Tata Sierra?", answer: "The Tata Sierra was officially launched in November 2025, with deliveries starting in January 2026. Introductory prices start at ₹11.49 lakh and go up to ₹21.29 lakh (ex-showroom)." },
            { question: "What is the 4-seater Lounge variant of the Sierra?", answer: "The Lounge variant is an ultra-premium version that removes the rear bench in favour of two individual, airline-style reclining captain seats featuring leg extensions (ottomans) and fold-out tray tables." },
            { question: "Does the new Tata Sierra have a petrol or diesel engine?", answer: "It has both! The primary highlight is the powerful new 1.5L Hyperion Turbo Petrol (160 PS, 6AT). It is also offered with a 1.5L NA Petrol and a 1.5L Kryojet Diesel." },
            { question: "Is the Tata Sierra EV launching soon?", answer: "Yes, the fully electric Tata Sierra EV, built on the advanced acti.ev Gen 2 architecture with an expected range of over 500 km, is scheduled for launch in mid-2026." },
            { question: "What screens are in the Sierra's interior?", answer: "The Sierra boasts a unique triple-screen digital dashboard. This includes a digital instrument cluster for the driver, a massive central infotainment screen, and an exclusive dedicated entertainment display for the front passenger." },
            { question: "Does the Tata Sierra have ADAS?", answer: "Yes, the Sierra is equipped with a highly advanced Level 2+ ADAS (Advanced Driver Assistance System) suite encompassing 21 intelligent safety and convenience functions." },
            { question: "How does the design compare to the original 90s Sierra?", answer: "It is a brilliant neo-retro homage. While completely modern, it retains the boxy stance and brilliantly recreates the iconic curved alpine rear windows using a clever continuous glasshouse design with blacked-out upper sections." }
        ];

        await m.save();
        console.log("✅ Tata Sierra — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
