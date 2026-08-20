import { useState, useRef } from 'react';
import { Upload, X, FileImage, FileText } from 'lucide-react';

export default function FileUpload({
  label,
  accept = 'image/*',
  currentUrl,
  onUpload,
  loading,
  className = '',
}) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const isImage = accept.includes('image');

  const handleFile = (file) => {
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      {displayUrl && isImage && (
        <div className="relative mb-3 inline-block">
          <img
            src={displayUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-xl border border-gray-200 dark:border-gray-700"
          />
          {preview && (
            <button
              onClick={clearPreview}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-indigo-500 bg-indigo-500/5'
            : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500/50 hover:bg-indigo-500/5'
        } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Uploading...</span>
          </div>
        ) : (
          <>
            <div className="p-3 rounded-xl bg-indigo-500/10 mb-3">
              {isImage ? (
                <FileImage className="w-6 h-6 text-indigo-500" />
              ) : (
                <FileText className="w-6 h-6 text-indigo-500" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span className="text-indigo-500">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-400">
              {isImage ? 'PNG, JPG, WebP up to 5MB' : 'PDF up to 10MB'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
