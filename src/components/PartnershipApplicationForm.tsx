'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function PartnershipApplicationForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    if (file) formData.append('file', file);
    
    try {
      const res = await fetch('/api/partnerships', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        setSuccess(true);
        (e.currentTarget as HTMLFormElement).reset();
        setFile(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Work With Us</h1>
      
      {success ? (
        <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded mb-6">
          Thank you! Your partnership application has been submitted successfully.
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="organizationName">Organization Name *</Label>
            <Input id="organizationName" name="organizationName" required />
          </div>
          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input id="contactName" name="contactName" required />
          </div>
        </div>
        
        <div>
          <Label htmlFor="contactEmail">Email *</Label>
          <Input id="contactEmail" name="contactEmail" type="email" required />
        </div>
        
        <div>
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" />
        </div>
        
        <div>
          <Label htmlFor="organizationType">Organization Type *</Label>
          <Select name="organizationType" required>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Esports">Esports</SelectItem>
              <SelectItem value="Tech">Tech</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" name="message" required rows={5} />
        </div>
        
        <div>
          <Label htmlFor="file">Supporting Document (Optional)</Label>
          <Input 
            id="file" 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            accept=".pdf,.doc,.docx"
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting} className="w-full bg-blue hover:bg-blue/90">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  );
}
