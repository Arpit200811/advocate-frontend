import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdArrowBack } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6 text-center font-display">
      <div className="relative group">
        <h1 className="text-[180px] md:text-[240px] font-black leading-none text-white/5 select-none transition-all group-hover:text-primary/10">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/20 backdrop-blur-3xl size-64 rounded-full blur-[80px] animate-pulse"></div>
          <div className="bg-indigo-500/10 backdrop-blur-3xl size-80 rounded-full blur-[100px] absolute -top-10 -left-10 animate-blob"></div>
        </div>
      </div>

      <div className="relative z-10 -mt-10 md:-mt-20">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Lost in the Legal Labyrinth?
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed font-medium">
          The page you're looking for has moved to a undisclosed location or never existed in this jurisdiction.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group scale-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MdHome className="text-xl group-hover:-translate-y-0.5 transition-transform" />
            Back to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 text-slate-300 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all hover:text-white group"
          >
            <MdArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>
      </div>

      <div className="mt-20 flex items-center gap-8 opacity-20">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-slate-500"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
          Antigravity Legal System
        </span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-slate-500"></div>
      </div>
    </div>
  );
};

export default NotFound;
