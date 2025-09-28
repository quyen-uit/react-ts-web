import { apiSlice } from '@/services/baseApi';
import {
  Permission,
  GetPermissionsRequest,
  CreatePermissionRequest,
} from '@/types/admin/permission.d';
import { PaginatedResponse, BaseResponse } from '@/types/api';

const permissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<
      PaginatedResponse<Permission>,
      GetPermissionsRequest
    >({
      query: (body) => ({
        url: '/permission/get-all',
        method: 'POST',
        body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({
                type: 'Permission' as const,
                id,
              })),
              { type: 'Permission', id: 'LIST' },
            ]
          : [{ type: 'Permission', id: 'LIST' }],
    }),
    createPermission: builder.mutation<
      BaseResponse<Permission>,
      CreatePermissionRequest
    >({
      query: (body) => ({
        url: '/permission/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Permission', id: 'LIST' }],
    }),
  }),
});

export const { useGetPermissionsQuery, useCreatePermissionMutation } =
  permissionApi;
