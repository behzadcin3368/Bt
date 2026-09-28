import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Smartphone, 
  Camera, 
  RotateCcw, 
  Power, 
  ChevronLeft, 
  Square, 
  Circle, 
  Triangle, 
  Wifi, 
  BatteryCharging, 
  Volume2, 
  Lightbulb, 
  Sparkles, 
  AlertTriangle,
  Send,
  Eye,
  Lock,
  Unlock,
  Radio
} from 'lucide-react';
import { t } from '../../utils/translations';

export const RemoteScreenView: React.FC = () => {
  const { 
    lang, 
    selectedDevice, 
    toggleScreenLock, 
    triggerRemoteAction, 
    executeCommand 
  } = useDashboard();

  const labels = t[lang];
  const [activeScreenApp, setActiveScreenApp] = useState<'bank' | 'overlay' | 'whatsapp' | 'settings' | 'home'>('bank');
  const [fpsMode, setFpsMode] = useState<'15fps' | '30fps' | 'HQ'>('30fps');
  const [customInputText, setCustomInputText] = useState('');
  const [screenshotTaken, setScreenshotTaken] = useState(false);
  const [touchCoordinates, setTouchCoordinates] = useState<{ x: number; y: number } | null>(null);

  if (!selectedDevice) {
    return (
      <div className="p-8 text-center text-slate-400">
        {lang === 'fa' ? 'لطفا یک دستگاه را از بالای صفحه انتخاب نمایید' : 'Please select a device from the top bar'}
      </div>
    );
  }

  const handleCaptureScreen = () => {
    executeCommand('take_screenshot');
    setScreenshotTaken(true);
    setTimeout(() => setScreenshotTaken(false), 2000);
  };

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1080);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 2400);
    setTouchCoordinates({ x, y });
    triggerRemoteAction(`Tap at (${x}, ${y}) via Accessibility DispatchGesture`);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputText.trim()) return;
    executeCommand(`input text "${customInputText.trim()}"`);
    setCustomInputText('');
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {labels.remoteScreenTitle}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>{selectedDevice.name}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-400">{selectedDevice.ip}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedDevice.carrier}</span>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="flex items-center gap-2">
          {/* Stream Quality */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            {(['15fps', '30fps', 'HQ'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setFpsMode(mode)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                  fpsMode === mode ? 'bg-cyan-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={handleCaptureScreen}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>{screenshotTaken ? (lang === 'fa' ? 'فریم ذخیره شد!' : 'Captured!') : labels.screenCapture}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Device Screen Mockup (Center/Left) & Remote Interaction Tools (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Android Device Mockup (Viewport) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Phone Shell */}
          <div className="relative w-[310px] sm:w-[340px] bg-slate-900 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800 ring-1 ring-cyan-500/20">
            {/* Top Speaker & Camera Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-3 z-30">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-12 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Simulated Android Screen */}
            <div 
              onClick={handleScreenClick}
              className="relative w-full h-[580px] sm:h-[620px] bg-slate-950 rounded-[34px] overflow-hidden flex flex-col cursor-crosshair select-none"
            >
              {/* Android Status Bar */}
              <div className="h-8 px-5 pt-1.5 flex items-center justify-between text-[11px] text-slate-300 font-mono z-20 bg-black/40 backdrop-blur-xs">
                <span>14:32</span>
                <div className="flex items-center gap-2 text-slate-400">
                  <Wifi className="w-3 h-3 text-cyan-400" />
                  <span className="flex items-center gap-0.5 text-slate-200">
                    <BatteryCharging className="w-3 h-3 text-emerald-400" />
                    {selectedDevice.battery}%
                  </span>
                </div>
              </div>

              {/* Screen Content State (Locked or Active App) */}
              {selectedDevice.screenLocked ? (
                /* Locked Screen View */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                  <Lock className="w-10 h-10 text-amber-400/80 mb-3 animate-pulse" />
                  <div className="text-3xl font-light font-mono text-white mb-1">14:32</div>
                  <div className="text-xs text-slate-400 mb-6">دوشنبه ۷ مهر ۱۴۰۵</div>
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-300 w-full mb-8">
                    <div className="font-semibold text-rose-400 flex items-center justify-center gap-1 mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{lang === 'fa' ? 'تروجان BTMOB در پس‌زمینه فعال است' : 'BTMOB Agent Active in Background'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Accessibility Hook · Keylogger Active</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleScreenLock(selectedDevice.id);
                    }}
                    className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-full border border-slate-700 transition-colors"
                  >
                    {lang === 'fa' ? 'کلیک برای بازگشایی قفل' : 'Swipe/Tap to Unlock'}
                  </button>
                </div>
              ) : (
                /* Unlocked App Views */
                <div className="flex-1 overflow-y-auto flex flex-col text-slate-100 relative">
                  {/* APP 1: Banking App View (Mellat) */}
                  {activeScreenApp === 'bank' && (
                    <div className="flex-1 flex flex-col bg-[#780016] text-white p-4">
                      <div className="flex items-center justify-between pb-3 border-b border-red-800/60">
                        <span className="font-bold text-sm">همراه بانک ملت</span>
                        <span className="text-[10px] bg-red-900/80 px-2 py-0.5 rounded font-mono">v4.8.2</span>
                      </div>

                      <div className="mt-4 p-3 bg-red-950/60 rounded-xl border border-red-800/40">
                        <div className="text-[11px] text-red-200">سپرده قرض‌الحسنه جاری</div>
                        <div className="text-lg font-bold font-mono tracking-tight my-1">
                          ۱۸۲,۴۰۰,۰۰۰ <span className="text-xs font-normal">ریال</span>
                        </div>
                        <div className="text-[10px] text-red-300/80 font-mono">IR7201200000000018249021</div>
                      </div>

                      {/* Phishing hook alert indicator */}
                      <div className="mt-4 p-3 bg-black/60 rounded-xl border border-rose-500/60 text-xs">
                        <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>BTMOB Accessibility Hook</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          در حال خواندن مقادیر فیلدهای ورودی رمز دوم پویا و اطلاعات کارت بانکی.
                        </p>
                      </div>

                      <div className="mt-auto space-y-2 pb-2">
                        <div className="p-2.5 bg-red-900/50 rounded-lg text-xs flex justify-between items-center">
                          <span>انتقال وجه شتابی / پایا</span>
                          <span className="font-mono text-[10px]">TAP</span>
                        </div>
                        <div className="p-2.5 bg-red-900/50 rounded-lg text-xs flex justify-between items-center">
                          <span>خرید شارژ و بسته اینترنت</span>
                          <span className="font-mono text-[10px]">TAP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP 2: Deceptive BTMOB Phishing Overlay */}
                  {activeScreenApp === 'overlay' && (
                    <div className="flex-1 flex flex-col bg-slate-900 text-white p-5 justify-center">
                      <div className="p-4 bg-slate-950 rounded-2xl border-2 border-rose-500/80 shadow-2xl text-center space-y-3">
                        <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-rose-300">
                          {lang === 'fa' ? 'تزریق لایه جعلی فیشینگ (Overlay)' : 'BTMOB Phishing Overlay Injection'}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {lang === 'fa' 
                            ? 'این فرم وب‌ویو فیشینگ روی برنامه بانکی سوار شده تا رمز عبور، CVV2 و تاریخ انقضا را بدون متوجه شدن کاربر سرقت کند.'
                            : 'This overlay dialog captures card number, CVV2 and dynamic 2FA passwords over the legitimate banking activity.'}
                        </p>
                        <div className="space-y-2 text-start pt-2">
                          <input 
                            type="text" 
                            placeholder="شماره کارت ۱۶ رقمی"
                            defaultValue="۶۰۳۷ - ۹۹۱۸ - ۴۰۲۲ - ۹۹۱۰"
                            readOnly
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-300"
                          />
                          <input 
                            type="password" 
                            placeholder="رمز دوم پویا (شنود شده: 749201)"
                            defaultValue="749201"
                            readOnly
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP 3: WhatsApp Messenger */}
                  {activeScreenApp === 'whatsapp' && (
                    <div className="flex-1 flex flex-col bg-[#0b141a] text-slate-100">
                      <div className="p-3 bg-[#202c33] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-[11px] font-bold">
                            AR
                          </div>
                          <div>
                            <div className="font-semibold text-white">احمد رضایی</div>
                            <div className="text-[10px] text-emerald-400">آنلاین</div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">E2EE</span>
                      </div>

                      <div className="flex-1 p-3 space-y-2.5 text-xs overflow-y-auto">
                        <div className="bg-[#202c33] p-2.5 rounded-lg max-w-[80%] rounded-tr-none">
                          سلام، لطفا کد تایید بله را برام بفرستید، سیستم اداری منتظره.
                          <div className="text-[9px] text-slate-400 text-end font-mono mt-1">13:14</div>
                        </div>
                        <div className="bg-[#005c4b] p-2.5 rounded-lg max-w-[80%] ms-auto rounded-tl-none">
                          کد پیامک شد: ۳۸۲۹۰۱. کارها رو نهایی کنید.
                          <div className="text-[9px] text-emerald-200 text-end font-mono mt-1">13:15 ✓✓</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP 4: Android Settings & Accessibility */}
                  {activeScreenApp === 'settings' && (
                    <div className="flex-1 bg-slate-900 p-4 text-xs space-y-3">
                      <div className="font-bold text-sm text-white pb-2 border-b border-slate-800">
                        تنظیمات دسترس‌پذیری (Accessibility)
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/40">
                        <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                          <span>Security System Patch (BTMOB)</span>
                          <span className="text-emerald-400 font-mono text-[10px]">روشن (ON)</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          این سرویس دسترسی کامل به مشاهده صفحه، رهگیری کلیدهای تایپ‌شده و اجرای خودکار ژست‌های حرکتی دارد.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* APP 5: Android Home Screen */}
                  {activeScreenApp === 'home' && (
                    <div className="flex-1 p-4 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-900 to-cyan-950/30">
                      <div className="grid grid-cols-4 gap-3 text-center mb-8">
                        <button onClick={() => setActiveScreenApp('bank')} className="flex flex-col items-center gap-1 cursor-pointer">
                          <div className="w-11 h-11 rounded-2xl bg-red-800 flex items-center justify-center text-white text-xs font-bold shadow-lg">ملت</div>
                          <span className="text-[10px] text-slate-300">بانک ملت</span>
                        </button>
                        <button onClick={() => setActiveScreenApp('whatsapp')} className="flex flex-col items-center gap-1 cursor-pointer">
                          <div className="w-11 h-11 rounded-2xl bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">WA</div>
                          <span className="text-[10px] text-slate-300">واتساپ</span>
                        </button>
                        <button onClick={() => setActiveScreenApp('overlay')} className="flex flex-col items-center gap-1 cursor-pointer">
                          <div className="w-11 h-11 rounded-2xl bg-rose-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">لایه</div>
                          <span className="text-[10px] text-rose-300">Overlay</span>
                        </button>
                        <button onClick={() => setActiveScreenApp('settings')} className="flex flex-col items-center gap-1 cursor-pointer">
                          <div className="w-11 h-11 rounded-2xl bg-slate-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">تنظیم</div>
                          <span className="text-[10px] text-slate-300">Settings</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Android Navigation Bar (Back, Home, Recents) */}
              <div className="h-10 px-8 flex items-center justify-around bg-black/60 backdrop-blur-xs border-t border-slate-800/60 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerRemoteAction('Navigation: Back');
                    if (activeScreenApp !== 'home') setActiveScreenApp('home');
                  }}
                  className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                  title="Back"
                >
                  <Triangle className="w-3.5 h-3.5 -rotate-90 fill-current" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerRemoteAction('Navigation: Home');
                    setActiveScreenApp('home');
                  }}
                  className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                  title="Home"
                >
                  <Circle className="w-3.5 h-3.5 fill-current" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerRemoteAction('Navigation: Recent Apps');
                    setActiveScreenApp('bank');
                  }}
                  className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
                  title="Recents"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          </div>

          {/* Coordinates readout */}
          {touchCoordinates && (
            <div className="mt-3 text-[11px] font-mono text-cyan-400">
              {lang === 'fa' ? 'مختصات لمس ثبت‌شده:' : 'Dispatched Touch:'} X={touchCoordinates.x}, Y={touchCoordinates.y}
            </div>
          )}
        </div>

        {/* Remote Control & Inspection Toolbox (Right Side) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target App Switcher */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              {lang === 'fa' ? 'شبیه‌سازی و سوئیچ برنامه هدف (Foreground)' : 'Foreground Application Simulation'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {lang === 'fa'
                ? 'برای بررسی عملکرد شنود BTMOB و تزریق پنجره فیشینگ، می‌توانید صفحه دستگاه را بین برنامه‌های مختلف جابجا کنید:'
                : 'Switch active foreground application to inspect BTMOB accessibility theft and overlay behavior:'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setActiveScreenApp('bank')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                  activeScreenApp === 'bank' ? 'bg-red-950/50 border-red-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">همراه بانک ملت</div>
                <div className="text-[10px] text-slate-500">Mellat Banking</div>
              </button>

              <button
                onClick={() => setActiveScreenApp('overlay')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                  activeScreenApp === 'overlay' ? 'bg-rose-950/50 border-rose-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-rose-300">لایه فیشینگ BTMOB</div>
                <div className="text-[10px] text-rose-400/80">Overlay Injection</div>
              </button>

              <button
                onClick={() => setActiveScreenApp('whatsapp')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                  activeScreenApp === 'whatsapp' ? 'bg-emerald-950/50 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">واتساپ پیام‌ها</div>
                <div className="text-[10px] text-slate-500">WhatsApp Chat</div>
              </button>

              <button
                onClick={() => setActiveScreenApp('settings')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                  activeScreenApp === 'settings' ? 'bg-cyan-950/50 border-cyan-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Accessibility Settings</div>
                <div className="text-[10px] text-slate-500">دسترسی‌ها</div>
              </button>

              <button
                onClick={() => setActiveScreenApp('home')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-start transition-colors cursor-pointer ${
                  activeScreenApp === 'home' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">صفحه اصلی لانچر</div>
                <div className="text-[10px] text-slate-500">Home Screen</div>
              </button>
            </div>
          </div>

          {/* Remote Hardware Controls */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              {lang === 'fa' ? 'دستورات سخت‌افزاری و کنترلی' : 'Remote Hardware Triggers'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => toggleScreenLock(selectedDevice.id)}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Power className="w-4 h-4 text-cyan-400" />
                <span>{selectedDevice.screenLocked ? (lang === 'fa' ? 'بازکردن صفحه' : 'Unlock Screen') : (lang === 'fa' ? 'قفل صفحه' : 'Lock Screen')}</span>
              </button>

              <button
                onClick={() => triggerRemoteAction('Vibrate device 500ms')}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>{labels.vibrateBtn}</span>
              </button>

              <button
                onClick={() => triggerRemoteAction('Toggle Flashlight Torch')}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>{labels.flashlightBtn}</span>
              </button>

              <button
                onClick={() => triggerRemoteAction('Trigger Silent Front Camera Snapshot')}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-rose-400" />
                <span>{lang === 'fa' ? 'عکاسی نامحسوس' : 'Silent Photo'}</span>
              </button>

              <button
                onClick={() => triggerRemoteAction('Send Intent: WAKE_UP_DEVICE')}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{labels.wakeUpBtn}</span>
              </button>
            </div>
          </div>

          {/* Remote Text Injection */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {lang === 'fa' ? 'تزریق مستقیم متن به فیلد فوکوس‌شده (Text Injection)' : 'Remote Text Input Injection'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {lang === 'fa'
                ? 'ارسال رشته متنی از طریق AccessibilityNodeInfo.ACTION_SET_TEXT به برنامه‌ها'
                : 'Dispatch string via AccessibilityNodeInfo directly into focused inputs'}
            </p>
            <form onSubmit={handleSendText} className="flex gap-2">
              <input
                type="text"
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder={lang === 'fa' ? 'متن، دستور یا رمز را تایپ کنید...' : 'Type text or keystrokes to inject...'}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'fa' ? 'ارسال به گوشی' : 'Inject'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
