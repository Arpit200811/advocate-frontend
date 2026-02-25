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
import api from "../../services/api";

const monthlyData = [
  { name: "Jan", revenue: 2400 },
  { name: "Feb", revenue: 1398 },
  { name: "Mar", revenue: 9800 },
  { name: "Apr", revenue: 3908 },
  { name: "May", revenue: 4800 },
  { name: "Jun", revenue: 3800 },
];

const Dashboard = () => {
  const { lawyers, users, consultations, stats, flagAppointment } = useData();
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeMenu, setActiveMenu] = useState(null);

  const data = (stats.chartData && stats.chartData.length > 0) ? stats.chartData : monthlyData;

  const activeLawyers = stats.totalLawyers || lawyers.filter(l => l.status === 'Approved').length;
  const pendingVerifications = lawyers.filter(l => l.status === 'Pending Review').length;
  const totalConsultations = stats.totalAppointments || consultations.length;
  const totalRevenue = stats.totalRevenue || 0;

  const handleDownloadReceipt = async (session) => {
    Swal.fire({
      title: 'Generating Receipt...',
      text: 'Fetching session data and generating PDF.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await api.get(`/appointments/${session.id}/receipt`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt-${session.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Swal.close();
      Swal.fire({
        title: 'Downloaded',
        text: `Receipt for session with ${session.client} has been downloaded.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error downloading receipt:", error);
      Swal.close();
      Swal.fire('Error', 'Could not generate receipt.', 'error');
    }
  };

  const handleFlagSession = (session) => {
    Swal.fire({
      title: 'Flag Session?',
      text: `Provide a reason for flagging the session with ${session.client}:`,
      input: 'textarea',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Flag it'
    }).then((result) => {
      if (result.isConfirmed) {
        flagAppointment(session.id, result.value);
        Swal.fire('Flagged', 'The session has been marked for review.', 'success');
      }
    });
  };

  const handleViewDetails = (session) => {
    Swal.fire({
      title: 'Session Details',
      html: `
        <div class="text-left space-y-3 p-2">
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Client:</span>
            <span>${session.client}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Lawyer:</span>
            <span>${session.lawyer}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Date:</span>
            <span>${session.date}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-black text-primary">Amount:</span>
            <span>{session.amount}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
            <span class="font-bold">Duration:</span>
            <span>{session.duration}</span>
          </div>
          <div class="mt-4">
             <p class="text-[10px] font-black uppercase text-slate-400 mb-1">Internal Notes</p>
             <p class="text-xs bg-slate-50 dark:bg-background-dark p-3 rounded-lg text-slate-600 dark:text-[#9f9db9]">
                Standard consultation regarding legal structure. Payment processed securely.
             </p>
          </div>
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#197fe6'
    });
  };

  const handleSystemHealth = async () => {
    Swal.fire({
      title: 'Running Diagnostic...',
      text: 'Checking database integrity and node status.',
      didOpen: () => Swal.showLoading()
    });
    try {
      const res = await api.get('/admin/health');
      Swal.fire({
        title: 'System Healthy',
        html: `All services are operational.<br/>Uptime: ${Math.floor(res.data.uptime)} seconds.`,
        icon: 'success',
        confirmButtonColor: '#197fe6'
      });
    } catch (e) {
      Swal.fire('Error', 'Health check failed. System might be unstable.', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MdPayments className="text-2xl" />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">Total Revenue</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
        </div>

        <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MdPerson className="text-2xl" />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              +5.2%
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">Active Lawyers</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{activeLawyers}</h3>
        </div>

        <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
              <MdVerifiedUser className="text-2xl" />
            </div>
            <span className="text-orange-500 text-xs font-bold flex items-center bg-orange-500/10 px-2 py-1 rounded-full">
              Action
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">Pending Verifications</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{pendingVerifications}</h3>
        </div>

        <div className="bg-white dark:bg-[#1c1c27] p-6 rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MdEventAvailable className="text-2xl" />
            </div>
            <span className="text-green-500 text-xs font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-full">
              Today
            </span>
          </div>
          <p className="text-slate-500 dark:text-[#9f9db9] text-sm font-medium">Total Consultations</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalConsultations}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Revenue Overview</h2>
              <p className="text-sm text-slate-500 dark:text-[#9f9db9]">Financial performance metrics</p>
            </div>
          </div>
<<<<<<< HEAD
          <div className="h-72 w-full relative min-h-[18rem]">
=======
          <div className="h-72 w-full">
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#197fe6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#197fe6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10, fontWeight: "bold" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderRadius: "12px", border: "none" }} itemStyle={{ color: "#fff", fontWeight: "bold" }} />
                <Area type="monotone" dataKey="revenue" stroke="#197fe6" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Service Distribution</h2>
          <div className="space-y-6">
            {(stats.categoriesShare || []).slice(0, 4).map((service, i) => {
              const colors = ['bg-primary', 'bg-indigo-400', 'bg-rose-400', 'bg-slate-400'];
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2 font-bold">
                    <span className="text-slate-700 dark:text-slate-300 uppercase tracking-tighter">{service.name}</span>
                    <span className="text-slate-500 dark:text-[#9f9db9]">{service.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-[#252533] rounded-full overflow-hidden">
                    <div className={`${colors[i] || 'bg-slate-400'} h-full rounded-full transition-all duration-1000`} style={{ width: `${service.percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 p-4 bg-slate-50 dark:bg-[#252533] rounded-lg border border-slate-200 dark:border-[#3d3b54]">
            <p className="text-[10px] text-slate-500 dark:text-[#9f9db9] mb-2 font-black uppercase tracking-[0.2em]">Top Performing Region</p>
            <div className="flex items-center gap-3">
              <MdLocationOn className="text-primary text-xl" />
              <span className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider">{stats.topRegion || "New York, USA"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c27] rounded-xl border border-slate-200 dark:border-[#3d3b54] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-[#3d3b54] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Recent Consultations</h2>
            <p className="text-sm text-slate-500 dark:text-[#9f9db9]">Real-time legal sessions pipeline</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSystemHealth}
              className="text-xs font-black uppercase bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              System Health
            </button>
            <Link to="/admin/consultations" className="text-primary text-xs font-black uppercase tracking-widest hover:underline mt-2">View All</Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-[#252533] text-slate-500 dark:text-[#9f9db9] text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Client</th>
                <th className="hidden lg:table-cell px-6 py-4">Lawyer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
              {consultations.map((session, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{session.date}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">10:30 AM</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{session.client}</span>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-500 dark:text-[#9f9db9]">{session.lawyer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900 dark:text-white">
                    ₹{session.amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
<<<<<<< HEAD
                    <button 
=======
                    <button
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
                      onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                      className={`p-2 rounded-lg transition-colors ${activeMenu === i ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'}`}
                    >
                      <MdMoreVert className="text-xl" />
                    </button>
                    {activeMenu === i && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl z-[80] p-1 animate-in fade-in slide-in-from-top-1 duration-200">
<<<<<<< HEAD
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                          View Details
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                          Download Receipt
                        </button>
                        <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                        <button className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
=======
                        <button onClick={() => { handleViewDetails(session); setActiveMenu(null); }} className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                          View Details
                        </button>
                        <button onClick={() => { handleDownloadReceipt(session); setActiveMenu(null); }} className="w-full text-left px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                          Download Receipt
                        </button>
                        <div className="h-px bg-slate-100 dark:bg-border-dark my-1"></div>
                        <button onClick={() => { handleFlagSession(session); setActiveMenu(null); }} className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
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
