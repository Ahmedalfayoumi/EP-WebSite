import React, { useContext, useState, FormEvent, ChangeEvent } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import type { WebsiteContent, Language, Service, Socials } from '../../types';

const ContentManagementPage: React.FC = () => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('home');

    const hasEditPermission = authContext?.user?.permissions.includes('admin') || authContext?.user?.permissions.includes('editor');

    if (!appContext || !hasEditPermission) {
        return <div>You do not have permission to view this page.</div>;
    }

    const { websiteData, setWebsiteData } = appContext;
    const [content, setContent] = useState<WebsiteContent>(websiteData.content);
    const [services, setServices] = useState<Service[]>(websiteData.services);
    const [message, setMessage] = useState('');

    const handleContentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, field, lang] = name.split('.') as [keyof WebsiteContent, string, Language];

        setContent(prev => {
            const newSection = { ...prev[section] };
            if (lang) {
                (newSection as any)[field][lang] = value;
            } else {
                (newSection as any)[field] = value;
            }
            return { ...prev, [section]: newSection };
        });
    };
    
    const handleSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const socialField = name.split('.')[2] as keyof Socials;
        
        setContent(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                socials: {
                    ...prev.contact.socials,
                    [socialField]: value
                }
            }
        }));
    }
    
    const handleServiceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, serviceId: string) => {
        const { name, value } = e.target;
        const [field, lang] = name.split('.') as [keyof Omit<Service, 'id' | 'imageUrl'>, Language];
        
        setServices(prevServices => prevServices.map(service => {
            if (service.id === serviceId) {
                const updatedService = {...service};
                if (typeof updatedService[field] === 'object') {
                    (updatedService[field] as any)[lang] = value;
                }
                return updatedService;
            }
            return service;
        }));
    };

    const handleServiceImageChange = (e: ChangeEvent<HTMLInputElement>, serviceId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setServices(prevServices => prevServices.map(service => {
                    if (service.id === serviceId) {
                        return { ...service, imageUrl: reader.result as string };
                    }
                    return service;
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAddService = () => {
        const newService: Service = {
            id: `service-${Date.now()}`,
            title: { en: 'New Service', ar: 'خدمة جديدة' },
            brief: { en: 'Brief description here.', ar: 'وصف موجز هنا.' },
            description: { en: 'Full description here.', ar: 'الوصف الكامل هنا.' },
            imageUrl: 'https://placehold.co/600x400/cccccc/ffffff?text=Upload+Image',
        };
        setServices(prev => [...prev, newService]);
    };

    const handleDeleteService = (serviceId: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(prev => prev.filter(s => s.id !== serviceId));
        }
    };


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setWebsiteData(prev => ({
            ...prev,
            content,
            services,
        }));
        setMessage('Content updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const renderHomeForm = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6">Home Page Hero Section</h3>
             {Object.keys(content.home).map(field => (
                <div key={field}>
                    <label className="block text-sm font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                        <input name={`home.${field}.en`} value={content.home[field as keyof typeof content.home].en} onChange={handleContentChange} className="input-style" placeholder="English"/>
                        <input name={`home.${field}.ar`} value={content.home[field as keyof typeof content.home].ar} onChange={handleContentChange} className="input-style" placeholder="Arabic" dir="rtl" />
                    </div>
                </div>
            ))}
        </div>
    );
    
    const renderContactForm = () => (
         <div className="space-y-6">
            <h3 className="text-lg font-medium leading-6">Contact & Social Media</h3>
            <div>
                <label className="block text-sm font-medium">Title</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                    <input name="contact.title.en" value={content.contact.title.en} onChange={handleContentChange} className="input-style" placeholder="English"/>
                    <input name="contact.title.ar" value={content.contact.title.ar} onChange={handleContentChange} className="input-style" placeholder="Arabic" dir="rtl" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium">Address</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                    <input name="contact.address.en" value={content.contact.address.en} onChange={handleContentChange} className="input-style" placeholder="English"/>
                    <input name="contact.address.ar" value={content.contact.address.ar} onChange={handleContentChange} className="input-style" placeholder="Arabic" dir="rtl" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium">Email</label>
                <input name="contact.email" value={content.contact.email} onChange={handleContentChange} className="input-style mt-1" />
            </div>
             <div>
                <label className="block text-sm font-medium">Phone</label>
                <input name="contact.phone" value={content.contact.phone} onChange={handleContentChange} className="input-style mt-1" />
            </div>
            
            <h4 className="text-md font-medium leading-6 pt-4 border-t border-gray-200 dark:border-gray-700">Social Media Links</h4>
             {Object.keys(content.contact.socials).map(social => (
                 <div key={social}>
                    <label className="block text-sm font-medium capitalize">{social}</label>
                    <input name={`contact.socials.${social}`} value={content.contact.socials[social as keyof Socials]} onChange={handleSocialChange} className="input-style mt-1" placeholder={`https://${social}.com/...`}/>
                </div>
             ))}
        </div>
    );

    const renderServicesForm = () => (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6">Services</h3>
                 <button type="button" onClick={handleAddService} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-sm">
                    Add Service
                </button>
            </div>
            {services.map(service => (
                <div key={service.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md relative">
                     <button type="button" onClick={() => handleDeleteService(service.id)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
                        Delete
                    </button>
                    <h4 className="font-semibold mb-4">{service.title.en} / {service.title.ar}</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Title</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                                <input name={`title.en`} value={service.title.en} onChange={(e) => handleServiceChange(e, service.id)} className="input-style" placeholder="English"/>
                                <input name={`title.ar`} value={service.title.ar} onChange={(e) => handleServiceChange(e, service.id)} className="input-style" placeholder="Arabic" dir="rtl"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Brief Description</label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                                <textarea name={`brief.en`} rows={2} value={service.brief.en} onChange={(e) => handleServiceChange(e, service.id)} className="input-style" placeholder="English"/>
                                <textarea name={`brief.ar`} rows={2} value={service.brief.ar} onChange={(e) => handleServiceChange(e, service.id)} className="input-style" placeholder="Arabic" dir="rtl"/>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Full Description</label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                                <textarea name={`description.en`} rows={4} value={service.description.en} onChange={(e) => handleServiceChange(e, service.id)} className="input-style" placeholder="English"/>
                                <textarea name={`description.ar`} rows={4} value={service.description.ar} onChange={(e) => handleServiceChange(e, service.id)} className="input-style" placeholder="Arabic" dir="rtl"/>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Service Image</label>
                            <div className="mt-2 flex items-center gap-4">
                               <img src={service.imageUrl} alt="preview" className="w-32 h-20 object-cover rounded-md bg-gray-200"/>
                               <input type="file" accept="image/*" onChange={(e) => handleServiceImageChange(e, service.id)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Content Management</h1>

            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Home Page</button>
                    <button onClick={() => setActiveTab('contact')} className={`${activeTab === 'contact' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Contact Info</button>
                    <button onClick={() => setActiveTab('services')} className={`${activeTab === 'services' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Services</button>
                </nav>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                   {activeTab === 'home' && renderHomeForm()}
                   {activeTab === 'contact' && renderContactForm()}
                   {activeTab === 'services' && renderServicesForm()}
                </div>

                <div className="mt-6 flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save Changes
                    </button>
                </div>
                {message && <p className="text-green-500 text-sm mt-4 text-right">{message}</p>}
            </form>
             <style>{`.input-style { background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; width: 100%; } .dark .input-style { background-color: #374151; border-color: #4b5563; color: white; }`}</style>
        </div>
    );
};

export default ContentManagementPage;