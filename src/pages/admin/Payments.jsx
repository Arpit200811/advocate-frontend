import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";

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
  MdSearchOff,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useData } from "../../context/DataContext";
import { exportToCSV } from "../../utils/exportHelper";

const Payments = () => {
  const { payments, setPayments, refundPayment } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRefund = (id) => {
    Swal.fire({
      title: "Process Refund?",
      text: `Are you sure you want to refund transaction ${id}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Process Refund",
    }).then((result) => {
      if (result.isConfirmed) {
        refundPayment(id);
        Swal.fire({
          title: "Refund Processed",
          text: "The transaction has been successfully refunded.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      (payment.user || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.lawyer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.id || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter || (statusFilter === "Refunded" && payment.status === "Refunded");
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const [stats, setStats] = useState({
    grossRevenue: 0,
    platformComm: 0,
    pendingClearance: 0,
    failureRate: "0.00",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/payments/stats');
        setStats(data);
      } catch (err) {
        console.error("Error fetching payment stats", err);
      }
    };
    fetchStats();
  }, []);

  const grossRevenue = stats.grossRevenue;
  const platformComm = stats.platformComm;
  const pendingClearance = stats.pendingClearance;
  const failureRate = stats.failureRate;

  const handleExportCSV = () => {
    const exportData = filteredPayments.map(p => ({
      TransactionID: p.id,
      User: p.user,
      Lawyer: p.lawyer,
      Amount: p.amount,
      Status: p.status,
      Date: p.date
    }));

    exportToCSV(exportData, `payments_export_${new Date().toISOString().split('T')[0]}.csv`);

    Swal.fire({
      title: "Exported!",
      text: `${filteredPayments.length} transactions exported to CSV.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#2a2839] transition-colors shadow-sm"
          >
            <MdDownload className="text-xl" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Gross Revenue",
            value: `₹${grossRevenue.toLocaleString('en-IN')}`,
            trend: "+12.5%",
            icon: MdPayments,
            color: "primary",
          },
          {
            label: "Platform Comm.",
            value: `₹${platformComm.toLocaleString('en-IN')}`,
            trend: "15% fixed rate",
            icon: MdTrendingUp,
            color: "emerald",
          },
          {
            label: "Pending Clearance",
            value: `₹${pendingClearance.toLocaleString('en-IN')}`,
            trend: `${payments.filter(p => p.status === 'Pending').length} transactions`,
            icon: MdHistory,
            color: "amber",
          },
          {
            label: "Failure Rate",
            value: `${failureRate}%`,
            trend: "-0.2% improvement",
            icon: MdSettings,
            color: "rose",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm transform hover:scale-[1.02] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2 rounded-lg ${kpi.color === "primary"
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
              <span className="text-[10px] font-black bg-slate-100 dark:bg-[#252533] px-2 py-1 rounded-full text-slate-500 dark:text-[#9f9db9] uppercase tracking-wider">
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium mb-1">
              {kpi.label}
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {kpi.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-12 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaction History</h3>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="text"
                  placeholder="Filter..."
                  className="bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary w-full sm:w-48 text-slate-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <select
                className="bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg px-3 py-2 text-xs font-bold text-slate-600 dark:text-[#9f9db9] outline-none focus:ring-1 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Successful">Successful</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#252533] border-b border-slate-200 dark:border-[#3d3b54]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                      Trans. ID
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                      User
                    </th>
                    <th className="hidden sm:table-cell px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                      Lawyer
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                      Status
                    </th>
                    <th className="hidden lg:table-cell px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
                  {paginatedPayments.length > 0 ? (
                    paginatedPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="hover:bg-slate-50 dark:hover:bg-[#252533] transition-colors group"
                      >
                        <td className="px-6 py-4 text-[10px] font-black text-slate-400 tracking-wider">
                          {payment.id}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                            {payment.user}
                          </p>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4">
                          <p className="text-sm font-medium text-slate-500 dark:text-[#9f9db9]">
                            {payment.lawyer}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${payment.status === "Successful"
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
                        <td className="hidden lg:table-cell px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#9f9db9]">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-slate-100 dark:bg-[#2a2839] rounded-lg text-slate-500 hover:text-primary transition-colors">
                              <MdHistory className="text-lg" />
                            </button>
                            <button
                              onClick={() => handleRefund(payment.id)}
                              className="p-1.5 bg-slate-100 dark:bg-[#2a2839] rounded-lg text-slate-500 hover:text-red-500 transition-colors font-bold text-xs uppercase"
                            >
                              Refund
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center opacity-40">
                          <MdSearchOff className="text-6xl text-slate-300 dark:text-[#3d3b54] mb-4" />
                          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">No transactions found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-[#252533] border-t border-slate-200 dark:border-[#3d3b54] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-500 dark:text-[#9f9db9] tracking-widest">Rows:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg text-xs font-bold px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500 dark:text-[#9f9db9]">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-[#3d3b54] rounded-md transition-colors disabled:opacity-30 text-slate-400"
                    disabled={currentPage === 1}
                  >
                    <MdChevronLeft className="text-2xl" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-[#3d3b54] rounded-md transition-colors disabled:opacity-30 text-slate-600 dark:text-slate-300"
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <MdChevronRight className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
