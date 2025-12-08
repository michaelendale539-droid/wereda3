// app/elibrary/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Document } from '@/types/index';
import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';

// Define the Document type for this page (including the optional fullContent)
interface DocumentWithContent extends Document {
    fullContent: string;
}

// Define the expected props from Next.js dynamic routing
interface ViewerPageProps {
  params: {
    id: string; 
  };
}

// --- Placeholder Full Content Data ---
const documentDetails: DocumentWithContent[] = [
    { 
        id: 101, title: "Woreda 3 Five-Year Strategic Plan", category: 'Policy', year: 2025, excerpt: "The comprehensive roadmap...", fileUrl: '/docs/strategy_plan_2025.pdf',
        fullContent: `Section 1: Vision and Mission. The core vision for Woreda 3 is to achieve sustainable, inclusive economic growth complemented by robust social services. Our mission is realized through citizen participation and transparent governance.

Section 2: Key Pillars. Our strategy is built on four pillars: Infrastructure Modernization, Human Capital Development, Digital Governance, and Economic Diversification. Specific projects under Infrastructure include the electrification of Sub-Woreda 9 and the expansion of the primary road network...
        
Section 3: Oversight and Accountability. Progress against the plan will be reviewed quarterly by the Woreda Council and publicly reported. We encourage citizens to use the compliance portal for any concerns...`
    },
    // Add full content for other documents as needed
];

// Function to fetch a single document by ID (simulated fetch)
const getDocumentById = (id: number): DocumentWithContent | undefined => {
  return documentDetails.find(doc => doc.id === id);
};

export default function DocumentViewerPage({ params }: ViewerPageProps) {
  const docId = parseInt(params.id, 10);
  const document = getDocumentById(docId);

  if (!document) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/elibrary" className="text-green-300 hover:text-white transition duration-150">
            &larr; Back to eLibrary
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">{document.title}</h1>
          <div className="text-green-200 mt-2 flex space-x-4">
            <span>📚 Category: {document.category}</span>
            <span>📅 Year: {document.year}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow-xl rounded-lg p-8 prose max-w-none">
          
          <div className="text-lg text-gray-800 whitespace-pre-wrap">
            {document.fullContent}
          </div>

          <a 
            href={document.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-white bg-red-600 hover:bg-red-700 p-3 rounded-lg mt-8 w-full justify-center font-semibold"
          >
            <FaFilePdf className="mr-2" /> Download Full Official PDF Document
          </a>
        </article>
      </main>
    </div>
  );
}