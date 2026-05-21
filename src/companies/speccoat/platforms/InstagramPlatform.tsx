import React, { useState } from 'react';
import { generateInstagram } from '../generators/instagram';
import type { InstagramInputs, InstagramOutput, RegenerateMode, Platform } from '../types';
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

const CONTENT_FORMAT_OPTIONS = [
  'Reel Script', 'Carousel (8 slides)', 'Caption', 'Story Sequence',
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

const VISUAL_STYLE_OPTIONS = [
  'Industrial/Technical', 'Clean & Minimal', 'Dark Professional', 'Documentary Style',
];

const OBJECTIVE_OPTIONS = [
  'Generate awareness', 'Drive website traffic', 'Generate leads',
  'Build technical credibility', 'Start a conversation',
];

export function InstagramPlatform() {
  const [inputs, setInputs] = useState<InstagramInputs>({
    contentFormat: CONTENT_FORMAT_OPTIONS[0],
    targetViewer: TARGET_VIEWER_OPTIONS[0],
    mainProblem: PROBLEM_OPTIONS[0],
    contentAngle: ANGLE_OPTIONS[0],
    visualStyle: VISUAL_STYLE_OPTIONS[0],
    objective: OBJECTIVE_OPTIONS[0],
  });
  const [output, setOutput] = useState<InstagramOutput | null>(null);
  const [mode, setMode] = useState<RegenerateMode>('direct');

  const handleGenerate = () => {
    setOutput(generateInstagram(inputs, mode));
  };

  const handleModeChange = (m: RegenerateMode) => {
    setMode(m);
    if (output) setOutput(generateInstagram(inputs, m));
  };

  const handleConvert = (target: Platform) => {
    alert(`Switch to the ${target} tab to generate content adapted for that platform.`);
  };

  const isReel = inputs.contentFormat === 'Reel Script';

  const fullOutputText = output
    ? `VISUAL HOOK:\n${output.visualHook}\n\n${isReel ? 'REEL SCRIPT' : 'CAROUSEL SLIDES'}:\n${output.captionOrScript}\n\nCAPTION:\n${output.caption}\n\nCTA:\n${output.cta}\n\nSUGGESTED VISUALS:\n${output.suggestedVisuals.map((v, i) => `${i + 1}. ${v}`).join('\n')}`
    : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, maxWidth: 1400 }}>
      {/* Left: Inputs */}
      <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 12, padding: 24, height: 'fit-content' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 20, color: '#F1F5F9' }}>Instagram Content Generator</div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Content Format</label>
          <select style={inputStyle} value={inputs.contentFormat} onChange={e => setInputs({ ...inputs, contentFormat: e.target.value })}>
            {CONTENT_FORMAT_OPTIONS.map(o => <option key={o}>{o}</option>)}
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
          <label style={labelStyle}>Visual Style</label>
          <select style={inputStyle} value={inputs.visualStyle} onChange={e => setInputs({ ...inputs, visualStyle: e.target.value })}>
            {VISUAL_STYLE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Objective</label>
          <select style={inputStyle} value={inputs.objective} onChange={e => setInputs({ ...inputs, objective: e.target.value })}>
            {OBJECTIVE_OPTIONS.map(o => <option key={o}>{o}</option>)}
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
            <div style={{ fontSize: 32, marginBottom: 12 }}>◎</div>
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
                <ConvertPlatform currentPlatform="instagram" onConvert={handleConvert} />
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

            <OutputSection label="Visual Hook" content={output.visualHook} />

            {/* Carousel Slides or Reel Script */}
            {isReel ? (
              <OutputSection label="Reel Script" content={output.captionOrScript} mono />
            ) : (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Carousel Slides</div>
                {output.onScreenText.map((text, i) => (
                  <div key={i} style={{
                    background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 8,
                    padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      minWidth: 28, height: 28, background: '#1A2942', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: '#1E6FD9', flexShrink: 0, border: '1px solid #2A3F5A',
                    }}>{i + 1}</div>
                    <div style={{ fontSize: 13, color: '#CBD5E1', flex: 1 }}>{text}</div>
                    <CopyButton text={text} variant="small" />
                  </div>
                ))}
                <CopyButton text={output.captionOrScript} label="Copy All Slides" />
              </div>
            )}

            <OutputSection label="Caption" content={output.caption} />
            <OutputSection label="CTA" content={output.cta} />

            {/* Suggested Visuals */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Suggested Visuals</div>
              {output.suggestedVisuals.map((v, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #2A3F5A', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#1E6FD9', fontWeight: 600, minWidth: 16 }}>{i + 1}.</span>
                  {v}
                </div>
              ))}
            </div>

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
