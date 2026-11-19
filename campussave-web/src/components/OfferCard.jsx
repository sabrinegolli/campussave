import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import FoodImage from './FoodImage.jsx';
import { discountOf, formatPrice } from '../data/offers.js';

export default function OfferCard({ offer, compact = false }) {
  return (
    <Link to={`/offres/${offer.id}`} className={'offer-card' + (compact ? ' offer-card--compact' : '')}>
      <div className="offer-card__media">
        <FoodImage offer={offer} />
        <span className="badge-discount">-{discountOf(offer)}%</span>
      </div>
      <div className="offer-card__body">
        <h3>{offer.title}</h3>
        <p className="muted small">{offer.restaurant}</p>
        <div className="offer-card__foot">
          <p className="price">
            <strong>{formatPrice(offer.price)}</strong>
            <s>{formatPrice(offer.oldPrice)}</s>
          </p>
          {!compact && <Bookmark size={18} className="bookmark" aria-hidden="true" />}
        </div>
      </div>
    </Link>
  );
}
