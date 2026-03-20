/**
 * Update Mahindra XUV 7XO Model Data — March 2026
 * 
 * Updates all model-level backend data fields (SEO, description, pros, cons,
 * engine summaries, mileage data, FAQs, exterior/comfort text, etc.)
 * 
 * The XUV 7XO is the facelifted successor to the XUV700, launched January 2026.
 * This script updates the existing model document with current data.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Model } from '../db/schemas';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const backendEnv = path.resolve(__dirname, '../../.env');
dotenv.config({ path: backendEnv });

async function updateXUV7XO() {
    console.log('Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/gadizone";
    await mongoose.connect(mongoUri);

    try {
        // Try multiple possible model IDs
        let model = await Model.findOne({ id: 'model-brand-mahindra-xuv700' });
        if (!model) { model = await Model.findOne({ name: { $regex: /XUV.?7/i } }); }
        if (!model) { model = await Model.findOne({ name: { $regex: /XUV700/i } }); }

        if (!model) {
            console.error('❌ Mahindra XUV700 / XUV 7XO model not found in database!');
            return;
        }

        console.log(`✅ Found model: ${model.name} (ID: ${model.id})`);
        console.log('Updating model data to XUV 7XO...\n');

        // ==========================================
        // BASIC INFO
        // ==========================================
        model.name = 'XUV 7XO';
        model.isPopular = true;
        model.isNew = true;
        model.popularRank = 5;
        model.bodyType = 'SUV';
        (model as any).subBodyType = 'Mid-size SUV';
        model.launchDate = 'Launched';
        model.fuelTypes = ['Petrol', 'Diesel'];
        model.transmissions = ['Manual', 'Automatic'];
        model.seating = 7;
        model.status = 'active';

        // ==========================================
        // SEO & SUMMARY
        // ==========================================
        model.headerSeo = `Mahindra XUV 7XO price starts at ₹13.66 Lakh (ex-showroom). The XUV 7XO (successor to XUV700) is a feature-loaded mid-size SUV with triple 12.3-inch screens, Level 2 ADAS, 540° camera, Harman Kardon audio, and a choice of 2.0L turbo petrol and 2.2L diesel engines with AWD option.`;

        model.summary = `The Mahindra XUV 7XO is a premium mid-size SUV that replaces the XUV700 with a massive feature upgrade. It is the first car in its segment to offer a triple 12.3-inch screen layout, 16-speaker Harman Kardon audio, and 540-degree surround camera as standard from AX7 trim. Available in 6 trims (AX, AX3, AX5, AX7, AX7T, AX7L) with 27 variants, it offers both 6-seater captain seat and 7-seater bench configurations. Powered by proven 2.0L turbo petrol (200 BHP) and 2.2L diesel (185 BHP) engines with manual, automatic, and AWD options.`;

        // ==========================================
        // DESCRIPTION (300-500 words, SEO-optimized)
        // ==========================================
        model.description = `The Mahindra XUV 7XO, launched in January 2026, is the facelifted successor to the highly popular XUV700. It represents a significant upgrade in terms of technology, features, and cabin experience while retaining the robust mechanicals that made the XUV700 a bestseller in the Indian mid-size SUV segment.

The XUV 7XO's standout feature is its industry-first triple 12.3-inch screen layout — a driver's digital instrument cluster, a central infotainment touchscreen, and a co-passenger entertainment display. This three-screen setup is available across all variants from the base AX trim itself, making it the most feature-rich offering in its price bracket.

Under the hood, the XUV 7XO carries forward two proven powertrains. The 2.0-litre mStallion TGDi turbo petrol engine delivers approximately 200 BHP of power and 380 Nm of torque, paired with either a 6-speed manual or 6-speed torque-converter automatic gearbox. The 2.2-litre mHawk diesel engine produces 185 BHP and up to 450 Nm of torque (in AT/AWD variants), also available with manual and automatic transmissions. Select top-spec diesel variants get Mahindra's intelligent All-Wheel Drive (AWD) system for enhanced off-road capability.

Safety is a key pillar of the XUV 7XO, which comes equipped with 6 airbags as standard across all trims, going up to 7 airbags in AX7T and AX7L variants. Level 2 ADAS (Advanced Driver Assistance Systems) with features like adaptive cruise control, lane-keep assist, and autonomous emergency braking is available on AX7T and AX7L trims. The 540-degree surround-view camera system provides exceptional visibility for parking and maneuvering.

The cabin experience has been elevated with features like a panoramic sunroof (from AX5), ventilated front and rear seats (AX7T/AX7L), a 16-speaker Harman Kardon premium audio system (AX7T onwards), dual-zone automatic climate control, wireless Apple CarPlay and Android Auto, wireless charging, and ambient lighting. The top-spec AX7L variant adds luxurious touches such as a powered co-driver seat with boss mode control, rear sunshades, and 19-inch diamond-cut alloy wheels.

Priced between ₹13.66 Lakh and ₹24.92 Lakh (ex-showroom), the Mahindra XUV 7XO (formerly XUV700) competes directly with the Tata Safari, Tata Harrier, MG Hector, and Hyundai Alcazar. With its unmatched feature list, potent engines, and Mahindra's improving build quality, the XUV 7XO sets a new benchmark for value in the mid-size SUV segment.`;

        // ==========================================
        // PROS & CONS
        // ==========================================
        model.pros = `Triple 12.3-inch screen layout — first in segment, available even on the base AX trim.
Powerful engine options — 200 BHP turbo petrol and 185 BHP diesel with AWD option.
Feature-loaded across trims — 540° camera, ADAS Level 2, Harman Kardon 16-speaker audio.
6 airbags standard on all variants, 7 airbags on AX7T/AX7L with comprehensive ADAS suite.
Ventilated front and rear seats, panoramic sunroof, and boss-mode co-driver seat (AX7L).
Competitive pricing — significantly undercuts rivals for the features offered.`;

        model.cons = `No 5-seater option — only available in 6-seater (captain seats) and 7-seater layouts.
Diesel engine can feel noisy at idle compared to some rivals.
AWD only available on top-spec diesel automatic variants, not on petrol.
Waiting period on higher trims (AX7T/AX7L diesel AT) can stretch to 3-4 months.
Third-row space is adequate for children but tight for tall adults on long journeys.`;

        // ==========================================
        // EXTERIOR DESIGN (150-250 words)
        // ==========================================
        model.exteriorDesign = `The Mahindra XUV 7XO retains the bold, muscular design language of the XUV700 while introducing subtle yet impactful updates. The front fascia features a redesigned twin-peaks grille with chrome inserts, flanked by new LED DRL signatures that flow into the Bi-LED projector headlamps. The bumper has been reworked with integrated LED fog lamps and cornering lights on higher trims.

The side profile showcases strong shoulder lines, blacked-out B and C pillars for a floating roof effect, and flush-fitting door handles on top variants. Wheel options range from 17-inch steel wheels on the base AX to striking 19-inch diamond-cut alloy wheels on the AX7L. Body-colored ORVMs with integrated turn indicators and chrome window garnish add to the premium appeal.

At the rear, connected LED tail lamps span the width of the tailgate, giving the XUV 7XO a distinctive nighttime signature. A roof-mounted spoiler and dual-tone bumper with a skid plate complete the rugged yet refined look. The XUV 7XO measures 4,695 mm in length, 1,890 mm in width, and 1,755 mm in height with a wheelbase of 2,750 mm and 200 mm of ground clearance.`;

        // ==========================================
        // COMFORT & CONVENIENCE (150-250 words)
        // ==========================================
        model.comfortConvenience = `The XUV 7XO's cabin is a technological showcase. The triple 12.3-inch screen layout — digital driver display, central infotainment, and co-passenger screen — is the centerpiece. All screens run Mahindra's AdrenoX interface with wireless Apple CarPlay and Android Auto, ensuring seamless smartphone integration.

The front row features 6-way powered driver seat adjustment with memory function, and the AX7L adds a powered co-passenger seat with boss-mode control from the rear. Ventilated seats are available for both front (AX7T onwards) and rear (AX7L) rows. The dual-zone automatic climate control ensures all passengers stay comfortable regardless of outside conditions.

Entertainment is handled by a 16-speaker Harman Kardon premium audio system on AX7T and AX7L trims. Additional comfort features include a panoramic sunroof with voice-activated control (AX5 onwards), wireless charging pad with front and rear access (AX7L), ambient lighting, an air purifier, and an electronic parking brake with auto-hold. The NFC-enabled digital key allows smartphone-based vehicle access, while the AR heads-up display projects essential driving information onto the windshield.

Second-row captain seats in the 6-seater configuration are available on AX7T and AX7L variants, offering individual armrests and enhanced legroom for a first-class experience.`;

        // ==========================================
        // ENGINE SUMMARIES (all powertrain options)
        // ==========================================
        model.engineSummaries = [
            {
                title: '2.0L mStallion Turbo Petrol Manual',
                summary: 'The 2.0-litre mStallion TGDi turbo-petrol engine is a refined and responsive powerplant delivering strong mid-range performance. Paired with a slick 6-speed manual gearbox, it is ideal for enthusiasts who prefer engaging driving dynamics. The direct-injection turbo technology ensures strong power delivery across the rev range.',
                transmission: '6-Speed Manual',
                power: '200 BHP @ 5000 rpm',
                torque: '380 Nm @ 1750-3000 rpm',
                speed: '200 km/h'
            },
            {
                title: '2.0L mStallion Turbo Petrol Automatic',
                summary: 'The same potent 2.0-litre turbo-petrol engine paired with a smooth 6-speed torque-converter automatic gearbox. This combination offers effortless city driving with seamless gear changes while retaining the spirited performance for highway cruising. Comes with paddle shifters on higher trims.',
                transmission: '6-Speed Automatic (TC)',
                power: '200 BHP @ 5000 rpm',
                torque: '380 Nm @ 1750-3000 rpm',
                speed: '200 km/h'
            },
            {
                title: '2.2L mHawk Diesel Manual',
                summary: 'The 2.2-litre mHawk CRDe diesel engine is a torquey and fuel-efficient workhorse. With 185 BHP and 420 Nm of torque in manual guise, it delivers strong low-end grunt perfect for highway overtakes and loaded driving. The 6-speed manual gearbox has well-spaced ratios for both city and highway use.',
                transmission: '6-Speed Manual',
                power: '185 BHP @ 3500 rpm',
                torque: '420 Nm @ 1600-2800 rpm',
                speed: '200 km/h'
            },
            {
                title: '2.2L mHawk Diesel Automatic',
                summary: 'The diesel automatic pairs the 2.2-litre mHawk engine with a refined 6-speed torque-converter automatic. In this tune, it produces an enhanced 450 Nm of torque for effortless acceleration. This is the most popular powertrain choice in the XUV 7XO lineup, offering the best balance of performance, refinement, and fuel efficiency.',
                transmission: '6-Speed Automatic (TC)',
                power: '185 BHP @ 3500 rpm',
                torque: '450 Nm @ 1600-2800 rpm',
                speed: '200 km/h'
            },
            {
                title: '2.2L mHawk Diesel AWD Automatic',
                summary: 'The range-topping diesel AWD variant pairs the 2.2-litre mHawk engine with Mahindra\'s intelligent All-Wheel Drive system and 6-speed automatic transmission. The AWD system automatically distributes torque between the front and rear axles for superior traction on wet, muddy, or loose surfaces. Available only on AX7T and AX7L trims.',
                transmission: '6-Speed Automatic AWD',
                power: '185 BHP @ 3500 rpm',
                torque: '450 Nm @ 1600-2800 rpm',
                speed: '190 km/h'
            }
        ] as any;

        // ==========================================
        // MILEAGE DATA (ARAI + real-world estimates)
        // ==========================================
        model.mileageData = [
            {
                engineName: '2.0L mStallion Turbo Petrol Manual',
                companyClaimed: '14.0 kmpl',
                cityRealWorld: '9-11 kmpl',
                highwayRealWorld: '13-15 kmpl'
            },
            {
                engineName: '2.0L mStallion Turbo Petrol Automatic',
                companyClaimed: '13.0 kmpl',
                cityRealWorld: '8-10 kmpl',
                highwayRealWorld: '12-14 kmpl'
            },
            {
                engineName: '2.2L mHawk Diesel Manual',
                companyClaimed: '16.0 kmpl',
                cityRealWorld: '12-14 kmpl',
                highwayRealWorld: '16-18 kmpl'
            },
            {
                engineName: '2.2L mHawk Diesel Automatic',
                companyClaimed: '14.5 kmpl',
                cityRealWorld: '11-13 kmpl',
                highwayRealWorld: '15-17 kmpl'
            },
            {
                engineName: '2.2L mHawk Diesel AWD Automatic',
                companyClaimed: '13.5 kmpl',
                cityRealWorld: '10-12 kmpl',
                highwayRealWorld: '14-16 kmpl'
            }
        ] as any;

        // ==========================================
        // FAQs (SEO-optimized, comprehensive)
        // ==========================================
        model.faqs = [
            {
                question: "What is the price of the Mahindra XUV 7XO?",
                answer: "The Mahindra XUV 7XO (formerly XUV700) is priced between ₹13.66 Lakh and ₹24.92 Lakh (ex-showroom). The base AX 7-Seater Petrol MT starts at ₹13.66 Lakh, while the top-spec AX7L Diesel AWD AT is priced at ₹24.92 Lakh."
            },
            {
                question: "What is the difference between XUV700 and XUV 7XO?",
                answer: "The XUV 7XO is the facelifted version of the XUV700 launched in January 2026. Key upgrades include triple 12.3-inch screens (driver, infotainment, co-passenger), 16-speaker Harman Kardon audio, 540-degree camera, new trim naming (AX/AX3/AX5/AX7/AX7T/AX7L), ventilated rear seats, and NFC digital key. The engines remain the same 2.0L turbo petrol and 2.2L diesel."
            },
            {
                question: "What is the mileage of the Mahindra XUV 7XO?",
                answer: "The XUV 7XO delivers an ARAI-certified mileage of 13.0-14.0 kmpl for petrol variants and 13.5-16.0 kmpl for diesel variants. Real-world city mileage is approximately 9-14 kmpl depending on the engine and driving conditions."
            },
            {
                question: "Does the Mahindra XUV 7XO have ADAS?",
                answer: "Yes, the XUV 7XO offers Level 2 ADAS on AX7T and AX7L trims. It includes features like Adaptive Cruise Control, Lane Keep Assist, Lane Departure Warning, Autonomous Emergency Braking, High Beam Assist, and Traffic Sign Recognition."
            },
            {
                question: "Is the Mahindra XUV 7XO available in 5-seater?",
                answer: "No, the XUV 7XO is not available in a 5-seater configuration. It is offered only in 7-seater (bench seat) and 6-seater (captain seats) layouts. The 6-seater option is available on AX7T and AX7L trims."
            },
            {
                question: "Does the XUV 7XO have a sunroof?",
                answer: "Yes, a panoramic sunroof is available from the AX5 trim onwards. It features voice-activated control and is one of the largest in its segment."
            },
            {
                question: "What are the rivals of the Mahindra XUV 7XO?",
                answer: "The Mahindra XUV 7XO competes primarily with the Tata Safari, Tata Harrier, MG Hector, Hyundai Alcazar, and Kia Carens. In terms of features and pricing, the XUV 7XO offers significantly more tech at a competitive price point."
            },
            {
                question: "Is the XUV 7XO worth buying?",
                answer: "The XUV 7XO offers outstanding value with its triple-screen layout, Harman Kardon audio, ADAS, and powerful engines starting at ₹13.66 Lakh. For buyers looking for a feature-rich, spacious, and well-built mid-size SUV, the XUV 7XO is one of the best options in the Indian market as of 2026."
            }
        ] as any;

        // Save the updated model
        await model.save();
        console.log('\n🎉 Successfully updated Mahindra XUV 7XO model data!');
        console.log('Fields updated: name, headerSeo, summary, description, pros, cons,');
        console.log('               exteriorDesign, comfortConvenience, engineSummaries,');
        console.log('               mileageData, FAQs, fuelTypes, transmissions, seating');

    } catch (error) {
        console.error('❌ Error updating XUV 7XO:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

updateXUV7XO();
