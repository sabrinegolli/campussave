import { Link } from 'react-router-dom';

export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 38c0-14 8-26 28-28-1 18-10 28-24 28" fill="#f5b301" />
      <path d="M14 34c2-9 8-16 18-20" stroke="#0a2a66" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="14" cy="14" r="6" fill="#0a2a66" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={'logo' + (light ? ' logo--light' : '')} aria-label="CampusSave – home">
      <LogoMark />
      <span>CampusSave</span>
    </Link>
  );
}
