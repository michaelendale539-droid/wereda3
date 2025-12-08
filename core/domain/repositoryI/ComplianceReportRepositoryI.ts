import { ComplianceReportEntity, ReportStatus, IssueType, Urgency } from '../entities/ComplianceReportEntity';
import { BaseRepositoryI, PaginatedResult, PaginationOptions } from './BaseRepositoryI';

export interface CreateComplianceReportInput {
  issueType: IssueType;
  urgency: Urgency;
  summary: string;
  fullDetails: string;
  isAnonymous: boolean;
  reporterId?: number; // Optional because reports can be anonymous
}

export interface UpdateComplianceReportInput {
  status?: ReportStatus;
  isAnonymous?: boolean;
  summary?: string;
  fullDetails?: string;
  assignedToId?: number | null;
  resolvedAt?: Date | null;
}

export interface ComplianceReportRepositoryI extends BaseRepositoryI<ComplianceReportEntity, CreateComplianceReportInput, UpdateComplianceReportInput> {
  findByStatus(status: ReportStatus, options?: PaginationOptions): Promise<PaginatedResult<ComplianceReportEntity>>;
  findByReporter(reporterId: number, options?: PaginationOptions): Promise<PaginatedResult<ComplianceReportEntity>>;
  findByAssignedTo(userId: number, options?: PaginationOptions): Promise<PaginatedResult<ComplianceReportEntity>>;
  searchReports(query: string, options?: PaginationOptions): Promise<PaginatedResult<ComplianceReportEntity>>;
  getReportWithNotes(reportId: number): Promise<ComplianceReportEntity | null>;
  getReportWithReporter(reportId: number): Promise<ComplianceReportEntity | null>;
  getReportWithAssignedUser(reportId: number): Promise<ComplianceReportEntity | null>;
  getReportsByUrgency(urgency: Urgency, options?: PaginationOptions): Promise<PaginatedResult<ComplianceReportEntity>>;
  getReportsByType(issueType: IssueType, options?: PaginationOptions): Promise<PaginatedResult<ComplianceReportEntity>>;
  assignReport(reportId: number, assigneeId: number): Promise<ComplianceReportEntity | null>;
  updateStatus(reportId: number, status: ReportStatus, updatedById: number): Promise<ComplianceReportEntity | null>;
}
