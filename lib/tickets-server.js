import { createSupabaseServerClient } from "@/lib/supabase-server";

// Server components have no browser session, so they read through the cookie-based server client.
// RLS then applies to the signed-in user. The browser client (lib/tickets.js) would send only the anon key here.

function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Returns null for an unknown or malformed id so the page can show "not found".
export async function listTicketsOnServer() {
  const supabase = await createSupabaseServerClient();
  return unwrap(await supabase.from("tickets").select("*").order("created_at", { ascending: false }));
}

export async function getTicketOnServer(id) {
  if (!UUID_PATTERN.test(id)) return null;
  const supabase = await createSupabaseServerClient();
  return unwrap(await supabase.from("tickets").select("*").eq("id", id).maybeSingle());
}

export async function listUpdatesOnServer(ticketId) {
  const supabase = await createSupabaseServerClient();
  return unwrap(
    await supabase.from("ticket_updates").select("*").eq("ticket_id", ticketId).order("created_at", { ascending: true })
  );
}
