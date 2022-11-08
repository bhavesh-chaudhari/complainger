export interface UserType {
    id: number,
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    mobile_number: string,
    department: string,
    createdAt: string,
    token: string,
    role?: string,
    _count: {
        complaints: number
    }
}