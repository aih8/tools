import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/Common/Input';
import { CopyButton } from '@/components/Common/CopyButton';

export default function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    const rgbValue = hexToRgb(newHex);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    }
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>颜色转换工具 - HEX/RGB/HSL互转</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">颜色转换工具</h1>
        <p className="text-gray-600 dark:text-gray-400">
          HEX、RGB、HSL颜色格式互转
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Preview */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">颜色预览</h2>
          <div
            className="w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            style={{ backgroundColor: hex }}
          />
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold font-mono">{hex.toUpperCase()}</p>
          </div>
        </div>

        {/* Color Inputs */}
        <div className="space-y-4">
          {/* HEX */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">HEX</h3>
              <CopyButton text={hex.toUpperCase()} />
            </div>
            <Input
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
            />
          </div>

          {/* RGB */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">RGB</h3>
              <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number"
                value={rgb.r}
                onChange={(e) => handleRgbChange(Number(e.target.value), rgb.g, rgb.b)}
                min={0}
                max={255}
                placeholder="R"
              />
              <Input
                type="number"
                value={rgb.g}
                onChange={(e) => handleRgbChange(rgb.r, Number(e.target.value), rgb.b)}
                min={0}
                max={255}
                placeholder="G"
              />
              <Input
                type="number"
                value={rgb.b}
                onChange={(e) => handleRgbChange(rgb.r, rgb.g, Number(e.target.value))}
                min={0}
                max={255}
                placeholder="B"
              />
            </div>
          </div>

          {/* HSL */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">HSL</h3>
              <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                H: {hsl.h}° | S: {hsl.s}% | L: {hsl.l}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

