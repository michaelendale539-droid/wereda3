// core/domain/entities/DocumentEntity.ts
import type { UserEntity } from './UserEntity';

export enum DocumentStatus {
  PUBLIC = 'PUBLIC',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED'
}

export interface DocumentEntity {
  id: number;
  title: string;
  category: string;
  fileKey: string;
  mimeType: string;
  status: DocumentStatus;
  downloadCount: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  uploaderId: number;
  uploader?: UserEntity;
}
