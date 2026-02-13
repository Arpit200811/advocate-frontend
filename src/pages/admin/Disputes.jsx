import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  MdSearch,
  MdFilterList,
  MdGavel,
  MdMessage,
  MdAttachFile,
  MdCheckCircle,
  MdCancel,
  MdHistory,
  MdWarning,
  MdPerson,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const Disputes = () => {
  const { disputes, setDisputes } = useData();

  const [selectedDisputeId, setSelectedDisputeId] = useState(disputes?.[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Status");

  const selectedDispute = disputes.find(d => d.id === selectedDisputeId) || disputes?.[0] || null;

  const handleResolve = (id) => {
    Swal.fire({
      title: "Resolve Dispute?",
      text: `Are you sure you want to mark case ${id} as resolved?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      confirmButtonText: "Yes, Resolve",
    }).then((result) => {
      if (result.isConfirmed) {
        setDisputes((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: "Resolved" } : d))
        );
        Swal.fire("Success", "The case has been marked as resolved.", "success");
      }
    });
  };

  const handleRefund = (id, amount) => {
    Swal.fire({
      title: "Issue Refund?",
      text: `Confirm $${amount} refund for case ${id}. This will also mark the case as resolved.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Confirm Refund",
    }).then((result) => {
      if (result.isConfirmed) {
        setDisputes((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: "Resolved", refunded: true } : d))
        );
        Swal.fire("Refunded", "Refund has been processed and case resolved.", "success");
      }
    });
  };

  const filteredDisputes = disputes.filter(d => 
    d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!disputes || disputes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-background-dark -m-8 h-[calc(100vh-4rem)]">
        <MdGavel className="text-8xl text-slate-200 dark:text-[#3d3b54] mb-4" />
        <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest">No Disputes Filed</h2>
        <p className="text-slate-500 mt-2">The dispute resolution queue is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            Conflict Management
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Refunds & Dispute Resolution
          </h2>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Column: List */}
        <div className="w-1/3 flex flex-col gap-4 min-h-0 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 dark:border-border-dark">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary/30 text-slate-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === 'filter' ? null : 'filter')}
                  className={`p-2 rounded-lg border transition-all ${activeMenu === 'filter' ? 'bg-primary text-white border-primary' : 'bg-slate-50 dark:bg-background-dark text-slate-400 border-transparent hover:border-slate-300'}`}
                >
                  <MdFilterList className="text-lg" />
                </button>
                {activeMenu === 'filter' && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    {['All Status', 'Pending', 'In Progress', 'Resolved'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => {setStatusFilter(opt); setActiveMenu(null);}}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-border-dark/50">
            {filteredDisputes.map((dispute) => (
              <button
                key={dispute.id}
                onClick={() => setSelectedDisputeId(dispute.id)}
                className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors relative group ${
                  selectedDisputeId === dispute.id ? "bg-primary/5 dark:bg-primary/10 border-r-4 border-primary" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase">{dispute.id}</span>
                  <span className={`text-[10px] font-black uppercase ${
                    dispute.priority === 'High' ? 'text-rose-500' : 'text-slate-400'
                  }`}>
                    {dispute.priority} Priority
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 truncate">
                  {dispute.subject}
                </h4>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {dispute.user} vs {dispute.lawyer}
                  </p>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{dispute.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center/Right: Case Details */}
        <div className="flex-1 flex flex-col gap-6 min-h-0 overflow-y-auto pb-4">
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100 dark:border-border-dark">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{selectedDispute.subject}</h3>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <MdPerson className="text-primary" /> {selectedDispute.user} (Client)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <MdGavel className="text-primary" /> {selectedDispute.lawyer} (Lawyer)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  selectedDispute.status === 'Resolved' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-amber-100 text-amber-700 border-amber-200'
                }`}>
                  {selectedDispute.status}
                </span>
                <p className="text-xl font-black text-primary mt-2">{selectedDispute.amount}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] mb-3">Case Description</p>
                <div className="bg-slate-50 dark:bg-background-dark/50 p-4 rounded-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-border-dark/50">
                  {selectedDispute.description}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] mb-3">Resolution Evidence</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                      <MdAttachFile className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">call_log_oct12.pd</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">2.4 MB • PDF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Final Resolution</h3>
            <div className="space-y-4">
              <textarea 
                className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/30 outline-none min-h-[100px] text-slate-900 dark:text-white placeholder:text-slate-400"
                placeholder="Enter internal resolution notes..."
              ></textarea>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleResolve(selectedDispute.id)}
                  disabled={selectedDispute.status === "Resolved"}
                  className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <MdCheckCircle className="text-xl" />
                  Resolve Case
                </button>
                <button 
                  onClick={() => handleRefund(selectedDispute.id, selectedDispute.amount)}
                  disabled={selectedDispute.status === "Resolved"}
                  className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <MdCancel className="text-xl" />
                  Issue Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disputes;
