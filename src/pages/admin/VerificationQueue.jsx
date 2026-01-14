import React, { useState } from "react";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import {
  MdSearch,
  MdFilterList,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
  MdHistory,
  MdVerifiedUser,
  MdChevronLeft,
  MdChevronRight,
  MdSearchOff,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const VerificationQueue = () => {
  const { lawyers, updateLawyer } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending Review");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleUpdateStatus = (id, newStatus) => {
    const actionText = newStatus === "Approved" ? "Approve" : newStatus === "Rejected" ? "Reject" : "Reset";
    const icon = newStatus === "Approved" ? "success" : newStatus === "Rejected" ? "error" : "info";

    Swal.fire({
      title: `${actionText} Lawyer?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} this lawyer's application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Approved" ? "#22c55e" : newStatus === "Rejected" ? "#ef4444" : "#64748b",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: `Yes, ${actionText}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateLawyer(id, { status: newStatus });
        Swal.fire({
          title: "Update Complete",
          text: `Application has been ${newStatus.toLowerCase()}.`,
          icon: icon,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || lawyer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLawyers.length / rowsPerPage);
  const paginatedLawyers = filteredLawyers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            Compliance & Onboarding
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Verification Queue
          </h2>
          <p className="text-slate-500 dark:text-[#9f9db9] mt-1">
            Reviewing professional credentials of <span className="text-primary font-black">{lawyers.filter(l => l.status === "Pending Review").length}</span> lawyers awaiting approval.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white dark:bg-surface-dark px-4 py-2 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex items-center gap-3">
            <div className="size-2 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
              Avg. Review Time: 18h
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-slate-50 dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <select
            className="bg-slate-50 dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-[#9f9db9] outline-none focus:ring-2 focus:ring-primary/30"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Applications</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Verification Table */}
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#252533] border-b border-slate-200 dark:border-[#3d3b54]">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                  Lawyer Details
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                  Specialization
                </th>
                <th className="hidden lg:table-cell px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9]">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-[#9f9db9] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
              {paginatedLawyers.length > 0 ? (
                paginatedLawyers.map((lawyer) => (
                  <tr
                    key={lawyer.id}
                    className="hover:bg-slate-50 dark:hover:bg-[#252533] transition-colors group"
                  >
                    <td className="px-6 py-4 focus-within:ring-2 focus-within:ring-primary/20">
                      <div className="flex items-center gap-3">
                        <img
                          src={lawyer.image}
                          alt=""
                          className="size-10 rounded-full ring-2 ring-slate-100 dark:ring-[#3d3b54] object-cover"
                        />
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                            {lawyer.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            ID: LAW-{lawyer.id}249
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <span className="text-xs font-black text-primary uppercase tracking-widest">
                        {lawyer.specialization}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-widest">
                      Oct 12, 2023
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          lawyer.status === "Approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20"
                            : lawyer.status === "Pending Review"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20"
                        }`}
                      >
                        {lawyer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Link
                          to={`/admin/lawyers/verify/${lawyer.id}`}
                          className="p-2 bg-slate-100 dark:bg-[#2a2839] rounded-lg text-slate-500 dark:text-[#9f9db9] hover:text-primary transition-colors"
                          title="View Application"
                        >
                          <MdVisibility className="text-xl" />
                        </Link>
                        {lawyer.status === "Pending Review" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(lawyer.id, "Approved")}
                              className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 hover:bg-green-600 hover:text-white transition-all"
                              title="Approve"
                            >
                              <MdCheckCircle className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(lawyer.id, "Rejected")}
                              className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-all"
                              title="Reject"
                            >
                              <MdCancel className="text-xl" />
                            </button>
                          </>
                        )}
                        {lawyer.status !== "Pending Review" && (
                          <button
                            onClick={() => handleUpdateStatus(lawyer.id, "Pending Review")}
                            className="p-2 bg-slate-100 dark:bg-[#2a2839] rounded-lg text-slate-500 dark:text-[#9f9db9] hover:text-primary transition-colors"
                            title="Reset to Pending"
                          >
                            <MdHistory className="text-xl" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <MdSearchOff className="text-6xl text-slate-300 dark:text-[#3d3b54] mb-4" />
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Queue is empty</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
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
              <option value={20}>20</option>
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
  );
};

export default VerificationQueue;
