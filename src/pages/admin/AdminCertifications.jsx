import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Award, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchCertifications, createCertification, updateCertification, deleteCertification, uploadFile, getPublicUrl } from '../../services/api';
import FormModal from '../../components/admin/FormModal';
import DeleteConfirm from '../../components/admin/DeleteConfirm';
import FileUpload from '../../components/admin/FileUpload';

const BUCKET = 'portfolio-assets';

const EMPTY_FORM = {
  title: '',
  issuer: '',
  issue_date: '',
  credential_id: '',
  credential_url: '',
  badge_url: '',
  display_order: 0,
};

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploadingBadge, setUploadingBadge] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCertifications();
  }, []);

  async function loadCertifications() {
    try {
      const data = await fetchCertifications();
      setCertifications(data || []);
    } catch (err) {
      console.error('Error loading certifications:', err);
    } finally {
      setLoading(false);
    }
  }

  const openAdd = () => {
    setEditingCert(null);
    setForm({ ...EMPTY_FORM, display_order: certifications.length });
    setModalOpen(true);
  };

  const openEdit = (cert) => {
    setEditingCert(cert);
    setForm({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issue_date: cert.issue_date || '',
      credential_id: cert.credential_id || '',
      credential_url: cert.credential_url || '',
      badge_url: cert.badge_url || '',
      display_order: cert.display_order || 0,
    });
    setModalOpen(true);
  };

  const handleBadgeUpload = async (file) => {
    setUploadingBadge(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `badges/${Date.now()}.${ext}`;
      await uploadFile(BUCKET, path, file);
      const url = getPublicUrl(BUCKET, path);
      setForm((p) => ({ ...p, badge_url: url }));
      toast.success('Badge uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload badge: ' + err.message);
    } finally {
      setUploadingBadge(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCert) {
        const updated = await updateCertification(editingCert.id, form);
        setCertifications((prev) => prev.map((c) => (c.id === editingCert.id ? updated : c)));
        toast.success('Certification updated successfully');
      } else {
        const created = await createCertification(form);
        setCertifications((prev) => [...prev, created]);
        toast.success('Certification created successfully');
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
      await deleteCertification(deleteTarget.id);
      setCertifications((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      toast.success('Certification deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error('Error deleting: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your certifications and badges ({certifications.length} total)
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {/* Certifications List */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : certifications.length > 0 ? (
        <div className="flex flex-col gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300"
            >
              {/* Left - Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center">
                {cert.badge_url ? (
                  <img src={cert.badge_url} alt={cert.title} className="w-full h-full object-contain p-2" />
                ) : (
                  <Award className="w-8 h-8 text-indigo-500/50" />
                )}
              </div>

              {/* Middle - Details */}
              <div className="flex-1 text-left w-full sm:w-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{cert.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{cert.issuer}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  {cert.issue_date && (
                    <span className="text-xs text-gray-400">Issued: {formatDate(cert.issue_date)}</span>
                  )}
                  {cert.credential_id && (
                    <span className="text-xs text-gray-500 font-mono">ID: {cert.credential_id}</span>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
                      title="View Credential"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Link
                    </a>
                  )}
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex sm:flex-col lg:flex-row gap-2 w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0 justify-end">
                <button
                  onClick={() => openEdit(cert)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:px-3 sm:py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 dark:bg-gray-900 dark:hover:bg-indigo-500/10 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors text-sm"
                >
                  <Pencil className="w-4 h-4" />
                  <span className="sm:hidden lg:inline font-medium">Edit</span>
                </button>
                <button
                  onClick={() => setDeleteTarget(cert)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:px-3 sm:py-2 rounded-lg bg-gray-50 hover:bg-red-50 dark:bg-gray-900 dark:hover:bg-red-500/10 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-500/30 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sm:hidden lg:inline font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-200 dark:border-gray-800">
          <Award className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-lg font-medium mb-1">No certifications yet</p>
          <p className="text-sm">Click "Add Certification" to showcase your credentials.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCert ? 'Edit Certification' : 'Add Certification'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
              placeholder="e.g., AWS Solutions Architect"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issuer *</label>
              <input
                type="text"
                value={form.issuer}
                onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))}
                required
                placeholder="e.g., Amazon"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Date</label>
              <input
                type="date"
                value={form.issue_date}
                onChange={(e) => setForm((p) => ({ ...p, issue_date: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Credential ID</label>
            <input
              type="text"
              value={form.credential_id}
              onChange={(e) => setForm((p) => ({ ...p, credential_id: e.target.value }))}
              placeholder="e.g., ABC123XYZ"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Credential URL</label>
            <input
              type="url"
              value={form.credential_url}
              onChange={(e) => setForm((p) => ({ ...p, credential_url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>

          {/* Badge Upload */}
          <FileUpload
            label="Badge Image"
            accept="image/*"
            currentUrl={form.badge_url}
            onUpload={handleBadgeUpload}
            loading={uploadingBadge}
          />

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
              {editingCert ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </FormModal>

      {/* Delete Confirmation */}
      <DeleteConfirm
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName="Certification"
        loading={deleting}
      />
    </div>
  );
}
