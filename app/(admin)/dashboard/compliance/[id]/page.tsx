// app/admin/compliance/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import { useState, FormEvent, ChangeEvent, FC } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaExclamationCircle, FaUserSecret, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

// --- Type Definitions (Reusing from list page) ---
type IssueType = 'corruption' | 'misconduct' | 'nepotism' | 'other';
type ReportStatus = 'New' | 'Pending Review' | 'In Investigation' | 'Closed';
type Urgency = 'High' | 'Medium' | 'Low';

interface ComplianceReportDetail {
  id: number;
  issueType: IssueType;
  fullDetails: string; // The full text from the anonymous submission
  status: ReportStatus;
  urgency: Urgency;
  dateSubmitted: string;
  adminNotes: string; // Internal notes for staff
}

interface DetailPageProps {
  params: {
    id: string;
  };
}

// --- Placeholder Data ---
const detailData: ComplianceReportDetail[] = [
  { 
    id: 401, 
    issueType: 'corruption', 
    fullDetails: "I witnessed Mr. X, the head of the procurement committee, accepting a cash payment in a sealed envelope from a vendor after awarding them the new road contract. The meeting took place on 2025-11-30 in the back office, not the main conference room. The contract was awarded despite lower bids. This suggests a bribe.", 
    status: 'New', 
    urgency: 'High', 
    dateSubmitted: '2025-12-04',
    adminNotes: 'Requires immediate internal audit team assignment. Confidentiality essential.'
  },
  { 
    id: 398, 
    issueType: 'nepotism', 
    fullDetails: "The new vacant clerk position was given to the niece of the Woreda Administrator without any public posting or formal interview process. This is the third instance of family members being hired this year.", 
    status: 'Pending Review', 
    urgency: 'Medium', 
    dateSubmitted: '2025-12-01',
    adminNotes: 'HR department contacted for hiring records and justification.'
  },
  // Add more details for other reports as needed
];

const allStatuses: ReportStatus[] = ['New', 'Pending Review', 'In Investigation', 'Closed'];

// Function to fetch a single report by ID (simulated fetch)
const getReportById = (id: number): ComplianceReportDetail | undefined => {
  return detailData.find(report => report.id === id);
};

// --- Helper Components (Reusing StatusTag logic) ---

const StatusTag: FC<{ status: ReportStatus }> = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full";
  let colorClasses = '';

  switch (status) {
    case 'New': colorClasses = 'bg-red-100 text-red-800'; break;
    case 'Pending Review': colorClasses = 'bg-yellow-100 text-yellow-800'; break;
    case 'In Investigation': colorClasses = 'bg-blue-100 text-blue-800'; break;
    case 'Closed': colorClasses = 'bg-green-100 text-green-800'; break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};


export default function ComplianceDetailPage({ params }: DetailPageProps) {
  const reportId = parseInt(params.id, 10);
  const initialReport = getReportById(reportId);

  if (!initialReport) {
    notFound();
  }

  const [report, setReport] = useState<ComplianceReportDetail>(initialReport);
  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [newStatus, setNewStatus] = useState<ReportStatus>(report.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value as ReportStatus);
  };
  
  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReport(prev => ({ ...prev, adminNotes: e.target.value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // --- IMPORTANT: API Call to Update Status/Notes ---
    console.log(`Saving Report ${report.id}. New Status: ${newStatus}. New Notes: ${report.adminNotes}`);

    try {
        // Simulate API call to update status and notes in the database
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Update the local state with the saved changes
        setReport(prev => ({ ...prev, status: newStatus }));
        setIsNotesEditing(false);
        alert('Report updated successfully!');

    } catch (error) {
        console.error("Failed to save report:", error);
        alert('Failed to update report.');
    } finally {
        setIsSaving(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/admin/compliance" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <FaArrowLeft className="mr-2" /> Back to All Reports
      </Link>

      <div className="bg-white shadow-xl rounded-lg p-8">
        
        {/* --- Header & Status Panel --- */}
        <div className="border-b pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Report ID: {report.id}
            </h1>
            <p className="text-xl text-gray-700 mt-1 capitalize">{report.issueType.replace('-', ' ')} Case</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 flex items-center mb-1">
                <FaCalendarAlt className="mr-1" /> Submitted: {report.dateSubmitted}
            </p>
            <StatusTag status={report.status} />
            <span className={`inline-block px-3 py-1 ml-2 text-sm font-semibold rounded-full ${report.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'}`}>
                Urgency: {report.urgency}
            </span>
          </div>
        </div>

        {/* --- Anonymous Submission Content --- */}
        <section className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaUserSecret className="mr-2 text-red-600" /> Anonymous Submission Details
          </h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed p-4 bg-white border rounded-md">
            {report.fullDetails}
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <FaExclamationCircle className="mr-1 text-red-600"/> Note: Treat all details as unverified initial claims.
          </p>
        </section>

        {/* --- Staff Action Panel (Status & Notes) --- */}
        <form onSubmit={handleSave} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Case Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Status Update */}
                <div className="p-4 border rounded-lg bg-blue-50">
                    <label htmlFor="status" className="block text-sm font-medium text-blue-900 mb-2">
                        Update Case Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={newStatus}
                        onChange={handleStatusChange}
                        className="block w-full rounded-md border-blue-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                        disabled={isSaving}
                    >
                        {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Admin Notes */}
                <div className="p-4 border rounded-lg bg-gray-100 md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="adminNotes" className="block text-sm font-medium text-gray-900">
                            Administrative Notes (Internal Only)
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsNotesEditing(!isNotesEditing)}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            {isNotesEditing ? (
                                <>
                                    <FaTimes className="mr-1" /> Cancel Edit
                                </>
                            ) : (
                                <>
                                    <FaEdit className="mr-1" /> Edit Notes
                                </>
                            )}
                        </button>
                    </div>
                    <textarea
                        id="adminNotes"
                        name="adminNotes"
                        rows={6}
                        value={report.adminNotes}
                        onChange={handleNotesChange}
                        disabled={!isNotesEditing || isSaving}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border disabled:bg-gray-200 disabled:text-gray-600"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t">
                <button
                    type="submit"
                    disabled={isSaving || (newStatus === report.status && report.adminNotes === initialReport.adminNotes && !isNotesEditing)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition duration-150"
                >
                    {isSaving ? 'Saving...' : 'Save Changes to Case File'}
                    <FaSave className="ml-2 w-5 h-5"/>
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}