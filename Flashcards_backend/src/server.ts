import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/Userroute';
import flashcardRoutes from './routes/FlashCardroute';
import cookieParser from 'cookie-parser';
import cors from 'cors';  
dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 4000;
app.use(cors({
    origin: ["http://localhost:5173", "https://flashcard-sandy.vercel.app"],
    credentials: true
}));

app.options('*', cors()); 
app.use(express.json());
app.use(cookieParser());

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the user and flashcard routes
app.use('/api', userRoutes);
app.use('/api', flashcardRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
