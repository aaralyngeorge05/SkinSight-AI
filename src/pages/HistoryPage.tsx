import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Trash2,
  FileText,
  Activity,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Download,
  Eye,
  Info
} from 'lucide-react';
import { SavedScan, PageTab } from '../types';

interface HistoryPageProps {
  savedScans: SavedScan[];
  onClearHistory: () => void;
  onDeleteScan: (id: string) => void;
  onOpenReport: (scan: SavedScan) => void;
  onLoadScanInStudio: (scan: SavedScan) => void;
  onNavigate: (tab: PageTab) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  savedScans,
  onClearHistory,
  onDeleteScan,
  onOpenReport,
  onLoadScanInStudio,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cancer' | 'benign'>('all');
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid');

  // Filtered list
  const filteredScans = savedScans.filter((scan) => {
    const matchesSearch =
      scan.primaryFinding?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.bodyLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.prediction?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const isCancer = scan.prediction === 'Cancer';
    if (filterType === 'cancer') return matchesSearch && isCancer;
    if (filterType === 'benign') return matchesSearch && !isCancer;
    return matchesSearch;
  });

  const cancerCount = savedScans.filter((s) => s.prediction === 'Cancer').length;
  const benignCount = savedScans.filter((s) => s.prediction === 'Not Cancer').length;

  const handleExportJSON = () => {
    if (savedScans.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedScans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `skin_cancer_scan_history_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Metrics */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Detection History & Archive
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
              {savedScans.length} Scan{savedScans.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse, re-examine, and export clinical PDF reports of your previous lesion evaluations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {savedScans.length > 0 && (
            <>
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/80 transition-colors"
                title="Export history records as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all local scan history?')) {
                    onClearHistory();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 transition-colors"
                title="Clear all stored records"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}

          <button
            onClick={() => onNavigate('detection')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors shadow-sm"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>
        </div>
      </section>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Total Evaluated</span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5 block">{savedScans.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
            <History className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Flagged Cancer / High Risk</span>
            <span className="text-2xl font-bold font-mono text-rose-400 mt-0.5 block">{cancerCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">Evaluated Benign</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-0.5 block">{benignCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by diagnosis, body site, ID..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({savedScans.length})
            </button>
            <button
              onClick={() => setFilterType('cancer')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'cancer'
                  ? 'bg-rose-500/20 text-rose-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cancer ({cancerCount})
            </button>
            <button
              onClick={() => setFilterType('benign')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'benign'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Benign ({benignCount})
            </button>
          </div>

          {/* Layout Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewLayout('grid')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewLayout === 'grid' ? 'bg-slate-800 text-teal-400' : 'text-slate-500'
              }`}
              title="Card View"
            >
              Cards
            </button>
            <button
              onClick={() => setViewLayout('table')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewLayout === 'table' ? 'bg-slate-800 text-teal-400' : 'text-slate-500'
              }`}
              title="Table View"
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Records Display */}
      {filteredScans.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto">
            <History className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-base font-semibold text-slate-300">
            {savedScans.length === 0 ? 'No scans in your history yet' : 'No matching scans found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {savedScans.length === 0
              ? 'When you test a skin lesion in the Detection studio, your results will be automatically saved here for tracking over time.'
              : 'Try clearing your search query or selecting a different filter.'}
          </p>
          {savedScans.length === 0 && (
            <button
              onClick={() => onNavigate('detection')}
              className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Perform Your First Scan</span>
            </button>
          )}
        </div>
      ) : viewLayout === 'grid' ? (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScans.map((scan) => {
            const isCancer = scan.prediction === 'Cancer';

            return (
              <div
                key={scan.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-md group"
              >
                <div className="space-y-3">
                  {/* Top Bar: ID & Time */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono font-semibold text-slate-300">{scan.id}</span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {scan.timestamp}
                    </span>
                  </div>

                  {/* Thumbnail & Key Classification */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                      {scan.imageThumbnail ? (
                        <img
                          src={scan.imageThumbnail}
                          alt="Lesion thumbnail"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Activity className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            isCancer ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {scan.prediction}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {isCancer
                            ? `${Math.round(scan.probability * 100)}% Malignancy`
                            : `${Math.round(scan.probability * 100)}% Cancer Risk`}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate mt-1">
                        {scan.primaryFinding || scan.prediction}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        Site: {scan.bodyLocation || 'Unspecified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onLoadScanInStudio(scan)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-colors"
                      title="Load image into detection studio"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Re-Analyze</span>
                    </button>

                    <button
                      onClick={() => onOpenReport(scan)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 transition-colors"
                      title="Generate and print printable PDF medical report"
                    >
                      <FileText className="w-3 h-3 text-teal-400" />
                      <span>Report</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteScan(scan.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Specimen ID</th>
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">Anatomical Site</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Primary Finding</th>
                  <th className="py-3 px-4">Model Probability</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredScans.map((scan) => {
                  const isCancer = scan.prediction === 'Cancer';
                  return (
                    <tr key={scan.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-300">
                        {scan.id}
                      </td>
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {scan.timestamp}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {scan.bodyLocation || 'Unspecified'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                            isCancer ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {scan.prediction}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">
                        {scan.primaryFinding || scan.prediction}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {Math.round(scan.probability * 100)}%
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onLoadScanInStudio(scan)}
                            className="p-1.5 rounded-lg text-teal-400 hover:bg-slate-800 transition-colors"
                            title="Load in Studio"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onOpenReport(scan)}
                            className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                            title="Print Medical Report"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteScan(scan.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Local Storage Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Local Storage Privacy Guarantee:</strong> All scan records and thumbnails shown on this page are stored strictly in your browser's private <code className="text-teal-400 font-mono">localStorage</code>. No personal clinical scans or identifiers are transmitted to external surveillance databases or permanent cloud storage. Clearing your browser data will remove this history.
        </p>
      </div>
    </div>
  );
};
