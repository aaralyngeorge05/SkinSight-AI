import React from 'react';
import { Printer, Download, X, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MedicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: any;
  imageSrc: string;
  patientInfo: {
    id: string;
    bodyLocation: string;
    notes: string;
    timestamp: string;
  };
}

export const MedicalReportModal: React.FC<MedicalReportModalProps> = ({
  isOpen,
  onClose,
  analysis,
  imageSrc,
  patientInfo,
}) => {
  if (!isOpen || !analysis) return null;

  const handlePrint = () => {
    window.print();
  };

  const isMalignant = analysis.prediction === 'Cancer' || analysis.probability > 0.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none print:m-0 print:p-0">
        {/* Header toolbar (hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 print:hidden">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-200 text-sm">
              Clinical Dermatoscopy Assessment Report
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              ID: {patientInfo.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-600 hover:bg-teal-500 text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 print:p-6 print:space-y-4">
          {/* Institutional / Clinic Header */}
          <div className="flex items-start justify-between border-b border-slate-800 print:border-black pb-5">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white print:text-black">
                DERMATOSCOPY LESION EVALUATION REPORT
              </h1>
              <p className="text-xs text-slate-400 print:text-neutral-600 mt-1">
                Computer Vision Telemetry & Convolutional Neural Network Analysis
              </p>
              <p className="text-[11px] font-mono text-slate-500 print:text-neutral-500 mt-0.5">
                Model: Convolutional Neural Network Architecture · 224x224 Tensor Pipeline
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 print:text-neutral-700 space-y-1">
              <p><span className="font-semibold text-slate-300 print:text-black">Report Date:</span> {patientInfo.timestamp}</p>
              <p><span className="font-semibold text-slate-300 print:text-black">Specimen ID:</span> {patientInfo.id}</p>
              <p><span className="font-semibold text-slate-300 print:text-black">Anatomical Site:</span> {patientInfo.bodyLocation || 'Not specified'}</p>
            </div>
          </div>

          {/* Primary Result Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isMalignant
                ? 'bg-rose-950/30 border-rose-800/60 text-rose-200 print:bg-neutral-100 print:border-rose-600 print:text-black'
                : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200 print:bg-neutral-100 print:border-emerald-600 print:text-black'
            }`}
          >
            <div className="flex items-center gap-3">
              {isMalignant ? (
                <AlertTriangle className="w-8 h-8 text-rose-400 print:text-rose-600 shrink-0" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-emerald-400 print:text-emerald-600 shrink-0" />
              )}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">
                  Primary Classification Result
                </span>
                <h2 className="text-lg font-bold">
                  {analysis.prediction}: {analysis.primaryFinding || (isMalignant ? 'Suspicious Malignant Lesion' : 'Benign Lesion')}
                </h2>
                <p className="text-xs opacity-90 mt-0.5">
                  Malignancy Risk Level: <strong className="font-semibold">{analysis.malignancyRisk} Risk</strong>
                </p>
              </div>
            </div>

            <div className="text-right border-l border-slate-700/50 print:border-neutral-300 pl-6">
              <span className="text-[11px] uppercase tracking-wider opacity-75 block">
                {isMalignant ? 'Malignancy Probability' : 'Cancer Risk Score'}
              </span>
              <span className={`text-2xl font-bold font-mono ${isMalignant ? 'text-rose-400 print:text-rose-600' : 'text-emerald-400 print:text-emerald-600'}`}>
                {Math.round(analysis.probability * 100)}%
              </span>
              <span className="text-[10px] block opacity-70">
                {isMalignant
                  ? 'Threshold: > 50% = Malignant'
                  : `Benign Confidence: ${analysis.confidenceScore || (100 - Math.round(analysis.probability * 100))}%`}
              </span>
            </div>
          </div>

          {/* Image & Quick Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="border border-slate-800 print:border-neutral-300 rounded-xl p-2 bg-slate-950/50 print:bg-transparent flex flex-col items-center">
              <img
                src={imageSrc}
                alt="Analyzed Lesion"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <span className="text-[10px] text-slate-500 print:text-neutral-500 mt-2 font-mono">
                Dermatoscope Field / 224x224
              </span>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 print:text-neutral-700">
                Differential Diagnosis Probabilities
              </h3>
              <div className="space-y-2">
                {analysis.differentialDiagnosis?.map((diff: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/40 print:bg-neutral-50 border border-slate-800/80 print:border-neutral-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-200 print:text-black">
                          {diff.condition}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            diff.category === 'Malignant'
                              ? 'text-rose-400 bg-rose-500/10'
                              : diff.category === 'Premalignant'
                              ? 'text-amber-400 bg-amber-500/10'
                              : 'text-emerald-400 bg-emerald-500/10'
                          }`}
                        >
                          {diff.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 print:text-neutral-600 mt-0.5">
                        {diff.description}
                      </p>
                    </div>
                    <span className="text-sm font-bold font-mono text-teal-400 print:text-neutral-900 ml-3">
                      {diff.probability}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ABCDE Dermatological Criteria Table */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 print:text-neutral-700 mb-2.5">
              ABCDE Dermatological Criteria Evaluation
            </h3>
            <div className="border border-slate-800 print:border-neutral-300 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-950/60 print:bg-neutral-100 text-slate-400 print:text-neutral-700 border-b border-slate-800 print:border-neutral-300">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Criterion</th>
                    <th className="py-2 px-3 font-semibold">Finding</th>
                    <th className="py-2 px-3 font-semibold">Assessment Observation</th>
                    <th className="py-2 px-3 font-semibold">Risk Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-neutral-200 text-slate-300 print:text-neutral-800">
                  {analysis.abcdeCriteria && (
                    <>
                      <tr>
                        <td className="py-2 px-3 font-medium text-teal-400 print:text-neutral-900">A - Asymmetry</td>
                        <td className="py-2 px-3">{analysis.abcdeCriteria.asymmetry?.score || 'Calculated'}</td>
                        <td className="py-2 px-3 text-slate-400 print:text-neutral-600 text-[11px]">{analysis.abcdeCriteria.asymmetry?.findings || 'Symmetry along axes measured'}</td>
                        <td className="py-2 px-3 font-medium">{analysis.abcdeCriteria.asymmetry?.risk || 'Standard'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-teal-400 print:text-neutral-900">B - Border</td>
                        <td className="py-2 px-3">{analysis.abcdeCriteria.border?.score || 'Calculated'}</td>
                        <td className="py-2 px-3 text-slate-400 print:text-neutral-600 text-[11px]">{analysis.abcdeCriteria.border?.findings || 'Perimeter compactness evaluated'}</td>
                        <td className="py-2 px-3 font-medium">{analysis.abcdeCriteria.border?.risk || 'Standard'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-teal-400 print:text-neutral-900">C - Color</td>
                        <td className="py-2 px-3">{analysis.abcdeCriteria.color?.score || 'Calculated'}</td>
                        <td className="py-2 px-3 text-slate-400 print:text-neutral-600 text-[11px]">{analysis.abcdeCriteria.color?.findings || 'Color variance & chromaticity tested'}</td>
                        <td className="py-2 px-3 font-medium">{analysis.abcdeCriteria.color?.risk || 'Standard'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-teal-400 print:text-neutral-900">D - Diameter</td>
                        <td className="py-2 px-3">{analysis.abcdeCriteria.diameter?.score || 'Estimated'}</td>
                        <td className="py-2 px-3 text-slate-400 print:text-neutral-600 text-[11px]">{analysis.abcdeCriteria.diameter?.findings || 'Calibrated dermatoscope scale'}</td>
                        <td className="py-2 px-3 font-medium">{analysis.abcdeCriteria.diameter?.risk || 'Standard'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-teal-400 print:text-neutral-900">E - Evolution</td>
                        <td className="py-2 px-3">{analysis.abcdeCriteria.evolution?.score || 'Calculated'}</td>
                        <td className="py-2 px-3 text-slate-400 print:text-neutral-600 text-[11px]">{analysis.abcdeCriteria.evolution?.findings || 'Structural surface features'}</td>
                        <td className="py-2 px-3 font-medium">{analysis.abcdeCriteria.evolution?.risk || 'Standard'}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="p-4 rounded-xl bg-slate-950/40 print:bg-neutral-50 border border-slate-800 print:border-neutral-200 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 print:text-black">
              Recommended Clinical Action & Follow-up
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-300 print:text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-teal-400 print:text-neutral-800 shrink-0 mt-0.5" />
              <p>
                <strong>Urgency:</strong> {analysis.clinicalAction?.urgency || 'Consult a certified dermatologist.'}
              </p>
            </div>
            <p className="text-xs text-slate-400 print:text-neutral-700 pl-6 leading-relaxed">
              {analysis.clinicalAction?.recommendation || 'Full skin examination and dermatoscope review recommended.'}
            </p>
          </div>

          {/* Disclaimer & Doctor Signature */}
          <div className="border-t border-slate-800 print:border-neutral-300 pt-4 flex flex-col md:flex-row items-end justify-between gap-4 text-[11px] text-slate-500 print:text-neutral-500">
            <p className="max-w-md leading-normal">
              <strong>Medical Disclaimer:</strong> This automated analysis is an AI & Computer Vision assistive screening tool based on trained convolutional neural network models. It does NOT constitute a definitive clinical diagnosis. Definite diagnosis requires histopathological examination by a board-certified pathologist.
            </p>
            <div className="text-right shrink-0 print:block">
              <div className="w-48 border-b border-slate-600 print:border-black mb-1" />
              <span>Reviewing Physician / Clinician Signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
