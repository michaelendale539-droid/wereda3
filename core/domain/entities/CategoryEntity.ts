// core/domain/entities/CategoryEntity.ts
import { PostEntity } from './PostEntity';

export interface CategoryEntity {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  posts?: PostEntity[];
  createdAt: Date;
  updatedAt: Date;
}
