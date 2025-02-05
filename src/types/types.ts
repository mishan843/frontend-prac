// reacttypescript/src/pages/types.ts

// User related types
export interface UserFormValues {
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: string;
    gender: string;
    profilePhoto: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

// Product related types
export type Quality = "High" | "Medium" | "Low";
export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
   
}

export interface ProductData {
    _id: string;
    productName: string;
    productImage: string;
    price: string;
    description: string;
    quality: Quality;
    user: string; // This will be the ObjectId as string
    size: Size;
    totalPages: number;
    currentPage: number;
    totalProducts: number;
}