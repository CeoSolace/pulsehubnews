import { Document } from 'mongodb';

export interface PartnershipApplication extends Document {
  _id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

const PartnershipApplication = {} as any;
export default PartnershipApplication;
