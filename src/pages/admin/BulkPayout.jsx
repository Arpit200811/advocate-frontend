import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdNotifications,
  MdSettings,
  MdGroups,
  MdAccountBalanceWallet,
  MdReceiptLong,
  MdCheckCircle,
  MdShield,
  MdCreditCard,
  MdAccountBalance,
  MdPayments,
  MdDownload,
  MdSchedule,
  MdLock,
  MdBolt,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const BulkPayout = () => {
  const navigate = useNavigate();
  const { bulkPayouts, processBulkPayouts } = useData();
  const [manifest, setManifest] = useState(bulkPayouts);
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = manifest.reduce((acc, curr) => {
    const amount = Number(curr.amount?.toString().replace(/[^0-9.-]+/g, "")) || 0;
    return acc + amount;
  }, 0);
  const totalFees = manifest.length * 2;
  const totalDebit = subtotal + totalFees;

  return (
    <div className="flex-1 flex flex-col bg-[#f6f6f8] dark:bg-[#121022] -m-8 min-h-[calc(100vh-4rem)] font-display text-slate-900 dark:text-white overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#3d3b54] px-10 py-3 bg-white dark:bg-[#121022] sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">LegalConsult Admin</h2>
          </div>
          <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-[#2a2839]">
              <div className="text-[#9f9db9] flex items-center justify-center pl-4">
                <MdSearch className="text-xl" />
              </div>
              <input
                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-0 focus:ring-0 text-slate-900 dark:text-white placeholder:text-[#9f9db9] px-4 text-sm font-normal"
                placeholder="Search transactions..."
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-slate-600 dark:text-[#9f9db9] hover:text-primary dark:hover:text-white text-sm font-medium transition-colors" to="/admin/dashboard">Dashboard</Link>
            <Link className="text-slate-600 dark:text-[#9f9db9] hover:text-primary dark:hover:text-white text-sm font-medium transition-colors" to="/admin/users">Users</Link>
            <Link className="text-slate-600 dark:text-[#9f9db9] hover:text-primary dark:hover:text-white text-sm font-medium transition-colors" to="/admin/lawyers">Lawyers</Link>
            <Link className="text-primary dark:text-white text-sm font-bold border-b-2 border-primary" to="/admin/payouts">Payouts</Link>
          </nav>
          <div className="flex gap-2 text-slate-600 dark:text-white">
            <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-[#2a2839] hover:bg-slate-200 dark:hover:bg-[#3d3b54] transition-colors">
              <MdNotifications className="text-xl" />
            </button>
            <button className="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-[#2a2839] hover:bg-slate-200 dark:hover:bg-[#3d3b54] transition-colors">
              <MdSettings className="text-xl" />
            </button>
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary shadow-sm"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbjoD5hKPSRl4yzYyzhNqxVQ__1gt47hd3sdj5gOofoBEW0dyVPdA1S7GIPni4KeFzTjkZCnJGAAxNRbZejKUEPfZxR_67g6bD5sH8XvbYwAW_ogfAEDRRkvVRpAEvM_Bg0kPhapvrzwNzf3rkd-_6XyZvdsA8ajFgBAguXgHDkuk9vOSIOfKYkku_iXtm83qZS3TRuLdgqvFgz05k9BkpojZ9QlgK9mTvxdUO8QcXmWPGX6oJp-0hsM6U2VCMhXbYw7BQqPTAPB_v")' }}
          ></div>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-8 overflow-y-auto">
        <div className="max-w-[1200px] w-full px-4 lg:px-10 space-y-8 animate-in fade-in duration-500">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 text-sm font-medium">
            <Link className="text-slate-500 dark:text-[#9f9db9] hover:text-primary" to="/admin/payments">Financial Management</Link>
            <span className="text-slate-400 dark:text-[#9f9db9]">/</span>
            <Link className="text-slate-500 dark:text-[#9f9db9] hover:text-primary" to="/admin/payouts">Payouts</Link>
            <span className="text-slate-400 dark:text-[#9f9db9]">/</span>
            <span className="text-slate-900 dark:text-white">Bulk Payout Confirmation</span>
          </div>

          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Confirm Bulk Payout</h1>
              <div className="flex items-center gap-3">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider">Batch #BPT-9982-2023</span>
                <p className="text-slate-500 dark:text-[#9f9db9] text-xs font-medium">Created on Oct 24, 2023, 10:45 AM</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-slate-200 dark:bg-[#2a2839] text-slate-900 dark:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-slate-300 dark:hover:bg-[#3d3b54]">
              <MdDownload className="text-xl" />
              Download Manifest
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] shadow-sm group hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between text-slate-500 dark:text-[#9f9db9]">
                <p className="text-xs font-black uppercase tracking-[0.15em]">Total Recipients</p>
                <MdGroups className="text-2xl text-primary" />
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-black tabular-nums">42 Lawyers</p>
              <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase">
                <MdCheckCircle className="text-sm" /> All accounts verified
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] shadow-sm group hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between text-slate-500 dark:text-[#9f9db9]">
                <p className="text-xs font-black uppercase tracking-[0.15em]">Total Disbursement</p>
                <MdAccountBalanceWallet className="text-2xl text-primary" />
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-black tabular-nums">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              <p className="text-slate-400 dark:text-[#9f9db9] text-[10px] font-bold italic tracking-wider">Currency: INR</p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] shadow-sm group hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between text-slate-500 dark:text-[#9f9db9]">
                <p className="text-xs font-black uppercase tracking-[0.15em]">Transaction Fees</p>
                <MdReceiptLong className="text-2xl text-primary" />
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-black tabular-nums">₹{totalFees.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              <p className="text-slate-400 dark:text-[#9f9db9] text-[10px] font-bold italic tracking-wider">Processing costs included</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-[#1c1c27] rounded-2xl border border-slate-200 dark:border-[#3d3b54] overflow-hidden shadow-sm transition-all duration-300">
            <div className="px-8 py-5 border-b border-slate-100 dark:border-[#3d3b54] flex justify-between items-center bg-slate-50/50 dark:bg-transparent">
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Payout Manifest</h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-black uppercase bg-emerald-500/10 px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20">
                  <MdShield className="text-sm" />
                  Encrypted Connection
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-[#252533] border-b border-slate-100 dark:border-[#3d3b54] text-slate-500 dark:text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-8 py-5">Recipient</th>
                    <th className="px-8 py-5">Legal ID</th>
                    <th className="px-8 py-5">Method</th>
                    <th className="px-8 py-5 text-right">Amount (Net)</th>
                    <th className="px-8 py-5 text-right">Fee</th>
                    <th className="px-8 py-5 text-center">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
                  {manifest.map((payout) => (
                    <tr key={payout.id} className={`group hover:bg-slate-50 dark:hover:bg-[#2a2839] transition-all ${payout.status === 'INVALID' ? 'bg-rose-500/5' : ''}`}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`size-9 rounded-full flex items-center justify-center font-black text-xs shadow-sm ${payout.status === 'INVALID' ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'
                            }`}>
                            {payout.initials}
                          </div>
                          <span className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">{payout.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-slate-500 dark:text-[#9f9db9] text-xs font-bold tracking-tight">{payout.legalId}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-[#9f9db9] text-xs font-bold">
                          {payout.method === 'Stripe Connect' ? <MdCreditCard className="text-lg text-primary" /> :
                            payout.method === 'Bank Transfer' ? <MdAccountBalance className="text-lg text-emerald-500" /> : <MdPayments className="text-lg text-blue-500" />}
                          {payout.method}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right text-slate-900 dark:text-white font-black text-sm tabular-nums">₹{payout.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="px-8 py-5 text-right text-slate-500 dark:text-[#9f9db9] text-xs font-bold tabular-nums">₹{payout.fee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ring-1 ${payout.status === 'READY'
                            ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-500 ring-rose-500/20'
                            }`}>
                            {payout.status === 'INVALID' ? 'Invalid Account' : payout.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className={`text-[10px] font-black uppercase tracking-widest hover:underline transition-all ${payout.status === 'INVALID' ? 'text-rose-500 hover:text-rose-600' : 'text-primary hover:text-primary/70'
                          }`}>
                          {payout.status === 'INVALID' ? 'Fix Account' : 'Edit'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Options Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            <div className="lg:col-span-2 bg-white dark:bg-[#1c1c27] rounded-2xl border border-slate-200 dark:border-[#3d3b54] p-8 shadow-sm transition-all hover:border-primary/20">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                <MdSchedule className="text-primary text-2xl" />
                Batch Scheduling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#9f9db9]">Processing Time</label>
                  <select className="w-full bg-slate-50 dark:bg-[#2a2839] border-slate-200 dark:border-[#3d3b54] rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all">
                    <option>Immediate (API Push)</option>
                    <option>Scheduled: Oct 25, 2023 - 00:00 AM</option>
                    <option>Scheduled: Oct 26, 2023 - 00:00 AM</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#9f9db9]">Authorized Admin</label>
                  <input
                    className="w-full bg-slate-100 dark:bg-[#121118] border-slate-200 dark:border-[#3d3b54] rounded-xl px-4 py-3 text-sm font-bold text-slate-400 dark:text-[#9f9db9] cursor-not-allowed opacity-70"
                    disabled
                    type="text"
                    defaultValue="Admin-User-102"
                  />
                </div>
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20 transition-all hover:bg-primary/10">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div
                    onClick={() => setConfirmed(!confirmed)}
                    className={`mt-1 size-5 rounded border-2 shrink-0 transition-all flex items-center justify-center ${confirmed ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-transparent border-slate-300 dark:border-[#3d3b54] group-hover:border-primary'
                      }`}
                  >
                    {confirmed && <MdCheckCircle className="text-xs" />}
                  </div>
                  <span className="text-xs text-slate-600 dark:text-[#9f9db9] leading-relaxed font-medium">
                    I confirm that the amounts and recipients above have been audited and verified. I acknowledge that these payouts are irreversible once transmitted to the payment gateway.
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1c1c27] rounded-2xl border border-slate-200 dark:border-[#3d3b54] p-8 shadow-sm flex flex-col justify-between transition-all hover:border-primary/20 group">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 tracking-tight">Final Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold transition-all group-hover:px-1">
                    <span className="text-slate-500 dark:text-[#9f9db9] uppercase tracking-wider">Subtotal</span>
                    <span className="text-slate-900 dark:text-white tabular-nums">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold transition-all group-hover:px-1">
                    <span className="text-slate-500 dark:text-[#9f9db9] uppercase tracking-wider">Processing Fees</span>
                    <span className="text-slate-900 dark:text-white tabular-nums">₹{totalFees.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t border-slate-100 dark:border-[#3d3b54] pt-4 flex justify-between items-center transition-all group-hover:pt-6">
                    <span className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.2em]">Total Debit</span>
                    <span className="text-primary text-2xl font-black tabular-nums tracking-tighter">₹{totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
              <button
                disabled={!confirmed}
                onClick={() => {
                  Swal.fire({
                    title: "Execute Bulk Payout?",
                    text: `Executing payment for ${manifest.length} lawyers. This action is irreversible.`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#197fe6",
                    confirmButtonText: "Execute Now",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Transmitting...",
                        text: "Sending payload to gateway...",
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading(),
                      });

                      try {
                        const ids = manifest.map(p => p.id);
                        await processBulkPayouts(ids);

                        Swal.fire({
                          title: "Batch Executed",
                          text: "All payouts have been successfully transmitted.",
                          icon: "success",
                        }).then(() => {
                          navigate("/admin/payouts");
                        });
                      } catch (error) {
                        Swal.fire("Error", "Payout processing failed", "error");
                      }
                    }
                  });
                }}
                className={`w-full mt-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] ${confirmed
                  ? 'bg-primary text-white shadow-primary/30 hover:bg-primary/90'
                  : 'bg-slate-200 dark:bg-[#2a2839] text-slate-400 dark:text-slate-600 cursor-not-allowed grayscale'
                  }`}
              >
                CONFIRM & EXECUTE BATCH
              </button>
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="pb-12 flex justify-center text-slate-400 dark:text-[#9f9db9] text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <span className="flex items-center gap-2 group cursor-help hover:text-emerald-500 transition-colors">
                <MdLock className="text-lg" /> PCI-DSS Compliant
              </span>
              <span className="flex items-center gap-2 group cursor-help hover:text-primary transition-colors">
                <MdBolt className="text-lg" /> Real-time settlement
              </span>
              <span className="opacity-60 transition-opacity hover:opacity-100">Audit Log: SESSION_ID_9921_AFK</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BulkPayout;
