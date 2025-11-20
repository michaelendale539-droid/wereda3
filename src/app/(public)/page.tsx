/**
 * Public Home Page (/)
 * Located in the (public) route group, this page does not require authentication.
 * It features static content, a Compliance Report Form, and public posts preview.
 * Vibe: Inspired by the colors and themes of the Prosperity Party (PP) of Ethiopia 
 * (Blues, Greens, Golds) to convey stability, unity, and growth.
 */
"use client"; // Using client hooks for form state and submission

import React, { useState, useCallback } from 'react';

// --- Types ---
interface PublicPost {
  id: number;
  title: string;
  summary: string;
  date: string;
}

interface ComplianceReport {
    topic: string;
    location: string;
    description: string;
}

// --- Mock Data ---
const mockPublicPosts: PublicPost[] = [
  { 
    id: 1, 
    title: "Quarterly Report on Economic Stability", 
    summary: "An overview of macroeconomic performance and future projections, demonstrating robust growth.",
    date: "November 10, 2025"
  },
  { 
    id: 2, 
    title: "Updates on Public Service Delivery", 
    summary: "Detailed progress report on improving efficiency and access to essential government services.",
    date: "October 28, 2025"
  },
  { 
    id: 3, 
    title: "Youth Empowerment Initiatives Launched", 
    summary: "Highlights from new programs designed to foster entrepreneurship and skill development among the youth.",
    date: "October 15, 2025"
  },
];

const reportTopics = [
    "Misuse of Public Funds",
    "Service Delivery Failure",
    "Ethical Misconduct",
    "Procurement Irregularities",
    "Other Complaint or Suggestion"
];

const fixedLocation = "Woreda 3, Gullele, Addis Ababa";

// --- Components ---

const PostCard = ({ post }: { post: PublicPost }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-2xl transition duration-300 transform hover:translate-y-[-2px]">
    <h3 className="text-xl font-bold text-blue-800 mb-2">{post.title}</h3>
    <p className="text-gray-600 mb-4">{post.summary}</p>
    <div className="flex justify-between items-center border-t pt-3">
        <span className="text-sm font-medium text-gray-500">{post.date}</span>
        <a 
          href={`/posts/${post.id}`} 
          className="text-green-600 font-semibold hover:text-green-800 transition duration-150"
        >
          Read More →
        </a>
    </div>
  </div>
);

