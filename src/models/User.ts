import { Document } from 'mongodb';

export interface User extends Document {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const User = {} as any;
export default User;
