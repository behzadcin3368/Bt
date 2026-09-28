import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  ShieldAlert, 
  Wifi, 
  BatteryCharging, 
  MapPin, 
  Cpu, 
  Radio, 
  Lock, 
  Unlock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const DeviceDetailModal: React.FC = () => {
  const { 
    lang, 
    selectedInspectDevice, 
    setSelectedInspectDevice,
    quarantineDevice,
    toggleScreenLock,
    setSelectedDeviceId,
    setActiveTab
  } = useDashboard();

  if (!selectedInspectDevice) return null;

  const d = selectedInspectDevice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <span>{d.name}</span>
                <span className="text-xs font-mono text-slate-400 font-normal">({d.model})</span>
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono">{d.id}</span>
                <span aria-hidden="true">·</span>
                <span>{d.country} ({d.city})</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setSelectedInspectDevice(null)}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Status highlight bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">
                {lang === 'fa' ? 'وضعیت اتصال' : 'Connection Status'}
              </span>
              <div className="flex items-center gap-1.5 font-medium text-xs">
                <span className={`w-2 h-2 rounded-full ${d.status === 'online' ? 'bg-emerald-400 animate-pulse' : d.status === 'quarantined' ? 'bg-amber-400' : 'bg-rose-500'}`} />
                <span className="text-slate-200 capitalize">{d.status}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">
                {lang === 'fa' ? 'عفونت BTMOB' : 'BTMOB Infection'}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold">
                {d.btmobInfectionStatus === 'active' ? (
                  <span className="text-rose-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {lang === 'fa' ? 'فعال (خطر)' : 'Active (High Risk)'}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {lang === 'fa' ? 'خنثی شده' : 'Mitigated'}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">
                {lang === 'fa' ? 'سطح باتری' : 'Battery Level'}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-200">
                <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                <span>{d.battery}% {d.isCharging ? (lang === 'fa' ? '(در حال شارژ)' : '(Charging)') : ''}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">
                {lang === 'fa' ? 'قفل صفحه' : 'Screen Lock'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-200">
                {d.screenLocked ? (
                  <span className="text-amber-400 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3" />
                    {lang === 'fa' ? 'قفل شده' : 'Locked'}
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1 font-mono">
                    <Unlock className="w-3 h-3" />
                    {lang === 'fa' ? 'باز (روشن)' : 'Unlocked'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Telemetry and System Specifications */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              {lang === 'fa' ? 'مشخصات سیستمی و ارتباطی' : 'System & Network Telemetry'}
            </h4>
            <div className="bg-slate-950 rounded-lg border border-slate-800 divide-y divide-slate-800/60 text-xs">
              <div className="grid grid-cols-2 p-3">
                <span className="text-slate-400">{lang === 'fa' ? 'نسخه اندروید و API' : 'Android Version & API'}:</span>
                <span className="text-slate-200 font-mono text-end">{d.androidVersion} (API Level {d.apiLevel})</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-slate-400">{lang === 'fa' ? 'آدرس آی‌پی عمومی' : 'Public IP Address'}:</span>
                <span className="text-slate-200 font-mono text-end">{d.ip}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-slate-400">{lang === 'fa' ? 'اپراتور سیم‌کارت' : 'Cellular Carrier'}:</span>
                <span className="text-slate-200 text-end">{d.carrier}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-slate-400">{lang === 'fa' ? 'مختصات جغرافیایی GPS' : 'GPS Coordinates'}:</span>
                <span className="text-slate-200 font-mono text-end">{d.latitude.toFixed(4)}, {d.longitude.toFixed(4)}</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-slate-400">{lang === 'fa' ? 'اپلیکیشن در حال اجرا (Foreground)' : 'Active App in Foreground'}:</span>
                <span className="text-cyan-300 font-medium text-end">{d.currentApp}</span>
              </div>
            </div>
          </div>

          {/* Critical BTMOB Permissions & Attack Vectors */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>{lang === 'fa' ? 'وضعیت دسترسی‌های حساس (سوءاستفاده تروجان)' : 'Privileged Permissions Audit'}</span>
              <span className="text-[11px] font-mono text-slate-400">Android Permissions Matrix</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Accessibility Service (قلاب اصلی BTMOB)</span>
                {d.accessibilityEnabled ? (
                  <span className="text-rose-400 flex items-center gap-1 font-mono font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ENABLED
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1 font-mono font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    DISABLED
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">SYSTEM_ALERT_WINDOW (پنجره Overlay)</span>
                {d.overlayPermission ? (
                  <span className="text-rose-400 flex items-center gap-1 font-mono font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    GRANTED
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1 font-mono font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    REVOKED
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">RECEIVE_SMS / READ_SMS (شنود پیامک)</span>
                {d.smsPermission ? (
                  <span className="text-amber-400 flex items-center gap-1 font-mono font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1 font-mono font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    DENIED
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">BIND_NOTIFICATION_LISTENER_SERVICE</span>
                {d.notificationAccess ? (
                  <span className="text-amber-400 flex items-center gap-1 font-mono font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1 font-mono font-medium">
                    <XCircle className="w-3.5 h-3.5" />
                    DENIED
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedDeviceId(d.id);
                setSelectedInspectDevice(null);
                setActiveTab('remote-screen');
              }}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'انتقال به صفحه زنده دستگاه' : 'Open Live Screen View'}
            </button>
            <button
              onClick={() => toggleScreenLock(d.id)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
            >
              {d.screenLocked ? (lang === 'fa' ? 'بازکردن قفل' : 'Unlock Screen') : (lang === 'fa' ? 'قفل کردن صفحه' : 'Lock Screen')}
            </button>
          </div>

          <button
            onClick={() => quarantineDevice(d.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              d.status === 'quarantined'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-rose-700 hover:bg-rose-600 text-white'
            }`}
          >
            {d.status === 'quarantined' ? (lang === 'fa' ? 'رفع قرنطینه دستگاه' : 'Unquarantine Endpoint') : (lang === 'fa' ? 'قرنطینه و لغو دسترسی BTMOB' : 'Quarantine & Neutralize BTMOB')}
          </button>
        </div>
      </div>
    </div>
  );
};
