import React, { useState } from "react";
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
} from "react-icons/md";
import { initialUsers } from "../../data/mockData";

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <MdDownload className="text-xl" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <MdPersonAdd className="text-xl" />
            Add New User
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
              <tr className="bg-slate-50 dark:bg-background-dark/50 border-b border-slate-200 dark:border-border-dark">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Consultations
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-slate-100 dark:ring-border-dark shadow-sm"
                          style={{ backgroundImage: `url('${user.image}')` }}
                        ></div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white text-center">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors"
                          title="Message User"
                        >
                          <MdMail className="text-xl" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors"
                          title="View Profile"
                        >
                          <MdVisibility className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
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
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-background-dark/50 border-t border-slate-200 dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Rows per page:
            </span>
            <select className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-xs font-bold py-1 px-2 focus:ring-2 focus:ring-primary/30 outline-none transition-all">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-2 text-slate-400 hover:bg-white dark:hover:bg-surface-dark hover:text-primary rounded-lg disabled:opacity-30 transition-all font-bold"
              disabled
            >
              <MdFirstPage className="text-xl" />
            </button>
            <button
              className="p-2 text-slate-400 hover:bg-white dark:hover:bg-surface-dark hover:text-primary rounded-lg disabled:opacity-30 transition-all font-bold"
              disabled
            >
              <MdChevronLeft className="text-xl" />
            </button>
            <div className="flex gap-1 px-3">
              <button className="min-w-8 h-8 px-2 rounded-lg bg-primary text-white text-xs font-black shadow-md shadow-primary/20">
                1
              </button>
            </div>
            <button className="p-2 text-slate-400 hover:bg-white dark:hover:bg-surface-dark hover:text-primary rounded-lg transition-all font-bold">
              <MdChevronRight className="text-xl" />
            </button>
            <button className="p-2 text-slate-400 hover:bg-white dark:hover:bg-surface-dark hover:text-primary rounded-lg transition-all font-bold">
              <MdLastPage className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
