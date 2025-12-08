// Shared types to avoid circular dependencies

export interface IAdminNoteEntity {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComplianceReportEntity {
  id: number;
  // Add other necessary fields from ComplianceReportEntity
  adminNotes?: IAdminNoteEntity[];
}
