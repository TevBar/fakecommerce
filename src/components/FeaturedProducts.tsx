import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import CardSkeleton from "./CardSkeleton";

// Define Product Type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

function FeaturedProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<Product[]>([]); // ✅ State to track cart items

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const products: Product[] = await res.json();
        setData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Function to handle adding items to the cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to cart
    console.log("Cart updated:", cart);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center my-6 text-[#444]">
        Featured Products
      </h1>
      <div className="product-container">
        {isLoading ? (
          <div className="w-full flex flex-wrap justify-around mx-auto">
            <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
          </div>
        ) : (
          data.map((product) => (
            <div key={product.id} className="product-card">
              <Card
                item={{
                  id: product.id,
                  src: product.image,
                  name: product.title,
                  price: product.price,
                  cat: product.category,
                  desc: product.description,
                  rating: product.rating,
                }}
              />
              <button
                onClick={() => handleAddToCart(product)} // ✅ Add to Cart button event listener
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
      <div className="text-center text-lg font-semibold mt-6">
        <Link to="/products" className="nav-link">
          View All
        </Link>
      </div>
    </div>
  );
}

export default FeaturedProducts;
