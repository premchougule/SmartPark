import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FLOOR_MAP, getSlotsByFloor, bookSlot, cancelBooking } from '../api/parkingApi';

const SlotReservation = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentSpot, setCurrentSpot] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [popup, setPopup] = useState({ show: false, title: '', message: '', type: 'info', confirmCallback: null, showCancel: false });

  const fetchSlots = useCallback(async (floorKey) => {
    const floorNumber = FLOOR_MAP[floorKey];
    if (!floorNumber) return;

    setLoading(true);
    try {
      const data = await getSlotsByFloor(floorNumber);
      setSlots(data.slots || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/signin');
        return;
      }
      setPopup({
        show: true,
        title: 'Error',
        message: err.response?.data?.message || 'Failed to load parking slots',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (!token) {
      navigate('/signin');
      return;
    }

    setCurrentUser(user);
  }, [navigate]);

  useEffect(() => {
    if (currentFloor) {
      fetchSlots(currentFloor);
    }
  }, [currentFloor, fetchSlots]);

  const getSlot = (spotId) => slots.find((s) => s.slotNumber === spotId);

  const isSpotBooked = (spotId) => {
    const slot = getSlot(spotId);
    return slot?.isOccupied ?? false;
  };

  const hasUserBookedSpot = (spotId) => {
    const slot = getSlot(spotId);
    return slot?.isMine ?? false;
  };

  const bookSpot = async (e) => {
    e.preventDefault();
    if (!currentFloor || !currentSpot) {
      setPopup({ show: true, title: 'Error', message: 'Please select a floor and spot first', type: 'error' });
      return;
    }

    const carNumber = e.target['car-number'].value;

    if (!carNumber.trim()) {
      setPopup({ show: true, title: 'Error', message: 'Please enter your car number', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      await bookSlot({
        slotNumber: currentSpot,
        vehicleNumber: carNumber,
      });

      await fetchSlots(currentFloor);
      setShowBookingForm(false);
      setShowConfirmation(true);
    } catch (err) {
      setPopup({
        show: true,
        title: 'Booking Failed',
        message: err.response?.data?.message || 'Could not book this slot',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelBooking = async (spotId) => {
    const slot = getSlot(spotId);
    if (!slot?.bookingId) return;

    setSubmitting(true);
    try {
      await cancelBooking(slot.bookingId);
      await fetchSlots(currentFloor);
      setCurrentSpot(null);
      setShowBookingForm(false);
      setPopup({
        show: true,
        title: 'Cancelled',
        message: `Your booking for spot ${spotId} has been cancelled.`,
        type: 'success',
      });
    } catch (err) {
      setPopup({
        show: true,
        title: 'Error',
        message: err.response?.data?.message || 'Failed to cancel booking',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSpotClick = (spotId) => {
    if (submitting) return;

    if (isSpotBooked(spotId)) {
      if (hasUserBookedSpot(spotId)) {
        setPopup({
          show: true,
          title: 'Cancel Booking',
          message: `Do you want to cancel your booking for spot ${spotId}?`,
          type: 'warning',
          showCancel: true,
          confirmCallback: () => handleCancelBooking(spotId),
        });
      }
      return;
    }
    setCurrentSpot(spotId);
    setShowBookingForm(true);
  };

  const generateSpots = () => {
    if (!currentFloor) return null;
    
    let spotIds = [];
    if (currentFloor === 'floor1') spotIds = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'];
    else if (currentFloor === 'floor2') spotIds = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
    else if (currentFloor === 'floor3') spotIds = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];

    if (loading) {
      return (
        <div className="w-full text-center text-[#9ca3af] py-8">
          Loading slots...
        </div>
      );
    }

    return spotIds.map(spot => {
      const booked = isSpotBooked(spot);
      const userBooked = hasUserBookedSpot(spot);
      let className = "spot w-16 h-16 rounded-lg flex items-center justify-center font-bold text-lg cursor-pointer transition-all hover:scale-110 ";
      
      if (userBooked) {
        className += "bg-green-600 text-white relative";
      } else if (booked) {
        className += "bg-gray-700 opacity-50 cursor-not-allowed text-gray-400";
      } else {
        className += "bg-gray-600 hover:bg-[#6366f1] text-white";
        if (currentSpot === spot) {
          className += " bg-[#f43f5e] shadow-[0_0_15px_#f43f5e] scale-110";
        }
      }

      return (
        <div key={spot} className={className} onClick={() => handleSpotClick(spot)}>
          {spot}
          {userBooked && (
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs" style={{ transform: 'translate(50%, -50%)' }}>×</span>
          )}
        </div>
      );
    });
  };

  const getFloorName = () => {
    if (currentFloor === 'floor1') return 'Galaxy Gateway';
    if (currentFloor === 'floor2') return 'Tropical Oasis';
    if (currentFloor === 'floor3') return 'Arcade Alley';
    return '';
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#111827] text-[#f9fafb]">
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1f2937] rounded-lg p-6 max-w-md w-full shadow-xl transform transition-all border border-[#374151]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#f9fafb]">{popup.title}</h3>
              <button onClick={() => setPopup({ ...popup, show: false })} className="text-gray-400 hover:text-gray-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mb-4 text-[#9ca3af]">{popup.message}</div>
            <div className="flex justify-end space-x-2">
              {popup.showCancel && (
                <button onClick={() => setPopup({ ...popup, show: false })} className="px-4 py-2 bg-[#374151] text-[#f9fafb] rounded hover:bg-[#4b5563] transition-colors">Cancel</button>
              )}
              <button 
                onClick={() => {
                  if (popup.confirmCallback) popup.confirmCallback();
                  setPopup({ ...popup, show: false });
                }} 
                className={`px-4 py-2 text-white rounded hover:opacity-90 transition-colors ${
                  popup.type === 'error' ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626]' :
                  popup.type === 'warning' ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706]' :
                  popup.type === 'success' ? 'bg-gradient-to-r from-[#10b981] to-[#059669]' :
                  'bg-gradient-to-r from-[#6366f1] to-[#f43f5e]'
                }`}
              >OK</button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0))] pointer-events-none"></div>

      <Header />

      <main className="container mx-auto px-6 py-12 flex-grow z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative inline-block mb-8 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="w-32 h-32 absolute -top-24 -right-28 mt-8 animate-[float_4s_ease-in-out_infinite] flex items-center justify-center">
              <div className="relative w-32 h-32">
                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-8xl text-[#6366f1] opacity-40">directions_car</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Let's Find Your Perfect Spot!
            </h1>
            <p className="text-[#9ca3af] mt-4 text-xl">Follow me! We'll make parking fun.</p>
            {currentUser && (
              <p className="text-[#9ca3af] mt-2 text-sm">Signed in as {currentUser.username || currentUser.email}</p>
            )}
          </div>

          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-3xl font-bold mb-8">First, Pick a Level!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { id: 'floor1', emoji: '🚀', title: 'Level 1: Galaxy Gateway', desc: 'Closest to the stars (and the exit!).' },
                { id: 'floor2', emoji: '🌴', title: 'Level 2: Tropical Oasis', desc: "Relax, you're on island time here." },
                { id: 'floor3', emoji: '🕹️', title: 'Level 3: Arcade Alley', desc: 'High scores in parking await!' }
              ].map(floor => (
                <div 
                  key={floor.id} 
                  onClick={() => { setCurrentFloor(floor.id); setCurrentSpot(null); setShowBookingForm(false); }}
                  className={`bg-[#1f2937] p-8 rounded-2xl shadow-lg cursor-pointer border-2 transition-all hover:-translate-y-2 hover:scale-105 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] ${currentFloor === floor.id ? 'border-[#f43f5e]' : 'border-transparent hover:border-[#f43f5e]'}`}
                >
                  <div className="text-6xl mb-4">{floor.emoji}</div>
                  <h3 className="text-2xl font-bold">{floor.title}</h3>
                  <p className="text-[#9ca3af] mt-2">{floor.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {currentFloor && (
            <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0" style={{ animationFillMode: 'forwards' }}>
              <h2 className="text-3xl font-bold mb-8">Now, Choose Your Awesome Spot!</h2>
              <div className="bg-[#1f2937] p-8 rounded-2xl shadow-lg mb-16">
                <div className="flex flex-wrap gap-4 justify-center">
                  {generateSpots()}
                </div>
                
                {showBookingForm && currentSpot && (
                  <div className="mt-8 bg-[#2d3748] p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Book Spot <span>{currentSpot}</span></h3>
                    <form onSubmit={bookSpot} className="space-y-4 text-left max-w-md mx-auto">
                      <div>
                        <label htmlFor="car-number" className="block text-sm font-medium text-gray-300 mb-1">Car Number</label>
                        <input type="text" id="car-number" name="car-number" required
                          className="w-full px-4 py-2 bg-[#1f2937] border border-[#4b5563] rounded-lg focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent text-white" />
                      </div>
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration (hours)</label>
                        <input type="number" id="duration" name="duration" min="1" max="24" required
                          className="w-full px-4 py-2 bg-[#1f2937] border border-[#4b5563] rounded-lg focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent text-white" />
                      </div>
                      <button type="submit" disabled={submitting}
                        className="w-full bg-gradient-to-r from-[#6366f1] to-[#f43f5e] text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f43f5e] disabled:opacity-50 disabled:cursor-not-allowed">
                        {submitting ? 'Booking...' : 'Book Now'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {showConfirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#6366f1] to-[#f43f5e] p-12 rounded-3xl shadow-2xl text-center max-w-2xl w-full mx-4 animate-[fadeInUp_0.5s_ease-out]">
                <span className="material-symbols-outlined text-8xl text-white animate-bounce">celebration</span>
                <h2 className="text-4xl font-extrabold text-white mt-4">You did it! Spot <span>{currentSpot}</span> is Yours!</h2>
                <p className="text-white/80 text-lg mt-2">Get ready for a seamless parking experience on the
                  <strong> {getFloorName()} </strong> level.</p>
                <button onClick={() => setShowConfirmation(false)}
                  className="mt-8 bg-white text-[#f43f5e] font-bold py-4 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-110 shadow-lg flex items-center justify-center gap-2 mx-auto">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Let's Go!
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-transparent mt-16 z-10">
        <div className="container mx-auto px-6 py-6 text-center text-[#9ca3af] border-t border-[#374151]">
          <p>© 2024 ParkSmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SlotReservation;
