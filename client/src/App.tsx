import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import Rooms from './pages/Rooms';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Guests from './pages/Guests';
import ProtectedLayout from './layouts/ProtectedLayout';
import Login from './pages/Login';
import PublicLayout from './layouts/PublicLayout';

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedLayout>
            <AppLayout />
          </ProtectedLayout>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:bookingId" element={<Booking />} />
        <Route path="checkin/:bookingId" element={<Checkin />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="register" element={<span>Register</span>} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
export default App;
