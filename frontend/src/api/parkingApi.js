import api from "./apiClient";

export const FLOOR_MAP = {
  floor1: 1,
  floor2: 2,
  floor3: 3,
};

export const SLOTS_PER_FLOOR = 8;

export const getSlotsByFloor = async (floor) => {
  const response = await api.get(`/api/parking/slots/${floor}`);
  return response.data;
};

export const getAllSlots = async () => {
  const floors = [1, 2, 3];
  const results = await Promise.all(floors.map((floor) => getSlotsByFloor(floor)));
  return results.flatMap((data) => data.slots || []);
};

export const getParkingStats = async () => {
  const allSlots = await getAllSlots();
  const occupied = allSlots.filter((slot) => slot.isOccupied).length;
  const byFloor = { 1: 0, 2: 0, 3: 0 };

  allSlots.forEach((slot) => {
    if (slot.isOccupied) {
      byFloor[slot.floor] += 1;
    }
  });

  return {
    total: allSlots.length,
    occupied,
    available: allSlots.length - occupied,
    byFloor,
  };
};

export const bookSlot = async ({ slotNumber, vehicleNumber }) => {
  const response = await api.post("/api/parking/book", { slotNumber, vehicleNumber });
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.delete(`/api/parking/book/${bookingId}`);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/api/parking/my-bookings");
  return response.data;
};
