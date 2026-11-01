import React, { useState } from 'react';
import './Building3D.css';

const Building3D = ({ isARActive, exitAR }) => {
  const [activeFloor, setActiveFloor] = useState(3);
  const [rotation, setRotation] = useState({ x: -15, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (!isARActive) return;
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;
    setRotation({
      x: rotation.x + deltaX * 0.5,
      y: rotation.y - deltaY * 0.5
    });
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const getFloorStyle = (level) => {
    // Determine target Z position based on active floor selection
    let z = 0;
    if (activeFloor === 3) {
      if (level === 3) z = 80;
      else if (level === 2) z = 0;
      else if (level === 1) z = -80;
    } else if (activeFloor === 2) {
      if (level === 2) z = 100;
      else if (level === 3) z = 80;
      else if (level === 1) z = -80;
    } else if (activeFloor === 1) {
      if (level === 1) z = 100;
      else if (level === 3) z = 80;
      else if (level === 2) z = 0;
    }
    return { '--tz': `${z}px` };
  };

  return (
    <div
      className={`flex-grow flex items-center justify-center [perspective:1200px] transition-all duration-700 ease-in-out relative ${isARActive ? 'bg-black/20 z-50 rounded-lg' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {isARActive && (
        <button
          onClick={exitAR}
          className="absolute top-4 right-4 z-50 p-2 bg-gray-900/70 border border-gray-600 rounded-full hover:bg-gray-800/80 transition"
        >
          <span className="material-symbols-outlined text-white">close</span>
        </button>
      )}

      <div className="flex-grow flex items-center justify-center [perspective:1200px]">
        <div
          id="building"
          className="parking-building relative w-[320px] h-[240px]"
          style={isARActive ? { animation: 'none', cursor: isDragging ? 'grabbing' : 'grab', transform: `rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)` } : {}}
        >
          {/* Level 3 */}
          <div className={`parking-floor ${activeFloor === 3 ? 'active' : ''}`} style={getFloorStyle(3)}>
            <div className="absolute inset-2 grid grid-cols-8 grid-rows-4 gap-2">
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-0.5s' }}></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-1s' }}></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
            </div>
            <div className="car-ghost" style={{ top: '20%', left: '10%', '--tx1': '280px', '--ty1': '0px', '--tx2': '280px', '--ty2': '180px', animationDelay: '-2s' }}></div>
            <div className="absolute bottom-2 right-3 text-white font-bold text-lg opacity-70">Level 3</div>
          </div>

          {/* Level 2 */}
          <div className={`parking-floor ${activeFloor === 2 ? 'active' : ''}`} style={getFloorStyle(2)}>
            <div className="absolute inset-2 grid grid-cols-8 grid-rows-4 gap-2">
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-1.5s' }}></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-2s' }}></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
            </div>
            <div className="car-ghost" style={{ top: '80%', left: '90%', '--tx1': '-280px', '--ty1': '0px', '--tx2': '-280px', '--ty2': '-180px', animationDelay: '-4s' }}></div>
            <div className="car-ghost" style={{ top: '50%', left: '0%', '--tx1': '250px', '--ty1': '0px', '--tx2': '250px', '--ty2': '-40px', animationDelay: '-7s' }}></div>
            <div className="absolute bottom-2 right-3 text-white font-bold text-lg opacity-70">Level 2</div>
          </div>

          {/* Level 1 */}
          <div className={`parking-floor ${activeFloor === 1 ? 'active' : ''}`} style={getFloorStyle(1)}>
            <div className="absolute inset-2 grid grid-cols-8 grid-rows-4 gap-2">
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-2.5s' }}></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-3s' }}></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20"></div>
              <div className="relative rounded-sm bg-[#0ea5e9]/20 available-portal" style={{ animationDelay: '-0.2s' }}></div>
            </div>
            <div className="absolute bottom-2 right-3 text-white font-bold text-lg opacity-70">Level 1</div>
          </div>
        </div>
      </div>

      {/* Level Switch Buttons */}
      {!isARActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm p-2 rounded-xl border border-gray-700 shadow-2xl z-20">
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => setActiveFloor(level)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeFloor === level
                  ? 'bg-[#0284c7] text-white font-semibold shadow-lg shadow-[#0284c7]/30'
                  : 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">commit</span>
              Level {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Building3D;
