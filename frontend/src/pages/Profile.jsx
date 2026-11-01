import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getProfile } from '../api/userApi';
import { useAuth } from '../context/authContext';

const Profile = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProfile();
      setUser(res.data);
      setUserName(res.data.username || '');
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/signin');
        return;
      }
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col font-sans bg-gray-950 text-white">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl text-gray-400">Loading...</h2>
        </main>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="relative flex size-full min-h-screen flex-col font-sans bg-gray-950 text-white">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl text-red-400">{error || 'Could not load profile'}</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col font-sans bg-gray-950 text-white">
      <div className="flex h-full grow flex-col">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-8">Profile</h1>
            <div className="rounded-lg bg-gray-900 p-6 shadow-md">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 shrink-0" style={{ backgroundImage: 'url("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcReMartWsXCw2QUhsjw2YH3-q1OANr0FnON6Dnn0Lo6Q-VK2TJf")' }}></div>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-white">{user.username}</p>
                  <p className="text-base text-gray-400">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="block mt-2 text-red-400 hover:text-red-500 text-sm font-semibold md:ml-auto">Logout</button>
              </div>
            </div>
            
            <form className="mt-8 space-y-8">
              <div className="rounded-lg bg-gray-900 p-6 shadow-md">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="full-name">Full Name</label>
                    <input className="form-input mt-1 block w-full rounded-md border-gray-600 bg-[#2a2a2a] text-white shadow-sm focus:border-[#f4c024] focus:ring-[#f4c024] focus:ring-1 outline-none px-3 py-2 sm:text-sm" id="full-name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="email">Email</label>
                    <input className="form-input mt-1 block w-full rounded-md border-gray-600 bg-[#2a2a2a] text-white shadow-sm focus:border-[#f4c024] focus:ring-[#f4c024] focus:ring-1 outline-none px-3 py-2 sm:text-sm" id="email" type="email" value={user.email} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="phone">Phone Number</label>
                    <input className="form-input mt-1 block w-full rounded-md border-gray-600 bg-[#2a2a2a] text-white shadow-sm focus:border-[#f4c024] focus:ring-[#f4c024] focus:ring-1 outline-none px-3 py-2 sm:text-sm" id="phone" type="tel" defaultValue="+1 123-456-7890" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 shadow-md">
                <h2 className="text-xl font-bold text-white">Vehicle Information</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="vehicle-make">Vehicle Make</label>
                    <input className="form-input mt-1 block w-full rounded-md border-gray-600 bg-[#2a2a2a] text-white shadow-sm focus:border-[#f4c024] focus:ring-[#f4c024] focus:ring-1 outline-none px-3 py-2 sm:text-sm" id="vehicle-make" type="text" defaultValue="Tesla" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="vehicle-model">Vehicle Model</label>
                    <input className="form-input mt-1 block w-full rounded-md border-gray-600 bg-[#2a2a2a] text-white shadow-sm focus:border-[#f4c024] focus:ring-[#f4c024] focus:ring-1 outline-none px-3 py-2 sm:text-sm" id="vehicle-model" type="text" defaultValue="Model Y" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="license-plate">License Plate</label>
                    <input className="form-input mt-1 block w-full rounded-md border-gray-600 bg-[#2a2a2a] text-white shadow-sm focus:border-[#f4c024] focus:ring-[#f4c024] focus:ring-1 outline-none px-3 py-2 sm:text-sm" id="license-plate" type="text" defaultValue="PARKSMT" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center justify-center rounded-md border border-transparent bg-[#f4c024] px-6 py-3 text-sm font-bold text-black shadow-sm hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors" type="button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
