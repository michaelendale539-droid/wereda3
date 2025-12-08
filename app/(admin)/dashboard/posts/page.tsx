// app/admin/posts/manage/page.tsx
'use client';

import { useState, useMemo, ChangeEvent, FormEvent, FC } from 'react';
import Link from 'next/link';
import { FaNewspaper, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaClock, FaSearch, FaTimes } from 'react-icons/fa';

// --- Type Definitions (Reused from public posts page) ---
interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
}

// --- Placeholder Data ---
const allAdminPosts: Post[] = [
  { id: 1, title: "Community Forum on Good Governance Success", date: "Dec 1, 2025", author: "Communication Office", status: 'Published' },
  { id: 2, title: "Budget Transparency Meeting Announcement", date: "Nov 25, 2025", author: "Finance Department", status: 'Published' },
  { id: 3, title: "Draft Proposal: Local Tax Policy Update", date: "Dec 5, 2025", author: "Legal Affairs", status: 'Draft' },
  { id: 4, title: "Infrastructure Project Completion", date: "Nov 18, 2025", author: "Development Team", status: 'Archived' },
  { id: 5, title: "New Initiative: Youth Employment Training Program", date: "Nov 10, 2025", author: "Social Affairs Bureau", status: 'Published' },
];

const postStatuses = ['Published', 'Draft', 'Archived'];

// --- Helper Components ---

const StatusBadge: FC<{ status: Post['status'] }> = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full";
  let colorClasses = '';
  let Icon: FC<{className:string}> = FaCheckCircle;

  switch (status) {
    case 'Published':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'Draft':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      Icon = FaClock;
      break;
    case 'Archived':
      colorClasses = 'bg-gray-100 text-gray-800';
      Icon = FaTrash;
      break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}><Icon className="mr-1" /> {status}</span>;
};

// --- Main Component ---

export default function PostsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering Logic
  const filteredPosts = useMemo(() => {
    return allAdminPosts
      .filter(post => 
        selectedStatus === 'All' || post.status === selectedStatus
      )
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedStatus]);

  const handleNewPostSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // --- IMPORTANT: API Call to create the post ---
    alert('Simulated: New post draft created! Redirecting to full editor. (Integration required)');
    setIsModalOpen(false);
    // In a real app, this would redirect to /admin/posts/edit/NEW_ID
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
        <FaNewspaper className="mr-3 text-blue-600" /> Content Management
      </h1>
      <p className="text-gray-600 mb-8">
        Manage public news, announcements, and articles for the Woreda 3 website.
      </p>

      {/* --- Controls and Filters --- */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        
        <div className="flex space-x-4">
            <select
              value={selectedStatus}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-sm"
            >
              <option value="All">Filter by Status</option>
              {postStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="flex items-center border border-gray-300 rounded-md p-2 bg-gray-50">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search Title or Author..."
                    value={searchTerm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full focus:outline-none bg-gray-50 text-gray-700 text-sm"
                />
            </div>
        </div>

        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
        >
            <FaPlus className="mr-2" /> Create New Post
        </button>
      </div>

      {/* --- Posts Table --- */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">Status</th>
              <th className="relative px-6 py-3 w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <tr key={post.id} className="hover:bg-blue-50/50 transition duration-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate max-w-sm">{post.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={post.status} /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-2">
                        <Link href={`/dashboard/posts/${post.id}`} className="text-indigo-600 hover:text-indigo-900" title="Edit Post">
                          <FaEdit className="w-4 h-4" />
                        </Link>
                        <button className="text-red-600 hover:text-red-900" title="Archive Post">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-lg text-gray-500">
                        No posts match your current filters.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- Add New Post Modal (Simple Draft Creator) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Start New Announcement</h2>
              <button onClick={() => setIsModalOpen(false)}><FaTimes className="w-5 h-5 text-gray-500 hover:text-gray-800" /></button>
            </div>
            <form onSubmit={handleNewPostSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Post Title (Draft)</label>
                <input type="text" id="title" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author/Department</label>
                <input type="text" id="author" name="author" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" defaultValue="Communication Office" />
              </div>
              
              <div className="pt-2 border-t">
                <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition duration-150">
                  Save as Draft and Open Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}