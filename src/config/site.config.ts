import type { SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  siteName: "站长工具箱",
  siteUrl: "https://example.com",
  description: "免费在线站长工具集合，提供50+实用工具",
  keywords: ["站长工具", "SEO工具", "在线工具", "开发工具", "编码解码", "格式化工具"],
  favicon: "/favicon.ico",
  logo: "/logo.svg",
  author: "站长工具箱",
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername"
  },
  theme: {
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    defaultMode: "light",
    allowUserToggle: true
  },
  i18n: {
    defaultLocale: "zh",
    supportedLocales: ["zh", "en"],
    autoDetect: true
  },
  analytics: {
    googleAnalyticsId: "",
    enabled: false
  },
  pwa: {
    enabled: true,
    name: "站长工具箱",
    shortName: "工具箱",
    themeColor: "#3b82f6",
    backgroundColor: "#ffffff"
  },
  features: {
    search: true,
    favorites: true,
    recentlyUsed: true,
    shareButtons: true
  }
};

