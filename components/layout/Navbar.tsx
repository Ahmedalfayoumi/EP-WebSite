import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import type { Language } from '../../types';

const LanguageSwitcher: React.FC = () => {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const { language, setLanguage } = appContext;

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 text-sm font-medium rounded-md ${language === 'en' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'}`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={`px-3 py-1 text-sm font-medium rounded-md ${language === 'ar' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'}`}
      >
        AR
      </button>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const appContext = useContext(AppContext);

  if (!appContext) return null;
  const { language, websiteData } = appContext;
  
  const allLinks = [];

  // 1. Home
  allLinks.push({ to: '/', text: language === 'en' ? 'Home' : 'الرئيسية' });

  // 2. About Us
  const aboutPage = websiteData.pages.find(p => p.slug === 'about-us');
  if (aboutPage) {
    allLinks.push({ to: `/p/${aboutPage.slug}`, text: aboutPage.title[language] });
  }
  
  // 3. Services
  allLinks.push({ to: '/services', text: language === 'en' ? 'Services' : 'خدماتنا' });

  // 4. Contact Us
  const contactPage = websiteData.pages.find(p => p.slug === 'contact-us');
  if (contactPage) {
    allLinks.push({ to: `/p/${contactPage.slug}`, text: contactPage.title[language] });
  }

  // Add any other pages at the end
  const otherPages = websiteData.pages.filter(
    p => p.slug !== 'about-us' && p.slug !== 'contact-us'
  );
  allLinks.push(...otherPages.map(page => ({
    to: `/p/${page.slug}`,
    text: page.title[language]
  })));


  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-primary font-bold' : 'text-foreground hover:text-primary transition-colors';

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              {language === 'en' ? 'Extreme Precision' : 'الدقة القصوى'}
            </Link>
          </div>
          <div className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-10 lg:space-x-12' : 'space-x-4 lg:space-x-8'}`}>
            {allLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.text}
              </NavLink>
            ))}
            <LanguageSwitcher />
            <Link to="/dashboard" className="text-sm text-foreground/70 hover:text-primary">
              {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {allLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'}`} onClick={() => setIsMenuOpen(false)}>
                {link.text}
              </NavLink>
            ))}
            <div className="px-3 pt-4 pb-2">
              <LanguageSwitcher />
            </div>
             <div className="px-3 pt-2 pb-2">
                <Link to="/dashboard" className="block text-sm text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;