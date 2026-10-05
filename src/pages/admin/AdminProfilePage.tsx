import React, { useState, useEffect } from 'react';
import { User, Save, Upload, Link as LinkIcon, FileText, Check } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AvatarFallback } from '../../components/ui/AvatarFallback';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { storageService } from '../../services/storageService';
import { Profile, ToastMessage } from '../../types/portfolio';
import { initialProfile } from '../../data/initialData';

export const AdminProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    portfolioService.getProfile().then((data) => {
      setProfile(data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await portfolioService.updateProfile(profile);
      setProfile(updated);
      addToast('success', 'Profile information updated successfully');
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await storageService.uploadFile(file, 'profile');
      setProfile((prev) => ({ ...prev, avatarUrl: url }));
      addToast('success', 'Profile image uploaded successfully');
    } catch (err: any) {
      addToast('error', 'Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleResumeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
    try {
      const url = await storageService.uploadFile(file, 'resumes');
      setProfile((prev) => ({ ...prev, resumeUrl: url }));
      addToast('success', 'Resume document uploaded successfully');
    } catch (err: any) {
      addToast('error', 'Failed to upload resume document');
    } finally {
      setIsUploadingResume(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Profile Configuration</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Update personal coordinates, headline, biography, resume, and avatar.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & File Uploads */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 text-center space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">Profile Avatar</h3>
            
            <div className="flex justify-center">
              <AvatarFallback
                src={profile.avatarUrl}
                alt={profile.fullName}
                name={profile.fullName}
                size="xl"
                className="w-36 h-36 rounded-2xl"
              />
            </div>

            <div className="space-y-2">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={isUploadingImage}
                  className="block w-full text-xs text-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-bg-secondary file:text-text-primary hover:file:bg-white/10 file:cursor-pointer cursor-pointer"
                />
              </label>
              {isUploadingImage && (
                <span className="text-[11px] font-mono text-crimson-accent">Uploading photo...</span>
              )}
              <p className="text-[11px] text-text-muted">
                Or enter image path / public URL below:
              </p>
              <input
                type="text"
                value={profile.avatarUrl}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                placeholder="/profile.jpg"
                className="w-full px-3 py-1.5 rounded bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </Card>

          {/* Resume Upload Card */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">Curriculum Vitae / Resume</h3>
            
            <div className="space-y-2">
              <label className="block">
                <span className="sr-only">Choose resume file</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeFileChange}
                  disabled={isUploadingResume}
                  className="block w-full text-xs text-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-bg-secondary file:text-text-primary hover:file:bg-white/10 file:cursor-pointer cursor-pointer"
                />
              </label>
              {isUploadingResume && (
                <span className="text-[11px] font-mono text-crimson-accent">Uploading resume...</span>
              )}
              <p className="text-[11px] text-text-muted">
                Current Resume Link:
              </p>
              <input
                type="text"
                value={profile.resumeUrl}
                onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                placeholder="/resume.pdf"
                className="w-full px-3 py-1.5 rounded bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Identity Details */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border-subtle">
              Basic Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-secondary">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-secondary">Location</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Mangalore, Karnataka, India"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Headline / Subtitle</label>
              <input
                type="text"
                required
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">About / Bio Narrative</label>
              <textarea
                rows={5}
                required
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </Card>

          {/* Social & Contact Coordinates */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-primary pb-2 border-b border-border-subtle">
              Contact & Social Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-secondary">Email Address</label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-secondary">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-secondary">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-text-secondary">GitHub Profile URL</label>
                <input
                  type="url"
                  value={profile.githubUrl}
                  onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-secondary border border-border-subtle text-text-primary text-sm focus:border-crimson focus:outline-none"
                />
              </div>
            </div>
          </Card>

          {/* Submit Action */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSaving}
              icon={<Save className="w-4 h-4" />}
            >
              Save Profile Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
