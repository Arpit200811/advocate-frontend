import React, { useState } from "react";
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
  MdSettings,
} from "react-icons/md";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("security");
  const [settings, setSettings] = useState({
    is2FAEnforced: true,
    maintenanceMode: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    emailNotifications: true,
    platformCommission: 15,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: "general", label: "General", icon: MdSettings },
    { id: "security", label: "Security", icon: MdShield },
    { id: "rbac", label: "Roles & Permissions", icon: MdGroups },
    { id: "notifications", label: "Notifications", icon: MdNotifications },
  ];

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-end gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            System Configuration
          </p>
          <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
            Platform Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Control global parameters, security protocols, and operational thresholds.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-200 dark:bg-surface-dark text-slate-900 dark:text-white text-sm font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
            Reset Defaults
          </button>
          <button className="px-6 py-2 bg-primary text-white text-sm font-black rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            Save Configuration
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-border-dark">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 pt-2 text-sm font-black tracking-wide transition-all border-b-[3px] flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Security Policies */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "security" && (
            <>
              {/* Authentication Card */}
              <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-8 text-primary">
                  <MdKey className="text-2xl" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Authentication Policy
                  </h3>
                </div>
                <div className="space-y-8">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl border border-slate-100 dark:border-border-dark/50">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Force Two-Factor Authentication (2FA)
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Strictly enforce 2FA login for all administrative personnel.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.is2FAEnforced}
                        onChange={() => handleToggle("is2FAEnforced")}
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Session Idle Timeout
                      </label>
                      <div className="relative">
                        <input
                          className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white"
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">
                          Minutes
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Failed Login Lockdown
                      </label>
                      <select 
                        className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white appearance-none"
                        value={settings.maxLoginAttempts}
                        onChange={(e) => handleChange("maxLoginAttempts", e.target.value)}
                      >
                        <option value={3}>3 Attempts</option>
                        <option value={5}>5 Attempts</option>
                        <option value={10}>10 Attempts</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Policy Card */}
              <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-8 text-primary">
                  <MdSecurity className="text-2xl" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Password Composition
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    "Minimum length (12+ chars)",
                    "Require both casing (A-z)",
                    "Require Special Characters (!?)",
                    "Require Numerical Digits (0-9)",
                  ].map((req, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="size-5 rounded border-slate-300 text-primary shadow-sm focus:ring-primary/30 cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "general" && (
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-8 text-primary">
                <MdSettings className="text-2xl" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Platform Control</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-rose-50 dark:bg-rose-500/5 rounded-xl border border-rose-100 dark:border-rose-500/10">
                  <div>
                    <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
                      Maintenance Mode
                    </p>
                    <p className="text-xs text-rose-500/70 mt-0.5">
                      Redirect all incoming traffic to a maintenance downtime page.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.maintenanceMode}
                      onChange={() => handleToggle("maintenanceMode")}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Platform Revenue Share (%)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white"
                      type="number"
                      value={settings.platformCommission}
                      onChange={(e) => handleChange("platformCommission", e.target.value)}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">
                      Percent (%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Access to Notifications */}
          <div 
            className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm flex items-center justify-between group cursor-pointer hover:border-primary transition-all mt-6"
            onClick={() => window.location.href = '/admin/settings/notifications'}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <MdNotificationsActive className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notification Templates</h3>
                <p className="text-sm text-slate-500 font-medium">Manage Email, SMS, and Push triggers and variables.</p>
              </div>
            </div>
            <MdArrowForward className="text-2xl text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        {/* Right Column: Information & Logs */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">System Health</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-black">99.9%</div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Uptime <br/> Verified
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: "99.9%" }}></div>
                </div>
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all border border-white/10">
                  Run Diagnostic Audit
                </button>
             </div>
          </div>

          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">
              Recent Security Events
            </h3>
            <div className="space-y-5">
              {[
                {
                  icon: <MdWarning className="text-amber-500" />,
                  title: "Failed Root Login",
                  detail: "IP: 192.168.1.45 • 2m ago",
                  color: "amber",
                },
                {
                  icon: <MdVerifiedUser className="text-emerald-500" />,
                  title: "Security Patch Applied",
                  detail: "Node Cluster v4.2 • 1h ago",
                  color: "emerald",
                },
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`size-10 rounded-xl bg-${activity.color}-500/10 flex items-center justify-center shrink-0`}>
                    {activity.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-black text-slate-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                      {activity.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 text-[10px] font-black uppercase text-primary hover:text-primary/70 transition-colors flex items-center justify-center gap-2 group tracking-widest">
              Review Master Logs
              <MdArrowForward className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
