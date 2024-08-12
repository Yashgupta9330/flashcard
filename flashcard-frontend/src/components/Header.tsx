import { CreateDialog } from "./CreateForm"



export const Header = () => {
    return (
        <div className="grid gap-4">
        <h2 className="text-2xl font-bold text-zinc-200">Flashcards</h2>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-zinc-200">Manage your flashcards here.</p>
          <CreateDialog />
        </div>
      </div>
    )
}