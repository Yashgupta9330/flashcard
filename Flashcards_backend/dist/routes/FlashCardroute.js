"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const FlashCardController_1 = require("../controllers/FlashCardController");
const router = express_1.default.Router();
// Route to create a new flashcard
router.post('/flashcards/create', auth_1.auth, auth_1.isAdmin, FlashCardController_1.createFlashcardController);
// Route to update an existing flashcard
router.put('/flashcards/update/:id', auth_1.auth, auth_1.isAdmin, FlashCardController_1.updateFlashcardController);
// Route to delete a flashcard
router.delete('/flashcards/delete/:id', auth_1.auth, auth_1.isAdmin, FlashCardController_1.deleteFlashcardController);
// Route to get a flashcard by ID
router.get('/flashcards/:id', FlashCardController_1.getFlashcardByIdController);
// Route to get all flashcards for the authenticated user
router.get('/flashcards', FlashCardController_1.getAllFlashcardsController);
exports.default = router;
