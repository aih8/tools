export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  description: string;
  keywords: string[];
  favicon: string;
  logo: string;
  author?: string;
  social?: {
    github?: string;
    twitter?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor?: string;
    defaultMode: 'light' | 'dark';
    allowUserToggle: boolean;
  };
  i18n: {
    defaultLocale: string;
    supportedLocales: string[];
    autoDetect: boolean;
  };
  analytics: {
    googleAnalyticsId?: string;
    enabled: boolean;
  };
  pwa: {
    enabled: boolean;
    name: string;
    shortName: string;
    themeColor: string;
    backgroundColor: string;
  };
  features: {
    search: boolean;
    favorites: boolean;
    recentlyUsed: boolean;
    shareButtons: boolean;
  };
}

export interface ToolSEO {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}

export interface ToolConfig {
  id: string;
  category: string;
  enabled: boolean;
  featured?: boolean;
  order?: number;
  seo: ToolSEO;
  icon: string;
}

export interface CategoryConfig {
  id: string;
  order: number;
  enabled: boolean;
}

export interface ToolsConfig {
  categories: CategoryConfig[];
  tools: ToolConfig[];
}

