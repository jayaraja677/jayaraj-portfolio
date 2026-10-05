import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Trophy, Calendar, ExternalLink } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { Achievement, ToastMessage } from '../../types/portfolio';

export const AdminAchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '2024',
    linkUrl: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null);
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

  const loadAchievements = async () => {
    try {
      const data = await portfolioService.getAchievements();
      setAchievements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const openCreateModal = () => {
    setEditingAch(null);
    setFormData({
      title: '',
      description: '',
      date: '2024',
      linkUrl: '',
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ach: Achievement) => {
    setEditingAch(ach);
    setFormData({
      title: ach.title,
      description: ach.description,
      date: ach.date,
      linkUrl: ach.linkUrl || '',
      imageUrl: ach.imageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingAch) {
        await portfolioService.updateAchievement(editingAch.id, {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          linkUrl: formData.linkUrl,
          imageUrl: formData.imageUrl,
        });
        addToast('success', 'Achievement updated');
      } else {
        await portfolioService.createAchievement({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          linkUrl: formData.linkUrl,
          imageUrl: formData.imageUrl,
        });
        addToast('success', 'Achievement created');
      }
      setIsModalOpen(false);
      loadAchievements();
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
      await portfolioService.deleteAchievement(deleteTarget.id);
      addToast('success', `Achievement "${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
      loadAchievements();
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to delete');
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
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Achievements & Milestones</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Showcase academic hackathons, workshops, symposium presentations, and competitive milestones.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add Milestone
        </Button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.length === 0 ? (
          <div className="col-span-2 p-8 text-center text-text-muted text-xs bg-bg-card rounded-lg border border-border-subtle">
            No achievements recorded.
          </div>
        ) : (
          achievements.map((ach) => (
            <Card key={ach.id} className="p-5 flex flex-col justify-between group">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-crimson" />
                    <span className="text-xs font-mono text-text-muted">{ach.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(ach)}
                      className="p-1 rounded hover:bg-bg-secondary text-text-secondary hover:text-text-primary"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(ach)}
                      className="p-1 rounded hover:bg-crimson/15 text-text-secondary hover:text-crimson-accent"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-text-primary">{ach.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{ach.description}</p>
              </div>

              {ach.linkUrl && (
                <div className="pt-3 border-t border-border-subtle/50 mt-3 flex justify-end">
                  <a
                    href={ach.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-crimson-accent hover:underline inline-flex items-center gap-1 font-mono"
                  >
                    <span>View Reference</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAch ? 'Edit Milestone' : 'Add Milestone'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Milestone Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Department Technical Symposium Presentation"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Date / Year</label>
            <input
              type="text"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="2024"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Description</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of presentation, coding competition, or workshop outcome..."
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">External Link (optional)</label>
            <input
              type="url"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
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
              {editingAch ? 'Save Changes' : 'Add Milestone'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Milestone"
        message={`Are you sure you want to remove "${deleteTarget?.title}"?`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};
