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
        const m = await Model.findOne({ id: 'model-brand-tata-motors-tiago-nrg' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Tiago NRG 2025 Price, Specs & Review – India's Urban Toughroader starts at ₹6.68 lakh. 181mm ground clearance, 86 PS Revotron petrol & iCNG with AMT, 10.25-inch touchscreen, roof rails, and 4-star GNCAP platform.";

        m.summary = "The Tata Tiago NRG is a rugged cross-hatch that brings SUV attitude to the hatchback segment. With its raised 181mm ground clearance, matte black cladding, silver skid plates, and roof rails, this 'Urban Toughroader' handles city roads and light trails with equal confidence. The 2025 update added a 10.25-inch touchscreen with wireless connectivity and the convenience of an iCNG AMT option — making it India's most adventurous affordable hatchback.";

        m.description = "The Tata Tiago NRG takes everything good about the Tiago and wraps it in a tougher, more adventurous package. Built on the same 4-star GNCAP-rated ALFA platform, the NRG gets a raised ride height of 181mm — 11mm more than the standard Tiago — giving it confidence over speed bumps, broken roads, and light off-road trails.\n\nThe 2025 update (launched March 2025) brought a host of improvements: a 10.25-inch floating touchscreen with wireless Android Auto/Apple CarPlay, a digital instrument cluster, a two-spoke steering wheel with illuminated Tata logo, and auto headlamps with rain-sensing wipers. The all-black NRG cabin with charcoal black upholstery feels purposeful and premium.\n\nMechanically, it shares the tried-and-tested 1.2L Revotron petrol engine (86 PS, 113 Nm) and the iCNG twin-cylinder option (73 PS, 95 Nm), both available with 5-speed manual and AMT gearboxes. The NRG is primarily offered in the top-spec XZ trim and now also includes XT and XZA AMT variants, priced from ₹6.68 lakh to ₹8.75 lakh.";

        m.pros = "- Rugged, SUV-inspired design with 181mm ground clearance, body cladding, roof rails, and silver skid plates — handles rough roads better than any hatchback.\n- Built on the 4-star GNCAP-rated Tiago platform with dual airbags, ABS, ESC, and hill hold as standard.\n- 2025 update adds a 10.25-inch Harman touchscreen with wireless Android Auto & Apple CarPlay.\n- Industry-first iCNG AMT option gives automatic convenience with CNG economy in a crossover hatchback.\n- Affordable adventure car starting at ₹6.68 lakh with genuine go-anywhere attitude.";

        m.cons = "- The 86 PS engine, while adequate for city use, feels a bit breathless on steep highway climbs — this is a city adventurer, not a highway cruiser.\n- Rear seat space is identical to the standard Tiago — suitable for four, but three abreast in the back is tight.\n- NVH levels at highway speeds can be noticeable due to the raised ride height and all-terrain tyres.\n- Boot space at 242 litres (petrol) is functional but not as spacious as micro-SUV rivals like the Punch.\n- Limited to the XZ trim primarily — no lower-spec variants for budget entry.";

        m.exteriorDesign = "The Tiago NRG screams adventure at first glance. Redesigned off-road-style bumpers with prominent silver skid plates at both ends set the tone. Thick matte black body cladding runs along the sides and wheel arches, while integrated roof rails and an infinity black roof with the NRG emblem complete the rugged identity. The 15-inch styled wheels, 181mm ground clearance, and a muscular stance make it look like a mini SUV rather than a hatchback. It's compact enough for city parking but tough enough for that weekend trail.";

        m.comfortConvenience = "The NRG cabin is all business — an all-black theme with charcoal upholstery sets the mood. The centerpiece is the 10.25-inch Harman floating touchscreen offering crisp graphics and wireless connectivity. A digital instrument cluster, height-adjustable driver's seat, automatic climate control, cooled glovebox, and push-button start with keyless entry round out the convenience package. The two-spoke steering wheel with an illuminated Tata logo and 45W USB Type-C fast-charging port add a modern touch. Rain-sensing wipers and auto headlamps make monsoon drives worry-free.";

        m.engineSummaries = [
            {
                title: "1.2L Revotron Petrol",
                summary: "1199cc, 3-cylinder, naturally aspirated. BS6 Phase 2 compliant.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "86 PS (84.8 BHP) @ 6,000 rpm",
                torque: "113 Nm @ 3,300 rpm",
                speed: "~160 km/h (top speed)"
            },
            {
                title: "1.2L Revotron iCNG",
                summary: "1199cc, 3-cylinder petrol with twin-cylinder iCNG technology.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "73 PS (71 BHP) @ 6,000 rpm",
                torque: "95 Nm @ 3,500 rpm",
                speed: "~150 km/h (top speed)"
            }
        ];

        m.mileageData = [
            { engineName: "1.2L Petrol MT", companyClaimed: "19.0 km/l (ARAI)", cityRealWorld: "13–15 km/l", highwayRealWorld: "17–19 km/l" },
            { engineName: "1.2L Petrol AMT", companyClaimed: "19.0 km/l (ARAI)", cityRealWorld: "13–15 km/l", highwayRealWorld: "17–19 km/l" },
            { engineName: "1.2L iCNG MT", companyClaimed: "26.49 km/kg (ARAI)", cityRealWorld: "20–22 km/kg", highwayRealWorld: "24–26 km/kg" },
            { engineName: "1.2L iCNG AMT", companyClaimed: "28.06 km/kg (ARAI)", cityRealWorld: "21–23 km/kg", highwayRealWorld: "25–27 km/kg" }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Tiago NRG in 2025?", answer: "The Tata Tiago NRG 2025 is priced from ₹6.68 lakh to ₹8.75 lakh (ex-showroom), depending on the variant and fuel type." },
            { question: "What is the ground clearance of the Tiago NRG?", answer: "The Tiago NRG has a ground clearance of 181mm — 11mm more than the standard Tiago — giving it better capability over rough roads and speed bumps." },
            { question: "Is the Tiago NRG available with automatic transmission?", answer: "Yes, the Tiago NRG is available with a 5-speed AMT in both petrol and iCNG variants, making it one of India's first crossover hatchbacks with a CNG automatic option." },
            { question: "How is the Tiago NRG different from the regular Tiago?", answer: "The NRG gets 181mm ground clearance (vs 170mm), matte black body cladding, silver skid plates, roof rails, black roof with NRG emblem, and 15-inch styled wheels — giving it a rugged SUV-like character." },
            { question: "What is the safety rating of the Tata Tiago NRG?", answer: "The Tiago NRG is built on the 4-star GNCAP-rated Tiago platform and comes with dual airbags, ABS with EBD, ESC, hill hold control, and rear parking camera as standard." },
            { question: "What is the real-world mileage of the Tiago NRG?", answer: "The petrol variant delivers 13–15 km/l in the city and 17–19 km/l on highways. The iCNG variant offers approximately 20–22 km/kg in the city and 24–26 km/kg on highways." }
        ];

        await m.save();
        console.log("✅ Tata Tiago NRG — ALL SEO fields updated successfully.");
    } catch (e) { console.error(e); } finally { await mongoose.disconnect(); }
}
update();
