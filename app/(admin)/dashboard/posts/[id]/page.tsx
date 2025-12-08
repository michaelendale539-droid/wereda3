// app/admin/posts/edit/[id]/page.tsx
'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState, FormEvent, FC, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaCheckCircle, FaClock, FaCalendarAlt, FaBold, FaItalic, FaHeading } from 'react-icons/fa';

// --- Type Definitions ---
type PostStatus = 'Published' | 'Draft' | 'Archived';

interface PostDetails {
  id: number;
  title: string;
  author: string;
  content: string; // Markdown or simple text format
  status: PostStatus;
  dateCreated: string;
  datePublished: string | null;
}

interface EditorPageProps {
  params: {
    id: string; // The ID from the URL
  };
}

// --- Placeholder Data ---
const postData: PostDetails[] = [
  { 
    id: 1, 
    title: "Community Forum on Good Governance Success", 
    author: "Communication Office", 
    content: "The recent community forum held on November 28th saw unprecedented participation, with over 300 residents providing feedback on local public services. The key takeaway was the need for improved garbage collection schedules, which the Woreda administration has committed to addressing within the next two weeks. Success metrics showed a 15% increase in online civic engagement since the last quarter.", 
    status: 'Published', 
    dateCreated: '2025-11-20',
    datePublished: '2025-12-01',
  },
  { 
    id: 3, 
    title: "Draft Proposal: Local Tax Policy Update", 
    author: "Legal Affairs", 
    content: "We are currently drafting updates to the local business tax policy. Key changes focus on simplifying the small business registration fee structure. We encourage early public review and commentary before finalization.", 
    status: 'Draft', 
    dateCreated: '2025-12-05',
    datePublished: null,
  },
];

const allStatuses: PostStatus[] = ['Published', 'Draft', 'Archived'];

// Function to fetch a single post by ID (simulated fetch)
const getPostById = async (id: number): Promise<PostDetails | undefined> => {
  if (id === 0) {
      // Simulate a brand new post creation if ID is 0 or 'new'
      return {
          id: 0,
          title: 'New Post Title',
          author: 'Current User',
          content: 'Start writing your public announcement or news article here...',
          status: 'Draft',
          dateCreated: new Date().toISOString().slice(0, 10),
          datePublished: null,
      }
  }
  return postData.find(post => post.id === id);
};

// --- Helper: Status Badge ---
const StatusIndicator: FC<{ status: PostStatus }> = ({ status }) => {
    const base = "inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full";
    let classes = '';
    let Icon: FC<{className:string}> = FaCheckCircle;

    switch (status) {
        case 'Published': classes = 'bg-green-100 text-green-800'; break;
        case 'Draft': classes = 'bg-yellow-100 text-yellow-800'; Icon = FaClock; break;
        case 'Archived': classes = 'bg-gray-100 text-gray-800'; Icon = FaCalendarAlt; break;
    }
    return <span className={`${base} ${classes}`}><Icon className="mr-1" /> {status}</span>;
};


export default function PostEditorPage({ params }: EditorPageProps) {
  const router = useRouter();
  const postId = parseInt(params.id, 10);
  const [post, setPost] = useState<PostDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId);
        if (!postData) {
          notFound();
        }
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>; // Add a proper loading state
  }

  if (!post) {
    notFound();
  }

  const isNewPost = post.id === 0;

 const handleFieldChange = (field: keyof PostDetails, value: string | PostStatus) => {
  setPost(prev => {
    if (!prev) return null;
    return { ...prev, [field]: value };
  });
};

const handleSave = async (e: FormEvent, newStatus: PostStatus = post?.status || 'Draft') => {
  e.preventDefault();
  if (!post) return;
  
  setIsSaving(true);
  
  // Update local status immediately if changing status
  setPost(prev => {
    if (!prev) return null;
    return { ...prev, status: newStatus };
  });

  // Rest of the save logic...
};

