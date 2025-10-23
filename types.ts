export type Language = 'en' | 'ar';

export interface TranslatedString {
  en: string;
  ar: string;
}

export interface Service {
  id: string;
  title: TranslatedString;
  brief: TranslatedString;
  description: TranslatedString;
  imageUrl: string;
}

export interface HomePageContent {
  heroTitle: TranslatedString;
  heroSubtitle: TranslatedString;
  ctaButton: TranslatedString;
}

export interface Socials {
  facebook: string;
  linkedin: string;
  x: string;
  instagram: string;
}

export interface ContactContent {
  title: TranslatedString;
  address: TranslatedString;
  email: string;
  phone: string;
  socials: Socials;
}

export interface WebsiteContent {
  home: HomePageContent;
  contact: ContactContent;
}

export interface Page {
  id: string;
  slug: string;
  title: TranslatedString;
  content: TranslatedString;
}

export type FontTheme = 'roboto' | 'lato';
export type Appearance = 'light' | 'dark';

export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    cardColor: string;
    font: FontTheme;
    appearance: Appearance;
}

export interface WebsiteData {
  content: WebsiteContent;
  services: Service[];
  pages: Page[];
  theme: Theme;
}

export type UserPermission = 'admin' | 'editor';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  permissions: UserPermission[];
}