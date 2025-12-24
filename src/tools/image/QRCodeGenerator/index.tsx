import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/Common/Input';
import { Textarea } from '@/components/Common/Textarea';
import { Button } from '@/components/Common/Button';
import { DownloadButton } from '@/components/Common/DownloadButton';
import QRCode from 'qrcode';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [size, setSize] = useState(256);

  useEffect(() => {
    if (text) {
      generateQRCode();
    } else {
      setQrCodeUrl('');
    }
  }, [text, size]);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>二维码生成器 - 在线生成QR码</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">二维码生成器</h1>
        <p className="text-gray-600 dark:text-gray-400">
          在线生成二维码图片
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">输入内容</h2>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文本、URL或其他内容"
            rows={6}
          />
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              二维码尺寸
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="128"
                max="512"
                step="64"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-mono">{size}px</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">💡 使用提示</h3>
            <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
              <li>• 支持文本、URL、电话号码等</li>
              <li>• 可调整二维码大小</li>
              <li>• 生成后可直接下载使用</li>
            </ul>
          </div>
        </div>

        {/* Output */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">预览</h2>
            {qrCodeUrl && (
              <Button onClick={handleDownload} size="sm">
                下载
              </Button>
            )}
          </div>
          
          <div className="flex items-center justify-center min-h-[300px] bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="max-w-full"
                style={{ width: size, height: size }}
              />
            ) : (
              <p className="text-gray-400">二维码预览将显示在这里</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

