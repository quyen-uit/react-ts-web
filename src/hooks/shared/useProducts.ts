import { useDebounce } from '@/hooks/shared/useDebounce';
import { useGetProductsQuery } from '@/store/slices/products/productApiSlice';

interface UseProductsProps {
  searchTerm?: string;
}

export const useProducts = ({ searchTerm = '' }: UseProductsProps = {}) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data: productsData,
    error,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    search: debouncedSearchTerm,
  });

  const products = productsData?.data || [];
  const totalCount = productsData?.totalCount || 0;

  return {
    products,
    totalCount,
    error,
    isLoading,
    refetch,
  };
};
