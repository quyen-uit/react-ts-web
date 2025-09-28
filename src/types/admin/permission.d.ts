import { BaseRequest } from '../api';

export interface Permission {
  id: number;
  name: string;
  description: string;
  module: string;
  action: string;
}

export interface GetPermissionsRequest extends BaseRequest {
  filter?: {
    name?: string;
    description?: string;
    module?: string;
    action?: string;
  };
}

export interface CreatePermissionRequest {
  name: string;
  description: string;
  module: string;
  action: string;
}
