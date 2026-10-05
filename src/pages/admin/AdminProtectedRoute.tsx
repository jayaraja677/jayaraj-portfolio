import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService, AdminUser } from '../../services/authService';

export const AdminProtectedRoute: React.FC = () => {
  const [user, setUser] = useState<AdminUser | null | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    authService.getUser().then((u) => {
      if (isMounted) setUser(u);
    });

    const unsubscribe = authService.subscribe((u) => {
      if (isMounted) setUser(u);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-text-secondary">Authenticating Session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
