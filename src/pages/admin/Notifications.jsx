import React, { useState } from "react";
import {
  MdSearch,
  MdFilterList,
  MdNotificationImportant,
  MdPriorityHigh,
  MdInfo,
  MdCheckCircle,
  MdCreditCardOff,
  MdSchedule,
  MdFlag,
  MdExpandMore,
  MdDoneAll,
} from "react-icons/md";
import { initialNotifications } from "../../data/mockData";

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "Unread") return matchesSearch && !notification.isRead;
    if (activeFilter === "Flagged") return matchesSearch && notification.isFlagged;
    return matchesSearch;
  });

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const toggleFlag = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isFlagged: !n.isFlagged } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case "Dispute":
        return <MdPriorityHigh className="text-2xl" />;
      case "Verification":
        return <MdInfo className="text-2xl" />;
      case "Payment":
        return <MdCheckCircle className="text-2xl" />;
      case "Subscription":
        return <MdCreditCardOff className="text-2xl" />;
      default:
        return <MdInfo className="text-2xl" />;
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High") {
      return (
        <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
          High Priority
        </span>
      );
    }
    if (priority === "Low") {
      return (
        <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
          Resolved
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Notification Center
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium">
            Monitor system-wide alerts, professional verifications, and financial operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/30 outline-none text-slate-900 dark:text-white w-64 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <MdDoneAll className="text-xl" />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex p-1 bg-slate-200 dark:bg-background-dark/50 rounded-xl w-fit group">
        {["All", "Unread", "Flagged"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${
              activeFilter === filter
                ? "bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group flex items-center gap-5 bg-white dark:bg-surface-dark border ${
                notification.isRead
                  ? "border-slate-200 dark:border-border-dark"
                  : "border-primary/20 dark:border-primary/30"
              } p-5 rounded-2xl hover:shadow-md transition-all border-l-4 ${
                notification.type === "Dispute"
                  ? "border-l-rose-500"
                  : notification.type === "Verification"
                  ? "border-l-primary"
                  : notification.type === "Payment"
                  ? "border-l-emerald-500"
                  : "border-l-amber-500"
              }`}
            >
              <div
                className={`flex-shrink-0 size-14 flex items-center justify-center rounded-2xl ${
                  notification.type === "Dispute"
                    ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500"
                    : notification.type === "Verification"
                    ? "bg-primary/10 text-primary"
                    : notification.type === "Payment"
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500"
                    : "bg-amber-50 dark:bg-amber-500/10 text-amber-500"
                }`}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold truncate">
                    {notification.title}
                  </h3>
                  {getPriorityBadge(notification.priority)}
                  {!notification.isRead && (
                    <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {notification.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <MdSchedule className="text-base" /> {notification.time}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <button
                    onClick={() => toggleFlag(notification.id)}
                    className={`text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ${
                      notification.isFlagged
                        ? "text-amber-500 hover:text-amber-600"
                        : "text-slate-400 hover:text-primary"
                    }`}
                  >
                    <MdFlag className="text-base" />
                    {notification.isFlagged ? "Flagged" : "Flag for review"}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleRead(notification.id)}
                  className="px-4 py-2 bg-slate-100 dark:bg-background-dark hover:bg-primary hover:text-white text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  {notification.isRead ? "Unread" : "Open Alert"}
                </button>
                <button className="px-4 py-2 bg-transparent border border-slate-200 dark:border-border-dark hover:border-primary text-slate-400 hover:text-primary text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                   View Logs
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-surface-dark border border-dashed border-slate-300 dark:border-border-dark rounded-3xl opacity-60">
             <MdNotificationImportant className="text-6xl text-slate-300 mb-4" />
             <p className="text-slate-500 font-black uppercase tracking-[0.2em]">No Notifications Found</p>
          </div>
        )}

        <div className="pt-8 flex justify-center">
          <button className="flex items-center gap-2 px-8 py-3 rounded-2xl border border-slate-200 dark:border-border-dark text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-background-dark font-black text-xs uppercase tracking-widest transition-all group">
            Load Historical Alerts
            <MdExpandMore className="text-xl group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
