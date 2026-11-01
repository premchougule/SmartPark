import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    floor: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },

    slotNumber: {
      type: String,
      required: true,
      unique: true,
    },

    isOccupied: {
      type: Boolean,
      default: false,
    },

    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const parkingSlotModel = mongoose.model("ParkingSlot", parkingSlotSchema);

export default parkingSlotModel;
