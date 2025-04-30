// src/components/product/EditProduct.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { updateProduct } from "../../services/productService";

const EditProduct: React.FC = () => {
  const { id } = useParams(); // from route like /products/edit/:id
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch product to pre-fill the form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProductData({
            name: data.name,
            price: data.price,
            stock: data.stock,
            description: data.description,
          });
        } else {
          toast.error("Product not found.");
          navigate("/products");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return toast.error("Missing product ID.");

    try {
      await updateProduct(id, productData);
      toast.success("Product updated successfully!");
      navigate("/products"); // or back to product list page
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product.");
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price ($):</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
