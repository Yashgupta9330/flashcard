import { IUserData, IUserRegistrationInput } from '../interfaces/Usermodel';
import prisma from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const registerUser = async (userData: IUserRegistrationInput): Promise<IUserData> => {
    try {
        // Check if the email is already registered
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (existingUser) {
            throw new Error('Email is already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                name:userData.name,
                email: userData.email,
                password: hashedPassword,
                role:"ADMIN"
            },
        });

        return newUser;
    } catch (error: any) {
        throw new Error(`Error registering user: ${error.message}`);
    }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<{ token: string; user: IUserData }> => {
    try {
        // Fetch the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '24h' }
        );

        return { token, user };
    } catch (error: any) {
        throw new Error(`Error logging in user: ${error.message}`);
    }
};




