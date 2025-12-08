// core/domain/entities/AdminNoteEntity.ts
import type { UserEntity } from './UserEntity';
import type { IComplianceReportEntity } from './types';

export interface AdminNoteEntity {
  id: number;
  content: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  author: UserEntity;
  report: IComplianceReportEntity;
  
  authorId: number;
  reportId: number;
}
