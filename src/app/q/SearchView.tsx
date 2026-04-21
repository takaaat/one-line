"use client";

import { note } from "@/db/schema";
import { useState } from "react";
import { addNoteAction, deleteNoteAction } from "./action";

type Props = {
  notes: (typeof note.$inferSelect)[];
};

export default function SearchView({ notes }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.content.includes(searchQuery),
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.nativeEvent.isComposing && e.key == "Enter") {
      setSearchQuery("");
      addNoteAction(searchQuery);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6 text-slate-800">
      <div className="rounded-3xl border border-slate-200 bg-stone-50/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">メモを検索または入力</span>
            <input
              autoFocus
              type="text"
              placeholder="入力して検索"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-emerald-100"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </label>
          <button
            className="cursor-pointer rounded-2xl bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200"
            onClick={async () => {
              await addNoteAction(searchQuery);
            }}
          >
            追加
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="mb-2 flex items-center justify-end px-2">
          <p className="text-xs text-slate-400">{filteredNotes.length} items</p>
        </div>

        <div className="flex flex-col">
          {filteredNotes.map((note) => {
            return (
              <div
                key={note.id}
                className="rounded-2xl px-3 py-3 text-[15px] leading-6 text-slate-700 transition odd:bg-stone-50 even:bg-white hover:bg-emerald-50/60"
              >
                <div className="flex justify-between px-2">
                  <div>{note.content}</div>
                  <div
                    className="text-gray-500 cursor-pointer hover:text-red-300"
                    onClick={async () => {
                      await deleteNoteAction(note.id);
                    }}
                  >
                    x
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
