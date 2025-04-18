import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./card";
import { addToCart } from "./store/cartSlice";
import { useDispatch } from "react-redux";

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

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching category:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      key: product.id.toString(),
      name: product.title,
      price: product.price,
      quantity: 1
    }));
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold my-4 text-center capitalize">{categoryName}</h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="product-container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <div key={product.id} className="product-card p-4 shadow rounded bg-white">
              <Card item={{
                id: product.id,
                src: product.image,
                name: product.title,
                price: product.price,
                cat: product.category,
                desc: product.description,
                rating: product.rating,
              }} />
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
