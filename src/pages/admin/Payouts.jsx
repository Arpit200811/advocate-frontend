import React, { useState } from "react";
import {
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdHistory,
  MdCheckCircle,
  MdPending,
  MdError,
  MdSearch,
  MdFilterList,
  MdDownload,
  MdArrowForward,
  MdAccountBalance,
  MdVisibility,
} from "react-icons/md";
import { initialPayouts } from "../../data/mockData";

const Payouts = () => {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleUpdateStatus = (id, newStatus) => {
    setPayouts((prev) =>
      prev.map((payout) =>
        payout.id === id ? { ...payout, status: newStatus } : payout
      )
    );
  };

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch =
      payout.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || payout.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            Financial Operations
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Payouts Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Processing lawyer withdrawal requests and managing platform liquidity.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm font-bold">
            <MdDownload className="text-xl" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold">
            <MdAccountBalance className="text-xl" />
            Bulk Process
          </button>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Payouts (MTD)",
            value: "$124,500",
            trend: "+14.2%",
            icon: MdAccountBalanceWallet,
            color: "primary",
          },
          {
            label: "Pending Requests",
            value: payouts.filter(p => p.status === 'Processing').length,
            trend: "Action Required",
            icon: MdPending,
            color: "amber",
          },
          {
            label: "Avg. Processing Time",
            value: "4.2 Hours",
            trend: "-1.5h improvement",
            icon: MdTrendingUp,
            color: "emerald",
          },
          {
            label: "Tax Reserve (YTD)",
            value: "$42,800",
            trend: "10% of gross",
            icon: MdHistory,
            color: "slate",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2 rounded-lg ${
                  kpi.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : kpi.color === "amber"
                    ? "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : kpi.color === "emerald"
                    ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <kpi.icon className="text-2xl" />
              </div>
              <span className="text-[10px] font-black bg-slate-100 dark:bg-background-dark px-2 py-1 rounded-full text-slate-500 uppercase tracking-wider">
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
              {kpi.label}
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {kpi.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payout Requests</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter requests..."
                  className="bg-slate-100 dark:bg-surface-dark border-none rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary/30 w-48 text-slate-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="bg-slate-100 dark:bg-surface-dark border-none rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 outline-none focus:ring-1 focus:ring-primary/30"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Request ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Lawyer Info
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Method
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                  {filteredPayouts.length > 0 ? (
                    filteredPayouts.map((payout) => (
                      <tr
                        key={payout.id}
                        className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors group"
                      >
                        <td className="px-6 py-4 text-sm font-bold text-slate-400">{payout.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={payout.image}
                              alt=""
                              className="size-8 rounded-full ring-2 ring-slate-100 dark:ring-border-dark"
                            />
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {payout.lawyer}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                {payout.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                          {payout.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            {payout.method}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                              payout.status === "Completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20"
                                : payout.status === "Processing"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20"
                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20"
                            }`}
                          >
                            {payout.status === "Completed" ? (
                              <MdCheckCircle />
                            ) : payout.status === "Processing" ? (
                              <MdPending />
                            ) : (
                              <MdError />
                            )}
                            {payout.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors font-bold">
                              <MdVisibility className="text-lg" />
                            </button>
                            {payout.status === "Processing" && (
                              <button 
                                onClick={() => handleUpdateStatus(payout.id, "Completed")}
                                className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-bold"
                              >
                                <MdCheckCircle className="text-lg" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                        No payout requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 dark:bg-surface-dark p-6 rounded-2xl text-white shadow-xl shadow-slate-200 dark:shadow-none relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1">Quick Process</h3>
              <p className="text-slate-400 text-xs mb-6">Manually process a specific payout.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">
                    Lawyer ID or Email
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none"
                    placeholder="e.g. j.doe@law.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">
                    Amount to Release
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-primary outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-bold">
                  Initiate Payout
                  <MdArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
