import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout.tsx";
import Login from "./Components/auth/Login/Login.tsx";
import Register from "./Components/auth/Register/Register.tsx";
import Toast from "./Components/common/Toast/Toast.tsx";
import DashboardLayout from "./Components/pages/Dashboard/DashboardLayout.tsx";
import Dashboard from "./Components/pages/Dashboard/Dashboard.tsx";
import Bookings from "./Components/pages/Dashboard/Bookings.tsx";
import Rooms from "./Components/pages/Dashboard/Rooms.tsx";
import Stay from "./Components/pages/Dashboard/Stay.tsx";
import Payments from "./Components/pages/Dashboard/Payments.tsx";
import Notifications from "./Components/pages/Dashboard/Notifications.tsx";
import Profile from "./Components/pages/Dashboard/Profile.tsx";

const App = () => {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/" element={<Layout />} />

        {/* Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Guest Dashboard (requires login) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="stay" element={<Stay />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
