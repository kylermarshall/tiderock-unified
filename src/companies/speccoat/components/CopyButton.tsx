import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'small';
}

export function CopyButton({ text, label = 'Copy', variant = 'default' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSmall = variant === 'small';

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: isSmall ? '4px 10px' : '8px 14px',
        background: copied ? '#0D4F29' : '#1E2D45',
        border: `1px solid ${copied ? '#1A7A3F' : '#2A3F5A'}`,
        borderRadius: 6, color: copied ? '#4ADE80' : '#94A3B8',
        cursor: 'pointer', fontSize: isSmall ? 11 : 12, fontWeight: 500,
        transition: 'all 0.15s',
      }}
    >
      {copied ? <Check size={isSmall ? 12 : 14} /> : <Copy size={isSmall ? 12 : 14} />}
      {copied ? 'Copied' : label}
    </button>
  );
}
