
import React, { useContext, useEffect } from 'react';
// Using HashRouter is crucial for simple deployment on static hosting services
// like GitHub Pages. It uses the URL hash (#) to manage routes client-side,
// preventing the server from receiving requests for paths it doesn't know
// about (e.g., /services), which would otherwise result in a 404 error.
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Main Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CustomPage from './pages/CustomPage';

// Auth Pages
import LoginPage from './pages/LoginPage';

// Dashboard Pages
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import ContentManagementPage from './pages/dashboard/ContentManagementPage';
import UserManagementPage from './pages/dashboard/UserManagementPage';
import PageManagementPage from './pages/dashboard/PageManagementPage';
import SettingsPage from './pages/dashboard/SettingsPage';


// Other
import NotFoundPage from './pages/NotFoundPage';
import { AuthContext } from './contexts/AuthContext';
import { AppContext } from './contexts/AppContext';

// Helper to convert hex to HSL
const hexToHSL = (hex: string): string => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
};

const PrivateRoute: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <Navigate to="/login" replace />; // Or a loading indicator
    }
    return authContext.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    const appContext = useContext(AppContext);
    
    useEffect(() => {
        if (appContext?.websiteData?.theme) {
            const { primaryColor, secondaryColor, cardColor, appearance } = appContext.websiteData.theme;
            const root = document.documentElement;
            
            // Set colors
            root.style.setProperty('--primary', hexToHSL(primaryColor));
            root.style.setProperty('--secondary-color', hexToHSL(secondaryColor));
            root.style.setProperty('--card-color', hexToHSL(cardColor));
            
            // Set appearance
            if (appearance === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [appContext?.websiteData?.theme]);

    useEffect(() => {
        if (appContext) {
            const { font } = appContext.websiteData.theme;
            const { language } = appContext;
            document.body.className = `font-${font}`;
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = language;
        }
    }, [appContext?.websiteData?.theme.font, appContext?.language]);


  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="p/:pageSlug" element={<CustomPage />} />
        </Route>
        
        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Routes (Protected) */}
        <Route path="/dashboard" element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
                <Route index element={<DashboardHomePage />} />
                <Route path="content" element={<ContentManagementPage />} />
                <Route path="users" element={<UserManagementPage />} />
                <Route path="pages" element={<PageManagementPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Route>
        
        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
