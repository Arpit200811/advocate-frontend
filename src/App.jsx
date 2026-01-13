import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import TwoFactorAuth from "./pages/auth/TwoFactorAuth";
import Dashboard from "./pages/admin/Dashboard";
import Lawyers from "./pages/admin/Lawyers";
import Settings from "./pages/admin/Settings";
import Consultations from "./pages/admin/Consultations";
import LawyerVerification from "./pages/admin/LawyerVerification";
import VerificationQueue from "./pages/admin/VerificationQueue";
import Payments from "./pages/admin/Payments";
import Disputes from "./pages/admin/Disputes";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import Payouts from "./pages/admin/Payouts";
import Notifications from "./pages/admin/Notifications";
import NotificationSettings from "./pages/admin/NotificationSettings";
import Promotions from "./pages/admin/Promotions";
import CreateOffer from "./pages/admin/CreateOffer";
import AdminLayout from "./layouts/AdminLayout";
import NotFound from "./pages/error/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFactorAuth />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="lawyers" element={<Lawyers />} />
          <Route path="lawyers/queue" element={<VerificationQueue />} />
          <Route path="lawyers/verify" element={<LawyerVerification />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="promotions/create" element={<CreateOffer />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
