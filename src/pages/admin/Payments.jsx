import React, { useState } from "react";
import {
  MdPayments,
  MdTrendingUp,
  MdHistory,
  MdSettings,
  MdDownload,
  MdSearch,
  MdFilterList,
  MdCheckCircle,
  MdPending,
  MdError,
} from "react-icons/md";

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: "TR-9401",
      user: "David Chen",
      lawyer: "Sarah Jenkins",
      amount: "$150.00",
      status: "Successful",
      date: "Oct 12, 2023",
      method: "Visa •••• 4242",
    },
    {
      id: "TR-9398",
      user: "Michael Scott",
      lawyer: "Jonathan Doe",
      amount: "$320.00",
      status: "Successful",
      date: "Oct 11, 2023",
      method: "Mastercard •••• 8812",
    },
    {
      id: "TR-9395",
      user: "Robert Wilson",
      lawyer: "Sarah Jenkins",
      amount: "$85.00",
      status: "Failed",
      date: "Oct 10, 2023",
      method: "Visa •••• 1121",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & High-Level Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            Revenue Control
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Payments & Commissions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Managing global transactions and platform revenue share.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm font-bold">
            <MdDownload className="text-xl" />
            Export Monthly Report
          </button>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Gross Revenue",
            value: "$124,500",
            trend: "+12.5%",
            icon: MdPayments,
            color: "primary",
          },
          {
            label: "Platform Comm.",
            value: "$18,675",
            trend: "15% fixed rate",
            icon: MdTrendingUp,
            color: "emerald",
          },
          {
            label: "Pending Clearance",
            value: "$4,200",
            trend: "12 transactions",
            icon: MdHistory,
            color: "amber",
          },
          {
            label: "Failure Rate",
            value: "0.84%",
            trend: "-0.2% improvement",
            icon: MdSettings,
            color: "rose",
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
                    : kpi.color === "emerald"
                    ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : kpi.color === "amber"
                    ? "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Transaction Feed */}
        <div className="xl:col-span-12 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transactions History</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter transactions..."
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
                <option value="Successful">Successful</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Trans. ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      User
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Lawyer
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors group"
                      >
                        <td className="px-6 py-4 text-sm font-bold text-slate-400">
                          {payment.id}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {payment.user}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {payment.lawyer}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                              payment.status === "Successful"
                                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20"
                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20"
                            }`}
                          >
                            {payment.status === "Successful" ? (
                              <MdCheckCircle />
                            ) : (
                              <MdError />
                            )}
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors">
                              <MdHistory className="text-lg" />
                            </button>
                            <button className="p-1.5 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors font-bold">
                              Refund
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                        No transactions found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
