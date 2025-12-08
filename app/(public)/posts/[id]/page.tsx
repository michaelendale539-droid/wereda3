// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Define the Post type (Reused for consistency)
interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  // Full content field is added here
  content: string; 
}

// Define the expected props from Next.js dynamic routing
interface PostPageProps {
  params: {
    id: string; // The ID from the URL
  };
}

// --- Placeholder Data with Full Content ---
const postData: Post[] = [
  { id: 1, title: "Community Forum on Good Governance Success", date: "Dec 1, 2025", author: "Communication Office", content: "The recent community forum held on November 28th saw unprecedented participation, with over 300 residents providing feedback on local public services. The key takeaway was the need for improved garbage collection schedules, which the Woreda administration has committed to addressing within the next two weeks. Success metrics showed a 15% increase in online civic engagement since the last quarter." },
  { id: 2, title: "Budget Transparency Meeting Announcement", date: "Nov 25, 2025", author: "Finance Department", content: "The Woreda 3 Finance Department invites all citizens to attend a public meeting on December 15, 2025, at 10:00 AM in the Woreda Hall. The agenda includes a detailed breakdown of the proposed budget allocations for infrastructure, education, and health for the coming year. Documents will be available for review three days prior to the meeting." },
  // ... more posts with full content
];

// Function to fetch a single post by ID (simulated fetch)
const getPostById = (id: number): Post | undefined => {
  return postData.find(post => post.id === id);
};

export default function SinglePostPage({ params }: PostPageProps) {
  const postId = parseInt(params.id, 10);
  const post = getPostById(postId);

  if (!post) {
    // If the post is not found, redirect to the Next.js 404 page
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/posts" className="text-blue-300 hover:text-white transition duration-150">
            &larr; Back to All Posts
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">{post.title}</h1>
          <div className="text-blue-200 mt-2 flex space-x-4">
            <span>📅 Published on {post.date}</span>
            <span>✍️ By {post.author}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow-xl rounded-lg p-8 prose max-w-none">
          {/* In a real app, you would safely render content that might contain HTML 
            (e.g., using dangerouslySetInnerHTML or a markdown parser).
            For this example, we treat it as plain text.
          */}
          <p className="text-lg text-gray-800 whitespace-pre-wrap">
            {post.content}
          </p>

          <hr className="my-8"/>

          <h3 className="text-xl font-semibold text-blue-700">Woreda Administration Note:</h3>
          <p className="text-gray-600">
            We value community feedback and transparency. For further inquiries on this topic, please use the contact information provided on our homepage.
          </p>
        </article>
      </main>
      
      <footer className="bg-gray-100 border-t p-4 text-center text-gray-600 mt-10">
        &copy; {new Date().getFullYear()} Woreda 3 Prosperity Party.
      </footer>
    </div>
  );
}