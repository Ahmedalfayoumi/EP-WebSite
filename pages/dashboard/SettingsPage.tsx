import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AppContext } from '../../contexts/AppContext';
import type { Theme, FontTheme, Appearance } from '../../types';

const SettingsPage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const appContext = useContext(AppContext);
    
    // Password State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Theme State
    const [theme, setTheme] = useState<Theme>(appContext?.websiteData.theme || { primaryColor: '#000000', secondaryColor: '#f0f4f8', cardColor: '#ffffff', font: 'roboto', appearance: 'light'});
    const [themeMessage, setThemeMessage] = useState('');
    
    const handlePasswordSubmit = (e: FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordMessage('');

        if (!authContext?.user) {
            setPasswordError("You are not logged in.");
            return;
        }

        const correctPassword = authContext.user.passwordHash === currentPassword;
        if (!correctPassword) {
            setPasswordError("Incorrect current password.");
            return;
        }

        if (newPassword.length < 4) {
             setPasswordError("New password must be at least 4 characters long.");
             return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }
        
        const success = authContext.updatePassword(authContext.user.id, newPassword);

        if (success) {
            setPasswordMessage("Password updated successfully!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setPasswordMessage(''), 3000);
        } else {
            setPasswordError("Failed to update password. Please try again.");
        }
    };
    
    const handleThemeChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTheme(prev => ({ ...prev, [name]: value }));
    }

    const handleThemeSubmit = (e: FormEvent) => {
        e.preventDefault();
        appContext?.setWebsiteData(prev => ({ ...prev, theme }));
        setThemeMessage("Theme updated successfully!");
        setTimeout(() => setThemeMessage(''), 3000);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Theme Customization */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Theme Customization</h2>
                    <form onSubmit={handleThemeSubmit} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium">Primary Color</label>
                            <input type="color" name="primaryColor" value={theme.primaryColor} onChange={handleThemeChange} className="p-1 h-10 w-16 block bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"/>
                        </div>
                         <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium">Secondary/Background Color</label>
                            <input type="color" name="secondaryColor" value={theme.secondaryColor} onChange={handleThemeChange} className="p-1 h-10 w-16 block bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"/>
                        </div>
                         <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium">Card/Panel Color</label>
                            <input type="color" name="cardColor" value={theme.cardColor} onChange={handleThemeChange} className="p-1 h-10 w-16 block bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Font</label>
                            <select name="font" value={theme.font} onChange={handleThemeChange} className="mt-1 block w-full input-style">
                                <option value="roboto">Roboto & Tajawal (Modern)</option>
                                <option value="lato">Lato & Noto Sans Arabic (Elegant)</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Appearance</label>
                            <select name="appearance" value={theme.appearance} onChange={handleThemeChange} className="mt-1 block w-full input-style">
                                <option value="light">Light Mode</option>
                                <option value="dark">Dark Mode</option>
                            </select>
                        </div>
                        {themeMessage && <p className="text-green-500 text-sm">{themeMessage}</p>}
                        <div className="flex justify-end pt-2">
                             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Save Theme
                            </button>
                        </div>
                    </form>
                </div>
                {/* Change Password */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="mt-1 block w-full input-style"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="mt-1 block w-full input-style"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full input-style"
                            />
                        </div>
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        {passwordMessage && <p className="text-green-500 text-sm">{passwordMessage}</p>}
                        <div className="flex justify-end pt-2">
                             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <style>{`.input-style { background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; width: 100%; } .dark .input-style { background-color: #374151; border-color: #4b5563; color: white; }`}</style>
        </div>
    );
};

export default SettingsPage;