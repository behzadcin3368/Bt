import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Shield, Smartphone, Globe, MessageSquarePlus, AlertTriangle } from 'lucide-react';
import { t } from '../utils/translations';

export const Navbar: React.FC = () => {
  const { 
    lang, 
    setLang, 
    devices, 
    selectedDeviceId, 
    setSelectedDeviceId,
    setIsSendSmsOpen,
    activeTab,
    setActiveTab
  } = useDashboard();

  const labels = t[lang];
  const selectedDev = devices.find(d => d.id === selectedDeviceId);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Shield className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white font-mono">
          BTMOB<span className="text-cyan-400 font-sans text-sm font-semibold ml-1 mr-1">CONSOLE</span>
        </span>
      </div>

      {/* Zone 2: 4-6 clean text navigation links (single line, no pills) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'overview' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          {labels.navOverview}
        </button>
        <button 
          onClick={() => setActiveTab('devices')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'devices' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          {labels.navDevices}
        </button>
        <button 
          onClick={() => setActiveTab('remote-screen')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'remote-screen' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          {labels.navRemoteScreen}
        </button>
        <button 
          onClick={() => setActiveTab('sms-calls')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'sms-calls' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          {labels.navSmsCalls}
        </button>
        <button 
          onClick={() => setActiveTab('threat-intel')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'threat-intel' ? 'text-cyan-400 font-semibold' : ''}`}
        >
          {labels.navThreatIntel}
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Device selector */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
          <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <select 
            aria-label="Target Device Selector"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="bg-transparent text-slate-200 outline-none text-xs font-mono max-w-[130px] lg:max-w-[180px] truncate cursor-pointer"
          >
            {devices.map(d => (
              <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">
                {d.name} ({d.id})
              </option>
            ))}
          </select>
        </div>

        {/* Action: Send SMS modal trigger */}
        <button
          onClick={() => setIsSendSmsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-cyan-900/40"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>{labels.sendSmsBtn}</span>
        </button>

        {/* Language switch */}
        <button
          onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
          title={lang === 'fa' ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono uppercase font-bold">{lang === 'fa' ? 'EN' : 'فا'}</span>
        </button>
      </div>
    </header>
  );
};
