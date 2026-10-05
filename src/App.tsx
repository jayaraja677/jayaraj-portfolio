import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { CertificatesPage } from './pages/public/CertificatesPage';
import { SkillsPage } from './pages/public/SkillsPage';
import { EducationPage } from './pages/public/EducationPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminProtectedRoute } from './pages/admin/AdminProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminCertificatesPage } from './pages/admin/AdminCertificatesPage';
import { AdminSkillsPage } from './pages/admin/AdminSkillsPage';
import { AdminEducationPage } from './pages/admin/AdminEducationPage';
import { AdminAchievementsPage } from './pages/admin/AdminAchievementsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Recruiter Portfolio Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/certificates" element={<CertificatesPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin Authentication */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Dashboard */}
      <Route path="/admin/dashboard" element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardOverview />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="certificates" element={<AdminCertificatesPage />} />
          <Route path="skills" element={<AdminSkillsPage />} />
          <Route path="education" element={<AdminEducationPage />} />
          <Route path="achievements" element={<AdminAchievementsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
