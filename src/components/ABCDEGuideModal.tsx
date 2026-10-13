import React from 'react';
import { BookOpen, X, CheckCircle, AlertTriangle } from 'lucide-react';

interface ABCDEGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ABCDEGuideModal: React.FC<ABCDEGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const criteria = [
    {
      letter: 'A',
      title: 'Asymmetry',
      description: 'One half of the spot does not match the other half in shape or pigmentation.',
      benign: 'Symmetric round or oval shape. Folding along any axis results in congruent halves.',
      malignant: 'Asymmetric shape. One half differs markedly in geometry or pigment distribution.',
      cvMetric: 'Centroid axis reflection mismatch score & contour disparity %.',
    },
    {
      letter: 'B',
      title: 'Border Irregularity',
      description: 'The edges are irregular, ragged, notched, scalloped, or blurred.',
      benign: 'Sharp, clearly defined border with smooth continuous perimeter.',
      malignant: 'Frayed, jagged, notched edges where pigment bleeds into surrounding skin.',
      cvMetric: 'Sobel gradient perimeter compactness quotient (P² / 4πA).',
    },
    {
      letter: 'C',
      title: 'Color Variation',
      description: 'The color is not uniform; multiple shades of tan, brown, black, red, white, or blue.',
      benign: 'Monochromatic or single uniform shade of tan or medium brown.',
      malignant: 'Variegated multi-color mosaic. May include pitch black, crimson, and bluish-white veil.',
      cvMetric: 'RGB & HSV channel standard deviation across segmented lesion mask.',
    },
    {
      letter: 'D',
      title: 'Diameter',
      description: 'The spot is larger than 6 millimeters (about the size of a pencil eraser).',
      benign: 'Typically smaller than 6mm in greatest dimension.',
      malignant: 'Often exceeds 6mm, although early melanomas can be smaller.',
      cvMetric: 'Bounding box maximum span pixel-to-millimeter dermatoscope calibration.',
    },
    {
      letter: 'E',
      title: 'Evolution / Elevation',
      description: 'The mole is changing in size, shape, color, elevation, or develops symptoms (bleeding, itching).',
      benign: 'Remains morphologically stable over months and years.',
      malignant: 'Active enlargement, elevation, sudden darkening, spontaneous bleeding, or crusting.',
      cvMetric: 'Entropy of surface micro-structures and longitudinal comparison delta.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <h3 className="font-semibold text-slate-100 text-sm">
              Clinical ABCDE Dermatological Criteria Reference
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          <p className="text-xs text-slate-400 leading-relaxed">
            The ABCDE rule is the gold standard clinical mnemonic developed by dermatologists
            to identify superficial spreading melanoma and atypical melanocytic proliferations.
            The computer vision algorithms in this system calculate quantitative metrics for each parameter.
          </p>

          <div className="space-y-4">
            {criteria.map((item) => (
              <div
                key={item.letter}
                className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col md:flex-row gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-lg shrink-0">
                  {item.letter}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-100">{item.title}</h4>
                    <span className="text-[10px] font-mono text-teal-400/90 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                      CV: {item.cvMetric}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{item.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Benign Indicator</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{item.benign}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-800/30 text-xs">
                      <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Malignant Suspicion</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{item.malignant}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
