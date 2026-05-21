import { CopyButton } from './CopyButton';

interface OutputSectionProps {
  label: string;
  content: string;
  mono?: boolean;
}

export function OutputSection({ label, content, mono = false }: OutputSectionProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
        <CopyButton text={content} variant="small" />
      </div>
      <div style={{
        background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 8,
        padding: '14px 16px', fontSize: 13, lineHeight: 1.7, color: '#CBD5E1',
        whiteSpace: 'pre-wrap', fontFamily: mono ? 'monospace' : 'inherit',
      }}>
        {content}
      </div>
    </div>
  );
}
