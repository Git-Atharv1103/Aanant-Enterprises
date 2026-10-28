import React from 'react';
import { Cpu, Zap, CheckCircle2, HelpCircle, FileText, ShieldAlert, Sparkles } from 'lucide-react';
import { CAPABILITIES_DATA } from '../data/companyData';

interface CapabilitiesPageProps {
  onNavigate: (page: string) => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({ onNavigate }) => {
  const { cnc, laser } = CAPABILITIES_DATA;

  return (
    <div className="pt-24 pb-24 bg-gradient-to-b from-[#090d16] via-[#0d1322] to-[#070a10] min-h-screen text-slate-100">
      
      {/* Page Header */}
      <div className="relative py-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 industrial-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Machinery & Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our Manufacturing Capabilities
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Detailed overview of our CNC machining setups and laser cutting operations for custom components and production batches.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Engineering Scope Notice Banner */}
        <div className="p-6 rounded-3xl bg-white/[0.04] border border-brand-blue-electric/30 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-slate-200">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="w-6 h-6 text-brand-blue-electric flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-light leading-relaxed">
              <strong className="font-bold text-white">Transparent Engineering Policy:</strong> Machine specifications, cutting thicknesses, and dimensional tolerances are evaluated strictly against your submitted engineering drawings (DXF, DWG, PDF, STEP) rather than assumed generalities.
            </div>
          </div>
          <button
            onClick={() => onNavigate('custom-request')}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-blue-electric hover:bg-blue-600 transition-colors shadow-glow-blue/20"
          >
            Submit Drawing for Feasibility Check
          </button>
        </div>

        {/* Section A: CNC MACHINING */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue-electric/20 border border-brand-blue-electric/40 text-brand-blue-electric flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-blue-electric font-bold">Section A</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{cnc.title}</h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Computer Numerical Control (CNC) machinery is utilized for computer-controlled manufacturing operations, ensuring high geometric repeatability, concentricity, and strict adherence to drawing notes.
              </p>

              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Confirmed CNC Processes Provided:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                  {cnc.processes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue-electric flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-brand-blue-electric flex-shrink-0 mt-0.5" />
                <span>{cnc.materialsNote}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('custom-request')}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-blue-electric hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Discuss CNC Machining Requirements</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/15 h-64 sm:h-80 relative group bg-black/40">
                <img
                  src="/images/hero-cnc.jpg"
                  alt="Precision CNC Machining in Operation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  High-Precision CNC Milling & Turning
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/15 h-44 relative group bg-black/40">
                <img
                  src="/images/cnc-parts.jpg"
                  alt="Finished CNC Machined Components"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  Precision Cylindrical & Turned Bushings
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Section B: LASER MANUFACTURING */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">Section B</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{laser.title}</h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Laser machinery is utilized for accurate cutting, profiling, and complex contouring of sheet metal and plates without costly die setups, offering quick design turnaround and cleanly finished edges.
              </p>

              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Confirmed Laser Operations Provided:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                  {laser.processes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>{laser.materialsNote}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('custom-request')}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 shadow-glow-orange transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Discuss Laser Cutting Requirements</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/15 h-64 sm:h-80 relative group bg-black/40">
                <img
                  src="/images/laser-action.jpg"
                  alt="Industrial Laser Cutting in Operation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  Thermal Laser Profile Cutting
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/15 h-44 relative group bg-black/40">
                <img
                  src="/images/laser-parts.jpg"
                  alt="Finished Precision Cut Metal Components"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  Narrow-Kerf Cut Sheetmetal Parts
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
