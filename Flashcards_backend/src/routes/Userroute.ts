import express from 'express';
import { loginUser, registerUser } from '../controllers/UserController'; // Import the registerUser controller

const router = express.Router();

// Route for user login
router.post('/auth/login', loginUser);

// Route for user signup/registration
router.post('/auth/signup', registerUser);

export default router;

