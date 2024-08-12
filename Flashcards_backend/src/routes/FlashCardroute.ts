import express from 'express';
import { auth, isAdmin } from '../middlewares/auth';
import { 
    createFlashcardController, 
    updateFlashcardController, 
    deleteFlashcardController, 
    getFlashcardByIdController, 
    getAllFlashcardsController
} from '../controllers/FlashCardController';

const router = express.Router();

// Route to create a new flashcard
router.post('/flashcards/create', auth, isAdmin, createFlashcardController);

// Route to update an existing flashcard
router.put('/flashcards/update/:id', auth, isAdmin, updateFlashcardController);

// Route to delete a flashcard
router.delete('/flashcards/delete/:id', auth, isAdmin, deleteFlashcardController);

// Route to get a flashcard by ID
router.get('/flashcards/:id', getFlashcardByIdController);

// Route to get all flashcards for the authenticated user
router.get('/flashcards', getAllFlashcardsController);

export default router;
