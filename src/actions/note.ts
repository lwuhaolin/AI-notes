"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { headleError } from "@/lib/utils";
import openai from "@/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
type note = {
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export const createNoteAction = async (NoteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to create a note.");
    await prisma.note.create({
      data: {
        id: NoteId,
        authorId: user.id,
        text: "",
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return headleError(error);
  }
};
export const updateTextAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to update a note.");
    await prisma.note.update({
      where: { id: noteId },
      data: { text },
    });

    return { errorMessage: null };
  } catch (error) {
    return headleError(error);
  }
};
export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note.");
    await prisma.note.delete({
      where: { id: noteId, authorId: user.id },
    });

    return { errorMessage: null };
  } catch (error) {
    return headleError(error);
  }
};

export const AskAIAboutNoteAction = async (
  newQuestions: string[],
  responses: string[],
) => {
  const user = await getUser();
  if (!user) throw new Error("You must be logged in to Ask AI.");
  const notes = await prisma.note.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    select: { text: true, createdAt: true, updatedAt: true },
  });
  if (notes.length === 0) return "你没有笔记";
  const formattedNotes = notes
    .map((note:note) => {
      return`
      text:${note.text}
      CreateAt:${note.createdAt}
      Lasst update:${note.updatedAt}
      `.trim();
    })
    .join("\n");
  const messages: ChatCompletionMessageParam[] = [
    {
      role:'system',
      content: `
              You are a helpful assistant that answers questions about a user's notes. 
              Assume all questions are related to the user's notes. 
              Make sure that your answers are not too verbose and you speak succinctly. 
              Your responses MUST be formatted in clean, valid HTML with proper structure. 
              Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
              Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
              Avoid inline styles, JavaScript, or custom attributes.
              
              Rendered like this in JSX:
              <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
        
              Here are the user's notes:
              ${formattedNotes}
              `,
    },
  ];

  for (let i = 0; i < newQuestions.length; i++) {
    messages.push({
      role: "user",
      content: newQuestions[i],
    });
    if (responses.length > i) {
      messages.push({
        role: "assistant",
        content: responses[i],
      });
    }
  }

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages,
  });
  return completion.choices[0].message.content || "出问题了";
};
