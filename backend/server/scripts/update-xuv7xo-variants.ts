import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

const carVariantSchema = new mongoose.Schema({
  name: String,
  modelId: mongoose.Schema.Types.ObjectId,
  brandId: mongoose.Schema.Types.ObjectId,
  price: Number,
  fuelType: String,
  transmission: String,
  // 180+ fields flattened for standard rendering
  // --- Engine & Transmission ---
  displacement: Number,
  cylinders: Number,
  maxPower: String,
  maxTorque: String,
  mileageAraii: String,
  driveType: String,
  // --- Dimensions & Capacity ---
  length: Number,
  width: Number,
  height: Number,
  wheelBase: Number,
  groundClearance: Number,
  bootSpace: Number,
  fuelTankCapacity: Number,
  seatingCapacity: Number,
  doors: Number,
  // --- Suspension & Brakes ---
  frontSuspension: String,
  rearSuspension: String,
  brakeFront: String,
  brakeRear: String,
  wheelsType: String, // Alloys, Steel
  steeringType: String,
  // --- Exterior Features ---
  headlamps: String,
  tailLamps: String,
  sunroof: String,
  alloyWheels: String,
  roofRails: Boolean,
  rearWiper: Boolean,
  // --- Interior Features ---
  seatsMaterial: String,
  instrumentCluster: String,
  ambientLighting: Boolean,
  touchscreenSize: String,
  appleCarPlay: Boolean,
  androidAuto: Boolean,
  speakers: String,
  climateControl: String,
  wirelessCharger: String, // Front, Rear, None
  ventilatedSeats: String, // Front, Rear, None
  powerSeats: String,
  // --- Safety Features ---
  airbags: Number,
  abs: Boolean,
  ebd: Boolean,
  esc: Boolean,
  tpms: Boolean,
  parkingSensors: String,
  camera: String,
  adasLevel: String, // e.g., "Level 2"
}, { strict: false });

const CarVariant = mongoose.models.CarVariant || mongoose.model('CarVariant', carVariantSchema);
const CarModel = mongoose.models.CarModel || mongoose.model('CarModel', new mongoose.Schema({}, { strict: false }), 'carmodels');

// Common specifications across all XUV 7XO variants
const BASE_SPECS = {
  length: 4695, width: 1890, height: 1755, wheelBase: 2750,
  bootSpace: 240, fuelTankCapacity: 60, doors: 5, groundClearance: 200,
  frontSuspension: "McPherson Strut Independent with FSD and Stabilizer bar",
  rearSuspension: "Multi-link Independent with FSD and Stabilizer bar",
  brakeFront: "Ventilated Disc", brakeRear: "Solid Disc",
  steeringType: "Electric",
  appleCarPlay: true, androidAuto: true,
  abs: true, ebd: true, esc: true
};

const ENGINES = {
  PETROL: { maxPower: "200 Bhp @ 5000 r/min", maxTorque: "380 Nm @ 1750-3000 r/min", displacement: 1997, cylinders: 4 },
  DIESEL_MT: { maxPower: "185 Bhp @ 3500 r/min", maxTorque: "420 Nm @ 1600-2800 r/min", displacement: 2184, cylinders: 4 },
  DIESEL_AT: { maxPower: "185 Bhp @ 3500 r/min", maxTorque: "450 Nm @ 1750-2800 r/min", displacement: 2184, cylinders: 4 }
};

