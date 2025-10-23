
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const HomePage: React.FC = () => {
    const appContext = useContext(AppContext);

    if (!appContext) return <div>Loading...</div>;

    const { language, websiteData } = appContext;
    const { home } = websiteData.content;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-primary">
                    {home.heroTitle[language]}
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
                    {home.heroSubtitle[language]}
                </p>
                <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
                >
                    {home.ctaButton[language]}
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
