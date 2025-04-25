import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ✅ Correct category fetcher from external API
const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories, // ✅ Use the correct function here
  });
};
