import React, { useState } from 'react';
import { generateFacebook } from '../generators/facebook';
import type { FacebookInputs, FacebookOutput, RegenerateMode, Platform } from '../types';
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
  'Short Post', 'Longer Educational Post', 'Discussion Prompt', 'Business Owner Post', 'Retargeting Post',
];

const TARGET_READER_OPTIONS = [
  'Electronics Manufacturing Engineers', 'PCB Assembly Managers', 'Quality Engineers',
  'Aerospace & Defense Procurement', 'Medical Device Reliability Engineers',
  'Automotive Electronics Engineers', 'Contract Electronics Manufacturers', 'Defense Subcontractors',
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

const TONE_OPTIONS = [
  'Professional & Authoritative', 'Direct & Operational', 'Executive-Level', 'Technical Expert',
];

const OBJECTIVE_OPTIONS = [
  'Generate awareness', 'Drive website traffic', 'Generate leads',
  'Build technical credibility', 'Start a conversation',
];

export function FacebookPlatform() {
  const [inputs, setInputs] = useState<FacebookInputs>({
    contentFormat: CONTENT_FORMAT_OPTIONS[0],
    targetReader: TARGET_READER_OPTIONS[0],
    mainProblem: PROBLEM_OPTIONS[0],
    contentAngle: ANGLE_OPTIONS[0],
    tone: TONE_OPTIONS[0],
    objective: OBJECTIVE_OPTIONS[0],
  });
  const [output, setOutput] = useState<FacebookOutput | null>(null);
  const [mode, setMode] = useState<RegenerateMode>('direct');

  const handleGenerate = () => {
    setOutput(generateFacebook(inputs, mode));
  };

  const handleModeChange = (m: RegenerateMode) => {
    setMode(m);
    if (output) setOutput(generateFacebook(inputs, m));
  };

  const handleConvert = (target: Platform) => {
    alert(`Switch to the ${target} tab to generate content adapted for that platform.`);
  };

  const fullOutputText = output
    ? `PRIMARY POST:\n${output.primaryPost}\n\nPRACTICAL TAKEAWAY:\n${output.practicalTakeaway}\n\nCTA:\n${output.cta}\n\nDISCUSSION QUESTION:\n${output.discussionQuestion}`
    : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, maxWidth: 1400 }}>
      {/* Left: Inputs */}
      <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 12, padding: 24, height: 'fit-content' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 20, color: '#F1F5F9' }}>Facebook Content Generator</div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Content Format</label>
          <select style={inputStyle} value={inputs.contentFormat} onChange={e => setInputs({ ...inputs, contentFormat: e.target.value })}>
            {CONTENT_FORMAT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Target Reader</label>
          <select style={inputStyle} value={inputs.targetReader} onChange={e => setInputs({ ...inputs, targetReader: e.target.value })}>
            {TARGET_READER_OPTIONS.map(o => <option key={o}>{o}</option>)}
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
          <label style={labelStyle}>Tone</label>
          <select style={inputStyle} value={inputs.tone} onChange={e => setInputs({ ...inputs, tone: e.target.value })}>
            {TONE_OPTIONS.map(o => <option key={o}>{o}</option>)}
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
            <div style={{ fontSize: 32, marginBottom: 12 }}>f</div>
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
                <ConvertPlatform currentPlatform="facebook" onConvert={handleConvert} />
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

            <OutputSection label="Primary Post" content={output.primaryPost} />
            <OutputSection label="Practical Takeaway" content={output.practicalTakeaway} />
            <OutputSection label="CTA" content={output.cta} />
            <OutputSection label="Discussion Question" content={output.discussionQuestion} />

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
