import React, { useState } from 'react';

interface Flashcard {
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
        <div className="w-full mt-24 flex flex-col items-center justify-center">
            <div
                className={`card w-80 h-60 relative flex items-center justify-center cursor-pointer mb-4 bg-[#ffffff0d] border border-[#3D3D3D] backdrop-blur-lg rounded-[20px] shadow-[0px_0px_2px_0px_#00000040] group hover:border-[#FCEDEF] transition-transform duration-500 ${flipped ? 'flipped' : ''}`}
                onClick={handleFlip}
                style={{
                    perspective: '1000px',
                }}
            >
                <div
                    className="card-side front absolute w-full h-full flex items-center justify-center p-4 rounded-[20px] bg-white"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                    }}
                >
                    <div className="text-xl font-bold text-center text-[20px]">{question}</div>
                </div>
                <div
                    className="card-side back absolute w-full h-full flex items-center justify-center p-4 rounded-[20px] bg-white"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div className="text-xl font-bold text-center text-[20px]">{answer}</div>
                </div>
            </div>
            <div className="flex justify-between w-full max-w-xs">
                <button
                    onClick={handlePrevious}
                    className="bg-[#E11D48] rounded-full flex flex-row gap-x-2 items-center px-2 py-1 md:px-4 md:py-2 sm:mt-4 mt-auto transition-transform transform hover:-translate-y-1 active:translate-y-0"
                >
                    <div className="flex items-center justify-center gap-1 text-[#FCEDEF] md:text-[16px] text-[12px]">
                        <svg
                            className="rotate-180 stroke-[#FCEDEF]"
                            width="17"
                            height="10"
                            viewBox="0 0 17 10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.5 5H15.5M15.5 5L11.5 9M15.5 5L11.5 1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        <span>Previous</span>
                    </div>
                </button>
                <button
                    onClick={handleNext}
                    className="bg-[#E11D48] rounded-full flex flex-row gap-x-2 items-center px-2 py-1 md:px-4 md:py-2 sm:mt-4 mt-auto transition-transform transform hover:-translate-y-1 active:translate-y-0"
                >
                    <div className="flex items-center justify-center gap-1 text-[#FCEDEF] md:text-[16px] text-[12px]">
                        <span>Next</span>
                        <svg
                            className="stroke-[#FCEDEF]"
                            width="17"
                            height="10"
                            viewBox="0 0 17 10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.5 5H15.5M15.5 5L11.5 9M15.5 5L11.5 1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FlashcardDisplay;
