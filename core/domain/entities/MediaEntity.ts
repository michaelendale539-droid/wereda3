// core/domain/entities/MediaEntity.ts

export type MediaType = 'IMAGE' | 'DOCUMENT' | 'VIDEO' | 'AUDIO' | 'OTHER';

// Import UserEntity type to avoid circular dependencies
type UserEntity = import('./UserEntity').UserEntity;

export interface MediaEntity {
  id: string;
  url: string;
  type: MediaType;
  name: string;
  size: number;
  width?: number | null;
  height?: number | null;
  description?: string | null;
  postId?: string | null;
  uploadedBy?: string | null;
  uploader?: UserEntity | null;
  createdAt: Date;
  updatedAt: Date;
}
