import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../../services/productService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { RootState } from "../store/store";

const Products: React.FC = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to delete product.");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div className="p-6">Loading products...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading products.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4">
        🛒 Cart: <span data-testid="cart-count">{cartItems.length}</span>
      </div>

      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product: any) => (
            <li
              key={product.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>${product.price}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;
