import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Logo from './Logo.jsx';

export default function AuthShell({ children }) {
  return (
    <div className="auth">
      <div className="auth__art" aria-hidden="true">
        <Leaf size={120} strokeWidth={1} />
      </div>
      <div className="auth__col">
        <Logo />
        <div className="auth__card">{children}</div>
        <Link to="/" className="muted small">← Back to home</Link>
      </div>
      <div className="auth__building" aria-hidden="true" />
    </div>
  );
}
