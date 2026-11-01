import React from 'react';
import Sidebar from '../components/Sidebar';

const Vehicles = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-950/50 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight text-white">My Garage</h2>
          <button className="flex items-center justify-center gap-2 rounded-md h-10 px-5 bg-[#ea2a33] text-white text-sm font-medium shadow-lg hover:bg-red-700 transition-colors duration-300">
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Add Vehicle</span>
          </button>
        </div>
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Your Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center z-10 transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">Honda Civic</p>
                      <p className="text-sm text-gray-400">CAR-1</p>
                    </div>
                  </div>
                  <img alt="Honda Civic" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPol0MuOJyhxLDRSlSg-YNqp-wVd18ejfj4oMx3MQtF1GtFEn_b9gvX5rTYR-yf57LJSzyU_hU_YjG73P85o9In0H9KIPVdw7c_GE9Qo0dV_DkVTs6BXLQ-hnyiSugJW0Jvzvxr1giCGqsFAPyX3a4tS39RaU2G5RraIKQvuJm2z-bKfJfTqUbVrNBsoGGPWHoek7Lh0EWKYD6J6gGKHP_wNUxPFceE-H_AOtlf9lZ2lEP_0xpi9gw8LhCMb72Vw6od68GQU9OvCe"/>
                </div>
                <div className="p-4 absolute bottom-0 left-0 right-0 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-black/50 backdrop-blur-sm">
                  <p className="text-white text-base font-medium">Honda Civic</p>
                  <p className="text-gray-400 text-sm">CAR-1</p>
                  <div className="flex gap-2 mt-2">
                    <button className="text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">edit</span></button>
                    <button className="text-gray-400 hover:text-[#ea2a33] transition-colors"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </div>
              </div>
              <div className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center z-10 transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">Toyota Camry</p>
                      <p className="text-sm text-gray-400">CAR-2</p>
                    </div>
                  </div>
                  <img alt="Toyota Camry" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn0LUr46Yux8_jCul_sxQZKJLCck2jljFvB54F694PXyCKsoCHli1z48EeaXUor5XtU2PlkrGGu6tj1VDb23UdKEldtdHtNB7fAyWfKPTpbvDNDM2xPziuHjAvH7kuK406bqQsad-XKlAyl3hkd33-hvWklS_JcPbxccLf0Q68fYKzkJeS7VoYNKLGcKy3Xz9fE7dbK8Nm4E9zaMrgEfMMk0aPmPN5ITJlqRkN1n-Ju8fq0zGASrRTSJ9l5cCd9d7XTESqUFJ6epXK"/>
                </div>
                <div className="p-4 absolute bottom-0 left-0 right-0 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-black/50 backdrop-blur-sm">
                  <p className="text-white text-base font-medium">Toyota Camry</p>
                  <p className="text-gray-400 text-sm">CAR-2</p>
                  <div className="flex gap-2 mt-2">
                    <button className="text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">edit</span></button>
                    <button className="text-gray-400 hover:text-[#ea2a33] transition-colors"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Parking History</h3>
              {/* <div className="flex items-center gap-4">
                <select className="form-select w-40 rounded-md text-white bg-gray-800 border-gray-700 focus:border-[#ea2a33] focus:ring-[#ea2a33] text-sm">
                  <option value="all">All Vehicles</option>
                  <option value="honda-civic">Honda Civic</option>
                  <option value="toyota-camry">Toyota Camry</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-700 hover:bg-gray-600 transition-colors">
                  <span className="material-symbols-outlined text-base">filter_list</span> Filter
                </button>
              </div> */}
            </div>
            <div className="relative pl-6">
              <div className="absolute top-5 left-0 w-[2px] h-[calc(100%-1.25rem)] bg-gray-700 -z-10"></div>
              <div className="space-y-8">
                {[
                  { car: 'Honda Civic', date: '20/10/2025', time: '10:00 AM - 12:00 PM', loc: 'Level 2, Spot 2' },
                  { car: 'Toyota Camry', date: '19/8/2025', time: '02:00 PM - 04:00 PM', loc: 'Level 1, Spot 4' },
                  { car: 'Honda Civic', date: '10/7/2025', time: '09:00 AM - 11:00 AM', loc: 'Level 3, Spot 6' },
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute left-[-2rem] top-2 flex items-center justify-center size-10 rounded-full bg-gray-700 border-4 border-gray-900 z-10">
                      <span className="material-symbols-outlined text-[#ea2a33]">directions_car</span>
                    </div>
                    <div className="bg-gray-800/80 p-4 rounded-lg w-full transform hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-white">{item.car}</p>
                          <p className="text-xs text-gray-400">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-300">{item.time}</p>
                          <p className="text-xs text-gray-400">{item.loc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Vehicles;
