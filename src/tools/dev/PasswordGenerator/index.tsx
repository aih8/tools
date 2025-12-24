import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/Common/Button';
import { CopyButton } from '@/components/Common/CopyButton';
import { RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      charset = 'abcdefghijklmnopqrstuvwxyz';
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { label: '弱', color: 'text-red-500' };
    if (strength <= 3) return { label: '中', color: 'text-yellow-500' };
    if (strength <= 4) return { label: '强', color: 'text-green-500' };
    return { label: '极强', color: 'text-blue-500' };
  };

  const strength = password ? getPasswordStrength(password) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>密码生成器 - 随机强密码生成</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">密码生成器</h1>
        <p className="text-gray-600 dark:text-gray-400">
          生成安全的随机密码
        </p>
      </div>

      <div className="space-y-6">
        {/* Settings */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">密码设置</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                密码长度: {length}
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>包含大写字母 (A-Z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>包含小写字母 (a-z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>包含数字 (0-9)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>包含符号 (!@#$...)</span>
              </label>
            </div>

            <Button onClick={generatePassword} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              生成密码
            </Button>
          </div>
        </div>

        {/* Generated Password */}
        {password && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">生成的密码</h2>
              <CopyButton text={password} />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <code className="text-2xl font-mono break-all">{password}</code>
            </div>

            {strength && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  密码强度:
                </p>
                <p className={`text-lg font-semibold ${strength.color}`}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="card p-6 bg-yellow-50 dark:bg-yellow-950/30">
          <h3 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-100">🔒 安全提示</h3>
          <ul className="text-sm space-y-1 text-yellow-800 dark:text-yellow-200">
            <li>• 建议使用至少12位字符的密码</li>
            <li>• 包含大小写字母、数字和符号</li>
            <li>• 不要在多个网站使用相同密码</li>
            <li>• 定期更换密码以提高安全性</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

