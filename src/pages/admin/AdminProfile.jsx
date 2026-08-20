import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Mail, MapPin, User, FileText, Briefcase } from 'lucide-react';
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
              
              <FileUpload
                label="Profile Avatar"
                accept="image/*"
                currentUrl={form.avatar_url}
                onUpload={handleAvatarUpload}
                loading={uploadingAvatar}
              />
              
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
                <FileUpload
                  label="Resume (PDF)"
                  accept=".pdf"
                  currentUrl={null}
                  onUpload={handleResumeUpload}
                  loading={uploadingResume}
                />
                {form.resume_url && (
                  <p className="mt-2 text-xs text-gray-400 truncate flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Current: <a href={form.resume_url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">{form.resume_url.split('/').pop()}</a>
                  </p>
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
          className={`fixed bottom-0 left-0 right-0 lg:pl-64 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)] transform transition-transform duration-300 z-40 flex justify-end px-8 ${
            isDirty ? 'translate-y-0' : 'translate-y-full'
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
          className={`w-full py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm ${
            Icon ? 'pl-10 pr-4' : 'px-4'
          }`}
        />
      </div>
    </div>
  );
}
