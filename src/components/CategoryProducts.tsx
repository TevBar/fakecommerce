import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

// ✅ Moved outside component to avoid redefining on each render
const fetchCategoryProducts = async (categoryName: string | undefined) => {
  if (!categoryName) throw new Error("Category name is required");

  const res = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  return res.json();
};

function CategoryProducts() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["categoryProducts", categoryName],
    queryFn: () => fetchCategoryProducts(categoryName), // ✅ using the function with React Query
    enabled: !!categoryName, // ✅ avoids calling with undefined
  });

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        key: product.id.toString(),
        name: product.title,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold my-4 text-center capitalize">
        {categoryName}
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">
          Error loading products: {(error as Error).message}
        </p>
      ) : (
        <div className="product-container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card p-4 shadow rounded bg-white"
            >
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
