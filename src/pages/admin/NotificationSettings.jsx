import React, { useState } from "react";
import {
  MdSearch,
  MdSend,
  MdMail,
  MdSms,
  MdNotificationsActive,
  MdEdit,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdLink,
  MdImage,
  MdAddCircle,
  MdContentCopy,
  MdHistory,
  MdLaptop,
  MdSmartphone,
  MdHelpCenter,
} from "react-icons/md";

const initialTriggers = [
  {
    id: 1,
    event: "New Consultation Booked",
    description: "Triggered when a user confirms payment for a session",
    email: true,
    sms: true,
    push: true,
    status: "Live",
    category: "User Notifications",
    subject: "Booking Confirmed: Your consultation with {{lawyer_name}}",
    body: "Hi {{user_first_name}},\n\nThis is a confirmation that your legal consultation with {{lawyer_name}} has been successfully booked for {{consultation_date}} at {{consultation_time}}.\n\nSession Link:\nhttps://legalplatform.com/meeting/{{meeting_id}}\n\nPlease ensure you have uploaded all necessary documents to your case file at least 1 hour before the session begins.\n\nRegards,\nLegalAdmin Team",
  },
  {
    id: 2,
    event: "Dispute Opened",
    description: "Triggered when a user flags a session for review",
    email: true,
    sms: false,
    push: true,
    status: "Draft",
    category: "User Notifications",
    subject: "Dispute Acknowledged: Case #{{case_id}}",
    body: "Hello {{user_first_name}},\n\nWe have received your dispute request for the session with {{lawyer_name}}. Our team will review the case and get back to you within 24-48 hours.",
  },
  {
    id: 3,
    event: "Identity Verified",
    description: "Triggered after manual compliance review",
    email: true,
    sms: false,
    push: false,
    status: "Live",
    category: "Lawyer Notifications",
    subject: "Identity Verified: Welcome to the Platform",
    body: "Congratulations {{lawyer_name}},\n\nYour identity documents have been verified. You can now start accepting consultation requests.",
  },
];

const variables = [
  { name: "{{user_first_name}}", description: "First name of the user" },
  { name: "{{lawyer_name}}", description: "Full name of the lawyer" },
  { name: "{{consultation_date}}", description: "Date of the session" },
  { name: "{{consultation_time}}", description: "Time of the session" },
  { name: "{{meeting_id}}", description: "Unique meeting identifier" },
];

