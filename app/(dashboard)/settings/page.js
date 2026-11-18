"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import { mockAdmin } from "@/lib/mock-data";

// Stage 2: changes stay in the page state only. Saving and real logout come in Stages 4 and 5.
export default function SettingsPage() {
  const [displayName, setDisplayName] = useState(mockAdmin.display_name);
  const [draftName, setDraftName] = useState(mockAdmin.display_name);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  function handleSave(event) {
    event.preventDefault();
    if (!draftName.trim()) {
      setMessage("Display name cannot be empty.");
      return;
    }
    setDisplayName(draftName.trim());
    setIsEditing(false);
    setMessage("Display name updated in the mock view.");
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

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Profile</h2>
          <dl className="flex flex-col gap-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Full Name</dt>
              <dd className="mt-1 text-slate-900">{mockAdmin.full_name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
              <dd className="mt-1 text-slate-900">{mockAdmin.email}</dd>
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
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Save Display Name
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
          <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log Out
          </button>
        </section>
      </main>
    </>
  );
}
