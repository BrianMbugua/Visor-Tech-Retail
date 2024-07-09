# Visor-Tech-Retail
E-Commerce web application.

Thee databsae system chosen for this application is the noSQL platform, MongoDB. 
At this stage I will define the database schema and structure of the entities.

Table 1: Buyers
This will contain information about the visitors of the application, looking to make a purchase.

Entries for Buyers:
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;

Table 2: Address
    id: number;
    userId: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;

Table 3: Product
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId?: number;
    createdAt: Date;
    updatedAt: Date;

Table 4: 
