import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import FollowUs from '../FollowUs';

const Footer: React.FC = () => {
    const appContext = useContext(AppContext);
    const location = useLocation();
    
    if (!appContext) return null;
    
    const { language, websiteData } = appContext;
    const { contact } = websiteData.content;
    
    const quickLinks = [
        { to: '/services', text: language === 'en' ? 'Services' : 'خدماتنا' },
        ...websiteData.pages.map(page => ({ to: `/p/${page.slug}`, text: page.title[language] }))
    ];

    const isHomePage = location.pathname === '/';

    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className={`grid grid-cols-1 ${isHomePage ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-primary">{language === 'en' ? 'Extreme Precision' : 'الدقة القصوى'}</h3>
                        <p className="mt-2 text-foreground/70">{language === 'en' ? 'Your partner in financial success.' : 'شريكك في النجاح المالي.'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{language === 'en' ? 'Quick Links' : 'روابط سريعة'}</h3>
                        <ul className="mt-2 space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.to}><Link to={link.to} className="text-foreground/70 hover:text-primary">{link.text}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{language === 'en' ? 'Contact Info' : 'معلومات الاتصال'}</h3>
                        <p className="mt-2 text-foreground/70">{contact.address[language]}</p>
                        <p className="text-foreground/70">{contact.email}</p>
                        <p className="text-foreground/70">{contact.phone}</p>
                    </div>
                    {isHomePage && <FollowUs />}
                </div>
                <div className="mt-8 pt-8 border-t border-border/50 text-center text-foreground/50 text-sm">
                    <p>&copy; {new Date().getFullYear()} Extreme Precision. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;