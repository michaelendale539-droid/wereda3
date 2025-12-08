import { AdminNoteEntity } from '../entities/AdminNoteEntity';
import { BaseRepositoryI, PaginatedResult, PaginationOptions } from './BaseRepositoryI';

export interface CreateAdminNoteInput {
  content: string;
  authorId: number;
  reportId: number;
}

export interface UpdateAdminNoteInput {
  content?: string;
}

export interface AdminNoteRepositoryI extends BaseRepositoryI<AdminNoteEntity, CreateAdminNoteInput, UpdateAdminNoteInput> {
  findByAuthor(authorId: number, options?: PaginationOptions): Promise<PaginatedResult<AdminNoteEntity>>;
  findByReport(reportId: number, options?: PaginationOptions): Promise<PaginatedResult<AdminNoteEntity>>;
  getNoteWithAuthor(noteId: number): Promise<AdminNoteEntity | null>;
  getNoteWithReport(noteId: number): Promise<AdminNoteEntity | null>;
}
