import React, { createContext, useContext, useState } from "react";
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
  const [lawyers, setLawyers] = useState(initialLawyers);
  const [users, setUsers] = useState(initialUsers);
  const [consultations, setConsultations] = useState(initialConsultations);
  const [payments, setPayments] = useState([
    {
      id: "TR-9401",
      user: "David Chen",
      lawyer: "Sarah Jenkins",
      amount: "$150.00",
      status: "Successful",
      date: "Oct 12, 2023",
      method: "Visa •••• 4242",
    },
    {
      id: "TR-9398",
      user: "Michael Scott",
      lawyer: "Jonathan Doe",
      amount: "$320.00",
      status: "Successful",
      date: "Oct 11, 2023",
      method: "Mastercard •••• 8812",
    },
    {
      id: "TR-9395",
      user: "Robert Wilson",
      lawyer: "Sarah Jenkins",
      amount: "$85.00",
      status: "Failed",
      date: "Oct 10, 2023",
      method: "Visa •••• 1121",
    },
  ]);
  const [payouts, setPayouts] = useState(initialPayouts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [offers, setOffers] = useState(initialOffers);
  const [categories, setCategories] = useState(initialCategories);
  const [reviews, setReviews] = useState(initialReviews);
  const [bulkPayouts, setBulkPayouts] = useState(initialBulkPayouts);
  const [disputes, setDisputes] = useState(initialDisputes);
  const [referralRules, setReferralRules] = useState(initialReferralRules);
  const [referralTransactions, setReferralTransactions] = useState(initialReferralTransactions);
  const [topReferrers, setTopReferrers] = useState(initialTopReferrers);

  // User Actions
  const updateUser = (id, updatedData) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updatedData } : user));
  };
  const addUser = (user) => setUsers(prev => [user, ...prev]);

  // Lawyer Actions
  const updateLawyer = (id, updatedData) => {
    setLawyers(prev => prev.map(lawyer => lawyer.id === id ? { ...lawyer, ...updatedData } : lawyer));
  };

  // Payout Actions
  const updatePayout = (id, updatedData) => {
    setPayouts(prev => prev.map(payout => payout.id === id ? { ...payout, ...updatedData } : payout));
  };

  // Category Actions
  const updateCategory = (id, updatedData) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...updatedData } : cat));
  };
  const addCategory = (category) => setCategories(prev => [category, ...prev]);

  // Review Actions
  const updateReview = (id, updatedData) => {
    setReviews(prev => prev.map(review => review.id === id ? { ...review, ...updatedData } : review));
  };

  // Notification Actions
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <DataContext.Provider value={{
      lawyers, setLawyers, updateLawyer,
      users, setUsers, updateUser, addUser,
      consultations, setConsultations,
      payments, setPayments,
      payouts, setPayouts, updatePayout,
      notifications, setNotifications, markNotificationRead,
      offers, setOffers,
      categories, setCategories, updateCategory, addCategory,
      reviews, setReviews, updateReview,
      bulkPayouts, setBulkPayouts,
      disputes, setDisputes,
      referralRules, setReferralRules,
      referralTransactions, setReferralTransactions,
      topReferrers, setTopReferrers
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
