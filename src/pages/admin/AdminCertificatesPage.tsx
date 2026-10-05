import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { storageService } from '../../services/storageService';
import { Certificate, ToastMessage } from '../../types/portfolio';

export const AdminCertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '2024',
    credentialId: '',
    verificationUrl: '',
    fileUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Delete Confirm
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const loadCertificates = async () => {
    try {
      const data = await portfolioService.getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const openCreateModal = () => {
    setEditingCert(null);
    setFormData({
      name: '',
      issuingOrganization: '',
      issueDate: '2024',
      credentialId: '',
      verificationUrl: '',
      fileUrl: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      issuingOrganization: cert.issuingOrganization,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId || '',
      verificationUrl: cert.verificationUrl || '',
      fileUrl: cert.fileUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await storageService.uploadFile(file, 'certificates');
      setFormData((prev) => ({ ...prev, fileUrl: url }));
      addToast('success', 'Certificate file attached');
    } catch {
      addToast('error', 'Failed to upload certificate file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCert) {
        await portfolioService.updateCertificate(editingCert.id, {
          name: formData.name,
          issuingOrganization: formData.issuingOrganization,
          issueDate: formData.issueDate,
          credentialId: formData.credentialId,
          verificationUrl: formData.verificationUrl,
          fileUrl: formData.fileUrl,
        });
        addToast('success', 'Certificate updated successfully');
      } else {
        await portfolioService.createCertificate({
          name: formData.name,
          issuingOrganization: formData.issuingOrganization,
          issueDate: formData.issueDate,
          credentialId: formData.credentialId,
          verificationUrl: formData.verificationUrl,
          fileUrl: formData.fileUrl,
        });
        addToast('success', 'Certificate added successfully');
      }
      setIsModalOpen(false);
      loadCertificates();
    } catch (err: any) {
      addToast('error', err?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await portfolioService.deleteCertificate(deleteTarget.id);
      addToast('success', `Certificate "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
      loadCertificates();
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to delete certificate');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Certificate Management</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Maintain verified certificates, issuing authorities, credential IDs, and files.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add Certificate
        </Button>
      </div>

      {/* Certificate Table */}
      <Card className="overflow-hidden p-0 border border-border-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-bg-secondary border-b border-border-subtle text-text-secondary font-mono">
                <th className="py-3 px-4 font-semibold">Certificate Name</th>
                <th className="py-3 px-4 font-semibold">Issuing Organization</th>
                <th className="py-3 px-4 font-semibold">Credential ID</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-text-muted">
                    No certificates recorded.
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-text-primary block">{cert.name}</span>
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-crimson-accent hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <span>Verification Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-text-secondary">
                      {cert.issuingOrganization}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-text-muted">
                      {cert.credentialId || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-text-secondary">{cert.issueDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(cert)}
                          className="p-1.5 rounded hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                          title="Edit Certificate"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cert)}
                          className="p-1.5 rounded hover:bg-crimson/15 text-text-secondary hover:text-crimson-accent transition-colors"
                          title="Delete Certificate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCert ? 'Edit Certificate' : 'Add New Certificate'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Certificate Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Python for Data Science & Machine Learning"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Issuing Organization</label>
              <input
                type="text"
                required
                value={formData.issuingOrganization}
                onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                placeholder="e.g. Coursera / HackerRank / Cisco"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Issue Date / Year</label>
              <input
                type="text"
                required
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="2024"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Credential ID (optional)</label>
              <input
                type="text"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="CERT-89012"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Verification URL</label>
              <input
                type="url"
                value={formData.verificationUrl}
                onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Upload Certificate Document / Badge</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="block w-full text-xs text-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-bg-card file:text-text-primary hover:file:bg-white/10 file:cursor-pointer cursor-pointer"
            />
            {formData.fileUrl && (
              <p className="text-[10px] font-mono text-emerald-400">File attached</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              {editingCert ? 'Save Changes' : 'Add Certificate'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Certificate"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};
