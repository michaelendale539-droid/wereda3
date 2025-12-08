import { DocumentEntity } from '../entities/DocumentEntity';
import { BaseRepositoryI, PaginatedResult, PaginationOptions } from './BaseRepositoryI';

export interface CreateDocumentInput {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  ownerId: number;
  isPublic?: boolean;
  category?: string;
}

export interface UpdateDocumentInput {
  title?: string;
  description?: string;
  isPublic?: boolean;
  category?: string;
}

export interface DocumentRepositoryI extends BaseRepositoryI<DocumentEntity, CreateDocumentInput, UpdateDocumentInput> {
  findByOwner(ownerId: number, options?: PaginationOptions): Promise<PaginatedResult<DocumentEntity>>;
  searchDocuments(query: string, options?: PaginationOptions): Promise<PaginatedResult<DocumentEntity>>;
  getPublicDocuments(options?: PaginationOptions): Promise<PaginatedResult<DocumentEntity>>;
  getDocumentsByCategory(category: string, options?: PaginationOptions): Promise<PaginatedResult<DocumentEntity>>;
  getDocumentWithOwner(documentId: number): Promise<DocumentEntity | null>;
  updateDocumentFile(id: number, fileData: { fileUrl: string; fileType: string; fileSize: number }): Promise<DocumentEntity | null>;
}
