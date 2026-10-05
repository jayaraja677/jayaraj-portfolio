import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

const DEV_AUTH_SESSION_KEY = 'jayaraj_portfolio_dev_auth_token';
const DEV_USER: AdminUser = {
  id: 'dev-admin-user',
  email: 'admin@jayaraj.dev',
  role: 'authenticated',
};

class AuthService {
  private listeners: Array<(user: AdminUser | null) => void> = [];

  constructor() {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user
          ? {
              id: session.user.id,
              email: session.user.email || 'admin@portfolio.local',
              role: session.user.role || 'authenticated',
            }
          : null;
        this.notify(user);
      });
    }
  }

  private notify(user: AdminUser | null) {
    this.listeners.forEach((callback) => callback(user));
  }

  subscribe(callback: (user: AdminUser | null) => void): () => void {
    this.listeners.push(callback);
    // Initial call
    this.getUser().then(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  async getUser(): Promise<AdminUser | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data.user) {
          return {
            id: data.user.id,
            email: data.user.email || 'admin@portfolio.local',
            role: data.user.role || 'authenticated',
          };
        }
        return null;
      } catch {
        return null;
      }
    }

    // Dev Fallback mode using sessionStorage
    const token = sessionStorage.getItem(DEV_AUTH_SESSION_KEY);
    if (token) {
      return DEV_USER;
    }
    return null;
  }

  async signIn(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          return { user: null, error: error.message };
        }
        if (data.user) {
          const user: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            role: data.user.role || 'authenticated',
          };
          this.notify(user);
          return { user, error: null };
        }
        return { user: null, error: 'Authentication failed' };
      } catch (err: any) {
        return { user: null, error: err?.message || 'Network error connecting to Supabase' };
      }
    }

    // Dev mode validation: check email and password minimum length
    if (!email || !password) {
      return { user: null, error: 'Email and password are required' };
    }
    if (password.length < 6) {
      return { user: null, error: 'Password must be at least 6 characters' };
    }

    // Accept credentials in local development mode
    sessionStorage.setItem(DEV_AUTH_SESSION_KEY, 'dev-session-active-' + Date.now());
    this.notify(DEV_USER);
    return { user: DEV_USER, error: null };
  }

  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error', err);
      }
    }
    sessionStorage.removeItem(DEV_AUTH_SESSION_KEY);
    this.notify(null);
  }

  isConfigured(): boolean {
    return isSupabaseConfigured;
  }
}

export const authService = new AuthService();
