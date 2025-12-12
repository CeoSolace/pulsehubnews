import { Document } from 'mongodb';

export interface Report extends Document {
  _id: string;
  articleId: string;
  reason: string;
  reportedBy: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}

const Report = {} as any;
export default Report;
