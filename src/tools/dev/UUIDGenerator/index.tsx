import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/Common/Button';
import { CopyButton } from '@/components/Common/CopyButton';
import { RefreshCw } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>UUID生成器 - 在线生成唯一ID</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UUID生成器</h1>
        <p className="text-gray-600 dark:text-gray-400">
          生成唯一标识符 (UUID v4)
        </p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium">生成数量:</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg"
            >
              {[1, 5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <Button onClick={handleGenerate}>
              <RefreshCw className="w-4 h-4 mr-2" />
              生成UUID
            </Button>
          </div>

          {uuids.length > 0 && (
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <code className="font-mono text-sm">{uuid}</code>
                  <CopyButton text={uuid} />
                </div>
              ))}
            </div>
          )}

          {uuids.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              点击"生成UUID"按钮来生成唯一标识符
            </div>
          )}
        </div>

        <div className="card p-6 bg-blue-50 dark:bg-blue-950/30">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">ℹ️ 关于UUID</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            UUID (Universally Unique Identifier) 是一种标准化的唯一标识符格式。
            本工具生成的是UUID v4版本，基于随机数生成，碰撞概率极低。
          </p>
        </div>
      </div>
    </div>
  );
}

