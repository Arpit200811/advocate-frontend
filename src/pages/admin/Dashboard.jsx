import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  MdPayments,
  MdPerson,
  MdVerifiedUser,
  MdEventAvailable,
  MdLocationOn,
  MdMoreVert,
} from "react-icons/md";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useData } from "../../context/DataContext";

const monthlyData = [
  { name: "Jan", pv: 2400 },
  { name: "Feb", pv: 1398 },
  { name: "Mar", pv: 9800 },
  { name: "Apr", pv: 3908 },
  { name: "May", pv: 4800 },
  { name: "Jun", pv: 3800 },
];

const weeklyData = [
  { name: "Mon", pv: 1000 },
  { name: "Tue", pv: 5800 },
  { name: "Wed", pv: 2908 },
  { name: "Thu", pv: 4800 },
  { name: "Fri", pv: 3800 },
  { name: "Sat", pv: 4300 },
  { name: "Sun", pv: 9800 },
];

const Dashboard = () => {
  const { lawyers, users, consultations } = useData();
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeMenu, setActiveMenu] = useState(null);

  const data = timeRange === "monthly" ? monthlyData : weeklyData;

  const totalUsers = users.length;
  const activeLawyers = lawyers.filter(l => l.status === 'Approved').length;
  const pendingVerifications = lawyers.filter(l => l.status === 'Pending Review').length;
  const totalConsultations = consultations.length;
  const totalRevenue = consultations.reduce((acc, curr) => {
    // Basic parser for '$150' format
    const amount = parseFloat(curr.amount.replace('$', '').replace(',', '')) || 0;
    return acc + amount;
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div data-aos="fade-up" data-aos-delay="0" className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MdPayments className="text-2xl" />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">
            Total Revenue
          </p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </h3>
        </div>
        <div data-aos="fade-up" data-aos-delay="100" className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MdPerson className="text-2xl" />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              +5.2%
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">
            Active Lawyers
          </p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{activeLawyers}</h3>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
              <MdVerifiedUser className="text-2xl" />
            </div>
            <span className="text-orange-500 text-xs font-bold flex items-center bg-orange-500/10 px-2 py-1 rounded-full">
              Action
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">
            Pending Verifications
          </p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{pendingVerifications}</h3>
        </div>
        <div data-aos="fade-up" data-aos-delay="300" className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MdEventAvailable className="text-2xl" />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              Today
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">
            Total Consultations
          </p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalConsultations}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Overview</h2>
              <p className="text-sm text-slate-500 dark:text-[#9f9db9]">
                Financial performance for the selected period
              </p>
            </div>
            <div className="flex bg-slate-100 dark:bg-[#2a2839] rounded-lg p-1">
              <button
                onClick={() => setTimeRange("monthly")}
                className={`px-3 py-1 text-xs font-bold rounded-md shadow-sm transition-all ${
                  timeRange === "monthly"
                    ? "bg-white dark:bg-[#1c1c27] text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-[#9f9db9]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeRange("weekly")}
                className={`px-3 py-1 text-xs font-bold rounded-md shadow-sm transition-all ${
                  timeRange === "weekly"
                    ? "bg-white dark:bg-[#1c1c27] text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-[#9f9db9]"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          <div className="h-72 w-full relative min-h-[18rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#197fe6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#197fe6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: "bold" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1e293b", 
                    borderRadius: "12px", 
                    border: "none"
                  }}
                  itemStyle={{ color: "#fff", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#197fe6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Stats */}
        <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Service Distribution</h2>
          <div className="space-y-6">
            {[
              { label: 'Corporate Law', value: '45%', color: 'bg-primary' },
              { label: 'Family Law', value: '30%', color: 'bg-indigo-400' },
              { label: 'Criminal Defense', value: '15%', color: 'bg-rose-400' },
              { label: 'Intellectual Property', value: '10%', color: 'bg-slate-400' },
            ].map((service, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2 font-bold">
                  <span className="text-slate-700 dark:text-slate-300">{service.label}</span>
                  <span className="text-slate-500 dark:text-[#9f9db9]">{service.value}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-[#252533] rounded-full overflow-hidden">
                  <div className={`${service.color} h-full`} style={{ width: service.value }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-slate-50 dark:bg-[#252533] rounded-lg">
            <p className="text-xs text-slate-500 dark:text-[#9f9db9] mb-2 font-bold uppercase tracking-widest">
              Top Performing Region
            </p>
            <div className="flex items-center gap-3">
              <MdLocationOn className="text-primary text-xl" />
              <span className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">New York, USA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Section */}
      <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-[#3d3b54] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Consultations</h2>
            <p className="text-sm text-slate-500 dark:text-[#9f9db9]">
              Latest legal sessions across the platform
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => Swal.fire({
                title: 'SweetAlert2 Works!',
                text: 'AOS and SweetAlert2 are now integrated globally.',
                icon: 'success',
                confirmButtonColor: '#197fe6'
              })}
              className="text-xs font-black uppercase bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Test Alert
            </button>
            <Link to="/admin/consultations" className="text-primary text-sm font-black uppercase hover:underline">
              View All
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-[#252533] text-slate-500 dark:text-[#9f9db9] text-[10px] font-black uppercase tracking-[0.15em]">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Client Name</th>
                <th className="hidden lg:table-cell px-6 py-4">Assigned Lawyer</th>
                <th className="hidden sm:table-cell px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
              {consultations.map((session, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{session.date}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">10:30 AM</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{session.client}</span>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-500 dark:text-[#9f9db9]">{session.lawyer}</span>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">
                     Corporate
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900 dark:text-white">
                    {session.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                      className={`p-2 rounded-lg transition-colors ${activeMenu === i ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'}`}
                    >
                      <MdMoreVert className="text-xl" />
                    </button>
                    {activeMenu === i && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                          View Details
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                          Download Receipt
                        </button>
                        <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                          Flag Session
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
