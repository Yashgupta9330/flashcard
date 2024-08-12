import React, { useState } from 'react';
import Nexticon from './icons/Nexticon';
import Previousicon from './icons/Previcons';
import FlipCard from './Flipcard';
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


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
    };

    if (flashcards.length === 0) {
        return <div>No flashcards available.</div>;
    }

    
    return (
        <div className="w-full mt-24 flex flex-col items-center justify-center px-4">
            <FlipCard  data={flashcards[currentIndex]} />
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
