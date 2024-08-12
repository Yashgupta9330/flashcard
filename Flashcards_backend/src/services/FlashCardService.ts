import { ICreateFlashcardInput, IFlashcardData } from '../interfaces/Flashcardmodel';
import prisma from "../db"

// Service to create a new flashcard
export const createFlashcard = async (flashcardInput: ICreateFlashcardInput): Promise<IFlashcardData> => {
    try {
        const flashcard = await prisma.flashcard.create({
            data: flashcardInput,
        });
        return flashcard;
    } 
    catch (error: any) {
        throw new Error(`Error in flashcard creation service: ${error.message}`);
    }
};

// Service to get a flashcard by its ID
export const getFlashcardById = async (id: string): Promise<IFlashcardData | null> => {
    try {
        const flashcard = await prisma.flashcard.findUnique({
            where: { id },
        });
        return flashcard;
    } catch (error: any) {
        throw new Error(`Error in flashcard retrieval service: ${error.message}`);
    }
};

// Service to get all flashcards for a user by user ID
export const getAllFlashcards = async (): Promise<IFlashcardData[]> => {
    try {
        const flashcards = await prisma.flashcard.findMany();
        return flashcards;
    } catch (error: any) {
        throw new Error(`Error in flashcards retrieval service: ${error.message}`);
    }
};

// Service to update a flashcard
export const updateFlashcard = async (id: string, flashcardInput: Partial<ICreateFlashcardInput>): Promise<IFlashcardData | null> => {
    try {
        const updatedFlashcard = await prisma.flashcard.update({
            where: { id },
            data: flashcardInput,
        });
        return updatedFlashcard;
    } catch (error: any) {
        throw new Error(`Error in flashcard update service: ${error.message}`);
    }
};

// Service to delete a flashcard
export const deleteFlashcard = async (id: string): Promise<void> => {
    try {
        await prisma.flashcard.delete({
            where: { id },
        });
    } catch (error: any) {
        throw new Error(`Error in flashcard deletion service: ${error.message}`);
    }
};