const applyFormat = (tagStart: string, tagEnd: string = '') => {
  const textarea = document.getElementById('content') as HTMLTextAreaElement;
  if (!textarea || !post) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = post.content.substring(start, end);
  
  const newContent = post.content.substring(0, start) + 
                    tagStart + selectedText + tagEnd + 
                    post.content.substring(end);

  setPost(prev => {
    if (!prev) return null;
    return { ...prev, content: newContent };
  });

  // Focus the textarea and reset cursor position after format
  setTimeout(() => {
    textarea.focus();
    textarea.selectionStart = start + tagStart.length;
    textarea.selectionEnd = end + tagStart.length;
  }, 0);
};
  return (
    <div className="max-w-7xl mx-auto">
      <Link href="/dashboard/posts/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
        <FaArrowLeft className="mr-2" /> Back to Post List
      </Link>

      <form onSubmit={(e) => handleSave(e)} className="bg-white shadow-xl rounded-lg p-8 space-y-8">
        
        {/* --- Header & Status Panel --- */}
        <div className="border-b pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isNewPost ? 'Create New Post' : `Editing Post ID: ${post.id}`}
            </h1>
            <p className="text-lg text-gray-600 mt-1">Manage public information and announcements.</p>
          </div>

          <div className="text-right flex items-center space-x-4">
              <StatusIndicator status={post.status} />
              <button 
                  type="submit"
                  disabled={isSaving}
                  onClick={(e) => handleSave(e, 'Draft')}
                  className="px-4 py-2 text-sm font-medium rounded-lg text-blue-700 border border-blue-700 hover:bg-blue-50 transition duration-150 disabled:opacity-50"
              >
                  {isSaving ? 'Saving Draft...' : 'Save Draft'}
              </button>
              <button 
                  type="submit"
                  disabled={isSaving || post.status === 'Published'}
                  onClick={(e) => handleSave(e, 'Published')}
                  className="px-6 py-2 text-base font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-150 disabled:bg-gray-400"
              >
                  {isSaving ? 'Publishing...' : 'Publish'}
              </button>
          </div>
        </div>
        
        {/* --- Metadata Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Post Title</label>
                <input 
                    type="text" 
                    id="title" 
                    value={post.title} 
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    required 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author / Department</label>
                <input 
                    type="text" 
                    id="author" 
                    value={post.author} 
                    onChange={(e) => handleFieldChange('author', e.target.value)}
                    required 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Current Status</label>
                <select
                    id="status"
                    value={post.status}
                    onChange={(e) => handleFieldChange('status', e.target.value as PostStatus)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    disabled={post.status === 'Published' || isSaving}
                >
                    {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>

        {/* --- Content Editor Area --- */}
        <div className="space-y-4">
            <label htmlFor="content" className="block text-lg font-bold text-gray-800">Post Content</label>
            
            {/* Simple Formatting Toolbar */}
            <div className="flex space-x-2 p-2 bg-gray-50 border rounded-t-md">
                <button 
                    type="button" 
                    onClick={() => applyFormat('**', '**')}
                    className="p-2 text-gray-700 hover:bg-gray-200 rounded-md" 
                    title="Bold"
                ><FaBold /></button>
                <button 
                    type="button" 
                    onClick={() => applyFormat('_', '_')}
                    className="p-2 text-gray-700 hover:bg-gray-200 rounded-md" 
                    title="Italic"
                ><FaItalic /></button>
                <button 
                    type="button" 
                    onClick={() => applyFormat('## ', '')}
                    className="p-2 text-gray-700 hover:bg-gray-200 rounded-md" 
                    title="Heading 2"
                ><FaHeading /></button>
            </div>
            
            <textarea
                id="content"
                rows={20}
                value={post.content}
                onChange={(e) => handleFieldChange('content', e.target.value)}
                required
                className="block w-full rounded-b-md border-gray-300 shadow-sm p-4 border focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="Use simple Markdown for formatting: **bold**, _italic_, # Header 1"
                style={{ resize: 'vertical' }}
            />
        </div>
        
        {/* --- Footer & Final Actions --- */}
        <div className="pt-4 border-t flex justify-end">
            <button 
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 text-lg font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-150 disabled:bg-gray-400"
            >
                <FaSave className="inline mr-2"/> {isSaving ? 'Saving...' : 'Save and Update'}
            </button>
        </div>
      </form>
      
      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
          Created: {post.dateCreated} | Published: {post.datePublished || 'N/A'}
      </div>
    </div>
  );
}