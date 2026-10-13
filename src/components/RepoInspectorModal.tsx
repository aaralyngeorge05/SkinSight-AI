import React, { useState } from 'react';
import { GitBranch, Code, Layers, FileText, ExternalLink, X, Copy, Check } from 'lucide-react';

interface RepoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoInfo: any;
}

export const RepoInspectorModal: React.FC<RepoInspectorModalProps> = ({
  isOpen,
  onClose,
  repoInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'model_py' | 'app_py' | 'predictlocally_py' | 'readme'>('architecture');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'model_py'
      ? repoInfo?.codeSnippets?.modelCode || '# model.py'
      : activeTab === 'app_py'
      ? repoInfo?.codeSnippets?.appCode || '# app.py'
      : activeTab === 'predictlocally_py'
      ? `# predictlocally.py\nimport cv2\nimport numpy as np\nfrom keras.models import load_model\n\nimg_size = (224, 224)\nmodel = load_model('skin_cancer_detection_model.h5')\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    if not ret: break\n    img = cv2.resize(frame, img_size)\n    img = np.expand_dims(img, axis=0)\n    img = img / 255.0\n    prediction = model.predict(img)\n    label = 'Cancer' if prediction[0] > 0.5 else 'Non_Cancer'\n    cv2.putText(frame, label, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)\n    cv2.imshow('frame', frame)\n    if cv2.waitKey(1) & 0xFF == ord('q'): break\ncap.release()\ncv2.destroyAllWindows()`
      : repoInfo?.codeSnippets?.readmeText || '# README.md';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-100 text-sm">
                  Cloned Repository Source & Architecture
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Cloned from Git
                </span>
              </div>
              <a
                href={repoInfo?.repositoryUrl || 'https://github.com/deepankarvarma/Skin-Cancer-Detection--OpenCV-TensorFlow-Keras'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-teal-400 transition-colors mt-0.5"
              >
                deepankarvarma / Skin-Cancer-Detection--OpenCV-TensorFlow-Keras
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Neural Architecture
            </button>
            <button
              onClick={() => setActiveTab('model_py')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'model_py'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              model.py
            </button>
            <button
              onClick={() => setActiveTab('app_py')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'app_py'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              app.py
            </button>
            <button
              onClick={() => setActiveTab('predictlocally_py')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'predictlocally_py'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              predictlocally.py
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'readme'
                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              README.md
            </button>
          </div>

          {activeTab !== 'architecture' && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-100 bg-slate-800/80 rounded border border-slate-700/60 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950/60 font-sans">
          {activeTab === 'architecture' ? (
            <div className="space-y-6">
              {/* Architecture overview card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-semibold text-slate-200 mb-1">
                  Keras Conv2D Binary Classification Model
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trained on the Kaggle Skin Cancer Binary Classification Dataset. The network accepts
                  normalized RGB tensors (224×224×3) and outputs a sigmoid probability score representing
                  malignancy likelihood: <code className="text-teal-400 font-mono text-[11px]">&gt; 0.5 = Cancer</code> vs{' '}
                  <code className="text-teal-400 font-mono text-[11px]">&le; 0.5 = Not Cancer</code>.
                </p>
              </div>

              {/* Layer breakdown table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Layer (Type)</th>
                      <th className="py-2.5 px-4 font-semibold">Output Shape</th>
                      <th className="py-2.5 px-4 font-semibold">Param #</th>
                      <th className="py-2.5 px-4 font-semibold font-sans">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {repoInfo?.modelArchitecture?.map((layer: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-2 px-4 text-teal-400 font-medium">{layer.layer}</td>
                        <td className="py-2 px-4 text-slate-400">{layer.outputShape}</td>
                        <td className="py-2 px-4 text-slate-500">{layer.params.toLocaleString()}</td>
                        <td className="py-2 px-4 font-sans text-slate-400 text-[11px]">
                          {idx === 1
                            ? 'Primary low-level texture & edge filters'
                            : idx === 2
                            ? 'Batch normalization stabilizes training'
                            : idx === 4
                            ? 'Extracts mid-level pigment patterns'
                            : idx === 6 || idx === 8
                            ? 'Deep lesion morphology & contour features'
                            : idx === 11
                            ? 'Dropout 0.5 prevents overfitting'
                            : idx === 12
                            ? 'Dense feature integration'
                            : idx === 13
                            ? 'Binary sigmoid output probability'
                            : 'Spatial pooling reduction'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Preprocessing spec */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                    Input Tensor
                  </span>
                  <p className="text-sm font-mono text-slate-200">224 × 224 × 3</p>
                  <p className="text-xs text-slate-500 mt-1">OpenCV Bilinear Interpolation</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                    Value Normalization
                  </span>
                  <p className="text-sm font-mono text-slate-200">[0.0, 1.0]</p>
                  <p className="text-xs text-slate-500 mt-1">Rescaled by 1.0 / 255.0</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                    Decision Threshold
                  </span>
                  <p className="text-sm font-mono text-slate-200">Threshold: 0.50</p>
                  <p className="text-xs text-slate-500 mt-1">Binary crossentropy loss</p>
                </div>
              </div>
            </div>
          ) : (
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
              {currentCode}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
