import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (from backend folder)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Setup Mongoose connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env");
  process.exit(1);
}

// ---------------------------------------------------------
// Simplified Schema Definitions (just enough for the update)
// ---------------------------------------------------------

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const engineSummarySchema = new mongoose.Schema({
  name: { type: String, required: true }, // E.g., "49 kWh FWD", "61 kWh AWD"
  power: { type: String }, // E.g., "144 Bhp", "174 Bhp"
  torque: { type: String }, // E.g., "189 Nm", "300 Nm"
  fuelType: { type: String }, // 'Electric'
  transmission: { type: String }, // 'Automatic'
  mileage: { type: String }, // Range
});

const mileageDataSchema = new mongoose.Schema({
  fuelType: { type: String, required: true }, // 'Electric'
  transmission: { type: String, required: true }, // 'Automatic'
  araiMileage: { type: String, required: true }, // ARAI Range
  userReportedMileage: { type: String }, // Real-world Range
});

// Main Model Schema
const carModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  headerSeo: { type: String },
  summary: { type: String },
  description: { type: String },
  pros: { type: [String] },
  cons: { type: [String] },
  exteriorDesign: { type: String },
  comfortConvenience: { type: String },
  engineSummaries: [engineSummarySchema],
  mileageData: [mileageDataSchema],
  faqs: [faqSchema],
  price: Number,
  lowestPrice: Number,
  fuelTypes: [String],
  transmissions: [String],
  seating: Number,
  isElectric: Boolean,
  batteryCapacity: String, // E.g. "49 kWh - 61 kWh"
  chargerType: String, // E.g. "CCS2, Fast Charging up to 150kW"
  estimatedChargingTime: String,
  motorPower: String, // E.g. "144 Bhp - 174 Bhp"
  maxRange: String // E.g. "543 km"
}, { strict: false });

// Export the Model
const CarModel = mongoose.models.CarModel || mongoose.model('CarModel', carModelSchema);

