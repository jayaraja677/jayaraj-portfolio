import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft, Database, HardDrive } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { authService } from '../../services/authService';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await authService.signIn(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevQuickFill = () => {
    setEmail('admin@jayaraj.dev');
    setPassword('devadmin2024');
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative selection:bg-crimson selection:text-white">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#292929_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="p-8 border border-border-subtle bg-bg-card shadow-2xl relative overflow-hidden">
          {/* Crimson Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-dark via-crimson to-crimson-accent" />

          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-crimson/50 flex items-center justify-center mx-auto text-crimson-accent mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text-primary">
              Portfolio Admin Portal
            </h2>
            <p className="text-xs text-text-secondary">
              Sign in to manage portfolio content, projects, and certifications.
            </p>
          </div>

          {/* Mode Indicator Banner */}
          <div className="mb-6 p-3 rounded-lg bg-bg-secondary border border-border-subtle text-xs">
            <div className="flex items-center gap-2 mb-1">
              {isSupabaseConfigured ? (
                <>
                  <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-text-primary">Supabase Auth Connected</span>
                </>
              ) : (
                <>
                  <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-text-primary">Local Development Mode</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              {isSupabaseConfigured
                ? 'Authenticating securely against your Supabase user directory.'
                : 'Supabase credentials not configured in .env. Running in local dev session mode.'}
            </p>
            {!isSupabaseConfigured && (
              <button
                type="button"
                onClick={handleDevQuickFill}
                className="mt-2 text-[11px] font-mono text-crimson-accent hover:underline flex items-center gap-1"
              >
                Auto-fill Dev Credentials
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-crimson-dark/20 border border-crimson text-xs flex items-start gap-2 text-text-primary">
              <AlertCircle className="w-4 h-4 text-crimson-accent shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jayaraj.dev"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
