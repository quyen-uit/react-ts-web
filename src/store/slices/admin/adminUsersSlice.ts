import { apiSlice } from '@/services/baseApi';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => ({ url: '/products', method: 'get' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: 'Product' as const,
                id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProduct: builder.query<any, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'get' }),
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    addProduct: builder.mutation<any, any>({
      query: (product) => ({
        url: '/products',
        method: 'post',
        data: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<any, any>({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: 'put',
        data: product,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'delete' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
