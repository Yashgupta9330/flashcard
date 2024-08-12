"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashcardSchema = void 0;
const zod_1 = require("zod");
exports.flashcardSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, "Question cannot be empty"),
    answer: zod_1.z.string().min(1, "Answer cannot be empty"),
});
