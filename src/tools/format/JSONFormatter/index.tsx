import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Textarea } from '@/components/Common/Textarea';
import { Button } from '@/components/Common/Button';
import { CopyButton } from '@/components/Common/CopyButton';
import { ClearButton } from '@/components/Common/ClearButton';
import { formatJSON, compressJSON, validateJSON } from '@/utils/format';
import toast from 'react-hot-toast';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const formatted = formatJSON(input, indent);
      setOutput(formatted);
      setError('');
      toast.success('格式化成功');
    } catch (err) {
      setError('JSON格式错误');
      toast.error('JSON格式错误');
    }
  };

  const handleCompress = () => {
    try {
      const compressed = compressJSON(input);
      setOutput(compressed);
      setError('');
      toast.success('压缩成功');
    } catch (err) {
      setError('JSON格式错误');
      toast.error('JSON格式错误');
    }
  };

  const handleValidate = () => {
    const isValid = validateJSON(input);
    if (isValid) {
      toast.success('JSON格式正确');
      setError('');
    } else {
      toast.error('JSON格式错误');
      setError('JSON格式错误');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Helmet>
        <title>JSON格式化工具 - 在线JSON美化/压缩/验证</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">JSON格式化工具</h1>
        <p className="text-gray-600 dark:text-gray-400">
          在线JSON格式化、压缩和验证
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">输入JSON</h2>
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
            placeholder='{"key": "value"}'
            rows={16}
            error={error}
          />
          <div className="flex items-center gap-2 mt-4">
            <Button onClick={handleFormat} disabled={!input}>
              格式化
            </Button>
            <Button onClick={handleCompress} variant="outline" disabled={!input}>
              压缩
            </Button>
            <Button onClick={handleValidate} variant="outline" disabled={!input}>
              验证
            </Button>
            <ClearButton onClick={() => { setInput(''); setOutput(''); setError(''); }} />
            
            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm">缩进:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value={2}>2空格</option>
                <option value={4}>4空格</option>
                <option value={8}>Tab</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">输出</h2>
            {output && <CopyButton text={output} />}
          </div>
          <div className="code-block min-h-[400px] max-h-[500px] overflow-auto">
            <pre className="text-sm">
              {output || '结果将显示在这里'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

