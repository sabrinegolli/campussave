import { useMemo, useState } from 'react';
import { Search, ChevronDown, ChefHat, SearchX } from 'lucide-react';
import PageLayout from '../components/PageLayout.jsx';
import OfferCard from '../components/OfferCard.jsx';
import { offers, CATEGORIES, discountOf } from '../data/offers.js';

const SORTS = {
  relevance: 'Pertinence',
  priceAsc: 'Prix croissant',
  priceDesc: 'Price: high to low',
  discount: 'Plus forte remise',
};

export default function Offers() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('relevance');
  const [maxPrice, setMaxPrice] = useState(10);
  const [restaurant, setRestaurant] = useState('All');

  const restaurants = useMemo(() => ['All', ...new Set(offers.map((o) => o.restaurant))], []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = offers.filter(
      (o) =>
        (category === 'All' || o.category === category) &&
        (restaurant === 'All' || o.restaurant === restaurant) &&
        o.price <= maxPrice &&
        (!q || o.title.toLowerCase().includes(q) || o.restaurant.toLowerCase().includes(q) || o.category.toLowerCase().includes(q))
    );
    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'discount') list = [...list].sort((a, b) => discountOf(b) - discountOf(a));
    return list;
  }, [query, category, sort, maxPrice, restaurant]);

  const reset = () => { setQuery(''); setCategory('All'); setSort('relevance'); setMaxPrice(10); setRestaurant('All'); };

  return (
    <PageLayout>
      <section className="banner">
        <div>
          <h1>Our Offers</h1>
          <p>Tasty meals at small prices</p>
        </div>
        <ChefHat size={84} strokeWidth={1.2} aria-hidden="true" />
      </section>

      <section className="section section--tight">
        <form className="searchbar" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search for a dish or a restaurant…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search offers"
          />
          <button type="submit" aria-label="Search"><Search size={18} /></button>
        </form>

        <div className="filters">
          <div className="chips" role="group" aria-label="Categories">
            {['All', ...CATEGORIES].map((c) => (
              <button key={c} className={'chip' + (category === c ? ' chip--active' : '')} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
          <label className="select">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>Sort by: {v}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
        </div>

        <div className="filters filters--extra">
          <label className="field-inline">
            Restaurant
            <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
              {restaurants.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="field-inline">
            Prix max : <strong>{maxPrice} TND</strong>
            <input type="range" min="2" max="10" step="0.5" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
          </label>
        </div>

        <p className="muted small" aria-live="polite">{results.length} offer{results.length > 1 ? 's' : ''} found</p>

        {results.length ? (
          <div className="grid-offers">
            {results.map((o) => <OfferCard key={o.id} offer={o} />)}
          </div>
        ) : (
          <div className="empty">
            <SearchX size={36} />
            <p>No offers match your search.</p>
            <button className="btn btn--outline btn--sm" onClick={reset}>Reset filters</button>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
