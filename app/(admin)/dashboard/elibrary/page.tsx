// app/admin/elibrary/manage/page.tsx
'use client';

import { useState, useMemo, ChangeEvent, FormEvent, FC } from 'react';
import { FaBook, FaPlus, FaSearch, FaFilePdf, FaEye, FaEyeSlash, FaDownload, FaUpload, FaClock } from 'react-icons/fa';
import Link from 'next/link';

// --- Type Definitions ---
type DocumentCategory = 'Laws & Regulations' | 'Policy Documents' | 'Official Notices' | 'Reports';
type DocumentStatus = 'Public' | 'Draft' | 'Archived';

interface Document {
  id: number;
  title: string;
  category: DocumentCategory;
  uploader: string;
  dateUploaded: string;
  status: DocumentStatus;
  downloadCount: number;
}

// --- Placeholder Data ---
const allDocuments: Document[] = [
  { id: 101, title: "Woreda Zoning Law 2025", category: 'Laws & Regulations', uploader: "Legal Affairs", dateUploaded: "2025-11-20", status: 'Public', downloadCount: 320 },
  { id: 102, title: "Q3 2025 Financial Audit Report", category: 'Reports', uploader: "Audit Office", dateUploaded: "2025-12-01", status: 'Public', downloadCount: 45 },
  { id: 103, title: "Draft Public Service Policy V1.1", category: 'Policy Documents', uploader: "Policy Unit", dateUploaded: "2025-12-05", status: 'Draft', downloadCount: 0 },
  { id: 104, title: "Public Notice: Water Rationing Schedule", category: 'Official Notices', uploader: "Communication Office", dateUploaded: "2025-11-15", status: 'Public', downloadCount: 180 },
  { id: 105, title: "Archived HR Policy 2018", category: 'Policy Documents', uploader: "HR", dateUploaded: "2025-10-01", status: 'Archived', downloadCount: 12 },
];

const allCategories: DocumentCategory[] = ['Laws & Regulations', 'Policy Documents', 'Official Notices', 'Reports'];
const allStatuses: DocumentStatus[] = ['Public', 'Draft', 'Archived'];

// --- Helper Components ---

const StatusBadge: FC<{ status: DocumentStatus }> = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full";
  let colorClasses = '';
  let Icon: FC<{className:string}> = FaEye;

  switch (status) {
    case 'Public':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'Draft':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      Icon = FaClock;
      break;
    case 'Archived':
      colorClasses = 'bg-gray-100 text-gray-800';
      Icon = FaEyeSlash;
      break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}><Icon className="mr-1" /> {status}</span>;
};


// --- Main Component ---

export default function ElibraryManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering Logic
  const filteredDocuments = useMemo(() => {
    return allDocuments
      .filter(doc => 
        selectedCategory === 'All' || doc.category === selectedCategory
      )
      .filter(doc =>
        selectedStatus === 'All' || doc.status === selectedStatus
      )
      .filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.uploader.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedCategory, selectedStatus]);

  const handleDocumentUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // --- IMPORTANT: API Call for secure file upload ---
    alert('Simulated: Document uploaded and saved as a Draft. (Integration required)');
    setIsModalOpen(false);
    // In a real app, you would refresh the document list here
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
        <FaBook className="mr-3 text-purple-600" /> eLibrary Document Management
      </h1>
      <p className="text-gray-600 mb-8">
        Control official documents, policies, and regulations visible to the public.
      </p>

      {/* --- Controls and Filters --- */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        
        <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 border text-sm"
            >
              <option value="All">Filter by Category</option>
              {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 border text-sm"
            >
              <option value="All">Filter by Status</option>
              {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>

        <div className="flex space-x-3">
            <input
                type="text"
                placeholder="Search Title..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 p-2 border text-sm w-48"
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
            >
                <FaUpload className="mr-2" /> Upload Document
            </button>
        </div>
      </div>

      {/* --- Documents Table --- */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploader</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
              <th className="relative px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.length > 0 ? (
                filteredDocuments.map(doc => (
                    <tr key={doc.id} className="hover:bg-purple-50/50 transition duration-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
                        <FaFilePdf className="mr-2 text-red-600"/> {doc.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploader}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={doc.status} /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        <FaDownload className="mr-1"/> {doc.downloadCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/elibrary/edit/${doc.id}`} className="text-indigo-600 hover:text-indigo-900" title="Edit Metadata/Status">
                          Edit
                        </Link>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="text-center py-10 text-lg text-gray-500">
                        No documents match your current filters.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- Upload Document Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">New Document Upload</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
            <form onSubmit={handleDocumentUpload} className="space-y-4">
              <div>
                <label htmlFor="docTitle" className="block text-sm font-medium text-gray-700">Document Title</label>
                <input type="text" id="docTitle" name="docTitle" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="docCategory" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="docCategory" name="docCategory" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                  {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File (PDF Recommended)</label>
                <input type="file" id="file" name="file" accept=".pdf, .doc, .docx" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/>
              </div>
              
              <div className="pt-2 border-t">
                <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium transition duration-150">
                  <FaUpload className="inline mr-2"/> Start Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}