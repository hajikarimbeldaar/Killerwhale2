import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env");
  process.exit(1);
}

// Minimal Schema for update
const carModelSchema = new mongoose.Schema({
  id: String,
  name: String,
  headerSeo: String,
  summary: String,
  description: String,
  pros: String,
  cons: String,
  exteriorDesign: String,
  comfortConvenience: String,
  engineSummaries: [{
    name: String,
    power: String,
    torque: String,
    fuelType: String,
    transmission: String,
    mileage: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  price: Number,
  lowestPrice: Number,
  fuelTypes: [String],
  transmissions: [String],
  seating: Number
}, { collection: 'models', strict: false });

const Model = mongoose.models.Model || mongoose.model('Model', carModelSchema);

const VERNA_2026_DATA = {
  headerSeo: `Why buy a mid-size SUV when you can have a Verna? That's the question Hyundai is forcing us to ask with the 2026 facelift. While the world is obsessing over ground clearance, the Verna stays low, sharp, and incredibly fast. This isn't just a commuter; it's a driver's car that actually respects the people in the back seat. \n\nLaunched in March 2026, the updated Verna introduces a more premium presence with its new dark chrome radiator grille, dual-projector LED headlamps, and 16-inch diamond-cut alloy wheels. Inside, the cabin is a tech-lover's dream, now featuring a new three-spoke flat-bottomed steering wheel adorned with the brand’s Morse code 'H' logo (four dots). The twin 10.25-inch integrated displays carry over but with significant graphical upgrades mirrored from the top-spec Creta, providing a more detailed and modern interface. \n\nComfort is redefined with an 8-way power-adjustable driver seat with memory and a segment-first 4-way power-adjustable front passenger seat. Rear occupants now enjoy 'Boss Mode' functionality, allowing them to electronically adjust the front seat for maximum legroom, alongside new rear window sunshades and a powered tailgate. Safety is the cornerstone of the 2026 Verna, which now features 7 standard airbags, including a segment-first side-center airbag for superior occupant protection. A new 360-degree camera system, blind-spot view monitor, and rain-sensing wipers further enhance visibility and driver confidence. While the potent 160 PS Turbo GDi and 115 PS MPi engines remain unchanged, the 2026 Verna focuses on delivering a more intelligent, premium, and safe driving experience. Start your journey with the new benchmark for mid-size sedans, available now from ₹10.98 Lakh.`,
  
  summary: "The 2026 Hyundai Verna facelift is a bold reminder of why sedans still rule. Starting at ₹10.98 Lakh, it brings a new three-spoke steering with Morse code 'H' logo, segment-first 7-airbag safety, and luxury 'Boss Mode' seating to a package that outperforms comparable SUVs in tech and power.",
  
  description: "Honestly, the 2026 Hyundai Verna facelift is a refined take on the 6th-generation sedan that refuses to compromise. It emphasizes high-end design and an expansive safety suite that many luxury cars would envy. The updated exterior features a more assertive 'dark chrome' radiator grille and dual LED projector headlamps housed in a clean glass unit. The side profile stays sharp with new 16-inch diamond-cut alloys, while the reprofiled rear bumper with its silver trim and diffuser adds a sportier edge.\n\nInside, the 2026 update focuses on human-centric technology. The hallmark curved dual-screen dashboard now boasts enriched digital graphics for the instrument cluster, while the new flat-bottomed steering wheel adds a sporty touch to the drive. Unique 'Segment-First' features like the 8-way power driver seat with memory and the 4-way power passenger seat with 'Boss Mode'—which allows rear passengers to electronically slide the front seat forward—elevate the Verna to luxury-grade comfort. Practicality is also boosted with a built-in dashcam and a powered tailgate for easier loading.\n\nSafety has been drastically improved with 7-airbags as standard on the top trim, adding a side-center airbag to prevent occupant-to-occupant impacts. The addition of a 360-degree camera, blind-spot view monitor, and rain-sensing wipers makes navigating Indian roads effortless. While the facelift streamlines the package by removing previous features like heated seats and the air purifier, the remaining suite—including 20+ Level 2 ADAS functions and the class-leading 160 PS Turbo GDi engine—ensures the Verna remains the undisputed leader in its segment.",
  
  pros: "• SOPHISTICATED FACELIFT DESIGN: New dark chrome grille, dual-projector LED headlamps, and 16-inch diamond-cut alloys for a premium aesthetic.\n• SEGMENT-FIRST COMFORT: High-end features like 'Boss Mode' seating, 8-way power driver seat with memory, and a powered tailgate.\n• CLASS-LEADING 7-AIRBAG SAFETY: Includes a unique side-center airbag and a high-spec 360-degree camera for absolute occupant security.\n• INTUITIVE TECHNOLOGY: Refreshed 10.25-inch dual-screen interface with Creta-inspired graphics and built-in dashcam for peace of mind.\n• UNMATCHED TURBO POWER: The 160 PS 1.5L Turbo GDi remains the most powerful and engaging powertrain in its segment.",
  
  cons: "• SPEC-CHANGE DELETIONS: The 2026 facelift has interestingly removed previous features like heated front seats and the cabin air purifier.\n• GROUND CLEARANCE CAUTION: The low-slung sedan profile requires extra care over steep, unscientifically designed speed breakers.\n• TRUNK DEPTH VS WIDTH: While the 528-litre boot is massive, its deep configuration may require reaching in for items at the far back.",
  
  exteriorDesign: "The 2026 Verna's exterior is an exercise in 'Sensuous Sportiness' redefined. The front features a more aggressive wide-profile dark chrome radiator grille flanked by dual LED projector headlamps in a cleaner glass housing. A hallmark is the 'Infinite Horizon' LED DRL strip that spans the entire width of the car. The side profile is accentuated by new 16-inch diamond-cut alloy wheels. The rear features a reprofiled bumper with a new silver trim and a sporty diffuser element, completing its futuristic and athletic aesthetic. New color options include Classy Blue and Titan Grey Matte.",
  
  comfortConvenience: "Inside, the 2026 Verna offers a 'Digital Horizon' experience centered around a dual 10.25-inch screen setup with updated Creta-spec graphics. The new three-spoke flat-bottom steering wheel features the Morse code 'H' logo (four dots). Comfort is unparalleled with an 8-way powered driver's seat featuring memory settings and a segment-unique 4-way powered front passenger seat with 'Boss Mode' for rear-seat passengers. New features include a built-in dashcam, powered tailgate, and rear window sunshades, though heated seats and the air purifier have been removed in this update.",
  
  engineSummaries: [
    {
      name: "1.5L MPi Petrol",
      power: "113 Bhp",
      torque: "143.8 Nm",
      fuelType: "Petrol",
      transmission: "6-Speed Manual / IVT",
      mileage: "18.6 - 19.6 km/l"
    },
    {
      name: "1.5L Turbo GDi Petrol",
      power: "158 Bhp",
      torque: "253 Nm",
      fuelType: "Petrol",
      transmission: "6-Speed Manual / 7-Speed DCT",
      mileage: "20.0 - 20.6 km/l"
    }
  ],
  
  faqs: [
    {
      question: "What are the key changes in the March 2026 Hyundai Verna facelift?",
      answer: "The 2026 facelift brings over 25 updates, including a curved dual 10.25-inch screen setup, 8-way power driver seat with memory, 4-way power passenger seat with 'Boss Mode', 7 airbags as standard, and a redesigned black chrome radiator grille."
    },
    {
      question: "What is the price range of the updated 2026 Hyundai Verna?",
      answer: "The 2026 Verna is priced from ₹10.98 Lakh to ₹18.25 Lakh (ex-showroom). The turbo-petrol variants start from ₹16.28 Lakh."
    },
    {
      question: "Which is the most powerful engine in the 2026 Verna range?",
      answer: "The 1.5-liter Turbo GDi petrol is the top engine, delivering a segment-leading 160 PS of power and 253 Nm of torque, available with both a 6-speed manual and a 7-speed DCT automatic."
    },
    {
      question: "Does the new Verna offer ADAS?",
      answer: "Yes, the 2026 Verna features a full Level 2 ADAS suite (Hyundai SmartSense) with 20+ functions, including Forward Collision Warning, Lane Keep Assist, and Adaptive Cruise Control."
    },
    {
      question: "How safe is the 2026 Hyundai Verna facelift?",
      answer: "The Verna has achieved a 5-star Global NCAP crash safety rating. It further enhances protection with 7 standard airbags (including a center airbag), all-four disc brakes, and a robust high-strength steel structure."
    }
  ],
  
  price: 1825000,
  lowestPrice: 1098000,
  fuelTypes: ["Petrol"],
  transmissions: ["Manual", "Automatic", "DCT", "IVT"],
  seating: 5
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB for Verna upgrade...");

    // Find Verna using regex to be safe
    const result = await Model.findOneAndUpdate(
      { name: { $regex: /Verna/i } },
      { $set: VERNA_2026_DATA },
      { new: true }
    );

    if (result) {
      console.log(`✅ Successfully updated Hyundai Verna with March 2026 data!`);
      console.log(`New Price Range: ₹${(result.lowestPrice / 100000).toFixed(2)}L - ₹${(result.price / 100000).toFixed(2)}L`);
    } else {
      console.error(`❌ Hyundai Verna model not found!`);
    }

  } catch (error) {
    console.error("❌ Error updating model:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
