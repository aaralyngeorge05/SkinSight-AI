import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Camera,
  FileText,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Layers,
  Activity,
  Maximize2,
  Sliders,
  History,
  Trash2,
  ChevronRight,
  Info,
  Clock,
  Globe,
  Link as LinkIcon,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { processLesionImageWithCV, CVAnalysisResult } from '../utils/cvEngine';
import { SAMPLE_CASES, SampleCase } from '../data/sampleCases';
import { CameraCaptureModal } from '../components/CameraCaptureModal';
import { MedicalReportModal } from '../components/MedicalReportModal';
import { SavedScan, PageTab } from '../types';

interface DetectionPageProps {
  onSaveScan: (scan: SavedScan) => void;
  onNavigate: (tab: PageTab) => void;
  preloadedScan?: SavedScan | null;
  onClearPreloadedScan?: () => void;
}

export const DetectionPage: React.FC<DetectionPageProps> = ({
  onSaveScan,
  onNavigate,
  preloadedScan,
  onClearPreloadedScan,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('case-melanoma-1');
  const [bodyLocation, setBodyLocation] = useState<string>('Upper Back');
  const [patientNotes, setPatientNotes] = useState<string>('Patient reports lesion darkening over last 4 months.');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [cvResult, setCvResult] = useState<CVAnalysisResult | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'original' | 'tensor' | 'contour' | 'mask' | 'heatmap'>('original');

  // Input states & Modals
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis function
  const runAnalysisOnImage = async (imageSrc: string, locationStr = bodyLocation, notesStr = patientNotes) => {
    setIsAnalyzing(true);
    setSelectedImage(imageSrc);
    // Switch to original view immediately so the user sees the new photo
    setViewMode('original');

    try {
      // 1. Process client-side computer vision (OpenCV pipeline)
      const img = new Image();
      img.crossOrigin = 'anonymous';

      // Load image reliably with safety timeout so it never hangs
      await new Promise<boolean>((resolve) => {
        let isDone = false;
        const done = () => {
          if (!isDone) {
            isDone = true;
            resolve(true);
          }
        };
        img.onload = done;
        img.onerror = done;
        img.src = imageSrc;
        if (img.complete && img.naturalWidth > 0) {
          done();
        }
        setTimeout(done, 300);
      });

      const cv = await processLesionImageWithCV(img);
      setCvResult(cv);

      // 2. Call server-side analysis route with the 224x224 normalized JPEG tensor
      const response = await fetch('/api/analyze-lesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: cv.resizedDataUrl,
          cvMetrics: cv.metrics,
          bodyLocation: locationStr,
          lesionHistory: notesStr,
        }),
      });

      const data = await response.json();
      setAnalysisResult(data);

      // Add to local history
      const newScan: SavedScan = {
        id: `SC-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
        imageThumbnail: cv.resizedDataUrl,
        prediction: data.prediction,
        probability: data.probability,
        bodyLocation: locationStr || 'Unspecified',
        primaryFinding: data.primaryFinding || data.prediction,
        confidenceScore: data.confidenceScore,
        malignancyRisk: data.malignancyRisk,
        notes: notesStr,
        fullResult: data,
      };

      onSaveScan(newScan);
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedCaseId(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        runAnalysisOnImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value so user can upload the same or another photo repeatedly
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setSelectedCaseId(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        runAnalysisOnImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleCase) => {
    setSelectedCaseId(sample.id);
    setBodyLocation(sample.location);
    setPatientNotes(sample.clinicalDescription);
    runAnalysisOnImage(sample.svgDataUri, sample.location, sample.clinicalDescription);
  };

  const handleCameraCapture = (dataUrl: string) => {
    setSelectedCaseId(null);
    runAnalysisOnImage(dataUrl);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setSelectedCaseId(null);
    runAnalysisOnImage(urlInput.trim());
    setShowUrlInput(false);
    setUrlInput('');
  };

  // Preloaded scan handler from history or mount
  useEffect(() => {
    if (preloadedScan && preloadedScan.imageThumbnail) {
      setSelectedCaseId(null);
      setBodyLocation(preloadedScan.bodyLocation || 'Unspecified');
      setPatientNotes(preloadedScan.notes || '');
      runAnalysisOnImage(preloadedScan.imageThumbnail, preloadedScan.bodyLocation, preloadedScan.notes || '');
      if (onClearPreloadedScan) onClearPreloadedScan();
    } else if (!selectedImage) {
      // Run initial default sample
      runAnalysisOnImage(SAMPLE_CASES[0].svgDataUri, 'Upper Back', 'Patient reports lesion darkening over last 4 months.');
    }
  }, [preloadedScan]);

  // Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setSelectedCaseId(null);
            const reader = new FileReader();
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string;
              if (dataUrl) runAnalysisOnImage(dataUrl);
            };
            reader.readAsDataURL(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Active display image based on view mode
  const currentDisplayImage =
    viewMode === 'tensor' && cvResult
      ? cvResult.resizedDataUrl
      : viewMode === 'contour' && cvResult
      ? cvResult.contourDataUrl
      : viewMode === 'mask' && cvResult
      ? cvResult.maskDataUrl
      : viewMode === 'heatmap' && cvResult
      ? cvResult.heatmapDataUrl
      : selectedImage;

  const isMalignant = analysisResult?.prediction === 'Cancer';

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner Notice: Screening Aid Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-200 block font-semibold">
              Screening Aid Notice & Diagnostic Boundary
            </strong>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              This convolutional neural network analysis serves as a preliminary feature observation aid, NOT a medical biopsy diagnosis. Any suspicious, enlarging, or bleeding lesion should be evaluated in person by a certified dermatologist.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('dermatologists')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 shrink-0 transition-colors cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-teal-400" />
          <span>Specialists in Bengaluru</span>
        </button>
      </div>

      {/* 2-Column Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Input & Computer Vision Canvas (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Image Canvas Box */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Lesion Dermatoscope Viewer
                </span>
              </div>
              {isAnalyzing && (
                <div className="flex items-center gap-1.5 text-[11px] text-teal-400 font-mono">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Processing Tensor...</span>
                </div>
              )}
            </div>

            {/* Canvas Display Viewport */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative bg-slate-950 aspect-square w-full flex items-center justify-center p-4 overflow-hidden"
            >
              {currentDisplayImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={currentDisplayImage}
                    alt="Skin Lesion"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-md transition-all duration-300"
                  />

                  {/* Overlay info tag */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono bg-slate-950/80 backdrop-blur-sm text-teal-400 px-2 py-0.5 rounded border border-slate-800">
                    Mode: {viewMode.toUpperCase()} {viewMode === 'tensor' && '(224×224)'}
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 text-slate-500">
                  <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No image loaded</p>
                </div>
              )}
            </div>

            {/* OpenCV Visualization View Mode Switcher */}
            <div className="p-2.5 bg-slate-950/70 border-t border-slate-800 grid grid-cols-5 gap-1 text-[11px] font-medium text-slate-400">
              <button
                onClick={() => setViewMode('original')}
                className={`py-1.5 px-2 rounded-lg transition-all ${
                  viewMode === 'original'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="View original high-res picture"
              >
                Original
              </button>

              <button
                onClick={() => setViewMode('tensor')}
                disabled={!cvResult}
                className={`py-1.5 px-2 rounded-lg transition-all disabled:opacity-40 ${
                  viewMode === 'tensor'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="View 224x224 Bilinear normalized tensor input"
              >
                224×224
              </button>

              <button
                onClick={() => setViewMode('contour')}
                disabled={!cvResult}
                className={`py-1.5 px-2 rounded-lg transition-all disabled:opacity-40 ${
                  viewMode === 'contour'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="View OpenCV contour boundary & bounding box"
              >
                Contour
              </button>

              <button
                onClick={() => setViewMode('mask')}
                disabled={!cvResult}
                className={`py-1.5 px-2 rounded-lg transition-all disabled:opacity-40 ${
                  viewMode === 'mask'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="View Otsu binary threshold segmentation"
              >
                Mask
              </button>

              <button
                onClick={() => setViewMode('heatmap')}
                disabled={!cvResult}
                className={`py-1.5 px-2 rounded-lg transition-all disabled:opacity-40 ${
                  viewMode === 'heatmap'
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30'
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
                title="View Grad-CAM style activation attention heatmap"
              >
                Attention
              </button>
            </div>
          </div>

          {/* Image Input Options Row */}
          <div className="grid grid-cols-3 gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-sm group cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
              Upload File
            </button>

            <button
              onClick={() => setIsCameraOpen(true)}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-sm group cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              Live Camera
            </button>

            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                showUrlInput
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-900 hover:bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              Image URL
            </button>
          </div>

          {/* URL Input Bar */}
          {showUrlInput && (
            <form onSubmit={handleUrlSubmit} className="p-3 rounded-xl bg-slate-900 border border-teal-500/40 space-y-2">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Paste Dermatoscope Image URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/lesion.jpg"
                  required
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Load & Analyze
                </button>
              </div>
            </form>
          )}

          <div className="text-[11px] text-slate-500 px-1 flex items-center justify-between">
            <span>💡 Tip: You can also paste photos directly using <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Ctrl+V</kbd></span>
          </div>

          {/* Metadata & Anatomical Site */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300">
              Clinical Context & Anatomical Site
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Body Location</label>
                <select
                  value={bodyLocation}
                  onChange={(e) => setBodyLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                >
                  <option value="Upper Back">Upper Back / Thorax</option>
                  <option value="Lower Back">Lower Back / Lumbar</option>
                  <option value="Face / Nose">Face / Nose / Cheek</option>
                  <option value="Forearm / Hand">Forearm / Hand</option>
                  <option value="Lower Leg">Lower Leg / Thigh</option>
                  <option value="Chest">Chest / Sternum</option>
                  <option value="Abdomen">Abdomen</option>
                  <option value="Scalp / Neck">Scalp / Neck</option>
                  <option value="Other">Other Anatomical Site</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Observation History</label>
                <input
                  type="text"
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="e.g. Enlarging, itchiness, bleeding"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <button
              onClick={() => selectedImage && runAnalysisOnImage(selectedImage)}
              disabled={isAnalyzing}
              className="w-full py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'Evaluating Lesion...' : 'Re-Run Model Evaluation'}
            </button>
          </div>

          {/* Sample Lesions Gallery */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Verified ISIC Clinical Sample Cases
              </span>
              <span className="text-[11px] text-slate-500">Click any card to test immediately</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SAMPLE_CASES.map((sample) => {
                const isSelected = selectedCaseId === sample.id;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center group relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-slate-850 border-teal-400 ring-2 ring-teal-500/30 shadow-lg shadow-teal-950/30'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                    }`}
                  >
                    <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg bg-black">
                      <img
                        src={sample.svgDataUri}
                        alt={sample.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500 text-slate-950 shadow">
                          {isAnalyzing ? 'ANALYZING...' : 'ACTIVE'}
                        </div>
                      )}
                    </div>
                    <div className="w-full text-left">
                      <p className="text-[11px] font-semibold text-slate-200 truncate">
                        {sample.name}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span
                          className={`font-semibold ${
                            sample.groundTruth === 'Cancer' ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {sample.groundTruth}
                        </span>
                        <span className="text-slate-500">{sample.category}</span>
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 w-full text-center">
                        <span className={`text-[10px] font-medium block ${isSelected ? 'text-teal-400 font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                          {isSelected ? '✓ Selected Case' : 'Click to Test →'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Model Output & Clinical Differential (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {analysisResult ? (
            <>
              {/* Primary Model Classification Banner */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isMalignant
                    ? 'bg-rose-950/30 border-rose-800/60 shadow-lg shadow-rose-950/20'
                    : 'bg-emerald-950/30 border-emerald-800/60 shadow-lg shadow-emerald-950/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        isMalignant ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {isMalignant ? (
                        <AlertTriangle className="w-7 h-7" />
                      ) : (
                        <ShieldCheck className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider font-semibold opacity-75">
                          Binary Conv2D Classifier (pred &gt; 0.5)
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            isMalignant ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {analysisResult.malignancyRisk} Malignancy Risk
                        </span>
                      </div>
                      <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                        {analysisResult.prediction}: {analysisResult.primaryFinding}
                      </h2>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {analysisResult.clinicalAction?.urgency}
                      </p>
                    </div>
                  </div>

                  {/* Probability Counter Box */}
                  <div className="sm:text-right sm:border-l border-slate-700/50 sm:pl-6 shrink-0">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">
                      {isMalignant ? 'Malignancy Probability' : 'Cancer Risk Score'}
                    </span>
                    <div className="flex items-baseline sm:justify-end gap-1 mt-0.5">
                      <span className={`text-3xl font-bold font-mono ${isMalignant ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {Math.round(analysisResult.probability * 100)}
                      </span>
                      <span className="text-sm font-mono text-slate-400">%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                      {isMalignant
                        ? 'High Risk (> 50% Threshold)'
                        : `Benign Confidence: ${analysisResult.confidenceScore || (100 - Math.round(analysisResult.probability * 100))}%`}
                    </span>
                  </div>
                </div>

                {/* Quick Action Button to Export Report */}
                <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300">
                    Need a physical copy for clinical consultation?
                  </span>
                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-sm cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export Printable Report</span>
                  </button>
                </div>
              </div>

              {/* Differential Diagnosis Probabilities */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Differential Diagnosis Probabilities
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Histopathological probability across ISIC dermatological classes
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    ISIC Multi-Class
                  </span>
                </div>

                <div className="space-y-3">
                  {analysisResult.differentialDiagnosis?.map((diff: any, idx: number) => {
                    const isMalignantClass = diff.category === 'Malignant';
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-200">{diff.condition}</span>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                isMalignantClass
                                  ? 'bg-rose-500/20 text-rose-300'
                                  : diff.category === 'Premalignant'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              {diff.category}
                            </span>
                          </div>
                          <span className="font-mono text-slate-300 font-bold">{diff.probability}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isMalignantClass
                                ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                                : 'bg-gradient-to-r from-teal-500 to-emerald-400'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(5, diff.probability))}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{diff.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ABCDE Dermatological Criteria Scorecard */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      ABCDE Dermatological Evaluation
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate('abcde')}
                    className="text-[11px] text-teal-400 hover:text-teal-300 flex items-center gap-0.5 cursor-pointer font-medium"
                  >
                    <span>View ABCDE Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* A: Asymmetry */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center">
                          A
                        </span>
                        Asymmetry
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          analysisResult.abcdeCriteria?.asymmetry?.risk === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : analysisResult.abcdeCriteria?.asymmetry?.risk === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {analysisResult.abcdeCriteria?.asymmetry?.score || 'Evaluated'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                      {analysisResult.abcdeCriteria?.asymmetry?.findings || 'Bilateral axis comparison'}
                    </p>
                    {cvResult && (
                      <span className="text-[10px] font-mono text-slate-500 block">
                        OpenCV Asymmetry Index: {cvResult.metrics.asymmetryScore}%
                      </span>
                    )}
                  </div>

                  {/* B: Border */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center">
                          B
                        </span>
                        Border
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          analysisResult.abcdeCriteria?.border?.risk === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : analysisResult.abcdeCriteria?.border?.risk === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {analysisResult.abcdeCriteria?.border?.score || 'Evaluated'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                      {analysisResult.abcdeCriteria?.border?.findings || 'Perimeter irregularity inspection'}
                    </p>
                    {cvResult && (
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Circularity Compactness: {cvResult.metrics.borderIrregularity}%
                      </span>
                    )}
                  </div>

                  {/* C: Color */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center">
                          C
                        </span>
                        Color
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          analysisResult.abcdeCriteria?.color?.risk === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : analysisResult.abcdeCriteria?.color?.risk === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {analysisResult.abcdeCriteria?.color?.score || 'Evaluated'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                      {analysisResult.abcdeCriteria?.color?.findings || 'RGB channel distribution variance'}
                    </p>
                    {cvResult && (
                      <span className="text-[10px] font-mono text-slate-500 block">
                        RGB Variance StdDev: {cvResult.metrics.colorVariance}%
                      </span>
                    )}
                  </div>

                  {/* D: Diameter */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center">
                          D
                        </span>
                        Diameter
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          analysisResult.abcdeCriteria?.diameter?.risk === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {analysisResult.abcdeCriteria?.diameter?.score || 'Measured'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                      {analysisResult.abcdeCriteria?.diameter?.findings || 'Calculated lesion bounding diameter'}
                    </p>
                    {cvResult && (
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Estimated Bounding Span: ~{cvResult.metrics.estimatedDiameterMm} mm
                      </span>
                    )}
                  </div>

                  {/* E: Evolution (Full Width) */}
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center">
                          E
                        </span>
                        Evolution & Clinical Symptoms
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          analysisResult.abcdeCriteria?.evolution?.risk === 'High'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {analysisResult.abcdeCriteria?.evolution?.score || 'Reported'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-snug">
                      {analysisResult.abcdeCriteria?.evolution?.findings || 'Patient-reported historical observation'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinical Next Steps & Red Flags Banner */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Recommended Clinical Next Steps
                  </h3>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-200 font-medium">
                    {analysisResult.clinicalAction?.recommendation}
                  </p>
                  {analysisResult.clinicalAction?.redFlags?.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-semibold text-rose-400 block mb-1">
                        Observable Red Flags Detected:
                      </span>
                      <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                        {analysisResult.clinicalAction.redFlags.map((flag: string, i: number) => (
                          <li key={i}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
              <h3 className="text-base font-semibold text-slate-200">
                Evaluating Skin Lesion Tensor...
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Running 224x224 bilinear normalization, Otsu segmentation, and convolutional neural inference.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Modals */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <MedicalReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        analysis={analysisResult}
        imageSrc={selectedImage || ''}
        patientInfo={{
          id: `SPEC-${Math.floor(100000 + Math.random() * 900000)}`,
          bodyLocation,
          notes: patientNotes,
          timestamp: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }}
      />
    </div>
  );
};
