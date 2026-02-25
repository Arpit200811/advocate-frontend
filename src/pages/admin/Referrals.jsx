import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  MdGavel,
  MdDashboard,
  MdGroup,
  MdBalance,
  MdPayments,
  MdSearch,
  MdAccountCircle,
  MdAddCircle,
  MdInfo,
  MdRule,
  MdRedeem,
  MdWorkspacePremium,
  MdEdit,
  MdEmojiEvents,
  MdFilterList,
  MdDownload,
  MdMoreVert,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const Referrals = () => {
  const { referralRules, updateReferralRule, addReferralRule, referralTransactions, topReferrers } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filteredTransactions = referralTransactions?.filter((tx) => {
    const matchesSearch =
      tx.referrer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.referee?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const toggleRule = async (id, currentStatus) => {
    const action = currentStatus ? "deactivate" : "activate";
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Rule?`,
      text: `Are you sure you want to ${action} this referral rule?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: currentStatus ? "#ef4444" : "#22c55e",
      confirmButtonText: `Yes, ${action}`,
    });

    if (result.isConfirmed) {
      await updateReferralRule(id, { isActive: !currentStatus });
      Swal.fire("Success", `Rule has been ${action}d.`, "success");
    }
  };

  const handleCreateRule = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Configure New Referral Rule',
      html:
        '<div class="flex flex-col gap-4 p-4">' +
        '<input id="swal-input1" class="swal2-input m-0 w-full" placeholder="Rule Name (e.g. Festive Bonus)">' +
        '<input id="swal-input2" type="number" class="swal2-input m-0 w-full" placeholder="Amount (e.g. 100)">' +
        '<select id="swal-input3" class="swal2-select m-0 w-full"><option value="signup">Signup Bonus</option><option value="event">Event Bonus</option></select>' +
        '</div>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Create Rule',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-input1').value,
          amount: document.getElementById('swal-input2').value,
          type: document.getElementById('swal-input3').value
        }
      }
    });

    if (formValues) {
      if (!formValues.name || !formValues.amount) {
        return Swal.fire("Error", "All fields are required", "error");
      }
      await addReferralRule(formValues);
      Swal.fire("Success", "New referral rule configured", "success");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      case "Pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
      case "Flagged":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400";
    }
  };

  const getRuleIcon = (iconName) => {
    switch (iconName) {
      case "redeem": return <MdRedeem />;
      case "workspace_premium": return <MdWorkspacePremium />;
      default: return <MdRedeem />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Referral Program Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor platform growth metrics and manage reward structures.</p>
        </div>
        <button
          onClick={handleCreateRule}
          className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          <MdAddCircle className="text-xl" />
          Configure New Referral Rule
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Referral Signups</span>
            <span className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-black px-2 py-1 rounded">+15%</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">1,284</div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[65%]" style={{ width: "65%" }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Rewards Paid</span>
            <span className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-black px-2 py-1 rounded">+8%</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">₹{(referralTransactions?.reduce((acc, tx) => acc + (tx.amount || 0), 0) || 0).toLocaleString()}</div>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400">
            <MdInfo className="text-sm" />
            Payouts processed monthly
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Conversion Rate</span>
            <span className="bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-black px-2 py-1 rounded">+2%</span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">12.5%</div>
          <div className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. benchmark: 8.4%</div>
        </div>
      </div>

      {/* Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Rules */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black flex items-center gap-2 text-slate-900 dark:text-white">
              <MdRule className="text-primary text-xl" />
              Active Referral Rules
            </h2>
            <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100 dark:divide-border-dark">
              {referralRules.map((rule) => (
                <div key={rule.id} className="p-5 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`size-12 rounded-lg ${rule.iconBg} flex items-center justify-center ${rule.iconColor} text-2xl`}>
                      {getRuleIcon(rule.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rule.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active since</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{rule.activeSince}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-border-dark rounded-lg transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <MdEdit className="text-xl" />
                      </button>
                      <div
                        onClick={() => toggleRule(rule.id, rule.isActive)}
                        className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${rule.isActive ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                      >
                        <div className={`absolute top-0.5 size-4 bg-white rounded-full shadow-sm transition-all ${rule.isActive ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <div className="px-2">
            <h2 className="text-lg font-black flex items-center gap-2 text-slate-900 dark:text-white">
              <MdEmojiEvents className="text-amber-500 text-xl" />
              Top Referrers
            </h2>
          </div>
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-4 shadow-sm space-y-4">
            {topReferrers.map((ref, idx) => (
              <div key={ref.id} className={`flex items-center justify-between p-3 rounded-xl transition-all ${idx === 0 ? 'bg-primary/5 border border-primary/20 scale-[1.02]' : 'hover:bg-slate-50 dark:hover:bg-background-dark/30'}`}>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200 dark:bg-background-dark overflow-hidden border-2 border-white dark:border-border-dark shadow-sm">
                    <img alt={ref.name} src={ref.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{ref.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{ref.referrals} Success</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${idx === 0 ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>₹{ref.earned.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Referral Transactions</h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none min-w-[200px]">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search referrer/referee..."
                className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <select
                className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg pl-9 pr-8 py-2 text-sm appearance-none focus:ring-2 focus:ring-primary text-slate-600 dark:text-slate-300 font-bold outline-none cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Flagged</option>
              </select>
            </div>
            <button className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-border-dark transition-colors text-slate-400">
              <MdDownload className="text-xl" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-background-dark/50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-100 dark:border-border-dark">
                  <th className="px-6 py-4">Referrer</th>
                  <th className="px-6 py-4">Referee</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-background-dark/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center font-black text-[10px] text-primary border border-primary/20">
                          {tx.referrerInitial}
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{tx.referrer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{tx.referee}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 font-medium">{tx.date}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-black text-slate-900 dark:text-white">₹ {tx.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <MdMoreVert className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-slate-50/30 dark:bg-background-dark/20 border-t border-slate-100 dark:border-border-dark flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Showing {filteredTransactions.length} of {referralTransactions.length} items</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-slate-200 dark:border-border-dark rounded-lg text-xs font-black text-slate-500 hover:bg-white dark:hover:bg-surface-dark transition-all">Prev</button>
              <button className="size-8 bg-primary text-white rounded-lg text-xs font-black shadow-sm shadow-primary/20">1</button>
              <button className="px-3 py-1.5 border border-slate-200 dark:border-border-dark rounded-lg text-xs font-black text-slate-500 hover:bg-white dark:hover:bg-surface-dark transition-all">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
