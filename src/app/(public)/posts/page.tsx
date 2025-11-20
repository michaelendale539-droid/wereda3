/**
 * Official Announcements Page (/posts)
 * This page lists all public news, reports, and announcements.
 * It uses the Blue, Green, and Gold color palette.
 */
"use client";

import React from 'react';

// --- Types ---
interface PublicPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: 'Economy' | 'Infrastructure' | 'Governance' | 'Social';
}

// --- Mock Data (Expanded for a dedicated page) ---
const mockPublicPosts: PublicPost[] = [
  { 
    id: 1, 
    title: "Quarterly Report on Economic Stability", 
    summary: "An overview of macroeconomic performance and future projections, demonstrating robust growth and stability in key sectors.",
    date: "November 10, 2025",
    category: 'Economy'
  },
  { 
    id: 2, 
    title: "Updates on Public Service Delivery", 
    summary: "Detailed progress report on improving efficiency, accessibility, and quality of essential government services across all regions.",
    date: "October 28, 2025",
    category: 'Governance'
  },
  { 
    id: 3, 
    title: "Youth Empowerment Initiatives Launched", 
    summary: "Highlights from new programs designed to foster entrepreneurship, skill development, and job creation among the youth population.",
    date: "October 15, 2025",
    category: 'Social'
  },
  { 
    id: 4, 
    title: "Major Road Network Expansion Completed in Southern Region", 
    summary: "Successful completion of the 500km road expansion project, significantly boosting regional connectivity and trade.",
    date: "September 5, 2025",
    category: 'Infrastructure'
  },
  { 
    id: 5, 
    title: "New Digital Governance Platform Rolled Out", 
    summary: "Launch of a unified digital platform to streamline government transactions and enhance transparency for citizens.",
    date: "August 21, 2025",
    category: 'Governance'
  },
  { 
    id: 6, 
    title: "Foreign Direct Investment Hits Record High in Q3", 
    summary: "Analysis of the third quarter investment influx, focusing on manufacturing and technology sectors.",
    date: "July 1, 2025",
    category: 'Economy'
  },
];

// --- Utility Component: Category Badge ---
const CategoryBadge = ({ category }: { category: PublicPost['category'] }) => {
    let colorClasses = 'bg-gray-100 text-gray-700';
    if (category === 'Economy') colorClasses = 'bg-yellow-100 text-yellow-800';
    if (category === 'Governance') colorClasses = 'bg-blue-100 text-blue-800';
    if (category === 'Infrastructure') colorClasses = 'bg-green-100 text-green-800';
    if (category === 'Social') colorClasses = 'bg-red-100 text-red-800';

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
            {category}
        </span>
    );
}

// --- Component: Post Card ---
const PostCard = ({ post }: { post: PublicPost }) => (
  <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-blue-500 hover:shadow-2xl transition duration-300 transform hover:translate-y-[-2px] flex flex-col justify-between">
    <div>
        <CategoryBadge category={post.category} />
        <h3 className="text-2xl font-bold text-blue-800 mt-3 mb-2 leading-snug">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.summary}</p>
    </div>
    
    <div className="flex justify-between items-center border-t pt-4">
        <span className="text-sm font-medium text-gray-500">{post.date}</span>
        <a 
          href={`/posts/${post.id}`} 
          className="text-green-600 font-semibold hover:text-green-800 transition duration-150 flex items-center"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
    </div>
  </div>
);

// --- Main Page Component ---

export default function OfficialAnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Hero Section (Blue/Green Theme) */}
      <div className="bg-blue-800 text-white py-16 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-green-500 opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-2">
            Official Announcements
          </h1>
          <p className="text-xl font-light text-gray-200 max-w-3xl">
            Stay informed on government policy, economic reports, and key development milestones.
          </p>
        </div>
      </div>

      {/* 2. Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockPublicPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Placeholder for Pagination/Load More */}
        <div className="text-center mt-16">
            <button
                className="px-8 py-3 text-lg font-bold rounded-full text-blue-800 border-2 border-blue-500 
                           hover:bg-blue-50 transition duration-200 shadow-md"
            >
                Load More Announcements
            </button>
        </div>
      </section>

      {/* 3. Footer Placeholder */}
      <footer className="bg-blue-900 py-6 mt-10">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Prosperity Party Website. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}