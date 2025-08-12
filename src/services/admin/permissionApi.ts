import { apiSlice } from '@/services/baseApi';
import type {
  GetPermissionsRequest,
  GetPermissionsResponse,
  CreatePermissionRequest,
  CreatePermissionResponse,
} from '@/types/admin/permission.d';

const permissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<
      GetPermissionsResponse,
      GetPermissionsRequest
    >({
      query: (body) => ({
        url: '/permission/get-all',
        method: 'POST',
        body,
      }),
      providesTags: ['Permission'],
    }),
    createPermission: builder.mutation<
      CreatePermissionResponse,
      CreatePermissionRequest
    >({
      query: (body) => ({
        url: '/permission/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Permission'],
    }),
  }),
});

export const { useGetPermissionsQuery, useCreatePermissionMutation } =
  permissionApi;
