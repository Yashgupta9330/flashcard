"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the email is already registered
        const existingUser = yield db_1.default.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new Error('Email is already registered');
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
        // Create a new user
        const newUser = yield db_1.default.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: "ADMIN"
            },
        });
        return newUser;
    }
    catch (error) {
        throw new Error(`Error registering user: ${error.message}`);
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user by email
        const user = yield db_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // Verify the password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '24h' });
        return { token, user };
    }
    catch (error) {
        throw new Error(`Error logging in user: ${error.message}`);
    }
});
exports.loginUser = loginUser;
