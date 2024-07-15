export interface Buyer {
    _id?: string;
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
    
}
