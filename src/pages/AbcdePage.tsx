import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Sparkles,
  Activity,
  MapPin,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { PageTab } from '../types';

interface AbcdePageProps {
  onNavigate: (tab: PageTab) => void;
}

export const AbcdePage: React.FC<AbcdePageProps> = ({ onNavigate }) => {
  // Self-observation interactive checklist state
  const [checklist, setChecklist] = useState({
    asymmetry: false,
    border: false,
    color: false,
    diameter: false,
    evolving: false,
    bleedingOrItch: false,
  });

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const handleToggle = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetChecklist = () => {
    setChecklist({
      asymmetry: false,
      border: false,
      color: false,
      diameter: false,
      evolving: false,
      bleedingOrItch: false,
    });
  };

  const criteriaCards = [
    {
      letter: 'A',
      title: 'Asymmetry',
      subtitle: 'One half does not match the other half',
      color: 'from-amber-500/20 to-amber-500/5',
      borderColor: 'border-amber-500/30',
      tagColor: 'text-amber-400 bg-amber-500/10',
      description:
        'Imagine drawing an imaginary line directly through the middle of the lesion. If the two halves do not mirror each other in shape, contour, or structure, the lesion is considered asymmetric.',
      benignExample: 'Symmetrical: Round, circular or oval shape where left and right halves mirror each other.',
      suspiciousExample: 'Asymmetrical: Irregular, lopsided contour where one half has distinct protrusions or lobes.',
      clinicalRelevance:
        'Melanoma cells divide and spread at uneven rates in different directions, causing irregular shape distortion.'
    },
    {
      letter: 'B',
      title: 'Border Irregularity',
      subtitle: 'Edges are scalloped, notched, or poorly defined',
      color: 'from-rose-500/20 to-rose-500/5',
      borderColor: 'border-rose-500/30',
      tagColor: 'text-rose-400 bg-rose-500/10',
      description:
        'Normal moles typically feature crisp, distinct, and smooth perimeter boundaries. Suspicious lesions often have blurred edges that fade gradually into surrounding skin, or jagged, scalloped margins.',
      benignExample: 'Even & Smooth: Clean boundary that sharply separates pigmented skin from surrounding tissue.',
      suspiciousExample: 'Ragged & Notched: Jagged edges, clefts, or pigment that fades indistinctly into adjacent skin.',
      clinicalRelevance:
        'Invasive melanocytic proliferation extends horizontally along the dermo-epidermal junction in an uncontrolled pattern.'
    },
    {
      letter: 'C',
      title: 'Colour Variation',
      subtitle: 'Multiple shades within a single lesion',
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
      tagColor: 'text-purple-400 bg-purple-500/10',
      description:
        'A benign mole usually has a single uniform color (such as consistent tan, caramel, or brown). Suspicious lesions frequently display a variegated patchwork of colors within the same boundary.',
      benignExample: 'Monochromatic: Single consistent shade of light brown, dark brown, or warm tan throughout.',
      suspiciousExample: 'Polychromatic: Dark brown mixed with pitch black, slate-blue, pink, white (regression), or reddish hues.',
      clinicalRelevance:
        'Different depths of melanin synthesis combined with localized inflammation and tissue regression create multi-colored patterns.'
    },
    {
      letter: 'D',
      title: 'Diameter',
      subtitle: 'Span greater than 6 millimeters (pencil eraser)',
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
      tagColor: 'text-blue-400 bg-blue-500/10',
      description:
        'While early melanomas can occasionally be detected when smaller, lesions larger than 6 mm (roughly the diameter of a standard pencil eraser) carry higher clinical suspicion.',
      benignExample: 'Small & Compact: Typically 2 mm to 5 mm in diameter, remaining stable in size over years.',
      suspiciousExample: 'Enlarged: Greater than 6 mm across, or expanding beyond its previous boundary.',
      clinicalRelevance:
        'Size provides an objective physical threshold for triage, though tiny early melanomas should not be ignored if evolving.'
    },
    {
      letter: 'E',
      title: 'Evolving Appearance',
      subtitle: 'The single most critical warning sign',
      color: 'from-teal-500/20 to-teal-500/5',
      borderColor: 'border-teal-500/30',
      tagColor: 'text-teal-400 bg-teal-500/10',
      description:
        'Any change in size, shape, surface elevation, pigmentation, or spontaneous symptoms (such as new itching, crusting, or bleeding) is the strongest indicator that a lesion requires professional dermoscopic review.',
      benignExample: 'Static & Unchanged: Maintains consistent appearance and behavior across consecutive months and years.',
      suspiciousExample: 'Active Evolution: Gradual darkening, sudden growth, elevation above skin surface, or itching/oozing.',
      clinicalRelevance:
        'Malignancy is fundamentally defined by active biological progression over time. Evolution supersedes other individual criteria.'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Self-Examination Framework</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The ABCDE Criteria for Skin Lesion Evaluation
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Developed by dermatologists worldwide, the ABCDE rules provide a clear, standardized mnemonic to help anyone identify suspicious characteristics in pigmented skin spots. Knowing these five criteria enables proactive self-checks between regular doctor visits.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('detection')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Test a Photo with ABCDE Analysis</span>
            </button>
            <button
              onClick={() => onNavigate('dermatologists')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Consult a Dermatologist</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5 Deep-Dive Criteria Cards */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">The 5 Diagnostic Criteria</h2>
            <p className="text-xs text-slate-400 mt-0.5">Explore what each letter means with practical visual benchmarks</p>
          </div>
          <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-3 py-1 rounded-lg border border-teal-500/20">
            A · B · C · D · E
          </span>
        </div>

        <div className="space-y-4">
          {criteriaCards.map((c) => (
            <div
              key={c.letter}
              className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-r ${c.color} bg-slate-900 border ${c.borderColor} space-y-4 shadow-lg transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-white font-extrabold text-2xl flex items-center justify-center font-mono shadow-inner shrink-0">
                    {c.letter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{c.title}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${c.tagColor}`}>
                        Criterion {c.letter}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{c.subtitle}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {c.description}
              </p>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-900/40 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Typical Benign Presentation</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-5">
                    {c.benignExample}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-900/40 space-y-1">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Suspicious / Warning Presentation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-5">
                    {c.suspiciousExample}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                <strong className="text-slate-300">Clinical Mechanism:</strong> {c.clinicalRelevance}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Caveats: When ABCDE Is Not Enough */}
      <section className="p-7 sm:p-8 rounded-3xl bg-slate-900 border border-amber-900/40 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Important Caveats & Exceptions</h3>
            <p className="text-xs text-slate-400">Why the ABCDE rule cannot definitively rule out all skin cancers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-amber-300 text-sm">1. Amelanotic Melanoma (Non-Pigmented)</h4>
            <p className="text-slate-400 leading-relaxed">
              Approximately 2% to 8% of melanomas do not produce melanin. They appear pink, red, clear, or flesh-colored, completely lacking the dark brown or black shades described in Criterion C. Any new, persistent pink bump that grows or bleeds should be checked regardless of color.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-amber-300 text-sm">2. Nodular Melanoma & The "EFG" Rule</h4>
            <p className="text-slate-400 leading-relaxed">
              Nodular melanomas may be surprisingly symmetric and round with clean borders. Dermatologists use the complementary <strong>EFG</strong> criteria for these:
              <br />
              <strong className="text-slate-200">E — Elevated:</strong> noticeably raised above surrounding skin.
              <br />
              <strong className="text-slate-200">F — Firm:</strong> feels solid or hard to the touch.
              <br />
              <strong className="text-slate-200">G — Growing:</strong> continuous rapid growth over weeks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-amber-300 text-sm">3. Small Melanomas (&lt; 6mm)</h4>
            <p className="text-slate-400 leading-relaxed">
              With increasing public awareness, more than 30% of melanomas are now detected when they are under 6 millimeters in diameter. If a tiny spot is actively evolving or looks unusual, do not wait for it to reach 6 mm before consulting a physician.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-amber-300 text-sm">4. The "Ugly Duckling" Rule</h4>
            <p className="text-slate-400 leading-relaxed">
              Normal moles on a single individual typically look like "siblings" (sharing similar color, shape, and size). An outlier mole that looks noticeably different from all your other spots is an "ugly duckling" and warrants dedicated examination.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Self-Observation Checklist */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-teal-500/30 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Interactive Self-Check</span>
            </div>
            <h3 className="text-xl font-bold text-white">Do You Have a Specific Mole in Mind?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any statements below that describe the skin spot you are observing:
            </p>
          </div>

          <button
            onClick={handleResetChecklist}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-750 transition-colors shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Checklist</span>
          </button>
        </div>

        {/* Checkbox Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              key: 'asymmetry' as const,
              letter: 'A',
              label: 'One half does not match the other half',
              sub: 'The spot is uneven or lopsided in contour'
            },
            {
              key: 'border' as const,
              letter: 'B',
              label: 'The borders are notched, jagged, or blurred',
              sub: 'Edges fade or have scalloped notches'
            },
            {
              key: 'color' as const,
              letter: 'C',
              label: 'Contains two or more distinct colors',
              sub: 'Mix of tan, dark brown, black, white, red, or blue'
            },
            {
              key: 'diameter' as const,
              letter: 'D',
              label: 'Diameter is larger than 6 millimeters',
              sub: 'Wider than a standard pencil eraser'
            },
            {
              key: 'evolving' as const,
              letter: 'E',
              label: 'The spot is changing in size, shape, or color',
              sub: 'Visible alteration noticed over recent weeks or months'
            },
            {
              key: 'bleedingOrItch' as const,
              letter: '!',
              label: 'The spot bleeds, weeps, or itches persistently',
              sub: 'Sensory irritation, spontaneous crusting, or non-healing'
            }
          ].map((item) => (
            <label
              key={item.key}
              className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                checklist[item.key]
                  ? 'bg-teal-500/15 border-teal-500/50 shadow-md shadow-teal-950/20'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
              }`}
            >
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => handleToggle(item.key)}
                className="mt-1 w-4 h-4 rounded text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.2 rounded">
                    [{item.letter}]
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {item.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 pl-6">
                  {item.sub}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Dynamic Checklist Feedback */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            checkedCount >= 2
              ? 'bg-rose-950/30 border-rose-800/60'
              : checkedCount === 1
              ? 'bg-amber-950/30 border-amber-800/60'
              : 'bg-slate-950/60 border-slate-800'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Observation Status:
                </span>
                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    checkedCount >= 2
                      ? 'bg-rose-500/20 text-rose-300'
                      : checkedCount === 1
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {checkedCount} Warning Sign{checkedCount !== 1 ? 's' : ''} Checked
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {checkedCount >= 2
                  ? 'Multiple atypical features selected. We strongly advise having this lesion examined by a dermatologist for dermoscopy.'
                  : checkedCount === 1
                  ? 'One atypical characteristic noted. Monitor closely and consider capturing a photo with our detection tool or scheduling a routine skin check.'
                  : 'No warning signs selected. Continue performing monthly self-examinations and practicing daily sun protection.'}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onNavigate('detection')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Screen This Spot Now</span>
              </button>
              {checkedCount > 0 && (
                <button
                  onClick={() => onNavigate('dermatologists')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>Find a Clinic</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
