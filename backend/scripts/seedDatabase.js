import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedParkingSlots } from "../src/controllers/parking.controller.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await seedParkingSlots();
    console.log("Database seeding completed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
