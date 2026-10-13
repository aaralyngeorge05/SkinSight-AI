import React from 'react';
import {
  Home,
  Activity,
  BookOpen,
  History,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PlusCircle,
  X,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { PageTab } from '../types';

interface SidebarProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  savedScansCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  savedScansCount,
}) => {
  const navItems: Array<{
    id: PageTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    description: string;
  }> = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      description: 'Overview & Prevention Guide',
    },
    {
      id: 'detection',
      label: 'Skin Cancer Detection',
      icon: Activity,
      badge: 'AI Studio',
      description: 'OpenCV & CNN Lesion Screening',
    },
    {
      id: 'abcde',
      label: 'ABCDE Criteria',
      icon: BookOpen,
      description: 'Clinical Dermatological Rules',
    },
    {
      id: 'history',
      label: 'Detection History',
      icon: History,
      badge: savedScansCount > 0 ? savedScansCount : undefined,
      description: 'Saved Local Scans & Reports',
    },
    {
      id: 'dermatologists',
      label: 'Find a Dermatologist',
      icon: MapPin,
      badge: 'Bengaluru',
      description: 'Verified Hospitals & Specialists',
    },
    {
      id: 'about',
      label: 'About & Safety',
      icon: ShieldCheck,
      description: 'Technology, Privacy & Ethics',
    },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out ${
          isMobileOpen
            ? 'translate-x-0 w-72'
            : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-20' : 'lg:w-68'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
          <div
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-3 cursor-pointer overflow-hidden ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md shadow-teal-500/20 shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="font-bold text-sm tracking-tight text-white block truncate">
                  Skin Health Studio
                </span>
                <span className="text-[10px] font-mono text-teal-400 block truncate">
                  AI Screening & Guidance
                </span>
              </div>
            )}
          </div>

          {/* Close Button on Mobile */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className={`p-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <button
            onClick={() => handleNavClick('detection')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm ${
              activeTab === 'detection'
                ? 'bg-teal-500 text-slate-950 shadow-teal-500/20'
                : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title="Start New Lesion Scan"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Check a Skin Lesion</span>}
          </button>
        </div>

        {/* Main Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={isCollapsed ? `${item.label} - ${item.description}` : undefined}
              >
                <div
                  className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                    isActive
                      ? 'bg-teal-500 text-slate-950'
                      : 'bg-slate-850 text-slate-400 group-hover:text-teal-400 group-hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                            isActive
                              ? 'bg-teal-500/30 text-teal-200'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate group-hover:text-slate-400">
                      {item.description}
                    </span>
                  </div>
                )}

                {/* Collapsed Active Indicator Pill */}
                {isCollapsed && isActive && (
                  <span className="absolute right-1 w-1 h-5 bg-teal-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Safety Disclaimer & Collapse Bar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
          {!isCollapsed && (
            <div className="p-2.5 rounded-xl bg-slate-850/80 border border-slate-800 text-[11px] text-slate-400 leading-tight">
              <div className="flex items-center gap-1.5 text-teal-400 font-semibold mb-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Screening Aid Notice</span>
              </div>
              <p className="text-[10px] text-slate-400">
                AI results are for triage observation only, not a definitive biopsy diagnosis.
              </p>
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-full items-center justify-center gap-2 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
