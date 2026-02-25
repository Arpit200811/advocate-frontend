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
  MdBarChart
} from "react-icons/md";
import { useData } from "../../context/DataContext";
import { exportToCSV } from "../../utils/exportHelper";

const Lawyers = () => {
<<<<<<< HEAD
  const { lawyers, updateLawyer } = useData();
  const [activeFilter, setActiveFilter] = useState(null);
=======
  const { lawyers, updateLawyer, onboardLawyer, deleteLawyer, getLawyerPerformance, sendSystemMessage, categories, stats } = useData();

  const [activeFilter, setActiveFilter] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
  const [filters, setFilters] = useState({
    availability: "All",
    practiceArea: "Corporate",
    rating: "4.5+",
    earnings: "High to Low"
  });
<<<<<<< HEAD
  // Using a local state for performance reviews as they are mostly static for now
=======

>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
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
    String(lawyer.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(lawyer.specialization || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLawyers.length / rowsPerPage);
  const paginatedLawyers = filteredLawyers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const activeCount = lawyers.filter(l => l.status === 'Approved').length;
  const avgResponse = lawyers.length > 0 ? (lawyers.reduce((acc, curr) => acc + (curr.responseRate || 0), 0) / lawyers.length).toFixed(1) : 0;

  const totalRev = stats.totalRevenue || 0;

  const handleExportCSV = () => {
    const exportData = filteredLawyers.map(l => ({
      ID: l.id,
      Name: l.name,
      Specialization: l.specialization,
      Rating: l.rating,
      Experience: l.experience,
      Status: l.status,
      Revenue: l.revenue
    }));

    exportToCSV(exportData, `lawyers_export_${new Date().toISOString().split('T')[0]}.csv`);

    Swal.fire({
      title: "Exported!",
      text: `${filteredLawyers.length} lawyers exported to CSV.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const showPerformance = async (lawyer) => {
    Swal.fire({
      title: 'Loading Insights...',
      didOpen: () => Swal.showLoading()
    });

    const data = await getLawyerPerformance(lawyer.id);

    if (!data) {
      Swal.fire('Error', 'Could not fetch performance data.', 'error');
      return;
    }

    Swal.fire({
      title: `Performance: ${lawyer.name}`,
      html: `
        <div class="text-left space-y-4 p-4">
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Total Consultations:</span>
            <span class="text-primary font-black">${data.totalConsultations}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Avg. Rating:</span>
            <span class="text-amber-500 font-black">${data.avgRating} ⭐</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Response Rate:</span>
            <span class="text-green-500 font-black">${data.responseRate}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Platform Revenue Generated:</span>
            <span class="font-black text-primary">${data.revenue}</span>
          </div>
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#197fe6'
    });
  };

  const handleDeleteLawyer = (lawyer) => {
    Swal.fire({
      title: 'Delete Lawyer?',
      text: `Are you sure you want to permanently delete ${lawyer.name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLawyer(lawyer.id);
        Swal.fire('Deleted', 'Lawyer has been removed from the platform.', 'success');
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden -m-4 md:-m-8 h-[calc(100vh-4rem)]">
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
            onClick={() => {
              const categoryOptions = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
              Swal.fire({
                title: 'Onboard Professional',
                html:
                  '<input id="onboard-name" class="swal2-input" placeholder="Full Name">' +
                  '<input id="onboard-email" class="swal2-input" placeholder="Email">' +
                  '<input id="onboard-pass" type="password" class="swal2-input" placeholder="Temporary Password">' +
                  '<input id="onboard-spec" class="swal2-input" placeholder="Specialization">' +
                  '<input id="onboard-price" type="number" class="swal2-input" placeholder="Hourly Fee">' +
                  `<select id="onboard-cat" class="swal2-input"><option value="">Select Category</option>${categoryOptions}</select>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonColor: '#197fe6',
                preConfirm: () => {
                  return {
                    name: document.getElementById('onboard-name').value,
                    email: document.getElementById('onboard-email').value,
                    password: document.getElementById('onboard-pass').value,
                    specialization: document.getElementById('onboard-spec').value,
                    price: document.getElementById('onboard-price').value,
                    categoryId: document.getElementById('onboard-cat').value
                  }
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  onboardLawyer(result.value);
                  Swal.fire('Success', 'Professional onboarded', 'success');
                }
              })
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <MdAdd className="text-lg" />
            <span className="hidden lg:inline">Onboard</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-background-dark">
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
              <h3 className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">₹{totalRev >= 1000 ? (totalRev / 1000).toFixed(1) + 'k' : totalRev.toLocaleString('en-IN')}</h3>
              <span className="text-rose-500 text-sm font-bold flex items-center mb-1 gap-1">
                <MdTrendingDown className="text-sm" /> -2%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] overflow-hidden shadow-sm transition-all duration-300">
          <div className="p-4 border-b border-slate-200 dark:border-border-dark flex flex-wrap gap-3 items-center bg-slate-50/50 dark:bg-background-dark/30">
<<<<<<< HEAD
            {/* Availability Filter */}
            <div className="relative">
              <button 
=======
            <div className="relative">
              <button
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                onClick={() => setActiveFilter(activeFilter === 'availability' ? null : 'availability')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${activeFilter === 'availability' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                Availability: {filters.availability}
                <MdExpandMore className={`text-sm transition-transform duration-300 ${activeFilter === 'availability' ? 'rotate-180' : ''}`} />
              </button>
              {activeFilter === 'availability' && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[70] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {['All', 'Online', 'Away', 'Offline'].map(opt => (
<<<<<<< HEAD
                    <button 
                      key={opt}
                      onClick={() => {setFilters({...filters, availability: opt}); setActiveFilter(null);}}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Practice Area Filter */}
            <div className="relative">
              <button 
                onClick={() => setActiveFilter(activeFilter === 'practice' ? null : 'practice')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${activeFilter === 'practice' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                Practice Area: {filters.practiceArea}
                <MdExpandMore className={`text-sm transition-transform duration-300 ${activeFilter === 'practice' ? 'rotate-180' : ''}`} />
              </button>
              {activeFilter === 'practice' && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[70] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {['Corporate', 'Family', 'Criminal', 'IP'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {setFilters({...filters, practiceArea: opt}); setActiveFilter(null);}}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <button 
                onClick={() => setActiveFilter(activeFilter === 'rating' ? null : 'rating')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${activeFilter === 'rating' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                Rating: {filters.rating}
                <MdExpandMore className={`text-sm transition-transform duration-300 ${activeFilter === 'rating' ? 'rotate-180' : ''}`} />
              </button>
              {activeFilter === 'rating' && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[70] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {['4.5+', '4.0+', '3.5+', 'All Ratings'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {setFilters({...filters, rating: opt}); setActiveFilter(null);}}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Earnings Filter */}
            <div className="relative">
              <button 
                onClick={() => setActiveFilter(activeFilter === 'earnings' ? null : 'earnings')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${activeFilter === 'earnings' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-background-dark text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                Earnings: {filters.earnings}
                <MdExpandMore className={`text-sm transition-transform duration-300 ${activeFilter === 'earnings' ? 'rotate-180' : ''}`} />
              </button>
              {activeFilter === 'earnings' && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[70] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {['High to Low', 'Low to High'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {setFilters({...filters, earnings: opt}); setActiveFilter(null);}}
=======
                    <button
                      key={opt}
                      onClick={() => { setFilters({ ...filters, availability: opt }); setActiveFilter(null); }}
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              Showing {filteredLawyers.length} of {lawyers.length}
            </div>
          </div>

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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={lawyer.image || 'https://via.placeholder.com/150'}
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
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${lawyer.onlineStatus === 'Online' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                          lawyer.onlineStatus === 'Away' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                            'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${lawyer.onlineStatus === 'Online' ? 'bg-emerald-500' :
                            lawyer.onlineStatus === 'Away' ? 'bg-amber-500' : 'bg-slate-500'
                            }`}></span>
                          {lawyer.onlineStatus || 'Offline'}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        <div className="flex items-center gap-1">
                          <MdStar className="text-amber-400 text-lg fill-current" />
                          <span className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">{lawyer.rating}</span>
                          <span className="text-[10px] text-slate-400 font-black">({lawyer.reviews || 0})</span>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 text-center">
                        <div className="text-sm font-black tabular-nums text-slate-900 dark:text-white">{lawyer.revenue || '$0'}</div>
                      </td>
                      <td className="hidden xl:table-cell px-6 py-4">
                        <div className="w-32">
                          <div className="flex justify-between text-[10px] mb-1 font-black uppercase tracking-widest text-slate-600 dark:text-[#9f9db9]">
                            <span>{lawyer.responseRate || 0}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-[#252533] h-1.5 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-1000"
                              style={{ width: `${lawyer.responseRate || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 relative">
                          <button
                            onClick={() => showPerformance(lawyer)}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="View Performance"
                          >
                            <MdInsights className="text-xl" />
                          </button>
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: `Message to ${lawyer.name}`,
                                input: 'textarea',
                                inputPlaceholder: 'Type your message here...',
                                showCancelButton: true,
                                confirmButtonColor: '#197fe6',
                                preConfirm: (text) => {
                                  if (!text) {
                                    Swal.showValidationMessage('Message cannot be empty');
                                  }
                                  return text;
                                }
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  sendSystemMessage(lawyer.user?.id || lawyer.userId, result.value);
                                  Swal.fire('Sent', 'Your message has been delivered.', 'success');
                                }
                              })
                            }}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Send Message"
                          >
                            <MdMail className="text-xl" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setActiveMenu(activeMenu === lawyer.id ? null : lawyer.id)}
                              className={`p-2 rounded-lg transition-colors ${activeMenu === lawyer.id ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            >
                              <MdMoreVert className="text-xl" />
                            </button>
                            {activeMenu === lawyer.id && (
                              <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                <button
                                  onClick={() => {
                                    setActiveMenu(null);
                                    Swal.fire({
                                      title: 'Edit Professional',
                                      html:
                                        `<input id="edit-name" class="swal2-input" placeholder="Full Name" value="${lawyer.name || ''}">` +
                                        `<input id="edit-email" class="swal2-input" placeholder="Email" value="${lawyer.user?.email || ''}">` +
                                        `<input id="edit-spec" class="swal2-input" placeholder="Specialization" value="${lawyer.specialization || ''}">` +
                                        `<input id="edit-price" type="number" class="swal2-input" placeholder="Hourly Fee" value="${lawyer.price || ''}">`,
                                      focusConfirm: false,
                                      showCancelButton: true,
                                      confirmButtonColor: '#197fe6',
                                      preConfirm: () => {
                                        return {
                                          name: document.getElementById('edit-name').value,
                                          email: document.getElementById('edit-email').value,
                                          specialization: document.getElementById('edit-spec').value,
                                          price: document.getElementById('edit-price').value
                                        }
                                      }
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        updateLawyer(lawyer.id, result.value);
                                        Swal.fire('Success', 'Profile updated', 'success');
                                      }
                                    })
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                                >
                                  Quick Edit
                                </button>
                                <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                                <button
                                  onClick={() => {
                                    setActiveMenu(null);
                                    handleDeleteLawyer(lawyer);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                                >
                                  Delete Profile
                                </button>
                              </div>
                            )}
                          </div>
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
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#252533] border-t border-slate-200 dark:border-[#3d3b54] flex items-center justify-between">
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

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
          <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <MdPriorityHigh className="text-primary text-xl" />
                Performance Review Required
              </h4>
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
                  <button onClick={() => showPerformance(review)} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">Review</button>
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
              <button
                onClick={() => {
                  Swal.fire({
                    title: 'System Broadcast',
                    text: 'Send this announcement to all active lawyers?',
                    input: 'textarea',
                    inputPlaceholder: 'Message for all professionals...',
                    showCancelButton: true,
                    confirmButtonColor: '#197fe6',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      lawyers.forEach(l => {
                        sendSystemMessage(l.user?.id || l.userId, result.value);
                      });
                      Swal.fire('Broadcast Sent', `Notification delivered to ${lawyers.length} lawyers.`, 'success');
                    }
                  })
                }}
                className="bg-primary text-white text-[10px] px-2.5 py-1 rounded font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20"
              >
                Broadcast
              </button>
            </div>
            <div className="space-y-4">
              <div className="text-sm p-4 rounded-xl border border-dashed border-slate-300 dark:border-[#3d3b54] bg-slate-50/50 dark:bg-[#252533]/50 transition-all duration-300 group hover:border-primary/50">
                <p className="text-slate-600 dark:text-[#9f9db9] text-xs leading-relaxed font-bold tracking-tight">Send a platform-wide update to all active lawyers regarding the upcoming tax reporting changes.</p>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'System Announcement',
                      input: 'textarea',
                      inputValue: 'Platform Update: New tax reporting features are now live...',
                      showCancelButton: true,
                      confirmButtonColor: '#197fe6',
                    }).then(res => {
                      if (res.isConfirmed) {
                        lawyers.forEach(l => {
                          sendSystemMessage(l.user?.id || l.userId, res.value);
                        });
                        Swal.fire('Sent', 'Announcement published.', 'success');
                      }
                    })
                  }}
                  className="mt-3 text-primary font-black text-xs flex items-center gap-1 hover:gap-2 transition-all duration-300 uppercase tracking-widest"
                >
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
