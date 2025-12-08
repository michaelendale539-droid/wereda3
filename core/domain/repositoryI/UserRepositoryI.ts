import { UserEntity } from '../entities/UserEntity';
import { BaseRepositoryI, PaginatedResult, PaginationOptions } from './BaseRepositoryI';

export interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
  isActive?: boolean;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
  isActive?: boolean;
  lastLogin?: Date | null;
}

export interface UserRepositoryI extends BaseRepositoryI<UserEntity, CreateUserInput, UpdateUserInput> {
  findByEmail(email: string): Promise<UserEntity | null>;
  updateLastLogin(userId: number): Promise<void>;
  searchUsers(query: string, options?: PaginationOptions): Promise<PaginatedResult<UserEntity>>;
  getUsersWithPosts(userId: number): Promise<UserEntity | null>;
  getUsersWithDocuments(userId: number): Promise<UserEntity | null>;
  getUsersWithAdminNotes(userId: number): Promise<UserEntity | null>;
}


