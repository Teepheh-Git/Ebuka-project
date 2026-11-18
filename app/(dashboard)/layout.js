import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar";

// Every page inside (dashboard) gets this shell: a fixed sidebar on desktop
// and the page content on the right. Route protection is added in Stage 4.
// The folder name in parentheses does not appear in the URL.
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white md:block">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>
      </aside>
      <div className="flex min-h-screen min-w-0 flex-col md:pl-64">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </div>
  );
}
