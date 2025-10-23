import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ContactForm from '../components/ContactForm'; // Import the ContactForm
import FollowUs from '../components/FollowUs';

const CustomPage: React.FC = () => {
    const { pageSlug } = useParams<{ pageSlug: string }>();
    const appContext = useContext(AppContext);

    if (!appContext) return <div>Loading...</div>;

    const { language, websiteData } = appContext;
    const page = websiteData.pages.find(p => p.slug === pageSlug);

    if (!page) {
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">Page not found.</h1>
                <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                    &larr; Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                     <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                        {page.title[language]}
                    </h1>
                    <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: page.content[language] }} />
                        
                        {page.slug === 'contact-us' && (
                            <div className="mt-10 pt-8 border-t border-border">
                                <ContactForm />
                                <div className="mt-12">
                                    <FollowUs headingLevel="h2" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
             {/* Basic prose styles for rendered HTML content */}
            <style>{`
                .prose h1, .prose h2, .prose h3 { font-weight: 700; }
                .prose p { margin-top: 1em; margin-bottom: 1em; }
                .prose a { color: var(--primary); text-decoration: underline; }
            `}</style>
        </div>
    );
};

export default CustomPage;