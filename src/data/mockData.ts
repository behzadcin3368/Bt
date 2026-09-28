import { 
  Device, 
  SmsMessage, 
  CallLog, 
  InstalledApp, 
  FileItem, 
  KeylogRecord, 
  NotificationItem, 
  ThreatEvent, 
  YaraRule 
} from '../types';

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'DEV-8891-IR',
    name: 'Samsung Galaxy S24 Ultra',
    model: 'SM-S928B',
    manufacturer: 'Samsung',
    androidVersion: 'Android 14',
    apiLevel: 34,
    ip: '91.99.102.45',
    country: 'ایران',
    countryCode: 'IR',
    city: 'تهران',
    carrier: 'همراه اول (MCI)',
    battery: 84,
    isCharging: false,
    status: 'online',
    lastSeen: 'لحظاتی پیش',
    accessibilityEnabled: true,
    overlayPermission: true,
    smsPermission: true,
    adminPermission: true,
    notificationAccess: true,
    storagePermission: true,
    latitude: 35.6892,
    longitude: 51.3890,
    screenLocked: false,
    currentApp: 'بانک ملت (Mellat Mobile)',
    btmobInfectionStatus: 'active'
  },
  {
    id: 'DEV-4320-IR',
    name: 'Xiaomi 13T Pro',
    model: '23078PND5G',
    manufacturer: 'Xiaomi',
    androidVersion: 'Android 13',
    apiLevel: 33,
    ip: '5.127.18.204',
    country: 'ایران',
    countryCode: 'IR',
    city: 'اصفهان',
    carrier: 'ایرانسل (Irancell)',
    battery: 62,
    isCharging: true,
    status: 'online',
    lastSeen: '۲ دقیقه پیش',
    accessibilityEnabled: true,
    overlayPermission: true,
    smsPermission: true,
    adminPermission: false,
    notificationAccess: true,
    storagePermission: true,
    latitude: 32.6546,
    longitude: 51.6680,
    screenLocked: true,
    currentApp: 'WhatsApp Messenger',
    btmobInfectionStatus: 'active'
  },
  {
    id: 'DEV-1092-BR',
    name: 'Motorola Moto G84 5G',
    model: 'XT2347-1',
    manufacturer: 'Motorola',
    androidVersion: 'Android 13',
    apiLevel: 33,
    ip: '177.136.44.12',
    country: 'برزیل',
    countryCode: 'BR',
    city: 'سائوپائولو',
    carrier: 'Claro BR',
    battery: 45,
    isCharging: false,
    status: 'online',
    lastSeen: '۵ ثانیه پیش',
    accessibilityEnabled: true,
    overlayPermission: true,
    smsPermission: true,
    adminPermission: true,
    notificationAccess: true,
    storagePermission: true,
    latitude: -23.5505,
    longitude: -46.6333,
    screenLocked: false,
    currentApp: 'Nubank Brasil',
    btmobInfectionStatus: 'active'
  },
  {
    id: 'DEV-7764-DE',
    name: 'Google Pixel 8',
    model: 'GKWS6',
    manufacturer: 'Google',
    androidVersion: 'Android 14',
    apiLevel: 34,
    ip: '185.220.101.5',
    country: 'آلمان',
    countryCode: 'DE',
    city: 'فرانکفورت',
    carrier: 'Telekom.de',
    battery: 98,
    isCharging: true,
    status: 'online',
    lastSeen: 'همین حالا',
    accessibilityEnabled: false,
    overlayPermission: false,
    smsPermission: true,
    adminPermission: false,
    notificationAccess: false,
    storagePermission: true,
    latitude: 50.1109,
    longitude: 8.6821,
    screenLocked: false,
    currentApp: 'Settings',
    btmobInfectionStatus: 'quarantined'
  },
  {
    id: 'DEV-9912-TR',
    name: 'OnePlus 11',
    model: 'CPH2449',
    manufacturer: 'OnePlus',
    androidVersion: 'Android 14',
    apiLevel: 34,
    ip: '88.241.90.155',
    country: 'ترکیه',
    countryCode: 'TR',
    city: 'استانبول',
    carrier: 'Turkcell',
    battery: 19,
    isCharging: false,
    status: 'offline',
    lastSeen: '۳۸ دقیقه پیش',
    accessibilityEnabled: true,
    overlayPermission: true,
    smsPermission: false,
    adminPermission: false,
    notificationAccess: true,
    storagePermission: false,
    latitude: 41.0082,
    longitude: 28.9784,
    screenLocked: true,
    currentApp: 'Binance',
    btmobInfectionStatus: 'dormant'
  },
  {
    id: 'DEV-3301-IR',
    name: 'Samsung Galaxy A54 5G',
    model: 'SM-A546E',
    manufacturer: 'Samsung',
    androidVersion: 'Android 13',
    apiLevel: 33,
    ip: '2.144.60.89',
    country: 'ایران',
    countryCode: 'IR',
    city: 'مشهد',
    carrier: 'رایتل (RighTel)',
    battery: 73,
    isCharging: false,
    status: 'online',
    lastSeen: '۱ دقیقه پیش',
    accessibilityEnabled: true,
    overlayPermission: true,
    smsPermission: true,
    adminPermission: true,
    notificationAccess: true,
    storagePermission: true,
    latitude: 36.2605,
    longitude: 59.6168,
    screenLocked: false,
    currentApp: 'دیجی‌پی (DigiPay)',
    btmobInfectionStatus: 'active'
  }
];

