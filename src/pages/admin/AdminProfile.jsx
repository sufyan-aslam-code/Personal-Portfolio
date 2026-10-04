import { useState, useEffect, useRef } from 'react';
import { Save, AlertCircle, CheckCircle, Mail, MapPin, User, FileText, Briefcase, Trash2, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon, TwitterXIcon, InstagramIcon, FacebookIcon } from '../../components/ui/BrandIcons';
import toast from 'react-hot-toast';
import { fetchProfile, updateProfile, uploadFile, getPublicUrl } from '../../services/api';
import FileUpload from '../../components/admin/FileUpload';

const BUCKET = 'portfolio-assets';

export default function AdminProfile() {
  const [initialData, setInitialData] = useState(null);
  const [form, setForm] = useState({
    full_name: '',
    headline: '',
    bio: '',
    location: '',
    email: '',
    github_url: '',
    linkedin_url: '',
    whatsapp_url: '',
    twitter_url: '',
    instagram_url: '',
    facebook_url: '',
    avatar_url: '',
    resume_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const [viewingFileUrl, setViewingFileUrl] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await fetchProfile();
      if (data) {
        const loadedData = {
          full_name: data.full_name || '',
          headline: data.headline || '',
          bio: data.bio || '',
          location: data.location || '',
          email: data.email || '',
          github_url: data.github_url || '',
          linkedin_url: data.linkedin_url || '',
          whatsapp_url: data.whatsapp_url || '',
          twitter_url: data.twitter_url || '',
          instagram_url: data.instagram_url || '',
          facebook_url: data.facebook_url || '',
          avatar_url: data.avatar_url || '',
          resume_url: data.resume_url || '',
        };
        setForm(loadedData);
        setInitialData(loadedData);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      toast.error('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarUpload = async (file) => {
    setUploadingAvatar(true);
    const toastId = toast.loading('Uploading avatar...');
    try {
      const ext = file.name.split('.').pop();
      const path = `avatars/avatar.${ext}`;
      await uploadFile(BUCKET, path, file);
      const url = getPublicUrl(BUCKET, path);
      setForm((prev) => ({ ...prev, avatar_url: url }));
      toast.success('Avatar uploaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload avatar: ' + err.message, { id: toastId });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeUpload = async (file) => {
    setUploadingResume(true);
    const toastId = toast.loading('Uploading resume...');
    try {
      const ext = file.name.split('.').pop();
      const path = `resume/resume.${ext}`;
      await uploadFile(BUCKET, path, file);
      const url = getPublicUrl(BUCKET, path);
      setForm((prev) => ({ ...prev, resume_url: url }));
      toast.success('Resume uploaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload resume: ' + err.message, { id: toastId });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleRemoveAvatar = () => {
    setForm((prev) => ({ ...prev, avatar_url: '' }));
  };

  const handleRemoveResume = () => {
    setForm((prev) => ({ ...prev, resume_url: '' }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    const toastId = toast.loading('Saving profile changes...');

    try {
      await updateProfile(form);
      setInitialData(form); // Reset dirty state
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (err) {
      toast.error('Failed to update profile: ' + err.message, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const isDirty = initialData && JSON.stringify(form) !== JSON.stringify(initialData);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="skeleton h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="skeleton h-64 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="skeleton h-[500px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24 relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your personal identity, contact information, and social links.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDEBAR: Identity */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Identity</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Avatar</label>
                {form.avatar_url ? (
                  <div className="flex flex-col gap-3 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:border-indigo-500/30">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 relative">
                        <img src={form.avatar_url} alt="Avatar" className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={form.avatar_url.split('/').pop()}>
                          {form.avatar_url.split('/').pop()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Image File</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 mt-1 border-t border-gray-100 dark:border-gray-800/60">
                      <button
                        type="button"
                        onClick={() => setViewingFileUrl(form.avatar_url)}
                        className="flex-1 text-center px-3 py-2 text-xs font-medium bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        View
                      </button>

                      <input
                        type="file"
                        ref={avatarInputRef}
                        onChange={(e) => {
                          if (e.target.files[0]) handleAvatarUpload(e.target.files[0]);
                        }}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={uploadingAvatar}
                        className="flex-1 text-center px-3 py-2 text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                      >
                        {uploadingAvatar ? 'Uploading...' : 'Update'}
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Delete Avatar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <FileUpload
                    label=""
                    accept="image/*"
                    currentUrl={null}
                    onUpload={handleAvatarUpload}
                    loading={uploadingAvatar}
                  />
                )}
              </div>

              <InputField
                icon={User}
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
              />

              <InputField
                icon={Briefcase}
                label="Headline"
                name="headline"
                value={form.headline}
                onChange={handleChange}
                placeholder="e.g., AI Engineer"
              />

              <InputField
                icon={MapPin}
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Lahore"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm resize-none"
                  placeholder="Tell visitors about yourself..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT: Contact & Social */}
        <div className="lg:col-span-2 space-y-8">

          {/* Resume & Email */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact & Documents</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <InputField
                icon={Mail}
                label="Public Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@example.com"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume (PDF)</label>
                {form.resume_url ? (
                  <div className="flex flex-col gap-3 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:border-indigo-500/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-lg shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={form.resume_url.split('/').pop()}>
                          {form.resume_url.split('/').pop()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PDF Document</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 mt-1 border-t border-gray-100 dark:border-gray-800/60">
                      <button
                        type="button"
                        onClick={() => setViewingFileUrl(form.resume_url)}
                        className="flex-1 text-center px-3 py-2 text-xs font-medium bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        View
                      </button>

                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={(e) => {
                          if (e.target.files[0]) handleResumeUpload(e.target.files[0]);
                        }}
                        accept=".pdf"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => resumeInputRef.current?.click()}
                        disabled={uploadingResume}
                        className="flex-1 text-center px-3 py-2 text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
                      >
                        {uploadingResume ? 'Uploading...' : 'Update'}
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveResume}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <FileUpload
                    label=""
                    accept=".pdf"
                    currentUrl={null}
                    onUpload={handleResumeUpload}
                    loading={uploadingResume}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Social Presence</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField icon={GithubIcon} label="GitHub URL" name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/..." />
              <InputField icon={LinkedinIcon} label="LinkedIn URL" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
              <InputField icon={WhatsappIcon} label="WhatsApp URL" name="whatsapp_url" value={form.whatsapp_url} onChange={handleChange} placeholder="https://wa.me/..." />
              <InputField icon={TwitterXIcon} label="X (Twitter) URL" name="twitter_url" value={form.twitter_url} onChange={handleChange} placeholder="https://x.com/..." />
              <InputField icon={InstagramIcon} label="Instagram URL" name="instagram_url" value={form.instagram_url} onChange={handleChange} placeholder="https://instagram.com/..." />
              <InputField icon={FacebookIcon} label="Facebook URL" name="facebook_url" value={form.facebook_url} onChange={handleChange} placeholder="https://facebook.com/..." />
            </div>
          </div>

        </div>

        {/* Sticky Action Bar */}
        <div
          className={`fixed bottom-0 left-0 right-0 lg:pl-64 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)] transform transition-transform duration-300 z-40 flex justify-end px-8 ${isDirty ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">
              You have unsaved changes
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none min-w-[140px]"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

      </form>

      {/* File Viewer Modal */}
      {viewingFileUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setViewingFileUrl(null)}>
          <div className="relative max-w-5xl w-full h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-2 flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={() => setViewingFileUrl(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors z-10">
              <X className="w-5 h-5" />
            </button>
            {viewingFileUrl.toLowerCase().endsWith('.pdf') ? (
              <iframe src={viewingFileUrl} className="w-full h-full rounded-xl border-0" title="Document Viewer" />
            ) : (
              <img src={viewingFileUrl} alt="Preview" className="w-full h-full object-contain rounded-xl" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text', placeholder = '', required = false, icon: Icon }) {
  return (
    <div>
      <label htmlFor={`profile-${name}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <input
          id={`profile-${name}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm ${Icon ? 'pl-10 pr-4' : 'px-4'
            }`}
        />
      </div>
    </div>
  );
}
