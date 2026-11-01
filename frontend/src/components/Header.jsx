import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid bg-gray-900 border-b-[#333333] px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-white">
        <div className="text-3xl text-[#f4c025] flex items-center">
          <span className="material-symbols-outlined"> local_parking </span>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">ParkSmart</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#f4c025] font-bold' : 'text-white/80 hover:text-white'}`}>Parking Map</NavLink>
          <NavLink to="/reservation" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#f4c025] font-bold' : 'text-white/80 hover:text-white'}`}>Spot Reservation</NavLink>
          <NavLink to="/vehicles" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#f4c025] font-bold' : 'text-white/80 hover:text-white'}`}>My Vehicles</NavLink>
          <NavLink to="/payment" className={({ isActive }) => `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#f4c025] font-bold' : 'text-white/80 hover:text-white'}`}>Billing</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-gray-300 hover:text-white transition-colors">
            <span className="material-symbols-outlined"> notifications </span>
          </button>
          <Link to="/profile">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#f4c025] cursor-pointer" style={{ backgroundImage: 'url("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcReMartWsXCw2QUhsjw2YH3-q1OANr0FnON6Dnn0Lo6Q-VK2TJf")' }}></div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
