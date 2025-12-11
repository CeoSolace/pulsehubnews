'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface CloudinaryImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function CloudinaryImageUploader({ value, onChange, className }: CloudinaryImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      onChange(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  return (
    <div className={className}>
      {value ? (
        <div className="relative group">
          <img src={value} alt="Preview" className="w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="sm" variant="secondary" onClick={() => document.getElementById('file-input')?.click()}>
              Change Image
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full flex flex-col gap-2 h-full"
          onClick={() => document.getElementById('file-input')?.click()}
          disabled={isUploading}
        >
          <Upload className="h-6 w-6" />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      )}
      <input 
        id="file-input" 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
    </div>
  );
}
