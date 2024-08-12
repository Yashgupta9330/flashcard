import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { z } from 'zod';
import { userLoginSchema, userRegistrationSchema } from '../zod/User'; 




export const registerUser = async (req: Request, res: Response) => {
    try {
       
        const validatedData = userRegistrationSchema.parse(req.body);

        const newUser = await userService.registerUser(validatedData);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate request body using Zod schema
    const validatedData = userLoginSchema.parse(req.body);

    // Call service to login user
    const { token, user } = await userService.loginUser(validatedData.email, validatedData.password);

    // Set token in cookie
    const cookieOptions = {
        httpOnly: process.env.NODE_ENV === 'production', 
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };


    res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        token,
        user,
        message: 'Login successful',
    })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(401).json({ error: error.message });
    }
  }
};

