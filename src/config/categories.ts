import type { Category } from '@/types';
import { getEnabledCategories as getEnabledCategoriesFromConfig } from '@/config/tools.config';

export const categories: Category[] = [
  { id: 'seo', nameKey: 'categories.seo', icon: 'search', order: 1, enabled: true },
  { id: 'encode', nameKey: 'categories.encode', icon: 'binary', order: 2, enabled: true },
  { id: 'format', nameKey: 'categories.format', icon: 'code', order: 3, enabled: true },
  { id: 'image', nameKey: 'categories.image', icon: 'image', order: 4, enabled: true },
  { id: 'text', nameKey: 'categories.text', icon: 'file-text', order: 5, enabled: true },
  { id: 'time', nameKey: 'categories.time', icon: 'clock', order: 6, enabled: true },
  { id: 'color', nameKey: 'categories.color', icon: 'palette', order: 7, enabled: true },
  { id: 'dev', nameKey: 'categories.dev', icon: 'code-2', order: 8, enabled: true },
  { id: 'network', nameKey: 'categories.network', icon: 'network', order: 9, enabled: true },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getEnabledCategories(): Category[] {
  const enabledCategoryIds = new Set(
    getEnabledCategoriesFromConfig().map(cat => cat.id)
  );
  
  return categories
    .filter((cat) => cat.enabled && enabledCategoryIds.has(cat.id))
    .sort((a, b) => a.order - b.order);
}


