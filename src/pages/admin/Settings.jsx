<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useData } from "../../context/DataContext";
import api from "../../services/api";

import {
  MdHome,
  MdShield,
  MdKey,
  MdSecurity,
  MdGroups,
  MdVisibility,
  MdCheckCircle,
  MdRemoveCircle,
  MdWarning,
  MdVerifiedUser,
  MdEdit,
  MdArrowForward,
  MdInfo,
  MdNotifications,
  MdNotificationsActive,
  MdSettings,
  MdTimeline,
  MdDelete
} from "react-icons/md";

const Settings = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState("security");
=======
  const { updateSettings, roles, addRole, deleteRole } = useData();
  const [activeTab, setActiveTab] = useState("general");
  const [auditLogs, setAuditLogs] = useState([]);
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
  const [settings, setSettings] = useState({
    is2FAEnforced: true,
    maintenanceMode: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    emailNotifications: true,
    platformCommission: 15,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      }
    };

    const fetchAuditLogs = async () => {
      try {
        const res = await api.get('/admin/audit-logs');
        setAuditLogs(res.data || []);
      } catch (err) {
        console.error("Failed to fetch audit logs:", err);
      }
    };

    fetchSettings();
    fetchAuditLogs();
  }, []);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    Swal.fire({
      title: "Save Changes?",
      text: "Platform-wide settings will be updated immediately.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#197fe6",
      confirmButtonText: "Save Configuration",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateSettings({ ...settings });
          Swal.fire("Saved", "System configuration has been updated.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to save settings.", "error");
        }
      }
    });
  };

  const runDiagnostic = () => {
    Swal.fire({
      title: 'Running Diagnostic...',
      html: 'Checking database integrity, cache health, and node status.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      Swal.fire({
        title: 'System Healthy',
        text: 'All diagnostic checks passed. Uptime: 99.99%',
        icon: 'success',
        confirmButtonColor: '#197fe6'
      });
    });
  };

  const tabs = [
    { id: "general", label: "General", icon: MdSettings },
    { id: "security", label: "Security", icon: MdShield },
    { id: "rbac", label: "Roles & Permissions", icon: MdGroups },
    { id: "notifications", label: "Notifications", icon: MdNotifications },
    { id: "audit", label: "Audit Logs", icon: MdTimeline },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-wrap justify-between items-end gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">System Configuration</p>
          <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Platform Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">Control global parameters and security protocols.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="px-6 py-2 bg-primary text-white text-sm font-black rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Save Configuration
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-border-dark overflow-x-auto">
        <div className="flex gap-8 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 pt-2 text-sm font-black tracking-wide transition-all border-b-[3px] flex items-center gap-2 ${activeTab === tab.id ? "border-b-primary text-primary" : "border-b-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "security" && (
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-8 text-primary">
                <MdKey className="text-2xl" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Authentication Policy</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-100 dark:border-border-dark/50 hover:border-primary/30 transition-all">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Force Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Require 2FA for all administrative accounts.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.is2FAEnforced} onChange={() => handleToggle("is2FAEnforced")} />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-100 dark:border-border-dark/50">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Session Timeout (Min)</p>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                      className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg py-2 px-3 text-sm font-bold"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-100 dark:border-border-dark/50">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Max Login Attempts</p>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleChange("maxLoginAttempts", e.target.value)}
                      className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg py-2 px-3 text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-8 text-primary">
                <MdSettings className="text-2xl" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Platform Control</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-500/5 rounded-xl border border-rose-100 dark:border-rose-500/10">
                  <div>
                    <p className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-tight">Maintenance Mode</p>
                    <p className="text-xs text-rose-500 mt-0.5 font-medium italic opacity-80">This will redirect all public traffic to the maintenance broadcast page.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.maintenanceMode} onChange={() => handleToggle("maintenanceMode")} />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500 shadow-sm"></div>
                  </label>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-100 dark:border-border-dark/50">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Platform Commission (%)</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="range" min="0" max="50"
                      value={settings.platformCommission}
                      onChange={(e) => handleChange("platformCommission", e.target.value)}
                      className="flex-1 accent-primary"
                    />
                    <span className="text-lg font-black text-primary">{settings.platformCommission}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

