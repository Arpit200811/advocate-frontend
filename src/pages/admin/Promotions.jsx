import React, { useState } from "react";
import { MdSearch, MdAdd, MdPayments, MdStars, MdTrendingUp, MdPercent, MdMonetizationOn, MdPersonAdd, MdGroup, MdHistory, MdBusiness, MdMoreVert, MdChevronLeft, MdChevronRight, MdLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";
import { initialOffers } from "../../data/mockData";
import { useData } from "../../context/DataContext";

const Promotions = () => {
  const { offers, toggleOffer, deleteOffer, offerStats } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Offers");
  const [activeMenu, setActiveMenu] = useState(null);
<<<<<<< HEAD
=======

  const totalDiscountValue = (offerStats || []).reduce((acc, stat) => {
    const val = parseFloat(String(stat.discount || '0').replace('₹', '').replace(',', ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const topOffer = (offerStats || []).length > 0
    ? [...offerStats].sort((a, b) => parseInt(b.conversion) - parseInt(a.conversion))[0]
    : { name: "N/A", conversion: "0%" };
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)

  const filteredOffers = offers.filter((offer) => {
    // ... existing filter logic ...

    const name = offer.title || offer.name || "";
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const isExpired = offer.expiryDate && new Date(offer.expiryDate) < new Date();
    const isActive = offer.isActive && !isExpired;

    if (activeTab === "All Offers") return matchesSearch;
    if (activeTab.startsWith("Active")) return matchesSearch && isActive;
    if (activeTab.startsWith("Expired")) return matchesSearch && (isExpired || !offer.isActive);
    if (activeTab === "Scheduled") return matchesSearch && !isActive && !isExpired && offer.isActive; // Simple logic for scheduled
    return matchesSearch;
  });

  const getAudienceIcon = (iconName) => {
    switch (iconName) {
      case "person_add": return <MdPersonAdd className="text-slate-400 text-lg" />;
      case "group": return <MdGroup className="text-slate-400 text-lg" />;
      case "history": return <MdHistory className="text-slate-400 text-lg" />;
      case "business": return <MdBusiness className="text-slate-400 text-lg" />;
      default: return <MdGroup className="text-slate-400 text-lg" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
      case "Scheduled": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Expired": return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400";
      default: return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Offers & Promotions</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage marketing campaigns, discount codes, and user engagement strategies.</p>
        </div>
        <Link
          to="/admin/promotions/create"
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <MdAdd className="text-xl" />
          Create New Offer
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Stats */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Discount Value</p>
              <MdPayments className="text-primary text-xl" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">₹{totalDiscountValue.toLocaleString('en-IN')}</p>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold uppercase tracking-wider">
              <MdTrendingUp className="text-sm" />
              <span>Real-time Data</span>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between mb-4 text-amber-500">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Highest Converting</p>
              <MdStars className="text-xl" />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white mb-2">{topOffer.name}</p>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold uppercase tracking-wider">
              <span>{topOffer.conversion} conversion rate</span>
            </div>

          </div>

          {/* Mini Chart Mock */}
          <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/20">
            <p className="text-sm font-black text-primary mb-4 uppercase tracking-[0.15em]">Active Campaigns</p>
            <div className="flex items-end gap-2 h-24">
              {[40, 60, 35, 85, 55, 95, 70].map((h, i) => (
                <div key={i} className="w-full bg-primary/40 rounded-t transition-all hover:bg-primary" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase text-center mt-4 text-slate-500 tracking-widest">Usage Activity (Last 7 Days)</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-surface-dark p-2 border border-slate-200 dark:border-border-dark rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex p-1 bg-slate-100 dark:bg-background-dark/50 rounded-lg">
              {["All Offers", `Active (${offers.filter(o => o.isActive && (!o.expiryDate || new Date(o.expiryDate) > new Date())).length})`, "Scheduled", "Expired"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === tab
                    ? "bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/30 text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-background-dark/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-200 dark:border-border-dark">
                    <th className="px-6 py-4">Offer Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Audience</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Usage</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                  {filteredOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-slate-50/50 dark:hover:bg-background-dark/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-900 dark:text-white">{offer.title || offer.name}</div>
                        <div className="text-[10px] font-black text-slate-400 mt-0.5 uppercase tracking-widest group-hover:text-primary transition-colors">CODE: {offer.code}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-background-dark text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-border-dark">
                          {offer.type?.includes("percentage") ? <MdPercent className="text-base" /> : <MdMonetizationOn className="text-base" />}
                          {offer.type}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          {getAudienceIcon("group")}
                          <span>Global</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {offer.expiryDate ? new Date(offer.expiryDate).toLocaleDateString() : 'Permanent'}
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Expires</div>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm font-black text-slate-900 dark:text-white">
                        {offer.type === 'percentage' ? `${offer.discountAmount}%` : `₹${offer.discountAmount?.toLocaleString('en-IN')}`}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(offer.isActive ? "Active" : "Expired")}`}>
                          {offer.isActive ? "Active" : "Expired"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right relative">
<<<<<<< HEAD
                        <button 
=======
                        <button
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                          onClick={() => setActiveMenu(activeMenu === offer.id ? null : offer.id)}
                          className={`p-2 rounded-lg transition-colors ${activeMenu === offer.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-slate-100 dark:hover:bg-background-dark text-slate-400'}`}
                        >
                          <MdMoreVert className="text-xl" />
                        </button>
                        {activeMenu === offer.id && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
<<<<<<< HEAD
                            <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                              Edit Campaign
                            </button>
                            <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                              Duplicate Offer
                            </button>
                            <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                            <button className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                              Terminate Early
=======
                            <button
                              onClick={() => toggleOffer(offer.id)}
                              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors"
                            >
                              {offer.isActive ? "Deactivate" : "Activate"} Offer
                            </button>
                            <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                            <button
                              onClick={() => deleteOffer(offer.id)}
                              className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                              Delete Permanently
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-background-dark/50 border-t border-slate-200 dark:border-border-dark flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500">Showing {filteredOffers.length} of {offers.length} active campaigns</p>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-slate-400 hover:bg-white dark:hover:bg-surface-dark transition-colors">
                  <MdChevronLeft className="text-xl" />
                </button>
                <button className="size-8 rounded-lg bg-primary text-white text-xs font-black shadow-sm shadow-primary/20">1</button>
                <button className="p-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-slate-400 hover:bg-white dark:hover:bg-surface-dark transition-colors">
                  <MdChevronRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-5 rounded-2xl flex gap-4">
            <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
              <MdLightbulb className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-black text-primary uppercase tracking-widest mb-1">Market Insight</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Offers targeting <span className="text-primary font-bold">"Inactive Users"</span> currently have a 15% higher ROI than general broadcast campaigns. Consider creating a re-engagement coupon today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
