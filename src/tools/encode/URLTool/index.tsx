import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Textarea } from '@/components/Common/Textarea';
import { Button } from '@/components/Common/Button';
import { CopyButton } from '@/components/Common/CopyButton';
import { ClearButton } from '@/components/Common/ClearButton';
import { encodeURL, decodeURL } from '@/utils/encode';
import toast from 'react-hot-toast';

export default function URLTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    try {
      const result = encodeURL(input);
      setOutput(result);
      toast.success('编码成功');
    } catch (error) {
      toast.error('编码失败');
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURL(input);
      setOutput(result);
      toast.success('解码成功');
    } catch (error) {
      toast.error('解码失败');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Helmet>
        <title>URL编码解码工具 - URL转码工具</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">URL编码/解码</h1>
        <p className="text-gray-600 dark:text-gray-400">
          在线URL编码和解码工具
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={mode === 'encode' ? 'primary' : 'outline'}
          onClick={() => setMode('encode')}
        >
          编码
        </Button>
        <Button
          variant={mode === 'decode' ? 'primary' : 'outline'}
          onClick={() => setMode('decode')}
        >
          解码
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">输入</h2>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的URL' : '输入要解码的URL'}
            rows={8}
          />
          <div className="flex gap-2 mt-4">
            <Button
              onClick={mode === 'encode' ? handleEncode : handleDecode}
              disabled={!input}
            >
              {mode === 'encode' ? '编码' : '解码'}
            </Button>
            <ClearButton onClick={() => { setInput(''); setOutput(''); }} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">输出</h2>
            {output && <CopyButton text={output} />}
          </div>
          <div className="code-block min-h-[192px]">
            <pre className="whitespace-pre-wrap break-all text-sm">
              {output || '结果将显示在这里'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

