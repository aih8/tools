import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      toast.error('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success('Copied to clipboard!');
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy');
      setCopiedText(null);
      return false;
    }
  }, []);

  return { copiedText, copy };
}

