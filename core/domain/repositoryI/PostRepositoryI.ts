import { PostEntity } from '../entities/PostEntity';
import { BaseRepositoryI, PaginatedResult, PaginationOptions } from './BaseRepositoryI';

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: number;
  isPublished?: boolean;
  publishedAt?: Date | null;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  isPublished?: boolean;
  publishedAt?: Date | null;
}

export interface PostRepositoryI extends BaseRepositoryI<PostEntity, CreatePostInput, UpdatePostInput> {
  findByAuthor(authorId: number, options?: PaginationOptions): Promise<PaginatedResult<PostEntity>>;
  searchPosts(query: string, options?: PaginationOptions): Promise<PaginatedResult<PostEntity>>;
  getPublishedPosts(options?: PaginationOptions): Promise<PaginatedResult<PostEntity>>;
  getPostsWithAuthor(postId: number): Promise<PostEntity | null>;
  getPostsWithComments(postId: number): Promise<PostEntity | null>;
}
