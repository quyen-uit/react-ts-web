import { useGetProductsQuery } from '@/features/products/productApiSlice';
import { useDebounce } from '@/hooks/shared/useDebounce';

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
