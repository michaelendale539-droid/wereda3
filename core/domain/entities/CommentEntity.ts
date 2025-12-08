// core/domain/entities/CommentEntity.ts

import type { UserEntity } from './UserEntity';

export interface CommentEntity {
  id: string;
  content: string;
  author: string;
  email?: string | null;
  postId: string;
  parentId?: string | null;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: UserEntity;
}
