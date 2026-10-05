import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Wrench } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { Skill, SkillCategory, ToastMessage } from '../../types/portfolio';

const categories: SkillCategory[] = [
  'Programming',
  'Data Analytics',
  'AI/ML',
  'Cyber Security',
  'Web Development',
  'Tools',
];

export const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming' as SkillCategory,
    proficiencyLevel: 'Proficient' as Skill['proficiencyLevel'],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);
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

  const loadSkills = async () => {
    try {
      const data = await portfolioService.getSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Programming',
      proficiencyLevel: 'Proficient',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingSkill) {
        await portfolioService.updateSkill(editingSkill.id, {
          name: formData.name,
          category: formData.category,
          proficiencyLevel: formData.proficiencyLevel,
        });
        addToast('success', 'Skill updated successfully');
      } else {
        await portfolioService.createSkill({
          name: formData.name,
          category: formData.category,
          proficiencyLevel: formData.proficiencyLevel,
        });
        addToast('success', 'Skill added successfully');
      }
      setIsModalOpen(false);
      loadSkills();
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
      await portfolioService.deleteSkill(deleteTarget.id);
      addToast('success', `Skill "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
      loadSkills();
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to delete skill');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Skills Management</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Organize core capabilities across Programming, Data Analytics, AI/ML, Cyber Security, Web, and Tools.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add Skill
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
            selectedCategory === 'All'
              ? 'bg-crimson text-white shadow-crimson-sm border border-crimson'
              : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border-subtle'
          }`}
        >
          All ({skills.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              selectedCategory === cat
                ? 'bg-crimson text-white shadow-crimson-sm border border-crimson'
                : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border-subtle'
            }`}
          >
            {cat} ({skills.filter((s) => s.category === cat).length})
          </button>
        ))}
      </div>

      {/* Skills Table */}
      <Card className="overflow-hidden p-0 border border-border-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-bg-secondary border-b border-border-subtle text-text-secondary font-mono">
                <th className="py-3 px-4 font-semibold">Skill Name</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Proficiency Level</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {filteredSkills.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-text-muted">
                    No skills in this category.
                  </td>
                </tr>
              ) : (
                filteredSkills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-text-primary">{skill.name}</td>
                    <td className="py-3 px-4 font-mono text-crimson-accent">{skill.category}</td>
                    <td className="py-3 px-4 font-mono text-text-secondary">
                      {skill.proficiencyLevel}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(skill)}
                          className="p-1.5 rounded hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                          title="Edit Skill"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(skill)}
                          className="p-1.5 rounded hover:bg-crimson/15 text-text-secondary hover:text-crimson-accent transition-colors"
                          title="Delete Skill"
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
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Skill Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Scikit-Learn"
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as SkillCategory })
                }
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Proficiency Level</label>
              <select
                value={formData.proficiencyLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proficiencyLevel: e.target.value as Skill['proficiencyLevel'],
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Proficient">Proficient</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
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
              {editingSkill ? 'Save Changes' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Skill"
        message={`Are you sure you want to remove "${deleteTarget?.name}"?`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};
