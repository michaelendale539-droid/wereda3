import React, { useState, useEffect } from 'react';
import { BookOpen, Users, LayoutDashboard, Flag, Menu, X, Settings } from 'lucide-react';

const navigationItems = [
  { name: 'Overview', key: 'overview', icon: LayoutDashboard },
  { name: 'Users Dashboard', key: 'users', icon: Users },
  { name: 'E-Library', key: 'e-library', icon: BookOpen },
  { name: 'Complaints', key: 'complaints', icon: Flag },
];



const Sidebar = ({ navigationItems, currentPage, handleNavClick, isSidebarOpen, setIsSidebarOpen }) => {
  const sidebarClasses = `fixed inset-y-0 left-0 z-40 transform 
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out 
    w-64 bg-gray-800 flex flex-col shadow-2xl lg:shadow-none`;

  return (
    <div className={sidebarClasses}>
      
      {/* Logo/Title */}
      <div className="p-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-indigo-400 tracking-wider">APP ADMIN</h2>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white focus:outline-none p-1"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item: unknown) => (
          <NavItem
            key={item.key}
            item={item}
            isActive={currentPage === item.key}
            onClick={() => handleNavClick(item.key)}
          />
        ))}
      </nav>
      
      {/* Settings/Logout Placeholder */}
      <div className="p-4 border-t border-gray-700">
        <NavItem
            item={{ name: 'Settings', key: 'settings', icon: Settings }}
            isActive={false}
            onClick={() => console.log('Settings clicked')}
        />
      </div>
    </div>
  );
};
