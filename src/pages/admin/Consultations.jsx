import React, { useState } from "react";
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdVisibility,
  MdHistory,
  MdCalendarToday,
} from "react-icons/md";
import { useData } from "../../context/DataContext";
<<<<<<< HEAD
=======
import { exportToCSV } from "../../utils/exportHelper";
import Swal from "sweetalert2";
import api from "../../services/api";
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)

const Consultations = () => {
  const { consultations } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredConsultations = consultations.filter((session) => {
    const matchesSearch =
      String(session.client || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(session.lawyer || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(session.id || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const exportData = filteredConsultations.map(s => ({
      SessionID: s.id,
      Client: s.client,
      Lawyer: s.lawyer,
      Date: s.date,
      Duration: s.duration,
      Status: s.status,
      Fee: s.amount
    }));
    exportToCSV(exportData, `consultations_log_${new Date().toISOString().split('T')[0]}.csv`);
    Swal.fire({ title: "Exported!", text: `${filteredConsultations.length} records exported.`, icon: "success", timer: 1500, showConfirmButton: false });
  };

  const handleViewDetails = (session) => {
    Swal.fire({
      title: 'Consultation Overview',
      html: `
        <div class="text-left space-y-3">
          <div class="flex justify-between border-b pb-2"><span class="font-bold">ID:</span><span class="font-mono text-xs">${session.id}</span></div>
          <div class="flex justify-between border-b pb-2"><span class="font-bold">Client:</span><span>${session.client}</span></div>
          <div class="flex justify-between border-b pb-2"><span class="font-bold">Lawyer:</span><span>${session.lawyer}</span></div>
          <div class="flex justify-between border-b pb-2"><span class="font-bold">Date:</span><span>${session.date}</span></div>
          <div class="flex justify-between border-b pb-2"><span class="font-bold">Duration:</span><span>${session.duration}</span></div>
          <div class="flex justify-between border-b pb-2"><span class="font-bold">Fee:</span><span class="font-bold text-slate-800">${session.amount}</span></div>
          <div class="flex justify-between border-b pb-2"><span class="font-bold">Status:</span><span class="font-bold uppercase text-[10px] ${session.status === 'Completed' ? 'text-green-600' : 'text-slate-600'}">${session.status}</span></div>
        </div>
      `,
      confirmButtonColor: '#197fe6',
      confirmButtonText: 'Close'
    });
  };

  const handleViewHistory = async (session) => {
    Swal.fire({
      title: 'Session Audit Trail',
      text: 'Fetching logs...',
      didOpen: () => Swal.showLoading()
    });

    try {
      const { data } = await api.get(`/admin/appointments/${session.id}/history`);

      const historyHtml = data.map((log, index) => {
        const isFirst = index === 0;
        return `
          <div class="border-l-2 ${isFirst ? 'border-primary' : 'border-slate-200'} pl-4 relative mb-4">
            <div class="absolute w-2 h-2 rounded-full ${isFirst ? 'bg-primary' : 'bg-slate-300'} -left-[5px] top-1.5"></div>
            <p class="font-bold ${isFirst ? 'text-slate-800' : 'text-slate-600'}">${log.action} - <span class="uppercase text-[10px]">${log.status}</span></p>
            <p class="text-xs text-slate-500">${new Date(log.date).toLocaleString()} • System</p>
          </div>
        `;
      }).join('');

      Swal.fire({
        title: `Audit Trail: ${session.id}`,
        html: `
          <div class="text-left space-y-2 text-sm max-h-[400px] overflow-y-auto pr-2 mt-4">
            ${historyHtml}
          </div>
        `,
        confirmButtonColor: '#197fe6',
        confirmButtonText: 'Done'
      });
    } catch (e) {
      Swal.fire('Error', 'Could not fetch history.', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            Audit Tracking
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Consultations Log
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Historical record of <span className="text-primary font-bold">{consultations.length.toLocaleString()}</span> completed and scheduled legal sessions.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <MdDownload className="text-xl" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search by client, lawyer, or ID..."
              className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="bg-slate-50 dark:bg-background-dark border-none rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/30"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Session ID
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Client
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Lawyer
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-right">
                  Fee
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((session) => (
                  <tr
                    key={session.id}
                    className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-slate-400">
                      {session.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {session.client}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {session.lawyer}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <MdCalendarToday className="text-primary" />
                        {session.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${session.status === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20"
                          : session.status === "Scheduled"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20"
                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20"
                          }`}
                      >
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-black text-slate-900 dark:text-white">
                      {session.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleViewDetails(session)} className="p-2 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors">
                          <MdVisibility className="text-xl" />
                        </button>
                        <button onClick={() => handleViewHistory(session)} className="p-2 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors">
                          <MdHistory className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <MdSearch className="text-6xl text-slate-300 dark:text-[#3d3b54] mb-4" />
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">No matching consultations found</p>
<<<<<<< HEAD
                      <button 
                        onClick={() => {setSearchQuery(""); setStatusFilter("All");}}
=======
                      <button
                        onClick={() => { setSearchQuery(""); setStatusFilter("All"); }}
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                        className="mt-4 text-xs font-bold text-primary hover:underline"
                      >
                        Reset search filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Consultations;
