import { ReactNode } from 'react';
import Link from 'next/link';

export default function ELibraryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">eLibrary</h1>
          <nav className="mt-4">
            <Link 
              href="/elibrary" 
              className="text-green-200 hover:text-white transition-colors"
            >
              Browse Documents
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}