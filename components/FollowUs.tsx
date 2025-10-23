import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const SocialIcon: React.FC<{ type: 'facebook' | 'linkedin' | 'x' | 'instagram' }> = ({ type }) => {
    const icons = {
        facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
        linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>,
        x: <path d="m18 2-4 5-5-5h-2l7 7-7 7h2l4-5 5 5h2l-7-7 7-7z"/>,
        instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>
    };
    return <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">{icons[type]}</svg>;
}

const FollowUs: React.FC<{
    className?: string;
    headingLevel?: 'h2' | 'h3';
}> = ({ className, headingLevel = 'h3' }) => {
    const appContext = useContext(AppContext);
    
    if (!appContext) return null;
    
    const { language, websiteData } = appContext;
    const { socials } = websiteData.content.contact;

    const Heading = headingLevel;
    const headingClass = headingLevel === 'h2' 
        ? "text-2xl font-bold mb-4" 
        : "text-lg font-semibold text-foreground";

    return (
        <div className={className}>
            <Heading className={headingClass}>
                {language === 'en' ? 'Follow Us' : 'تابعنا'}
            </Heading>
            <div className="flex space-x-4 mt-2">
               {socials.facebook && <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary"><SocialIcon type="facebook"/></a>}
               {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary"><SocialIcon type="linkedin"/></a>}
               {socials.x && <a href={socials.x} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary"><SocialIcon type="x"/></a>}
               {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary"><SocialIcon type="instagram"/></a>}
            </div>
        </div>
    );
};

export default FollowUs;
