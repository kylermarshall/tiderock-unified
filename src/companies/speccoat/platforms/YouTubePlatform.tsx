import React, { useState } from 'react';
import { generateYouTube } from '../generators/youtube';
import type { YouTubeInputs, YouTubeOutput, RegenerateMode, Platform } from '../types';
import { QualityScore } from '../components/QualityScore';
import { RegenerateButtons } from '../components/RegenerateButtons';
import { CopyButton } from '../components/CopyButton';
import { OutputSection } from '../components/OutputSection';
import { ConvertPlatform } from '../components/ConvertPlatform';

const inputStyle: React.CSSProperties = {
  background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 6,
  padding: '10px 12px', color: '#F1F5F9', fontSize: 13, width: '100%', outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 500, color: '#6B8CAE', display: 'block', marginBottom: 6,
};

const fieldWrap: React.CSSProperties = { marginBottom: 16 };

const VIDEO_FORMAT_OPTIONS = [
  'YouTube Short (60 sec)', '60–90 Second Video', 'Long-Form Outline (5–10 min)', 'Title + Thumbnail Package',
];

const TARGET_VIEWER_OPTIONS = [
  'Electronics Engineers', 'PCB Assembly Managers', 'Quality Engineers',
  'Aerospace/Defense Procurement', 'Medical Device Engineers', 'Automotive Electronics Engineers',
];

const PROBLEM_OPTIONS = [
  'PCB failure from moisture/humidity', 'Coating adhesion failure from poor surface prep',
  'Wrong coating material for the application', 'Field returns from coating disbondment',
  'Coating thickness inconsistency', 'Compliance failure (IPC/MIL-SPEC)',
  'High rework costs from coating defects', 'Parylene vs. acrylic cost analysis',
  'Surface contamination before coating', 'Coating failure in thermal cycling',
];

const ANGLE_OPTIONS = [
  'Financial consequence (cost of failure)', 'Operational consequence (downtime/rework)',
  'Contrarian (challenge assumptions)', 'Educational (explain the root cause)',
  'Technical credibility (specs and data)', 'Risk-based (what can go wrong)',
];

const OBJECTIVE_OPTIONS = [
  'Educate on coating selection', 'Show cost of failure', 'Build technical authority',
  'Drive consultation requests', 'Explain coating materials',
];

const TONE_OPTIONS = [
  'Professional & Authoritative', 'Direct & Operational', 'Executive-Level', 'Technical Expert',
];

