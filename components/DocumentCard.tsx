// components/DocumentCard.tsx
import { Document } from '@/types/index';
import Link from 'next/link';
import { FC } from 'react';
import { FaFilePdf, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col hover:shadow-xl transition duration-300">
      
      <div className="flex justify-between items-start mb-3">
        {/* Category Tag */}
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          {document.category}
        </span>
        {/* Year */}
        <span className="text-sm text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-1 text-xs" /> {document.year}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{document.title}</h3>
      
      <p className="text-sm text-gray-600 mb-4 flex-grow">{document.excerpt}</p>
      
      <div className="mt-auto flex justify-between items-center pt-3 border-t">
        {/* Link to Full Document (PDF) */}
        <a 
          href={document.fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-red-600 hover:text-red-700 font-medium text-sm transition duration-150"
        >
          <FaFilePdf className="mr-2" /> Download PDF
        </a>

        {/* Link to Dedicated Viewer Page (Optional: if you have complex viewer) */}
        <Link 
          href={`/elibrary/${document.id}`} 
          className="flex items-center text-blue-600 hover:text-blue-700 text-xs"
        >
          View Details <FaExternalLinkAlt className="ml-1 text-xs" />
        </Link>
      </div>

    </div>
  );
}

export default DocumentCard;