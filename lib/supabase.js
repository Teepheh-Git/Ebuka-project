import { createBrowserClient } from "@supabase/ssr";

// The project URL is public (it is not a secret), so it is kept here as a fallback.
// The publishable (anon) key is read from the environment and is safe to ship to the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://etdoamwxndxcwxuszfip.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Browser Supabase client. It reads the signed-in user's session from the same cookies
// that sign-in sets (see lib/supabase-server.js), so requests carry the "authenticated" role.
// Access is controlled by the row-level security policies in supabase/schema.sql.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
