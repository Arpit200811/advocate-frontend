import React from "react";
import {
  MdChevronRight,
  MdGavel,
  MdContentCopy,
  MdMail,
  MdPhone,
  MdCheckCircle,
  MdPending,
  MdRadioButtonUnchecked,
  MdBadge,
  MdZoomIn,
  MdVerified,
  MdWorkspacePremium,
  MdPictureAsPdf,
  MdFileDownload,
  MdVisibility,
  MdSecurity,
  MdRefresh,
  MdInfo,
} from "react-icons/md";

const LawyerVerification = () => {
  return (
    <div className="relative pb-24">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <a className="hover:text-primary transition-colors" href="#">
            Lawyers
          </a>
          <MdChevronRight className="text-xs" />
          <a className="hover:text-primary transition-colors" href="#">
            Verification Queue
          </a>
          <MdChevronRight className="text-xs" />
          <span className="text-slate-900 dark:text-white font-medium">
            Verification Details
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Profile Summary */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div
                className="size-32 rounded-full border-4 border-primary/10 mb-4 bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB55BQ5c2_TT2WfxYQhYTx6BoG_WPceo8fL3iMDeryOb0d48APANCKp1of6zl-jsBuNzyUbrzClP3nb8xkc3CuKHyJurvzHbMo3MBvYgTC5Oj8Yv5X0FAXTfK_3Rku1NJMvYhwDr1fNP945IwWwep3hRSH_ZPPInST1c1YmkgVYB8grx-KYS04nD2wD_NWAhgfolSIkfb-UlrJiMZjIimYT_s8TZ20yVCCCAmi_Zl3dlZ31BXAaaSfjXeQFXiX99zuLqMl_CAEFF-HB')",
                }}
              ></div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Jonathan H. Sterling, Esq.
              </h1>
              <p className="text-primary font-medium text-sm mt-1">
                Corporate Law Specialist
              </p>
              <div className="mt-4 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Pending Verification
              </div>
            </div>
            <div className="space-y-4 border-t border-slate-100 dark:border-border-dark pt-6">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Bar Association ID
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm text-slate-900 dark:text-white">
                    #NY-99201-2024
                  </p>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <MdContentCopy className="text-sm" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Years of Practice
                </p>
                <p className="text-sm text-slate-900 dark:text-white">
                  12 Years
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-background-dark text-[10px] rounded border border-slate-200 dark:border-border-dark">
                    Mergers & Acquisitions
                  </span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-background-dark text-[10px] rounded border border-slate-200 dark:border-border-dark">
                    Tax Law
                  </span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-background-dark text-[10px] rounded border border-slate-200 dark:border-border-dark">
                    Intellectual Property
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Contact Information
                </p>
                <p className="text-sm flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
                  <MdMail className="text-base text-slate-400" />
                  j.sterling@lawfirm.com
                </p>
                <p className="text-sm flex items-center gap-2 mt-1 text-slate-600 dark:text-slate-300">
                  <MdPhone className="text-base text-slate-400" />
                  +1 (555) 902-1234
                </p>
              </div>
            </div>
          </div>
          {/* Verification Progress Card */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <h3 className="font-bold text-sm mb-4 text-slate-900 dark:text-white">
              Verification Progress
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdCheckCircle className="text-green-500 text-lg" />
                <p className="text-sm flex-1 text-slate-600 dark:text-slate-300">
                  Identity Documents
                </p>
                <span className="text-xs text-slate-500">2/2</span>
              </div>
              <div className="flex items-center gap-3">
                <MdPending className="text-primary text-lg" />
                <p className="text-sm flex-1 text-slate-600 dark:text-slate-300">
                  Bar Certification
                </p>
                <span className="text-xs text-slate-500">1/1</span>
              </div>
              <div className="flex items-center gap-3">
                <MdRadioButtonUnchecked className="text-slate-400 text-lg" />
                <p className="text-sm flex-1 text-slate-400">Background Check</p>
                <span className="text-xs text-slate-500">Pending</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full mt-4 overflow-hidden border border-slate-200 dark:border-border-dark">
                <div className="bg-primary h-full w-[66%]"></div>
              </div>
              <p className="text-[10px] text-center text-slate-500 mt-2 font-medium tracking-wide">
                66% OF STEPS COMPLETED
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Identity Documents Section */}
          <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <MdBadge className="text-2xl" />
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Identity Documents
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Uploaded 48h ago
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <div
                  className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-background-dark bg-cover bg-center overflow-hidden border border-slate-200 dark:border-border-dark"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5UsWBc99Xh-iqIrJXBEo--QSoWcdh5yHOTEoTkUSm3bp782O2LfUUyTWhFNeqlgFQbbCc6yi0LBRjqLRfI5SgrJ4baGXJ69ojHRbazqKoqrUoYgz8vUGh8VS3u7l2owxgqqEEHcU748SWZC6-edDDrf3vRzXg75IC1dVo_KDXGlWyDMvU5nS5LxiYN6Lpa3LUzArHsKr26lcJkVyvN1yAffr__i_fJZxVjLBE7HOcOxPaAYfZ6qzCnAKeyWAjiuSZfX_V5kclS2B')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors shadow-lg border border-white/20">
                      <MdZoomIn className="text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Passport - Front
                    </p>
                    <p className="text-xs text-slate-500">
                      JPEG, 2.4MB • Valid until 2029
                    </p>
                  </div>
                  <MdVerified className="text-green-500 text-xl" />
                </div>
              </div>
              <div className="group relative">
                <div
                  className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-background-dark bg-cover bg-center overflow-hidden border border-slate-200 dark:border-border-dark"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkApSoavaNrGQPVR9laCWWee29RKABlPjcPFm9r9U4lXzLMTqcFUcp4IK8vSAW_MJvFIBm7cGo91FpcRXXq4gXpO40lWjixJ1tqybqZiGPxqrZMcV6YN_3TJRfpYVNyVgJgX2E3T5ss1RLCLgxKIqcLXsqsFvVBG9-D8qNXjSwz7cQf0WlXOoCHJ5F9SP0-mxsaKLT4D0-FEgurAqtXzU_kAcDo68fhHhvCt-f8CqBPgk1DhqZUuBrc4xw3hCMof-smgMlYnqVn3R_')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors shadow-lg border border-white/20">
                      <MdZoomIn className="text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Driver's License - Front
                    </p>
                    <p className="text-xs text-slate-500">
                      PNG, 1.8MB • NY State ID
                    </p>
                  </div>
                  <MdVerified className="text-green-500 text-xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Professional Certifications Section */}
          <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <MdWorkspacePremium className="text-2xl" />
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Professional Certifications
                </h2>
              </div>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-border-dark">
              {/* Certification Item 1 */}
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                    <MdPictureAsPdf className="text-3xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      NY State Bar Membership Certificate
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                      PDF • 1.2 MB • Issued Dec 2012
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <MdFileDownload className="text-sm" /> Download
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                    <MdVisibility className="text-sm" /> View
                  </button>
                </div>
              </div>
              {/* Certification Item 2 */}
              <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                    <MdPictureAsPdf className="text-3xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Professional Indemnity Insurance (Active)
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                      PDF • 850 KB • Expires June 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <MdFileDownload className="text-sm" /> Download
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                    <MdVisibility className="text-sm" /> View
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Background Check Status */}
          <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-primary">
                <MdSecurity className="text-2xl" />
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Background Check Status
                </h2>
              </div>
              <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                Run New Check <MdRefresh className="text-sm" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-background-dark p-4 rounded-lg flex flex-col gap-2 border border-slate-100 dark:border-border-dark">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Criminal Record
                </p>
                <div className="flex items-center gap-2 text-green-500">
                  <MdCheckCircle className="text-lg" />
                  <span className="text-sm font-bold">No Matches Found</span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-background-dark p-4 rounded-lg flex flex-col gap-2 border border-slate-100 dark:border-border-dark">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Sanctions List
                </p>
                <div className="flex items-center gap-2 text-green-500">
                  <MdCheckCircle className="text-lg" />
                  <span className="text-sm font-bold">Clear</span>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg flex flex-col gap-2 border border-amber-200 dark:border-amber-900/50">
                <p className="text-[10px] text-amber-600 dark:text-amber-500 uppercase font-bold tracking-wider">
                  Public Records
                </p>
                <div className="flex items-center gap-2 text-amber-600">
                  <MdInfo className="text-lg" />
                  <span className="text-sm font-bold">1 Alert Found</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Persistent Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-[90] bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-border-dark p-4 shadow-2xl transition-all duration-300">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <textarea
              className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none h-12 transition-all focus:h-20"
              placeholder="Internal admin notes (reason for approval/rejection)..."
            ></textarea>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none min-w-[140px] px-6 py-2.5 rounded-lg border border-slate-200 dark:border-border-dark text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
              Request Revision
            </button>
            <button className="flex-1 md:flex-none min-w-[120px] px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 transition-all">
              Reject
            </button>
            <button className="flex-1 md:flex-none min-w-[160px] px-8 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
              Approve Lawyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerVerification;
