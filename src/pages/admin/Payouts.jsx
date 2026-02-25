import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import {
  MdGavel,
  MdSearch,
  MdNotifications,
  MdPendingActions,
  MdCheckCircle,
  MdWarning,
  MdArrowUpward,
  MdArrowDownward,
  MdPayments,
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdClose,
  MdAnalytics,
  MdPriorityHigh,
  MdAssignmentTurnedIn,
  MdHistory,
  MdVerified,
  MdCancel,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const Payouts = () => {
  const { payouts, updatePayout } = useData();
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [hasInitialSelected, setHasInitialSelected] = useState(false);

  useEffect(() => {
    if (payouts.length > 0 && !selectedPayout && !hasInitialSelected) {
      setSelectedPayout(payouts[0]);
      setHasInitialSelected(true);
    }
  }, [payouts, selectedPayout, hasInitialSelected]);

  const filteredPayouts = payouts.filter((payout) =>
    payout.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payout.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#f6f6f8] dark:bg-[#121022] -m-4 md:-m-8 h-[calc(100vh-4rem)] relative overflow-hidden font-display">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Page Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight uppercase">Lawyer Payout Requests</h1>
              <p className="text-slate-500 dark:text-[#9f9db9] text-base font-normal">Review and process financial withdrawal requests from legal partners.</p>
            </div>

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#3d3b54] bg-white dark:bg-[#1c1c27] shadow-sm transition-all hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-bold uppercase tracking-wider">Total Pending Payouts</p>
                  <MdPendingActions className="text-primary text-2xl" />
                </div>
                <p className="text-slate-900 dark:text-white text-3xl font-black tabular-nums font-display">₹{(payouts?.reduce((acc, p) => acc + parseFloat(String(p.amount).replace('₹', '')), 0) || 42500).toLocaleString('en-IN')}</p>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-500 text-sm font-bold flex items-center">
                    <MdArrowUpward className="text-sm" /> 12%
                  </span>
                  <span className="text-slate-400 text-xs font-medium">vs last month</span>
                </div>
              </div>

              <Link to="/admin/payouts/bulk" className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#3d3b54] bg-white dark:bg-[#1c1c27] shadow-sm transition-all hover:border-primary/30 group">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Processed This Month</p>
                  <MdCheckCircle className="text-emerald-500 text-2xl" />
                </div>
                <p className="text-slate-900 dark:text-white text-3xl font-black tabular-nums">128 Requests</p>
                <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all">
                  Bulk Process <MdArrowUpward className="rotate-90" />
                </div>
              </Link>

              <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-[#3d3b54] bg-white dark:bg-[#1c1c27] shadow-sm transition-all hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-bold uppercase tracking-wider">Flagged for Review</p>
                  <MdWarning className="text-orange-500 text-2xl" />
                </div>
                <p className="text-slate-900 dark:text-white text-3xl font-black tabular-nums">5 Alerts</p>
                <div className="flex items-center gap-1">
                  <span className="text-rose-500 text-sm font-bold flex items-center">
                    <MdArrowDownward className="text-sm" /> 2%
                  </span>
                  <span className="text-slate-400 text-xs font-medium">security risk</span>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm overflow-hidden transition-all duration-300">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#252533] text-slate-500 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="px-4 md:px-6 py-4">Lawyer Name</th>
                      <th className="hidden lg:table-cell px-6 py-4 text-center">Available Balance</th>
                      <th className="px-4 md:px-6 py-4 text-center">Requested Amount</th>
                      <th className="hidden sm:table-cell px-6 py-4 text-center">Withdrawal Method</th>
                      <th className="hidden xl:table-cell px-6 py-4 text-center">Request Date</th>
                      <th className="px-4 md:px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
                    {filteredPayouts.map((payout) => (
                      <tr
                        key={payout.id}
                        className={`transition-all group cursor-pointer ${selectedPayout?.id === payout.id
                            ? "bg-primary/5 dark:bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-slate-50 dark:hover:bg-[#252533]"
                          }`}
                        onClick={() => setSelectedPayout(payout)}
                      >
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={payout.image}
                              alt={payout.lawyer}
                              className="size-6 md:size-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-border-dark"
                            />
                            <span className="text-slate-900 dark:text-white font-bold text-xs md:text-sm tracking-tight truncate max-w-[100px] md:max-w-none">{payout.lawyer}</span>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-6 py-4 text-slate-500 dark:text-[#9f9db9] text-sm font-bold tabular-nums text-center">{payout.balance}</td>
                        <td className="px-4 md:px-6 py-4 text-slate-900 dark:text-white font-black text-sm tabular-nums text-center">{payout.amount}</td>
                        <td className="hidden sm:table-cell px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${payout.method === 'Stripe' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' :
                                payout.method === 'Bank Transfer' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' :
                                  'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                              }`}>
                              {payout.method === 'Bank Transfer' ? <MdAccountBalance className="text-sm" /> :
                                payout.method === 'PayPal' ? <MdAccountBalanceWallet className="text-sm" /> : <MdPayments className="text-sm" />}
                              {payout.method}
                            </span>
                          </div>
                        </td>
                        <td className="hidden xl:table-cell px-6 py-4 text-slate-500 dark:text-[#9f9db9] text-xs font-bold text-center tracking-tight">{payout.date}</td>
                        <td className="px-4 md:px-6 py-4 text-right">
                          <button className={`text-[10px] font-black uppercase tracking-[0.1em] px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all ${payout.status === 'Reviewing'
                              ? 'bg-primary text-white shadow-md shadow-primary/20'
                              : 'bg-slate-100 dark:bg-[#2a2839] text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-[#3d3b54]'
                            }`}>
                            {payout.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Review Side Drawer */}
        {selectedPayout && (
          <div className="fixed inset-0 z-[60] md:relative md:inset-auto md:z-[30] flex justify-end md:block">
            {/* Backdrop for mobile */}
            <div
              className="absolute inset-0 bg-black/50 md:hidden animate-in fade-in duration-300"
              onClick={() => setSelectedPayout(null)}
            ></div>

            <aside className="w-full sm:w-[500px] md:w-[400px] border-l border-slate-200 dark:border-[#2a2839] bg-white dark:bg-[#121118] flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300 shrink-0 relative z-10">
              <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-[#2a2839]">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPayout.image}
                    alt={selectedPayout.lawyer}
                    className="size-12 rounded-full object-cover border-2 border-primary shadow-lg shadow-primary/10"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight">{selectedPayout.lawyer}</h3>
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">ID: {selectedPayout.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPayout(null)}
                  className="p-2 -mr-2 text-slate-400 dark:text-[#9f9db9] hover:text-rose-500 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-[#2a2839] rounded-lg z-20"
                  aria-label="Close drawer"
                >
                  <MdClose className="text-2xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                {/* Navigation Tabs in SideNav style */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary group cursor-pointer">
                    <MdAnalytics className="text-xl" />
                    <p className="text-sm font-black uppercase tracking-wider">Earnings History</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-[#9f9db9] hover:bg-slate-100 dark:hover:bg-[#2a2839] transition-all cursor-pointer group">
                    <MdPriorityHigh className="text-xl group-hover:text-primary transition-colors" />
                    <p className="text-sm font-bold uppercase tracking-wider">Disputes</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-[#9f9db9] hover:bg-slate-100 dark:hover:bg-[#2a2839] transition-all cursor-pointer group">
                    <MdAssignmentTurnedIn className="text-xl group-hover:text-primary transition-colors" />
                    <p className="text-sm font-bold uppercase tracking-wider">Compliance Checklist</p>
                  </div>
                </div>

                {/* Earnings History Section */}
                <div>
                  <h4 className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <MdHistory className="text-primary text-sm" /> Recent Earnings
                  </h4>
                  <div className="space-y-3">
                    {selectedPayout.recentEarnings?.map((earning, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#1c1c27] rounded-lg border border-slate-100 dark:border-[#3d3b54] transition-all hover:bg-white dark:hover:bg-background-dark/50">
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-[#9f9db9] font-bold uppercase tracking-tight">{earning.month}</p>
                          <p className="text-sm font-black dark:text-white tabular-nums">{earning.amount}</p>
                        </div>
                        <div className="h-8 w-24 bg-gradient-to-t from-primary/10 to-transparent rounded flex items-end px-1 gap-1">
                          {earning.bars.map((h, j) => (
                            <div key={j} className="w-2 bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${h * 15}%` }}></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disputes Warning */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl shadow-sm">
                  <div className="flex gap-3">
                    <MdVerified className="text-emerald-500 text-xl shrink-0" />
                    <div>
                      <p className="text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-tight">No Active Disputes</p>
                      <p className="text-emerald-600 dark:text-emerald-500/80 text-[10px] font-medium leading-relaxed mt-0.5">All past cases were resolved in favor of the lawyer.</p>
                    </div>
                  </div>
                </div>

                {/* Compliance Checklist */}
                <div>
                  <h4 className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">Compliance Checks</h4>
                  <div className="space-y-4">
                    {[
                      { title: "Identity Verified", desc: "Government ID and facial match confirmed.", checked: true },
                      { title: "No Pending Refunds", desc: "No client-initiated refund requests in queue.", checked: true },
                      { title: "Tax Documentation Valid", desc: "W-9 form on file and validated for current year.", checked: false },
                    ].map((check, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 rounded border-2 size-4 flex items-center justify-center transition-all ${check.checked ? 'bg-primary border-primary text-white shadow-sm' : 'border-slate-300 dark:border-[#3d3b54] group-hover:border-primary'
                          }`}>
                          {check.checked && <MdCheckCircle className="text-[10px]" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black text-slate-700 dark:text-white tracking-tight leading-none">{check.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-[#9f9db9] mt-1 font-medium leading-relaxed">{check.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rejection Reason */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <label className="block text-[10px] font-black text-slate-500 dark:text-[#9f9db9] mb-2 uppercase tracking-[0.2em]">Internal Note / Rejection Reason</label>
                  <textarea
                    className="w-full h-24 rounded-xl bg-slate-50 dark:bg-[#1c1c27] border-slate-200 dark:border-[#3d3b54] text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white resize-none outline-none p-4 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                    placeholder="Enter reason if rejecting request..."
                  ></textarea>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-[#2a2839] bg-white dark:bg-[#1c1c27] flex flex-col gap-3">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Approve Payout?",
                      text: `Confirming ${selectedPayout.amount} payout for ${selectedPayout.lawyer}.`,
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#22c55e",
                      confirmButtonText: "Confirm Payout",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        updatePayout(selectedPayout.id, { status: "Paid" });
                        Swal.fire("Success!", "Payout has been processed.", "success");
                        setSelectedPayout(null);
                      }
                    });
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 uppercase tracking-widest text-xs active:scale-[0.98]"
                >
                  <MdCheckCircle className="text-lg" />
                  Approve Payout
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Reject Payout?",
                      text: "Please provide a reason for rejection.",
                      input: "textarea",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#ef4444",
                      confirmButtonText: "Reject Request",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        updatePayout(selectedPayout.id, { status: "Rejected", note: result.value });
                        Swal.fire("Rejected", "Payout request has been declined.", "error");
                        setSelectedPayout(null);
                      }
                    });
                  }}
                  className="w-full border-2 border-slate-100 dark:border-[#3d3b54] text-slate-600 dark:text-[#9f9db9] hover:bg-rose-500 hover:text-white hover:border-rose-500 dark:hover:bg-rose-500/10 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                >
                  <MdCancel className="text-lg" />
                  Reject with Reason
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Payouts;
