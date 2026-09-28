/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { SendSmsModal } from './components/SendSmsModal';
import { DeviceDetailModal } from './components/DeviceDetailModal';

// Views
import { OverviewView } from './components/views/OverviewView';
import { DevicesView } from './components/views/DevicesView';
import { RemoteScreenView } from './components/views/RemoteScreenView';
import { SmsCallView } from './components/views/SmsCallView';
import { AppManagerView } from './components/views/AppManagerView';
import { FileManagerView } from './components/views/FileManagerView';
import { KeyloggerView } from './components/views/KeyloggerView';
import { TerminalView } from './components/views/TerminalView';
import { ThreatIntelView } from './components/views/ThreatIntelView';

const DashboardContent: React.FC = () => {
  const { activeTab } = useDashboard();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'devices':
        return <DevicesView />;
      case 'remote-screen':
        return <RemoteScreenView />;
      case 'sms-calls':
        return <SmsCallView />;
      case 'apps-sandbox':
        return <AppManagerView />;
      case 'file-manager':
        return <FileManagerView />;
      case 'keylogger':
        return <KeyloggerView />;
      case 'terminal':
        return <TerminalView />;
      case 'threat-intel':
        return <ThreatIntelView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <SendSmsModal />
      <DeviceDetailModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
