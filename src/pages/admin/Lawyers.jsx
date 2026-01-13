import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdSearch,
  MdFilterList,
  MdMail,
  MdVisibility,
  MdVerified,
  MdCheckCircle,
  MdBlock,
  MdDownload,
  MdAdd,
} from "react-icons/md";
import { initialLawyers } from "../../data/mockData";

const Lawyers = () => {
  const [lawyers, setLawyers] = useState(initialLawyers);
  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const specializations = [
    "All",
    ...new Set(initialLawyers.map((l) => l.specialization)),
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec =
      specializationFilter === "All" ||
      lawyer.specialization === specializationFilter;
    const matchesStatus =
      statusFilter === "All" || lawyer.status === statusFilter;
    return matchesSearch && matchesSpec && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Lawyers Directory
          </h2>
          <p className="text-slate-500 text-sm">
            Managing <span className="text-primary font-bold">{lawyers.filter(l => l.status === 'Approved').length}</span> active legal professionals
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <MdDownload className="text-lg" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <MdAdd className="text-lg" />
            Add New Lawyer
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search by name, email, or specialty..."
            className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select
            className="bg-slate-50 dark:bg-background-dark border-none rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/30"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          <select
            className="bg-slate-50 dark:bg-background-dark border-none rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/30"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending Review">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Lawyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="relative">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="size-16 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-background-dark"
                    />
                    {lawyer.status === "Approved" && (
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white size-5 rounded-full flex items-center justify-center border-2 border-white dark:border-surface-dark">
                        <MdVerified className="text-xs" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      lawyer.status === "Approved"
                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                        : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                    }`}
                  >
                    {lawyer.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {lawyer.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
                  {lawyer.specialization} • {lawyer.experience} Exp.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-50 dark:border-border-dark">
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      Rating
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      ⭐ {lawyer.rating}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      Revenue
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {lawyer.revenue}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    to="/admin/lawyers/verify"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-background-dark hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    <MdVisibility />
                    View Profile
                  </Link>
                  <button className="flex size-10 items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all font-bold">
                    <MdMail />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white dark:bg-surface-dark rounded-2xl border border-dashed border-slate-300 dark:border-border-dark">
            <p className="text-slate-500 font-bold">No lawyers found matching the criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lawyers;
