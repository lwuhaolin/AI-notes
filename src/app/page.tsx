import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNodeButton from "@/components/NewNodeButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  // 搜索
  const noteIdParam = (await searchParams).noteId;
  // 获取用户数据
  const user = await getUser();
  // 如果 noteIdParam 是数组，取第一个元素，否则直接使用
  // 如果没有 noteIdParam，使用空字符串
  // 这样可以确保 noteId 是一个字符串
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";
  // 查询笔记
  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNodeButton user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || " "} />
    </div>
  );
};
export default HomePage;