export function YouTubePlatform() {
  const [inputs, setInputs] = useState<YouTubeInputs>({
    videoFormat: VIDEO_FORMAT_OPTIONS[0],
    targetViewer: TARGET_VIEWER_OPTIONS[0],
    mainProblem: PROBLEM_OPTIONS[0],
    contentAngle: ANGLE_OPTIONS[0],
    videoObjective: OBJECTIVE_OPTIONS[0],
    tone: TONE_OPTIONS[0],
  });
  const [output, setOutput] = useState<YouTubeOutput | null>(null);
  const [mode, setMode] = useState<RegenerateMode>('direct');

  const handleGenerate = () => {
    setOutput(generateYouTube(inputs, mode));
  };

  const handleModeChange = (m: RegenerateMode) => {
    setMode(m);
    if (output) setOutput(generateYouTube(inputs, m));
  };

  const handleConvert = (target: Platform) => {
    alert(`Switch to the ${target} tab to generate content adapted for that platform.`);
  };

  const fullOutputText = output
    ? `TITLE:\n${output.title}\n\nTHUMBNAIL TEXT:\n${output.thumbnailText}\n\n3-SECOND HOOK:\n${output.threeSecondHook}\n\nOPENING LINE:\n${output.openingLine}\n\nSCRIPT OUTLINE:\n${output.scriptOutline.map(s => `[${s.label}]\n${s.content}`).join('\n\n')}\n\nRETENTION BEATS:\n${output.retentionBeats.join('\n')}\n\nBUSINESS INSIGHT:\n${output.businessInsight}\n\nCTA:\n${output.cta}`
    : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, maxWidth: 1400 }}>
      {/* Left: Inputs */}
      <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 12, padding: 24, height: 'fit-content' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 20, color: '#F1F5F9' }}>YouTube Content Generator</div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Video Format</label>
          <select style={inputStyle} value={inputs.videoFormat} onChange={e => setInputs({ ...inputs, videoFormat: e.target.value })}>
            {VIDEO_FORMAT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Target Viewer</label>
          <select style={inputStyle} value={inputs.targetViewer} onChange={e => setInputs({ ...inputs, targetViewer: e.target.value })}>
            {TARGET_VIEWER_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Main Operational Problem</label>
          <select style={inputStyle} value={inputs.mainProblem} onChange={e => setInputs({ ...inputs, mainProblem: e.target.value })}>
            {PROBLEM_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Content Angle</label>
          <select style={inputStyle} value={inputs.contentAngle} onChange={e => setInputs({ ...inputs, contentAngle: e.target.value })}>
            {ANGLE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Video Objective</label>
          <select style={inputStyle} value={inputs.videoObjective} onChange={e => setInputs({ ...inputs, videoObjective: e.target.value })}>
            {OBJECTIVE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Tone</label>
          <select style={inputStyle} value={inputs.tone} onChange={e => setInputs({ ...inputs, tone: e.target.value })}>
            {TONE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          style={{
            background: '#1E6FD9', color: 'white', border: 'none', padding: '12px 24px',
            borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 8,
          }}
        >
          Generate Content
        </button>
      </div>

      {/* Right: Outputs */}
      <div>
        {!output && (
          <div style={{
            background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 12,
            padding: 48, textAlign: 'center', color: '#6B8CAE',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>▶</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Configure your inputs</div>
            <div style={{ fontSize: 13 }}>Select format, audience, and angle — then click Generate Content</div>
          </div>
        )}

        {output && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <RegenerateButtons current={mode} onChange={handleModeChange} />
              <div style={{ display: 'flex', gap: 10 }}>
                <CopyButton text={fullOutputText} label="Copy Full Output" />
                <ConvertPlatform currentPlatform="youtube" onConvert={handleConvert} />
              </div>
            </div>

            <QualityScore score={output.qualityScore} />

            {/* Improvements */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Improvement Suggestions</div>
              {output.improvements.map((imp, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #1E6FD9' }}>{imp}</div>
              ))}
            </div>

            {/* Thumbnail Preview */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Thumbnail Preview</div>
              <div style={{
                background: '#1A2942', border: '1px solid #2A3F5A', borderRadius: 10,
                padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 120, position: 'relative',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#FACC15', textAlign: 'center', lineHeight: 1.3, letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                  {output.thumbnailText}
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                  <CopyButton text={output.thumbnailText} variant="small" label="Copy Text" />
                </div>
              </div>
            </div>

            <OutputSection label="Video Title" content={output.title} />
            <OutputSection label="3-Second Hook" content={output.threeSecondHook} />
            <OutputSection label="Opening Line" content={output.openingLine} />

            {/* Script Outline */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Script Outline</div>
              {output.scriptOutline.map((section, i) => (
                <div key={i} style={{
                  background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 8,
                  padding: '14px 16px', marginBottom: 10,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1E6FD9', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px' }}>{section.label}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: '#CBD5E1' }}>{section.content}</div>
                  <div style={{ marginTop: 8 }}>
                    <CopyButton text={section.content} variant="small" label={`Copy ${section.label}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Retention Beats */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Retention Beats</div>
              {output.retentionBeats.map((beat, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #2A3F5A', fontFamily: 'monospace' }}>
                  {beat}
                </div>
              ))}
            </div>

            <OutputSection label="Business Insight" content={output.businessInsight} />
            <OutputSection label="CTA" content={output.cta} />

            {/* Repurposing */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Repurposing Ideas</div>
              {output.repurposing.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #2A3F5A' }}>{r}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
