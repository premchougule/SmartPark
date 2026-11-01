import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import parkingRoutes from "./routes/parking.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // or wherever your frontend runs
  credentials: true
}));
app.use(cookieParser());   

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/parking", parkingRoutes);

export default app;