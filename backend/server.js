import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import { seedParkingSlots } from "./src/controllers/parking.controller.js";

const startServer = async () => {
  await connectDB();
  await seedParkingSlots();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();