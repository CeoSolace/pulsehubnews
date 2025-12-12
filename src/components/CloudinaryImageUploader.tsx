"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CloudinaryImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function CloudinaryImageUploader({ value, onChange, className }: CloudinaryImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      onChange(data.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
        id="cloudinary-upload"
      />
      <Button
        type="button"
        onClick={() => document.getElementById("cloudinary-upload")?.click()}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? "Uploading..." : value ? "Change Image" : "Upload Image"}
      </Button>
      {value && (
        <img src={value} alt="Preview" className="mt-2 max-h-48 object-contain" />
      )}
    </div>
  );
}
