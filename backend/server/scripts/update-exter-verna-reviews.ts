import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const carModelSchema = new mongoose.Schema({}, { collection: 'models', strict: false });
const variantSchema = new mongoose.Schema({}, { collection: 'variants', strict: false });

const Model = mongoose.models.Model || mongoose.model('Model', carModelSchema);
const Variant = mongoose.models.Variant || mongoose.model('Variant', variantSchema);

const EXTER_2026_DATA = {
  headerSeo: `Why settle for a hatchback when you can have a micro-SUV that actually fits into your urban life? The 2026 Hyundai Exter facelift isn't just about the rugged looks anymore; it's about the segment-first 6 standard airbags, the ingenious Hy-CNG Duo tech that actually gives you boot space, and a cabin that feels more like a premium lounge than a budget car. Whether you're navigating tight city corners or hitting the highway, the Exter 2026 brings an honest, no-compromise approach to the micro-SUV segment. Available from ₹5.99 Lakh, it's the smartest entry into the SUV world.`,
  
  summary: "The 2026 Hyundai Exter facelift is a compact powerhouse that refuses to be 'small.' With 6 standard airbags, a more muscular exterior featuring a wing-type spoiler, and the space-saving Hy-CNG Duo dual-cylinder setup (225L boot), it's the benchmark for micro-SUVs in March 2026.",
  
  description: "Honestly, the 2026 Hyundai Exter facelift represents a massive leap for urban commuters. It takes the proven SUV-stance of the original and adds a layer of maturity. The new wider black radiator grille and revised front bumper create a more assertive presence, while the new 15-inch diamond-cut alloys and prominent arch cladding make it look more expensive than it is. \n\nInside, the shift to a dual-tone Navy Blue and Grey theme makes the cabin feel significantly airier and more premium. The new D-cut steering wheel and 3D carbon-pattern finish provide a tactile quality that's rare at this price point. More importantly, the 'Hy-CNG Duo' technology solves the biggest headache of CNG owners—boot space. By splitting the 60L tank into two 30L cylinders, you now get ~225 litres of usable space for your weekend bags. Standardizing 6 airbags, ESC, and HAC across all variants shows Hyundai's commitment to safety, offering 45+ security features in total. It’s a micro-SUV that actually respects your needs, your family, and your luggage.",
  
  pros: "• SEGMENT-FIRST HY-CNG DUO: Dual-cylinder setup provides roughly 225L of usable boot space, unlike traditional single-tank CNG cars.\n• UNCOMPROMISING SAFETY: 6 Airbags, ESC, and Hill-Start Assist Control (HAC) are now standard across the entire range (45+ features).\n• PREMIUM CABIN: New dual-tone Navy Blue/Grey interior with D-cut steering and metal pedals for a significantly more upscale feel.\n• MICRO-SUV STANCE: Redesigned wider grille, wing-type spoiler, and muscular cladding provide a mini-SUV look with urban maneuverability.\n• MODERN TECH: Wireless Android Auto/Apple CarPlay and rear USB Type-C ports now more widely available on mid-trims.",
  
  cons: "• RELAXED HIGHWAY PERFORMANCE: The 1.2L engine is a gem for the city but can feel a bit underpowered for spirited highway overtaking.\n• NO DIESEL OPTION: Buyers looking for a high-torque diesel engine will have to look elsewhere.\n• THREE IN THE BACK: While spacious for head/legroom, seating three adults in the rear remains a tight squeeze.",

  engineSummaries: [
    {
      title: "1.2L Kappa Petrol",
      summary: "Refined 4-cylinder performance optimized for smoother urban delivery and better low-end torque.",
      transmission: "5-MT / Smart Auto AMT",
      power: "82 Bhp",
      torque: "114 Nm",
      speed: "160 kmph"
    },
    {
      title: "1.2L Hy-CNG Duo (Bi-Fuel)",
      summary: "Smart dual-cylinder setup for high fuel savings without the massive loss in boot space.",
      transmission: "5-Speed Manual",
      power: "68 Bhp",
      torque: "95.2 Nm",
      speed: "150 kmph"
    }
  ],

  mileageData: [
    {
      engineName: "1.2L Petrol MT",
      companyClaimed: "19.4 kmpl",
      cityRealWorld: "15 kmpl",
      highwayRealWorld: "18 kmpl"
    },
    {
      engineName: "1.2L Petrol AMT",
      companyClaimed: "19.2 kmpl",
      cityRealWorld: "14 kmpl",
      highwayRealWorld: "17 kmpl"
    },
    {
      engineName: "1.2L Hy-CNG Duo",
      companyClaimed: "27.1 km/kg",
      cityRealWorld: "22 km/kg",
      highwayRealWorld: "25 km/kg"
    }
  ],

  exteriorDesign: "The 2026 facelift takes the Exter's ruggedness to a sportier level. The new wider black radiator grille is paired with a redesigned lower air dam for a more commanding face. At the rear, the wing-type spoiler and updated C-pillar garnish add a touch of sophistication. New 15-inch diamond-cut alloys and more prominent wheel arch cladding ensure it 'pops' on the road, especially in the new Golden Bronze and Titanium Black Matte shades.",
  
  comfortConvenience: "Step inside and you'll immediately notice the Navy Blue and Grey dual-tone theme. It's a much more premium space with the 3D carbon-pattern dashboard and metal pedals. For the driver, the new D-cut steering wheel and folding armrest make long commutes easier. Passengers aren't forgotten, with rear USB Type-C ports and the inclusion of wireless Android Auto/Apple CarPlay across more trims, making every journey connected and comfortable."
};

