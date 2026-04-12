"use client";

import { note } from "@/db/schema";
import { useState } from "react";
import { addNoteAction } from "./action";

type Props = {
  notes: (typeof note.$inferSelect)[];
};

export default function SearchView({ notes }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.content.includes(searchQuery),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="type here"
        className="input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button
        className="cursor-pointer bg-red-200 p-1 m-1"
        onClick={async () => {
          await addNoteAction(searchQuery);
        }}
      >
        追加
      </button>
      {filteredNotes.map((note) => {
        return <div key={note.id}>{note.content}</div>;
      })}
    </div>
  );
}
