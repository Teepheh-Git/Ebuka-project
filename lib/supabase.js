import { createClient } from "@supabase/supabase-js";

// The project URL is public (it is not a secret), so it is kept here as a fallback.
// The publishable (anon) key is read from the environment and is safe to ship to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://etdoamwxndxcwxuszfip.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Shared Supabase client used by server and client components.
// Access is controlled by the row-level security policies in supabase/schema.sql.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
