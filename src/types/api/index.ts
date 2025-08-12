export interface BaseResponse<T> {
  message: string;
  statusCode: number;
  succeeded: boolean;
  data: T;
}

export interface PaginatedData<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalPages: number;
  data: T[];
}

export type PaginatedResponse<T> = BaseResponse<PaginatedData<T>>;

export interface BaseRequest<T> {
  sort?: string;
  pageNumber?: number;
  pageSize?: number;
  filter?: T;
}
