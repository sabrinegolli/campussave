import { Link } from 'react-router-dom';
import { Utensils, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import FoodImage from '../components/FoodImage.jsx';
import QrPlaceholder from '../components/QrPlaceholder.jsx';
import { offers, formatPrice } from '../data/offers.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  // TODO: remplacer par GET /api/reservations/me
  const reservations = JSON.parse(localStorage.getItem('cs_reservations_' + user.id) || '[]');
  const active = reservations.length;
  const portions = reservations.reduce((s, r) => s + r.qty, 0);
  const ecoPoints = portions * 25;
  const kgSaved = +(portions * 0.4).toFixed(1);

  const stats = [
    { icon: Utensils, value: active, label: 'Reservations', tone: 'blue' },
    { icon: Leaf, value: ecoPoints, label: 'EcoPoints', tone: 'green' },
    { icon: CheckCircle2, value: `${kgSaved} kg`, label: 'Waste avoided', tone: 'green' },
  ];

  return (
    <DashboardLayout>
      <h1 className="dash__hello">Hello {user.firstName}! <span aria-hidden="true">👋</span></h1>
      <p className="muted">Ready to save some delicious meals today?</p>

      <div className="stats">
        {stats.map(({ icon: Icon, value, label, tone }) => (
          <div className="stat" key={label}>
            <span className={'stat__icon stat__icon--' + tone}><Icon size={22} /></span>
            <div><strong>{value}</strong><p className="small muted">{label}</p></div>
          </div>
        ))}
      </div>

      <div className="row-between">
        <h2>Your upcoming reservations</h2>
        <Link to="/dashboard/reservations" className="link small">See all <ArrowRight size={14} /></Link>
      </div>

      {reservations.length === 0 ? (
        <div className="empty empty--card">
          <p>You don’t have any reservations yet.</p>
          <Link to="/offres" className="btn btn--primary btn--sm">Discover offers</Link>
        </div>
      ) : (
        reservations.slice(0, 3).map((r) => {
          const offer = offers.find((o) => o.id === r.offerId);
          return (
            <article className="resa" key={r.id}>
              {offer && <FoodImage offer={offer} className="resa__img" />}
              <div className="resa__info">
                <strong>{r.restaurant}</strong>
                <p className="small muted">{r.qty} × {r.title} · {r.pickup}</p>
                <p className="small">{formatPrice(r.total)}</p>
              </div>
              <span className="pill pill--ok">{r.status}</span>
              <QrPlaceholder value={r.id} size={64} />
            </article>
          );
        })
      )}
    </DashboardLayout>
  );
}