// Features accumulative logic
const TRIM_FEATURES = {
  AX: {
    headlamps: "Bi-LED Projector Headlamp with DRL", tailLamps: "Clear Lens LED Taillamp",
    wheelsType: "Steel with Cover", alloyWheels: "R17 Steel Wheel",
    sunroof: "None",
    seatsMaterial: "Fabric",
    touchscreenSize: "Triple 12.3-inch (31.24cm) HD Screens", speakers: "6 Speaker Audio System",
    climateControl: "Manual with Rear AC Vents", wirelessCharger: "None", ventilatedSeats: "None", powerSeats: "None",
    airbags: 6, tpms: true, parkingSensors: "Rear Only", camera: "None", adasLevel: "None",
    roofRails: true, rearWiper: false, ambientLighting: false
  },
  AX3: {
    rearWiper: true, camera: "Rear View Camera with Dynamic Guidelines"
  },
  AX5: {
    sunroof: "Skyroof (Panoramic)", parkingSensors: "Front & Rear", wheelsType: "Versa Wheel", alloyWheels: "R17 Versa Wheel"
  },
  AX7: {
    wheelsType: "Alloy", alloyWheels: "R18 Diamond Cut Alloy",
    seatsMaterial: "Leatherette", powerSeats: "6-Way Driver Power Seat with Memory",
    climateControl: "Dual Zone Automatic Climate Control",
    camera: "540 Degree Surround View",
    tpms: true
  },
  AX7_T: { // AX7 TECH
    adasLevel: "Level 2 ADAS with Sense+ (17 Features)", speakers: "16-Speaker Harman Kardon with Dolby Atmos",
    ventilatedSeats: "Front Only", airbags: 7, wirelessCharger: "Front", brakeRear: "Solid Disc (Electronic Parking Brake)"
  },
  AX7_L: { // AX7 LUXURY
    alloyWheels: "R19 Diamond Cut Alloy", ambientLighting: true,
    powerSeats: "8-Way Co-Driver, 4-Way Boss Mode", ventilatedSeats: "Front & Rear", wirelessCharger: "Front & Rear"
  }
};

