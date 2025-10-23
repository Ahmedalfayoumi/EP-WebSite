
import React, { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import type { User, UserPermission } from '../../types';

const UserManagementPage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const openModal = (user: User | null = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            authContext?.deleteUser(userId);
        }
    };
    
    const hasAdminPermission = authContext?.user?.permissions.includes('admin');

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">User Management</h1>
                {hasAdminPermission && (
                    <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add User
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Permissions</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {authContext?.users.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.permissions.join(', ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {hasAdminPermission && (
                                      <>
                                        <button onClick={() => openModal(user)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Edit</button>
                                        {authContext.user?.id !== user.id && (
                                             <button onClick={() => handleDelete(user.id)} className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
                                        )}
                                      </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && <UserModal user={editingUser} onClose={closeModal} />}
        </div>
    );
};


const UserModal: React.FC<{ user: User | null, onClose: () => void }> = ({ user, onClose }) => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState(user?.username || '');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState<UserPermission[]>(user?.permissions || []);
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || (!user && !password)) {
            setError('All fields are required.');
            return;
        }

        if (user) { // Editing existing user
            const updatedUser: User = { ...user, username, permissions };
            authContext?.updateUser(updatedUser);
            if (password) {
              authContext?.updatePassword(user.id, password);
            }
        } else { // Creating new user
            const newUser: User = {
                id: `user-${Date.now()}`,
                username,
                passwordHash: password,
                permissions,
            };
            if (!authContext?.addUser(newUser)) {
                setError('Username already exists.');
                return;
            }
        }
        onClose();
    };
    
    const handlePermissionChange = (permission: UserPermission) => {
        setPermissions(prev => prev.includes(permission) ? prev.filter(p => p !== permission) : [...prev, permission]);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full input-style" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full input-style" placeholder={user ? "Leave blank to keep unchanged" : ""} required={!user} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Permissions</label>
                        <div className="mt-2 space-y-2">
                           <div className="flex items-center">
                                <input id="admin-perm" type="checkbox" checked={permissions.includes('admin')} onChange={() => handlePermissionChange('admin')} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="admin-perm" className="ml-2 block text-sm">Admin (Full access)</label>
                           </div>
                           <div className="flex items-center">
                                <input id="editor-perm" type="checkbox" checked={permissions.includes('editor')} onChange={() => handlePermissionChange('editor')} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="editor-perm" className="ml-2 block text-sm">Editor (Content management only)</label>
                           </div>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                    </div>
                </form>
            </div>
             <style>{`.input-style { background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; } .dark .input-style { background-color: #374151; border-color: #4b5563; }`}</style>
        </div>
    );
};


export default UserManagementPage;
