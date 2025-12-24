import { siteConfig } from '@/config/site.config';
import { 
  getEnabledTools, 
  getFeaturedTools, 
  getToolsByCategory as getToolsByCat,
  getToolById as getToolByIdFromConfig
} from '@/config/tools.config';
import type { Tool } from '@/types/tool';

// Site configuration hook
export function useConfig() {
  return {
    siteConfig,
    loading: false,
    error: null
  };
}

// Get all enabled tools
export function useEnabledTools(): Tool[] {
  return getEnabledTools();
}

// Get featured tools
export function useFeaturedTools(): Tool[] {
  return getFeaturedTools();
}

// Get tools by category
export function useToolsByCategory(categoryId: string): Tool[] {
  return getToolsByCat(categoryId);
}

// Get specific tool config
export function useToolConfig(toolId: string): Tool | undefined {
  return getToolByIdFromConfig(toolId);
}