export const INITIAL_SMS: SmsMessage[] = [
  {
    id: 'SMS-101',
    deviceId: 'DEV-8891-IR',
    sender: 'Bank Mellat',
    recipient: '+989123456789',
    body: 'رمز پویا خرید اینترنتی شما: 749201 - اعتبار: ۱۲۰ ثانیه. بانک ملت',
    timestamp: '۱۴:۳۲:۱۰',
    type: 'inbox',
    isOtp: true,
    otpCode: '749201',
    bankName: 'بانک ملت'
  },
  {
    id: 'SMS-102',
    deviceId: 'DEV-8891-IR',
    sender: 'Bank Melli',
    recipient: '+989123456789',
    body: 'برداشت از حساب: ۲۵,۰۰۰,۰۰۰ ریال به مقصد کارت: ۶۰۳۷۹۹****۱۸۴۰ موجودی: ۱۸۲,۴۰۰,۰۰۰ ریال',
    timestamp: '۱۴:۲۸:۴۴',
    type: 'inbox',
    isOtp: false,
    bankName: 'بانک ملی'
  },
  {
    id: 'SMS-103',
    deviceId: 'DEV-8891-IR',
    sender: 'Bale Messenger',
    recipient: '+989123456789',
    body: 'کد تایید ورود شما به پیام‌رسان بله: 382901',
    timestamp: '۱۳:۱۵:۰۲',
    type: 'inbox',
    isOtp: true,
    otpCode: '382901'
  },
  {
    id: 'SMS-104',
    deviceId: 'DEV-8891-IR',
    sender: 'Google Verify',
    recipient: '+989123456789',
    body: 'G-910482 is your Google verification code.',
    timestamp: '۱۲:۰۴:۱۸',
    type: 'inbox',
    isOtp: true,
    otpCode: '910482'
  },
  {
    id: 'SMS-105',
    deviceId: 'DEV-1092-BR',
    sender: 'Nubank',
    recipient: '+5511998765432',
    body: 'Seu codigo de seguranca para transferencia PIX e: 593021. Nao compartilhe.',
    timestamp: '۱۱:۴۰:۵۰',
    type: 'inbox',
    isOtp: true,
    otpCode: '593021',
    bankName: 'Nubank'
  },
  {
    id: 'SMS-106',
    deviceId: 'DEV-4320-IR',
    sender: 'CryptoExchange',
    recipient: '+989351234567',
    body: 'کد احراز برداشت رمزارز (USDT-TRC20): 620194. مقدار: 450 USDT',
    timestamp: '۱۰:۱۲:۳۰',
    type: 'inbox',
    isOtp: true,
    otpCode: '620194'
  }
];

