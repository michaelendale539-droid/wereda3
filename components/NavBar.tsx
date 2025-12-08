// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

// Define the public pages for the navigation
interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home & Compliance' },
  { href: '/posts', label: 'News & Posts' },
  { href: '/elibrary', label: 'e-Library' },
];

const NavBar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-900 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo/Site Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-white text-xl font-bold tracking-wider">
              Woreda 3 PP
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navLinks.map((link) => {
              // Determine if the link is active based on the current pathname
              const isActive = pathname === link.href || (pathname.startsWith('/posts/') && link.href === '/posts');
              
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150
                    ${isActive 
                      ? 'border-red-500 text-white' 
                      : 'border-transparent text-blue-200 hover:border-blue-500 hover:text-white'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;