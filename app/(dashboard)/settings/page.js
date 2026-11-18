"use client";

import { useState, useTransition } from "react";
import { LogOut } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import { useCurrentUser } from "@/components/layout/user-context";
import { signOut, updateDisplayName } from "@/app/auth-actions";

// Shows the signed-in user's profile from Supabase Auth, saves the display name and logs out.
export default function SettingsPage() {
  const user = useCurrentUser();
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [draftName, setDraftName] = useState(user?.display_name || "");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSave(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    startTransition(async () => {
      const result = await updateDisplayName(draftName);
      if (result.error) {
        setError(result.error);
        return;
      }
      setDisplayName(result.name);
      setIsEditing(false);
      setMessage("Display name updated.");
    });
  }

  return (
    <>
      <PageHeader title="Settings" />
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 md:p-8">
        {message ? (
          <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Profile</h2>
          <dl className="flex flex-col gap-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Full Name</dt>
              <dd className="mt-1 text-slate-900">{user?.full_name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
              <dd className="mt-1 text-slate-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Display Name</dt>
              <dd className="mt-1 text-slate-900">{displayName}</dd>
            </div>
          </dl>

          {isEditing ? (
            <form onSubmit={handleSave} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex flex-1 flex-col gap-1.5">
                <label htmlFor="display-name" className="text-sm font-medium text-slate-700">
                  New display name
                </label>
                <input
                  id="display-name"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {isPending ? "Saving..." : "Save Display Name"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(displayName);
                    setIsEditing(false);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setError("");
                setDraftName(displayName);
                setIsEditing(true);
              }}
              className="mt-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Edit Display Name
            </button>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-2 text-base font-semibold text-slate-900">Account</h2>
          <p className="mb-4 text-sm text-slate-500">Log out of the Ploy Support Desk on this device.</p>
          <form action={signOut}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log Out
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
