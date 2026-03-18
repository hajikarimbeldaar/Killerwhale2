import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function updateTiago() {
    await mongoose.connect(process.env.MONGODB_URI!);
    try {
        const m = await Model.findOne({ id: 'model-brand-tata-motors-tiago' });
        if (!m) { console.error("NOT FOUND"); return; }

        m.headerSeo = "Tata Tiago 2025 Price, Specs & Review – India's best-selling entry hatchback starts at ₹4.99 lakh. Powered by a 1.2L Revotron petrol (86 PS) or iCNG (73 PS), the Tiago offers a 10.25-inch touchscreen, 6 airbags, and a 4-star Global NCAP safety rating. Available in MT & AMT.";

        m.summary = "The Tata Tiago is India's go-to hatchback that punches way above its price. The January 2025 facelift gave it a sharper face, a big 10.25-inch floating touchscreen with wireless Android Auto and Apple CarPlay, and up to 6 airbags — a rarity in this segment. Whether you pick the peppy 86 PS petrol with a slick AMT or the wallet-friendly iCNG that returns close to 28 km/kg, the Tiago delivers unbeatable value. Built on a 4-star GNCAP-rated platform, it's the safest and smartest city car you can buy under ₹8 lakh.";

        m.description = "The Tata Tiago has been a game-changer in the entry hatchback segment since its debut, and the 2025 facelift only sharpens its edge. It rides on the robust ALFA (Agile Light Flexible Advanced) architecture that earned it a 4-star Global NCAP safety rating — making it one of the safest cars in its price bracket.\n\nUnder the hood, the 1.2-litre, 3-cylinder Revotron petrol engine produces 86 PS of power and 113 Nm of torque, paired with either a smooth 5-speed manual or a convenient 5-speed AMT. For budget-conscious buyers, the iCNG variant with twin-cylinder technology delivers 73 PS and an impressive 28.06 km/kg (ARAI), without eating into boot space thanks to the clever dual-tank layout.\n\nThe 2025 update brought a refreshed front grille, LED headlamps and DRLs, a new shark-fin antenna, and stylish Hyperstyle alloy wheels. Inside, the star is the 10.25-inch floating Harman touchscreen with wireless connectivity, complemented by a digital instrument cluster, steering-mounted controls, and automatic climate control on higher trims. Safety has been beefed up with 6 airbags, ESC, hill hold assist, TPMS, and ISOFIX child seat mounts.\n\nMeasuring 3,767 mm in length with a wheelbase of 2,450 mm and 170 mm ground clearance, the Tiago handles city streets with ease while offering a 242-litre boot for daily errands. Five variants — XE, XM, XT, XZ, and XZ+ — cover every budget from ₹4.99 lakh to ₹8.19 lakh (ex-showroom).";

        m.pros = "- 4-star Global NCAP safety rating with up to 6 airbags, ESC, hill hold, and TPMS — exceptional for an entry hatchback.\n- The 2025 facelift adds a 10.25-inch Harman touchscreen with wireless Android Auto & Apple CarPlay, plus a digital instrument cluster.\n- Industry-first iCNG AMT option with twin-cylinder tech that delivers 28.06 km/kg without compromising boot space.\n- Peppy 86 PS Revotron engine feels eager in city traffic, and the AMT makes bumper-to-bumper drives effortless.\n- Starting price of ₹4.99 lakh makes it one of the most feature-loaded hatchbacks per rupee spent.";

        m.cons = "- The 3-cylinder engine can feel a bit strained on steep highway inclines — it's tuned more for city agility than outright power.\n- NVH (Noise, Vibration, Harshness) levels are noticeable at speeds above 100 km/h, especially on coarse roads.\n- Boot space at 242 litres is adequate for daily use but tight for weekend trips with the family.\n- The AMT gearbox, while convenient, has a slight lag during aggressive kickdown manoeuvres.\n- Rear seat legroom is snug for tall passengers on longer drives — best suited for city commutes.";

        m.exteriorDesign = "The 2025 Tiago facelift transformed its street presence. Up front, a redesigned parametric grille flanked by new LED headlamps with integrated DRLs gives it a sharp, modern face. The new Hyperstyle alloy wheels (available in 14-inch and 15-inch) add a premium stance, while the shark-fin antenna and integrated rear spoiler complete the sporty silhouette. Fresh colours — Arizona Blue, Supernova Copper, and Ocean Blue — join the palette for buyers who like to stand out. At 3,767 mm long with 170 mm ground clearance, it's compact enough for tight lanes yet looks surprisingly mature.";

        m.comfortConvenience = "Step inside the 2025 Tiago and you'll immediately notice the 10.25-inch floating Harman touchscreen — it's crisp, responsive, and supports wireless Android Auto and Apple CarPlay. The digital instrument cluster keeps key driving data in your line of sight, while the two-spoke steering wheel with an illuminated Tata logo adds a premium touch. Higher trims get automatic climate control, a cooled glovebox, rain-sensing wipers, and auto headlamps. There's a 45W USB Type-C fast charger to keep your phone topped up, height-adjustable driver's seat for perfect positioning, and push-button start with keyless entry for daily convenience. The all-black cabin with grey inserts looks surprisingly upmarket for the price.";

        m.engineSummaries = [
            {
                title: "1.2L Revotron Petrol",
                summary: "1199cc, 3-cylinder, naturally aspirated petrol engine. BS6 Phase 2 compliant.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "86 PS (85 BHP) @ 6,000 rpm",
                torque: "113 Nm @ 3,300 rpm",
                speed: "~155 km/h (top speed)"
            },
            {
                title: "1.2L Revotron iCNG",
                summary: "1199cc, 3-cylinder petrol engine with Tata's twin-cylinder iCNG technology.",
                transmission: "5-Speed Manual / 5-Speed AMT",
                power: "73 PS (72 BHP) @ 6,000 rpm",
                torque: "95 Nm @ 3,500 rpm",
                speed: "~145 km/h (top speed)"
            }
        ];

        m.mileageData = [
            {
                engineName: "1.2L Revotron Petrol MT",
                companyClaimed: "20.09 km/l (ARAI)",
                cityRealWorld: "14–16 km/l",
                highwayRealWorld: "18–20 km/l"
            },
            {
                engineName: "1.2L Revotron Petrol AMT",
                companyClaimed: "20.09 km/l (ARAI)",
                cityRealWorld: "14–16 km/l",
                highwayRealWorld: "18–20 km/l"
            },
            {
                engineName: "1.2L iCNG MT",
                companyClaimed: "26.49 km/kg (ARAI)",
                cityRealWorld: "20–22 km/kg",
                highwayRealWorld: "24–26 km/kg"
            },
            {
                engineName: "1.2L iCNG AMT",
                companyClaimed: "28.06 km/kg (ARAI)",
                cityRealWorld: "21–23 km/kg",
                highwayRealWorld: "25–27 km/kg"
            }
        ];

        m.faqs = [
            { question: "What is the price of the Tata Tiago in 2025?", answer: "The Tata Tiago 2025 is priced from ₹4.99 lakh (XE Petrol MT) to ₹8.19 lakh (XZ+ iCNG AMT), ex-showroom. It's one of India's most affordable feature-packed hatchbacks." },
            { question: "Is the Tata Tiago safe? What is its safety rating?", answer: "Yes, the Tata Tiago holds a 4-star Global NCAP safety rating. It comes with up to 6 airbags, ABS with EBD, ESC, hill hold assist, TPMS, ISOFIX child seat mounts, and rear parking sensors." },
            { question: "What is the real-world mileage of the Tata Tiago?", answer: "The petrol Tiago delivers 14–16 km/l in the city and 18–20 km/l on highways. The iCNG variant is more economical at 20–22 km/kg in the city and 24–26 km/kg on highways." },
            { question: "Does the Tata Tiago come with an automatic transmission?", answer: "Yes, the Tiago is available with a 5-speed AMT (Automated Manual Transmission) in both petrol and iCNG variants, making it one of India's first CNG cars with an automatic option." },
            { question: "What are the key features of the 2025 Tata Tiago facelift?", answer: "The 2025 facelift introduced a 10.25-inch Harman floating touchscreen with wireless Android Auto/Apple CarPlay, LED headlamps with DRLs, digital instrument cluster, up to 6 airbags, automatic climate control, and new Hyperstyle alloy wheels." },
            { question: "How does the Tata Tiago iCNG twin-cylinder technology work?", answer: "Tata's iCNG twin-cylinder technology uses two smaller CNG tanks placed beneath the boot floor, instead of one large cylinder. This preserves the full 242-litre boot space while delivering excellent fuel efficiency of up to 28.06 km/kg." },
            { question: "What colours are available for the Tata Tiago 2025?", answer: "The 2025 Tiago is available in Arizona Blue, Supernova Copper, Ocean Blue, Pristine White, Daytona Grey, and Tornado Red colour options." }
        ];

        await m.save();
        console.log("✅ Tata Tiago — ALL SEO fields updated successfully.");
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}
updateTiago();
