import { useState } from "react";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import TrashIcon from "./icons/TrashIcon";

interface DeleteDialogProps {
    id: string;
}

export function DeleteDialog({ id }: DeleteDialogProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(`http://localhost:4000/api/flashcards/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
            });
            window.location.reload(); 
        } catch (error) {
            setError("Failed to delete flashcard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-[#E11D48] rounded-full flex flex-row gap-x-2 items-center px-4 py-2 sm:mt-4 mt-auto hover:bg-black"
                >
                    <span className="mr-2 flex items-center justify-center gap-1 text-[#FCEDEF] group-hover:text-[#FCEDEF] text-[16px] group-active:text-red-600">
                        Delete
                    </span>
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        flashcard and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            handleDelete();
                        }}
                    >
                        {loading ? "Deleting..." : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
                {error && <p className="text-red-600">{error}</p>}
            </AlertDialogContent>
        </AlertDialog>
    );
}
