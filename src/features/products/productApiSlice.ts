import { apiSlice } from '@/api/apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductStats: builder.query({
      query: () => '/products/stats',
    }),
    batchUpdateProducts: builder.mutation({
      query: (productIds) => ({
        url: '/products/batch-update',
        method: 'POST',
        body: { productIds },
      }),
    }),
  }),
});

export const { useGetProductStatsQuery, useBatchUpdateProductsMutation } = productApiSlice;
