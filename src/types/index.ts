export type Language = 'fa' | 'en';

export type TabType = 
  | 'overview' 
  | 'devices' 
  | 'remote-screen' 
  | 'sms-calls' 
  | 'apps-sandbox' 
  | 'file-manager' 
  | 'keylogger' 
  | 'terminal' 
  | 'threat-intel';

export interface Device {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  androidVersion: string;
  apiLevel: number;
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  carrier: string;
  battery: number;
  isCharging: boolean;
  status: 'online' | 'offline' | 'quarantined';
  lastSeen: string;
  accessibilityEnabled: boolean;
  overlayPermission: boolean;
  smsPermission: boolean;
  adminPermission: boolean;
  notificationAccess: boolean;
  storagePermission: boolean;
  latitude: number;
  longitude: number;
  screenLocked: boolean;
  currentApp: string;
  btmobInfectionStatus: 'active' | 'dormant' | 'quarantined' | 'mitigated';
}

export interface SmsMessage {
  id: string;
  deviceId: string;
  sender: string;
  recipient: string;
  body: string;
  timestamp: string;
  type: 'inbox' | 'sent';
  isOtp: boolean;
  otpCode?: string;
  bankName?: string;
}

export interface CallLog {
  id: string;
  deviceId: string;
  phoneNumber: string;
  contactName: string;
  type: 'incoming' | 'outgoing' | 'missed';
  durationSeconds: number;
  timestamp: string;
  recorded: boolean;
}

export interface InstalledApp {
  id: string;
  deviceId: string;
  appName: string;
  packageName: string;
  version: string;
  isSystem: boolean;
  isMaliciousCandidate: boolean;
  permissionsCount: number;
  installDate: string;
  iconType: 'bank' | 'crypto' | 'social' | 'system' | 'generic';
}

export interface FileItem {
  id: string;
  name: string;
  path: string;
  size: string;
  type: 'folder' | 'image' | 'video' | 'audio' | 'document' | 'database' | 'code';
  modified: string;
  exfiltrated: boolean;
}

export interface KeylogRecord {
  id: string;
  deviceId: string;
  targetApp: string;
  packageName: string;
  text: string;
  timestamp: string;
  fieldHint: string;
}

export interface NotificationItem {
  id: string;
  deviceId: string;
  appName: string;
  title: string;
  text: string;
  timestamp: string;
  containsOtp: boolean;
  otp?: string;
}

export interface CommandHistoryItem {
  id: string;
  command: string;
  deviceId: string;
  timestamp: string;
  status: 'success' | 'running' | 'error';
  output: string;
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  deviceId: string;
  deviceName: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  title: string;
  description: string;
  tag: string;
}

export interface YaraRule {
  id: string;
  name: string;
  author: string;
  description: string;
  ruleCode: string;
}
