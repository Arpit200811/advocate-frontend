import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MdDashboard,
  MdWork,
  MdCalendarToday,
  MdPayments,
  MdGroup,
  MdPeople,
  MdSettings,
  MdLogout,
  MdSearch,
  MdNotifications,
  MdNotificationsActive,
  MdChatBubble,
  MdGavel,
  MdVerifiedUser,
  MdWarning,
  MdAnalytics,
  MdStars,
  MdRedeem,
  MdAccountBalanceWallet,
  MdCategory,
} from "react-icons/md";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to exit the management portal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mock logout
        navigate("/");
        Swal.fire({
          title: "Logged Out",
          text: "You have been securely logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path)
      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
      : "text-slate-600 dark:text-[#9f9db9] hover:bg-slate-100 dark:hover:bg-[#2a2839] hover:text-primary dark:hover:text-white";
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden font-display">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-border-dark hidden lg:flex flex-col">
        <div className="p-6 flex flex-col h-full">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
              <MdGavel className="text-2xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none">LegalAdmin</h1>
              <p className="text-slate-500 text-xs mt-1">Management Portal</p>
            </div>
          </div>
          {/* Nav Links */}
          <nav className="flex-1 space-y-1">
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/dashboard"
              )}`}
              to="/admin/dashboard"
            >
              <MdDashboard className="text-xl" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/analytics"
              )}`}
              to="/admin/analytics"
            >
              <MdAnalytics className="text-xl" />
              <span className="text-sm font-medium">Analytics</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/lawyers/queue"
              )}`}
              to="/admin/lawyers/queue"
            >
              <MdVerifiedUser className="text-xl" />
              <span className="text-sm font-medium">Verification Queue</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/lawyers"
              )}`}
              to="/admin/lawyers"
            >
              <MdWork className="text-xl" />
              <span className="text-sm font-medium">Lawyers</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/consultations"
              )}`}
              to="/admin/consultations"
            >
              <MdCalendarToday className="text-xl" />
              <span className="text-sm font-medium">Consultations</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/payments"
              )}`}
              to="/admin/payments"
            >
              <MdPayments className="text-xl" />
              <span className="text-sm font-medium">Payments</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/payouts"
              )}`}
              to="/admin/payouts"
            >
              <MdAccountBalanceWallet className="text-xl" />
              <span className="text-sm font-medium">Payouts</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/notifications"
              )}`}
              to="/admin/notifications"
            >
              <MdNotificationsActive className="text-xl" />
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-black">
                12
              </span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/disputes"
              )}`}
              to="/admin/disputes"
            >
              <MdWarning className="text-xl" />
              <span className="text-sm font-medium">Disputes</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/reviews"
              )}`}
              to="/admin/reviews"
            >
              <MdChatBubble className="text-xl" />
              <span className="text-sm font-medium">Reviews</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/users"
              )}`}
              to="/admin/users"
            >
              <MdPeople className="text-xl" />
              <span className="text-sm font-medium">Users</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/categories"
              )}`}
              to="/admin/categories"
            >
              <MdCategory className="text-xl" />
              <span className="text-sm font-medium">Categories</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/promotions"
              )}`}
              to="/admin/promotions"
            >
              <MdStars className="text-xl" />
              <span className="text-sm font-medium">Promotions</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/referrals"
              )}`}
              to="/admin/referrals"
            >
              <MdRedeem className="text-xl" />
              <span className="text-sm font-medium">Referrals</span>
            </Link>
          </nav>
          {/* Footer Nav */}
          <div className="pt-6 border-t border-slate-200 dark:border-border-dark space-y-1">
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/settings"
              )}`}
              to="/admin/settings"
            >
              <MdSettings className="text-xl" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(
                "/admin/settings/notifications"
              )}`}
              to="/admin/settings/notifications"
            >
              <MdNotificationsActive className="text-xl" />
              <span className="text-sm font-medium">Notification Templates</span>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              onClick={handleLogout}
              to="#"
            >
              <MdLogout className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-border-dark z-10">
          <div className="flex items-center flex-1 gap-4">
            <div className="relative w-full max-w-md">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Search for cases, lawyers, or clients..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin/notifications"
              className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors"
            >
              <MdNotifications className="text-xl" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
            </Link>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors">
              <MdChatBubble className="text-xl" />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:border-border-dark mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold leading-none">
                  Alex Thompson
                </p>
                <p className="text-xs text-slate-500 mt-1">Super Admin</p>
              </div>
              <div
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-surface-dark bg-cover bg-center border border-slate-300 dark:border-border-dark"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANLCp28aD-R3rNQnnzFI1ivp1l1mDuddVgwtdf0YVkfjIpibluNhajp68XmKH4D6YzR5JAgzH_MpsHRrDoUIhtR05g24hTYkZEePGOL2ytlnAHEaDN6Qfi6wDWKRKTfzTkvZfucG635CmDkLIf-vNJV3liB9_W8xIFlyLCTK9mP-NaN4IW8LwOVkz-75zFSzhxzFmj1KVdE8zD9hu0XpxpniTi60D_G2lfzMjT1-RpNiL_CuVSJPtOdLU06TLk8R7RAefELc8d8PEy')",
                }}
              ></div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
