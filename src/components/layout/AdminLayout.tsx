import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Award,
  Wrench,
  GraduationCap,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Database,
  HardDrive,
} from 'lucide-react';
import { authService, AdminUser } from '../../services/authService';
import { isSupabaseConfigured } from '../../lib/supabase';

interface NavItem {
  name: string;
  to: string;
  icon: React.FC<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile', to: '/admin/dashboard/profile', icon: User },
  { name: 'Projects', to: '/admin/dashboard/projects', icon: FolderGit2 },
  { name: 'Certificates', to: '/admin/dashboard/certificates', icon: Award },
  { name: 'Skills', to: '/admin/dashboard/skills', icon: Wrench },
  { name: 'Education', to: '/admin/dashboard/education', icon: GraduationCap },
  { name: 'Achievements', to: '/admin/dashboard/achievements', icon: Trophy },
  { name: 'Settings', to: '/admin/dashboard/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    authService.getUser().then(setCurrentUser);
    const unsubscribe = authService.subscribe((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-64 bg-bg-secondary border-r border-border-subtle flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 px-6 border-b border-border-subtle flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-crimson flex items-center justify-center font-mono font-bold text-xs text-white">
                JA
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wider text-text-primary uppercase">
                  Admin Panel
                </span>
                <span className="text-[10px] font-mono text-text-secondary">Portfolio CMS</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-text-secondary hover:text-text-primary"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="p-4 space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isDashboardRoot = item.to === '/admin/dashboard';
              const isActive = isDashboardRoot
                ? location.pathname === '/admin/dashboard'
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-crimson text-white shadow-crimson-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Database Mode Status */}
          <div className="p-4 mx-4 mb-3 rounded-lg bg-bg-card border border-border-subtle text-xs">
            <div className="flex items-center gap-2 mb-1">
              {isSupabaseConfigured ? (
                <>
                  <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-text-primary">Supabase Live</span>
                </>
              ) : (
                <>
                  <HardDrive className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-text-primary">Local Storage Dev</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-text-secondary">
              {isSupabaseConfigured
                ? 'Connected to cloud PostgreSQL & Storage'
                : 'Running on persistent local storage fallback'}
            </p>
          </div>

          {/* User and Logout */}
          <div className="p-4 border-t border-border-subtle space-y-2">
            <div className="px-2 py-1 flex flex-col">
              <span className="text-xs font-medium text-text-primary truncate">
                {currentUser?.email || 'admin@portfolio'}
              </span>
              <span className="text-[10px] text-text-secondary">Admin Role</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-crimson-accent hover:bg-crimson/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-border-subtle bg-bg-secondary flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-bg-card border border-border-subtle text-text-secondary hover:text-text-primary"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold text-text-primary hidden sm:block">
              Portfolio Content Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs text-text-secondary hover:text-text-primary hover:border-crimson transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Page Outlet */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 bg-bg-primary overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
