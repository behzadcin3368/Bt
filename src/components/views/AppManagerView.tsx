import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Boxes, 
  Search, 
  Trash2, 
  ShieldAlert, 
  ShieldCheck, 
  Download, 
  Layers, 
  Code, 
  Cpu, 
  AlertTriangle,
  Play,
  FileCode,
  Radio,
  Sliders
} from 'lucide-react';
import { t } from '../../utils/translations';
import { InstalledApp } from '../../types';

export const AppManagerView: React.FC = () => {
  const { 
    lang, 
    appsList, 
    selectedDevice, 
    triggerRemoteAction, 
    setToastMessage 
  } = useDashboard();

  const labels = t[lang];
  const [activeTab, setActiveTab] = useState<'installed' | 'builder'>('installed');
  const [appFilter, setAppFilter] = useState<'all' | 'user' | 'system' | 'threats'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sandbox builder state
  const [lureType, setLureType] = useState<'bank' | 'crypto' | 'stream' | 'gov'>('bank');
  const [pkgPrefix, setPkgPrefix] = useState('com.android.security.patcher');
  const [enableAccessibility, setEnableAccessibility] = useState(true);
  const [enableOverlay, setEnableOverlay] = useState(true);
  const [enableAntiEmulator, setEnableAntiEmulator] = useState(true);
  const [c2Server, setC2Server] = useState('https://c2-gateway.btmob-network.live/api/v2');
  const [compiledPreview, setCompiledPreview] = useState<string | null>(null);

  const filteredApps = appsList.filter(app => {
    const matchesSearch = 
      app.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.packageName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = 
      appFilter === 'all' ||
      (appFilter === 'user' && !app.isSystem) ||
      (appFilter === 'system' && app.isSystem) ||
      (appFilter === 'threats' && app.isMaliciousCandidate);

    return matchesSearch && matchesFilter;
  });

  const handleSimulateBuild = (e: React.FormEvent) => {
    e.preventDefault();
    setCompiledPreview(`[+] Compiling BTMOB APK Dropper Manifest & Dex...
Target Package: ${pkgPrefix}
Lure Type: ${lureType.toUpperCase()}
C2 Endpoint: ${c2Server}
Accessibility Service: ${enableAccessibility ? 'INJECTED (FLAG_RETRIEVE_INTERACTIVE_WINDOWS)' : 'DISABLED'}
Overlay Injection (SYSTEM_ALERT_WINDOW): ${enableOverlay ? 'ENABLED' : 'DISABLED'}
Anti-Analysis / Sandbox Evasion: ${enableAntiEmulator ? 'ACTIVE (QEMU, Genymotion, Root check)' : 'OFF'}
[✓] APK Signed with test keystore.
Hash (SHA-256): e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Static Risk Score: 9.8 / 10 (CRITICAL THREAT)`);
    setToastMessage(lang === 'fa' ? 'شبیه‌سازی پکیج BTMOB انجام و کد مانیفست ایجاد شد' : 'BTMOB APK payload compiled in forensic sandbox');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.navAppsSandbox}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'fa' 
              ? 'پایش برنامه‌های نصب‌شده روی دستگاه هدف و تحلیل مکانیزم سازنده پکیج‌های BTMOB' 
              : 'Target installed packages audit & BTMOB APK payload decompilation sandbox'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub Navigation */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('installed')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'installed' ? 'bg-cyan-600 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'برنامه‌های نصب‌شده' : 'Installed Packages'}</span>
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'builder' ? 'bg-cyan-600 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'آزمایشگاه APK و MaaS' : 'APK Sandbox & MaaS'}</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'installed' ? (
        /* Installed Apps View */
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'fa' ? 'جستجو در نام برنامه یا نام پکیج...' : 'Search app name or package...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg ps-9 pe-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setAppFilter('all')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  appFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'fa' ? 'همه' : 'All'}
              </button>
              <button
                onClick={() => setAppFilter('threats')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  appFilter === 'threats' ? 'bg-rose-950/70 border border-rose-800/50 text-rose-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>{lang === 'fa' ? 'مشکوک به BTMOB' : 'BTMOB Suspect'}</span>
              </button>
              <button
                onClick={() => setAppFilter('user')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  appFilter === 'user' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'fa' ? 'برنامه‌های کاربر' : 'User Apps'}
              </button>
              <button
                onClick={() => setAppFilter('system')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  appFilter === 'system' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'fa' ? 'سیستمی' : 'System'}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-[11px]">
                    <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'نام برنامه' : 'App Title'}</th>
                    <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'پکیج سیستم‌عامل' : 'Package Name'}</th>
                    <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'تعداد مجوزها' : 'Permissions'}</th>
                    <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'تاریخ نصب' : 'Install Date'}</th>
                    <th className="py-3 px-4 font-medium text-start">{lang === 'fa' ? 'سطح تهدید' : 'Threat Level'}</th>
                    <th className="py-3 px-4 font-medium text-end">{lang === 'fa' ? 'عملیات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredApps.map((app) => (
                    <tr 
                      key={app.id} 
                      className={`hover:bg-slate-800/25 transition-colors ${
                        app.isMaliciousCandidate ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200 flex items-center gap-2">
                          <span>{app.appName}</span>
                          {app.isSystem && (
                            <span className="text-[10px] text-slate-500 font-mono">SYS</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">Version {app.version}</div>
                      </td>

                      <td className="py-3 px-4 font-mono text-cyan-400/90 text-[11px]">
                        {app.packageName}
                      </td>

                      <td className="py-3 px-4 font-mono tabular-nums text-slate-300">
                        {app.permissionsCount} {lang === 'fa' ? 'دسترسی' : 'perms'}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                        {app.installDate}
                      </td>

                      <td className="py-3 px-4">
                        {app.isMaliciousCandidate ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-semibold font-mono">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            CRITICAL (BTMOB RAT)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            SAFE
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => triggerRemoteAction(`Uninstall package: ${app.packageName}`)}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>{lang === 'fa' ? 'حذف ریموت' : 'Uninstall'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* BTMOB Builder & Sandbox Decompiler */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder Form */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'fa' ? 'شبیه‌ساز سازنده بدافزار BTMOB (MaaS Payload Builder)' : 'BTMOB MaaS Payload Generator (Forensic Lab)'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {lang === 'fa'
                  ? 'سرویس‌های بدافزاری BTMOB به عنوان بدافزار به عنوان سرویس (MaaS) به مجرمان امکان ساخت APKهای استتارشده را می‌دهند. در این بخش مکانیزم تزریق و پنهان‌سازی بررسی می‌شود:'
                  : 'BTMOB operates as a Malware-as-a-Service model allowing threat actors to generate customized APK droppers with evasive triggers:'}
              </p>
            </div>

            <form onSubmit={handleSimulateBuild} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {lang === 'fa' ? 'قالب استتار و طعمه (Lure Theme)' : 'Social Engineering Lure Theme'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLureType('bank');
                      setPkgPrefix('com.android.security.patcher');
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                      lureType === 'bank' ? 'bg-cyan-950/60 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'fa' ? 'به‌روزرسانی امنیتی سیستم' : 'System Security Patch'}</div>
                    <div className="text-[10px] text-slate-500">Android System Update</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLureType('crypto');
                      setPkgPrefix('com.usdt.cloudmine.app');
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                      lureType === 'crypto' ? 'bg-cyan-950/60 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'fa' ? 'استخراج ابری تتر (Crypto)' : 'USDT Cloud Miner'}</div>
                    <div className="text-[10px] text-slate-500">Fake Investment Mining</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLureType('stream');
                      setPkgPrefix('tv.stream.cinema.pro');
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                      lureType === 'stream' ? 'bg-cyan-950/60 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'fa' ? 'پخش آنلاین فیلم رایگان' : 'Free Streaming Movie App'}</div>
                    <div className="text-[10px] text-slate-500">Cinema Streaming Mod</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLureType('gov');
                      setPkgPrefix('ir.gov.tax.inquiry.portal');
                    }}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                      lureType === 'gov' ? 'bg-cyan-950/60 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'fa' ? 'سامانه استعلام مالیاتی / ابلاغیه' : 'Government Tax Inquiry'}</div>
                    <div className="text-[10px] text-slate-500">Public Portal Lure</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'fa' ? 'آدرس سرور کنترل C2' : 'C2 Callback Endpoint'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={c2Server}
                  onChange={(e) => setC2Server(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 outline-none focus:border-cyan-500"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableAccessibility}
                    onChange={(e) => setEnableAccessibility(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span>{lang === 'fa' ? 'فعال‌سازی سرویس خودکار Accessibility (شنود کلیدها و صفحه)' : 'Enable Accessibility Service Hijack Hook'}</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableOverlay}
                    onChange={(e) => setEnableOverlay(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span>{lang === 'fa' ? 'قابلیت تزریق وب‌ویو فیشینگ روی همراه بانک‌ها (Overlay)' : 'Enable Phishing WebView Overlay Injection'}</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableAntiEmulator}
                    onChange={(e) => setEnableAntiEmulator(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span>{lang === 'fa' ? 'تکنیک‌های فرار از تحلیل (Anti-Sandbox / Root Check / Evasion)' : 'Enable Anti-Analysis & Anti-Emulator Checks'}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{lang === 'fa' ? 'شبیه‌سازی ساخت و تحلیل آسیب‌پذیری' : 'Compile & Analyze Payload'}</span>
              </button>
            </form>
          </div>

          {/* Compiled Output / Decompiler Box */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <FileCode className="w-4 h-4" />
                <span>Decompiled AndroidManifest.xml & Dex Output</span>
              </span>
              <span className="text-[10px]">ANALYSIS ENGINE</span>
            </div>

            <pre className="flex-1 text-[11px] text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {compiledPreview || `<!-- Initial AndroidManifest template -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${pkgPrefix}">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.RECEIVE_SMS" />
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />

    <service
        android:name=".core.AccessibilityServiceCore"
        android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
        android:exported="true">
        <intent-filter>
            <action android:name="android.accessibilityservice.AccessibilityService" />
        </intent-filter>
        <meta-data
            android:name="android.accessibilityservice"
            android:resource="@xml/accessibility_service_config" />
    </service>
</manifest>`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
