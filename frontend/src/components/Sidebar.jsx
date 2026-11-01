import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getSlotsByFloor, SLOTS_PER_FLOOR } from '../api/parkingApi';

const Sidebar = ({ level1Occupied, level2Occupied }) => {
  const [user, setUser] = useState({ username: 'AI Clark' });
  const [level1Spots, setLevel1Spots] = useState(level1Occupied ?? 0);
  const [level2Spots, setLevel2Spots] = useState(level2Occupied ?? 0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    if (level1Occupied !== undefined && level2Occupied !== undefined) {
      setLevel1Spots(level1Occupied);
      setLevel2Spots(level2Occupied);
      return;
    }

    const loadFloorStats = async () => {
      try {
        const [floor1, floor2] = await Promise.all([
          getSlotsByFloor(1),
          getSlotsByFloor(2),
        ]);
        setLevel1Spots((floor1.slots || []).filter((slot) => slot.isOccupied).length);
        setLevel2Spots((floor2.slots || []).filter((slot) => slot.isOccupied).length);
      } catch {
        setLevel1Spots(0);
        setLevel2Spots(0);
      }
    };

    loadFloorStats();
  }, [level1Occupied, level2Occupied]);

  const percentLevel1 = (level1Spots / SLOTS_PER_FLOOR) * 100;
  const percentLevel2 = (level2Spots / SLOTS_PER_FLOOR) * 100;

  return (
    <div className="bg-gray-950/50 min-w-80 p-6 flex flex-col h-full overflow-y-auto">
      <div className="p-2 text-2xl font-bold"><span className="pr-5 text-3xl">P</span>ParkSmart</div>
      <nav className="pt-12 flex flex-col gap-4 ">
        <NavLink to="/" end
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#0284c7]/10 font-semibold ring-2 ring-[#0ea5e9]' : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'}`
          }>
          <span className="material-symbols-outlined">map</span>Parking Map
        </NavLink>
        <NavLink to="/reservation"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#0284c7]/10 font-semibold ring-2 ring-[#0ea5e9]' : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'}`
          }>
          <span className="material-symbols-outlined">event_seat</span>Spot Reservation
        </NavLink>
        <NavLink to="/vehicles"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#0284c7]/10 font-semibold ring-2 ring-[#0ea5e9]' : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'}`
          }>
          <span className="material-symbols-outlined">directions_car</span>Vehicle Management
        </NavLink>
        <NavLink to="/payment"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#0284c7]/10 font-semibold ring-2 ring-[#0ea5e9]' : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'}`
          }>
          <span className="material-symbols-outlined">receipt_long</span>Payment & Billing
        </NavLink>

        {/* Sidebar footer */}
        <div className="flex flex-col gap-2 mt-24">
          <div className="bg-gray-400/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Level 1</span>
              <span className="text-sm text-gray-400">{Math.round(percentLevel1)}% Full</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-[#f43f5e] to-[#fb7185] h-2.5 rounded-full" style={{ width: `${percentLevel1}%` }}></div>
            </div>
          </div>
          <div className="bg-gray-400/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Level 2</span>
              <span className="text-sm text-gray-400">{Math.round(percentLevel2)}% Full</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-[#f43f5e] to-[#fb7185] h-2.5 rounded-full" style={{ width: `${percentLevel2}%` }}></div>
            </div>
          </div>
          <Link to="/profile">
            <div className="flex items-center gap-4 mt-6 hover:bg-gray-800/40 p-2 rounded-lg transition-colors">
              <img alt="User avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-[#f43f5e]"
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcReMartWsXCw2QUhsjw2YH3-q1OANr0FnON6Dnn0Lo6Q-VK2TJf" />
              <div>
                <p className="font-semibold">{user.username}</p>
                <span className="text-sm text-gray-400 hover:text-[#fb7185]">View Profile</span>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
