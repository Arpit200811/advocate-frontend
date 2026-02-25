import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  MdGavel,
  MdDashboard,
  MdGroup,
  MdBadge,
  MdCategory,
  MdPayments,
  MdSettings,
  MdHelpCenter,
  MdSwapVert,
  MdAdd,
  MdSearch,
  MdDragIndicator,
  MdTrendingUp,
  MdTrendingDown,
  MdRemove,
  MdMoreVert,
  MdVerifiedUser,
  MdDescription,
  MdPolicy,
  MdAddCircle,
  MdCheckCircle,
  MdDelete
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Categories");
  const [activeMenu, setActiveMenu] = useState(null); // id of the category with open menu

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === "All Categories") return matchesSearch;
    if (activeTab === "Active") return matchesSearch && cat.status === "Enabled";
    if (activeTab === "Archived") return matchesSearch && cat.status === "Disabled";
    if (activeTab === "Special Needs") return matchesSearch && cat.isTopGrowth;
    return matchesSearch;
  });

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Enabled" ? "Disabled" : "Enabled";
    Swal.fire({
      title: `${newStatus === "Enabled" ? "Enable" : "Disable"} Category?`,
      text: `Are you sure you want to ${newStatus.toLowerCase()} this category? It will be ${newStatus === "Enabled" ? "visible" : "hidden"} for users.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Enabled" ? "#22c55e" : "#ef4444",
      confirmButtonText: `Yes, ${newStatus}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateCategory(id, { status: newStatus });
        Swal.fire("Success", `Category has been ${newStatus.toLowerCase()}.`, "success");
      }
    });
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Delete Category?',
      text: `Are you sure you want to permanently delete ${name}? This will affect all associated legal records.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
        Swal.fire('Deleted', 'Category removed successfully.', 'success');
      }
    });
  };

  const getTrendIcon = (direction) => {
    switch (direction) {
      case "up":
        return <MdTrendingUp className="text-sm text-emerald-500" />;
      case "down":
        return <MdTrendingDown className="text-sm text-rose-500" />;
      default:
        return <MdRemove className="text-sm text-slate-400" />;
    }
  };

  const getRuleIcon = (iconName) => {
    switch (iconName) {
      case "verified_user":
        return <MdVerifiedUser className="text-primary text-xl" />;
      case "description":
        return <MdDescription className="text-primary text-xl" />;
      case "policy":
        return <MdPolicy className="text-primary text-xl" />;
      default:
        return <MdCheckCircle className="text-primary text-xl" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Legal Categories Management</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Organize specializations, verification rules, and app display order.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-bold rounded-lg transition-all border border-slate-200 dark:border-border-dark text-slate-600 dark:text-slate-300">
            <MdSwapVert className="text-xl" />
            Reorder View
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: 'Add New Category',
                html:
                  '<input id="cat-name" class="swal2-input" placeholder="Category Name">' +
                  '<input id="cat-desc" class="swal2-input" placeholder="Description">' +
                  '<input id="cat-icon" class="swal2-input" placeholder="Icon Name (Material Icon)">' +
                  '<input id="cat-tags" class="swal2-input" placeholder="Tags (comma separated)">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonColor: '#197fe6',
                preConfirm: () => {
                  return {
                    name: document.getElementById('cat-name').value,
                    description: document.getElementById('cat-desc').value,
                    icon: document.getElementById('cat-icon').value,
                    tags: document.getElementById('cat-tags').value.split(',').map(t => t.trim())
                  }
                }
              }).then((result) => {
                if (result.isConfirmed) {
                  addCategory(result.value);
                  Swal.fire('Success', 'Category added', 'success');
                }
              })
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            <MdAdd className="text-xl" />
            Add Category
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search categories, tags, or requirements..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-sm text-slate-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["All Categories", "Active", "Archived", "Special Needs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-all ${activeTab === tab
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 dark:bg-background-dark/30 px-6 py-4 border-b border-slate-200 dark:border-border-dark hidden md:flex text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="w-10"></div>
          <div className="flex-1">Category & Specializations</div>
          <div className="w-32 text-center">Active Lawyers</div>
          <div className="w-40 text-center">Hourly Rate Trend</div>
          <div className="w-32 text-center">Requirements</div>
          <div className="w-32 text-center">Status</div>
          <div className="w-16"></div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-border-dark">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className={`group flex flex-col md:flex-row md:items-center px-6 py-5 hover:bg-slate-50/50 dark:hover:bg-background-dark/20 transition-colors ${cat.status === "Disabled" ? 'opacity-60 grayscale-[0.5]' : ''}`}>
              <div className="hidden md:flex w-10 items-center justify-center">
                <MdDragIndicator className="text-slate-300 dark:text-slate-600 text-xl cursor-grab active:cursor-grabbing hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{cat.name}</h3>
                  {cat.isTopGrowth && (
                    <span className="px-1.5 py-0.5 text-[8px] bg-primary text-white font-black uppercase rounded">Top Growth</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-background-dark/50 rounded-full font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-border-dark/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-32 flex justify-center mt-4 md:mt-0">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg border border-primary/20">
                  {cat.activeLawyers} Lawyers
                </span>
              </div>
              <div className="w-full md:w-40 flex flex-col items-center justify-center mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-200">₹{cat.hourlyRate.toLocaleString('en-IN')}/hr</span>
                  <span className={`flex items-center text-[10px] font-black ${cat.trendDirection === 'up' ? 'text-emerald-500' : cat.trendDirection === 'down' ? 'text-rose-500' : 'text-slate-400'}`}>
                    {getTrendIcon(cat.trendDirection)}
                    {cat.hourlyRateTrend}%
                  </span>
                </div>
                <div className="w-24 h-1.5 bg-slate-100 dark:bg-background-dark rounded-full mt-2 overflow-hidden border border-slate-200/20 dark:border-border-dark/20">
                  <div
                    className={`h-full transition-all duration-1000 ${cat.trendDirection === 'up' ? 'bg-emerald-500' : cat.trendDirection === 'down' ? 'bg-rose-500' : 'bg-slate-400'}`}
                    style={{ width: `${Math.min(100, cat.hourlyRateTrend * 8)}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-full md:w-32 flex justify-center mt-4 md:mt-0">
                <button className={`text-[10px] font-black uppercase tracking-wider hover:text-primary underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4 ${cat.isTopGrowth ? 'text-primary' : 'text-slate-500'}`}>
                  {cat.requirements} Required
                </button>
              </div>
              <div className="w-full md:w-32 flex justify-center mt-4 md:mt-0">
                <div
                  onClick={() => toggleStatus(cat.id, cat.status)}
                  className="flex items-center gap-2 cursor-pointer group/toggle"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.status === 'Enabled' ? 'bg-emerald-500 ring-4 ring-emerald-500/10' : 'bg-slate-400 ring-4 ring-slate-400/10'}`}></div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 group-hover/toggle:text-primary transition-colors">{cat.status}</span>
                </div>
              </div>
              <div className="w-full md:w-16 flex justify-end mt-4 md:mt-0 relative">
<<<<<<< HEAD
                <button 
=======
                <button
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                  onClick={() => setActiveMenu(activeMenu === cat.id ? null : cat.id)}
                  className={`p-2 rounded-lg transition-colors ${activeMenu === cat.id ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-background-dark text-slate-400'}`}
                >
                  <MdMoreVert className="text-xl" />
                </button>
                {activeMenu === cat.id && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors flex items-center gap-2">
                      <MdSettings className="text-base" /> Edit Configuration
                    </button>
                    <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors flex items-center gap-2">
<<<<<<< HEAD
                       <MdDashboard className="text-base" /> Analytics
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                    <button 
                      onClick={() => {toggleStatus(cat.id, cat.status); setActiveMenu(null);}}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      {cat.status === 'Enabled' ? 'Disable' : 'Enable'} Category
=======
                      <MdDashboard className="text-base" /> Analytics
                    </button>
                    <button
                      onClick={() => { toggleStatus(cat.id, cat.status); setActiveMenu(null); }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-all flex items-center gap-2"
                    >
                      <MdCheckCircle className="text-base" /> {cat.status === 'Enabled' ? 'Disable' : 'Enable'} Category
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                    <button
                      onClick={() => { handleDelete(cat.id, cat.name); setActiveMenu(null); }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <MdDelete className="text-base" /> Delete Category
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Management Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="font-black text-xl text-slate-900 dark:text-white">Verification Requirements</h4>
                <p className="text-sm text-slate-500 mt-1">Compliance rules for onboarding lawyers.</p>
              </div>
              <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Manage Rules</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "V-1", icon: "verified_user", name: "State License", type: "CRITICAL", description: "Attorneys must provide a valid, active state bar license." },
                { id: "V-2", icon: "description", name: "Malpractice Insurance", type: "MANDATORY", description: "Proof of current professional liability insurance coverage." },
                { id: "V-3", icon: "policy", name: "Identity Audit", type: "SECURITY", description: "Bio-metric verification through government-issued ID." },
              ].map((rule) => (
                <div key={rule.id} className="p-5 border border-slate-100 dark:border-border-dark rounded-xl bg-slate-50/50 dark:bg-background-dark/20 group hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      {getRuleIcon(rule.icon)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{rule.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">{rule.description}</p>
                      <span className="inline-block mt-3 px-2 py-0.5 text-[9px] font-black bg-slate-200 dark:bg-background-dark text-slate-600 dark:text-slate-400 rounded uppercase">
                        {rule.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-5 border-2 border-dashed border-slate-200 dark:border-border-dark rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-2 text-slate-500 group-hover:text-primary transition-colors font-black text-xs uppercase tracking-widest">
                  <MdAddCircle className="text-xl" />
                  Add New Rule
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-primary opacity-5">
              <MdCategory className="text-9xl" />
            </div>
            <h4 className="font-black text-xs text-primary mb-6 uppercase tracking-[0.2em]">Platform Metrics</h4>
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Total Categories</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">18</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Lawyers</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">1,245</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Avg. Consultation Fee</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-black text-slate-900 dark:text-white">₹240</p>
                  <span className="text-xs font-black text-emerald-500 mb-1">+4% MoM</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                <span>System Integrity</span>
                <span className="text-emerald-500">OPTIMIZED</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-background-dark rounded-full overflow-hidden border border-slate-300/20 dark:border-border-dark/20">
                <div className="bg-emerald-500 h-full w-[92%]" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-8 shadow-sm">
            <h4 className="font-black text-xs text-slate-900 dark:text-white mb-6 uppercase tracking-[0.2em]">Management Logs</h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">IP specializations updated</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Sarah Admin • 2h ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-slate-200 dark:bg-border-dark rounded-full shrink-0"></div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Criminal Law disabled</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">System • Yesterday</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-2.5 text-[10px] font-black text-slate-500 hover:text-primary transition-colors border border-slate-200 dark:border-border-dark rounded-xl uppercase tracking-widest">View History</button>
          </div>
        </div>
      </div>

      {/* Toast Notification Removed in favor of Swal */}
    </div>
  );
};

export default Categories;
