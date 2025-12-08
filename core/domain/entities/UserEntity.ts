// core/domain/entities/UserEntity.ts
import type { PostEntity } from './PostEntity';
import type { DocumentEntity } from './DocumentEntity';
import type { AdminNoteEntity } from './AdminNoteEntity';



export enum UserRole {
  ADMIN="ADMIN",
  STAFF="STAFF",
  MODERATOR="MODERATOR"
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  username: string;
  firstName:string;
  lastName:string
  role: UserRole;
  status: UserStatus;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date | null;
  
  // Relations
  posts?: PostEntity[];
  documents?: DocumentEntity[];
  adminNotes?: AdminNoteEntity[];
}
