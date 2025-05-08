// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Card from "./card";
// import CardSkeleton from "./CardSkeleton";

// // Define Product Type
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
//   description: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

// function FeaturedProducts() {
//   const [data, setData] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [cart, setCart] = useState<Product[]>([]); // ✅ State to track cart items

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch("https://fakestoreapi.com/products?limit=8");
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         const products: Product[] = await res.json();
//         setData(products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // ✅ Function to handle adding items to the cart
//   const handleAddToCart = (product: Product) => {
//     setCart((prevCart) => [...prevCart, product]); // Add product to cart
//     console.log("Cart updated:", cart);
//     alert(`${product.title} added to cart!`);
//   };

//   return (
//     <div className="container">
//       <h1 className="text-3xl font-bold text-center my-6 text-[#444]">
//         Featured Products
//       </h1>
//       <div className="product-container">
//         {isLoading ? (
//           <div className="w-full flex flex-wrap justify-around mx-auto">
//             <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
//           </div>
//         ) : (
//           data.map((product) => (
//             <div key={product.id} className="product-card">
//               <Card
//                 item={{
//                   id: product.id,
//                   src: product.image,
//                   name: product.title,
//                   price: product.price,
//                   cat: product.category,
//                   desc: product.description,
//                   rating: product.rating,
//                 }}
//               />
//               <button
//                 onClick={() => handleAddToCart(product)} // ✅ Add to Cart button event listener
//                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="text-center text-lg font-semibold mt-6">
//         <Link to="/products" className="nav-link">
//           View All
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default FeaturedProducts;



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./store/cartSlice";
import { getProducts } from "../services/productService"; // Firestore fetch
import Card from "./card";
import CardSkeleton from "./CardSkeleton";

// Define Firestore product structure
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      setIsLoading(true);
      try {
        const firestoreProducts = await getProducts();

        // ✅ Type assertion: make sure the data matches the Product interface
        const validProducts: Product[] = firestoreProducts.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          price: doc.price,
          stock: doc.stock,
          description: doc.description,
          category: doc.category || "Uncategorized",
          image: doc.image || "/placeholder.png",
        }));

        setProducts(validProducts);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsFromFirestore();
  }, []);

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

      {/* Admin-only Add Product button */}
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
            <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card mb-6">
              <Card
                item={{
                  id: Number(product.id), // Optional if your Card expects a number
                  src: product.image!,
                  name: product.name,
                  price: product.price,
                  cat: product.category || "Uncategorized",
                  desc: product.description,
                  rating: { rate: 4.5, count: 10 }, // Placeholder rating
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