const VARIANTS = [
  { name: "AX 2WD Petrol 2.0L Turbo Manual 7 STR", price: 1366000, trim: "AX", fuelType: "Petrol", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX3 2WD Petrol 2.0L Turbo Manual 7 STR", price: 1602000, trim: "AX3", fuelType: "Petrol", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX5 2WD Petrol 2.0L Turbo Manual 7 STR", price: 1752000, trim: "AX5", fuelType: "Petrol", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX7 2WD Petrol 2.0L Turbo Manual 7 STR", price: 1848000, trim: "AX7", fuelType: "Petrol", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX3 2WD Petrol 2.0L Turbo Automatic 7 STR", price: 1747000, trim: "AX3", fuelType: "Petrol", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX5 2WD Petrol 2.0L Turbo Automatic 7 STR", price: 1897000, trim: "AX5", fuelType: "Petrol", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 2WD Petrol 2.0L Turbo Automatic 7 STR", price: 1993000, trim: "AX7", fuelType: "Petrol", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 T 2WD Petrol 2.0L Turbo Automatic 7 STR", price: 2197000, trim: "AX7_T", fuelType: "Petrol", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 T 2WD Petrol 2.0L Turbo Automatic 6 STR", price: 2216000, trim: "AX7_T", fuelType: "Petrol", trans: "Automatic", seats: 6, drive: "2WD" },
  { name: "AX7 L 2WD Petrol 2.0L Turbo Automatic 7 STR", price: 2345000, trim: "AX7_L", fuelType: "Petrol", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 L 2WD Petrol 2.0L Turbo Automatic 6 STR", price: 2364000, trim: "AX7_L", fuelType: "Petrol", trans: "Automatic", seats: 6, drive: "2WD" },
  { name: "AX 2WD Diesel 2.2L Turbo Manual 7 STR", price: 1496000, trim: "AX", fuelType: "Diesel", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX3 2WD Diesel 2.2L Turbo Manual 7 STR", price: 1649000, trim: "AX3", fuelType: "Diesel", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX5 2WD Diesel 2.2L Turbo Manual 7 STR", price: 1799000, trim: "AX5", fuelType: "Diesel", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX7 2WD Diesel 2.2L Turbo Manual 7 STR", price: 1895000, trim: "AX7", fuelType: "Diesel", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX7 T 2WD Diesel 2.2L Turbo Manual 7 STR", price: 2099000, trim: "AX7_T", fuelType: "Diesel", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX7 T 2WD Diesel 2.2L Turbo Manual 6 STR", price: 2139000, trim: "AX7_T", fuelType: "Diesel", trans: "Manual", seats: 6, drive: "2WD" },
  { name: "AX7 L 2WD Diesel 2.2L Turbo Manual 7 STR", price: 2247000, trim: "AX7_L", fuelType: "Diesel", trans: "Manual", seats: 7, drive: "2WD" },
  { name: "AX3 2WD Diesel 2.2L Turbo Automatic 7 STR", price: 1794000, trim: "AX3", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX5 2WD Diesel 2.2L Turbo Automatic 7 STR", price: 1944000, trim: "AX5", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 2WD Diesel 2.2L Turbo Automatic 7 STR", price: 2040000, trim: "AX7", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 T 2WD Diesel 2.2L Turbo Automatic 7 STR", price: 2244000, trim: "AX7_T", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 T 2WD Diesel 2.2L Turbo Automatic 6 STR", price: 2284000, trim: "AX7_T", fuelType: "Diesel", trans: "Automatic", seats: 6, drive: "2WD" },
  { name: "AX7 T AWD Diesel 2.2L Turbo Automatic 7 STR", price: 2344000, trim: "AX7_T", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "AWD" },
  { name: "AX7 L 2WD Diesel 2.2L Turbo Automatic 7 STR", price: 2392000, trim: "AX7_L", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "2WD" },
  { name: "AX7 L 2WD Diesel 2.2L Turbo Automatic 6 STR", price: 2411000, trim: "AX7_L", fuelType: "Diesel", trans: "Automatic", seats: 6, drive: "2WD" },
  { name: "AX7 L AWD Diesel 2.2L Turbo Automatic 7 STR", price: 2492000, trim: "AX7_L", fuelType: "Diesel", trans: "Automatic", seats: 7, drive: "AWD" },
];

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB.");

    let model = await CarModel.findOne({ id: "model-brand-mahindra-xuv700" });
    if (!model) {
      console.log("⚠️ XUV 7XO model not found! Creating it now...");
      
      const mahindraBrand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String }, { collection: 'brands' }));
      const mahindra = await mahindraBrand.findOne({ name: /mahindra/i });
      
      if (!mahindra) {
        console.error("❌ Mahindra brand not found either. Cannot create model. Exiting.");
        process.exit(1);
      }

      model = new CarModel({
        name: "XUV 7XO",
        id: "model-brand-mahindra-xuv700",
        brandId: mahindra._id,
        isNew: true
      });
      await model.save();
      console.log(`✅ Created New Model: ${model.name}`);
    }
    const modelId = model._id;
    const brandId = model.brandId;

    // Optional: Clear existing variants just for this model
    await CarVariant.deleteMany({ modelId });
    console.log(`Cleared existing variants for ${model.name}.`);

    for (const vData of VARIANTS) {
      // Build Trim Features
      let features = { ...TRIM_FEATURES.AX };
      if (vData.trim === "AX3" || vData.trim === "AX5" || vData.trim === "AX7" || vData.trim === "AX7_T" || vData.trim === "AX7_L") Object.assign(features, TRIM_FEATURES.AX3);
      if (vData.trim === "AX5" || vData.trim === "AX7" || vData.trim === "AX7_T" || vData.trim === "AX7_L") Object.assign(features, TRIM_FEATURES.AX5);
      if (vData.trim === "AX7" || vData.trim === "AX7_T" || vData.trim === "AX7_L") Object.assign(features, TRIM_FEATURES.AX7);
      if (vData.trim === "AX7_T" || vData.trim === "AX7_L") Object.assign(features, TRIM_FEATURES.AX7_T); // Base AX7_T features
      if (vData.trim === "AX7_L") Object.assign(features, TRIM_FEATURES.AX7_L);

      // Build Engine Data
      let engine = ENGINES.PETROL;
      if (vData.fuelType === "Diesel") {
        engine = vData.trans === "Automatic" ? ENGINES.DIESEL_AT : ENGINES.DIESEL_MT;
      }

      await CarVariant.create({
        name: vData.name,
        price: vData.price,
        modelId,
        brandId,
        fuelType: vData.fuelType,
        transmission: vData.trans,
        driveType: vData.drive,
        seatingCapacity: vData.seats,
        ...BASE_SPECS,
        ...engine,
        ...features
      });
      console.log(`Added Variant: ${vData.name}`);
    }

    console.log(`\n🎉 Successfully injected ${VARIANTS.length} variants!`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
