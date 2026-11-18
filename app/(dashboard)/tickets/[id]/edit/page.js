import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
import TicketForm from "@/components/tickets/ticket-form";
import { getTicketOnServer } from "@/lib/tickets-server";

// Same form as New Ticket, pre-filled with the existing values.

export default async function EditTicketPage({ params }) {
  const { id } = await params;
  const ticket = await getTicketOnServer(id);

  if (!ticket) {
    notFound();
  }

  return (
    <>
      <PageHeader title={`Edit ${ticket.ticket_number}`} />
      <main className="mx-auto w-full max-w-3xl p-4 md:p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <TicketForm
            ticketId={id}
            initialValues={{
              customer_name: ticket.customer_name,
              customer_email: ticket.customer_email,
              customer_phone: ticket.customer_phone,
              subject: ticket.subject,
              description: ticket.description,
              category: ticket.category,
              priority: ticket.priority,
              source: ticket.source,
            }}
            cancelHref={`/tickets/${id}`}
            submitLabel="Save Changes"
          />
        </div>
      </main>
    </>
  );
}
