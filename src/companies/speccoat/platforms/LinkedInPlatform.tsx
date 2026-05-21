import React, { useState } from 'react';
import { generateLinkedIn } from '../generators/linkedin';
import type { LinkedInInputs, LinkedInOutput, RegenerateMode, Platform } from '../types';
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

export function LinkedInPlatform() {
  const [inputs, setInputs] = useState<LinkedInInputs>({
    targetAudience: TARGET_AUDIENCE_OPTIONS[0],
    mainProblem: PROBLEM_OPTIONS[0],
    contentAngle: ANGLE_OPTIONS[0],
    tone: TONE_OPTIONS[0],
    objective: OBJECTIVE_OPTIONS[0],
  });
  const [output, setOutput] = useState<LinkedInOutput | null>(null);
  const [mode, setMode] = useState<RegenerateMode>('direct');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);

  const handleGenerate = () => {
    setOutput(generateLinkedIn(inputs, mode));
  };

  const handleModeChange = (m: RegenerateMode) => {
    setMode(m);
    if (output) setOutput(generateLinkedIn(inputs, m));
  };

  const handleConvert = (target: Platform) => {
    const url = window.location.href;
    alert(`Switch to the ${target} tab to generate content for that platform. Your inputs will carry over when you configure it there.\n\nURL: ${url}`);
  };

  const fullPostText = output
    ? `HOOK:\n${output.fullPost.hook}\n\nBODY:\n${output.fullPost.body}\n\nBUSINESS IMPACT:\n${output.fullPost.businessImpact}\n\nCTA:\n${output.fullPost.cta}`
    : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, maxWidth: 1400 }}>
      {/* Left: Inputs */}
      <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 12, padding: 24, height: 'fit-content' }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 20, color: '#F1F5F9' }}>LinkedIn Post Generator</div>

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
            <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Configure your inputs</div>
            <div style={{ fontSize: 13 }}>Select your audience, problem, and angle — then click Generate Content</div>
          </div>
        )}

        {output && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <RegenerateButtons current={mode} onChange={handleModeChange} />
              <div style={{ display: 'flex', gap: 10 }}>
                <CopyButton text={fullPostText} label="Copy Full Post" />
                <ConvertPlatform currentPlatform="linkedin" onConvert={handleConvert} />
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

            {/* Post Ideas */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, marginBottom: 20, overflow: 'hidden' }}>
              <button
                onClick={() => setIdeasOpen(!ideasOpen)}
                style={{
                  width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                  color: '#F1F5F9', cursor: 'pointer', textAlign: 'left', fontSize: 12,
                  fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span style={{ color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Top 10 Post Ideas</span>
                <span style={{ color: '#6B8CAE' }}>{ideasOpen ? '▲' : '▼'}</span>
              </button>
              {ideasOpen && (
                <div style={{ padding: '0 16px 16px' }}>
                  {output.postIdeas.map(idea => (
                    <div key={idea.rank} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #1E2D45' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{
                          minWidth: 24, height: 24, background: '#1E6FD9', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{idea.rank}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 4 }}>{idea.title}</div>
                          <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>{idea.angle}</div>
                          <div style={{ fontSize: 11, color: '#1E6FD9' }}>{idea.rankReason}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full Post */}
            <OutputSection label="Hook" content={output.fullPost.hook} />
            <OutputSection label="Body" content={output.fullPost.body} />
            <OutputSection label="Business Impact" content={output.fullPost.businessImpact} />
            <OutputSection label="CTA" content={output.fullPost.cta} />

            {/* Content Calendar */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, marginBottom: 20, overflow: 'hidden' }}>
              <button
                onClick={() => setCalendarOpen(!calendarOpen)}
                style={{
                  width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                  color: '#F1F5F9', cursor: 'pointer', textAlign: 'left', fontSize: 12,
                  fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span style={{ color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px' }}>30-Day Content Calendar</span>
                <span style={{ color: '#6B8CAE' }}>{calendarOpen ? '▲' : '▼'}</span>
              </button>
              {calendarOpen && (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: '#1A2942' }}>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: '#6B8CAE', fontWeight: 600, whiteSpace: 'nowrap' }}>Day</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: '#6B8CAE', fontWeight: 600 }}>Topic</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: '#6B8CAE', fontWeight: 600 }}>Angle</th>
                        <th style={{ padding: '10px 12px', textAlign: 'left', color: '#6B8CAE', fontWeight: 600, whiteSpace: 'nowrap' }}>CTA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {output.contentCalendar.map(day => (
                        <tr key={day.day} style={{ borderTop: '1px solid #1E2D45' }}>
                          <td style={{ padding: '10px 12px', color: '#1E6FD9', fontWeight: 600, whiteSpace: 'nowrap' }}>Day {day.day}</td>
                          <td style={{ padding: '10px 12px', color: '#F1F5F9' }}>{day.topic}</td>
                          <td style={{ padding: '10px 12px', color: '#94A3B8' }}>{day.angle}</td>
                          <td style={{ padding: '10px 12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>{day.cta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Repurposing */}
            <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#6B8CAE', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Repurposing Ideas</div>
              {output.repurposing.map((r, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #2A3F5A' }}>
                  {r}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
