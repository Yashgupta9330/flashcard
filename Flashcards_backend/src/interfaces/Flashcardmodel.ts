// src/interfaces/flashcardTypes.ts

export interface IFlashcardData {
    id: string;
    question: string;
    answer: string;
  }
  
  export interface ICreateFlashcardInput {
    question: string;
    answer: string;
  }
  