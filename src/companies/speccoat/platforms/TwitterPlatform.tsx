import React, { useState } from 'react';
import { generateTwitter } from '../generators/twitter';
import type { TwitterInputs, TwitterOutput, RegenerateMode, Platform } from '../types';
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

const POST_FORMAT_OPTIONS = [
  'Single Post', 'Thread (5–8 posts)', 'Contrarian Take', 'Founder-Style Post', 'Quote-Post Style',
];

const TARGET_AUDIENCE_OPTIONS = [
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

export function TwitterPlatform() {
  const [inputs, setInputs] = useState<TwitterInputs>({
    postFormat: POST_FORMAT_OPTIONS[0],
    targetAudience: TARGET_AUDIENCE_OPTIONS[0],
    mainProblem: PROBLEM_OPTIONS[0],
    contentAngle: ANGLE_OPTIONS[0],
    tone: TONE_OPTIONS[0],
    objective: OBJECTIVE_OPTIONS[0],
  });
  const [output, setOutput] = useState<TwitterOutput | null>(null);
  const [mode, setMode] = useState<RegenerateMode>('direct');

  const handleGenerate = () => {
    setOutput(generateTwitter(inputs, mode));
  };

  const handleModeChange = (m: RegenerateMode) => {
    setMode(m);
    if (output) setOutput(generateTwitter(inputs, m));
  };

  const handleConvert = (target: Platform) => {
    alert(`Switch to the ${target} tab to generate content adapted for that platform.`);
  };

  const fullOutputText = output
    ? `MAIN POST:\n${output.mainPost}${output.thread ? '\n\nTHREAD:\n' + output.thread.map((t, i) => `${i + 1}/ ${t}`).join('\n\n') : ''}\n\nALTERNATE HOOK:\n${output.alternateHook}\n\nCTA:\n${output.cta}\n\nENGAGEMENT QUESTION:\n${output.engagementQuestion}`
    : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, maxWidth: 1400 }}>
      {/* Left: Inputs */}
      <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 12, padding: 24, height: 'fit-content' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 20, color: '#F1F5F9' }}>Twitter/X Content Generator</div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Post Format</label>
          <select style={inputStyle} value={inputs.postFormat} onChange={e => setInputs({ ...inputs, postFormat: e.target.value })}>
            {POST_FORMAT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div style={fieldWrap}>
          <label style={labelStyle}>Target Audience</label>
          <select style={inputStyle} value={inputs.targetAudience} onChange={e => setInputs({ ...inputs, targetAudience: e.target.value })}>
            {TARGET_AUDIENCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
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
            <div style={{ fontSize: 32, marginBottom: 12 }}>𝕏</div>
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
                <ConvertPlatform currentPlatform="twitter" onConvert={handleConvert} />
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

            <OutputSection label="Main Post" content={output.mainPost} />

            {/* Thread */}
            {output.thread && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Thread</div>
                {output.thread.map((tweet, i) => (
                  <div key={i} style={{
                    background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 8,
                    padding: '14px 16px', marginBottom: 8, position: 'relative',
                  }}>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{
                        minWidth: 26, height: 26, background: '#1E6FD9', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                      }}>{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, lineHeight: 1.7, color: '#CBD5E1', whiteSpace: 'pre-wrap' }}>{tweet}</div>
                        <div style={{ marginTop: 8 }}>
                          <CopyButton text={tweet} variant="small" label="Copy tweet" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <CopyButton text={output.thread.map((t, i) => `${i + 1}/ ${t}`).join('\n\n')} label="Copy Full Thread" />
              </div>
            )}

            <OutputSection label="Alternate Hook" content={output.alternateHook} />
            <OutputSection label="CTA" content={output.cta} />
            <OutputSection label="Engagement Question" content={output.engagementQuestion} />

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
