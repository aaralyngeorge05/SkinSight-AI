import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building2,
  Stethoscope,
  Sparkles,
  Compass,
  CalendarCheck
} from 'lucide-react';
import { BENGALURU_DERMATOLOGY_CENTERS } from '../data/dermatologistsData';
import { PageTab } from '../types';

interface DermatologistsPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const DermatologistsPage: React.FC<DermatologistsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [onlyOncology, setOnlyOncology] = useState(false);

  const zones = ['All', 'South', 'North', 'East', 'Central'];

  const filteredCenters = BENGALURU_DERMATOLOGY_CENTERS.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesZone = selectedZone === 'All' || center.zone === selectedZone;
    const matchesOncology = !onlyOncology || center.hasOncologySpecialist;

    return matchesSearch && matchesZone && matchesOncology;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Bengaluru, Karnataka · Verified Medical Centers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find a Dermatologist & Skin Cancer Specialist
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            If you or an AI screening tool notice an atypical, bleeding, or rapidly changing skin lesion, professional in-person dermoscopy and histopathologic examination are essential. Explore verified hospital dermatology departments across Bengaluru.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.practo.com/bangalore/dermatologist"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors shadow-sm"
            >
              <span>Search Verified Doctors on Practo (Bengaluru)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.google.com/maps/search/Dermatology+hospital+Bengaluru+Karnataka/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Open in Google Maps Nearby</span>
            </a>
          </div>
        </div>
      </section>

      {/* Advisory Note */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3.5 text-xs text-amber-200/90">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-100 font-semibold block">Important Appointment Notice:</strong>
          <p className="leading-relaxed text-[11px] text-amber-200/80">
            Hospital OPD timings and doctor availability vary by day. Please call the official hospital desk or access their online booking portal to confirm specialist schedules before traveling. In cases of spontaneous bleeding or acute symptoms, visit the hospital emergency triage or urgent care department.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hospital, area (e.g. Koramangala, Hebbal)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Zone Chips */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 px-2 uppercase">Zone:</span>
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedZone === zone
                    ? 'bg-slate-800 text-teal-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>

          {/* Oncology Filter Toggle */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700">
            <input
              type="checkbox"
              checked={onlyOncology}
              onChange={(e) => setOnlyOncology(e.target.checked)}
              className="rounded text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700 cursor-pointer"
            />
            <span>Dermato-Oncology Specialty Only</span>
          </label>
        </div>
      </div>

      {/* Hospital / Clinic Directory Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing {filteredCenters.length} verified hospitals in Bengaluru</span>
          <span>Click phone number to call directly</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-md group"
            >
              <div className="space-y-3">
                {/* Type & Oncology Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {center.type} · {center.zone} Zone
                  </span>

                  {center.hasOncologySpecialist ? (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Skin Cancer / Oncology Dept
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400">
                      General Dermatology
                    </span>
                  )}
                </div>

                {/* Hospital Name & Department */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {center.name}
                  </h3>
                  <p className="text-xs font-medium text-teal-400 mt-0.5">
                    {center.department}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {center.description}
                </p>

                {/* Specialties Chips */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-300 block">
                    Relevant Services & Procedures:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {center.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Address & Official Phone */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-start gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{center.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 font-mono">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a
                      href={`tel:${center.phone.replace(/[^0-9]/g, '')}`}
                      className="hover:text-emerald-400 hover:underline transition-colors text-xs font-semibold"
                    >
                      {center.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <a
                  href={center.appointmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-sm"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book Appointment Portal</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <a
                  href={center.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors"
                  title="Visit official department webpage"
                >
                  <Building2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
