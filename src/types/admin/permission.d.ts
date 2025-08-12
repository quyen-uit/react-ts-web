import type {
  BaseRequest,
  BaseResponse,
  PaginatedResponse,
} from '../api/index';

export interface Permission {
  id: number;
  name: string;
  description: string;
  module: string;
  action: string;
  createdAt?: string;
}

export interface PermissionFilter {
  name?: string;
  description?: string;
  module?: string;
  action?: string;
}

export type GetPermissionsRequest = BaseRequest<PermissionFilter>;

export type GetPermissionsResponse = PaginatedResponse<Permission>;

export type CreatePermissionRequest = Omit<Permission, 'id' | 'createdAt'>;

export type CreatePermissionResponse = BaseResponse<Permission>;
