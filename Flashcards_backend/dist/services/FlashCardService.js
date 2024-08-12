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
exports.deleteFlashcard = exports.updateFlashcard = exports.getAllFlashcards = exports.getFlashcardById = exports.createFlashcard = void 0;
const db_1 = __importDefault(require("../db"));
// Service to create a new flashcard
const createFlashcard = (flashcardInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcard = yield db_1.default.flashcard.create({
            data: flashcardInput,
        });
        return flashcard;
    }
    catch (error) {
        throw new Error(`Error in flashcard creation service: ${error.message}`);
    }
});
exports.createFlashcard = createFlashcard;
// Service to get a flashcard by its ID
const getFlashcardById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcard = yield db_1.default.flashcard.findUnique({
            where: { id },
        });
        return flashcard;
    }
    catch (error) {
        throw new Error(`Error in flashcard retrieval service: ${error.message}`);
    }
});
exports.getFlashcardById = getFlashcardById;
// Service to get all flashcards for a user by user ID
const getAllFlashcards = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcards = yield db_1.default.flashcard.findMany();
        return flashcards;
    }
    catch (error) {
        throw new Error(`Error in flashcards retrieval service: ${error.message}`);
    }
});
exports.getAllFlashcards = getAllFlashcards;
// Service to update a flashcard
const updateFlashcard = (id, flashcardInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedFlashcard = yield db_1.default.flashcard.update({
            where: { id },
            data: flashcardInput,
        });
        return updatedFlashcard;
    }
    catch (error) {
        throw new Error(`Error in flashcard update service: ${error.message}`);
    }
});
exports.updateFlashcard = updateFlashcard;
// Service to delete a flashcard
const deleteFlashcard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.flashcard.delete({
            where: { id },
        });
    }
    catch (error) {
        throw new Error(`Error in flashcard deletion service: ${error.message}`);
    }
});
exports.deleteFlashcard = deleteFlashcard;
