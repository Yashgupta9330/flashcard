import { Role } from "@prisma/client";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string; 
    role: Role;
    createdAt?: Date; 
    updatedAt?: Date; 
}


export interface IUserData {
    id: string;
    name: string;
    email: string;
    password: string; 
    role: Role;
}

export interface IUserRegistrationInput {
    name: string;  
    email: string;
    password: string;
    confirmPassword: string;
}

