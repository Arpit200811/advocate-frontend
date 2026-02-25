import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  MdGavel,
  MdDashboard,
  MdGroup,
  MdBalance,
  MdChatBubble,
  MdPayments,
  MdSettings,
  MdSearch,
  MdNotifications,
  MdFileDownload,
  MdReviews,
  MdTrendingUp,
  MdTrendingDown,
  MdStar,
  MdInsights,
  MdArrowUpward,
  MdStarHalf,
  MdFilterList,
  MdFlag,
  MdPushPin,
  MdReport,
  MdArrowForward,
  MdClose,
  MdDelete,
} from "react-icons/md";
import { useData } from "../../context/DataContext";
import { exportToCSV } from "../../utils/exportHelper";

const Reviews = () => {
  const { reviews, updateReview, deleteReview, respondToReview } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [filter, setFilter] = useState("Newest First");
<<<<<<< HEAD
=======
  const [adminReplyText, setAdminReplyText] = useState("");

  const handleDeleteReview = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Review?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await deleteReview(id);
      Swal.fire('Deleted!', 'The review has been removed.', 'success');
    }
  };
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)

  const filteredReviews = reviews.filter(
    (review) =>
      review.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    // sort logic based on dropdown state
    if (filter === "Highest Rated") return b.rating - a.rating;
    if (filter === "Lowest Rated") return a.rating - b.rating;
    if (filter === "Sentiment (Low to High)") {
      const score = (s) => s === "Positive" ? 3 : s === "Neutral" ? 2 : 1;
      return score(a.sentiment) - score(b.sentiment);
    }
    // Newest First fallback
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() || b.id.localeCompare(a.id);
  });

  const handleExport = () => {
    const exportData = filteredReviews.map(r => ({
      ID: r.caseId,
      Lawyer: r.lawyer,
      Reviewer: r.reviewer.name,
      Rating: r.rating,
      Sentiment: r.sentiment,
      Date: r.timestamp,
      Comment: r.comment
    }));
    exportToCSV(exportData, `reviews_export_${new Date().toISOString().split('T')[0]}.csv`);
    Swal.fire({ title: "Exported!", text: "Reviews have been exported.", icon: "success", timer: 1500, showConfirmButton: false });
  };

  const handlePin = async (review) => {
    const isPinned = review.isPinned ? false : true; // Assuming we add isPinned to backend or state
    await updateReview(review.id, { isPinned });
    Swal.fire("Success", `Review has been ${isPinned ? 'pinned' : 'unpinned'}.`, "success");
  };

  const handleRespond = (review) => {
    setSelectedReview(review);
    setAdminReplyText(review.adminResponse || "");
    setShowModal(true);
  };

  const submitResponse = async () => {
    if (!adminReplyText.trim()) return;
    await respondToReview(selectedReview.id, adminReplyText);
    setShowModal(false);
    Swal.fire("Published!", "Your response has been saved.", "success");
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-background-dark -m-8 h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Top Nav */}
      <header className="h-16 border-b border-slate-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Review & Feedback Moderation</h2>
          <div className="max-w-md w-full ml-4">
            <div className="relative group">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl" />
              <input
                className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-white"
                placeholder="Search reviews, lawyers or keywords..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-lg relative">
            <MdNotifications className="text-2xl" />
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <MdFileDownload className="text-xl" />
            Export Report
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col gap-2 shadow-sm">
              <div className="flex justify-between items-start text-slate-500 dark:text-slate-400">
                <p className="text-sm font-medium uppercase tracking-wider">Total Reviews</p>
                <MdReviews className="text-xl" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">12,450</p>
                <span className="text-emerald-500 text-sm font-bold flex items-center">
                  <MdTrendingUp className="text-xs" /> 12%
                </span>
              </div>
              <p className="text-xs text-slate-500">+1,204 this month</p>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col gap-2 shadow-sm">
              <div className="flex justify-between items-start text-slate-500 dark:text-slate-400">
                <p className="text-sm font-medium uppercase tracking-wider">Avg. Platform Rating</p>
                <MdStar className="text-xl" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">4.7/5</p>
                <span className="text-emerald-500 text-sm font-bold flex items-center">
                  <MdArrowUpward className="text-xs" /> 0.2
                </span>
              </div>
              <div className="flex gap-1 text-amber-400 text-sm">
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStar />
                <MdStarHalf />
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col gap-2 shadow-sm">
              <div className="flex justify-between items-start text-slate-500 dark:text-slate-400">
                <p className="text-sm font-medium uppercase tracking-wider">Sentiment Score</p>
                <MdInsights className="text-xl" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">88% Positive</p>
                <span className="text-rose-500 text-sm font-bold flex items-center">
                  <MdTrendingDown className="text-xs" /> 2%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden shadow-inner">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Moderation Queue</h3>
                <div className="flex gap-2">
                  <div className="relative">
