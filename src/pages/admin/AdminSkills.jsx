import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from '../../services/api';
import FormModal from '../../components/admin/FormModal';
import DeleteConfirm from '../../components/admin/DeleteConfirm';

// UPDATED: Removed 'AI & Data'
const CATEGORIES = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Tools',
  'Platforms',
  'Soft Skills'
];

const EMPTY_FORM = {
  name: '',
  category: 'Languages',
  icon_name: '',
  display_order: 0,
};

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const data = await fetchSkills();
      setSkills(data || []);
    } catch (err) {
      console.error('Error loading skills:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredSkills = skills.filter((s) => {
    const matchesFilter = filter === 'All' || s.category === filter;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openAdd = () => {
    setEditingSkill(null);
    setForm({ ...EMPTY_FORM, display_order: skills.length });
    setModalOpen(true);
  };

  const openEdit = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      icon_name: skill.icon_name || '',
      display_order: skill.display_order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingSkill) {
        const updated = await updateSkill(editingSkill.id, form);
        setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? updated : s)));
        toast.success('Skill updated successfully');
      } else {
        const created = await createSkill(form);
        setSkills((prev) => [...prev, created]);
        toast.success('Skill created successfully');
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
      await deleteSkill(deleteTarget.id);
      setSkills((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      toast.success('Skill deleted successfully');
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your skills and technologies ({skills.length} total)
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#2a2a3e] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${filter === cat
                ? 'gradient-bg text-white shadow-md'
                : 'bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#2a2a3e] text-gray-600 dark:text-gray-400 hover:border-indigo-500/50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-xl" />
          ))}
        </div>
      ) : filteredSkills.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#2a2a3e] rounded-xl hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 dark:text-white">{skill.name}</span>
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-indigo-500/10 text-indigo-500">
                  {skill.category}
                </span>
                {skill.icon_name && (
                  <span className="text-xs text-gray-400 font-mono hidden sm:inline-block">({skill.icon_name})</span>
                )}
              </div>

              {/* Permanent Actions */}
              <div className="flex flex-row items-center justify-end w-full sm:w-auto gap-2 mt-4 sm:mt-0 shrink-0">
                <button
                  onClick={() => openEdit(skill)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-500/10 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors text-sm font-medium"
                  aria-label="Edit Skill"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(skill)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-red-50 dark:bg-gray-900 dark:hover:bg-red-500/10 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-500/30 transition-colors text-sm font-medium"
                  aria-label="Delete Skill"
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
          <p className="text-lg font-medium mb-2">No skills found</p>
          <p className="text-sm">Click "Add Skill" to get started.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skill Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              placeholder="e.g., React.js"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon Name <span className="text-gray-400 font-normal">(Lucide icon name)</span>
            </label>
            <input
              type="text"
              value={form.icon_name}
              onChange={(e) => setForm((p) => ({ ...p, icon_name: e.target.value }))}
              placeholder="e.g., code, database, brain"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Order</label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
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
              {editingSkill ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </FormModal>

      {/* Delete Confirmation */}
      <DeleteConfirm
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName="Skill"
        loading={deleting}
      />
    </div>
  );
}