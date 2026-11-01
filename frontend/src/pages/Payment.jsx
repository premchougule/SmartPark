import React from 'react';
import Header from '../components/Header';
import './Payment.css';

const Payment = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-950/50 dark group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        
        <div className="px-40 flex flex-1 justify-center py-10">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4 items-center">
              <h1 className="text-white tracking-light text-[40px] font-bold leading-tight min-w-72">Payment & Billing</h1>
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm">Total Balance</span>
                <span className="text-[#f4c025] text-3xl font-bold">$120.00</span>
              </div>
            </div>

            <div className="p-8 my-8 bg-gray-900 rounded-3xl border border-[#333333] relative overflow-hidden">
              <h3 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-6">Connect your energy orb to pay</h3>
              <div className="flex justify-center items-center gap-16 py-8">
                
                {/* Credit Card */}
                <div className="flex flex-col items-center gap-4 cursor-pointer group">
                  <div className="payment-orb rounded-full" style={{ '--glow-color': 'rgba(20, 184, 166, 0.6)' }}>
                    <div className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-full border-4 border-teal-500/50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuZz5c7bdDzLz_piTFwHiFuf97nYHar2vXM5UUl9jOB0_KiGKNlM8oFOekTxi1oIj2HcKeSwUb1XBWMWqIhMNWWgu58c0Z-Od296YYf_YwFg84x2pw4XCl-_dUduolowM-W7dPW8BX-wfxMMbQGIvHKKZxLBu8dYmBK_2OpOZ1GwePGw6WaOjvDdoZaW4ir7o3qeFwxdkE6_XCAonditGcn0ptCLtp-sDCAKwkt9jcGaaUOVIT43wrZPBnYZ4ubC8XBBCI74vq4ibf")' }}></div>
                  </div>
                  <p className="text-white text-base font-medium leading-normal group-hover:text-teal-400 transition-colors">Credit Card</p>
                </div>

                {/* Paypal */}
                <div className="flex flex-col items-center gap-4 cursor-pointer group">
                  <div className="payment-orb rounded-full" style={{ '--glow-color': 'rgba(249, 115, 22, 0.6)' }}>
                    <div className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-full border-4 border-orange-500/50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOV73Qs2XIxUaixOribLFWN9sd0WMxc5R7DKFFd3JluZLNpV0QI6PNqfXLTSJs4VlE5Qz3UNKmDsJ_5v3gJ8awC7vv6OMsFGSxsWZzsRoFyOlo3Wok5ar76Fsz355drwusGjlb41lfctAVfreDOvlzMOh1Qt0fGAVNUUbYV_Ouw0G5S4bTmU9zzz8zrBo08CBeZ7irf1FJk53P7b8cwmCQOpmkEdXkj2ckNEKXe3j2XFndg5JSbVYLqwnZsUb5Lbigz4LZ8dXTVgz8")' }}></div>
                  </div>
                  <p className="text-white text-base font-medium leading-normal group-hover:text-orange-400 transition-colors">Paypal</p>
                </div>

                {/* Apple Pay */}
                <div className="flex flex-col items-center gap-4 cursor-pointer group">
                  <div className="payment-orb rounded-full" style={{ '--glow-color': 'rgba(139, 92, 246, 0.6)' }}>
                    <div className="w-32 h-32 bg-center bg-no-repeat bg-cover rounded-full border-4 border-violet-500/50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyvNjEahGCfmzgfa7TzPiifhsIrWhFdy1LC8HTHy_P9zRFFmA3-CrmgQwJyJIf0Oiykl28Y9ZQ79J-NNuonb9i28NmT_S6V2dFERukyuv2lWDjeCiwPA2o2NYsZbmMouXPCQHlefQ0qKDkN5eFGr7EiqwFXipozcp0vQb2qY1IfVmMvjJ_Q9apHLwRFaAZJdV13xWLxwblGsqxcluyfZf4M7V5Pgcb56snJ7KJGm3Da3M7f2T5tcJslkmBoksF4LtJLYYkpAIJni3B")' }}></div>
                  </div>
                  <p className="text-white text-base font-medium leading-normal group-hover:text-violet-400 transition-colors">Apple Pay</p>
                </div>

                {/* Connect */}
                <div className="w-48 h-48 flex flex-col items-center justify-center rounded-full text-gray-500 border-4 border-dashed border-[#f4c025]/30 transition-all duration-300 hover:border-[#f4c025] hover:text-[#f4c025]/80 hover:shadow-[0_0_30px_5px_rgba(244,192,37,0.3)]">
                  <span className="material-symbols-outlined text-5xl"> electric_bolt </span>
                  <span className="text-center font-semibold">Connect to Pay</span>
                </div>

              </div>
            </div>

            {/* Billing History */}
            <h3 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-8">Billing History</h3>
            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-2xl border border-[#333333] bg-gray-900">
                <div className="grid grid-cols-12 px-6 py-4 bg-[#2a2a2a] text-sm font-medium text-white/80">
                  <div className="col-span-3">Date</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-3 text-right">Amount</div>
                  <div className="col-span-2 text-center">Status</div>
                </div>
                <div className="divide-y divide-[#333333]">
                  
                  {[
                    { date: '2025-10-20', desc: 'Parking Fee - Downtown Lot', amount: '-$15.00', status: 'Paid', delay: '0s' },
                    { date: '2025-08-15', desc: 'Monthly Subscription', amount: '-$50.00', status: 'Paid', delay: '0.1s' },
                    { date: '2025-06-10', desc: 'Parking Fee - Airport', amount: '-$20.00', status: 'Paid', delay: '0.2s' },
                    { date: '2025-04-05', desc: 'Parking Fee - Mall', amount: '-$10.00', status: 'Paid', delay: '0.3s' },
                  ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 px-6 py-5 items-center waterfall-row" style={{ animationDelay: row.delay }}>
                      <div className="col-span-3 text-white/90">{row.date}</div>
                      <div className="col-span-4 text-white/90">{row.desc}</div>
                      <div className="col-span-3 text-right text-white font-semibold">{row.amount}</div>
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-medium">
                          <span className="material-symbols-outlined text-base"> check_circle </span>
                          <span>{row.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 mt-4 h-16">
              <div className="w-16 h-1 bg-gray-700 rounded-full animate-pulse"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