<<<<<<< HEAD
                    <button 
=======
                    <button
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                      onClick={() => setActiveMenu(activeMenu === 'filter' ? null : 'filter')}
                      className={`flex items-center gap-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-xs font-medium rounded-lg px-3 py-1.5 focus:ring-primary outline-none transition-all ${activeMenu === 'filter' ? 'border-primary text-primary' : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      {filter}
                      <MdFilterList className="text-xl" />
                    </button>
                    {activeMenu === 'filter' && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        {['Newest First', 'Highest Rated', 'Lowest Rated', 'Sentiment (Low to High)'].map(opt => (
<<<<<<< HEAD
                          <button 
                            key={opt}
                            onClick={() => {setFilter(opt); setActiveMenu(null);}}
=======
                          <button
                            key={opt}
                            onClick={() => { setFilter(opt); setActiveMenu(null); }}
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
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

              {/* Review Cards */}
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 transition-all hover:shadow-lg hover:border-primary/30 group shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.reviewer.avatar}
                        alt={review.reviewer.name}
                        className="size-12 rounded-full object-cover border border-slate-200 dark:border-border-dark"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {review.reviewer.name} <span className="text-slate-400 font-normal">reviewed</span> {review.lawyer}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-amber-400 text-xs">
                            {[...Array(5)].map((_, i) => (
                              <MdStar key={i} className={i < review.rating ? "" : "text-slate-300 dark:text-slate-600"} />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-tight">Case #{review.caseId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <span className="text-xs text-slate-400 font-medium">{review.timestamp}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${review.sentiment.includes('Positive') ? 'bg-emerald-500/10 text-emerald-500' :
                        review.sentiment.includes('Negative') ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                        {review.sentiment}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-4 font-medium">
                    "{review.comment}"
                  </p>
                  {review.adminResponse && (
                    <div className="mb-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Admin Response</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{review.adminResponse}"</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const action = review.flagged ? "Unflag" : "Flag";
                          Swal.fire({
                            title: `${action} Review?`,
                            text: `Are you sure you want to ${action.toLowerCase()} this review?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: review.flagged ? "#64748b" : "#ef4444",
                            confirmButtonText: `Yes, ${action}`,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              updateReview(review.id, { flagged: !review.flagged });
                              Swal.fire("Success", `Review has been ${action.toLowerCase()}ged.`, "success");
                            }
                          });
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${review.flagged ? 'border-red-200 text-rose-500 bg-rose-500/5' : 'border-slate-200 dark:border-border-dark text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                      >
                        {review.flagged ? <MdReport className="text-sm" /> : <MdFlag className="text-sm" />}
                        {review.flagged ? 'Flagged' : 'Flag'}
                      </button>
                      <button onClick={() => handlePin(review)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${review.isPinned ? 'border-primary text-primary' : 'border-slate-200 dark:border-border-dark text-slate-600 dark:text-slate-400'}`}>
                        <MdPushPin className="text-sm" /> {review.isPinned ? "Unpin" : "Pin"}
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 transition-colors text-slate-600 dark:text-slate-400"
                      >
                        <MdDelete className="text-sm" /> Delete
                      </button>
                    </div>
                    <button
                      onClick={() => handleRespond(review)}
                      className="bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                    >
                      {review.adminResponse ? "Edit Response" : "Respond as Admin"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Trend & Filter Sidebar */}
            <div className="space-y-6">
              {/* Aggregate Trend Chart */}
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
                <h4 className="text-sm font-bold mb-1 text-slate-900 dark:text-white">Aggregate Rating Trend</h4>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">4.7</span>
                  <span className="text-xs text-slate-500 font-medium">Last 30 Days</span>
                  <span className="text-emerald-500 text-[10px] font-bold">+5.2%</span>
                </div>
                <div className="h-48 w-full relative group">
                  <svg className="w-full h-full" viewBox="0 0 400 150">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#197fe6" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#197fe6" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0 120 C 50 110, 80 130, 130 90 S 200 20, 250 50 S 330 30, 400 10 L 400 150 L 0 150 Z" fill="url(#chartGradient)"></path>
                    <path d="M0 120 C 50 110, 80 130, 130 90 S 200 20, 250 50 S 330 30, 400 10" fill="none" stroke="#197fe6" strokeLinecap="round" strokeWidth="3"></path>
                    <circle className="opacity-0 group-hover:opacity-100 transition-opacity" cx="130" cy="90" fill="#197fe6" r="4"></circle>
                    <circle className="opacity-0 group-hover:opacity-100 transition-opacity" cx="250" cy="50" fill="#197fe6" r="4"></circle>
                  </svg>
                  <div className="flex justify-between mt-4">
                    {["WK 1", "WK 2", "WK 3", "WK 4"].map(wk => (
                      <span key={wk} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{wk}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
                <h4 className="text-sm font-bold mb-4 text-slate-900 dark:text-white">Rating by Category</h4>
                <div className="space-y-4">
                  {[
                    { name: "Criminal Law", rating: 4.9, width: "98%" },
                    { name: "Family Law", rating: 4.5, width: "90%" },
                    { name: "Intellectual Property", rating: 4.2, width: "84%" },
                    { name: "Corporate Law", rating: 3.8, width: "76%" }
                  ].map(cat => (
                    <div key={cat.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">
                        <span>{cat.name}</span>
                        <span className="tabular-nums">{cat.rating}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden shadow-inner font-black">
                        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: cat.width }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Filters Sidebar */}
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
                <h4 className="text-sm font-bold mb-4 text-slate-900 dark:text-white">Sentiment Distribution</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Positive", color: "border-emerald-500", count: "8,240", checked: true },
                    { label: "Neutral", color: "border-amber-500", count: "3,110" },
                    { label: "Negative", color: "border-rose-500", count: "1,100" }
                  ].map(item => (
                    <label key={item.label} className="flex items-center gap-3 group cursor-pointer group">
                      <div className={`size-4 rounded border-2 ${item.color} ${item.checked ? 'bg-primary/10' : ''} flex items-center justify-center transition-all`}>
                        {item.checked && <span className="text-[10px] text-primary font-black">✓</span>}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300 font-medium group-hover:text-primary transition-colors">{item.label}</span>
                      <span className="ml-auto text-xs font-bold text-slate-400 tabular-nums">{item.count}</span>
                    </label>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 rounded-lg border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest shadow-sm">
                  Apply Analysis
                </button>
              </div>
            </div>
          </div>

          <footer className="mt-8 py-8 text-center border-t border-slate-100 dark:border-border-dark">
            <p className="text-xs text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest">© 2026 LegalAdmin Platform. Data analysis updated 4 minutes ago.</p>
          </footer>
        </div>
      </div>

      {/* Admin Response Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-border-dark flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Respond to {selectedReview.reviewer.name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-slate-100 dark:hover:bg-background-dark p-1 rounded-full transition-colors"
              >
                <MdClose className="text-2xl text-slate-400 hover:text-rose-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 dark:bg-background-dark p-4 rounded-lg text-sm italic text-slate-500 border-l-4 border-primary">
                "{selectedReview.comment}"
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Response</label>
                <textarea
                  className="w-full bg-slate-100 dark:bg-background-dark border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary h-32 outline-none transition-all text-slate-900 dark:text-white"
                  placeholder="Draft a polite and professional response..."
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="rounded text-primary focus:ring-primary bg-transparent border-slate-300 size-4 transition-all"
                  id="email-user"
                  type="checkbox"
                  defaultChecked
                />
                <label className="text-xs font-semibold text-slate-500 cursor-pointer" htmlFor="email-user">Also send copy to user via email</label>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-background-dark/50 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={submitResponse}
                className="px-6 py-2 rounded-lg text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 uppercase tracking-widest"
              >
                Publish Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
