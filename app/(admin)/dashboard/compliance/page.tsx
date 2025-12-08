// app/admin/compliance/page.tsx
'use client';

import { useState, useMemo, ChangeEvent, FC } from 'react';
import Link from 'next/link';
import { FaFilter, FaSearch, FaClipboardList, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

// --- Type Definitions ---
interface ComplianceReport {
  id: number;
  issueType: 'corruption' | 'misconduct' | 'nepotism' | 'other';
  summary: string;
  status: 'New' | 'Pending Review' | 'In Investigation' | 'Closed';
  urgency: 'High' | 'Medium' | 'Low';
  dateSubmitted: string;
}

// --- Placeholder Data ---
const complianceReports: ComplianceReport[] = [
  { id: 401, issueType: 'corruption', summary: "Report of alleged misuse of infrastructure funds in Sub-Woreda 7.", status: 'New', urgency: 'High', dateSubmitted: '2025-12-04' },
  { id: 398, issueType: 'nepotism', summary: "Claim of unfair hiring practice for a Woreda department head.", status: 'Pending Review', urgency: 'High', dateSubmitted: '2025-12-01' },
  { id: 395, issueType: 'misconduct', summary: "Complaint about a staff member's unprofessional behavior at a public event.", status: 'In Investigation', urgency: 'Medium', dateSubmitted: '2025-11-28' },
  { id: 390, issueType: 'other', summary: "Suggestion for improving public notice transparency.", status: 'Closed', urgency: 'Low', dateSubmitted: '2025-11-20' },
  { id: 385, issueType: 'corruption', summary: "Report on unauthorized vending permits being issued illegally.", status: 'New', urgency: 'Medium', dateSubmitted: '2025-11-15' },
];

const issueTypes = ['corruption', 'misconduct', 'nepotism', 'other'];
const statuses = ['New', 'Pending Review', 'In Investigation', 'Closed'];

// --- Helper Components ---

const StatusTag: FC<{ status: ComplianceReport['status'] }> = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full";
  let colorClasses = '';
  let Icon: FC<{className?: string}> = FaClock;

  switch (status) {
    case 'New':
      colorClasses = 'bg-red-100 text-red-800';
      break;
    case 'Pending Review':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      Icon = FaExclamationTriangle;
      break;
    case 'In Investigation':
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'Closed':
      colorClasses = 'bg-green-100 text-green-800';
      Icon = FaCheckCircle;
      break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}><Icon className="mr-1" /> {status}</span>;
};

const UrgencyBadge: FC<{ urgency: ComplianceReport['urgency'] }> = ({ urgency }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-semibold rounded";
    let colorClasses = '';

    switch (urgency) {
        case 'High':
            colorClasses = 'bg-red-500 text-white';
            break;
        case 'Medium':
            colorClasses = 'bg-orange-500 text-white';
            break;
        case 'Low':
            colorClasses = 'bg-gray-400 text-white';
            break;
    }
    return <span className={`${baseClasses} ${colorClasses}`}>{urgency}</span>;
}


// --- Main Component ---

export default function ComplianceReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIssueType, setSelectedIssueType] = useState<string>('All');
  
  // Filtering and Search Logic
  const filteredReports = useMemo(() => {
    return complianceReports
      .filter(report => 
        selectedStatus === 'All' || report.status === selectedStatus
      )
      .filter(report =>
        selectedIssueType === 'All' || report.issueType === selectedIssueType
      )
      .filter(report => 
        report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(report.id).includes(searchTerm)
      );
  }, [searchTerm, selectedStatus, selectedIssueType]);


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
        <FaClipboardList className="mr-3 text-red-600" /> Compliance Reports Management
      </h1>
      <p className="text-gray-600 mb-8">
        Secure management portal for anonymous reports on governance and ethical issues.
      </p>

      {/* --- Filter and Search Controls --- */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        
        <div className="flex-grow flex items-center border border-gray-300 rounded-md p-2 bg-gray-50">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by ID or Summary..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full focus:outline-none bg-gray-50 text-gray-700"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
          className="block w-full md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
        >
          <option value="All">Filter by Status</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        
        <select
          value={selectedIssueType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedIssueType(e.target.value)}
          className="block w-full md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 p-2 border"
        >
          <option value="All">Filter by Issue Type</option>
          {issueTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
      </div>

      {/* --- Reports Table --- */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Urgency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary / Issue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Submitted</th>
              <th className="relative px-6 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                    <tr key={report.id} className="hover:bg-red-50/50 transition duration-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <UrgencyBadge urgency={report.urgency} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-lg">
                        {report.summary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {report.issueType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusTag status={report.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.dateSubmitted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/compliance/${report.id}`} className="text-red-600 hover:text-red-900">
                          View
                        </Link>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="text-center py-10 text-lg text-gray-500">
                        No reports match your current criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
          Note: All reports are submitted anonymously. Detailed investigation requires careful offline processing.
      </div>
    </div>
  );
}