
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardHomePage: React.FC = () => {
    const authContext = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {authContext?.user?.username}!</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">This is your control panel. From here you can manage your website's content, users, and settings.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Content Management</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Edit the text and images on your Home, About, and Services pages.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">User Management</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Add or remove users and manage their permissions for dashboard access.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Settings</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Customize your website's theme and update your account password.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHomePage;
