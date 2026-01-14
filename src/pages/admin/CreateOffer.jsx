import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  MdChevronRight,
  MdInfo,
  MdFunctions,
  MdSell,
  MdRefresh,
  MdArrowBack,
  MdArrowForward,
  MdGavel,
  MdNotifications,
  MdMenu,
  MdSignalCellular4Bar,
  MdWifi,
  MdBatteryFull,
  MdPeople,
  MdBusiness,
} from "react-icons/md";
import { useData } from "../../context/DataContext";

const CreateOffer = () => {
  const navigate = useNavigate();
  const { setOffers } = useData();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    promoCode: "WELCOME20",
  });
  const [errors, setErrors] = useState({});

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.internalName.trim()) newErrors.internalName = "Internal Name is required";
      if (!formData.displayTitle.trim()) newErrors.displayTitle = "Display Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
    }
    if (currentStep === 2) {
      if (!formData.value || formData.value <= 0) newErrors.value = "Value must be greater than 0";
      if (!formData.promoCode.trim()) newErrors.promoCode = "Promo code is required";
      if (formData.promoCode.length < 5) newErrors.promoCode = "Promo code too short";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    } else {
      Swal.fire({
        title: "Incomplete details",
        text: "Please fill in all required fields correctly to proceed.",
        icon: "warning",
        confirmButtonColor: "#197fe6"
      });
    }
  };

  const generatePromoCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, promoCode: code }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleLaunch = () => {
    if (!validateStep(1) || !validateStep(2)) {
      Swal.fire({
        title: "Validation Failed",
        text: "Please check all steps for missing or incorrect information.",
        icon: "error",
      });
      return;
    }

    const newOffer = {
      id: `OFF-${Math.floor(Math.random() * 9000) + 1000}`,
      name: formData.internalName || formData.displayTitle,
      type: `${formData.discountType} (${formData.discountType === 'Percentage' ? formData.value + '%' : '$' + formData.value})`,
      audience: "All Users", // Default for now
      audienceIcon: "group",
      duration: "30 Days", // Default for now
      year: "2024",
      usage: 0,
      status: "Active"
    };

    setOffers(prev => [newOffer, ...prev]);

    Swal.fire({
      title: "Offer Launched!",
      text: "The new promotional campaign is now active.",
      icon: "success",
      confirmButtonColor: "#197fe6",
    }).then(() => {
      navigate("/admin/promotions");
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex items-center px-8 shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/admin/promotions" className="hover:text-primary transition-colors">
              Promotions
            </Link>
            <MdChevronRight className="text-xs" />
            <span className="text-slate-900 dark:text-slate-100 font-medium">Create Offer</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              Save as Draft
            </button>
            <button
              onClick={handleLaunch}
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Launch Offer
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0b1016] p-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Form Section (Left) */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Create Promotional Offer
                </h2>
                <p className="text-slate-500 mt-2">
                  Configure a new discount or incentive for legal consultations.
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {[
                  { id: 1, label: "Basic Info", icon: "info" },
                  { id: 2, label: "Logic", icon: "function" },
                  { id: 3, label: "Targeting", icon: "group" },
                  { id: 4, label: "Duration", icon: "schedule" },
                ].map((s, idx) => (
                  <React.Fragment key={s.id}>
                    <div
                      onClick={() => setStep(s.id)}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div
                        className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          step >= s.id
                            ? "bg-primary text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {s.id}
                      </div>
                      <span
                        className={`text-sm font-semibold transition-colors ${
                          step === s.id
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < 3 && <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 mx-4"></div>}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <section className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <MdInfo className="text-primary" />
                      Step 1: Basic Information
                    </h3>
                    <span className="px-2 py-1 text-[10px] font-bold bg-green-500/10 text-green-500 uppercase rounded">
                      Required
                    </span>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Internal Campaign Name
                        </label>
                         <input
                          name="internalName"
                          value={formData.internalName}
                          onChange={handleInputChange}
                          className={`w-full bg-white dark:bg-slate-900 border ${errors.internalName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                          placeholder="e.g., Summer 2024 Legal Aid Drive"
                          type="text"
                        />
                        {errors.internalName && <p className="mt-1 text-xs text-rose-500 font-bold">{errors.internalName}</p>}
                        <p className="mt-1.5 text-xs text-slate-500">
                          Used for administrative tracking only.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Display Title
                          </label>
                          <input
                            name="displayTitle"
                            value={formData.displayTitle}
                            onChange={handleInputChange}
                            className={`w-full bg-white dark:bg-slate-900 border ${errors.displayTitle ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                            type="text"
                          />
                          {errors.displayTitle && <p className="mt-1 text-xs text-rose-500 font-bold">{errors.displayTitle}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Short Description
                          </label>
                          <input
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className={`w-full bg-white dark:bg-slate-900 border ${errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
                            type="text"
                          />
                          {errors.description && <p className="mt-1 text-xs text-rose-500 font-bold">{errors.description}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Step 2: Logic & Value */}
              {step === 2 && (
                <section className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <MdFunctions className="text-primary" />
                      Step 2: Logic & Value
                    </h3>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Discount Type
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <label
                              className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                                formData.discountType === "Percentage"
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-slate-200 dark:border-slate-700 text-slate-500"
                              }`}
                            >
                              <input
                                type="radio"
                                className="hidden"
                                name="discountType"
                                checked={formData.discountType === "Percentage"}
                                onChange={() =>
                                  setFormData((prev) => ({ ...prev, discountType: "Percentage" }))
                                }
                              />
                              <span className="text-sm font-semibold">Percentage (%)</span>
                            </label>
                            <label
                              className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                                formData.discountType === "Fixed"
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-slate-200 dark:border-slate-700 text-slate-500"
                              }`}
                            >
                              <input
                                type="radio"
                                className="hidden"
                                name="discountType"
                                checked={formData.discountType === "Fixed"}
                                onChange={() =>
                                  setFormData((prev) => ({ ...prev, discountType: "Fixed" }))
                                }
                              />
                              <span className="text-sm font-semibold">Fixed Amount ($)</span>
                            </label>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Value
                            </label>
                            <div className="relative">
                              <input
                                name="value"
                                value={formData.value}
                                onChange={handleInputChange}
                                className={`w-full bg-white dark:bg-slate-900 border ${errors.value ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg pl-4 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none`}
                                type="number"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                {formData.discountType === "Percentage" ? "%" : "$"}
                              </span>
                            </div>
                            {errors.value && <p className="mt-1 text-xs text-rose-500 font-bold">{errors.value}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Min. Spend
                            </label>
                            <div className="relative">
                              <input
                                name="minSpend"
                                value={formData.minSpend}
                                onChange={handleInputChange}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                                type="number"
                              />
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                $
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Promo Code
                          </label>
                          <div className="flex gap-2">
                            <input
                              name="promoCode"
                              value={formData.promoCode}
                              onChange={handleInputChange}
                              className={`flex-1 bg-white dark:bg-slate-900 border ${errors.promoCode ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg px-4 py-2.5 text-sm font-mono tracking-wider focus:ring-2 focus:ring-primary outline-none uppercase`}
                              type="text"
                            />
                            <button
                              onClick={generatePromoCode}
                              className="px-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center"
                            >
                              <MdRefresh className="text-xl" />
                            </button>
                          </div>
                          {errors.promoCode && <p className="mt-1 text-xs text-rose-500 font-bold">{errors.promoCode}</p>}
                          <p className="mt-1.5 text-xs text-slate-500">
                            Customers will enter this code at checkout.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <MdInfo className="text-blue-500 text-xl" />
                          <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                            Consider a minimum spend of $100 for percentage discounts over 15% to
                            protect margins.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Targeting and Duration Placeholders for multi-step feel */}
              {step > 2 && (
                <section className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-20 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
                   <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MdSell className="text-4xl" />
                   </div>
                   <h3 className="text-xl font-bold">Step {step} Configuration</h3>
                   <p className="text-slate-500 max-w-xs">Detailed targeting and scheduling logic goes here in the full implementation.</p>
                </section>
              )}

              {/* Navigation Footer */}
              <div className="flex justify-between items-center py-4">
                <button
                  onClick={() => {
                    if (step === 1) navigate("/admin/promotions");
                    else setStep((prev) => prev - 1);
                  }}
                  className="flex items-center gap-2 px-6 py-3 font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <MdArrowBack />
                  {step === 1 ? "Cancel" : "Back"}
                </button>
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Next: {step === 1 ? "Logic" : step === 2 ? "Targeting" : "Duration"}
                    <MdArrowForward />
                  </button>
                ) : (
                  <button
                    onClick={handleLaunch}
                    className="flex items-center gap-2 px-10 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Launch Offer
                    <MdArrowForward />
                  </button>
                )}
              </div>
            </div>

            {/* Preview Section (Right) */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="sticky top-8 space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                  Real-time Preview
                </h4>
                {/* Phone Frame Mockup */}
                <div className="relative mx-auto w-full max-w-[320px] aspect-[9/18.5] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden ring-1 ring-slate-700">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                  {/* Content Wrapper */}
                  <div className="absolute inset-0 bg-white dark:bg-[#0f172a] overflow-y-auto">
                    {/* Mobile Status Bar */}
                    <div className="flex justify-between px-6 pt-5 pb-2">
                      <span className="text-xs font-bold text-slate-400">9:41</span>
                      <div className="flex gap-1 items-center">
                        <MdSignalCellular4Bar className="text-xs text-slate-400" />
                        <MdWifi className="text-xs text-slate-400" />
                        <MdBatteryFull className="text-xs text-slate-400" />
                      </div>
                    </div>
                    {/* Mock App Header */}
                    <div className="px-5 py-4 flex items-center justify-between">
                      <MdMenu className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        LegalConnect
                      </span>
                      <MdNotifications className="text-slate-400" />
                    </div>
                    {/* Mock Hero/Offer Card */}
                    <div className="px-4 py-4">
                      <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-primary to-blue-700 relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <MdGavel className="text-8xl" />
                        </div>
                        <div className="p-6 relative z-10">
                          <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-black text-white uppercase tracking-tighter mb-2 italic">
                            Special Offer
                          </span>
                          <h5 className="text-2xl font-black text-white leading-none">
                            {formData.discountType === "Percentage"
                              ? `${formData.value}%`
                              : `$${formData.value}`}{" "}
                            OFF
                          </h5>
                          <p className="text-sm font-medium text-white/90 mt-1">
                            {formData.displayTitle}
                          </p>
                          <p className="text-[10px] text-white/70 mt-3 max-w-[180px]">
                            {formData.description}
                          </p>
                          <div className="mt-6 flex flex-col gap-2">
                            <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 border border-white/20">
                              <span className="text-xs font-mono font-bold text-white tracking-widest">
                                {formData.promoCode}
                              </span>
                              <span className="text-[10px] font-bold text-white/80 uppercase">
                                TAP TO COPY
                              </span>
                            </div>
                            <button className="w-full py-2.5 bg-white text-primary rounded-lg text-xs font-black shadow-lg">
                              BOOK CONSULTATION
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Mock List Items */}
                    <div className="px-4 py-2 space-y-4">
                      <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                        Recommended Services
                      </h6>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <MdPeople className="text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-bold dark:text-white">Family Law</p>
                          <p className="text-[10px] text-slate-500">12 Available Lawyers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <MdBusiness className="text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-bold dark:text-white">Corporate Law</p>
                          <p className="text-[10px] text-slate-500">8 Available Lawyers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Preview Stats */}
                <div className="bg-white dark:bg-card-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <p className="text-xs font-bold text-slate-500 uppercase">Estimated Reach</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">5,420</span>
                    <span className="text-sm font-medium text-slate-500 mb-1">Users</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[65%]" style={{ width: "65%" }}></div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Based on current "New Users" targeting filter. Change targeting in Step 3 to
                    update.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateOffer;
