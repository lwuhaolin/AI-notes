"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/actions/note";
type Props = {
  user: User | null;
};
function NewNodeButton({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const headleClickNewButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const uuid = uuidV4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);
      
      toast("New Node Created",{
        description: "You have successfully created a new node.",
      });

      setLoading(false);
    }
  };
  return (
    <Button
      onClick={headleClickNewButton}
      variant={"secondary"}
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Node"}
    </Button>
  );
}

export default NewNodeButton;
