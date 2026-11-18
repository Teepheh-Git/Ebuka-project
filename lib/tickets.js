import { supabase } from "@/lib/supabase";

// Every function throws an Error when Supabase returns one, so pages and forms can show it.
function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

export async function listTickets() {
  return unwrap(await supabase.from("tickets").select("*").order("created_at", { ascending: false }));
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Returns null for an unknown or malformed id so the page can show "not found".
export async function getTicket(id) {
  if (!UUID_PATTERN.test(id)) return null;
  return unwrap(await supabase.from("tickets").select("*").eq("id", id).maybeSingle());
}

export async function listUpdates(ticketId) {
  return unwrap(
    await supabase.from("ticket_updates").select("*").eq("ticket_id", ticketId).order("created_at", { ascending: true })
  );
}

// Ticket numbers look like TKT-000007. The next number is one more than the highest existing one.
async function nextTicketNumber() {
  const latest = unwrap(
    await supabase.from("tickets").select("ticket_number").order("ticket_number", { ascending: false }).limit(1).maybeSingle()
  );
  const last = latest ? parseInt(latest.ticket_number.replace("TKT-", ""), 10) : 0;
  return `TKT-${String(last + 1).padStart(6, "0")}`;
}

export async function createTicket(form) {
  const ticket_number = await nextTicketNumber();
  return unwrap(await supabase.from("tickets").insert({ ...form, ticket_number }).select().single());
}

export async function updateTicket(id, form) {
  unwrap(await supabase.from("tickets").update({ ...form, updated_at: new Date().toISOString() }).eq("id", id));
}

// Adds a note to the activity history. When the status changes, the ticket row is updated too.
export async function addUpdate(ticket, { message, newStatus }) {
  const statusChanged = newStatus && newStatus !== ticket.status;

  if (statusChanged) {
    unwrap(
      await supabase.from("tickets").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", ticket.id)
    );
  }

  unwrap(
    await supabase.from("ticket_updates").insert({
      ticket_id: ticket.id,
      message: message || `Status changed to ${newStatus}.`,
      old_status: statusChanged ? ticket.status : null,
      new_status: statusChanged ? newStatus : null,
    })
  );
}

export async function deleteTicket(id) {
  unwrap(await supabase.from("tickets").delete().eq("id", id));
}