// ---------------------------------------------------------
// e Vitara Data Payload (March 2026 specs)
// ---------------------------------------------------------
const eVitaraData = {
  headerSeo: "Maruti Suzuki e Vitara Price, Range, Battery, Features & Images | 2026",
  summary: "The Maruti Suzuki e Vitara is the brand's first ever Electric SUV, based on a dedicated Heartect-e EV global platform. Unveiled at the 2025 Auto Expo, the compact electric SUV is available with 49kWh and 61kWh battery options, bringing dual-motor AllGrip AWD configurations and an impressive ARAI range of up to 543 km locally.",
  description: "Marking Maruti Suzuki's big entry into the electric vehicle space, the e Vitara is a globally developed pure-electric compact SUV. Sharing its DNA and the new born-electric 'Heartect-e' platform with Toyota, the e Vitara gets radical styling with chunky styling, Y-shaped LED lighting, and muscular road presence.\n\nInside, the cabin takes a massive leap forward for the brand offering a premium dual-screen setup (10.25-inch displays for infotainment and drivers cluster), a floating center console, and advanced features including Level 2 ADAS, panoramic glass-roof, ventilated seats, and an electronic parking brake. \n\nStarting at an attractive price tag under the new Battery-as-a-Service (BaaS) ownership program and available outright from Rs 15.99 Lakh, the model provides buyers with two long-range lithium-ion blade battery choices spanning up to 543 km per charge, directly rivaling EV heavyweights like the Tata Curvv EV, MG ZS EV, and Hyundai Creta EV.",
  pros: [
    "True born-electric EV architecture (Heartect-e) allows for flat floor and spacious cabin.",
    "Multiple battery configurations and one of the rare EV SUVs to offer All-Wheel Drive (AWD AllGrip-e).",
    "Generous driving range up to 543 km (ARAI tested) and quick DC charging up to 150kW speeds.",
    "Brings modern Level-2 ADAS suite and major safety tech built for global standards.",
    "Massive Maruti Suzuki service network providing unmatched post-sales peace of mind."
  ],
  cons: [
    "Top-spec AWD variants carry a steep premium price tag above 24 Lakhs.",
    "Boot space of 238 litres is quite compact compared to conventional ICE SUVs.",
    "No front trunk (frunk) despite being a born-electric platform vehicle."
  ],
  exteriorDesign: "The Maruti e Vitara ditches the traditional Maruti styling for a bold, futuristic look. The fascia features split headlight clusters with sweeping Y-shaped LED DRLs, dropping the conventional grille for a sealed-off, high-aero nose. Heavy black cladding encapsulates the wheel arches housing large aero-optimized alloys, contributing to a planted wide stance. The rear mimics the sharp characteristics of the front with connected LED tail-lamps cutting across a muscular tailgate with the 'e Vitara' badging taking center stage.",
  comfortConvenience: "Inside, the e Vitara feels significantly premium. The dual-pane 10.25-inch screens grab visual focus along with a completely new 2-spoke steering wheel. The center console is a floating slab incorporating a neat rotary drive-selector and electronic parking brake dial. Notable comfort markers include auto climate control, ventilated front seats, a panoramic sunroof, a fully automated power tailgate, premium Infinity audio, and dedicated AC vents + charging docks for rear passengers.",

  // Powertrain details focusing on EV terms (Bhp standardized)
  engineSummaries: [
    {
      name: "49 kWh FWD Electric",
      power: "144 Bhp",
      torque: "189 Nm",
      fuelType: "Electric",
      transmission: "Automatic",
      mileage: "440 km (ARAI)"
    },
    {
      name: "61 kWh FWD Electric",
      power: "174 Bhp",
      torque: "189 Nm",
      fuelType: "Electric",
      transmission: "Automatic",
      mileage: "543 km (ARAI)"
    },
    {
      name: "61 kWh AWD Electric (AllGrip-e)",
      power: "184 Bhp",
      torque: "300 Nm",
      fuelType: "Electric",
      transmission: "Automatic",
      mileage: "480 km (ARAI)"
    }
  ],

  mileageData: [
    {
      fuelType: "Electric",
      transmission: "Automatic",
      araiMileage: "400 - 543 km/charge",
      userReportedMileage: "300 - 450 km/charge"
    }
  ],

  faqs: [
    {
      question: "What is the battery capacity and range of the Maruti e Vitara?",
      answer: "The Maruti Suzuki e Vitara offers two Lithium-ion pack options: a 49 kWh battery yielding an ARAI-claimed range of 440 km, and a larger 61 kWh battery that pushes the maximum ARAI range up to 543 km per charge."
    },
    {
      question: "Is the e Vitara available in All-Wheel Drive (AWD)?",
      answer: "Yes, the top-spec 61 kWh variant of the e Vitara comes with Suzuki's 'AllGrip-e' dual-motor All-Wheel Drive system, making it one of the most capable electric compact SUVs in its segment."
    },
    {
      question: "How long does it take to charge the Maruti e Vitara?",
      answer: "Using a 100 kW public DC fast charger, the e Vitara can jump from 10% to 80% charge in just 45 minutes. A standard 7.4 kW home wallbox AC charger will take about 7.5 to 9 hours for a full charge depending on the battery capacity."
    },
    {
      question: "What is the price of the Maruti e Vitara EV?",
      answer: "The outright ex-showroom price for the e Vitara ranges from ₹15.99 Lakh for the base 49kWh model up to ₹24.95 Lakh for the fully-loaded 61kWh AWD Alpha variant. Maruti also offers a BaaS (Battery-as-a-Service) program starting at a lower entry cost of ₹10.99 Lakh plus battery rental."
    },
    {
      question: "What are the key safety features on the e Vitara?",
      answer: "Built for global markets, the e Vitara sports a 4-Star Euro NCAP safety rating. It provides 7 standard airbags, all-four disc brakes, a 360-degree camera system, and Advanced Driver Assistance Systems (Level 2 ADAS) such as adaptive cruise control and auto emergency braking on higher variants."
    },
    {
      question: "Does the e Vitara get a frunk (front boot)?",
      answer: "No, despite riding on a dedicated born-electric platform, the Maruti Suzuki e Vitara utilizes the front space entirely for the motor controller unit and electric powertrain ancillaries, hence omitting a front trunk."
    },
    {
      question: "What are the main rivals to the Maruti e Vitara?",
      answer: "The e Vitara sits in the highly competitive compact EV SUV segment, directly locking horns with the Tata Curvv EV, MG ZS EV, Mahindra XUV400, and the upcoming Hyundai Creta EV."
    },
    {
      question: "What is the motor power output of the e Vitara?",
      answer: "Power figures depend on the variant. The 49 kWh FWD model pushes out 144 Bhp. The 61 kWh FWD model bumps power to 174 Bhp, while the flagship AWD model utilizes dual motors to generate a combined punch of 184 Bhp and 300 Nm of torque."
    }
  ],

  // Root EV metrics
  isElectric: true,
  batteryCapacity: "49 kWh - 61 kWh",
  chargerType: "CCS2 (up to 150 kW DC Fast Charging)",
  estimatedChargingTime: "45 Mins (10-80% DC)",
  motorPower: "144 Bhp - 184 Bhp",
  maxRange: "543", // Setting directly for any schema logic 
  price: 1599000,
  lowestPrice: 1599000,
  fuelTypes: ["Electric"],
  transmissions: ["Automatic"],
  seating: 5
};

// ---------------------------------------------------------
// Execute Script
// ---------------------------------------------------------
const run = async () => {
  try {
    console.log(`Connecting to MongoDB at: ${MONGODB_URI.split('@')[1] || MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.\n");

    // Delete the duplicate we just created (has no string id)
    const duplicate = await CarModel.findOne({ name: "e Vitara", id: { $exists: false } });
    if (duplicate) {
      console.log(`⚠️ Deleting recently created duplicate model (ID: ${duplicate._id})`);
      await CarModel.deleteOne({ _id: duplicate._id });
    }

    const modelIdStr = 'model-brand-maruti-suzuki-e-vitara';
    let model = await CarModel.findOne({ id: modelIdStr });

    if (!model) {
      console.log(`⚠️ Model with id "${modelIdStr}" not found! Creating it now...`);
      
      const marutiBrand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String }, { collection: 'brands' }));
      const maruti = await marutiBrand.findOne({ name: /maruti/i });
      
      if (!maruti) {
        console.error("❌ Maruti brand not found either. Cannot create model. Exiting.");
        process.exit(1);
      }

      model = new CarModel({
        name: "e Vitara",
        id: modelIdStr,
        brandId: maruti._id,
        isNew: true
      });
      console.log(`✅ Created New Model: ${model.name} (ID: ${modelIdStr})`);
    } else {
      console.log(`✅ Found Model: ${model.name} (ID: ${model._id})`);
      model.name = "e Vitara"; // Normalize name
    }
    
    // Perform update
    console.log("Starting data hydration...");
    Object.assign(model, eVitaraData);
    
    await model.save();
    
    console.log("\n🎉 Successfully updated Maruti Suzuki e Vitara data!");
    console.log(`Updated ${model.faqs?.length || 0} FAQs and ${model.engineSummaries?.length || 0} Engine Summaries.`);

  } catch (error) {
    console.error("❌ Script failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
