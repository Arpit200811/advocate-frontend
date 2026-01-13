import React, { useState } from "react";
import {
  MdPayments,
  MdDownload,
  MdTrendingUp,
  MdForum,
  MdStar,
  MdPersonAdd,
  MdHorizontalRule,
} from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { initialLawyers } from "../../data/mockData";

const analyticsData30d = [
  { name: "Oct 01", revenue: 4000 },
  { name: "Oct 07", revenue: 3000 },
  { name: "Oct 14", revenue: 5000 },
  { name: "Oct 21", revenue: 2780 },
  { name: "Oct 30", revenue: 6000 },
];

const analyticsDataYTD = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
  { name: "May", revenue: 55000 },
  { name: "Jun", revenue: 67000 },
];

const volumeData = [
  { name: "Jan", 2022: 400, 2023: 600 },
  { name: "Feb", 2022: 300, 2023: 500 },
  { name: "Mar", 2022: 500, 2023: 700 },
  { name: "Apr", 2022: 700, 2023: 900 },
  { name: "May", 2022: 500, 2023: 600 },
  { name: "Jun", 2022: 600, 2023: 800 },
];

const Analytics = () => {
  const [range, setRange] = useState("30d");
  const [lawyers, setLawyers] = useState(initialLawyers);

  const data = range === "30d" ? analyticsData30d : analyticsDataYTD;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
              Analytics and Detailed Reports
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal max-w-2xl">
              Deep-dive insights into revenue, legal specializations, and consultation volume trends.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-surface-dark p-1.5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <button 
              onClick={() => setRange("30d")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                range === '30d' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark'
              }`}
            >
              Last 30 Days
            </button>
            <button 
              onClick={() => setRange("ytd")}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                range === 'ytd' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark'
              }`}
            >
              YTD
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-border-dark mx-1"></div>
            <button className="flex items-center gap-2 bg-slate-900 dark:bg-background-dark text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-slate-800 border border-transparent hover:border-slate-700 font-bold">
              <MdDownload className="text-lg" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <MdPayments className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">
              <MdTrendingUp className="text-xs" />
              12.5%
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Revenue</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {range === '30d' ? '$842,500' : '$6,240,000'}
          </h3>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <MdForum className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">
              <MdTrendingUp className="text-xs" />
              8.2%
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Consultations</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
             {range === '30d' ? '12,408' : '142,500'}
          </h3>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
              <MdStar className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-xs font-bold bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
              <MdHorizontalRule className="text-xs" />
              0.0%
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Avg. Rating</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">4.8 / 5.0</h3>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <MdPersonAdd className="text-2xl" />
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">
              <MdTrendingUp className="text-xs" />
              24%
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">New Lawyers</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">156</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Growth</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Gross revenue performance for {range === '30d' ? 'the last 30 days' : 'Year to Date'}
              </p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#197fe6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#197fe6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: "bold" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1e293b", 
                    borderRadius: "12px", 
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  }}
                  itemStyle={{ color: "#fff", fontWeight: "bold" }}
                  labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#197fe6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legal Specializations Doughnut Chart (Static representation) */}
        <div className="xl:col-span-4 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Legal Specializations</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Consultation distribution by category</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative size-56">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#293038" strokeWidth="4"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#197fe6" strokeWidth="4" strokeDasharray="40 60" strokeDashoffset="0"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#6366f1" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-40"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#10b981" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-65"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#f59e0b" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">100%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total Share</span>
              </div>
            </div>
            <div className="w-full mt-10 grid grid-cols-2 gap-y-4 gap-x-6">
              {[
                { name: 'Corporate (40%)', color: 'bg-primary' },
                { name: 'Family (25%)', color: 'bg-indigo-500' },
                { name: 'Criminal (20%)', color: 'bg-emerald-500' },
                { name: 'Property (15%)', color: 'bg-amber-500' },
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`size-3 rounded-full ${spec.color} shadow-sm`}></div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{spec.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Performers Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Consultation Volume</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.05} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: "bold" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: "#f1f5f9", opacity: 0.1 }}
                  contentStyle={{ 
                    backgroundColor: "#1e293b", 
                    borderRadius: "12px", 
                    border: "none"
                  }}
                  itemStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Bar dataKey="2022" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} className="dark:fill-slate-700" />
                <Bar dataKey="2023" fill="#197fe6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 dark:border-border-dark bg-slate-50/50 dark:bg-background-dark/30">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Performing Lawyers</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">By total revenue generated this month</p>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100 dark:border-border-dark">
                  <th className="px-6 py-4">Lawyer</th>
                  <th className="px-6 py-4">Specialty</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                  <th className="px-6 py-4 text-right">Sessions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-border-dark/50">
                {lawyers.sort((a, b) => parseFloat(b.revenue.replace('$', '').replace(',', '')) - parseFloat(a.revenue.replace('$', '').replace(',', ''))).slice(0, 3).map((lawyer, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-background-dark/50 transition-colors group cursor-default">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={lawyer.image} 
                          className="size-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all font-bold"
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{lawyer.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">Law ID: #{lawyer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                        {lawyer.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-black text-emerald-500">{lawyer.revenue}</td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-slate-600 dark:text-slate-400">142</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
