// app/elibrary/page.tsx (Updated)
'use client'; // Retain the client directive since we're using a hook

import { useState, useMemo, ChangeEvent } from 'react';
import { Document } from '@/types/index';
import DocumentCard from '@/components/DocumentCard';
import { FaSearch, FaFilter, FaBookOpen, FaUserCircle, FaSpinner } from 'react-icons/fa';
import { useAuthUser } from '@/hooks/useAuthUser'; // Import the new hook
import Link from 'next/link';

// --- Placeholder Data (Keep the data logic from before) ---
const libraryDocuments: Document[] = [
  // ... (document data from previous response)
  { id: 101, title: "Woreda 3 Five-Year Strategic Plan", category: 'Policy', year: 2025, excerpt: "The comprehensive roadmap for development and good governance from 2025 to 2030.", fileUrl: '/docs/strategy_plan_2025.pdf' },
  { id: 102, title: "Quarterly Financial Transparency Report", category: 'Report', year: 2025, excerpt: "Detailed breakdown of quarterly expenditure and revenue for Q4 2025.", fileUrl: '/docs/finance_report_Q4.pdf' },
  { id: 103, title: "Local Zoning and Land Use Regulation", category: 'Law', year: 2024, excerpt: "The official legal framework governing property development and land classification.", fileUrl: '/docs/zoning_law_2024.pdf' },
  { id: 104, title: "Citizen Guide to Public Service Delivery", category: 'Guideline', year: 2025, excerpt: "A guide detailing service standards and citizen rights when interacting with Woreda offices.", fileUrl: '/docs/citizen_guide.pdf' },
  { id: 105, title: "Introductory Economics for Youth", category: 'Educational', year: 2023, excerpt: "Simple educational material explaining basic economic principles relevant to Ethiopia.", fileUrl: '/docs/youth_economics.pdf' },
];

const categories = ['Policy', 'Report', 'Law', 'Guideline', 'Educational'];

export default function ElibraryPage() {
  const { session, loading } = useAuthUser(); // Get user session status
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // ... (Filtering logic remains the same) ...
  const filteredDocuments = useMemo(() => {
    return libraryDocuments
      .filter(doc => 
        selectedCategory === 'All' || doc.category === selectedCategory
      )
      .filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- Header Section --- */}
      <header className="bg-green-700 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold flex items-center">
                <FaBookOpen className="mr-3"/> Woreda 3 eLibrary
            </h1>
            <p className="sm:ml-4 text-green-200 text-sm mt-1 sm:mt-0">Access policies, reports, and official documents.</p>
          </div>
          
          {/* --- User Status Display --- */}
          <div className="mt-3 sm:mt-0">
            {loading ? (
                <div className="flex items-center text-green-300">
                    <FaSpinner className="animate-spin mr-2" /> Loading...
                </div>
            ) : session ? (
                <div className="flex items-center space-x-2 bg-green-800 p-2 rounded-lg">
                    <FaUserCircle className="text-green-300 text-xl" />
                    <div>
                        <p className="text-sm font-semibold">{session.name}</p>
                        <p className="text-xs text-green-300">Role: {session.role.charAt(0).toUpperCase() + session.role.slice(1)}</p>
                    </div>
                </div>
            ) : (
                <Link href="/admin/login" className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md transition duration-150">
                    Staff Login
                </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* --- Search and Filter Controls (Rests of the content remains the same) --- */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          
          <div className="flex-grow flex items-center border border-gray-300 rounded-md p-2 bg-gray-50">
            <FaSearch className="text-gray-500 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by title or content..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full focus:outline-none bg-gray-50 text-gray-700"
            />
          </div>

          <div className="w-full md:w-64 flex items-center space-x-2">
            <FaFilter className="text-gray-500 flex-shrink-0" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Document List --- */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Displaying {filteredDocuments.length} result{filteredDocuments.length !== 1 ? 's' : ''}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <p className="text-center text-lg text-gray-600 p-10 bg-white rounded-lg shadow-md">
                No documents match your current search or filter criteria.
            </p>
          )}
        </section>

      </main>
    </div>
  );
}