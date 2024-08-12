import { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardDisplay from '../components/Flashcard';
import Navbar from '../components/Navbar';
import { BASE_URL } from "../utils/url";

const Home = () => {
  const [flashcards, setFlashcards] = useState<{ id: number, question: string, answer: string }[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/flashcards`);
        setFlashcards(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#191919]" >
        <Navbar/>
        <div className="flex items-center justify-center h-full">
            <FlashcardDisplay flashcards={flashcards} />
        </div>
    </div>
  );
};

export default Home;