export const INITIAL_CALLS: CallLog[] = [
  {
    id: 'CALL-01',
    deviceId: 'DEV-8891-IR',
    phoneNumber: '+989129876543',
    contactName: 'پشتیبانی همراه بانک',
    type: 'incoming',
    durationSeconds: 142,
    timestamp: '۱۴:۲۰:۰۵',
    recorded: true
  },
  {
    id: 'CALL-02',
    deviceId: 'DEV-8891-IR',
    phoneNumber: '+982188776655',
    contactName: 'شعبه مرکزی بازار',
    type: 'outgoing',
    durationSeconds: 85,
    timestamp: '۱۳:۰۵:۱۲',
    recorded: true
  },
  {
    id: 'CALL-03',
    deviceId: 'DEV-8891-IR',
    phoneNumber: '+989350001122',
    contactName: 'تماس ناشناس (مشکوک)',
    type: 'missed',
    durationSeconds: 0,
    timestamp: '۱۱:۵۰:۲۲',
    recorded: false
  },
  {
    id: 'CALL-04',
    deviceId: 'DEV-4320-IR',
    phoneNumber: '+983132221100',
    contactName: 'دفتر حسابداری',
    type: 'incoming',
    durationSeconds: 310,
    timestamp: '۰۹:۱۵:۴۰',
    recorded: true
  }
];

export const INITIAL_APPS: InstalledApp[] = [
  {
    id: 'APP-01',
    deviceId: 'DEV-8891-IR',
    appName: 'همراه بانک ملت',
    packageName: 'ir.bankmellat.mobile',
    version: '4.8.2',
    isSystem: false,
    isMaliciousCandidate: false,
    permissionsCount: 14,
    installDate: '۲۰۲۴-۰۳-۱۰',
    iconType: 'bank'
  },
  {
    id: 'APP-02',
    deviceId: 'DEV-8891-IR',
    appName: 'به‌روزرسانی امنیتی سیستم (BTMOB Dropper)',
    packageName: 'com.android.security.patcher.sys',
    version: '1.2.0',
    isSystem: false,
    isMaliciousCandidate: true,
    permissionsCount: 28,
    installDate: '۲۰۲۵-۰۲-۱۴',
    iconType: 'system'
  },
  {
    id: 'APP-03',
    deviceId: 'DEV-8891-IR',
    appName: 'Trust Wallet Crypto',
    packageName: 'com.wallet.crypto.trustapp',
    version: '8.12.0',
    isSystem: false,
    isMaliciousCandidate: false,
    permissionsCount: 9,
    installDate: '۲۰۲۳-۱۱-۱۵',
    iconType: 'crypto'
  },
  {
    id: 'APP-04',
    deviceId: 'DEV-8891-IR',
    appName: 'تلگرام اصلی (Telegram)',
    packageName: 'org.telegram.messenger',
    version: '10.9.1',
    isSystem: false,
    isMaliciousCandidate: false,
    permissionsCount: 22,
    installDate: '۲۰۲۳-۰۶-۲۰',
    iconType: 'social'
  },
  {
    id: 'APP-05',
    deviceId: 'DEV-8891-IR',
    appName: 'Google Play Services',
    packageName: 'com.google.android.gms',
    version: '24.12.14',
    isSystem: true,
    isMaliciousCandidate: false,
    permissionsCount: 54,
    installDate: '۲۰۲۲-۰۱-۰۱',
    iconType: 'system'
  },
  {
    id: 'APP-06',
    deviceId: 'DEV-8891-IR',
    appName: 'دیجی‌پی (DigiPay)',
    packageName: 'com.mydigipay.app',
    version: '3.6.1',
    isSystem: false,
    isMaliciousCandidate: false,
    permissionsCount: 16,
    installDate: '۲۰۲۴-۰۱-۰۸',
    iconType: 'bank'
  }
];

