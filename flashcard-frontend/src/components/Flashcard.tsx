import React, { useState } from 'react';
import Nexticon from './icons/Nexticon';
import Previousicon from './icons/Previcons';
import { Card, CardContent } from './ui/card'; 
interface Flashcard {
    id: number;
    question: string;
    answer: string;
}

interface FlashcardDisplayProps {
    flashcards: Flashcard[];
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ flashcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const handleNext = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
    };

    if (flashcards.length === 0) {
        return <div>No flashcards available.</div>;
    }

    const { question, answer } = flashcards[currentIndex];

    return (
        <div className="w-full mt-24 flex flex-col items-center justify-center px-4">
            <Card
                className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-60 flex items-center justify-center cursor-pointer mb-4 bg-[#ffffff0d] border border-[#3D3D3D] backdrop-blur-lg rounded-[20px] p-4 shadow-[0px_0px_2px_0px_#00000040] group hover:border-[#FCEDEF] transition-transform duration-500"
                onClick={handleFlip}
                style={{
                    perspective: '1000px',
                }}
            >
                <CardContent
                    className={`text-[#F3F3F3EA] w-full h-full flex items-center justify-center rounded-[20px] transition-transform duration-500`}
                >
                    <span className="text-xl font-bold text-center break-words text-[20px] p-4">
                        {flipped ? answer : question}
                    </span>
                </CardContent>
            </Card>
            <div className="flex justify-between w-full max-w-xs mt-4">
                <button
                    onClick={handlePrevious}
                    className="bg-[#E11D48] rounded-full flex flex-row gap-x-2 items-center px-4 py-2 sm:py-3 transition-transform transform hover:-translate-y-1 active:translate-y-0"
                >
                    <div className="flex items-center justify-center gap-1 text-[#FCEDEF] text-[16px]">
                        <Previousicon />
                        <span>Previous</span>
                    </div>
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#E11D48] rounded-full flex flex-row gap-x-2 items-center px-4 py-2 sm:py-3 transition-transform transform hover:-translate-y-1 active:translate-y-0"
                >
                    <div className="flex items-center justify-center gap-1 text-[#FCEDEF] text-[16px]">
                        <span>Next</span>
                        <Nexticon />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FlashcardDisplay;
