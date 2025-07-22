"use client";
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
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteNoteAction } from "@/actions/note";
import { error } from "console";
type Props = {
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
};

function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const noteIdParam = useSearchParams().get("noteId") || "";
  const headleDeleteNote = () => {
    startTransition(async () => {
      const result = await deleteNoteAction(noteId);
      let errorMessage: string | null = null;
      if (typeof result === "string") {
        errorMessage = result;
      } else if (
        result &&
        typeof result === "object" &&
        "errorMessage" in result
      ) {
        errorMessage = result.errorMessage;
      }
      if (!errorMessage) {
        toast("Note Deleted", {
          description: "You have successfully deleted this note.",
        });
      }
      deleteNoteLocally(noteId);
      if (noteId === noteIdParam) router.replace("/");
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-1/2 right-2 size-7 -translate-y-1/2 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>你要删除这个笔记吗?</AlertDialogTitle>
          <AlertDialogDescription>
            这个操作是不可逆的，此操作将会永久删除这个笔记。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground w-24"
            onClick={headleDeleteNote}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteNoteButton;
