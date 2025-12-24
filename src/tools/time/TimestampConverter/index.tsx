import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/Common/Input';
import { Button } from '@/components/Common/Button';
import { formatDate } from '@/utils/format';
import { Calendar } from 'lucide-react';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState(Date.now().toString());
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));

  const timestampToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return '';
    
    const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
    return formatDate(date);
  };

  const dateToTimestamp = () => {
    const date = new Date(dateTime);
    return Math.floor(date.getTime() / 1000);
  };

  const handleNow = () => {
    const now = Date.now();
    setTimestamp(now.toString());
    setDateTime(new Date(now).toISOString().slice(0, 16));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Unix时间戳转换 - 时间戳转日期</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Unix时间戳转换</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Unix时间戳与日期时间互转
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Time */}
        <div className="card p-6 bg-primary-50 dark:bg-primary-950/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">当前时间戳</p>
              <p className="text-2xl font-mono font-bold">{Math.floor(Date.now() / 1000)}</p>
            </div>
            <Button onClick={handleNow} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              使用当前时间
            </Button>
          </div>
        </div>

        {/* Timestamp to Date */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">时间戳转日期</h2>
          <Input
            label="时间戳 (秒或毫秒)"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="输入Unix时间戳"
          />
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">转换结果</p>
            <p className="text-lg font-semibold">{timestampToDate() || '请输入有效的时间戳'}</p>
          </div>
        </div>

        {/* Date to Timestamp */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">日期转时间戳</h2>
          <Input
            label="日期时间"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">转换结果（秒）</p>
            <p className="text-lg font-mono font-semibold">{dateToTimestamp()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1">转换结果（毫秒）</p>
            <p className="text-lg font-mono font-semibold">{dateToTimestamp() * 1000}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

