import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MdGavel,
  MdShield,
  MdVerifiedUser,
  MdArrowForward,
  MdTimer,
  MdRefresh,
  MdKeyboardBackspace,
  MdHelp,
  MdLock,
  MdVerified,
} from "react-icons/md";

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(54);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow only one digit
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").split("").filter((item) => !isNaN(item));
    if (data.length === 6) {
      setOtp(data);
      inputRefs.current[5].focus();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResend = () => {
    setTimer(54);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      console.log("Verifying code:", code);
      // Add verification logic here
    } else {
      alert("Please enter a complete 6-digit code.");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-3 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary flex items-center justify-center">
            <MdGavel className="text-3xl" />
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Legal Admin Panel
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Security Level
            </span>
            <span className="text-xs font-bold text-emerald-500">ENHANCED</span>
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <MdShield className="text-xl" />
          </button>
        </div>
      </header>
      {/* Main Content Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          {/* Security Icon Header */}
          <div className="mb-8 p-4 rounded-full bg-primary/10 border border-primary/20">
            <MdVerifiedUser className="text-primary text-5xl" />
          </div>
          {/* Headline and Subtext */}
          <div className="text-center mb-8">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight mb-3">
              Security Verification
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed max-w-sm mx-auto">
              Enter the 6-digit verification code sent to your registered device
              to access the legal admin panel.
            </p>
          </div>
          {/* Verification Card */}
          <div className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-xl">
            {/* 6-Digit Code Inputs */}
            <div className="flex justify-center mb-8">
              <fieldset className="flex gap-2 sm:gap-3" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    autoComplete="one-time-code"
                    autoFocus={i === 0}
                    className="otp-input flex h-14 w-10 sm:h-16 sm:w-14 text-center text-xl font-bold rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-0 focus:outline-none transition-all dark:text-white"
                    maxLength={1}
                    placeholder="•"
                    type="text"
                    inputMode="numeric"
                  />
                ))}
              </fieldset>
            </div>
            {/* Verify Button */}
            <button
              onClick={handleVerify}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white h-14 rounded-lg text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              <span>Verify & Continue</span>
              <MdArrowForward className="text-xl" />
            </button>
            {/* Resend Section */}
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <MdTimer className="text-lg" />
                Didn't receive a code? Resend in{" "}
                <span className="text-primary font-mono font-bold">
                  {formatTime(timer)}
                </span>
              </p>
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm font-semibold flex items-center gap-1 transition-colors ${
                  canResend
                    ? "text-primary hover:text-primary/80 cursor-pointer"
                    : "text-slate-400 cursor-not-allowed hover:text-slate-500"
                }`}
              >
                <MdRefresh className="text-base" />
                Resend Code
              </button>
            </div>
          </div>
          {/* Footer Links */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <Link
              className="text-sm font-medium text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
              to="/"
            >
              <MdKeyboardBackspace className="text-base" />
              Back to Login
            </Link>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <Link
              className="text-sm font-medium text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
              to="#"
            >
              <MdHelp className="text-base" />
              Support
            </Link>
          </div>
        </div>
      </main>
      {/* Page Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden opacity-50 dark:opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
      </div>
      {/* Security Badging Footer */}
      <footer className="py-6 px-10 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
            <MdLock className="text-base text-emerald-500" />
            End-to-end Encrypted
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
            <MdVerified className="text-base text-emerald-500" />
            PCI-DSS Compliant
          </div>
        </div>
        <p className="text-xs text-slate-400">
          © 2026 Legal Admin Portal. All security protocols active.
        </p>
      </footer>
    </div>
  );
};

export default TwoFactorAuth;
