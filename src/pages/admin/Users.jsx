import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  MdSearch,
  MdDownload,
  MdTune,
  MdMail,
  MdVisibility,
  MdBlock,
  MdCheckCircle,
  MdFirstPage,
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
  MdPersonAdd,
  MdSearchOff,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const Users = () => {
  const { users, updateUser } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    const actionText = currentStatus === "Active" ? "Suspend" : "Activate";

    Swal.fire({
      title: `${actionText} User?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} this user account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: currentStatus === "Active" ? "#ef4444" : "#22c55e",
      cancelButtonColor: "#64748b",
      confirmButtonText: `Yes, ${actionText}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(id, { status: newStatus });
        Swal.fire({
          title: "Success!",
          text: `User has been ${newStatus.toLowerCase()}.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Consultations", "Status", "Last Login"];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map(u => `${u.id},${u.name},${u.email},${u.consultations},${u.status},${u.lastLogin}`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    Swal.fire({
      title: "Exported!",
      text: `${filteredUsers.length} users exported to CSV.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: "#197fe6"
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header & Tools */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-[0.1em]">
            Administrator Console
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            User Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Reviewing <span className="text-primary font-bold">{users.length}</span> total registered legal consultation clients.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#2a2839] transition-colors shadow-sm"
          >
            <MdDownload className="text-xl" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button 
            onClick={() => Swal.fire({
              title: 'Coming Soon',
              text: 'The manual user creation feature is being implemented.',
              icon: 'info',
              confirmButtonColor: '#197fe6'
            })}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <MdPersonAdd className="text-xl" />
            <span className="hidden sm:inline">Add New User</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="flex-1 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 text-slate-900 dark:text-white placeholder:text-slate-500"
              placeholder="Search by name, email, or client ID..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-100 dark:bg-background-dark border-none rounded-lg px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
          <span>Showing {filteredUsers.length} of {users.length} results</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#252533] border-b border-slate-200 dark:border-[#3d3b54]">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em]">
                  Client Name
                </th>
                <th className="hidden lg:table-cell px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em]">
                  Email Address
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em] text-center">
                  Consultations
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em]">
                  Status
                </th>
                <th className="hidden xl:table-cell px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em]">
                  Last Login
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#3d3b54]">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 dark:hover:bg-[#252533] transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-slate-100 dark:ring-[#3d3b54] shadow-sm transform group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundImage: `url('${user.image}')` }}
                        ></div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-[#9f9db9] font-medium">
                      {user.email}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-center">
                      {user.consultations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20"
                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-[#9f9db9] font-medium">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#2a2839] rounded-lg text-slate-400 hover:text-primary transition-colors"
                          title="Message User"
                        >
                          <MdMail className="text-xl" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#2a2839] rounded-lg text-slate-400 hover:text-primary transition-colors"
                          title="View Profile"
                        >
                          <MdVisibility className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.status === "Active"
                              ? "hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-500"
                              : "hover:bg-green-50 dark:hover:bg-green-500/10 text-slate-400 hover:text-green-500"
                          }`}
                          title={user.status === "Active" ? "Suspend Account" : "Activate Account"}
                        >
                          {user.status === "Active" ? (
                            <MdBlock className="text-xl" />
                          ) : (
                            <MdCheckCircle className="text-xl" />
                          )}
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
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">No matching users found</p>
                      <button 
                        onClick={() => {setSearchQuery(""); setStatusFilter("All");}}
                        className="mt-4 text-xs font-bold text-primary hover:underline"
                      >
                        Reset searching filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#252533] border-t border-slate-200 dark:border-[#3d3b54] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-500 dark:text-[#9f9db9] uppercase tracking-[0.15em]">
              Rows per page:
            </span>
            <select 
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-[#1c1c27] border border-slate-200 dark:border-[#3d3b54] rounded-lg text-xs font-bold py-1 px-2 focus:ring-2 focus:ring-primary/30 outline-none transition-all text-slate-900 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              className="p-2 text-slate-400 hover:bg-white dark:hover:bg-[#1c1c27] hover:text-primary rounded-lg disabled:opacity-30 transition-all font-bold"
              disabled={currentPage === 1}
            >
              <MdFirstPage className="text-xl" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 text-slate-400 hover:bg-white dark:hover:bg-[#1c1c27] hover:text-primary rounded-lg disabled:opacity-30 transition-all font-bold"
              disabled={currentPage === 1}
            >
              <MdChevronLeft className="text-xl" />
            </button>
            <div className="flex items-center gap-1 px-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Page {currentPage} <span className="text-slate-400">of</span> {totalPages || 1}
              </span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 text-slate-400 hover:bg-white dark:hover:bg-[#1c1c27] hover:text-primary rounded-lg disabled:opacity-30 transition-all font-bold"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <MdChevronRight className="text-xl" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="p-2 text-slate-400 hover:bg-white dark:hover:bg-[#1c1c27] hover:text-primary rounded-lg disabled:opacity-30 transition-all font-bold"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <MdLastPage className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
