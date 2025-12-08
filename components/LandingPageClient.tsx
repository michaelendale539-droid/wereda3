'use client';

import { FC,useEffect } from 'react';
import Link from 'next/link';
import AnonymousComplianceForm from './AnonymousComplianceform';
import SocialMediaLinks from './SocialmediaLinks';

interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

interface PostCardProps {
  post: Post;
}

const PostSectionCard: FC<PostCardProps> = ({ post }) => (
  <div className="bg-white p-4 shadow-md hover:shadow-lg transition duration-300 rounded-lg border border-gray-200">
    <h3 className="text-xl font-semibold text-blue-700">{post.title}</h3>
    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
    <p className="text-gray-700">{post.excerpt}</p>
    <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-2 inline-block">
      Read More &rarr;
    </Link>
  </div>
);

export default function LandingPageClient() {
  const recentPosts: Post[] = [
    { id: 1, title: "Community Forum on Good Governance Success", date: "Dec 1, 2025", excerpt: "Summary of the successful forum discussing improved public service delivery in Woreda 3." },
    { id: 2, title: "Budget Transparency Meeting Announcement", date: "Nov 25, 2025", excerpt: "Details on the upcoming public meeting to review the draft budget for the next fiscal year." },
    { id: 3, title: "Infrastructure Project Completion", date: "Nov 18, 2025", excerpt: "Celebration of the new pedestrian bridge completion, improving safety and access." },
  ];
  useEffect(()=>{
    document.body.className=""
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Header & Hero Section --- */}
      <header className="bg-blue-800 text-white p-12 text-center shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Woreda 3 Prosperity Party
        </h1>
        <p className="text-xl text-blue-200">
          Accountability, Progress, and Community Engagement
        </p>
        <div className="mt-6 space-x-4">
          <Link 
            href="#compliance-form" 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            Report Anonymously
          </Link>
          <Link 
            href="#posts" 
            className="bg-white hover:bg-gray-200 text-blue-800 font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            View Updates
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- Section 1: Anonymous Compliance Form (Left/Center Column) --- */}
          <section id="compliance-form" className="lg:col-span-2 bg-white shadow-2xl rounded-xl p-8 border border-red-100">
            <h2 className="text-3xl font-bold text-red-600 border-b pb-3 mb-6">
              Confidential Compliance Report
            </h2>
            <p className="text-gray-700 mb-6">
              Upholding integrity is our priority. Use this form to report ethical concerns, misconduct, or issues related to accountability within Woreda 3. **Your submission is completely anonymous.**
            </p>
            <AnonymousComplianceForm />
          </section>

          {/* --- Section 2: Contact & Social Media Links (Right Column) --- */}
          <section id="contact" className="lg:col-span-1 bg-white shadow-lg rounded-xl p-8 border border-blue-100 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-blue-800 border-b pb-3 mb-6">
              Connect with Woreda 3 Officials
            </h2>
            <SocialMediaLinks />
          </section>
        </div>

        {/* --- Section 3: Recent Posts and Announcements (Full Width) --- */}
        <section id="posts" className="mt-16">
          <h2 className="text-3xl font-bold text-blue-800 border-b pb-3 mb-8">
            Latest Announcements & Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <PostSectionCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-blue-900 border-t p-6 text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Woreda 3 Prosperity Party. Dedicated to Sustainable Development.
        </p>
      </footer>
    </div>
  );
}
