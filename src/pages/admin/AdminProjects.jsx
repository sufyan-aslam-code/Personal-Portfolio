import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Star, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { GithubIcon as Github } from '../../components/ui/BrandIcons';
import { fetchProjects, createProject, updateProject, deleteProject, uploadFile, getPublicUrl } from '../../services/api';
import FormModal from '../../components/admin/FormModal';
import DeleteConfirm from '../../components/admin/DeleteConfirm';
import FileUpload from '../../components/admin/FileUpload';

const BUCKET = 'portfolio-assets';

const EMPTY_FORM = {
  title: '',
  description: '',
  tech_stack: [],
  image_url: '',
  live_link: '',
  github_link: '',
  is_featured: false,
  display_order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await fetchProjects();
      setProjects(data || []);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }

  const openAdd = () => {
    setEditingProject(null);
    setForm({ ...EMPTY_FORM, display_order: projects.length });
    setTechInput('');
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || '',
      description: project.description || '',
      tech_stack: project.tech_stack || [],
      image_url: project.image_url || '',
      live_link: project.live_link || '',
      github_link: project.github_link || '',
      is_featured: project.is_featured || false,
      display_order: project.display_order || 0,
    });
    setTechInput('');
    setModalOpen(true);
  };

  const addTech = () => {
    const tag = techInput.trim();
    if (tag && !form.tech_stack.includes(tag)) {
      setForm((p) => ({ ...p, tech_stack: [...p.tech_stack, tag] }));
    }
    setTechInput('');
  };

  const removeTech = (tech) => {
    setForm((p) => ({ ...p, tech_stack: p.tech_stack.filter((t) => t !== tech) }));
  };

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTech();
    }
  };

  const handleImageUpload = async (file) => {
    setUploadingImage(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `projects/${Date.now()}.${ext}`;
      await uploadFile(BUCKET, path, file);
      const url = getPublicUrl(BUCKET, path);
      setForm((p) => ({ ...p, image_url: url }));
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProject) {
        const updated = await updateProject(editingProject.id, form);
        setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? updated : p)));
        toast.success('Project updated successfully');
      } else {
        const created = await createProject(form);
        setProjects((prev) => [...prev, created]);
        toast.success('Project created successfully');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success('Project deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error('Error deleting: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-xl" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col sm:flex-row gap-5 p-4 items-stretch bg-white/5 dark:bg-surface-800/50 border border-gray-200 dark:border-surface-700 rounded-xl hover:shadow-md transition-all"
            >
              {/* Thumbnail */}
              <div className="relative w-full sm:w-48 h-32 shrink-0 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl opacity-30">🚀</div>
                )}
                {project.is_featured && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-bold uppercase rounded-md shadow-sm">
                    <Star className="w-3 h-3" fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                )}
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-0">
                    {project.tech_stack.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-medium bg-indigo-500/10 text-indigo-500 rounded-md border border-indigo-500/20">{t}</span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] text-gray-400">+{project.tech_stack.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Permanent Actions */}
              <div className="flex flex-row items-center justify-end w-full sm:w-auto gap-2 mt-4 sm:mt-0 shrink-0">
                <button
                  onClick={() => openEdit(project)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-500/10 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors text-sm font-medium"
                  aria-label="Edit Project"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(project)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-red-50 dark:bg-gray-900 dark:hover:bg-red-500/10 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-500/30 transition-colors text-sm font-medium"
                  aria-label="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium mb-2">No projects yet</p>
          <p className="text-sm">Click "Add Project" to showcase your work.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
              placeholder="Project name"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              placeholder="What does this project do?"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm resize-none"
            />
          </div>

          {/* Tech Stack Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tech_stack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-500 rounded-full"
                >
                  {t}
                  <button type="button" onClick={() => removeTech(t)} className="hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              onBlur={addTech}
              placeholder="Type and press Enter to add..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>

          {/* Thumbnail Upload */}
          <FileUpload
            label="Project Thumbnail"
            accept="image/*"
            currentUrl={form.image_url}
            onUpload={handleImageUpload}
            loading={uploadingImage}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live Link</label>
              <input
                type="url"
                value={form.live_link}
                onChange={(e) => setForm((p) => ({ ...p, live_link: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub Link</label>
              <input
                type="url"
                value={form.github_link}
                onChange={(e) => setForm((p) => ({ ...p, github_link: e.target.value }))}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm((p) => ({ ...p, is_featured: e.target.checked }))}
                className="w-4 h-4 rounded border-surface-300 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Order:</label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => setForm((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
                className="w-20 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium gradient-bg text-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {editingProject ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </FormModal>

      {/* Delete Confirmation */}
      <DeleteConfirm
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName="Project"
        loading={deleting}
      />
    </div>
  );
}
