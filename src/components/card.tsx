import React from "react";

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
  onDelete?: (id: number) => void; // 🔥 Add delete handler prop
}

const Card: React.FC<CardProps> = ({ item, className, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
    }
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

      {/* ❌ Removed Edit Button | ✅ Added Remove Product */}
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2"
      >
        🗑 Remove Product
      </button>
    </div>
  );
};

export default Card;