const NotificationSettings = () => {
  const [activeTab, setActiveTab] = useState("User Notifications");
  const [searchQuery, setSearchQuery] = useState("");
  const [triggers, setTriggers] = useState(initialTriggers);
  const [editingTemplate, setEditingTemplate] = useState(initialTriggers[0]);

  const filteredTriggers = triggers.filter(
    (t) =>
      t.category === activeTab &&
      t.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id, channel) => {
    setTriggers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [channel]: !t[channel] } : t))
    );
  };

  const insertVariable = (variable) => {
    setEditingTemplate((prev) => ({
      ...prev,
      body: prev.body + " " + variable,
    }));
  };

  const handleSave = () => {
    setTriggers((prev) =>
      prev.map((t) => (t.id === editingTemplate.id ? editingTemplate : t))
    );
    alert("Changes saved successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark p-6 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">
            Configuration Center
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Notification Settings
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
            Manage event triggers, multi-channel delivery, and communication templates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-background-dark text-slate-700 dark:text-white rounded-xl text-sm font-black hover:bg-slate-200 transition-all border border-slate-200 dark:border-border-dark">
            <MdSend className="text-xl" />
            Send Test
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Section: Triggers & Channels */}
        <div className="xl:col-span-2 space-y-8">
          {/* Tabs & Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex p-1 bg-slate-100 dark:bg-background-dark/50 rounded-xl w-fit">
              {["User Notifications", "Lawyer Notifications", "Admin Alerts"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${
                      activeTab === tab
                        ? "bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.split(" ")[0]}
                  </button>
                )
              )}
            </div>
            <div className="relative w-full sm:w-64">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="Search triggers..."
                className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Triggers Table */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-background-dark/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="px-6 py-4">Event Trigger</th>
                  <th className="px-4 py-4 text-center">Channels</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                {filteredTriggers.map((trigger) => (
                  <tr
                    key={trigger.id}
                    className="hover:bg-slate-50 dark:hover:bg-background-dark/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {trigger.event}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {trigger.description}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <label className="cursor-pointer group relative">
                          <input
                            type="checkbox"
                            checked={trigger.email}
                            onChange={() => handleToggle(trigger.id, "email")}
                            className="hidden peer"
                          />
                          <MdMail
                            className={`text-xl transition-colors ${
                              trigger.email
                                ? "text-primary"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Email
                          </span>
                        </label>
                        <label className="cursor-pointer group relative">
                          <input
                            type="checkbox"
                            checked={trigger.sms}
                            onChange={() => handleToggle(trigger.id, "sms")}
                            className="hidden peer"
                          />
                          <MdSms
                            className={`text-xl transition-colors ${
                              trigger.sms
                                ? "text-amber-500"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            SMS
                          </span>
                        </label>
                        <label className="cursor-pointer group relative">
                          <input
                            type="checkbox"
                            checked={trigger.push}
                            onChange={() => handleToggle(trigger.id, "push")}
                            className="hidden peer"
                          />
                          <MdNotificationsActive
                            className={`text-xl transition-colors ${
                              trigger.push
                                ? "text-primary"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Push
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          trigger.status === "Live"
                            ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            trigger.status === "Live" ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        ></span>
                        {trigger.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setEditingTemplate(trigger)}
                        className={`text-xs font-black uppercase tracking-widest flex items-center gap-1.5 justify-end ml-auto ${
                          editingTemplate.id === trigger.id
                            ? "text-primary"
                            : "text-slate-400 hover:text-primary transition-colors"
                        }`}
                      >
                        <MdEdit className="text-base" />
                        Edit Template
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Template Editor */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-border-dark bg-slate-50 dark:bg-background-dark/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-500">
                  <MdFormatBold className="text-xl" />
                </div>
                <div className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-500">
                  <MdFormatItalic className="text-xl" />
                </div>
                <div className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-500">
                  <MdFormatListBulleted className="text-xl" />
                </div>
                <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2"></div>
                <div className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-500">
                  <MdLink className="text-xl" />
                </div>
                <div className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer text-slate-500">
                  <MdImage className="text-xl" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                   Editing ID:
                </span>
                <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded tracking-widest">
                   {editingTemplate.event.toUpperCase().replace(/\s/g, "_")}
                </span>
              </div>
            </div>

            {/* Subject Input */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-border-dark flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">
                Subject
              </span>
              <input
                type="text"
                className="flex-1 bg-transparent border-none p-0 text-sm font-bold text-slate-900 dark:text-white focus:ring-0"
                value={editingTemplate.subject}
                onChange={(e) =>
                  setEditingTemplate((prev) => ({ ...prev, subject: e.target.value }))
                }
              />
            </div>

            {/* Body Editor */}
            <textarea
              className="flex-1 p-8 text-sm leading-relaxed bg-transparent border-none focus:ring-0 text-slate-600 dark:text-slate-300 font-medium whitespace-pre-wrap"
              value={editingTemplate.body}
              onChange={(e) =>
                setEditingTemplate((prev) => ({ ...prev, body: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Right Section: Variables & Preview */}
        <div className="space-y-8">
          {/* Variables Panel */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Available Variables
            </h3>
            <div className="space-y-3">
              {variables.map((v) => (
                <div
                  key={v.name}
                  onClick={() => insertVariable(v.name)}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-background-dark/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 cursor-pointer transition-all"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-black text-primary tracking-wide">
                      {v.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {v.description}
                    </p>
                  </div>
                  <MdContentCopy className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-slate-400 italic font-medium leading-relaxed">
              * Click a variable to inject it at the end of the template body.
            </p>
          </div>

          {/* Tips Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <MdHelpCenter className="text-primary text-2xl" />
              <div>
                <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-2">
                  Formatting Guide
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Use double curly braces for dynamic tags. Ensure all mandatory lawyer & billing fields are included to avoid compliance errors.
                </p>
              </div>
            </div>
          </div>

          {/* Live Preview Placeholder */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Preview</h3>
                <div className="flex gap-2">
                   <MdLaptop className="text-primary cursor-pointer" />
                   <MdSmartphone className="text-slate-300 cursor-pointer" />
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-background-dark rounded-xl p-4 border border-slate-100 dark:border-border-dark min-h-[200px] flex flex-col gap-3">
                <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs font-bold">LA</div>
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                <div className="space-y-2">
                   <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
                   <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                </div>
                <div className="mt-auto pt-4 flex justify-between">
                   <div className="h-6 w-20 bg-primary rounded-md"></div>
                   <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                </div>
             </div>
             <button className="w-full mt-6 py-2.5 bg-slate-100 dark:bg-background-dark hover:bg-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 rounded-xl transition-all">
                View Detailed Preview
             </button>
          </div>

          {/* Activity Log */}
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <MdHistory className="text-slate-400 text-xl" />
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h3>
             </div>
             <div className="space-y-4">
                {[
                  { name: 'Sarah Jenkins', action: 'updated Template', target: 'CONSULTATION_CANCELLED', date: '2m' },
                  { name: 'Alex Rivera', action: 'disabled Push', target: 'ID_VERIFIED', date: '4h' }
                ].map((log, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-slate-100 dark:border-border-dark pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-black text-slate-900 dark:text-white">{log.name}</span>
                      <span className="text-slate-400 font-bold">{log.date} ago</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {log.action} <span className="text-primary font-bold">{log.target}</span>
                    </p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
