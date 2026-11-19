/*
 * Temporary image. When you have real photos:
 *   <FoodImage offer={offer} />  ->  if offer.image exists, it is displayed.
 */
export default function FoodImage({ offer, className = '' }) {
  if (offer.image) {
    return <img className={'food-img ' + className} src={offer.image} alt={offer.title} />;
  }
  const [a, b] = offer.tone;
  return (
    <div
      className={'food-img food-img--placeholder ' + className}
      style={{ background: `radial-gradient(circle at 30% 30%, ${a}, ${b})` }}
      role="img"
      aria-label={offer.title}
    >
      <span>{offer.emoji}</span>
    </div>
  );
}