const ComplianceReportForm = () => {
    // Initialize report with the fixed location
    const initialState: ComplianceReport = { topic: reportTopics[0], location: fixedLocation, description: '' };
    const [report, setReport] = useState<ComplianceReport>(initialState);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Do not allow changing the location field, though it's disabled/readOnly in UI
        if (name === 'location') return; 
        setReport(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!report.description) {
            // In a real app, show a proper error notification instead of console log
            console.error("Please provide a description.");
            return;
        }

        setStatus('submitting');
        
        // --- Mock API Call ---
        setTimeout(() => {
            console.log("Anonymous Report Submitted:", report);
            setStatus('success');
            setReport(initialState);
        }, 1500);
        // ---------------------
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 border-t-4 border-blue-200">
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border-l-8 border-yellow-400">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-800">
                        Anonymous Compliance Report for Gullele Woreda 3 🛡️
                    </h2>
                    <p className="mt-2 text-xl text-green-600 font-medium">
                        Your input ensures accountability within this specific administrative area.
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="p-8 text-center bg-green-100 border-2 border-green-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-2xl font-bold text-green-800">Report Successfully Submitted!</h3>
                        <p className="text-lg text-green-700 mt-2">
                            Thank you for your commitment to transparency. We take all reports seriously.
                        </p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="mt-4 px-6 py-2 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Submit Another Report
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Topic Select */}
                        <div>
                            <label htmlFor="topic" className="block text-lg font-semibold text-blue-800 mb-1">
                                1. Area of Concern
                            </label>
                            <select
                                id="topic"
                                name="topic"
                                value={report.topic}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition"
                                required
                            >
                                {reportTopics.map(topic => (
                                    <option key={topic} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location Input - FIXED TO WOREDA 3, GULLELE */}
                        <div>
                            <label htmlFor="location" className="block text-lg font-semibold text-blue-800 mb-1">
                                2. Administrative Area (Fixed)
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={report.location}
                                readOnly
                                disabled
                                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 transition"
                            />
                            <p className="text-sm text-gray-500 mt-1">This form is dedicated solely to issues within **Woreda 3, Gullele, Addis Ababa**.</p>
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label htmlFor="description" className="block text-lg font-semibold text-blue-800 mb-1">
                                3. Detailed Description (Mandatory)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={report.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Provide clear details, dates, and names of entities involved. Do not include personal identifying information."
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 transition"
                                required
                            />
                        </div>

                        {/* Submission Note */}
                        <p className="text-sm text-center text-red-600 font-medium pt-2">
                            Note: This form does not collect your IP address or personal data.
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full py-3 px-4 rounded-lg text-xl font-extrabold text-white shadow-xl 
                                       bg-green-600 hover:bg-green-700 transition duration-150 flex justify-center items-center"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting Anonymously...
                                </>
                            ) : (
                                "Submit Report Anonymously"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}


// --- Main Page Component ---

export default function PublicHomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Hero Section (Blue/Gold Theme) */}
      <div className="bg-blue-800 text-white py-20 shadow-2xl overflow-hidden relative">
        {/* Abstract Green Shape for dynamism and growth */}
        <div className="absolute inset-y-0 right-0 w-1/4 bg-green-500 opacity-10 transform skew-x-12 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-7xl font-black text-yellow-400 mb-4 leading-tight">
            Charting Our Path to Prosperity
          </h1>
          <p className="text-3xl font-light text-gray-200 mb-8 max-w-4xl">
            Uniting for a better tomorrow through clear policy, transparency, and collaborative development across the nation.
          </p>
          <a 
            href="/posts"
            className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-extrabold rounded-lg shadow-xl 
                       bg-yellow-400 text-blue-800 hover:bg-yellow-300 transition duration-300 transform hover:scale-105"
          >
            Explore Official Announcements
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* 2. Static Content: Mission & Vision (Green Accent) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-800 border-b-4 border-green-500 inline-block pb-1">
            Our Core Mandate
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Dedicated to the pursuit of sustainable growth, unity, and shared prosperity for all citizens.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.485 0-4.5 2-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2 4.5-4.5S14.485 14 12 14z" />
            </svg>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Unity</h3>
            <p className="text-gray-700">Fostering collaboration and shared identity across all regional and cultural lines.</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Growth</h3>
            <p className="text-gray-700">Driving economic prosperity and sustainable development through innovation and investment.</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c-1.282 0-2.54.269-3.718.804M12 8v4l3 3m7.76 1.834a9.965 9.965 0 01-2.94 2.94m-2.94 2.94a9.965 9.965 0 01-2.94 2.94m-2.94-2.94a9.965 9.965 0 01-2.94-2.94m-2.94-2.94a9.965 9.965 0 01-2.94-2.94m-2.94-2.94a9.965 9.965 0 01-2.94-2.94" />
            </svg>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Future</h3>
            <p className="text-gray-700">Building a modern, democratic, and globally competitive nation for the next generation.</p>
          </div>
        </div>
      </section>
      
      {/* 3. New Section: Compliance Report Form */}
      <ComplianceReportForm />

      {/* 4. Latest Posts Section (Links to /posts) */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 border-b-2 border-yellow-400 pb-3">
            <h2 className="text-4xl font-extrabold text-blue-800">
              Latest Official Announcements
            </h2>
            <a 
              href="/posts"
              className="text-lg font-bold text-green-600 hover:text-green-800 transition duration-150 whitespace-nowrap"
            >
              View All Posts →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockPublicPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer Placeholder */}
      <footer className="bg-blue-900 py-6">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Prosperity Party Website. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}