"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./sidebar";

// Shown only below the md breakpoint. The button opens a drawer containing the sidebar.
export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close the drawer when Escape is pressed.
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" onClick={() => setIsOpen(false)} />
          <aside className="relative z-10 h-full w-72 max-w-[85vw] bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <Sidebar onNavigate={() => setIsOpen(false)} />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
