import type { PackagingProblem } from './types'

export const COMPANY = {
  name: 'Premier Packaging Solutions',
  website: 'premierpackaging.com',
  experience: '25+ years',
  tagline: 'Packaging that performs.',
  valueProps: [
    'Any size or complexity — from small runs to full-scale production',
    'Multi-level quality control with zero-defect standards',
    'On-time delivery with a proven track record',
    '25+ years of best practices across regulated and complex packaging',
    'Brand-consistent packaging that meets product and regulatory requirements',
  ],
  differentiators: [
    'Flexibility and scalability across order sizes',
    'Rigorous quality control processes',
    'Reliable on-time delivery',
    'Proven processes from 25+ years of experience',
    'Brand identity preservation in every package',
  ],
}

export const BANNED_WORDS = [
  'innovative',
  'quality',
  'solutions',
  'seamless',
  'world-class',
  'cutting-edge',
  'game-changing',
  'best-in-class',
]

export const CONTENT_THEMES: { id: PackagingProblem; label: string; description: string }[] = [
  {
    id: 'box-sizing',
    label: 'Inefficient Box Sizing',
    description: 'Oversized boxes creating DIM weight charges and wasted void fill',
  },
  {
    id: 'damage-prevention',
    label: 'Product Damage in Transit',
    description: 'Packaging failures causing product damage, returns and brand damage',
  },
  {
    id: 'cost-leakage',
    label: 'Packaging Cost Leakage',
    description: 'Hidden costs bleeding margin across materials, labor and logistics',
  },
  {
    id: 'over-packaging',
    label: 'Over-Packaging & Wasted Materials',
    description: 'Excess materials driving up cost and dimensional weight',
  },
  {
    id: 'shipping-cost',
    label: 'Shipping Cost Inefficiency',
    description: 'Carrier surcharges and DIM weight penalties from poor spec choices',
  },
  {
    id: 'warehouse-slowdowns',
    label: 'Warehouse Packing Slowdowns',
    description: 'Inefficient packing workflows reducing throughput and raising labor cost',
  },
  {
    id: 'return-damage',
    label: 'Return-Related Damage',
    description: 'Packaging that fails during returns, adding cost and waste',
  },
  {
    id: 'freight-inefficiency',
    label: 'Freight Inefficiencies',
    description: 'Poor cube utilization, truck space waste, and freight cost overruns',
  },
  {
    id: 'scaling',
    label: 'Scaling Packaging Operations',
    description: 'Growth straining packaging capacity and consistency',
  },
  {
    id: 'margin-loss',
    label: 'Margin Loss from Packaging Decisions',
    description: 'Packaging specification decisions eroding gross margins',
  },
]

export const TARGET_AUDIENCES = [
  'VP of Operations',
  'Supply Chain Director',
  'Procurement Manager',
  'COO / CFO',
  'Brand Manager',
  'E-commerce Operations Lead',
  'Plant Manager',
  'Logistics Director',
  'Product Manager',
  'Contract Packaging Buyer',
]

export const CONTENT_ANGLES = [
  'Cost exposure — quantify the financial damage',
  'Operational insight — reveal the hidden workflow failure',
  'Contrarian — challenge the standard assumption',
  'Case study — real-world before/after',
  'Data-driven — lead with a statistic or benchmark',
  'Risk exposure — what happens when this goes wrong',
  'Process improvement — here is the better way',
  'Decision-maker framing — this is a strategic issue',
]

export const TONES = ['Professional', 'Direct', 'Executive', 'Educational', 'Urgent']

export const OBJECTIVES = [
  'Brand awareness — establish expertise',
  'Lead generation — drive inbound inquiries',
  'Audience education — shift perspective',
  'Engagement — spark conversation',
  'Conversion — move decision-makers to act',
]

export const VISUAL_STYLES = [
  'Clean and corporate — white backgrounds, data overlays',
  'Warehouse / operational — real facility footage',
  'Split-screen before/after',
  'Text-on-screen only',
  'Product close-up — damaged vs intact',
  'Infographic style',
]
