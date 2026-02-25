import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
import { useData } from "../../context/DataContext";
import api from "../../services/api";

const LawyerVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lawyers, updateLawyer, runBackgroundCheck } = useData();

  const lawyer = lawyers.find((l) => String(l.id) === id);

  if (!lawyer) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <MdInfo className="text-6xl mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Lawyer Not Found</h2>
        <p>The lawyer application you are looking for does not exist.</p>
        <Link to="/admin/lawyers/queue" className="mt-4 text-primary font-bold hover:underline">
          Return to Queue
        </Link>
      </div>
    );
  }

  const handleAction = (status) => {
    const actionText = status === "Approved" ? "Approve" : "Reject";
    const icon = status === "Approved" ? "success" : "error";

    Swal.fire({
      title: `${actionText} Lawyer?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${lawyer.name}'s application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "Approved" ? "#22c55e" : "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: `Yes, ${actionText}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateLawyer(lawyer.id, { status });
        Swal.fire({
          title: "Success!",
          text: `Lawyer has been ${status.toLowerCase()}.`,
          icon: icon,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/admin/lawyers/queue");
        });
      }
    });
  };

  const handleDocumentAction = async (type, action) => {
    try {
      if (action === "download") {
        const response = await api.get(`/admin/lawyers/${id}/document/${type}?action=download`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${type}_document.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        const response = await api.get(`/admin/lawyers/${id}/document/${type}`);
        window.open(response.data.url || "#", "_blank");
      }
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Could not access secure document", "error");
    }
  };

  const handleRunCheck = async () => {
    Swal.fire({
      title: 'Running Check...',
      text: 'Querying external background check services...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    await runBackgroundCheck(lawyer.id);
    Swal.fire('Complete', 'Background check refreshed successfully.', 'success');
  };

  return (
    <div className="relative pb-24 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link className="hover:text-primary transition-colors" to="/admin/lawyers">
            Lawyers
          </Link>
          <MdChevronRight className="text-xs" />
          <Link className="hover:text-primary transition-colors" to="/admin/lawyers/queue">
            Verification Queue
          </Link>
          <MdChevronRight className="text-xs" />
          <span className="text-slate-900 dark:text-white font-medium">
            Verification Details
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div
                className="size-32 rounded-full border-4 border-primary/10 mb-4 bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage: `url('${lawyer.image}')`,
                }}
              ></div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {lawyer.name}
              </h1>
              <p className="text-primary font-medium text-sm mt-1">
                {lawyer.specialization}
              </p>
              <div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lawyer.status === "Approved" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                lawyer.status === "Pending Review" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" :
                  "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}>
                {lawyer.status}
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
                {lawyer.documents?.passport && lawyer.documents?.license ? (
                  <MdCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <MdPending className="text-amber-500 text-lg" />
                )}
                <p className="text-sm flex-1 text-slate-600 dark:text-slate-300">
                  Identity Documents
                </p>
                <span className="text-xs text-slate-500">
                  {(lawyer.documents?.passport ? 1 : 0) + (lawyer.documents?.license ? 1 : 0)}/2
                </span>
              </div>
              <div className="flex items-center gap-3">
                {lawyer.documents?.barCert ? (
                  <MdCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <MdRadioButtonUnchecked className="text-slate-400 text-lg" />
                )}
                <p className="text-sm flex-1 text-slate-600 dark:text-slate-300">
                  Bar Certification
                </p>
                <span className="text-xs text-slate-500">
                  {lawyer.documents?.barCert ? '1/1' : '0/1'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {lawyer.documents?.insurance ? (
                  <MdCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <MdRadioButtonUnchecked className="text-slate-400 text-lg" />
                )}
                <p className="text-sm flex-1 text-slate-600 dark:text-slate-300">Background Check</p>
                <span className="text-xs text-slate-500">
                  {lawyer.documents?.insurance ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-background-dark h-2 rounded-full mt-4 overflow-hidden border border-slate-200 dark:border-border-dark">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${(((lawyer.documents?.passport ? 1 : 0) + (lawyer.documents?.license ? 1 : 0) + (lawyer.documents?.barCert ? 1 : 0) + (lawyer.documents?.insurance ? 1 : 0)) / 4) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-center text-slate-500 mt-2 font-medium tracking-wide">
                {Math.round((((lawyer.documents?.passport ? 1 : 0) + (lawyer.documents?.license ? 1 : 0) + (lawyer.documents?.barCert ? 1 : 0) + (lawyer.documents?.insurance ? 1 : 0)) / 4) * 100)}% OF STEPS COMPLETED
              </p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 flex flex-col gap-6">
          <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-border-dark flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <MdBadge className="text-2xl" />
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Identity Documents
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Uploaded Recently
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {lawyer.documents?.passport && (
                <div className="group relative">
                  <div
                    className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-background-dark bg-cover bg-center overflow-hidden border border-slate-200 dark:border-border-dark"
                    style={{
                      backgroundImage: `url('${lawyer.documents.passport.uri}')`,
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
                        Passport / National ID
                      </p>
                      <p className="text-xs text-slate-500">
                        {lawyer.documents.passport.name}
                      </p>
                    </div>
                    <MdVerified className="text-green-500 text-xl" />
                  </div>
                </div>
              )}
              {lawyer.documents?.license && (
                <div className="group relative">
                  <div
                    className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-background-dark bg-cover bg-center overflow-hidden border border-slate-200 dark:border-border-dark"
                    style={{
                      backgroundImage: `url('${lawyer.documents.license.uri}')`,
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
                        Driver's License
                      </p>
                      <p className="text-xs text-slate-500">
                        {lawyer.documents.license.name}
                      </p>
                    </div>
                    <MdVerified className="text-green-500 text-xl" />
                  </div>
                </div>
              )}
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
              {lawyer.documents?.barCert && (
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                      <MdPictureAsPdf className="text-3xl" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Bar Membership Certificate
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                        {lawyer.documents.barCert.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDocumentAction('barCert', 'download')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <MdFileDownload className="text-sm" /> Download
                    </button>
                    <button onClick={() => handleDocumentAction('barCert', 'view')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                      <MdVisibility className="text-sm" /> View
                    </button>
                  </div>
                </div>
              )}
              {lawyer.documents?.insurance && (
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                      <MdPictureAsPdf className="text-3xl" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Professional Indemnity Insurance
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                        {lawyer.documents.insurance.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDocumentAction('insurance', 'download')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <MdFileDownload className="text-sm" /> Download
                    </button>
                    <button onClick={() => handleDocumentAction('insurance', 'view')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                      <MdVisibility className="text-sm" /> View
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-primary">
                <MdSecurity className="text-2xl" />
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Background Check Status
                </h2>
              </div>
              <button onClick={handleRunCheck} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
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

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-[90] bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-border-dark p-4 shadow-2xl transition-all duration-300">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <textarea
              className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none h-12 transition-all focus:h-20"
              placeholder="Internal admin notes (reason for approval/rejection)..."
            ></textarea>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleAction("Pending Review")}
              className="flex-1 md:flex-none min-w-[140px] px-6 py-2.5 rounded-lg border border-slate-200 dark:border-border-dark text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            >
              Request Revision
            </button>
            <button
              onClick={() => handleAction("Rejected")}
              className="flex-1 md:flex-none min-w-[120px] px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 transition-all"
            >
              Reject
            </button>
            <button
              onClick={() => handleAction("Approved")}
              className="flex-1 md:flex-none min-w-[160px] px-8 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all"
            >
              Approve Lawyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerVerification;