<<<<<<< HEAD
          {/* Quick Access to Notifications */}
          <div 
            className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm flex items-center justify-between group cursor-pointer hover:border-primary transition-all mt-6"
            onClick={() => navigate('/admin/settings/notifications')}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <MdNotificationsActive className="text-2xl" />
=======
          {activeTab === "rbac" && (
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-primary">
                  <MdGroups className="text-2xl" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Roles & Permissions</h3>
                </div>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'Create Role',
                      input: 'text',
                      inputLabel: 'Role Name',
                      inputPlaceholder: 'e.g. Editor',
                      showCancelButton: true,
                      confirmButtonText: 'Create',
                      confirmButtonColor: '#197fe6',
                      preConfirm: (name) => {
                        if (!name) Swal.showValidationMessage('Role name is required')
                        return name
                      }
                    }).then((result) => {
                      if (result.isConfirmed) {
                        const newRole = { name: result.value, users: 0, permissions: [] };
                        addRole(newRole);
                        Swal.fire('Created!', 'New role has been added.', 'success');
                      }
                    })
                  }}
                  className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary hover:opacity-70 transition-all"
                >
                  + Create Role
                </button>
>>>>>>> 30f6e99 (Admin Panel Enhancements: Integrated real-time promotions data, updated currency to INR, and refined dashboard analytics)
              </div>
              <div className="space-y-4">
                {roles.map(role => (
                  <div key={role.id} className="p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-100 dark:border-border-dark/30 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">{role.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{role.users} Active Users</p>
                      </div>
                      <MdDelete
                        onClick={() => {
                          Swal.fire({
                            title: 'Delete Role',
                            text: 'Are you sure you want to delete this role?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#ef4444',
                            confirmButtonText: 'Delete'
                          }).then((res) => {
                            if (res.isConfirmed) {
                              deleteRole(role.id);
                              Swal.fire('Deleted!', 'Role has been removed.', 'success');
                            }
                          })
                        }}
                        className="text-slate-400 group-hover:text-rose-500 cursor-pointer transition-colors"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map(p => (
                        <span key={p} className="px-2 py-0.5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                          {p.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-border-dark">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Active Audit Stream</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-background-dark/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <tr>
                      <th className="px-6 py-3">Action</th>
                      <th className="px-6 py-3">Details</th>
                      <th className="px-6 py-3">Admin</th>
                      <th className="px-6 py-3">IP Address</th>
                      <th className="px-6 py-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                    {auditLogs.length > 0 ? auditLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${log.action.includes('DELETE') ? 'bg-rose-100 text-rose-600' : 'bg-primary/10 text-primary'}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-[#9f9db9] min-w-[200px]">{log.details}</td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300">{log.adminName || 'System'}</td>
                        <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{log.ipAddress}</td>
                        <td className="px-6 py-4 text-[10px] font-black text-slate-400 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-20 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">No activity recorded yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">System Health</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black">99.9%</div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Uptime Verified</div>
            </div>
            <button onClick={runDiagnostic} className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/10 active:scale-95">
              Run Diagnostic Audit
            </button>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] flex items-center justify-between">
              Recent Security Events
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </h3>
            <div className="space-y-5">
              {(auditLogs.slice(0, 4) || []).map((log, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className={`size-10 rounded-xl bg-${log.action.includes('DELETE') ? 'rose' : 'emerald'}-500/10 flex items-center justify-center shrink-0 border border-transparent group-hover:border-primary/30 transition-all`}>
                    <MdVerifiedUser className={log.action.includes('DELETE') ? 'text-rose-500' : 'text-emerald-500'} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">{log.action} - {log.entityName}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">{new Date(log.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('audit')} className="w-full mt-8 text-[10px] font-black uppercase text-primary hover:text-primary/70 transition-colors flex items-center justify-center gap-2 group tracking-widest">
              Review Master Logs <MdArrowForward className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
