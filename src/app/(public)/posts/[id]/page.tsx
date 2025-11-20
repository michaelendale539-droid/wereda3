/**
 * Official Announcement Detail Page (/posts/[id])
 * Displays the full content of a single public announcement.
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
  content: string; // Added full content field
}

// --- Mock Data (Must be consistent with /posts/page.tsx, but with content) ---
const mockPublicPosts: PublicPost[] = [
  { 
    id: 1, 
    title: "Quarterly Report on Economic Stability", 
    summary: "An overview of macroeconomic performance and future projections...",
    date: "November 10, 2025",
    category: 'Economy',
    content: `
      <p class="mb-4">The third quarter of 2025 marked a period of significant achievement, with the national economy demonstrating resilience against global headwinds. Key sectors, including agriculture and light manufacturing, saw a combined growth rate of 7.8%.</p>
      
      <h3 class="text-2xl font-semibold text-blue-700 mt-8 mb-3">Investment Highlights</h3>
      <p class="mb-4">Foreign Direct Investment (FDI) inflows reached a new peak, primarily channeled into renewable energy and technology infrastructure. This influx is a direct result of the regulatory reforms implemented earlier this year, aimed at simplifying bureaucratic processes and ensuring investor confidence.</p>
      
      <p class="mb-4">Furthermore, internal consumption remained robust, supported by stable employment figures and targeted social welfare programs. The central bank is committed to maintaining inflation within target bounds to protect citizens' purchasing power.</p>
      
      <p>We anticipate continued strong performance into the fourth quarter, solidifying our trajectory towards becoming a middle-income economy by the end of the decade.</p>
    `,
  },
  { 
    id: 2, 
    title: "Updates on Public Service Delivery", 
    summary: "Detailed progress report on improving efficiency and access to essential government services.",
    date: "October 28, 2025",
    category: 'Governance',
    content: `
      <p class="mb-4">Significant strides have been made in optimizing the delivery of public services. The 'Citizen First' initiative, launched six months ago, has streamlined processes in health, education, and municipal services, reducing average wait times by 30%.</p>
      
      <h3 class="text-2xl font-semibold text-blue-700 mt-8 mb-3">Key Improvements by Sector</h3>
      <ul class="list-disc list-inside space-y-2 ml-4 mb-4">
        <li><strong>Health:</strong> Rollout of new digital patient records in 50 regional clinics.</li>
        <li><strong>Education:</strong> Distribution of over 1 million textbooks to primary schools in underserved areas.</li>
        <li><strong>Municipal:</strong> Implementation of a new online application system for construction permits, cutting approval time from 90 to 45 days.</li>
      </ul>
      
      <p>These improvements are critical steps in building public trust and ensuring that government resources are efficiently utilized to benefit every citizen.</p>
    `,
  },
  { 
    id: 3, 
    title: "Youth Empowerment Initiatives Launched", 
    summary: "Highlights from new programs designed to foster entrepreneurship and skill development among the youth population.",
    date: "October 15, 2025",
    category: 'Social',
    content: `
      <p class="mb-4">Recognizing the pivotal role of youth in national development, the Ministry of Youth and Sports has inaugurated two flagship programs: the 'Tech Entrepreneurship Hubs' and the 'National Vocational Training Accelerator'.</p>
      
      <h3 class="text-2xl font-semibold text-blue-700 mt-8 mb-3">Program Goals</h3>
      <p class="mb-4">The Tech Hubs aim to incubate 500 startups in the first year, providing seed funding and mentorship. The Vocational Accelerator is designed to equip 20,000 young people with in-demand skills in areas like plumbing, electrical work, and advanced mechanics.</p>
      
      <p>This massive investment represents our unwavering commitment to harnessing the demographic dividend and ensuring that every young citizen has the opportunity to contribute meaningfully to their community and the economy.</p>
    `,
  },
  { 
    id: 4, 
    title: "Major Road Network Expansion Completed in Southern Region", 
    summary: "Successful completion of the 500km road expansion project, significantly boosting regional connectivity and trade.",
    date: "September 5, 2025",
    category: 'Infrastructure',
    content: `
      <p class="mb-4">The recently completed Southern Region Road Network Expansion project is a landmark achievement in our national infrastructure development plan. The 500-kilometer stretch, linking five major economic hubs, is now fully operational.</p>
      
      <h3 class="text-2xl font-semibold text-blue-700 mt-8 mb-3">Economic Impact</h3>
      <p class="mb-4">Initial forecasts suggest the new network will reduce transportation costs for agricultural goods by 15% and cut transit times by an average of 25%. This improved logistics capability is expected to significantly boost internal trade and facilitate exports.</p>
      
      <p class="mb-4">Furthermore, the project created over 3,000 temporary jobs during the construction phase and has established new permanent maintenance positions, contributing directly to local employment.</p>
    `,
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
        <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold ${colorClasses} tracking-wider uppercase`}>
            {category}
        </span>
    );
}


// --- Main Page Component ---
// Note: We use a custom notFound function for demonstration purposes in this single file component.
export default function PostDetailPage({ params = {} }: { params: { id: string } | {} }) { // Added default empty object for params
    
    // Ensure params is treated as an object with an 'id' property for strict type safety
    const routeParams = params as { id?: string };

    // 1. Check if the required parameter is actually present
    if (!routeParams.id) {
        // No console.error log here anymore, as this is expected behavior during initial mount/static phase
        return (
             <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-extrabold text-red-600 mb-4">404 - Post Not Found</h1>
                <p className="text-xl text-gray-700">The requested announcement could not be located. (Missing ID)</p>
                <a href="/posts" className="mt-6 text-blue-600 hover:underline font-medium">Go back to all announcements</a>
            </div>
        );
    }
    
    const postId = parseInt(routeParams.id, 10);
    const post = mockPublicPosts.find(p => p.id === postId);

    if (!post) {
        // Mocking Next.js notFound behavior
        return (
             <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-extrabold text-red-600 mb-4">404 - Post Not Found</h1>
                <p className="text-xl text-gray-700">The requested announcement could not be located.</p>
                <a href="/posts" className="mt-6 text-blue-600 hover:underline font-medium">Go back to all announcements</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* Header / Breadcrumb area */}
            <div className="bg-blue-800 text-white py-6 shadow-md">
                <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="text-sm font-medium">
                        <a href="/" className="hover:text-yellow-400 transition">Home</a>
                        <span className="mx-2">/</span>
                        <a href="/posts" className="hover:text-yellow-400 transition">Announcements</a>
                        <span className="mx-2">/</span>
                        <span className="text-yellow-400 truncate max-w-xs inline-block">{post.title}</span>
                    </nav>
                </div>
            </div>

            {/* Post Content Area */}
            <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl lg:max-w-6xl mx-auto">
                
                {/* Title & Metadata */}
                <header className="mb-10 pb-6 border-b-2 border-green-500">
                    <CategoryBadge category={post.category} />
                    <h1 className="text-5xl font-extrabold text-blue-900 mt-4 leading-snug">
                        {post.title}
                    </h1>
                    <p className="mt-3 text-lg text-gray-500 font-medium">
                        Published on: <span className="text-blue-700">{post.date}</span>
                    </p>
                </header>

                {/* Main Content */}
                <div className="text-gray-700 text-lg leading-relaxed">
                    {/* NOTE: Using dangerouslySetInnerHTML is required here because 
                      the mock 'content' includes structural HTML (like H3, UL, P) 
                      to demonstrate a realistic-looking article body.
                    */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Return Button */}
                <div className="mt-16 text-center">
                    <a 
                        href="/posts"
                        className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-bold rounded-lg shadow-xl 
                                   bg-green-600 text-white hover:bg-green-700 transition duration-300 transform hover:scale-[1.02]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Announcements
                    </a>
                </div>

            </article>

            {/* Footer Placeholder */}
            <footer className="bg-blue-900 py-6 mt-10">
                <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Prosperity Party Website. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
}