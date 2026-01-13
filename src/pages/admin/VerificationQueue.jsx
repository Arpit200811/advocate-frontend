import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdSearch,
  MdFilterList,
  MdCheckCircle,
  MdCancel,
  MdVisibility,
  MdHistory,
  MdVerifiedUser,
} from "react-icons/md";
import { initialLawyers } from "../../data/mockData";

const VerificationQueue = () => {
  const [lawyers, setLawyers] = useState(initialLawyers.filter(l => l.status === "Pending Review" || l.status === "Approved" || l.status === "Rejected"));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending Review");

  const handleUpdateStatus = (id, newStatus) => {
    setLawyers((prev) =>
      prev.map((lawyer) =>
        lawyer.id === id ? { ...lawyer, status: newStatus } : lawyer
      )
    );
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || lawyer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Reviewing professional credentials of <span className="text-primary font-bold">{lawyers.filter(l => l.status === "Pending Review").length}</span> lawyers awaiting approval.
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
              <tr className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Lawyer Details
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Specialization
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                  Applied Date
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
              {filteredLawyers.length > 0 ? (
                filteredLawyers.map((lawyer) => (
                  <tr
                    key={lawyer.id}
                    className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={lawyer.image}
                          alt=""
                          className="size-10 rounded-full ring-2 ring-slate-100 dark:ring-border-dark"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {lawyer.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            ID: LAW-{lawyer.id}249
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {lawyer.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">
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
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to="/admin/lawyers/verify"
                          className="p-2 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors"
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
                            className="p-2 bg-slate-100 dark:bg-background-dark rounded-lg text-slate-500 hover:text-primary transition-colors"
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
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    No applications found matching your search.
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

export default VerificationQueue;
