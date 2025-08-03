import { apiSlice } from '@/services/api/baseApi';
import type {
  Product,
  ProductFormData,
  PaginatedResponse,
  ProductQueryParams,
} from '@/types/api';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, ProductQueryParams>({
      query: ({ search = '', page = 1, limit = 10 }) => ({
        url: `/products`,
        params: { search, page, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Product' as const,
                id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>(
      {
        query: ({ id, ...patch }) => ({
          url: `/products/${id}`,
          method: 'PUT',
          body: patch,
        }),
        invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
      }
    ),
    addProduct: builder.mutation<Product, ProductFormData>({
      query: (newProduct) => ({
        url: `/products`,
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
