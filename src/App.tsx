import React, { useState, useEffect } from 'react';
import { Menu, Activity, ShieldCheck, Stethoscope, Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { DetectionPage } from './pages/DetectionPage';
import { AbcdePage } from './pages/AbcdePage';
import { HistoryPage } from './pages/HistoryPage';
import { DermatologistsPage } from './pages/DermatologistsPage';
import { AboutPage } from './pages/AboutPage';
import { MedicalReportModal } from './components/MedicalReportModal';
import { PageTab, SavedScan } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Shared History State
  const [savedScans, setSavedScans] = useState<SavedScan[]>([]);
  const [preloadedScan, setPreloadedScan] = useState<SavedScan | null>(null);

  // Standalone Medical Report Modal for History page
  const [historyReportScan, setHistoryReportScan] = useState<SavedScan | null>(null);

  // Load local storage history on mount
  useEffect(() => {
    const stored = localStorage.getItem('skin_cancer_scans');
    if (stored) {
      try {
        setSavedScans(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse scan history:', e);
      }
    }
  }, []);

  const handleSaveScan = (newScan: SavedScan) => {
    setSavedScans((prev) => {
      const updated = [newScan, ...prev.slice(0, 24)];
      localStorage.setItem('skin_cancer_scans', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteScan = (id: string) => {
    setSavedScans((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      localStorage.setItem('skin_cancer_scans', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setSavedScans([]);
    localStorage.removeItem('skin_cancer_scans');
  };

  const handleLoadScanInStudio = (scan: SavedScan) => {
    setPreloadedScan(scan);
    setActiveTab('detection');
  };

  const handleOpenReportFromHistory = (scan: SavedScan) => {
    setHistoryReportScan(scan);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Persistent Application Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        savedScansCount={savedScans.length}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-68'
        }`}
      >
        {/* Top Header Navigation Bar */}
        <header className="sticky top-0 z-30 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white capitalize">
                {activeTab === 'home'
                  ? 'Home & Skin Health Guide'
                  : activeTab === 'detection'
                  ? 'Skin Cancer Detection Studio'
                  : activeTab === 'abcde'
                  ? 'ABCDE Criteria Guide'
                  : activeTab === 'history'
                  ? 'Detection History & Scans'
                  : activeTab === 'dermatologists'
                  ? 'Bengaluru Dermatologist Directory'
                  : 'About & Clinical Safety'}
              </span>

              <span className="hidden md:inline-block text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                {activeTab === 'detection' ? 'OpenCV · Conv2D' : 'Screening Aid'}
              </span>
            </div>
          </div>

          {/* Quick Header Navigation Shortcuts */}
          <div className="flex items-center gap-2">
            {activeTab !== 'detection' && (
              <button
                onClick={() => setActiveTab('detection')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors shadow-sm cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Screen</span> Lesion
              </button>
            )}

            {activeTab !== 'dermatologists' && (
              <button
                onClick={() => setActiveTab('dermatologists')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                <span>Find Doctors</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}

          {activeTab === 'detection' && (
            <DetectionPage
              onSaveScan={handleSaveScan}
              onNavigate={setActiveTab}
              preloadedScan={preloadedScan}
              onClearPreloadedScan={() => setPreloadedScan(null)}
            />
          )}

          {activeTab === 'abcde' && <AbcdePage onNavigate={setActiveTab} />}

          {activeTab === 'history' && (
            <HistoryPage
              savedScans={savedScans}
              onClearHistory={handleClearHistory}
              onDeleteScan={handleDeleteScan}
              onOpenReport={handleOpenReportFromHistory}
              onLoadScanInStudio={handleLoadScanInStudio}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'dermatologists' && (
            <DermatologistsPage onNavigate={setActiveTab} />
          )}

          {activeTab === 'about' && <AboutPage onNavigate={setActiveTab} />}
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <p className="font-medium text-slate-400">
              Skin Health Studio · Clinical Dermatoscopy & AI Diagnostic Assistant
            </p>
            <p className="text-[11px] text-slate-600">
              For educational, research and triage awareness only. Always consult a certified dermatologist for definitive clinical diagnoses.
            </p>
          </div>
        </footer>
      </div>

      {/* Standalone Medical Report Modal for History item review */}
      {historyReportScan && (
        <MedicalReportModal
          isOpen={true}
          onClose={() => setHistoryReportScan(null)}
          analysis={
            historyReportScan.fullResult || {
              prediction: historyReportScan.prediction,
              probability: historyReportScan.probability,
              malignancyRisk: historyReportScan.malignancyRisk || (historyReportScan.prediction === 'Cancer' ? 'High' : 'Low'),
              confidenceScore: historyReportScan.confidenceScore || 90,
              primaryFinding: historyReportScan.primaryFinding,
              clinicalAction: {
                urgency: historyReportScan.prediction === 'Cancer' ? 'Prompt Clinical Dermoscopy (1-2 weeks)' : 'Routine Periodic Monitoring (6-12 months)',
                recommendation: historyReportScan.prediction === 'Cancer' ? 'Consult a dermatologist for dermoscopy and consideration of excisional biopsy.' : 'Self-monitor monthly using the ABCDE rule.',
                redFlags: historyReportScan.prediction === 'Cancer' ? ['Atypical border pattern', 'Elevated neural network score'] : []
              },
              differentialDiagnosis: [
                {
                  condition: historyReportScan.primaryFinding || historyReportScan.prediction,
                  probability: Math.round(historyReportScan.probability * 100),
                  category: historyReportScan.prediction === 'Cancer' ? 'Malignant' : 'Benign',
                  description: 'Historical scan evaluation.'
                }
              ],
              abcdeCriteria: {
                asymmetry: { score: 'Evaluated', risk: historyReportScan.prediction === 'Cancer' ? 'High' : 'Low', findings: 'Bilateral axis analysis.' },
                border: { score: 'Evaluated', risk: historyReportScan.prediction === 'Cancer' ? 'High' : 'Low', findings: 'Perimeter regularity.' },
                color: { score: 'Evaluated', risk: historyReportScan.prediction === 'Cancer' ? 'High' : 'Low', findings: 'RGB pigment distribution.' },
                diameter: { score: 'Evaluated', risk: 'Low', findings: 'Calculated span.' },
                evolution: { score: 'Reported', risk: 'Low', findings: 'Reported history.' }
              }
            }
          }
          imageSrc={historyReportScan.imageThumbnail}
          patientInfo={{
            id: historyReportScan.id,
            bodyLocation: historyReportScan.bodyLocation,
            notes: historyReportScan.notes || '',
            timestamp: historyReportScan.timestamp,
          }}
        />
      )}
    </div>
  );
}
export default App;
