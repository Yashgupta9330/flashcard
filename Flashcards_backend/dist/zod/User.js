"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegistrationSchema = void 0;
// src/zod/User.ts
const zod_1 = require("zod");
exports.userRegistrationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Username is required'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: zod_1.z.string().min(6, 'Confirm Password must be at least 6 characters long'),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
// User login schema
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
