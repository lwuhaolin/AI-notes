"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateTextAction } from "@/actions/note";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  // 获取笔记id
  const noteIdParam = useSearchParams().get("noteId") || "";
  // 获取笔记
  const { noteText, setnoteText } = useNote();

  // 如果笔记id发生变化，重置笔记文本
  useEffect(() => {
    if (noteIdParam === noteId) {
      setnoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdParam, noteId, setnoteText]);
  // 更新笔记
  const headleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setnoteText(text);
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateTextAction(noteId, text);
    }, debounceTimeout);
  };

  return (
    <Textarea
      value={noteText}
      onChange={headleUpdateNote}
      placeholder="Type your note here..."
      className="custom-scrollbars placeholder:text-muted-foreground max-w-4px mb-4 h-full resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
