import React, { useState, FormEvent, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ContactForm: React.FC = () => {
    const appContext = useContext(AppContext);
    
    if (!appContext) return null;
    
    const { language, websiteData } = appContext;
    const recipientEmail = websiteData.content.contact.email;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const subject = encodeURIComponent(language === 'en' ? `Website Inquiry from ${name}` : `استفسار من الموقع من ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        setStatus(language === 'en' ? 'Your message has been prepared in your email client!' : 'تم تجهيز رسالتك في برنامج البريد الإلكتر الإلكتروني الخاص بك!');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{websiteData.content.contact.title[language]}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                        {language === 'en' ? 'Name' : 'الاسم'}
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm placeholder-foreground/50 focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                       {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm placeholder-foreground/50 focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                       {language === 'en' ? 'Message' : 'الرسالة'}
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm placeholder-foreground/50 focus:outline-none focus:ring-ring focus:border-ring sm:text-sm"
                    ></textarea>
                </div>
                <div>
                     <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                    >
                       {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                    </button>
                </div>
                {status && <p className="text-green-600 mt-4 text-center">{status}</p>}
            </form>
        </div>
    );
};

export default ContactForm;