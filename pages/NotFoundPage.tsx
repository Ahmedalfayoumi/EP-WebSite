
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-2xl mt-4">Page Not Found</p>
            <p className="text-foreground/70 mt-2">The page you are looking for does not exist.</p>
            <Link 
                to="/" 
                className="mt-8 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
