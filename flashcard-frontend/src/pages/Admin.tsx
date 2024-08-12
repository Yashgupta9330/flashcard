import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/Navbar";
import { EditDialog } from "../components/EditForm";
import { DeleteDialog } from "../components/DeleteDialog";
import Sidebar from "../components/Sidebar";
import { Spinner } from "../components/spinner";
import { Header } from "@/components/Header";


interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export default function CardAdmin() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/flashcards");
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex">
      <Sidebar />
        <div className="flex-1 bg-[#191919] p-8 overflow-y-auto min-h-screen">
          <div className="mx-auto">
            <div className="grid gap-8">
              <Header/>
              <div className="grid gap-4">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="loader"><Spinner/></div> 
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-2">
                    {flashcards.length>0 && flashcards.map(flashcard => (
                 <Card
                 key={flashcard.id}
                 className="flex flex-col items-center justify-center text-[#F3F3F3EA] cursor-pointer mb-4 bg-[#ffffff0d] border border-[#3D3D3D] backdrop-blur-lg rounded-[20px] p-4 shadow-[0px_0px_2px_0px_#00000040] group hover:border-[#FCEDEF] transition-all duration-300 ease-in-out"
               >
                 <CardContent className="flex flex-col items-center gap-4 w-full">
                   <span className="font-bold text-center text-[16px] md:text-[20px] break-words w-full">
                     {flashcard.question}
                   </span>
                   <p className="font-bold text-center text-[16px] md:text-[20px] break-words w-full">
                     {flashcard.answer}
                   </p>
                   <div className="flex justify-center gap-2 sm:gap-4 items-center mt-4 w-full">
                     <EditDialog flashcard={flashcard} />
                     <DeleteDialog id={flashcard.id} />
                   </div>
                 </CardContent>
                  </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
