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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlashcardController = exports.updateFlashcardController = exports.getAllFlashcardsController = exports.getFlashcardByIdController = exports.createFlashcardController = void 0;
const FlashCardService_1 = require("../services/FlashCardService");
const zod_1 = require("zod");
const FlashCard_1 = require("../zod/FlashCard");
const createFlashcardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcardInput = FlashCard_1.flashcardSchema.parse(req.body);
        const flashcard = yield (0, FlashCardService_1.createFlashcard)(flashcardInput);
        res.status(201).json({ message: 'Flashcard created successfully', flashcard });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: `Validation error: ${error.errors.map(e => e.message).join(', ')}` });
        }
        res.status(500).json({ message: `Error creating flashcard: ${error.message}` });
    }
});
exports.createFlashcardController = createFlashcardController;
const getFlashcardByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const flashcard = yield (0, FlashCardService_1.getFlashcardById)(id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json(flashcard);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching flashcard: ${error.message}` });
    }
});
exports.getFlashcardByIdController = getFlashcardByIdController;
const getAllFlashcardsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const flashcards = yield (0, FlashCardService_1.getAllFlashcards)();
        res.status(200).json(flashcards);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching flashcards: ${error.message}` });
    }
});
exports.getAllFlashcardsController = getAllFlashcardsController;
const updateFlashcardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const flashcardData = req.body;
    try {
        const flashcard = yield (0, FlashCardService_1.updateFlashcard)(id, flashcardData);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json({ message: 'Flashcard updated successfully', flashcard });
    }
    catch (error) {
        res.status(500).json({ message: `Error updating flashcard: ${error.message}` });
    }
});
exports.updateFlashcardController = updateFlashcardController;
const deleteFlashcardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, FlashCardService_1.deleteFlashcard)(id);
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: `Error deleting flashcard: ${error.message}` });
    }
});
exports.deleteFlashcardController = deleteFlashcardController;
