import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Textarea } from '@/components/Common/Textarea';
import { Button } from '@/components/Common/Button';
import { CopyButton } from '@/components/Common/CopyButton';
import * as md5Module from 'js-md5';
import toast from 'react-hot-toast';

const md5 = (md5Module as any).default || md5Module;

export default function MD5Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    try {
      const hash = md5(input);
      setOutput(hash);
      toast.success('MD5生成成功');
    } catch (error) {
      toast.error('生成失败');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>MD5加密工具 - 在线MD5生成器</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MD5加密</h1>
        <p className="text-gray-600 dark:text-gray-400">
          在线生成MD5哈希值
        </p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">输入文本</h2>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要加密的文本"
            rows={6}
          />
          <Button
            onClick={handleGenerate}
            disabled={!input}
            className="mt-4"
          >
            生成MD5
          </Button>
        </div>

        {output && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">MD5哈希值</h2>
              <CopyButton text={output} />
            </div>
            <div className="code-block">
              <pre className="text-sm font-mono">{output}</pre>
            </div>
          </div>
        )}

        <div className="card p-6 bg-yellow-50 dark:bg-yellow-950/30">
          <h3 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-100">⚠️ 安全提示</h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            MD5已被证明不够安全，不建议用于密码加密等安全场景。建议使用SHA-256或更安全的算法。
          </p>
        </div>
      </div>
    </div>
  );
}

