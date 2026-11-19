import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <Logo light />
      <nav aria-label="Footer">
        <Link to="/a-propos">About</Link>
        <span>|</span>
        <Link to="/a-propos">FAQ</Link>
        <span>|</span>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="footer__social">
        <span>Follow us</span>
        <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
        <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
        <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
      </div>
    </footer>
  );
}
