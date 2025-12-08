// core/domain/entities/ComplianceReportEntity.ts
import type { IAdminNoteEntity } from './types';

export enum ReportStatus {
  NEW = 'NEW',
  PENDING_REVIEW = 'PENDING_REVIEW',
  IN_INVESTIGATION = 'IN_INVESTIGATION',
  CLOSED = 'CLOSED'
}

export enum IssueType {
  CORRUPTION = 'CORRUPTION',
  MISCONDUCT = 'MISCONDUCT',
  NEPOTISM = 'NEPOTISM',
  OTHER = 'OTHER'
}

export enum Urgency {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface ComplianceReportEntity {
  id: number;
  issueType: IssueType;
  urgency: Urgency;
  summary: string;
  fullDetails: string;
  
  // Status and Timestamps
  status: ReportStatus;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  adminNotes?: IAdminNoteEntity[];
}
