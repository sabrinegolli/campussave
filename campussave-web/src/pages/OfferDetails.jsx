import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Store, Minus, Plus } from 'lucide-react';
import PageLayout from '../components/PageLayout.jsx';
import FoodImage from '../components/FoodImage.jsx';
import OfferCard from '../components/OfferCard.jsx';
import { offers, discountOf, formatPrice } from '../data/offers.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function OfferDetails() {
  const { id } = useParams();
  const offer = offers.find((o) => o.id === Number(id));
  const { user } = useAuth();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!offer) {
    return (
      <PageLayout>
        <div className="section empty">
          <p>This offer no longer exists.</p>
          <Link to="/offres" className="btn btn--primary btn--sm">See all offers</Link>
        </div>
      </PageLayout>
    );
  }

  const similar = offers.filter((o) => o.id !== offer.id && o.category === offer.category).slice(0, 3);

  const reserve = () => {
    if (!user) return navigate('/login', { state: { from: `/offres/${offer.id}` } });
    // TODO: remplacer par POST /api/reservations puis paiement (Konnect) + QR code
    const key = 'cs_reservations_' + user.id;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift({
      id: 'R' + Date.now(), offerId: offer.id, title: offer.title, restaurant: offer.restaurant,
      qty, total: qty * offer.price, pickup: offer.pickup, status: 'Confirmed', createdAt: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(list));
    navigate('/dashboard');
  };

  return (
    <PageLayout>
      <section className="section section--tight">
        <Link to="/offres" className="back"><ArrowLeft size={16} /> Back to offers</Link>

        <div className="detail">
          <div className="detail__media">
            <FoodImage offer={offer} />
            <span className="badge-discount">-{discountOf(offer)}%</span>
          </div>

          <div className="detail__info">
            <p className="muted"><Store size={14} /> {offer.restaurant} · {offer.category}</p>
            <h1>{offer.title}</h1>
            <p className="price price--lg">
              <strong>{formatPrice(offer.price)}</strong>
              <s>{formatPrice(offer.oldPrice)}</s>
            </p>
            <p className="detail__desc">{offer.description}</p>

            <ul className="detail__facts">
              <li><Clock size={16} /> Retrait : <strong>{offer.pickup}</strong></li>
              <li><span className="pill pill--ok">{offer.quantity} restant{offer.quantity > 1 ? 's' : ''}</span></li>
            </ul>

            <div className="detail__buy">
              <div className="stepper" role="group" aria-label="Quantity">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer"><Minus size={14} /></button>
                <output aria-live="polite">{qty}</output>
                <button onClick={() => setQty((q) => Math.min(offer.quantity, q + 1))} aria-label="Augmenter"><Plus size={14} /></button>
              </div>
              <button className="btn btn--primary" onClick={reserve}>
                Reserve · {formatPrice(qty * offer.price)}
              </button>
            </div>
            {!user && <p className="muted small">You’ll need to sign in to reserve.</p>}
          </div>
        </div>

        {similar.length > 0 && (
          <>
            <h2 className="section__title section__title--left">Similar offers</h2>
            <div className="grid-today grid-today--3">
              {similar.map((o) => <OfferCard key={o.id} offer={o} compact />)}
            </div>
          </>
        )}
      </section>
    </PageLayout>
  );
}
