interface CardProps {
  item: {
    id: number;
    src: string;
    name: string;
    price: number;
    cat: string;
    desc: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  className?: string;
}

function Card({ item, className }: CardProps) {
  return (
    <div className={`product ${className}`}>
      <img src={item.src} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="category">{item.cat}</p>
      <p className="price">${item.price.toFixed(2)}</p>
      <p className="rating">⭐ {item.rating.rate} ({item.rating.count} reviews)</p>
    </div>
  );
}

export default Card;
