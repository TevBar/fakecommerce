import React from "react";
import { useNavigate } from "react-router-dom";



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

const Card: React.FC<CardProps> = ({ item, className }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/products/edit/${item.id}`);
  };

  return (
    <div className={`product ${className || ""}`}>
      <img src={item.src || "/default.jpg"} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="category">{item.cat || "Uncategorized"}</p>
      <p className="price">${item.price.toFixed(2)}</p>

      {item.rating && (
        <p className="rating">
          ⭐ {item.rating.rate} ({item.rating.count} reviews)
        </p>
      )}

      {/* ✅ Edit Button */}
      <button onClick={handleEdit} className="edit-btn">
        Edit Product
      </button>
    </div>
  );
};

export default Card;

