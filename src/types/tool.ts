import type { LazyExoticComponent, ComponentType } from 'react';

export interface ToolMetadata {
  id: string;
  category: string;
  component: LazyExoticComponent<ComponentType<any>>;
  defaultEnabled: boolean;
  order?: number;
}

export interface Tool {
  id: string;
  category: string;
  enabled: boolean;
  featured: boolean;
  icon: string;
  order: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    path: string;
  };
}

export interface Category {
  id: string;
  nameKey: string;
  icon: string;
  order: number;
  enabled: boolean;
}

