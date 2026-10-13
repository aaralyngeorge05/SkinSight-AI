import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  HeartHandshake,
  FileCheck2,
  Sparkles,
  HelpCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { PageTab } from '../types';

interface AboutPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Does this platform replace an in-person visit to a dermatologist?',
      a: 'No. This application is an educational pre-screening and observation aid. It uses computer vision algorithms to evaluate visible surface geometry and pattern variance, but it cannot perform histopathological analysis, tissue biopsies, or microscopic cellular reviews. If you are concerned about any skin lesion, always see a licensed medical doctor or certified dermatologist.'
    },
    {
      q: 'Are my uploaded photographs or health notes saved on a cloud server?',
      a: 'Your clinical scan history and photographic thumbnails are stored strictly inside your own device browser local storage (localStorage). Images are processed in-memory during inference and are never saved to public cloud databases, ad networks, or permanent external surveillance systems.'
    },
    {
      q: 'What does a "Cancer Probability" score mean?',
      a: 'In binary skin lesion classification models, the output represents the neural network’s activation level for malignant pattern indicators. A score greater than 50% (> 0.50) indicates the image exhibits atypical features (such as marked border irregularity or pigment asymmetry) frequently found in malignant lesions like melanoma or carcinomas, warranting clinical verification.'
    },
    {
      q: 'What should I do if the AI classifies a lesion as "Not Cancer" but I am still worried?',
      a: 'Trust your instincts and consult a doctor. Automated tools cannot catch 100% of cases, and rare presentations such as amelanotic melanomas (lacking dark pigment) may not display typical computerized markers. Any changing, itching, or bleeding spot requires professional medical evaluation regardless of any software screening score.'
    },
    {
      q: 'What is the ABCDE criteria and why is it used?',
      a: 'The ABCDE criteria is the standard clinical mnemonic used by dermatologists globally: Asymmetry, Border irregularity, Colour variation, Diameter greater than 6mm, and Evolving appearance. It provides an accessible checklist for identifying features that distinguish common benign moles from potential malignancies.'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Philosophy & Ethical Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About & Clinical Safety
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our mission is to empower individuals and healthcare learners with accessible skin awareness tools, dermatological computer vision metrics, and verified regional specialist connections.
          </p>
        </div>
      </section>

      {/* Technology & Architectural Overview */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block">
            Technical Architecture
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Computer Vision & Convolutional Inference</h2>
          <p className="text-xs text-slate-400 mt-0.5">How our dual-pipeline processing extracts objective lesion metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">224×224 Tensor Pipeline</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every dermatoscope photograph undergoes bilinear normalization into an optimal 224×224 tensor format. Pixel channels are min-max scaled to [0, 1] to match the exact mathematical bounds expected by convolutional neural network architectures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">OpenCV Feature Extraction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Local computer vision performs Otsu thresholding, binary segmentation, Sobel gradient edge detection, orthogonal axis asymmetry calculations, circularity compactness, and RGB standard deviation checks to quantify ABCDE criteria.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Deep Conv2D Classifiers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-layer convolutional filters evaluate spatial patterns, reticular pigment nets, and lesion boundaries against ISIC clinical dermatoscopic datasets with a decision threshold calibrated for early sensitivity.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy & Safety Commitments */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Data Privacy Principles</h3>
              <p className="text-xs text-slate-400">Your health records stay in your hands</p>
            </div>
          </div>

          <ul className="text-xs text-slate-300 space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Local-Only Storage:</strong> Scan histories and thumbnails are stored only in your local browser storage.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero User Tracking:</strong> No tracking cookies, behavioral ad pixels, or third-party marketing beacons are embedded.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Full User Control:</strong> You can wipe all stored scan records at any time with a single click in the History tab.</span>
            </li>
          </ul>
        </div>

        <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Ethical AI in Healthcare</h3>
              <p className="text-xs text-slate-400">Responsible technology guidelines</p>
            </div>
          </div>

          <ul className="text-xs text-slate-300 space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Assistive Pre-Screening:</strong> Algorithms support user awareness and clinical triage, never replacing certified medical clinicians.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Transparent Output:</strong> Probabilities and metrics are presented openly with differential alternatives rather than opaque claims.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Always Urge Verification:</strong> Any lesion with atypical symptoms is guided toward certified specialists.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Answers to common questions regarding detection, technology, and health</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-teal-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-850 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Legal & Medical Disclaimer Footer */}
      <section className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Statutory Health & Medical Software Disclaimer</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          This software is engineered as an investigational and educational decision-support tool. It has not been approved as an autonomous medical diagnostic device by FDA, CDSCO, or CE authorities. Machine learning probabilities are subject to camera artifacts, lighting variances, and out-of-distribution presentations. The creators, maintainers, and host infrastructure disclaim any liability for decisions made based on software outputs. If you suspect an abnormal skin lesion, schedule an evaluation with a board-certified dermatologist.
        </p>
      </section>
    </div>
  );
};
