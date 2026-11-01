import parkingSlotModel from "../models/parkingSlot.model.js";
import bookingModel from "../models/booking.model.js";

const FLOOR_SLOTS = {
  1: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"],
  2: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
  3: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"],
};

export const seedParkingSlots = async () => {
  const count = await parkingSlotModel.countDocuments();
  if (count > 0) return;

  const slots = [];
  for (const [floor, slotNumbers] of Object.entries(FLOOR_SLOTS)) {
    for (const slotNumber of slotNumbers) {
      slots.push({ floor: Number(floor), slotNumber });
    }
  }

  await parkingSlotModel.insertMany(slots);
  console.log(`Seeded ${slots.length} parking slots`);
};

const getSlotsByFloor = async (req, res) => {
  try {
    const floor = Number(req.params.floor);

    if (![1, 2, 3].includes(floor)) {
      return res.status(400).json({ message: "Invalid floor. Use 1, 2, or 3." });
    }

    const slots = await parkingSlotModel.find({ floor }).sort({ slotNumber: 1 });
    const userId = req.user._id.toString();

    const activeBookings = await bookingModel
      .find({ user: req.user._id, status: "active" })
      .select("slot");

    const bookingBySlotId = new Map(
      activeBookings.map((b) => [b.slot.toString(), b._id])
    );

    const result = slots.map((slot) => ({
      _id: slot._id,
      floor: slot.floor,
      slotNumber: slot.slotNumber,
      isOccupied: slot.isOccupied,
      isMine:
        slot.isOccupied &&
        slot.currentUser &&
        slot.currentUser.toString() === userId,
      bookingId: bookingBySlotId.get(slot._id.toString()) || null,
    }));

    res.status(200).json({ slots: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch slots", error: error.message });
  }
};

const bookSlot = async (req, res) => {
  try {
    const { slotNumber, vehicleNumber } = req.body;

    if (!slotNumber || !vehicleNumber?.trim()) {
      return res.status(400).json({ message: "Slot number and vehicle number are required" });
    }

    const slot = await parkingSlotModel.findOne({ slotNumber: slotNumber.toUpperCase() });

    if (!slot) {
      return res.status(404).json({ message: "Parking slot not found" });
    }

    if (slot.isOccupied) {
      return res.status(409).json({ message: "This slot is already booked" });
    }

    const existingBooking = await bookingModel.findOne({
      user: req.user._id,
      status: "active",
    });

    if (existingBooking) {
      return res.status(409).json({ message: "You already have an active booking" });
    }

    const booking = await bookingModel.create({
      user: req.user._id,
      slot: slot._id,
      vehicleNumber: vehicleNumber.trim(),
    });

    slot.isOccupied = true;
    slot.currentUser = req.user._id;
    await slot.save();

    res.status(201).json({
      message: "Slot booked successfully",
      booking: {
        _id: booking._id,
        slotNumber: slot.slotNumber,
        floor: slot.floor,
        vehicleNumber: booking.vehicleNumber,
        entryTime: booking.entryTime,
        status: booking.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to book slot", error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingModel
      .findOne({ _id: req.params.bookingId, user: req.user._id, status: "active" })
      .populate("slot");

    if (!booking) {
      return res.status(404).json({ message: "Active booking not found" });
    }

    booking.status = "completed";
    booking.exitTime = new Date();
    await booking.save();

    await parkingSlotModel.findByIdAndUpdate(booking.slot._id, {
      isOccupied: false,
      currentUser: null,
    });

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking: {
        _id: booking._id,
        slotNumber: booking.slot.slotNumber,
        floor: booking.slot.floor,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking", error: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user._id, status: "active" })
      .populate("slot")
      .sort({ createdAt: -1 });

    const result = bookings.map((booking) => ({
      _id: booking._id,
      slotNumber: booking.slot.slotNumber,
      floor: booking.slot.floor,
      vehicleNumber: booking.vehicleNumber,
      entryTime: booking.entryTime,
      status: booking.status,
    }));

    res.status(200).json({ bookings: result });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

export default { getSlotsByFloor, bookSlot, cancelBooking, getMyBookings };
