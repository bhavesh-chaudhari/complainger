export interface ComplaintType {
  id?: number;
  title: string;
  description: string;
  type: string;
  status?: string;
  reviewed?: boolean;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}