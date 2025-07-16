import axiosInstance from '@/api/axios';

/**
 * Fetches product statistics.
 * This is an example of a non-cached API call.
 */
export const getProductStats = () => {
  return axiosInstance.get('/products/stats');
};

/**
 * Another example: Trigger a batch update for products.
 * @param productIds - An array of product IDs to update.
 */
export const batchUpdateProducts = (productIds: string[]) => {
  return axiosInstance.post('/products/batch-update', { productIds });
};
