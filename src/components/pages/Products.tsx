import React, { useState, useEffect } from 'react';
import Card from '../card';
import CardSkeleton from '../CardSkeleton';
import Filterbar from '../Filterbar';

// Define Product type
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [select, setSelect] = useState<string>("All Products");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    // API URL for category filtering
    const apiUrl =
      select !== "All Products"
        ? `https://fakestoreapi.com/products/category/${select}`
        : 'https://fakestoreapi.com/products';

    // Fetch products from API
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: Product[]) => {  // ✅ Explicitly define API response type
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, [select]);

  // Handle category selection
  const handleClick = (category: string) => {
    setSelect(category);
  };

  return (
    <div>
      <Filterbar select={select} handleClick={handleClick} />

      <div className='w-[90vw] mx-[5vw] flex flex-wrap'>
        {isLoading ? (
          <div className='w-full flex flex-wrap justify-around mx-auto'>
            <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
          </div>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              item={{
                key: String(product.id), // ✅ Ensure key is a string
                src: product.image,
                name: product.title,
                price: product.price,
                cat: product.category,
                desc: product.description,
                rating: product.rating,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
