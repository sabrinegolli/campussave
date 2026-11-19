import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Offers from './pages/Offers.jsx';
import OfferDetails from './pages/OfferDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });

    return undefined;
  }, [pathname]);

  return null;
}
function Protected({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<Offers />} />
        <Route path="/offres/:id" element={<OfferDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/dashboard/profil" element={<Protected><Profile /></Protected>} />
        <Route path="/dashboard/reservations" element={<Protected><ComingSoon title="My reservations" /></Protected>} />
        <Route path="/dashboard/points" element={<Protected><ComingSoon title="My Eco points" /></Protected>} />
        <Route path="/dashboard/notifications" element={<Protected><ComingSoon title="Notifications" /></Protected>} />
        <Route path="/restaurants" element={<ComingSoon title="Restaurants" publicPage />} />
        <Route path="/a-propos" element={<ComingSoon title="About" publicPage />} />
        <Route path="/contact" element={<ComingSoon title="Contact" publicPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
