import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sun,
  Eye,
  Calendar,
  HeartHandshake,
  CheckCircle2,
  HelpCircle,
  FileText,
  Activity,
  Layers,
  MapPin,
  Sparkles,
  Search,
  BookOpen,
  Info,
  Stethoscope
} from 'lucide-react';
import { PageTab } from '../types';

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accessible Skin Health & Early Awareness</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Know Your Skin. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Detect Changes Early.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Skin cancer is one of the most common cancers worldwide, yet it is also one of the most treatable when detected in its earliest stages. Regular observation, sun mindfulness, and timely clinical evaluations keep you ahead of unexpected changes.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('detection')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Check a Skin Lesion</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('abcde')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Learn the ABCDE Signs</span>
            </button>
          </div>

          {/* Reassuring Stats / Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white font-mono">&gt; 99%</p>
                <p className="text-xs text-slate-400">5-yr survival for localized melanoma caught early</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white font-mono">10 Mins</p>
                <p className="text-xs text-slate-400">Monthly full-body skin self-check</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white font-mono">80%+</p>
                <p className="text-xs text-slate-400">Cases preventable with UV mindfulness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Early Evaluation Matters */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">Why Early Skin Evaluation Matters</h2>
          <p className="text-sm text-slate-400">
            Most skin changes are completely benign. However, noticing a change early turns a potentially serious condition into a simple, minor outpatient procedure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Skin Is Visible</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike internal organs, the skin can be examined directly with the naked eye and dermatoscope. Any evolving mole, non-healing spot, or altered pigment provides a direct visual signal before deeper tissues are affected.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Minimally Invasive Care</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When caught early (in situ or thin stages), treatment typically requires only a minor outpatient excision under local anesthesia with minimal scarring and rapid recovery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Peace of Mind</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The vast majority of skin spots are harmless common moles, freckles, or benign seborrheic keratoses. Getting clear evaluation resolves uncertainty and prevents unnecessary anxiety.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding the 3 Main Skin Cancer Types */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block">
              Medical Fundamentals
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Understanding Common Skin Cancer Types</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Different cells in the skin give rise to distinct conditions with varying appearances and behaviors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BCC */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                  Most Common (~80%)
                </span>
                <span className="text-xs text-slate-500">Slow-Growing</span>
              </div>
              <h3 className="text-lg font-bold text-white">Basal Cell Carcinoma (BCC)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Originates in basal cells of the lower epidermis. It is the most frequent human cancer, predominantly appearing on sun-exposed zones like the face, nose, ears, and neck.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-300 block">Typical Visual Presentation:</span>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Pearly, translucent, flesh-colored or pink bump</li>
                  <li>Rolled borders with tiny visible blood vessels (telangiectasias)</li>
                  <li>Sore that scabs, bleeds easily, and repeatedly reopens</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Prognosis:</strong> Extremely low risk of spreading to distant organs when treated promptly.
            </div>
          </div>

          {/* SCC */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/20">
                  Second Most Common (~15%)
                </span>
                <span className="text-xs text-slate-500">Moderate Risk</span>
              </div>
              <h3 className="text-lg font-bold text-white">Squamous Cell Carcinoma (SCC)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Develops in flat squamous cells of the upper epidermis. Frequently arises from precancerous sun-damaged spots known as actinic keratoses on face, lips, scalp, and arms.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-300 block">Typical Visual Presentation:</span>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Firm red nodule or thickened, rough, scaly crusted patch</li>
                  <li>Persistent wart-like growth that may tenderly bleed</li>
                  <li>Elevated lesion with a central depression or ulcer</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Prognosis:</strong> Highly curable when excised early, though it has higher potential to spread than BCC if ignored.
            </div>
          </div>

          {/* Melanoma */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-rose-900/50 flex flex-col justify-between space-y-4 hover:border-rose-800 transition-colors shadow-lg shadow-rose-950/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Most Serious (~1-2%)
                </span>
                <span className="text-xs text-rose-400 font-medium">Requires Fast Triage</span>
              </div>
              <h3 className="text-lg font-bold text-white">Malignant Melanoma</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Forms in pigment-producing melanocytes. While less common, it accounts for the majority of skin cancer deaths due to its ability to spread if untreated.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-300 block">Typical Visual Presentation:</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Asymmetric shape where two halves do not match</li>
                  <li>Ragged, scalloped, or poorly defined border</li>
                  <li>Multiple colors (dark brown, black, blue, red, white)</li>
                  <li>Evolving appearance or sudden enlargement of an existing mole</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-[11px] text-rose-200">
              <strong className="text-rose-100">Key Takeaway:</strong> Early surgical excision before deep dermal invasion yields over 99% 5-year survival.
            </div>
          </div>
        </div>
      </section>

      {/* Risk Factors & Warning Signs Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Recognized Risk Factors</h3>
              <p className="text-xs text-slate-400">Personal traits and exposures that increase vulnerability</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-slate-200 block font-semibold">1. Cumulative UV Exposure</strong>
              <p className="text-slate-400 text-[11px]">Extended outdoor exposure without protective shade or clothing, and artificial UV from tanning beds.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-slate-200 block font-semibold">2. Blistering Sunburns</strong>
              <p className="text-slate-400 text-[11px]">History of severe sunburns, especially during childhood or adolescence, doubles melanoma risk.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-slate-200 block font-semibold">3. Skin Phototype</strong>
              <p className="text-slate-400 text-[11px]">Fair skin, freckles, red or blonde hair, and eyes that burn rather than tan easily.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-slate-200 block font-semibold">4. High Mole Count</strong>
              <p className="text-slate-400 text-[11px]">Having over 50 normal moles or multiple atypical (dysplastic) nevi requires regular monitoring.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-slate-200 block font-semibold">5. Family or Personal History</strong>
              <p className="text-slate-400 text-[11px]">First-degree relatives diagnosed with melanoma, or prior personal history of skin cancer.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <strong className="text-slate-200 block font-semibold">6. Immune Suppression</strong>
              <p className="text-slate-400 text-[11px]">Immune-modulating medications, organ transplant recipients, or chronic conditions.</p>
            </div>
          </div>
        </div>

        {/* Warning Signs Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Warning Signs to Watch For</h3>
              <p className="text-xs text-slate-400">Physical indications that warrant a dermatologist evaluation</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                1
              </div>
              <div>
                <strong className="text-slate-200 font-semibold block">The "Ugly Duckling" Sign</strong>
                <p className="text-slate-400 text-[11px]">A mole or skin lesion that stands out as visibly different in color, shape, or size compared to all surrounding moles.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                2
              </div>
              <div>
                <strong className="text-slate-200 font-semibold block">New or Rapidly Changing Spot</strong>
                <p className="text-slate-400 text-[11px]">A newly emerged pigmented spot in adulthood (after age 30), or an existing mole that is expanding, darkening, or becoming elevated.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                3
              </div>
              <div>
                <strong className="text-slate-200 font-semibold block">Spontaneous Bleeding, Oozing, or Crusting</strong>
                <p className="text-slate-400 text-[11px]">Any lesion that bleeds with gentle contact, weeps fluid, forms repetitive crusts, or fails to heal after 4 to 6 weeks.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                4
              </div>
              <div>
                <strong className="text-slate-200 font-semibold block">Subjective Sensory Changes</strong>
                <p className="text-slate-400 text-[11px]">Localized persistent itching, tingling, tenderness, or unusual sensitivity around a specific mole.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Prevention Advice */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block">
            Actionable Guidance
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Practical Sun Protection & Prevention Advice</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Protecting your skin doesn't mean avoiding the outdoors entirely. Incorporate simple, sensible daily habits to safeguard your cellular DNA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-lg">🧴</span>
            <h4 className="text-sm font-semibold text-white">Broad-Spectrum SPF 30+</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Apply broad-spectrum sunscreen (filtering UVA & UVB) 15 minutes before stepping out. Reapply every 2 hours, or immediately after swimming or heavy perspiration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-lg">🧢</span>
            <h4 className="text-sm font-semibold text-white">Protective Clothing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Wear wide-brimmed hats shielding eyes, ears, and neck. Choose lightweight UPF 50+ clothing and sunglasses with 99-100% UV absorption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-lg">⛱️</span>
            <h4 className="text-sm font-semibold text-white">Seek Midday Shade</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              UV rays are most intense between 10:00 AM and 4:00 PM. Schedule outdoor sports and chores in the early morning or late afternoon when practical.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-lg">🪞</span>
            <h4 className="text-sm font-semibold text-white">Monthly Self-Check</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conduct a head-to-toe examination every month using a full-length and hand mirror. Check overlooked spots like palms, soles, between toes, and under nails.
            </p>
          </div>
        </div>
      </section>

      {/* When to Consult a Dermatologist */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/30 via-slate-900 to-slate-900 border border-teal-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Professional Care Threshold</span>
          </div>
          <h2 className="text-2xl font-bold text-white">When Should You See a Dermatologist?</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            If you notice any mole displaying one or more of the ABCDE criteria (Asymmetry, Border irregularity, Color variance, Diameter &gt; 6mm, or Evolution), or if a skin spot bleeds, itches persistently, or refuses to heal, schedule a clinical dermoscopy exam. In-person clinical dermoscopy and histologic biopsy remain the gold standard.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigate('dermatologists')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find Specialists in Bengaluru</span>
            </button>
            <button
              onClick={() => onNavigate('detection')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Test a Photo with AI</span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-auto p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 text-center space-y-2">
          <span className="text-3xl font-bold text-teal-400 font-mono block">Annual Check</span>
          <p className="text-[11px] text-slate-400 max-w-xs">
            Dermatologists recommend an annual full-body skin examination for individuals with high mole counts or elevated sun exposure history.
          </p>
        </div>
      </section>

      {/* Prominent Medical Disclaimer */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Info className="w-4 h-4 text-teal-400" />
          <span>Important Medical & Educational Disclaimer</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          The informational materials and artificial intelligence screening tools provided on this platform are for general educational, triage awareness, and research assistance purposes only. They do not constitute formal medical diagnosis, pathology reports, or clinical consultations. Never delay seeking professional medical advice or disregard qualified physician guidance because of an automated tool's output. If you are concerned about any skin spot, consult a licensed healthcare professional or certified dermatologist immediately.
        </p>
      </section>
    </div>
  );
};
