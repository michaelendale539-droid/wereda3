/**
 * This page is protected by middleware.ts. 
 * Only users with 'member' or 'admin' roles can reach this component.
 * Design is focused on a responsive layout with a sidebar for filters and a main content area.
 * NOTE: Content restricted to Document (PDF) types only.
 * * Vibe: Inspired by the colors and themes of the Prosperity Party (PP) of Ethiopia,
 * using strong blues, greens, and gold accents to symbolize unity and growth.
 */
"use client"; 

import React, { useState, useEffect } from 'react';

// Define the interface for the e-library content item
interface ELibraryItem {
  id: number;
  title: string;
  author: string;
  type: 'PDF' | string; 
  description: string;
  tags: string[];
}

// Mock E-Library data with type definition, all are now PDFs
const libraryContent: ELibraryItem[] = [
  { 
    id: 1, 
    title: "National Development & Unity Blueprint", 
    author: "Government Initiative", 
    type: "PDF", 
    description: "A comprehensive plan detailing the economic and social roadmap for the next five years.",
    tags: ["Policy", "Economy", "Strategy"]
  },
  { 
    id: 2, 
    title: "Agricultural Transformation Strategy", 
    author: "Sectoral Experts", 
    type: "PDF", 
    description: "Detailed analysis on modernizing farming techniques and ensuring food security across regions.",
    tags: ["Agriculture", "Sustainability", "Innovation"]
  },
  { 
    id: 3, 
    title: "Infrastructure & Connectivity Report", 
    author: "Ministry of Transport", 
    type: "PDF", 
    description: "Assessment of current infrastructure and future projects focusing on transport and digital connectivity.",
    tags: ["Infrastructure", "Technology", "Logistics"]
  },
  { 
    id: 4, 
    title: "Fostering Regional Peace & Cooperation", 
    author: "Foreign Affairs Think Tank", 
    type: "PDF", 
    description: "An overview of diplomatic strategies aimed at enhancing stability and cross-border partnerships.",
    tags: ["Diplomacy", "Security", "Cooperation"]
  },
];

// Helper function to read the mock authentication cookie
const getRoleFromCookie = (): string => {
  if (typeof document === 'undefined') return 'Loading...';

  const cookie = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
  if (cookie) {
    const token = cookie.split('=')[1];
    if (token === 'admin_user') return 'Admin';
    if (token === 'member_user') return 'Member';
  }
  return 'Guest'; 
};


const SidebarFilter = () => {
  // Filters now only list categories relevant to national development themes
  const categories = ["All Documents", "Economic Policy", "Social Services", "Infrastructure", "Foreign Affairs"];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-blue-50">
      <h3 className="text-xl font-extrabold text-blue-800 mb-4 border-b-2 border-green-400 pb-2">Focus Areas</h3>
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li key={index}>
            <button 
              className={`w-full text-left p-2 rounded-lg text-sm transition duration-150 font-semibold 
              ${index === 0 ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'}`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ELibraryPage() {
  const [userRole, setUserRole] = useState('Loading...');

  useEffect(() => {
    setUserRole(getRoleFromCookie());
  }, []);

  return (
    // Background updated to a calm, deep blue-gray tint
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8"> 
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section: Strong Blue/Green/Gold emphasis */}
        <header className="mb-8 p-8 bg-blue-800 text-white rounded-xl shadow-2xl relative overflow-hidden">
          {/* Subtle background shape for visual interest (unity/growth theme) */}
           <div className="absolute top-0 right-0 h-full w-1/3 bg-green-500 opacity-10 transform skew-x-12 -translate-x-1/2"></div>
           
          <div className="relative flex justify-between items-start mb-2 z-10">
            <h1 className="text-6xl font-black mb-1 leading-tight text-yellow-400">
              Prosperity Digital Library 
            </h1>
            
            {/* Role Badge: Highlighted with Gold/Yellow accent */}
            <span className="text-md font-extrabold px-4 py-2 rounded-full 
              shadow-lg whitespace-nowrap border-2 border-yellow-400
              bg-yellow-100 text-blue-800 transform -translate-y-1
              ">
              Role: {userRole}
            </span>
          </div>
          
          <p className="relative text-2xl font-medium text-gray-200 z-10">
            Access to vital documents shaping the nation's progress and future.
          </p>
        </header>

        {/* Search Bar: Clean and Professional */}
        <div className="mb-8">
          <input
            type="search"
            placeholder="Search strategies, policies, or topics..."
            className="w-full p-4 text-lg border-2 border-blue-200 rounded-xl focus:border-blue-700 focus:ring-blue-700 transition duration-150 shadow-md"
          />
        </div>

        {/* Main Layout: Sidebar and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar (Filters) */}
          <div className="lg:col-span-1">
            <SidebarFilter />
          </div>

          {/* Main Content (Resource List) */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 border-gray-300 pb-2">Key Documents for Progress</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {libraryContent.map((item: ELibraryItem) => (
                <div 
                  key={item.id} 
                  // Card design with strong vertical green accent (growth)
                  className="bg-white p-6 rounded-xl shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] hover:bg-blue-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-blue-900 leading-snug">{item.title}</h3>
                    {/* PDF badge: Uses blue and white for formality */}
                    <span className={`text-sm font-extrabold px-3 py-1 rounded-full whitespace-nowrap bg-blue-600 text-white`}>
                      {item.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 italic mb-3 border-b border-dashed pb-2">Author: {item.author}</p>
                  <p className="text-gray-700 mb-4 text-justify">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-green-200 text-green-800 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button: Prominent Green/Success color */}
                  <a 
                    href={`/e-library/${item.id}`} 
                    className="inline-flex items-center justify-center w-full py-3 bg-green-600 text-white font-extrabold rounded-lg shadow-xl hover:bg-green-700 transition duration-150 mt-2 transform hover:translate-y-[-1px]"
                  >
                    Download Official Document
                    {/* Icon updated for better visual weight */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-10">
                <button className="px-8 py-3 bg-gray-300 text-blue-800 font-bold rounded-full hover:bg-gray-400 transition duration-150 shadow-md">
                    Load More Mandates
                </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}