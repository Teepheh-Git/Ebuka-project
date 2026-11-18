"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck } from "lucide-react";
import { addUpdate } from "@/lib/tickets";

// Marks the ticket Resolved and records it in the activity history.
export default function ResolveButton({ ticket }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const isResolved = ticket.status === "Resolved";

  async function handleClick() {
    setIsSaving(true);
    setError("");
    try {
      await addUpdate(ticket, { message: "Ticket marked as resolved.", newStatus: "Resolved" });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isResolved || isSaving}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-emerald-600/20 transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        <CheckCheck className="h-4 w-4" aria-hidden="true" />
        {isResolved ? "Resolved" : isSaving ? "Saving..." : "Mark as Resolved"}
      </button>
      {error ? <p role="alert" className="text-xs text-rose-600 sm:basis-full">{error}</p> : null}
    </>
  );
}
