import { redirect } from "next/navigation";

// The home page has no content of its own. It forwards to the dashboard.
export default function HomePage() {
  redirect("/dashboard");
}
