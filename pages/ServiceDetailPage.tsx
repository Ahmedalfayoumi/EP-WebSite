
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const ServiceDetailPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const appContext = useContext(AppContext);

    if (!appContext) return <div>Loading...</div>;

    const { language, websiteData } = appContext;
    const service = websiteData.services.find(s => s.id === serviceId);

    if (!service) {
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">Service not found.</h1>
                <Link to="/services" className="text-primary hover:underline mt-4 inline-block">
                    &larr; Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link to="/services" className="text-primary hover:underline">
                            &larr; {language === 'en' ? 'Back to Services' : 'العودة إلى الخدمات'}
                        </Link>
                    </div>
                    <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                        <img src={service.imageUrl} alt={service.title[language]} className="w-full h-64 object-cover" />
                        <div className="p-8">
                            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                                {service.title[language]}
                            </h1>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                {service.description[language]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
