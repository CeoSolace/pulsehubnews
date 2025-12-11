'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportArticleModalProps {
  articleId: string;
  articleTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportArticleModal({ articleId, articleTitle, isOpen, onClose }: ReportArticleModalProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, articleTitle, reason, details }),
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-navy rounded-lg p-6 w-full max-w-md">
        <h3 className="font-bold text-lg mb-4">Report Article</h3>
        <p className="text-gray mb-6">Reporting: <span className="font-medium">{articleTitle}</span></p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Reason *</Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inaccurate">Inaccurate Information</SelectItem>
                <SelectItem value="offensive">Offensive Content</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Additional Details</Label>
            <Textarea 
              value={details} 
              onChange={(e) => setDetails(e.target.value)} 
              placeholder="Provide more context..." 
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={!reason || isSubmitting} className="bg-blue hover:bg-blue/90 flex-1">
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
