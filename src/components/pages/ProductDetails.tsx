import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { addToCart } from '../store/cartSlice';
import StarRating from "../StarRating";

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

interface CartProduct extends Product {
  key: string;
  name: string;
  quantity: number;
}

// Fetch product by ID
const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id, // only run query if ID exists
  });

  const addToCartHandler = (product: Product) => {
    const cartProduct: CartProduct = {
      ...product,
      key: String(product.id),
      name: product.title,
      quantity: 1,
    };
    dispatch(addToCart(cartProduct));
  };

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-black border-solid h-14 w-14"></div>
      </div>
    );
  }

  if (error || !product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  return (
    <div className='md:flex md:h-[100vh] w-[90%] md:w-[85%] my-auto mx-auto items-center'>
      <div className='md:w-[50%] text-left'>
        <img className='md:hidden w-[55%] mx-auto my-14' src={product.image} alt={product.title} />
        <p className='md:text-2xl uppercase font-bold text-gray-500 my-2'>{product.category}</p>
        <h1 className='text-2xl md:text-[2.8rem] text-gray-900 font-extrabold leading-tight'>{product.title}</h1>

        <div className='md:hidden flex items-start my-2'>
          <h3 className='block md:hidden text-[1.9rem] uppercase font-bold text-gray-900'>${product.price}</h3>
          {product.rating && (
            <span className='flex md:hidden items-end mx-auto'>
              <StarRating rating={product.rating.rate} />
              <span className='text-gray-500 text-sm'>{product.rating.count}</span>
            </span>
          )}
        </div>

        <button
          onClick={() => addToCartHandler(product)}
          className='block md:hidden w-[69%] mx-auto py-2 bg-gray-950 my-1 text-base font-semibold text-white uppercase shadow-sm'>
          Add To Cart
        </button>

        <p className='my-3 md:my-auto text-justify text-gray-800'>{product.description}</p>
        <h3 className='hidden md:block md:text-[2.5rem] uppercase font-bold text-gray-900'>${product.price}</h3>

        {product.rating && (
          <span className='hidden md:flex items-end w-[20%] mx-0'>
            <StarRating rating={product.rating.rate} />
            <span className='text-gray-500 text-sm'>{product.rating.count}</span>
          </span>
        )}

        <button
          onClick={() => addToCartHandler(product)}
          className='hidden md:block w-[45%] py-2 border-2 bg-gray-950 mt-7 text-xl font-semibold text-white uppercase'>
          Add To Cart
        </button>
      </div>

      <div className='hidden md:block w-[50%]'>
        <img className='w-[65%] mx-auto' src={product.image} alt={product.title} />
      </div>
    </div>
  );
};

export default ProductDetails;
