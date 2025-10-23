import React, { useContext, useState, FormEvent, ChangeEvent } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import type { Page, Language } from '../../types';

const PageManagementPage: React.FC = () => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    const openModal = (page: Page | null = null) => {
        setEditingPage(page);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPage(null);
    };

    const handleDelete = (pageId: string) => {
        if (window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
            appContext?.setWebsiteData(prev => ({
                ...prev,
                pages: prev.pages.filter(p => p.id !== pageId)
            }));
        }
    };
    
    const hasAdminPermission = authContext?.user?.permissions.includes('admin');
    const hasEditPermission = hasAdminPermission || authContext?.user?.permissions.includes('editor');

    if (!appContext) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Page Management</h1>
                {hasEditPermission && (
                    <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add New Page
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Page Title (EN)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Path</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {appContext.websiteData.pages.map(page => (
                            <tr key={page.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{page.title.en}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">/p/{page.slug}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {hasEditPermission && (
                                      <>
                                        <button onClick={() => openModal(page)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Edit</button>
                                        {hasAdminPermission && (
                                            <button onClick={() => handleDelete(page.id)} className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</button>
                                        )}
                                      </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && <PageModal page={editingPage} onClose={closeModal} />}
        </div>
    );
};


const PageModal: React.FC<{ page: Page | null, onClose: () => void }> = ({ page, onClose }) => {
    const appContext = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: page?.title || { en: '', ar: ''},
        content: page?.content || { en: '', ar: ''},
    });

    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (page) { // Editing existing page
             appContext?.setWebsiteData(prev => ({
                ...prev,
                pages: prev.pages.map(p => p.id === page.id ? { ...p, ...formData } : p)
             }));
        } else { // Creating new page
            const newPage: Page = {
                id: `page-${Date.now()}`,
                slug: slugify(formData.title.en),
                ...formData
            };
            appContext?.setWebsiteData(prev => ({
                ...prev,
                pages: [...prev.pages, newPage]
            }));
        }
        onClose();
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.') as ['title' | 'content', Language];
        setFormData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [lang]: value
            }
        }));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{page ? 'Edit Page' : 'Add New Page'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title (English)</label>
                        <input name="title.en" type="text" value={formData.title.en} onChange={handleChange} className="mt-1 block w-full input-style" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Title (Arabic)</label>
                        <input name="title.ar" type="text" value={formData.title.ar} onChange={handleChange} className="mt-1 block w-full input-style" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Content (English) - HTML supported</label>
                        <textarea name="content.en" value={formData.content.en} onChange={handleChange} rows={8} className="mt-1 block w-full input-style font-mono" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Content (Arabic) - HTML supported</label>
                        <textarea name="content.ar" value={formData.content.ar} onChange={handleChange} rows={8} className="mt-1 block w-full input-style font-mono" dir="rtl" />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Page</button>
                    </div>
                </form>
            </div>
             <style>{`.input-style { background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; } .dark .input-style { background-color: #374151; border-color: #4b5563; }`}</style>
        </div>
    );
};


export default PageManagementPage;
