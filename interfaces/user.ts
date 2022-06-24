export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'client' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}
