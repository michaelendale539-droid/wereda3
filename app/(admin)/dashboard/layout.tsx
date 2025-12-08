'use client'; // Must be a client component for state and hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaClipboardList, FaUsers, FaNewspaper, FaBook, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ReactNode, FC, useState } from 'react';
// app/admin/layout.tsx

// Define the structure for the admin sidebar links
interface AdminLink {
  href: string;
  label: string;
  icon: FC<{ className?: string }>; // The icon component
}
// app/admin/layout.tsx

// Define the structure for the admin sidebar links

const adminNavLinks: AdminLink[] = [
  { href: '/dashboard', label: 'Dashboard Overview', icon: FaTachometerAlt },
  { href: '/dashboard/compliance', label: 'Compliance Reports', icon: FaClipboardList },
  { href: '/dashboard/users', label: 'User Management', icon: FaUsers },
  { href: '/dashboard/posts', label: 'Manage Posts', icon: FaNewspaper },
  { href: '/dashboard/elibrary', label: 'Manage eLibrary', icon: FaBook },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  // Dynamic Tailwind Classes
  const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';
  const iconClass = isCollapsed ? 'mx-auto' : 'mr-3';
  const transitionClass = 'transition-all duration-300 ease-in-out';

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* --- Sidebar Navigation --- */}
      <aside 
        className={`${sidebarWidth} ${transitionClass} bg-blue-900 text-white flex flex-col shadow-xl`}
      >
        <div className="p-6 text-xl font-bold border-b border-blue-700 h-16 flex items-center justify-center">
          {isCollapsed ? 'W3' : 'Woreda 3 Admin'}
        </div>
        
        <nav className="flex-grow p-2 space-y-2">
          {adminNavLinks.map(link => {
            const isActive = pathname.startsWith(link.href);
            
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`
                  flex items-center rounded-lg hover:bg-blue-700 transition duration-150 p-3 
                  ${isActive ? 'bg-blue-700 font-semibold' : ''}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? link.label : undefined} // Tooltip when collapsed
              >
                <link.icon className={`w-5 h-5 flex-shrink-0 ${iconClass}`} />
                {/* Text only visible when not collapsed */}
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-blue-700">
          <button 
            className={`flex items-center p-3 w-full rounded-lg text-red-400 hover:bg-blue-700 transition duration-150 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <FaSignOutAlt className={`w-5 h-5 flex-shrink-0 ${iconClass}`} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className={`flex-grow ${transitionClass}`}>
          {/* Collapse Button Header */}
          <header className="h-16 bg-white border-b shadow-sm flex items-center px-6 sticky top-0 z-10">
              <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-full text-blue-800 hover:bg-gray-200 transition duration-150"
                  title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                  {isCollapsed ? <FaChevronRight className="w-5 h-5" /> : <FaChevronLeft className="w-5 h-5" />}
              </button>
              
              <div className="ml-auto text-sm text-gray-600">
                  {/* Placeholder for User Profile/Current Time */}
                  <span className="font-medium">Welcome Back, Admin</span>
              </div>
          </header>

          <main className="p-8">
              {children}
          </main>
      </div>
    </div>
  );
}