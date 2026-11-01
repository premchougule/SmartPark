import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import { seedParkingSlots } from "./src/controllers/parking.controller.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  await connectDB();
  await seedParkingSlots();

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();