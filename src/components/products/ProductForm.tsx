// src/components/product/ProductForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, updateProduct } from "../../services/productService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import "./ProductForm.css"; // optional CSS file

interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  description: string;
  image?: string; // base64
}

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProductData = async (productId: string) => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          toast.error("Product not found.");
          return navigate("/products");
        }

        const product = productSnap.data();

        setFormData({
          name: product.name,
          price: product.price,
          stock: product.stock,
          description: product.description,
          image: product.image || "",
        });
      } catch (err) {
        console.error("Failed to load product:", err);
        toast.error("Failed to load product data.");
      }
    };

    if (isEditing && id) {
      loadProductData(id);
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await updateProduct(id, formData);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(formData);
        toast.success("Product added successfully!");
      }

      navigate("/products");
    } catch (error) {
      toast.error("Error saving product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name:
          <input name="name" type="text" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Price:
          <input name="price" type="number" value={formData.price} onChange={handleChange} step="0.01" required />
        </label>

        <label>
          Stock:
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
        </label>

        <label>
          Product Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
