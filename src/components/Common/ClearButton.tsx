import { X } from 'lucide-react';
import { Button } from './Button';

interface ClearButtonProps {
  onClick: () => void;
  className?: string;
}

export function ClearButton({ onClick, className = '' }: ClearButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={className}
      title="Clear"
    >
      <X className="w-4 h-4" />
      Clear
    </Button>
  );
}

