// core/domain/entities/PostEntity.ts
import type { UserEntity } from './UserEntity';

export enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED'
}

export interface PostEntity {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  status: PostStatus;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  
  // Relations
  authorId: number;
  author?: UserEntity;
}


