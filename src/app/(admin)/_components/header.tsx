const Header = ({ currentPageName, setIsSidebarOpen }) => (
    <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center p-4 md:p-6">
            
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-indigo-600 hover:text-indigo-800 focus:outline-none transition"
                aria-label="Open menu"
            >
                <Menu className="h-6 w-6" />
            </button>
            
            {/* Current Page Title */}
            <h1 className="text-xl md:text-3xl font-extrabold text-gray-800">
                {currentPageName}
            </h1>

            {/* User Profile Placeholder */}
            <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 hidden sm:inline">Administrator</span>
                <div className="h-10 w-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    A
                </div>
            </div>
        </div>
    </header>
);
