import { NavLink, useNavigate } from 'react-router-dom';
import { Home, CalendarCheck, Leaf, User, Bell, LogOut } from 'lucide-react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const items = [
  ['/dashboard', 'Dashboard', Home, true],
  ['/dashboard/reservations', 'My reservations', CalendarCheck],
  ['/dashboard/points', 'My Eco points', Leaf],
  ['/dashboard/profil', 'My profile', User],
  ['/dashboard/notifications', 'Notifications', Bell],
];

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user.firstName[0] + (user.lastName?.[0] || '')).toUpperCase();

  return (
    <div className="dash">
      <aside className="dash__side">
        <Logo light />
        <nav aria-label="Student area">
          {items.map(([to, label, Icon, end]) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <button className="dash__logout" onClick={() => { logout(); navigate('/'); }}>
          <LogOut size={16} /> Log out
        </button>
      </aside>
      <div className="dash__main">
        <div className="dash__top">
          <button className="icon-btn" aria-label="Notifications"><Bell size={18} /><i className="dot" /></button>
          <span className="avatar avatar--navy">{initials}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
