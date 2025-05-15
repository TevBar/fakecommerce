import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./store/cartSlice";
import { getProducts } from "../services/productService"; // Firestore fetch
import Card from "./card";
import CardSkeleton from "./CardSkeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category?: string;
  image?: string;
}

function FeaturedProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const firestoreProducts = await getProducts();

      return firestoreProducts.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        price: doc.price,
        stock: doc.stock,
        description: doc.description,
        category: doc.category || "Uncategorized",
        image: doc.image || "/placeholder.png",
      }));
    },
  });

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        key: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  const handleEdit = (productId: string) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleAddProduct = () => {
    navigate("/products/new");
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center my-6 text-[#444]">
        Featured Products
      </h1>

      <div className="text-right mb-4">
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Product
        </button>
      </div>

      <div className="product-container">
        {isLoading ? (
          <div className="w-full flex flex-wrap justify-around mx-auto">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">
            Error loading products: {(error as Error).message}
          </p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card mb-6">
              <Card
                item={{
                  id: Number(product.id),
                  src: product.image!,
                  name: product.name,
                  price: product.price,
                  cat: product.category || "Uncategorized",
                  desc: product.description,
                  rating: { rate: 4.5, count: 10 },
                }}
              />
              <div className="flex flex-col md:flex-row gap-3 mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md transition hover:bg-blue-700 shadow-md"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md transition hover:bg-yellow-600 shadow-md"
                >
                  ✏️ Edit
                </button>
              </div>
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
