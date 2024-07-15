import * as mongodb from "mongodb";

export interface Buyer {
    _id?: mongodb.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
    
}