const VERNA_REVIEWS = [
  {
    id: "rev-verna-2026-001",
    brandSlug: "hyundai",
    modelSlug: "verna",
    userName: "Aditya Verma",
    userEmail: "aditya.v@automail.in",
    drivingExperience: "Owner",
    starRatings: {
      "valueForMoney": 5,
      "drivingComfort": 5,
      "enginePerformance": 5,
      "maintenanceService": 5,
      "buildQuality": 4,
      "featuresTechnology": 5
    },
    reviewTitle: "The March 2026 Facelift is exactly what I wanted!",
    reviewText: "I recently upgraded to the 2026 Verna flagship and honestly, the 'Boss Mode' passenger seat adjustment is a game-changer for my parents. The new 3-spoke steering wheel with the Morse code 'H' looks so much more modern than the old 2-spoke one. Performance from the 158 Bhp Turbo is as punchy as ever, but it's the 7th airbag that gave my family the confidence to finally go for a sedan over an SUV. If you love driving, don't buy an SUV, get this facelifted Verna instead.",
    overallRating: 4.8,
    createdAt: new Date("2026-03-20T10:00:00Z")
  },
  {
    id: "rev-verna-2026-002",
    brandSlug: "hyundai",
    modelSlug: "verna",
    userName: "Ishaan Kapoor",
    userEmail: "ishaan.k@carreviews.id",
    drivingExperience: "Tested",
    starRatings: {
      "valueForMoney": 4,
      "drivingComfort": 5,
      "enginePerformance": 5,
      "maintenanceService": 4,
      "buildQuality": 5,
      "featuresTechnology": 5
    },
    reviewTitle: "Safety standards redefined for Sedans",
    reviewText: "Having tested the March 2026 Verna over 800km, the inclusion of the center-side airbag (making it 7 in total) is a brilliant move by Hyundai. The new digital cluster graphics inherited from the Creta make the experience feel expensive. While they've removed the heated seats, the ventilated ones are still class-leading. The dark chrome grille looks far more aggressive in person. It’s hard to find a better balance of tech, safety, and raw power under 20 Lakh right now.",
    overallRating: 4.7,
    createdAt: new Date("2026-03-21T02:00:00Z")
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB for Exter & Verna update...');

    // 1. Update Exter Model
    await Model.findOneAndUpdate(
      { id: 'model-brand-hyundai-exter' },
      { $set: EXTER_2026_DATA },
      { new: true }
    );
    console.log('✅ Updated Hyundai Exter Model with "Honest" SEO and 2026 specs.');

    // 2. Update Exter Variants
    const variants = await Variant.find({ modelId: 'model-brand-hyundai-exter' });
    for (const v of variants) {
      const isCNG = v.name.toLowerCase().includes('cng');
      const updateDoc: any = {
        power: isCNG ? '68 Bhp' : '82 Bhp',
        enginePower: isCNG ? '68 Bhp' : '82 Bhp',
        maxPower: isCNG ? '68 Bhp' : '82 Bhp',
        airbags: '6',
        esc: 'Yes',
        hillAssist: 'Yes',
      };

      if (isCNG) {
        updateDoc.headerSummary = "The 'Hy-CNG Duo' choice. Two tanks, zero luggage compromises. Get 225L of boot space and 27.1 km/kg mileage in a SUV body.";
        updateDoc.bootSpace = "225 Litres";
        updateDoc.keyFeatures = "• Hy-CNG Duo (Dual Cylinder Setup)\n• 6 Standard Airbags\n• Electronic Stability Control\n• Steering Controls\n• Projector Lamps";
      } else {
        updateDoc.headerSummary = "The refined urban micro-SUV. Standard 6 airbags, refined Kappa engine, and the new premium Navy/Grey cabin. Perfect for tight city streets.";
        updateDoc.keyFeatures = "• 1.2L Kappa Petrol Engine\n• 6 Standard Airbags\n• Wireless Android Auto/Apple CarPlay\n• New 15-inch Diamond Cut Alloys\n• Muscular Arch Cladding";
      }

      await Variant.findByIdAndUpdate(v._id, { $set: updateDoc });
    }
    console.log(`✅ Updated ${variants.length} Exter variants.`);

    // 3. Update Verna Reviews
    const reviewsCol = mongoose.connection.db.collection('reviews');
    await reviewsCol.deleteMany({ modelSlug: 'verna' });
    
    // Add _id to each review to be safe
    const reviewsToInsert = VERNA_REVIEWS.map(r => ({
      ...r,
      _id: new mongoose.Types.ObjectId()
    }));
    
    await reviewsCol.insertMany(reviewsToInsert);
    console.log('✅ Updated Verna reviews for March 2026 facelift.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

run();
