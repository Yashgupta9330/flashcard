import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Authentication middleware
export const auth = async (req: any, res: any, next: NextFunction) => {
    try {
        console.log("BEFORE TOKEN EXTRACTION");

        // Extract token from cookies, body, or headers
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization")?.replace("Bearer ", "");

        console.log("AFTER TOKEN EXTRACTION");

        // If token is missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as jwt.JwtPayload;
            console.log(decoded);
            req.user = decoded;
        } catch (err) {
            // Token verification issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
        next();
    } catch (error) {  
        console.log("error",error)
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
};

// Admin role checking middleware
export const isAdmin = async (req: any, res: any, next: NextFunction) => {
    try {
        console.log("Printing Role ", req.user?.role);
        if (req.user?.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again',
        });
    }
};
