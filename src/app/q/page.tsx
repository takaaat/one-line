"use server";

import { db } from "@/db/drizzle";

export default async function Page() {
  const notes = await db.query.note.findMany();
  console.log(notes);
  return (
    <div>
      <div>one-line</div>
      <input type="text" placeholder="type here" className="input" />
    </div>
  );
}
