import type { Tool } from '@/types/tool';

export interface ToolsConfig {
  categories: Array<{
    id: string;
    order: number;
    enabled: boolean;
  }>;
  tools: Tool[];
}

export const toolsConfig: ToolsConfig = {
  categories: [
    { id: "seo", order: 1, enabled: true },
    { id: "encode", order: 2, enabled: true },
    { id: "format", order: 3, enabled: true },
    { id: "image", order: 4, enabled: true },
    { id: "text", order: 5, enabled: true },
    { id: "time", order: 6, enabled: true },
    { id: "color", order: 7, enabled: true },
    { id: "dev", order: 8, enabled: true },
    { id: "network", order: 9, enabled: true }
  ],
  tools: [
    {
      id: "meta-generator",
      category: "seo",
      enabled: true,
      featured: true,
      order: 1,
      seo: {
        title: "Meta标签生成器 - SEO优化工具",
        description: "在线生成网页Meta标签，包括标题、描述、关键词，优化网站SEO",
        keywords: ["meta标签", "SEO", "标题优化", "网页优化"],
        path: "/tools/seo/meta-generator"
      },
      icon: "tag"
    },
    {
      id: "json-formatter",
      category: "format",
      enabled: true,
      featured: true,
      order: 1,
      seo: {
        title: "JSON格式化工具 - 在线JSON美化/压缩/验证",
        description: "在线JSON格式化、压缩、验证工具，支持树形展示和语法高亮",
        keywords: ["JSON", "格式化", "压缩", "验证", "美化"],
        path: "/tools/format/json-formatter"
      },
      icon: "code"
    },
    {
      id: "base64-tool",
      category: "encode",
      enabled: true,
      featured: true,
      order: 1,
      seo: {
        title: "Base64编码解码工具 - 在线Base64转换",
        description: "在线Base64编码解码工具，支持文本和文件的Base64转换",
        keywords: ["Base64", "编码", "解码", "转换"],
        path: "/tools/encode/base64-tool"
      },
      icon: "binary"
    },
    {
      id: "url-tool",
      category: "encode",
      enabled: true,
      featured: false,
      order: 2,
      seo: {
        title: "URL编码解码工具 - URL转码工具",
        description: "在线URL编码解码工具，快速进行URL转码和解码",
        keywords: ["URL", "编码", "解码", "URL转码"],
        path: "/tools/encode/url-tool"
      },
      icon: "link"
    },
    {
      id: "md5-tool",
      category: "encode",
      enabled: true,
      featured: false,
      order: 3,
      seo: {
        title: "MD5加密工具 - 在线MD5生成器",
        description: "在线MD5加密工具，快速生成MD5哈希值",
        keywords: ["MD5", "加密", "哈希", "MD5生成器"],
        path: "/tools/encode/md5-tool"
      },
      icon: "hash"
    },
    {
      id: "timestamp-converter",
      category: "time",
      enabled: true,
      featured: false,
      order: 1,
      seo: {
        title: "Unix时间戳转换 - 时间戳转日期",
        description: "在线Unix时间戳转换工具，时间戳与日期格式互转",
        keywords: ["时间戳", "Unix", "日期转换", "时间转换"],
        path: "/tools/time/timestamp-converter"
      },
      icon: "clock"
    },
    {
      id: "qrcode-generator",
      category: "image",
      enabled: true,
      featured: true,
      order: 1,
      seo: {
        title: "二维码生成器 - 在线生成QR码",
        description: "在线二维码生成工具，支持文本、URL等多种内容生成二维码",
        keywords: ["二维码", "QR码", "二维码生成", "QR生成器"],
        path: "/tools/image/qrcode-generator"
      },
      icon: "qr-code"
    },
    {
      id: "color-converter",
      category: "color",
      enabled: true,
      featured: false,
      order: 1,
      seo: {
        title: "颜色转换工具 - HEX/RGB/HSL互转",
        description: "在线颜色转换工具，支持HEX、RGB、HSL等多种颜色格式互转",
        keywords: ["颜色转换", "HEX", "RGB", "HSL", "颜色格式"],
        path: "/tools/color/color-converter"
      },
      icon: "palette"
    },
    {
      id: "uuid-generator",
      category: "dev",
      enabled: true,
      featured: false,
      order: 1,
      seo: {
        title: "UUID生成器 - 在线生成唯一ID",
        description: "在线UUID/GUID生成工具，快速生成唯一标识符",
        keywords: ["UUID", "GUID", "唯一ID", "ID生成器"],
        path: "/tools/dev/uuid-generator"
      },
      icon: "fingerprint"
    },
    {
      id: "password-generator",
      category: "dev",
      enabled: true,
      featured: true,
      order: 2,
      seo: {
        title: "密码生成器 - 随机强密码生成",
        description: "在线随机密码生成工具，生成安全的强密码",
        keywords: ["密码生成器", "随机密码", "强密码", "密码工具"],
        path: "/tools/dev/password-generator"
      },
      icon: "key"
    }
  ]
};

// Helper functions to get enabled tools/categories
export function getEnabledTools(): Tool[] {
  return toolsConfig.tools.filter(tool => tool.enabled);
}

export function getFeaturedTools(): Tool[] {
  return toolsConfig.tools.filter(tool => tool.enabled && tool.featured);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return toolsConfig.tools.filter(
    tool => tool.enabled && tool.category === categoryId
  );
}

export function getToolById(toolId: string): Tool | undefined {
  return toolsConfig.tools.find(tool => tool.id === toolId);
}

export function getEnabledCategories() {
  return toolsConfig.categories.filter(cat => cat.enabled);
}

