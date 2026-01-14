import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  MdSearch,
  MdDownload,
  MdAdd,
  MdTrendingUp,
  MdTrendingDown,
  MdExpandMore,
  MdStar,
  MdInsights,
  MdMail,
  MdMoreVert,
  MdChevronLeft,
  MdChevronRight,
  MdPriorityHigh,
  MdForum,
  MdArrowForward,
  MdSearchOff,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const Lawyers = () => {
  const { lawyers, updateLawyer } = useData();
  // Using a local state for performance reviews as they are mostly static for now
  const performanceReviews = [
    {
      id: 1,
      name: "James Wilson",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuClpPCDGrIOAflCpZkjEiY2c26GlbUNBZ-QD3FRM2tFiggveX75C5i4z-CPIJxgEC_ZPEEE83e0kBqlS-TuNIyv3x0ZQ4y_e4ldgusBlhKE_weCY4V0YTFYYN2ShQ6HUedrruDZHtVGkekLoGvK8MOGNSbYmjtc1FRC0G5PUJELCJOE7VlILyPp2tFXsMJ3cLh6WR-7uakp-ZNl4UhnzGvv-ClVwMBb5Ie8H-FjNKAbdxWBudDwY3saMKnUlg5or7UPXkIO_rtxRLmO",
      reason: "Rating dropped to 3.2",
    },
    {
      id: 2,
      name: "Linda Wu",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCb9nb53KEL91n2-aj2XZ2PPrrVvTV5dh_p7yH_MnZnTjDD8NEhgQqWgq2FDlV6m2zTBHpjGMgu45VYM9lsyrAjlbWp96dd6R9cCU0Q7fVg1bM6wfpvJSMstpQu5l-vFfQUcBacM8mmnwwBzmoWZQE0j5Dbhr8sqVGO03LFC2q8sKOAp-atzX4IDCjoStFc5coJc2GpBN3u7li61s1dFAugLIH5xH2At-_0Nf73xSBUj64l2j2pUS-BIuySkbdBYoCC0C7YkKKXhSJ",
      reason: "High Dispute Rate (12%)",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLawyers.length / rowsPerPage);
  const paginatedLawyers = filteredLawyers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const activeCount = lawyers.filter(l => l.status === 'Approved').length;
  const avgResponse = (lawyers.reduce((acc, curr) => acc + curr.responseRate, 0) / lawyers.length).toFixed(1);
  const totalRev = lawyers.reduce((acc, curr) => {
    const val = parseFloat(curr.revenue.replace('$', '').replace('M', '').replace('k', '')) || 0;
    return acc + val;
  }, 0);

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Specialization", "Rating", "Revenue", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredLawyers.map(l => `${l.id},${l.name},${l.specialization},${l.rating},${l.revenue},${l.onlineStatus}`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `lawyers_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    Swal.fire({
      title: "Exported!",
      text: `${filteredLawyers.length} lawyers exported to CSV.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: "#197fe6"
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden -m-4 md:-m-8 h-[calc(100vh-4rem)]">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-border-dark shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">Professionals</h2>
          <div className="relative w-64">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 dark:bg-[#1c1c27] border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-slate-100 dark:bg-[#2a2839] px-4 py-2 rounded-lg text-sm font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all text-slate-600 dark:text-[#9f9db9]"
          >
            <MdDownload className="text-lg" />
            <span className="hidden lg:inline">Export</span>
          </button>
          <button 
            onClick={() => Swal.fire({
              title: 'Onboard Professional',
              text: 'The automated onboarding portal is opening in a new tab.',
              icon: 'info',
              confirmButtonColor: '#197fe6'
            })}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <MdAdd className="text-lg" />
            <span className="hidden lg:inline">Onboard</span>
          </button>
        </div>
      </header>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-background-dark">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
            <p className="text-sm text-slate-500 dark:text-[#9f9db9] font-medium">Active Lawyers</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{activeCount}</h3>
              <span className="text-emerald-500 text-sm font-bold flex items-center mb-1 gap-1">
                <MdTrendingUp className="text-sm" /> +12%
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
            <p className="text-sm text-slate-500 dark:text-[#9f9db9] font-medium">Avg. Response Rate</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">{avgResponse}%</h3>
              <span className="text-emerald-500 text-sm font-bold flex items-center mb-1 gap-1">
                <MdTrendingUp className="text-sm" /> +3%
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
            <p className="text-sm text-slate-500 dark:text-[#9f9db9] font-medium">Estimated Revenue</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">${totalRev >= 1000 ? (totalRev/1000).toFixed(1) + 'M' : totalRev + 'k'}</h3>
              <span className="text-rose-500 text-sm font-bold flex items-center mb-1 gap-1">
                <MdTrendingDown className="text-sm" /> -2%
              </span>
            </div>
          </div>
        </div>

        {/* Filters & Table Section */}
        <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] overflow-hidden shadow-sm transition-all duration-300">
          {/* Table Header / Filters */}
          <div className="p-4 border-b border-slate-200 dark:border-border-dark flex flex-wrap gap-3 items-center bg-slate-50/50 dark:bg-background-dark/30">
            {["Availability: All", "Practice Area: Corporate", "Rating: 4.5+", "Earnings: High to Low"].map((filter) => (
              <button key={filter} className="flex items-center gap-2 bg-slate-100 dark:bg-background-dark px-3 py-1.5 rounded-lg text-sm font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all text-slate-600 dark:text-slate-300">
                {filter}
                <MdExpandMore className="text-sm" />
              </button>
            ))}
            <div className="flex-1"></div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              Showing {filteredLawyers.length} of 1,284
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#252533] text-slate-500 dark:text-[#9f9db9] text-[10px] font-black uppercase tracking-[0.15em]">
                  <th className="px-6 py-4">Lawyer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="hidden sm:table-cell px-6 py-4">Rating</th>
                  <th className="hidden lg:table-cell px-6 py-4 text-center">Earnings</th>
                  <th className="hidden xl:table-cell px-6 py-4">Response Rate</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
                {paginatedLawyers.length > 0 ? (
                  paginatedLawyers.map((lawyer) => (
                    <tr key={lawyer.id} className="hover:bg-slate-50 dark:hover:bg-[#252533] transition-colors group">
                      {/* Existing Lawyer Table Row Logic */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={lawyer.image} 
                            alt={lawyer.name} 
                            className="w-10 h-10 rounded-full object-cover bg-slate-200 border border-slate-100 dark:border-[#3d3b54] shadow-sm transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div>
                            <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight">{lawyer.name}</div>
                            <div className="text-[10px] text-primary font-black uppercase tracking-widest">{lawyer.specialization}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          lawyer.onlineStatus === 'Online' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                          lawyer.onlineStatus === 'Away' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                          'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            lawyer.onlineStatus === 'Online' ? 'bg-emerald-500' : 
                            lawyer.onlineStatus === 'Away' ? 'bg-amber-500' : 'bg-slate-500'
                          }`}></span>
                          {lawyer.onlineStatus}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        <div className="flex items-center gap-1">
                          <MdStar className="text-amber-400 text-lg fill-current" />
                          <span className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">{lawyer.rating}</span>
                          <span className="text-[10px] text-slate-400 font-black">({lawyer.reviews})</span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 text-center">
                        <div className="text-sm font-black tabular-nums text-slate-900 dark:text-white">{lawyer.revenue}</div>
                      </td>
                      <td className="hidden xl:table-cell px-6 py-4">
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] mb-1 font-black uppercase tracking-widest text-slate-600 dark:text-[#9f9db9]">
                            <span>{lawyer.responseRate}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-[#252533] h-1.5 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className="bg-primary h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${lawyer.responseRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 sm:opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="View Performance">
                            <MdInsights className="text-xl" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Send Message">
                            <MdMail className="text-xl" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Options">
                            <MdMoreVert className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center opacity-40">
                        <MdSearchOff className="text-6xl text-slate-300 dark:text-[#3d3b54] mb-4" />
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">No lawyers found</p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="mt-4 text-xs font-bold text-primary hover:underline"
                        >
                          Clear search query
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

        {/* Secondary Row: Performance Alerts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
          <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <MdPriorityHigh className="text-primary text-xl" />
                Performance Review Required
              </h4>
              <button className="text-primary text-xs font-bold hover:underline transition-all">View All</button>
            </div>
            <div className="space-y-4">
              {performanceReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-background-dark/40 border border-slate-100 dark:border-border-dark/30 hover:bg-white dark:hover:bg-background-dark/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{review.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">{review.reason}</p>
                    </div>
                  </div>
                  <button className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">Review</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white tracking-tight uppercase text-xs">
                <MdForum className="text-primary text-xl" />
                System Announcements
              </h4>
              <button className="bg-primary text-white text-[10px] px-2.5 py-1 rounded font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">Broadcast</button>
            </div>
            <div className="space-y-4">
              <div className="text-sm p-4 rounded-xl border border-dashed border-slate-300 dark:border-[#3d3b54] bg-slate-50/50 dark:bg-[#252533]/50 transition-all duration-300 group hover:border-primary/50">
                <p className="text-slate-600 dark:text-[#9f9db9] text-xs leading-relaxed font-bold tracking-tight">Send a platform-wide update to all active lawyers regarding the upcoming tax reporting changes and compliance updates.</p>
                <button className="mt-3 text-primary font-black text-xs flex items-center gap-1 hover:gap-2 transition-all duration-300 uppercase tracking-widest">
                  Compose Message <MdArrowForward className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;
