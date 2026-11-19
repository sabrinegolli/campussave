import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import PageLayout from '../components/PageLayout.jsx';
import OfferCard from '../components/OfferCard.jsx';
import { offers } from '../data/offers.js';

export default function Home() {
  const today = [offers[0], offers[3], offers[4]];
  return (
    <PageLayout>
      <section className="hero">
        <div className="hero__text">
          <h1>Together for a<br />more sustainable campus</h1>
          <p>Discover delicious meals at reduced prices<br />and fight food waste.</p>
          <div className="hero__cta">
            <Link to="/offres" className="btn btn--primary">Explore offers <ArrowRight size={16} /></Link>
            <Link to="/a-propos" className="btn btn--outline">En savoir plus</Link>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__plate"><span>🥗</span></div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title"><span>Today’s offers</span></h2>
        <div className="grid-today">
          {today.map((o) => <OfferCard key={o.id} offer={o} compact />)}
          <div className="eco-tile">
            <Leaf size={34} />
            <p>Less waste,<br />a greener<br />campus</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