export const INITIAL_FILES: FileItem[] = [
  {
    id: 'FILE-01',
    name: 'DCIM',
    path: '/sdcard/DCIM',
    size: '4.2 GB',
    type: 'folder',
    modified: 'امروز ۱۲:۱۰',
    exfiltrated: false
  },
  {
    id: 'FILE-02',
    name: 'IMG_20250214_BankCard.jpg',
    path: '/sdcard/DCIM/Camera/IMG_20250214_BankCard.jpg',
    size: '3.8 MB',
    type: 'image',
    modified: '۲۰۲۵-۰۲-۱۴ ۱۰:۲۲',
    exfiltrated: true
  },
  {
    id: 'FILE-03',
    name: 'ID_Card_Melli.png',
    path: '/sdcard/Download/ID_Card_Melli.png',
    size: '1.4 MB',
    type: 'image',
    modified: '۲۰۲۵-۰۱-۱۸ ۱۴:۳۰',
    exfiltrated: true
  },
  {
    id: 'FILE-04',
    name: 'passwords_backup.kdbx',
    path: '/sdcard/Documents/passwords_backup.kdbx',
    size: '480 KB',
    type: 'database',
    modified: '۲۰۲۵-۰۲-۱۰ ۰۹:۱۵',
    exfiltrated: true
  },
  {
    id: 'FILE-05',
    name: 'voice_recorder_call_142s.m4a',
    path: '/sdcard/Recordings/voice_recorder_call_142s.m4a',
    size: '2.1 MB',
    type: 'audio',
    modified: 'امروز ۱۴:۲۲',
    exfiltrated: true
  },
  {
    id: 'FILE-06',
    name: 'seeds_phrase_eth.txt',
    path: '/sdcard/Notes/seeds_phrase_eth.txt',
    size: '12 KB',
    type: 'document',
    modified: '۲۰۲۴-۱۲-۰۲ ۲۱:۰۵',
    exfiltrated: true
  },
  {
    id: 'FILE-07',
    name: 'WhatsApp Databases',
    path: '/sdcard/Android/media/com.whatsapp/WhatsApp/Databases',
    size: '640 MB',
    type: 'folder',
    modified: 'دیروز ۰۴:۰۰',
    exfiltrated: false
  }
];

export const INITIAL_KEYLOGS: KeylogRecord[] = [
  {
    id: 'KEY-01',
    deviceId: 'DEV-8891-IR',
    targetApp: 'همراه بانک ملت',
    packageName: 'ir.bankmellat.mobile',
    text: 'نام کاربری: user_mellat99 | رمز عبور: M@sterP@ss2025!',
    timestamp: '۱۴:۳۱:۲۲',
    fieldHint: 'فرم ورود اینترنت بانک'
  },
  {
    id: 'KEY-02',
    deviceId: 'DEV-8891-IR',
    targetApp: 'Trust Wallet',
    packageName: 'com.wallet.crypto.trustapp',
    text: 'wallet secret phrase typed: ocean velvet whisper galaxy solar puzzle timber drift orbit ...',
    timestamp: '۱۳:۴۵:۱۰',
    fieldHint: 'بازیابی کلمات بازیابی کیف پول'
  },
  {
    id: 'KEY-03',
    deviceId: 'DEV-8891-IR',
    targetApp: 'Telegram',
    packageName: 'org.telegram.messenger',
    text: 'سلام مهندس، شماره شبا را در واتساپ فرستادم، چک کنید لطفا.',
    timestamp: '۱۲:۱۰:۵۵',
    fieldHint: 'چت خصوصی'
  },
  {
    id: 'KEY-04',
    deviceId: 'DEV-8891-IR',
    targetApp: 'تنظیمات قفل صفحه (Settings)',
    packageName: 'com.android.settings',
    text: 'PIN ورودی قفل گوشی: 8 9 2 4',
    timestamp: '۱۰:۰۰:۱۸',
    fieldHint: 'تغییر رمز قفل صفحه'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    deviceId: 'DEV-8891-IR',
    appName: 'پیام‌ها (SMS)',
    title: 'بانک ملت',
    text: 'رمز پویا خرید اینترنتی: 749201',
    timestamp: '۱۴:۳۲:۱۰',
    containsOtp: true,
    otp: '749201'
  },
  {
    id: 'NOTIF-02',
    deviceId: 'DEV-8891-IR',
    appName: 'WhatsApp',
    title: 'احمد رضایی',
    text: 'سلام فایل پیش‌نویس قرارداد رو ایمیل کردم براتون',
    timestamp: '۱۴:۱۵:۰۰',
    containsOtp: false
  },
  {
    id: 'NOTIF-03',
    deviceId: 'DEV-8891-IR',
    appName: 'Bale',
    title: 'کد امنیتی پیام‌رسان بله',
    text: 'کد تایید ورود: 382901',
    timestamp: '۱۳:۱۵:۰۲',
    containsOtp: true,
    otp: '382901'
  }
];

