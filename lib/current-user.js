import { createSupabaseServerClient } from "@/lib/supabase-server";

// Returns the signed-in admin's profile for display: name and email from Supabase Auth.
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const name = user.user_metadata?.full_name || user.email || "Administrator";
  return { full_name: name, email: user.email || "", display_name: user.user_metadata?.display_name || name };
}
