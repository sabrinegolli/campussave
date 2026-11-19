import { NavLink, Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const links = [
    ['/', 'Home'], ['/offres', 'Offers'], ['/restaurants', 'Restaurants'],
    ['/a-propos', 'About'], ['/contact', 'Contact'],
  ];
  return (
    <header className="navbar">
      <Logo />
      <nav aria-label="Main navigation">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
            {label}
          </NavLink>
        ))}
      </nav>
      {user ? (
        <Link to="/dashboard" className="avatar" title="My account" aria-label="My account">
          {user.firstName[0]}{user.lastName?.[0]}
        </Link>
      ) : (
        <button className="btn btn--primary btn--sm" onClick={() => navigate('/login')}>
          <User size={14} /> Sign in
        </button>
      )}
    </header>
  );
}
