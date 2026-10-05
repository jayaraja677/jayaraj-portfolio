import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { Education, ToastMessage } from '../../types/portfolio';

export const AdminEducationPage: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startYear: '2023',
    endYear: '2026',
    description: '',
    grade: 'Pursuing',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Education | null>(null);
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

  const loadEducation = async () => {
    try {
      const data = await portfolioService.getEducation();
      setEducationList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const openCreateModal = () => {
    setEditingEdu(null);
    setFormData({
      degree: '',
      institution: 'Shree Devi College of Information Science',
      startYear: '2023',
      endYear: '2026',
      description: '',
      grade: 'Pursuing',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      startYear: edu.startYear,
      endYear: edu.endYear,
      description: edu.description,
      grade: edu.grade || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingEdu) {
        await portfolioService.updateEducation(editingEdu.id, {
          degree: formData.degree,
          institution: formData.institution,
          startYear: formData.startYear,
          endYear: formData.endYear,
          description: formData.description,
          grade: formData.grade,
        });
        addToast('success', 'Education record updated');
      } else {
        await portfolioService.createEducation({
          degree: formData.degree,
          institution: formData.institution,
          startYear: formData.startYear,
          endYear: formData.endYear,
          description: formData.description,
          grade: formData.grade,
        });
        addToast('success', 'Education record added');
      }
      setIsModalOpen(false);
      loadEducation();
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
      await portfolioService.deleteEducation(deleteTarget.id);
      addToast('success', `Education entry "${deleteTarget.degree}" deleted`);
      setDeleteTarget(null);
      loadEducation();
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to delete record');
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
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Education Management</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Maintain degrees, institutions, study durations, and course summaries.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add Education
        </Button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {educationList.length === 0 ? (
          <Card className="p-8 text-center text-text-muted text-xs">
            No education entries found.
          </Card>
        ) : (
          educationList.map((edu) => (
            <Card key={edu.id} className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-crimson" />
                  <h3 className="text-base font-semibold text-text-primary">{edu.degree}</h3>
                </div>
                <p className="text-xs text-crimson-accent font-mono font-medium">
                  {edu.institution}
                </p>
                <p className="text-xs text-text-secondary max-w-2xl leading-relaxed">
                  {edu.description}
                </p>
                <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-text-muted">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  {edu.grade && <span>• Status: {edu.grade}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-start">
                <button
                  onClick={() => openEditModal(edu)}
                  className="p-1.5 rounded hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(edu)}
                  className="p-1.5 rounded hover:bg-crimson/15 text-text-secondary hover:text-crimson-accent transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEdu ? 'Edit Education' : 'Add Education Record'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Degree / Course</label>
            <input
              type="text"
              required
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g. Bachelor of Computer Applications (BCA)"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Institution / College</label>
            <input
              type="text"
              required
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="Shree Devi College of Information Science"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Start Year</label>
              <input
                type="text"
                required
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="2023"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">End Year (or Expected)</label>
              <input
                type="text"
                required
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                placeholder="2026"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Grade / Academic Status</label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              placeholder="e.g. Pursuing / CGPA"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Description / Curriculum Focus</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Focus areas, coursework in data structures, algorithms, python, and analytics..."
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none resize-none leading-relaxed"
            />
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
              {editingEdu ? 'Save Changes' : 'Add Education'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Education Entry"
        message={`Are you sure you want to remove "${deleteTarget?.degree}"?`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};
