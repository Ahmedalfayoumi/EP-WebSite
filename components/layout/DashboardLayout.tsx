import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate('/login');
    };
    
    const navLinkClasses = "flex items-center px-4 py-2 text-gray-100 rounded-md hover:bg-gray-700";
    const activeNavLinkClasses = "bg-gray-700";
    
    const sidebarContent = (
        <div className="flex flex-col flex-grow">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white text-2xl font-bold">Dashboard</span>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2">
                <NavLink to="/dashboard" end className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Dashboard</NavLink>
                <NavLink to="/dashboard/content" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Content</NavLink>
                <NavLink to="/dashboard/pages" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Pages</NavLink>
                <NavLink to="/dashboard/users" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Users</NavLink>
                <NavLink to="/dashboard/settings" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Settings</NavLink>
            </nav>
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-30 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
                <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
            </div>

            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                    <span className="text-xl font-bold">Dashboard</span>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
