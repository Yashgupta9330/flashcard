"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController"); // Import the registerUser controller
const router = express_1.default.Router();
// Route for user login
router.post('/auth/login', UserController_1.loginUser);
// Route for user signup/registration
router.post('/auth/signup', UserController_1.registerUser);
exports.default = router;
