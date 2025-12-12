export function CloudinaryImageUploader({ value, onChange, className = '' }) {
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    onChange(data.url);
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
        id="uploader"
      />
      <button
        type="button"
        onClick={() => document.getElementById('uploader')?.click()}
        className="px-4 py-2 border border-gray rounded w-full"
      >
        {value ? 'Change Image' : 'Upload Image'}
      </button>
      {value && <img src={value} alt="Preview" className="mt-2 max-h-48" />}
    </div>
  );
}