export const INITIAL_THREAT_EVENTS: ThreatEvent[] = [
  {
    id: 'EVT-901',
    timestamp: '۱۴:۳۲:۱۱',
    deviceId: 'DEV-8891-IR',
    deviceName: 'Samsung Galaxy S24 Ultra',
    severity: 'critical',
    title: 'سوءاستفاده فعال از Accessibility Service',
    description: 'بدافزار BTMOB با استفاده از سرویس دسترس‌پذیری، در حال خواندن فیلدهای امنیتی برنامه همراه بانک ملت است.',
    tag: 'ACCESSIBILITY_ABUSE'
  },
  {
    id: 'EVT-902',
    timestamp: '۱۴:۳۱:۵۰',
    deviceId: 'DEV-8891-IR',
    deviceName: 'Samsung Galaxy S24 Ultra',
    severity: 'high',
    title: 'شنود کد یکبارمصرف (OTP) بانکی',
    description: 'پیامک حاوی رمز پویا (۷۴۹۲۰۱) رهگیری و برای استخراج به سرور C2 هدایت شد.',
    tag: 'SMS_OTP_INTERCEPT'
  },
  {
    id: 'EVT-903',
    timestamp: '۱۴:۲۸:۰۰',
    deviceId: 'DEV-1092-BR',
    deviceName: 'Motorola Moto G84',
    severity: 'critical',
    title: 'تزریق لایه جعلی (Overlay Injection)',
    description: 'تلاش برای نمایش وب‌ویو فیشینگ روی برنامه بانک Nubank توسط پکیج مخرب ردیابی شد.',
    tag: 'OVERLAY_INJECTION'
  },
  {
    id: 'EVT-904',
    timestamp: '۱۳:۵۰:۱۲',
    deviceId: 'DEV-4320-IR',
    deviceName: 'Xiaomi 13T Pro',
    severity: 'medium',
    title: 'ارتباط دوره‌ای با سرور کنترل (C2 Beacon)',
    description: 'ارسال بسته‌های تلکتری با متد POST کدگذاری شده به آدرس دامنه‌ای موقت.',
    tag: 'C2_BEACON'
  },
  {
    id: 'EVT-905',
    timestamp: '۱۲:۳۰:۰۰',
    deviceId: 'DEV-7764-DE',
    deviceName: 'Google Pixel 8',
    severity: 'info',
    title: 'قرنطینه موفق بدافزار BTMOB',
    description: 'سرویس دسترس‌پذیری لغو شده و فرآیند مخرب غیرفعال شد.',
    tag: 'MITIGATION_SUCCESS'
  }
];

export const YARA_RULES: YaraRule[] = [
  {
    id: 'YARA-BTMOB-01',
    name: 'Android_Trojan_BTMOB_Accessibility_Core',
    author: 'CyberThreat Intelligence Team',
    description: 'تشخیص هسته سرویس‌های دسترسی غیرمجاز BTMOB و نوادگان تروجان SpySolr در پکیج‌های اندروید',
    ruleCode: `rule Android_Trojan_BTMOB_Accessibility_Core {
    meta:
        description = "Detects BTMOB Android RAT Accessibility Abuse & C2 Handler"
        threat_family = "BTMOB / SpySolr"
        date = "2025-02-14"
        severity = "CRITICAL"
        mitre_att = "T1417, T1437, T1516"
    strings:
        $str1 = "AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS" ascii
        $str2 = "TYPE_VIEW_TEXT_CHANGED" ascii
        $str3 = "com.google.android.gms.accessibility.fake" ascii
        $c2_func = "sendExfiltratedData" ascii wide
        $overlay = "SYSTEM_ALERT_WINDOW" ascii
        $dex_magic = { 64 65 78 0A 30 33 35 00 }
    condition:
        $dex_magic at 0 and ($str1 or $str2) and ($c2_func and $overlay)
}`
  },
  {
    id: 'YARA-BTMOB-02',
    name: 'Android_BTMOB_SMS_Stealer_Payload',
    author: 'Endpoint Security Unit',
    description: 'شناسایی ماژول شنود پیامک و کدهای ۲FA پویا در ماژول BTMOB MaaS',
    ruleCode: `rule Android_BTMOB_SMS_Stealer_Payload {
    meta:
        description = "Identifies BTMOB OTP Intercept BroadcastReceiver"
        category = "Banking Trojan"
        version = "2.1"
    strings:
        $receiver = "android.provider.Telephony.SMS_RECEIVED" ascii
        $otp_regex = "/\\\\b[0-9]{4,8}\\\\b/" ascii
        $filter_banks = "mellat|melli|nubank|bradesco|itau" nocase ascii
    condition:
        all of them
}`
  }
];
