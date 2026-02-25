import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import {
  initialLawyers,
  initialUsers,
  initialConsultations,
  initialPayouts,
  initialNotifications,
  initialOffers,
  initialReferralRules,
  initialTopReferrers,
  initialReferralTransactions,
  initialCategories,
  initialVerificationRules,
  initialPerformanceReviews,
  initialReviews,
  initialBulkPayouts,
  initialDisputes
} from "../data/mockData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [users, setUsers] = useState([]);
  const [consultations, setConsultations] = useState(initialConsultations);
  const [payments, setPayments] = useState([]);
  const [payouts, setPayouts] = useState(initialPayouts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [offers, setOffers] = useState(initialOffers);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState(initialReviews);
  const [bulkPayouts, setBulkPayouts] = useState(initialBulkPayouts);
  const [disputes, setDisputes] = useState(initialDisputes);
  const [referralRules, setReferralRules] = useState(initialReferralRules);
  const [referralTransactions, setReferralTransactions] = useState(initialReferralTransactions);
  const [topReferrers, setTopReferrers] = useState(initialTopReferrers);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalLawyers: 0, totalAppointments: 0 });
  const [offerStats, setOfferStats] = useState([]);


  const safeFetch = async (url, fallback = []) => {
    try {
      const res = await api.get(url);
      return res.data;
    } catch {
      return fallback;
    }
  };

  const fetchData = async () => {
    try {
      // Fetch in parallel, each with individual fallback
      const [
        lawyersData, usersData, categoriesData, statsData,
        appointmentsData, payoutRequestsData, disputesData,
        offersData, referralRulesData, referralTransactionsData,
        reviewsData, rolesData, notificationsData, allPaymentsData,
        topReferrersData, bulkPayoutsData, offerStatsData
      ] = await Promise.all([

        safeFetch('/lawyers', []),
        safeFetch('/admin/users', []),
        safeFetch('/categories', []),
        safeFetch('/admin/stats', null),
        safeFetch('/admin/appointments', []),
        safeFetch('/admin/payout-requests', []),
        safeFetch('/disputes', []),
        safeFetch('/offers', []),
        safeFetch('/referrals/rules', []),
        safeFetch('/referrals/transactions', []),
        safeFetch('/admin/reviews', []),
        safeFetch('/admin/roles', []),
        safeFetch('/admin/notifications', []),
        safeFetch('/admin/payments', []),
        safeFetch('/admin/referrals/top', []),
        safeFetch('/admin/bulk-payouts', []),
        safeFetch('/admin/offer-stats', []),
      ]);


      const mappedLawyers = (lawyersData || []).map(l => ({
        ...l,
        name: l.user?.name || "Unknown Lawyer",
        image: l.user?.image || "https://via.placeholder.com/150",
        specialization: l.specialization || "General Practice",
        experience: l.experience ? `${l.experience} years` : "0 years",
        rating: l.rating || 0,
        reviews: l.reviews?.length || 0,
        status: l.user?.verificationStatus === 'Verified' ? 'Approved' : (l.user?.verificationStatus === 'Pending' ? 'Pending Review' : (l.user?.verificationStatus || "Pending Review")),
        onlineStatus: l.isOnline ? "Online" : "Offline",
        revenue: `₹${l.price || 0}`,
        responseRate: 100,
        avgResponseTime: "1h",
      }));

      const mappedUsers = (usersData || []).map(u => ({
        ...u,
        name: u.name || "Unknown User",
        email: u.email || "No Email",
        status: u.isVerified ? "Active" : "Pending",
        consultations: u.consultations || 0,
        lastLogin: u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Recently",
        image: u.image || "https://via.placeholder.com/150",
      }));

      const mappedConsultations = (appointmentsData || []).map(a => ({
        id: a.id,
        client: a.user?.name || "Unknown Client",
        lawyer: a.lawyer?.user?.name || "Unknown Lawyer",
        date: new Date(a.date || a.createdAt).toLocaleDateString(),
        duration: a.durationMinutes ? `${a.durationMinutes} mins` : "15 mins",
        status: a.status || "Completed",
        amount: `₹${a.totalCost || 0}.00`
      }));

      const mappedDisputes = (disputesData || []).map(d => ({
        id: d.id,
        user: d.user?.name || "Client",
        lawyer: d.lawyer?.user?.name || "Lawyer",
        subject: d.subject,
        description: d.description,
        status: d.status,
        priority: d.priority,
        amount: d.amount,
        date: new Date(d.createdAt).toLocaleDateString(),
        messages: d.messages || []
      }));

      const mappedBulkPayouts = (bulkPayoutsData || []).map(b => ({
        id: b.id,
        date: new Date(b.createdAt).toLocaleDateString(),
        count: b.details ? JSON.parse(b.details).length : 0,
        amount: b.details ? `₹${JSON.parse(b.details).reduce((acc, p) => acc + Number(p.amount || 0), 0)}` : "₹0",
        status: "Completed",
        action: b.action
      }));

      const mappedPayouts = (payoutRequestsData || []).map(p => ({
        id: p.id,
        lawyer: p.wallet?.user?.name || "Attorney",
        amount: `₹${p.amount || 0}`,
        date: new Date(p.createdAt).toLocaleDateString(),
        status: p.status,
        method: "Bank Transfer",
        account: "XXXX-1234"
      }));

      const mappedPayments = (allPaymentsData || []).map(p => ({
        id: p.id,
        user: p.wallet?.user?.name || "Client",
        amount: `₹${p.amount || 0}`,
        date: new Date(p.date || p.createdAt).toLocaleDateString(),
        status: p.status === 'success' ? "Successful" : (p.status?.charAt(0).toUpperCase() + p.status?.slice(1) || "Pending"),
        type: p.type || "Consultation",
        method: "Razorpay"
      }));

      const mappedTransactions = (referralTransactionsData || []).map(tx => ({
        id: tx.id,
        referrer: tx.referrer?.name || "Anonymous",
        referrerInitial: (tx.referrer?.name || "A").charAt(0),
        referee: tx.referee?.name || "New User",
        date: new Date(tx.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: tx.status,
        amount: Number(tx.amount)
      }));

      const rules = (referralRulesData || []).map(r => ({
        ...r,
        icon: r.type === 'signup' ? 'redeem' : 'workspace_premium',
        iconBg: r.type === 'signup' ? 'bg-primary/10' : 'bg-emerald-100 dark:bg-emerald-500/10',
        iconColor: r.type === 'signup' ? 'text-primary' : 'text-emerald-600 dark:text-emerald-400',
        activeSince: new Date(r.createdAt).toLocaleDateString()
      }));

      const mappedReviews = (reviewsData || []).map(r => ({
        id: r.id,
        lawyer: r.lawyer?.user?.name || "Unknown",
        reviewer: {
          name: r.user?.name || "Anonymous",
          avatar: r.user?.image || "https://via.placeholder.com/150"
        },
        rating: r.rating,
        comment: r.comment,
        timestamp: new Date(r.date).toLocaleDateString(),
        sentiment: r.rating >= 4 ? "Positive" : r.rating === 3 ? "Neutral" : "Negative",
        caseId: r.id.slice(0, 8),
        flagged: !r.verified,
        adminResponse: r.adminResponse || null
      }));

      const mappedNotifications = (notificationsData || []).map(n => ({
        id: n.id,
        title: n.title,
        content: n.message,
        isRead: n.isRead,
        type: n.type || "System",
        time: new Date(n.createdAt).toLocaleTimeString(),
        date: new Date(n.createdAt).toLocaleDateString(),
        isFlagged: false
      }));

      setLawyers(mappedLawyers);
      setUsers(mappedUsers);
      setCategories(categoriesData || []);

      // Derive stats: use backend data if available, else compute from actual loaded data
      setStats(statsData && typeof statsData === 'object' ? statsData : {
        totalUsers: mappedUsers.length,
        totalLawyers: mappedLawyers.length,
        totalAppointments: mappedConsultations.length,
        totalRevenue: mappedPayments.reduce((sum, p) => sum + parseFloat(String(p.amount).replace('₹', '') || '0'), 0),
      });

      setConsultations(mappedConsultations.length > 0 ? mappedConsultations : []);
      setPayouts(mappedPayouts.length > 0 ? mappedPayouts : []);
      setDisputes(mappedDisputes.length > 0 ? mappedDisputes : []);
      setOffers(offersData || []);
      setReferralRules(rules);
      setReferralTransactions(mappedTransactions);
      setTopReferrers((topReferrersData || []).map(ref => ({
        id: ref.id,
        name: ref.name || "User",
        referrals: parseInt(ref.referralCount),
        earned: Number(ref.totalEarned),
        avatar: "https://via.placeholder.com/150"
      })));
      setNotifications(mappedNotifications.length > 0 ? mappedNotifications : []);
      setPayments(mappedPayments.length > 0 ? mappedPayments : []);
      setBulkPayouts(mappedBulkPayouts.length > 0 ? mappedBulkPayouts : []);
      setReviews(mappedReviews.length > 0 ? mappedReviews : []);
      setRoles(rolesData || []);
      setOfferStats(offerStatsData || []);
    } catch (error) {

      console.error("Error in fetchData:", error);
    }
  };


  const deleteReview = async (id) => {
    try {
      await api.delete(`/admin/reviews/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const addReferralRule = async (ruleData) => {
    try {
      await api.post('/referrals/rules', ruleData);
      fetchData();
    } catch (error) {
      console.error("Error adding referral rule:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateReferralRule = async (id, updatedData) => {
    try {
      await api.patch(`/referrals/rules/${id}`, updatedData);
      fetchData();
    } catch (error) {
      console.error("Error updating referral rule:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateDispute = async (id, updatedData) => {
    try {
      await api.patch(`/disputes/${id}`, updatedData);
      setDisputes(prev => prev.map(d => d.id === id ? { ...d, ...updatedData } : d));
      fetchData();
    } catch (error) {
      console.error("Error updating dispute:", error);
    }
  };

  const updateSettings = async (settingsPayload) => {
    try {
      await api.post('/settings', settingsPayload);
      fetchData();
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const addOffer = async (offerData) => {
    try {
      const res = await api.post('/offers', offerData);
      setOffers(prev => [res.data, ...prev]);
      fetchData();
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  const deleteOffer = async (id) => {
    try {
      await api.delete(`/offers/${id}`);
      setOffers(prev => prev.filter(o => o.id !== id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const toggleOffer = async (id) => {
    try {
      await api.patch(`/offers/${id}/toggle`);
      fetchData();
    } catch (error) {
      console.error("Error toggling offer:", error);
    }
  };

  const processBulkPayouts = async (transactionIds) => {
    try {
      await api.post('/admin/process-bulk-payouts', { transactionIds, status: 'Success' });
      fetchData();
    } catch (error) {
      console.error("Error in bulk payouts:", error);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      if (updatedData.status) {
        await api.patch(`/admin/users/${id}/status`, { status: updatedData.status });
      }
      setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updatedData } : user));
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const updateLawyer = async (id, updatedData) => {
    try {
      if (updatedData.status) {
        await api.post('/admin/verify-lawyer', {
          lawyerId: id,
          status: updatedData.status.toLowerCase() === 'approved' ? 'Verified' : 'Rejected'
        });
      }
      await api.patch(`/admin/lawyers/${id}`, updatedData);
      setLawyers(prev => prev.map(lawyer => lawyer.id === id ? { ...lawyer, ...updatedData } : lawyer));
      fetchData();
    } catch (error) {
      console.error("Error updating lawyer:", error);
    }
  };

  const addUser = async (userData) => {
    try {
      await api.post('/admin/users', userData);
      fetchData();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const onboardLawyer = async (lawyerData) => {
    try {
      await api.post('/admin/onboard-lawyer', lawyerData);
      fetchData();
    } catch (error) {
      console.error("Error onboarding lawyer:", error);
    }
  };

  const sendMessage = async (receiverId, text) => {
    try {
      await api.post('/messages', { receiverId, text });
      // Optionally update local state or show success toast
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };



  const updatePayout = async (id, updatedData) => {
    try {
      if (updatedData.status) {
        await api.post('/admin/process-payout', {
          transactionId: id,
          status: updatedData.status
        });
      }
      setPayouts(prev => prev.map(payout => payout.id === id ? { ...payout, ...updatedData } : payout));
      fetchData();
    } catch (error) {
      console.error("Error processing payout:", error);
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      await api.patch(`/categories/${id}`, updatedData);
      setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...updatedData } : cat));
      fetchData();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  const addCategory = async (categoryData) => {
    try {
      const res = await api.post('/categories', categoryData);
      setCategories(prev => [...prev, res.data]);
      fetchData();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const updateReview = async (id, updatedData) => {
    try {
      await api.patch(`/admin/reviews/${id}`, updatedData);
      setReviews(prev => prev.map(review => review.id === id ? { ...review, ...updatedData } : review));
      fetchData();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const respondToReview = async (id, response) => {
    try {
      await api.post(`/admin/reviews/${id}/respond`, { response });
      fetchData();
    } catch (error) {
      console.error("Error responding to review:", error);
    }
  };

  const markNotificationRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error("Error marking notification read:", error);
    }
  };

  const flagAppointment = async (id, reason) => {
    try {
      await api.post(`/admin/appointments/${id}/flag`, { reason });
      fetchData();
    } catch (error) {
      console.error("Error flagging appointment:", error);
    }
  };

  const refundPayment = async (id) => {
    try {
      await api.post(`/admin/payments/${id}/refund`);
      fetchData();
    } catch (error) {
      console.error("Error refunding payment:", error);
    }
  };

  const runBackgroundCheck = async (id) => {
    try {
      await api.post(`/admin/lawyers/${id}/background-check`);
      fetchData();
    } catch (error) {
      console.error("Error running background check:", error);
    }
  };

  const respondToDispute = async (id, message, status) => {
    try {
      await api.post(`/admin/disputes/${id}/respond`, { message, status });
      fetchData();
    } catch (error) {
      console.error("Error responding to dispute:", error);
    }
  };

  const sendSystemMessage = async (receiverId, text) => {
    try {
      await api.post('/admin/messages/system', { receiverId, text });
      fetchData();
    } catch (error) {
      console.error("Error sending system message:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteLawyer = async (id) => {
    try {
      await api.delete(`/admin/lawyers/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting lawyer:", error);
    }
  };

  const getLawyerPerformance = async (id) => {
    try {
      const res = await api.get(`/admin/lawyers/${id}/performance`);
      return res.data;
    } catch (error) {
      console.error("Error fetching performance:", error);
      return null;
    }
  };

  const addRole = async (roleData) => {
    try {
      await api.post('/admin/roles', roleData);
      fetchData();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const updateRole = async (id, roleData) => {
    try {
      await api.patch(`/admin/roles/${id}`, roleData);
      fetchData();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const deleteRole = async (id) => {
    try {
      await api.delete(`/admin/roles/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <DataContext.Provider value={{
      lawyers, setLawyers, updateLawyer, onboardLawyer, deleteLawyer, getLawyerPerformance,
      users, setUsers, updateUser, addUser, deleteUser,
      sendMessage,
      stats, fetchData,
      consultations, setConsultations, flagAppointment,
      payments, setPayments, refundPayment,
      payouts, setPayouts, updatePayout,
      notifications, setNotifications, markNotificationRead,
      categories, setCategories, updateCategory, addCategory, deleteCategory,
      reviews, setReviews, updateReview, deleteReview, respondToReview,
      bulkPayouts, setBulkPayouts, processBulkPayouts,
      disputes, setDisputes, updateDispute, respondToDispute,
      updateSettings,
      offers, setOffers, addOffer, deleteOffer, toggleOffer,
      referralRules, setReferralRules, addReferralRule, updateReferralRule,
      referralTransactions, setReferralTransactions,
      topReferrers, setTopReferrers,
      roles, setRoles, addRole, updateRole, deleteRole,
      runBackgroundCheck, sendSystemMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
