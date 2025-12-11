export async function uploadToCloudinary(file: File, uploadPreset: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  
  if (!response.ok) throw new Error('Cloudinary upload failed');
  return response.json();
}

export async function uploadFileToCloudinary(file: File, uploadPreset: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: 'POST', body: formData }
  );
  
  if (!response.ok) throw new Error('Cloudinary file upload failed');
  return response.json();
}
