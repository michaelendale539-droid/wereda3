// core/domain/entities/AuditLog.ts

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  userId?: string | null;
  user?: UserEntity | null;
  oldData?: any;
  newData?: any;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

// Import UserEntity at the bottom to avoid circular dependencies
type UserEntity = import('./UserEntity').UserEntity;
