import { useState } from "react";
import {
  MdSecurity,
  MdVisibility,
  MdVisibilityOff,
  MdLock,
} from "react-icons/md";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-background-dark px-10 py-3">
        <div className="flex items-center gap-4 text-[#111418] dark:text-white">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold">LegalConsult Admin</h2>
        </div>

        <button className="rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold">
          Support
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          {/* Card */}
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-[#dce0e5] dark:border-gray-800 overflow-hidden">
            {/* Banner */}
            <div
              className="h-32 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #197fe6 0%, #0d4a8a 100%)",
              }}
            >
              <MdSecurity size={48} className="text-white" />
            </div>

            {/* Body */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-[#111418] dark:text-white mb-2">
                Admin Portal
              </h1>
              <p className="text-sm text-[#637588] dark:text-gray-400 mb-8">
                Secure access for managing users, lawyers, and payments.
              </p>

              <form className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-medium text-[#111418] dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. admin@legalconsult.com"
                    className="form-input h-14 rounded-lg border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white focus:ring-primary"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-base font-medium text-[#111418] dark:text-gray-200">
                      Password
                    </label>
                    <span className="text-primary text-sm font-semibold cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="form-input h-14 w-full rounded-lg border border-[#dce0e5] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white pr-12 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#637588] hover:text-primary"
                    >
                      {showPassword ? (
                        <MdVisibilityOff size={22} />
                      ) : (
                        <MdVisibility size={22} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button className="h-14 bg-primary text-white font-bold rounded-lg hover:bg-[#156bc2] transition-colors shadow-md">
                  Sign In
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="bg-background-light dark:bg-gray-800 px-8 py-4 border-t border-[#dce0e5] dark:border-gray-700 flex items-center justify-center gap-2 text-xs text-[#637588] dark:text-gray-400">
              <MdLock size={16} />
              Secure 256-bit Encrypted Connection
            </div>
          </div>

          <p className="text-center text-sm text-[#637588] dark:text-gray-400">
            Unauthorized access is strictly prohibited.{" "}
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-[#637588] dark:text-gray-500">
        © 2024 LegalConsult Admin Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
