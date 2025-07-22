"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
type Porps = {
  notes: Note[];
};
function SidebarGroupContent({ notes }: Porps) {
  const [searchText, setSearchText] = useState("");
  const [localNote, setLocalNote] = useState(notes);
  useEffect(() => {
    setLocalNote(notes);
  }, [notes]);
  const fuse = useMemo(() => {
    return new Fuse(localNote, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNote]);
  // 搜索
  const filteridNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNote;
  // 删除
  const deleteNoteLocally = (noteId: string) => {
    setLocalNote((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };
  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search your note..."
        />
      </div>
      <SidebarMenu className="mt-4">
        {filteridNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupContent;
