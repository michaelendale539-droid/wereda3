export interface BaseRepositoryI<T, CreateInput, UpdateInput> {
  create(data: CreateInput): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: number, data: UpdateInput): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
