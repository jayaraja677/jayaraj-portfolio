import React, { useState } from 'react';
import {
  Database,
  HardDrive,
  Copy,
  Check,
  RotateCcw,
  Download,
  Upload,
  ShieldAlert,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { ToastMessage } from '../../types/portfolio';

export const AdminSettingsPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const sampleEnv = `VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const copyEnv = () => {
    navigator.clipboard.writeText(sampleEnv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('success', 'Environment template copied to clipboard');
  };

  const handleResetDefaults = () => {
    portfolioService.resetToDefaults();
    setIsResetConfirmOpen(false);
    addToast('success', 'Local portfolio data restored to authentic default seeds.');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExportData = async () => {
    try {
      const [profile, projects, certs, skills, edu, ach] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getProjects(),
        portfolioService.getCertificates(),
        portfolioService.getSkills(),
        portfolioService.getEducation(),
        portfolioService.getAchievements(),
      ]);

      const backup = {
        exportedAt: new Date().toISOString(),
        profile,
        projects,
        certificates: certs,
        skills,
        education: edu,
        achievements: ach,
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `jayaraj_portfolio_backup_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      addToast('success', 'Portfolio JSON backup downloaded successfully');
    } catch {
      addToast('error', 'Failed to export backup');
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Header */}
      <div className="pb-6 border-b border-border-subtle">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">System & Database Settings</h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Manage Supabase connection, environment variables, SQL schemas, and local backups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Supabase Connection State */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2.5">
              {isSupabaseConfigured ? (
                <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                  <Database className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-800/40">
                  <HardDrive className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Backend Engine Status</h3>
                <span className="text-[11px] font-mono text-text-muted">
                  {isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Persistent LocalStorage Fallback'}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                  : 'bg-amber-950/50 text-amber-400 border border-amber-800/50'
              }`}
            >
              {isSupabaseConfigured ? 'ONLINE' : 'DEV MODE'}
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {isSupabaseConfigured
              ? 'Your application is connected to Supabase. All CRUD operations on projects, certificates, skills, education, and files sync directly with your PostgreSQL database and Storage buckets.'
              : 'Supabase credentials are not detected in .env. The application is running in fully interactive Local Dev mode. All updates are persisted locally in your browser so you can test all admin features without any external dependencies.'}
          </p>

          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-mono font-semibold text-text-primary">
              To connect Supabase in production:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-text-secondary">
              <li>Create a free project at <span className="text-text-primary font-mono">supabase.com</span></li>
              <li>Execute the SQL migration located in <span className="text-crimson-accent font-mono">supabase/schema.sql</span></li>
              <li>Add the following keys to your <span className="text-text-primary font-mono">.env</span> file:</li>
            </ol>
            <div className="relative mt-2 p-3 rounded-lg bg-bg-secondary border border-border-subtle font-mono text-xs text-text-secondary">
              <pre className="overflow-x-auto">{sampleEnv}</pre>
              <button
                type="button"
                onClick={copyEnv}
                className="absolute top-2.5 right-2.5 p-1.5 rounded hover:bg-bg-card text-text-secondary hover:text-text-primary transition-colors"
                title="Copy template"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </Card>

        {/* Data Maintenance & Backups */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border-subtle">
              Data Backup & Export
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Export all profile details, projects, certificates, skills, and timeline entries as a structured JSON backup.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              icon={<Download className="w-4 h-4" />}
            >
              Export JSON Backup
            </Button>
          </Card>

          <Card className="p-6 space-y-4 border-crimson/30">
            <div className="flex items-center gap-2 text-crimson-accent">
              <ShieldAlert className="w-4 h-4" />
              <h3 className="text-sm font-semibold text-text-primary">Reset to Default Data</h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Reset all local portfolio items to the authentic verified background seeds for Jayaraj A. This clears any temporary test entries made in local dev mode.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Reset to Authentic Seeds
            </Button>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetDefaults}
        title="Reset Portfolio Data"
        message="Are you sure you want to reset all portfolio data back to initial seeds? Any custom changes made in local development will be replaced."
        confirmText="Confirm Reset"
      />
    </div>
  );
};
