import { Download } from 'lucide-react';
import { Button } from './Button';

interface DownloadButtonProps {
  content: string;
  filename: string;
  mimeType?: string;
  className?: string;
}

export function DownloadButton({ 
  content, 
  filename, 
  mimeType = 'text/plain',
  className = '' 
}: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className={className}
      title="Download file"
    >
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
}

