"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteTicket } from "@/lib/tickets";

// Delete button with a confirmation step. Deletes the ticket in Supabase, then returns to All Tickets.
export default function DeleteTicketButton({ ticketId, ticketNumber }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setIsDeleting(true);
    setError("");
    try {
      await deleteTicket(ticketId);
      router.push("/tickets");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow-sm transition-colors hover:bg-rose-50"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Delete Ticket
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50">
              <Trash2 className="h-5 w-5 text-rose-600" aria-hidden="true" />
            </div>
            <h2 id="delete-title" className="text-base font-semibold text-slate-900">
              Delete {ticketNumber}?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              This permanently removes the ticket and its activity history. This cannot be undone.
            </p>
            {error ? <p role="alert" className="mt-3 text-sm text-rose-600">{error}</p> : null}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button type="button" onClick={handleDelete} disabled={isDeleting} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-rose-600/20 hover:bg-rose-700 disabled:opacity-60">
                {isDeleting ? "Deleting..." : "Delete Ticket"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
