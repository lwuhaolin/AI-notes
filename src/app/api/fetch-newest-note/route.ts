import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";
  const newestNoteId = await prisma.note.findFirst({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  return NextResponse.json({ newestNoteId: newestNoteId?.id });
}
