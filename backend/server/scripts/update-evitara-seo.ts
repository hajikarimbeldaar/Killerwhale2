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
  mileageData: [{
    fuelType: String,
    transmission: String,
    araiMileage: String,
    userReportedMileage: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  price: Number,
  lowestPrice: Number,
  fuelTypes: [String],
  transmissions: [String],
  seating: Number,
  isElectric: Boolean,
  batteryCapacity: String,
  chargerType: String,
  estimatedChargingTime: String,
  motorPower: String,
  maxRange: String
}, { collection: 'models', strict: false });

const Model = mongoose.models.Model || mongoose.model('Model', carModelSchema);

const EVITARA_SEO_DATA = {
  headerSeo: `The March 2026 launch of the Maruti Suzuki e Vitara marks India's entry into the high-technology electric era. As the brand's first ever global EV, the e Vitara is built from the ground up on the bespoke 'Heartect-e' born-electric architecture co-developed with Toyota. This dedicated platform allows for a completely flat floor, a massive 2700mm wheelbase, and compact overhangs that redefine interior space in the 4.3-meter SUV segment.\n\nStarting at a groundbreaking entry price of ₹10.99 Lakh under the innovative 'Battery-as-a-Service' (BaaS) program, the e Vitara makes premium electric mobility accessible to millions. It is available with two high-density LFP (Lithium Iron Phosphate) battery options: a city-focused 49 kWh pack and a long-range 61 kWh pack, delivering a segment-leading 543 km of ARAI-certified range. Safety is a non-negotiable standard, with the SUV boasting a 5-star Bharat NCAP rating and 7 standard airbags across all variants.\n\nTechnology takes center stage in the 'High-Tech & Adventure' cabin, featuring an integrated dual 10.25-inch screen setup, wireless smartphone connectivity, and a full Level 2 ADAS suite (Advanced Driver Assistance Systems). Whether you choose the agile Front-Wheel Drive or the revolutionary 'AllGrip-e' electronic All-Wheel Drive configuration, the e Vitara provides a silent, powerful, and impeccably refined sanctuary for the modern Indian family. This is the SUV that truly electrifies India's roads without compromise.`,
  
  summary: "The Maruti Suzuki e Vitara (2026) redefined: India's first born-electric SUV on the global 'Heartect-e' platform. Offering up to 543 km range, ₹10.99 Lakh entry price (BaaS), and a 5-star Bharat NCAP safety rating, the e Vitara blends 184 Bhp of silent power with dual 10.25-inch screens and Level 2 ADAS for the ultimate premium EV experience.",
  
  description: "The Maruti Suzuki e Vitara marks a historic chapter for Maruti Suzuki, transitioning the country's largest carmaker into a global contender in the luxury EV space. Co-engineered with Toyota for international markets, the e Vitara utilizes a clean-sheet EV platform that maximizes interior volume while maintaining a compact exterior footprint. Its architecture features a structural battery pack that lowers the center of gravity and increases torsional rigidity, ensuring ride quality that feels stable and composed at any speed.\n\nThe interior is a complete departure from anything seen before in a Maruti, showcasing a futuristic 'Digital Horizon' cockpit. Twin 10.25-inch high-resolution displays handle everything from Level 2 ADAS monitoring to wireless infotainment, while the 'floating' center console with its rotary drive selector and electronic parking brake creates a sense of airiness. Premium touches like ventilated front seats, a voice-enabled panoramic glass roof, and high-quality soft-touch materials throughout the cabin emphasize its flagship status.\n\nPerformance is equally impressive across its three-variant lineup: Delta, Zeta, and Alpha. The 49 kWh base models provide 144 Bhp of instantaneous punch, while the 61 kWh long-range and flagship AllGrip-e AWD versions (184 Bhp) ensure that power is always available, even on interstate highway runs. Supported by a 150kW DC fast charging capability that offers 10-80% top-up in just 45 minutes, and backed by the unmatched peace of mind of Maruti's pan-India service network, the e Vitara is the most calculated, well-engineered choice for India's electric transition.",
  
  pros: "• BORN-ELECTRIC PRECISION: The dedicated 'Heartect-e' platform ensures a flat cabin floor and cabin space that rivals SUVs a segment above.\n• SEGMENT-LEADING 543 KM RANGE: High-density 61 kWh battery pack provides unmatched highway confidence for long-distance family travel.\n• TOP-TIER 5-STAR SAFETY: The first Maruti SUV to secure a solid 5-star Bharat NCAP rating, equipped with 7 standard airbags.\n• SMART PRICING INNOVATION: BaaS (Battery-as-a-Service) lowers the initial purchase cost to just ₹10.99 Lakh.\n• ADVANCED FUTURE-TECH: Features an integrated 20.5-inch panoramic cockpit display and a comprehensive Level 2 ADAS suite.",
  
  cons: "• MODEST BOOT VOLUME: Due to its compact 4275mm length, the 238-litre boot is quite tight for large family vacations.\n• ABSENCE OF A FRUNK: Missed opportunity to provide front storage despite the dedicated EV architecture.\n• FIRM LOW-SPEED RIDE: To manage battery weight, the suspension setup is slightly firmer over sharp city potholes.",
  
  exteriorDesign: "The Maruti e Vitara introduces the brand's 'Emotional Redefined' design philosophy, combining the ruggedness of a traditional SUV with the clean, aerodynamically-focused aesthetics of a modern EV. The front is characterized by sharp Y-shaped LED DRL signatures and a unique high-impact sealed grille area that reduces drag. Muscular, squared-off wheel arches housing large 18-inch aero-alloy wheels give the SUV a planted, commanding stance. The design culminates in a seamless 'Infinite Horizon' LED light bar at the rear, emphasizing its high-tech core and global design appeal.",
  
  comfortConvenience: "The cockpit of the e Vitara is a masterclass in ergonomics and digital integration. The driver is centered by a dual-screen 'Horizon Cockpit'—two 10.25-inch high-definition displays that provide a wealth of real-time data. A 'floating' center console is a design highlight, incorporating a rotary 'Grip-Control' drive selector and wireless charging pad. Premium features like ventilated front seats with memory adjust, a 360-degree Surround View monitor with 'Clear-Site' tech, and a voice-enabled wide panoramic sunroof ensure that every journey is a serene, luxury-grade experience for all five occupants.",
  
  engineSummaries: [
    {
      name: "49 kWh FWD Electric (Delta)",
      power: "144 Bhp (106 kW)",
      torque: "192.5 Nm",
      fuelType: "Electric",
      transmission: "Automatic",
      mileage: "440 km (ARAI)"
    },
    {
      name: "61 kWh FWD Electric (Zeta/Alpha)",
      power: "174 Bhp (128 kW)",
      torque: "193 Nm",
      fuelType: "Electric",
      transmission: "Automatic",
      mileage: "543 km (ARAI)"
    },
    {
      name: "61 kWh AWD Electric (AllGrip-e)",
      power: "184 Bhp (135 kW)",
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
      araiMileage: "440 - 543 km/charge",
      userReportedMileage: "350 - 450 km/charge"
    }
  ],
  
  faqs: [
    {
      question: "What is the entry price of the Maruti Suzuki e Vitara in March 2026?",
      answer: "The Maruti Suzuki e Vitara starts at an attractive ex-showroom price of ₹10.99 Lakh under the 'Battery-as-a-Service' (BaaS) program. For outright purchase, prices range from ₹15.99 Lakh for the Delta 49 kWh variant up to ₹20.01 Lakh for the flagship Alpha Dual Tone 61 kWh variant."
    },
    {
      question: "Which battery options and range figures does the e Vitara offer?",
      answer: "The e Vitara is available with two battery packs: 49 kWh (440 km ARAI range) and 61 kWh (543 km ARAI range). Real-world driving range is estimated at 350 km and 420 km respectively for India's driving conditions."
    },
    {
      question: "Does the Maruti e Vitara have an All-Wheel Drive (AWD) option?",
      answer: "Yes, the flagship variant features Suzuki's 'AllGrip-e' electronic dual-motor AWD system. It produces a combined 184 Bhp and 300 Nm of torque, providing instantaneous torque vectoring and superior traction on slick or loose terrain."
    },
    {
      question: "How safe is the Maruti Suzuki e Vitara?",
      answer: "Safety is a highlight for the e Vitara, which has achieved a 5-star Bharat NCAP rating. It comes standard with 7 airbags, ESC, all-four disc brakes, and higher trims feature a comprehensive Level 2 ADAS suite with autonomous emergency braking and adaptive cruise control."
    },
    {
      question: "How long does it take to charge the e Vitara?",
      answer: "Using a 150kW public DC fast charger, the e Vitara can charge from 10% to 80% in just 45 minutes. A standard 7.4kW home wallbox charger will take approximately 9 hours for a full charge of the 61kWh pack."
    }
  ],
  
  price: 1599000,
  lowestPrice: 1099000,
  fuelTypes: ["Electric"],
  transmissions: ["Automatic"],
  seating: 5,
  isElectric: true,
  batteryCapacity: "49 kWh - 61 kWh",
  chargerType: "CCS2 (up to 150 kW DC Fast Charging)",
  estimatedChargingTime: "45 Mins (10-80% DC)",
  motorPower: "144 Bhp - 184 Bhp",
  maxRange: "543"
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB for SEO upgrade...");

    const modelId = 'model-brand-maruti-suzuki-e-vitara';
    const result = await Model.findOneAndUpdate(
      { id: modelId },
      { $set: EVITARA_SEO_DATA },
      { new: true }
    );

    if (result) {
      console.log(`✅ Successfully updated E-Vitara with accurate March 2026 data!`);
      console.log(`Header SEO length: ${result.headerSeo.length} characters`);
      console.log(`Updated ${result.faqs?.length || 0} FAQs and ${result.engineSummaries?.length || 0} Engine Summaries.`);
    } else {
      console.error(`❌ Model not found: ${modelId}`);
    }

  } catch (error) {
    console.error("❌ Error updating model:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
