import { lazy } from 'react';
import type { ToolMetadata } from '@/types';

// Tool registry - maps tool IDs to their components
export const toolsRegistry: Record<string, ToolMetadata> = {
  // SEO Tools
  'meta-generator': {
    id: 'meta-generator',
    category: 'seo',
    component: lazy(() => import('@/tools/seo/MetaGenerator')),
    defaultEnabled: true,
    order: 1,
  },

  // Format Tools
  'json-formatter': {
    id: 'json-formatter',
    category: 'format',
    component: lazy(() => import('@/tools/format/JSONFormatter')),
    defaultEnabled: true,
    order: 1,
  },

  // Encode Tools
  'base64-tool': {
    id: 'base64-tool',
    category: 'encode',
    component: lazy(() => import('@/tools/encode/Base64Tool')),
    defaultEnabled: true,
    order: 1,
  },
  'url-tool': {
    id: 'url-tool',
    category: 'encode',
    component: lazy(() => import('@/tools/encode/URLTool')),
    defaultEnabled: true,
    order: 2,
  },
  'md5-tool': {
    id: 'md5-tool',
    category: 'encode',
    component: lazy(() => import('@/tools/encode/MD5Tool')),
    defaultEnabled: true,
    order: 3,
  },

  // Time Tools
  'timestamp-converter': {
    id: 'timestamp-converter',
    category: 'time',
    component: lazy(() => import('@/tools/time/TimestampConverter')),
    defaultEnabled: true,
    order: 1,
  },

  // Image Tools
  'qrcode-generator': {
    id: 'qrcode-generator',
    category: 'image',
    component: lazy(() => import('@/tools/image/QRCodeGenerator')),
    defaultEnabled: true,
    order: 1,
  },

  // Color Tools
  'color-converter': {
    id: 'color-converter',
    category: 'color',
    component: lazy(() => import('@/tools/color/ColorConverter')),
    defaultEnabled: true,
    order: 1,
  },

  // Dev Tools
  'uuid-generator': {
    id: 'uuid-generator',
    category: 'dev',
    component: lazy(() => import('@/tools/dev/UUIDGenerator')),
    defaultEnabled: true,
    order: 1,
  },
  'password-generator': {
    id: 'password-generator',
    category: 'dev',
    component: lazy(() => import('@/tools/dev/PasswordGenerator')),
    defaultEnabled: true,
    order: 2,
  },
};

export function getToolById(id: string): ToolMetadata | undefined {
  return toolsRegistry[id];
}

export function getToolsByCategory(category: string): ToolMetadata[] {
  return Object.values(toolsRegistry).filter((tool) => tool.category === category);
}

export function getAllTools(): ToolMetadata[] {
  return Object.values(toolsRegistry);
}

