"use server";

import { db } from "@/db/drizzle";
import { note } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addNoteAction(content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const newNote: typeof note.$inferInsert = {
    content,
    userId: session!.user.id,
  };
  const response = await db.insert(note).values(newNote);
  revalidatePath("/q");
}

export async function deleteNoteAction(noteId: string) {
  const response = await db.delete(note).where(eq(note.id, noteId));
  revalidatePath("/q");
}
