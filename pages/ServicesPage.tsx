
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service; language: 'en' | 'ar' }> = ({ service, language }) => {
    return (
        <Link to={`/services/${service.id}`} className="block group">
            <div className="bg-card rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-border transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <img src={service.imageUrl} alt={service.title[language]} className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-primary/80">
                        {service.title[language]}
                    </h3>
                    <p className="text-card-foreground/70 flex-grow">
                        {service.brief[language]}
                    </p>
                </div>
            </div>
        </Link>
    );
};


const ServicesPage: React.FC = () => {
    const appContext = useContext(AppContext);

    if (!appContext) return <div>Loading...</div>;

    const { language, websiteData } = appContext;
    const { services } = websiteData;

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        {language === 'en' ? 'Our Services' : 'خدماتنا'}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
                        {language === 'en' ? 'Comprehensive solutions to meet all your accounting needs.' : 'حلول شاملة لتلبية جميع احتياجاتك المحاسبية.'}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} language={language} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
