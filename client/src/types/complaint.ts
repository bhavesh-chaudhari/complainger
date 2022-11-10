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
  created_by: {
    first_name: string,
    last_name: string,
    role: string
  }
}