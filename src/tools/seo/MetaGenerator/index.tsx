import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Textarea';
import { Button } from '@/components/Common/Button';
import { CopyButton } from '@/components/Common/CopyButton';
import { ClearButton } from '@/components/Common/ClearButton';

export default function MetaGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [robots, setRobots] = useState('index, follow');

  const generateMetaTags = () => {
    const tags = [];
    if (title) tags.push(`<title>${title}</title>`);
    if (description) tags.push(`<meta name="description" content="${description}" />`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}" />`);
    if (author) tags.push(`<meta name="author" content="${author}" />`);
    if (robots) tags.push(`<meta name="robots" content="${robots}" />`);
    
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
    tags.push(`<meta charset="UTF-8" />`);
    
    return tags.join('\n');
  };

  const clearAll = () => {
    setTitle('');
    setDescription('');
    setKeywords('');
    setAuthor('');
    setRobots('index, follow');
  };

  const metaTags = generateMetaTags();

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Meta标签生成器 - SEO优化工具</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Meta标签生成器</h1>
        <p className="text-gray-600 dark:text-gray-400">
          生成网页的Meta标签，优化SEO
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">输入信息</h2>
            
            <div className="space-y-4">
              <Input
                label="网页标题 (Title)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="输入网页标题，建议50-60个字符"
                maxLength={60}
              />
              <div className="text-xs text-gray-500">{title.length}/60</div>

              <Textarea
                label="网页描述 (Description)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="输入网页描述，建议150-160个字符"
                maxLength={160}
                rows={3}
              />
              <div className="text-xs text-gray-500">{description.length}/160</div>

              <Input
                label="关键词 (Keywords)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="关键词1, 关键词2, 关键词3"
              />

              <Input
                label="作者 (Author)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="输入作者名称"
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  爬虫规则 (Robots)
                </label>
                <select
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                  className="input"
                >
                  <option value="index, follow">index, follow (允许索引和跟踪链接)</option>
                  <option value="noindex, follow">noindex, follow (不允许索引，但跟踪链接)</option>
                  <option value="index, nofollow">index, nofollow (允许索引，不跟踪链接)</option>
                  <option value="noindex, nofollow">noindex, nofollow (不允许索引和跟踪)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <ClearButton onClick={clearAll} />
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">生成的Meta标签</h2>
              <CopyButton text={metaTags} />
            </div>

            <div className="code-block">
              <pre className="text-sm">{metaTags || '请填写左侧信息以生成Meta标签'}</pre>
            </div>
          </div>

          {/* SEO Tips */}
          <div className="card p-6 bg-blue-50 dark:bg-blue-950/30">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">💡 SEO优化建议</h3>
            <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
              <li>• 标题应包含主要关键词，控制在50-60个字符</li>
              <li>• 描述应准确描述页面内容，150-160个字符最佳</li>
              <li>• 关键词不要过多，3-5个相关关键词即可</li>
              <li>• 确保每个页面的Meta标签都是唯一的</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

