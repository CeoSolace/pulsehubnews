import { Document } from 'mongodb';

export interface User extends Document {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
}
