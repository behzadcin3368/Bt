import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Device, 
  SmsMessage, 
  CallLog, 
  InstalledApp, 
  FileItem, 
  KeylogRecord, 
  NotificationItem, 
  CommandHistoryItem, 
  ThreatEvent, 
  TabType, 
  Language 
} from '../types';
import { 
  INITIAL_DEVICES, 
  INITIAL_SMS, 
  INITIAL_CALLS, 
  INITIAL_APPS, 
  INITIAL_FILES, 
  INITIAL_KEYLOGS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_THREAT_EVENTS 
} from '../data/mockData';

interface DashboardContextType {
  lang: Language;
  setLang: (l: Language) => void;
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
  devices: Device[];
  selectedDeviceId: string;
  selectedDevice: Device | undefined;
  setSelectedDeviceId: (id: string) => void;
  smsList: SmsMessage[];
  callsList: CallLog[];
  appsList: InstalledApp[];
  filesList: FileItem[];
  keylogsList: KeylogRecord[];
  notificationsList: NotificationItem[];
  commandHistory: CommandHistoryItem[];
  threatEvents: ThreatEvent[];
  executeCommand: (command: string) => void;
  sendRemoteSms: (recipient: string, message: string) => boolean;
  quarantineDevice: (deviceId: string) => void;
  toggleScreenLock: (deviceId: string) => void;
  deleteSms: (id: string) => void;
  deleteFile: (id: string) => void;
  markFileExfiltrated: (id: string) => void;
  isSendSmsOpen: boolean;
  setIsSendSmsOpen: (open: boolean) => void;
  selectedInspectDevice: Device | null;
  setSelectedInspectDevice: (device: Device | null) => void;
  triggerRemoteAction: (actionName: string) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('fa');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('DEV-8891-IR');
  const [smsList, setSmsList] = useState<SmsMessage[]>(INITIAL_SMS);
  const [callsList, setCallsList] = useState<CallLog[]>(INITIAL_CALLS);
  const [appsList, setAppsList] = useState<InstalledApp[]>(INITIAL_APPS);
  const [filesList, setFilesList] = useState<FileItem[]>(INITIAL_FILES);
  const [keylogsList, setKeylogsList] = useState<KeylogRecord[]>(INITIAL_KEYLOGS);
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>(INITIAL_THREAT_EVENTS);
  const [isSendSmsOpen, setIsSendSmsOpen] = useState(false);
  const [selectedInspectDevice, setSelectedInspectDevice] = useState<Device | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'CMD-1',
      command: 'get_device_status --full',
      deviceId: 'DEV-8891-IR',
      timestamp: '۱۴:۳۳:۰۱',
      status: 'success',
      output: `[+] Device ID: DEV-8891-IR\n[+] Model: SM-S928B (Samsung Galaxy S24 Ultra)\n[+] Android: 14 (API 34)\n[+] Accessibility Service: ENABLED (Hook Active)\n[+] SYSTEM_ALERT_WINDOW: GRANTED\n[+] Current foreground package: ir.bankmellat.mobile`
    },
    {
      id: 'CMD-2',
      command: 'dump_sms --limit 5 --otp-only',
      deviceId: 'DEV-8891-IR',
      timestamp: '۱۴:۳۲:۱۵',
      status: 'success',
      output: `[✓] Intercepted OTP code: 749201 from Bank Mellat\n[✓] Intercepted OTP code: 382901 from Bale Messenger`
    }
  ]);

  // Keep selected device synced
  const selectedDevice = devices.find(d => d.id === selectedDeviceId) || devices[0];

  // Auto clear toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Sync document dir and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newId = `CMD-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('fa-IR');
    let output = '';
    let status: 'success' | 'running' | 'error' = 'success';

    const lower = trimmed.toLowerCase();
    if (lower.startsWith('help')) {
      output = `Available BTMOB C2 commands:\n  dump_sms [--otp-only]       Extract incoming SMS & 2FA codes\n  get_location                Fetch GPS coordinates & cell tower info\n  get_contacts                Dump address book\n  take_screenshot             Trigger silent screen capture\n  lock_screen                 Lock active device screen\n  enable_overlay <pkg>        Trigger phishing overlay on target package\n  record_mic <seconds>        Record ambient mic audio\n  quarantine                  Revoke accessibility & freeze payload\n  clear                       Clear console output`;
    } else if (lower.startsWith('dump_sms')) {
      output = `[+] Querying SMS provider on ${selectedDevice?.name}...\n[✓] 6 messages retrieved. Intercepted 4 active OTP codes.\n[✓] Raw payloads synced to SMS Inspector.`;
    } else if (lower.startsWith('get_location')) {
      output = `[+] GPS Coordinates: Lat ${selectedDevice?.latitude}, Lng ${selectedDevice?.longitude}\n[+] Accuracy: ±4.2 meters\n[+] Reverse Geo: ${selectedDevice?.city}, ${selectedDevice?.country}\n[+] Network: ${selectedDevice?.carrier} (${selectedDevice?.ip})`;
    } else if (lower.startsWith('take_screenshot') || lower === 'screenshot') {
      output = `[+] Requested remote frame capture via Accessibility API...\n[✓] Frame buffer received (1080x2340 @ 32bpp). Frame cached in Remote Screen tab.`;
      showToast(lang === 'fa' ? 'اسکرین‌شات از دستگاه با موفقیت دریافت شد' : 'Screenshot successfully captured from device');
    } else if (lower.startsWith('lock_screen')) {
      toggleScreenLock(selectedDeviceId);
      output = `[✓] Lock command sent via DevicePolicyManager/Accessibility. Screen locked.`;
    } else if (lower.startsWith('record_mic')) {
      output = `[+] Audio recording initiated for 15 seconds in background...\n[✓] Audio stream compressed (AAC 64kbps) and saved to /sdcard/Recordings.`;
      showToast(lang === 'fa' ? 'ضبط صدا از محیط دستگاه آغاز شد' : 'Audio recording initiated on endpoint');
    } else if (lower.startsWith('quarantine')) {
      quarantineDevice(selectedDeviceId);
      output = `[!] QUARANTINE TRIGGERED: Accessibility service halted, background worker detached.`;
    } else if (lower === 'clear') {
      setCommandHistory([]);
      return;
    } else {
      output = `[+] Executing raw command on ${selectedDeviceId}: "${trimmed}"\n[✓] Exit code 0 (Command dispatched to agent).`;
    }

    setCommandHistory(prev => [
      {
        id: newId,
        command: trimmed,
        deviceId: selectedDeviceId,
        timestamp,
        status,
        output
      },
      ...prev
    ]);
  };

  const sendRemoteSms = (recipient: string, message: string): boolean => {
    if (!recipient || !message) return false;
    const newSms: SmsMessage = {
      id: `SMS-${Date.now()}`,
      deviceId: selectedDeviceId,
      sender: selectedDevice?.carrier || 'Carrier SIM 1',
      recipient,
      body: message,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
      type: 'sent',
      isOtp: false
    };

    setSmsList(prev => [newSms, ...prev]);
    showToast(lang === 'fa' ? `پیامک با موفقیت از طرف دستگاه به ${recipient} ارسال شد` : `SMS sent successfully via device to ${recipient}`);
    return true;
  };

  const quarantineDevice = (deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === deviceId) {
        const isQuarantined = d.status === 'quarantined';
        const newStatus = isQuarantined ? 'online' : 'quarantined';
        const newInfection = isQuarantined ? 'active' : 'mitigated';
        return {
          ...d,
          status: newStatus,
          accessibilityEnabled: isQuarantined,
          btmobInfectionStatus: newInfection
        };
      }
      return d;
    }));

    const dev = devices.find(d => d.id === deviceId);
    const event: ThreatEvent = {
      id: `EVT-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('fa-IR'),
      deviceId,
      deviceName: dev?.name || deviceId,
      severity: 'info',
      title: lang === 'fa' ? 'عملیات قرنطینه / لغو دسترسی اجرا شد' : 'Quarantine / Access Revocation Executed',
      description: lang === 'fa' 
        ? `دسترسی Accessibility و فعالیت BTMOB روی دستگاه ${dev?.name} متوقف شد.` 
        : `Accessibility privileges and BTMOB agent halted on ${dev?.name}.`,
      tag: 'INCIDENT_RESPONSE'
    };
    setThreatEvents(prev => [event, ...prev]);
    showToast(lang === 'fa' ? `دستور قرنطینه امنیتی برای ${dev?.name} اعمال شد` : `Security quarantine executed for ${dev?.name}`);
  };

  const toggleScreenLock = (deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === deviceId) {
        return { ...d, screenLocked: !d.screenLocked };
      }
      return d;
    }));
    showToast(lang === 'fa' ? 'وضعیت قفل صفحه دستگاه تغییر کرد' : 'Screen lock state toggled');
  };

  const deleteSms = (id: string) => {
    setSmsList(prev => prev.filter(s => s.id !== id));
    showToast(lang === 'fa' ? 'پیامک از پایگاه حذف گردید' : 'SMS removed from log');
  };

  const deleteFile = (id: string) => {
    setFilesList(prev => prev.filter(f => f.id !== id));
    showToast(lang === 'fa' ? 'فایل از حافظه حذف شد' : 'File deleted');
  };

  const markFileExfiltrated = (id: string) => {
    setFilesList(prev => prev.map(f => f.id === id ? { ...f, exfiltrated: true } : f));
    showToast(lang === 'fa' ? 'فایل استخراج شد و دانلود آغاز گردید' : 'File exfiltrated and downloaded');
  };

  const triggerRemoteAction = (actionName: string) => {
    showToast(lang === 'fa' ? `دستور "${actionName}" با موفقیت ارسال شد` : `Action "${actionName}" dispatched successfully`);
  };

  return (
    <DashboardContext.Provider value={{
      lang,
      setLang,
      activeTab,
      setActiveTab,
      devices,
      selectedDeviceId,
      selectedDevice,
      setSelectedDeviceId,
      smsList,
      callsList,
      appsList,
      filesList,
      keylogsList,
      notificationsList,
      commandHistory,
      threatEvents,
      executeCommand,
      sendRemoteSms,
      quarantineDevice,
      toggleScreenLock,
      deleteSms,
      deleteFile,
      markFileExfiltrated,
      isSendSmsOpen,
      setIsSendSmsOpen,
      selectedInspectDevice,
      setSelectedInspectDevice,
      triggerRemoteAction,
      toastMessage,
      setToastMessage
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
