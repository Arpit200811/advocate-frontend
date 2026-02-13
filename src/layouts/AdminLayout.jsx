import React from "react";
import { useDropdown } from "../utils/dropdownHelper";
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
  MdMenu,
  MdClose,
  MdExpandMore,
} from "react-icons/md";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { openDropdown, toggle, setOpenDropdown } = useDropdown(null); // 'notifications', 'profile'
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
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen flex overflow-hidden font-display relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[45] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-64 flex-shrink-0 bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-border-dark flex flex-col fixed inset-y-0 left-0 z-[50] lg:relative lg:translate-x-0 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          {/* Brand & Close button for mobile */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white font-bold">
                <MdGavel className="text-2xl" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-none">LegalAdmin</h1>
                <p className="text-slate-500 text-xs mt-1">Management Portal</p>
              </div>
            </div>
            <button 
              className="lg:hidden p-2 text-slate-400 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MdClose className="text-2xl" />
            </button>
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
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-border-dark z-40">
          <div className="flex items-center flex-1 gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MdMenu className="text-2xl" />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary placeholder:text-slate-500 dark:placeholder:text-slate-400"
                placeholder="Search for cases, lawyers, or clients..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <button 
                onClick={() => toggle('notifications')}
                className={`relative p-2 rounded-full transition-colors ${openDropdown === 'notifications' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark'}`}
              >
                <MdNotifications className="text-xl" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
              </button>
              
              {openDropdown === 'notifications' && (
                <div data-dropdown="notifications" className="absolute right-0 mt-3 w-80 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden" aria-labelledby="notifications-button" role="menu" aria-expanded={openDropdown === 'notifications'}>
                  <div className="p-4 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Alerts Center</h4>
                    <span className="text-[10px] text-primary font-bold hover:underline cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="p-3 hover:bg-slate-50 dark:hover:bg-background-dark rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-100 dark:hover:border-border-dark">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">New lawyer verification request #VL-922{i}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">2 hours ago • Action Required</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/admin/notifications" onClick={() => setActiveDropdown(null)} className="block p-3 text-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-background-dark border-t border-slate-100 dark:border-border-dark">
                    View Comprehensive Activity Log
                  </Link>
                </div>
              )}
            </div>

            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark rounded-full transition-colors">
              <MdChatBubble className="text-xl" />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:border-border-dark mx-1 md:mx-2"></div>
            <div className="relative">
              <div 
                onClick={() => toggle('profile')}
                className="flex items-center gap-3 pl-2 cursor-pointer group" aria-haspopup="true" aria-expanded={openDropdown === 'profile'}
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                    Alex Thompson
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Super Admin</p>
                </div>
                <div
                  className="h-10 w-10 rounded-full bg-slate-200 dark:bg-surface-dark bg-cover bg-center border border-slate-300 dark:border-border-dark group-hover:border-primary transition-all shadow-sm"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANLCp28aD-R3rNQnnzFI1ivp1l1mDuddVgwtdf0YVkfjIpibluNhajp68XmKH4D6YzR5JAgzH_MpsHRrDoUIhtR05g24hTYkZEePGOL2ytlnAHEaDN6Qfi6wDWKRKTfzTkvZfucG635CmDkLIf-vNJV3liB9_W8xIFlyLCTK9mP-NaN4IW8LwOVkz-75zFSzhxzFmj1KVdE8zD9hu0XpxpniTi60D_G2lfzMjT1-RpNiL_CuVSJPtOdLU06TLk8R7RAefELc8d8PEy')",
                  }}
                ></div>
              </div>

              {openDropdown === 'profile' && (
                <div data-dropdown="profile" className="absolute right-0 mt-3 w-56 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden" aria-labelledby="profile-button" role="menu" aria-expanded={openDropdown === 'profile'}>
                  <div className="p-4 border-b border-slate-100 dark:border-border-dark bg-slate-50 dark:bg-background-dark/30">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">alex.thompson@legal.com</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button onClick={() => {navigate('/admin/settings'); setActiveDropdown(null);}} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-background-dark rounded-lg transition-colors">
                      <MdSettings className="text-base" /> My Settings
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                      <MdLogout className="text-base" /> Secure Sign Out
                    </button>
                  </div>
                </div>
              )}
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
