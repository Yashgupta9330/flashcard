"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Userroute_1 = __importDefault(require("./routes/Userroute"));
const FlashCardroute_1 = __importDefault(require("./routes/FlashCardroute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Use the user and flashcard routes
app.use('/api', Userroute_1.default);
app.use('/api', FlashCardroute_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
