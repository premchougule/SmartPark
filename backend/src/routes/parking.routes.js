import express from "express";
import parkingController from "../controllers/parking.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/slots/:floor", parkingController.getSlotsByFloor);
router.get("/my-bookings", parkingController.getMyBookings);
router.post("/book", parkingController.bookSlot);
router.delete("/book/:bookingId", parkingController.cancelBooking);

export default router;
