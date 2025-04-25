// import React, { useState, useEffect } from 'react';
// import Card from '../card';
// import CardSkeleton from '../CardSkeleton';
// import Filterbar from '../Filterbar';

// // Define Product type
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   description: string;
//   image: string;
//   rating?: {
//     rate: number;
//     count: number;
//   };
// }

// const Products: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [select, setSelect] = useState<string>("All Products");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     setIsLoading(true);

//     // API URL for category filtering
//     const apiUrl =
//       select !== "All Products"
//         ? `https://fakestoreapi.com/products/category/${select}`
//         : 'https://fakestoreapi.com/products';

//     // Fetch products from API
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((data: Product[]) => {  // ✅ Explicitly define API response type
//         setProducts(data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//         setIsLoading(false);
//       });
//   }, [select]);

//   // Handle category selection
//   const handleClick = (category: string) => {
//     setSelect(category);
//   };

//   return (
//     <div>
//       <Filterbar select={select} handleClick={handleClick} />

//       <div className='w-[90vw] mx-[5vw] flex flex-wrap'>
//         {isLoading ? (
//           <div className='w-full flex flex-wrap justify-around mx-auto'>
//             <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
//           </div>
//         ) : (
//           products.map((product) => (
//             <Card
//               key={product.id}
//               item={{
//                 key: String(product.id), // ✅ Ensure key is a string
//                 src: product.image,
//                 name: product.title,
//                 price: product.price,
//                 cat: product.category,
//                 desc: product.description,
//                 rating: product.rating,
//               }}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;
// this code above is the correct code used for FakeApi to pull product list up. 


// /components/pages/Products.tsx
// src/components/admin/Products.tsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../../services/productService";
import { toast } from "react-toastify";

const Products: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch all products with React Query
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts, // 👈 from your productService
  });

  // Mutation for deleting a product
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // ✅ Refetch
    },
    onError: () => {
      toast.error("Failed to delete product.");
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div className="p-6">Loading products...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading products.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
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
