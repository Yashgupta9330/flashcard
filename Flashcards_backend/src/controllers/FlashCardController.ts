import { Request, Response } from 'express';
import { createFlashcard, getFlashcardById,updateFlashcard, deleteFlashcard, getAllFlashcards } from '../services/FlashCardService'
import { ICreateFlashcardInput } from '../interfaces/Flashcardmodel';
import { z } from 'zod';
import { flashcardSchema } from '../zod/FlashCard';



export const createFlashcardController = async (req: Request, res: Response) => {
    try {
        const flashcardInput = flashcardSchema.parse(req.body);
        const flashcard = await createFlashcard(flashcardInput);
        res.status(201).json({ message: 'Flashcard created successfully', flashcard });
    } 
    catch (error:any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: `Validation error: ${error.errors.map(e => e.message).join(', ')}` });
        }
        res.status(500).json({ message: `Error creating flashcard: ${error.message}` });
    }
};


export const getFlashcardByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const flashcard = await getFlashcardById(id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json(flashcard);
    } catch (error: any) {
        res.status(500).json({ message: `Error fetching flashcard: ${error.message}` });
    }
};


export const getAllFlashcardsController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const flashcards = await getAllFlashcards();
        res.status(200).json(flashcards);
    } catch (error: any) {
        res.status(500).json({ message: `Error fetching flashcards: ${error.message}` });
    }
};


export const updateFlashcardController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const flashcardData = req.body;

    try {
        const flashcard = await updateFlashcard(id, flashcardData);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json({ message: 'Flashcard updated successfully', flashcard });
    } catch (error: any) {
        res.status(500).json({ message: `Error updating flashcard: ${error.message}` });
    }
};


export const deleteFlashcardController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteFlashcard(id);
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: `Error deleting flashcard: ${error.message}` });
    }
};
