"use server";

import { db } from "@/db/drizzle";
import SearchView from "./SearchView";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { note } from "@/db/schema";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const notes = await db.query.note.findMany({
    where: eq(note.userId, session.user.id),
  });

  return (
    <div>
      <div>one-line</div>
      <div>
        <SearchView notes={notes} />
      </div>
    </div>
  );
}
