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
import PlusIcon from "./icons/PlusIcon";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FlashCardschema } from "@/utils/FlashcardSchema";


type FormData = z.infer<typeof FlashCardschema>;

export function CreateDialog() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FlashCardschema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true); 
    try {
      const response = await axios.post('http://localhost:4000/api/flashcards/create', data,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      }); 
      console.log("response",response.data);
      reset(); 
      window.location.reload(); 
    } catch (error:any) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#191919] text-zinc-200 border-zinc-800 py-2 px-4 rounded-xl border-2 font-medium shadow-sm whitespace-nowrap">
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Flashcard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Flashcard</DialogTitle>
          <DialogDescription>
            Add a new flashcard with a question and answer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <Input
              id="question"
              {...register("question")}
              className="col-span-3"
              placeholder="Enter the question"
              disabled={isLoading} 
            />
            {errors.question && (
              <p className="text-red-600 col-span-4">{errors.question.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="answer" className="text-right">
              Answer
            </Label>
            <Input
              id="answer"
              {...register("answer")}
              className="col-span-3"
              placeholder="Enter the answer"
              disabled={isLoading} 
            />
            {errors.answer && (
              <p className="text-red-600 col-span-4">{errors.answer.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating" : "Create Flashcard"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
