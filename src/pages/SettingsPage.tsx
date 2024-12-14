import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserSettings } from '../contexts/UserSettingsContext';
import { storage } from '../utils/storage';
import { GlassCard } from '../components/GlassCard';
import { SectionHeader } from '../components/Typography';
import { LogOut, Download, Upload, User, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { settings, updateSettings } = useUserSettings();
  const [name, setName] = useState(settings.name);

  const handleExport = () => {
    storage.exportData();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      storage.importData(file).then(success => {
        if (success) {
          alert('Data imported successfully');
          window.location.reload();
        } else {
          alert('Failed to import data');
        }
      });
    }
  };

  const handleUpdateName = () => {
    updateSettings({ name: name.trim() });
  };

  return (
    <div className="space-y-6">
      <SectionHeader>Settings</SectionHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-xl font-light text-white flex items-center gap-2">
              <User className="w-6 h-6" />
              Account
            </h3>

            <div className="space-y-4">
              <div className="text-white/70">
                {currentUser?.email}
              </div>

              <div className="space-y-2">
                <label className="block text-white/90 font-light">Display Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
                    placeholder="Enter your name"
                  />
                  <button
                    onClick={handleUpdateName}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-xl font-light text-white">Data Management</h3>

            <div className="space-y-4">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>

              <label className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};