import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FilePenIcon from "./icons/FilePenIcon";
import axios from 'axios';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface EditDialogProps {
  flashcard: Flashcard;
}

export function EditDialog({ flashcard }: EditDialogProps) {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
  }, [flashcard]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:4000/api/flashcards/update/${flashcard.id}`, { question, answer },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
      window.location.reload(); 
    } catch (error) {
      setError("Failed to update flashcard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#E11D48] rounded-full flex flex-row gap-x-2 items-center px-2 py-1 md:px-4 md:py-2 sm:mt-4 mt-auto hover:bg-black">
          <span className="mr-2 flex items-center justify-center gap-1 text-[#FCEDEF] group-hover:text-[#FCEDEF] md:text-[16px] text-[12px] group-active:text-red-600">Edit</span>
          <FilePenIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Flashcard</DialogTitle>
          <DialogDescription>
            Make changes to the flashcard here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="answer" className="text-right">
              Answer
            </Label>
            <Input
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-600">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
