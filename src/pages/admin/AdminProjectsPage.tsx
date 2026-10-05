import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Star,
  FolderGit2,
  Check,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { ToastContainer } from '../../components/ui/Toast';
import { portfolioService } from '../../services/portfolioService';
import { storageService } from '../../services/storageService';
import { Project, ToastMessage } from '../../types/portfolio';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'Data Analytics',
    githubUrl: '',
    liveDemoUrl: '',
    imageUrl: '',
    status: 'Completed' as Project['status'],
    featured: false,
    date: '2024',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Confirm Delete Dialog
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
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

  const loadProjects = async () => {
    try {
      const data = await portfolioService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: 'Python, Pandas, Scikit-Learn',
      category: 'Data Analytics',
      githubUrl: 'https://github.com/jayaraj-a/',
      liveDemoUrl: '',
      imageUrl: '',
      status: 'Completed',
      featured: false,
      date: '2024',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      category: project.category,
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || '',
      imageUrl: project.imageUrl || '',
      status: project.status,
      featured: project.featured,
      date: project.date,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await storageService.uploadFile(file, 'projects');
      setFormData((prev) => ({ ...prev, imageUrl: url }));
      addToast('success', 'Project image uploaded');
    } catch {
      addToast('error', 'Failed to upload project image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingProject) {
        await portfolioService.updateProject(editingProject.id, {
          title: formData.title,
          description: formData.description,
          technologies: techArray,
          category: formData.category,
          githubUrl: formData.githubUrl,
          liveDemoUrl: formData.liveDemoUrl,
          imageUrl: formData.imageUrl,
          status: formData.status,
          featured: formData.featured,
          date: formData.date,
        });
        addToast('success', 'Project updated successfully');
      } else {
        await portfolioService.createProject({
          title: formData.title,
          description: formData.description,
          technologies: techArray,
          category: formData.category,
          githubUrl: formData.githubUrl,
          liveDemoUrl: formData.liveDemoUrl,
          imageUrl: formData.imageUrl,
          status: formData.status,
          featured: formData.featured,
          date: formData.date,
        });
        addToast('success', 'Project created successfully');
      }
      setIsModalOpen(false);
      loadProjects();
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
      await portfolioService.deleteProject(deleteTarget.id);
      addToast('success', `Project "${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
      loadProjects();
    } catch (err: any) {
      addToast('error', err?.message || 'Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  };

  const categories = ['All', 'Data Analytics', 'Cyber Security', 'AI/ML', 'Programming', 'Web Development'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Project Management</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Create, update, search, and delete technical projects and repository links.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={openCreateModal} icon={<Plus className="w-4 h-4" />}>
          Add Project
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or technologies..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-text-muted shrink-0" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Projects Table */}
      <Card className="overflow-hidden p-0 border border-border-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-bg-secondary border-b border-border-subtle text-text-secondary font-mono">
                <th className="py-3 px-4 font-semibold">Title & Category</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Technologies</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/60">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-text-muted">
                    No matching projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <Star className="w-3.5 h-3.5 text-crimson fill-crimson shrink-0" />
                        )}
                        <div>
                          <span className="font-semibold text-text-primary block">
                            {project.title}
                          </span>
                          <span className="text-[11px] font-mono text-crimson-accent">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.technologies.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-bg-secondary text-[10px] font-mono text-text-secondary border border-border-subtle"
                          >
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] text-text-muted">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                          project.status === 'Completed'
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                            : 'bg-amber-950/40 text-amber-400 border border-amber-800/40'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-text-secondary">{project.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 rounded hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(project)}
                          className="p-1.5 rounded hover:bg-crimson/15 text-text-secondary hover:text-crimson-accent transition-colors"
                          title="Delete Project"
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

      {/* Create / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Exploratory Big Data Processing Pipeline"
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
              placeholder="Summary of implementation, analytical workflows, or models applied..."
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              >
                <option value="Data Analytics">Data Analytics</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as Project['status'] })
                }
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Maintained">Maintained</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Technologies (comma-separated)</label>
              <input
                type="text"
                required
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="Python, Pandas, Scikit-Learn"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Year / Date</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="2024"
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">GitHub Repository URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary">Live Demo URL (optional)</label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-subtle text-xs text-text-primary focus:border-crimson focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-secondary">Project Screenshot / Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploadingImage}
              className="block w-full text-xs text-text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-bg-card file:text-text-primary hover:file:bg-white/10 file:cursor-pointer cursor-pointer"
            />
            {formData.imageUrl && (
              <p className="text-[10px] font-mono text-emerald-400">Image attached</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded bg-bg-secondary border-border-subtle text-crimson focus:ring-crimson"
            />
            <label htmlFor="featured" className="text-xs text-text-primary select-none cursor-pointer">
              Mark as Featured Project
            </label>
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
              {editingProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Confirm Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};
