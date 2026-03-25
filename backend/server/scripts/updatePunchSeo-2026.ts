import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const carModelSchema = new mongoose.Schema({}, { collection: 'models', strict: false });
const Model = mongoose.models.Model || mongoose.model('Model', carModelSchema);

const PUNCH_2026_DATA = {
  headerSeo: `The micro-SUV that finally grew up. The 2026 Tata Punch facelift isn't just about the 'SUV look' anymore; it's about the 118 Bhp turbo engine that actually makes highway driving fun, the connected tail-lamps that look stunning at night, and a cabin that feels three segments higher. With 6 standard airbags and a 5-star safety pedigree, it's the honest choice for those who want big-SUV tech in a city-friendly footprint. Starting from ₹6.12 Lakh, it's remarkably mature for its size.`,
  
  summary: "The 2026 Tata Punch facelift is India's highest-selling micro-SUV for a reason. With a new 118 Bhp Turbo engine, 6 standard airbags, connected LED tail-lamps, and a premium 2-spoke steering wheel, it delivers a massive leap in performance and tech for March 2026.",
  
  description: "Honestly, the 2026 Tata Punch facelift is the most significant evolution of the nameplate yet. It addresses the one major criticism of the original—performance—by introducing the 1.2L Turbo Petrol engine from the Nexon, producing a punchy 118 Bhp and 170 Nm. This is now paired with a new 6-speed manual gearbox, making it a genuine highway cruiser. For those looking for economy with ease, the Punch remains the first-in-segment to offer a CNG-AMT (Automatic) combination, perfectly suited for heavy city traffic.\n\nVisually, the facelift adopts a futuristic front inspired by the Punch.ev, featuring sleeker DRLs and vertically stacked LED headlamps. At the rear, the new connected LED tail-lamps span the width of the car, giving it a much wider and more premium stance. Inside, the cabin has been completely revamped. You get a new two-spoke steering wheel with an illuminated logo, a larger 10.25-inch touchscreen with thinner bezels, and a 7-inch fully digital instrument cluster. Convenience is bolstered with a 360-degree camera, auto-dimming IRVM, and extended under-thigh support for all seats. Standardizing 6 airbags, ESC, and TPMS across more variants reinforces Tata's 5-star safety commitment. It's no longer just a budget SUV; it's a high-tech, high-performance powerhouse in a compact size.",
  
  pros: "• NEW TURBO PUNCH: The 1.2L Turbo engine (118 Bhp) provides a much-needed boost for effortless highway overtaking.\n• LUXURY CABIN: 10.25nd touchscreen, 7nd digital cockpit, and 2-spoke steering with illuminated logo feel premium.\n• SEGMENT-FIRST CNG-AMT: India's first micro-SUV to combine automatic convenience with CNG economy.\n• 6 STANDARD AIRBAGS: Safety is uncompromised with 6 airbags, ESC, and TPMS now bolstered for 2026.\n• MODERN EXTERIOR: Shaper front fascia and connected LED tail-lamps give it a sophisticated, mini-Nexon look.",
  
  cons: "• 3-CYLINDER THRUM: While powerful, the engine can be a bit vocal and vibrates slightly at high RPMs.\n• LOW-SPEED RIDE: The suspension is tuned for handling and SUV-like behavior, which can feel a bit stiff over sharp potholes.\n• REAR SPACE: Though it has amazing headroom, seating three adults in the rear is still a tight squeeze compared to wider hatchbacks.",

  engineSummaries: [
    {
      title: "1.2L Turbo Petrol",
      summary: "Performance-oriented 3-cylinder turbocharged engine from the Nexon. Optimized for the lighter Punch chassis.",
      transmission: "6-Speed Manual",
      power: "118 Bhp",
      torque: "170 Nm",
      speed: "180 kmph"
    },
    {
      title: "1.2L Revotron NA Petrol",
      summary: "Refined naturally aspirated engine for smooth city commutes and excellent fuel efficiency.",
      transmission: "5-MT / 5-AMT",
      power: "87 Bhp",
      torque: "115 Nm",
      speed: "160 kmph"
    },
    {
      title: "1.2L iCNG (Bi-Fuel)",
      summary: "Innovative twin-cylinder tech with segment-first AMT option for zero-compromise city driving.",
      transmission: "5-Speed MT / 5-Speed AMT",
      power: "72 Bhp",
      torque: "103 Nm",
      speed: "150 kmph"
    }
  ],

  mileageData: [
    {
      engineName: "1.2L NA Petrol MT",
      companyClaimed: "20.1 kmpl",
      cityRealWorld: "15 kmpl",
      highwayRealWorld: "18 kmpl"
    },
    {
      engineName: "1.2L Turbo Petrol MT",
      companyClaimed: "18.5 kmpl",
      cityRealWorld: "13 kmpl",
      highwayRealWorld: "16 kmpl"
    },
    {
      engineName: "1.2L iCNG MT/AMT",
      companyClaimed: "28.1 km/kg",
      cityRealWorld: "22 km/kg",
      highwayRealWorld: "25 km/kg"
    }
  ],

  exteriorDesign: "The 2026 Punch facelift takes inspiration from its EV sibling, featuring a sleeker LED DRL signature and vertically stacked LED headlamps. The redesigned bumper with its bold silver skid plate makes it look tougher than ever. The most significant rear update is the connected LED tail-lamp setup that spans the entire width, dramatically modernizing the car's profile. New 16-inch dual-tone alloys and four fresh shades—Cyantific Blue, Caramel, Bengal Rouge, and Coorg Clouds—complete the transformation.",
  
  comfortConvenience: "Step inside and you're greeted by a new two-spoke steering wheel with a gorgeous illuminated Tata logo. The touch-sensitive climate control panel replaces physical buttons for a cleaner, high-tech look. Tech lovers will appreciate the larger 10.25nd touchscreen and the 7nd digital instrument cluster. For comfort, Tata has added extended under-thigh support to both front and rear seats, making long road trips far less tiring. The inclusion of a 360-degree camera and auto-dimming IRVM makes urban parking and night driving effortlessly safe."
};

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB for Tata Punch update...');

    const result = await Model.findOneAndUpdate(
      { name: { $regex: /Punch/i } },
      { $set: PUNCH_2026_DATA },
      { new: true }
    );
    
    if (result) {
      console.log('✅ Updated Tata Punch Model with March 2026 "Honest" SEO and facelift specs.');
    } else {
      console.log('❌ Tata Punch Model not found!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during update:', error);
    process.exit(1);
  }
}

run();
