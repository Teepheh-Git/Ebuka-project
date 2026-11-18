import { createSupabaseServerClient } from "@/lib/supabase-server";

// Returns the signed-in admin's profile from Supabase Auth.
// full_name is null when the account has no real name (it is never filled with the email).
// display_name is the name shown in greetings: the chosen display name, else the full name.
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const fullName = user.user_metadata?.full_name || null;
  return { full_name: fullName, email: user.email || "", display_name: user.user_metadata?.display_name || fullName };
}
