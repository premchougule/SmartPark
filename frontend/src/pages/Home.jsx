import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Building3D from '../components/Building3D';
import { getParkingStats } from '../api/parkingApi';

const Home = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [stats, setStats] = useState({ available: 0, occupied: 0, byFloor: { 1: 0, 2: 0, 3: 0 }, loading: true });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getParkingStats();
        setStats({ ...data, loading: false });
      } catch {
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, []);

  return (
    <div className="h-screen flex gap-6">
      {/* Left Sidebar */}
      <div className={`transition-all duration-700 ${isARActive ? 'hidden' : ''}`}>
        <Sidebar
          level1Occupied={stats.byFloor[1]}
          level2Occupied={stats.byFloor[2]}
        />
      </div>

      {/* Middle Section (3D Parking) */}
      <div className={`bg-gray-950/50 flex-1 mt-6 mb-6 rounded-2xl p-6 relative overflow-hidden flex flex-col cosmic-bg transition-all duration-700 ${isARActive ? 'fixed inset-0 mt-0 mb-0 mr-0 rounded-none p-0' : ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent opacity-50">
        </div>

        {/* Header */}
        <div className={`flex justify-between items-center z-20 ${isARActive ? 'hidden' : 'mb-6'}`}>
          <h2 className="text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]">Parking Universe</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsARActive(!isARActive)}
              className="p-2.5 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-800/80 hover:text-blue-400 transition-colors"
            >
              <span className="material-symbols-outlined">view_in_ar</span>
            </button>
          </div>
        </div>

        <Building3D isARActive={isARActive} exitAR={() => setIsARActive(false)} />
      </div>

      {/* Right Panel */}
      <div className={`bg-gray-950/50 min-w-96 mt-6 mb-6 mr-6 rounded-2xl p-6 flex flex-col transition-all duration-700 ${isARActive ? 'hidden' : ''}`}>
        <h2 className="text-xl font-bold mb-6">Live Status</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-800/60 rounded-lg">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <span className="material-symbols-outlined text-green-400 text-3xl">check_circle</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">
                {stats.loading ? '—' : stats.available}
              </p>
              <p className="text-gray-400">Available Spots</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-800/60 rounded-lg">
            <div className="p-3 bg-[#f43f5e]/20 rounded-lg">
              <span className="material-symbols-outlined text-[#fb7185] text-3xl">error</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#fb7185]">
                {stats.loading ? '—' : stats.occupied}
              </p>
              <p className="text-gray-400">Occupied Spots</p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold mt-8 mb-4">Recent Activity</h2>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#38bdf8]">file_download</span>
            </div>
            <div>
              <p className="font-semibold">Car (ABC-123) parked at A5</p>
              <p className="text-sm text-gray-400">Level 1 - 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 bg-[#f43f5e]/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#fb7185]">file_upload</span>
            </div>
            <div>
              <p className="font-semibold">Car (XYZ-789) left from B2</p>
              <p className="text-sm text-gray-400">Level 2 - 5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#38bdf8]">file_download</span>
            </div>
            <div>
              <p className="font-semibold">Car (DEF-456) parked at C3</p>
              <p className="text-sm text-gray-400">Level 1 - 8 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 bg-[#0ea5e9]/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#38bdf8]">file_download</span>
            </div>
            <div>
              <p className="font-semibold">Car (GHI-012) parked at A6</p>
              <p className="text-sm text-gray-400">Level 1 - 12 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-shrink-0 bg-[#f43f5e]/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#fb7185]">file_upload</span>
            </div>
            <div>
              <p className="font-semibold">Car (JKL-345) left from C1</p>
              <p className="text-sm text-gray-400">Level 3 - 15 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
