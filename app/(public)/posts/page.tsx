// app/posts/page.tsx
import Link from 'next/link';
import { FC } from 'react';

// Define the Post type (Reused from app/page.tsx)
interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  author: string;
}

// --- Placeholder Data ---
// In a real application, this data would be fetched from a database (e.g., via an API Route).
const allPosts: Post[] = [
  { id: 1, title: "Community Forum on Good Governance Success", date: "Dec 1, 2025", excerpt: "Summary of the successful forum discussing improved public service delivery in Woreda 3, highlighting key public participation metrics and achievements.", author: "Communication Office" },
  { id: 2, title: "Budget Transparency Meeting Announcement", date: "Nov 25, 2025", excerpt: "Details on the upcoming public meeting to review the draft budget for the next fiscal year. Citizen input is highly encouraged.", author: "Finance Department" },
  { id: 3, title: "Infrastructure Project Completion", date: "Nov 18, 2025", excerpt: "Celebration of the new pedestrian bridge completion, improving safety and access for residents in Sub-Woreda 7.", author: "Development Team" },
  { id: 4, title: "New Initiative: Youth Employment Training Program", date: "Nov 10, 2025", excerpt: "Launching a new program to train 500 local youth in digital skills and entrepreneurship over the next quarter.", author: "Social Affairs Bureau" },
  { id: 5, title: "Monthly Woreda Head Address: October Review", date: "Nov 1, 2025", excerpt: "A comprehensive review of progress made across security, health, and education sectors during the month of October.", author: "Woreda Administrator" },
];

// Component for a list item
const PostListItem: FC<{ post: Post }> = ({ post }) => (
  <div className="border-b pb-6 mb-6 last:border-b-0 last:mb-0">
    <h2 className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition duration-150">
      <Link href={`/posts/${post.id}`}>{post.title}</Link>
    </h2>
    <div className="text-sm text-gray-500 mt-1 flex space-x-4">
      <span>📅 {post.date}</span>
      <span>✍️ By {post.author}</span>
    </div>
    <p className="mt-3 text-gray-700">{post.excerpt}...</p>
    <Link 
      href={`/posts/${post.id}`} 
      className="inline-block mt-3 text-blue-500 hover:underline font-medium"
    >
      Continue Reading &rarr;
    </Link>
  </div>
);


export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white p-6 shadow-md text-center">
        <h1 className="text-4xl font-bold">Woreda 3 News & Announcements</h1>
        <p className="text-blue-200 mt-1">Stay up-to-date with our latest activities and progress.</p>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        <section className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-800 border-b pb-4 mb-6">
            All Posts ({allPosts.length})
          </h2>
          <div className="divide-y divide-gray-200">
            {allPosts.map(post => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>
          
          {allPosts.length === 0 && (
            <p className="text-gray-600">No posts are currently available.</p>
          )}
        </section>

        <div className="mt-10 text-center">
          <Link href="/" className="text-lg text-blue-600 hover:text-blue-800 transition duration-150">
            &larr; Back to Home & Compliance
          </Link>
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t p-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Woreda 3 Prosperity Party.
      </footer>
    </div>
  );
}