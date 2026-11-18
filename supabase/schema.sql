-- Ploy Support Desk: database setup.
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to run once on an empty project. Running it again will fail on the
-- "create table" lines because the tables already exist; that is harmless.

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text unique,
  customer_name text not null,
  customer_email text not null default '',
  customer_phone text not null default '',
  subject text not null,
  description text not null default '',
  category text not null check (category in (
    'Technical Issues',
    'Account Access',
    'WhatsApp Connection',
    'Billing and Payments',
    'Invoicing',
    'General Enquiries'
  )),
  priority text not null default 'Medium' check (priority in ('Low', 'Medium', 'High')),
  status text not null default 'Open' check (status in ('Open', 'In Progress', 'Resolved')),
  source text not null default 'Other' check (source in ('WhatsApp', 'Email', 'Phone Call', 'Other')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_updates (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets (id) on delete cascade,
  message text not null,
  old_status text check (old_status in ('Open', 'In Progress', 'Resolved')),
  new_status text check (new_status in ('Open', 'In Progress', 'Resolved')),
  created_at timestamptz not null default now()
);

create index if not exists ticket_updates_ticket_id_idx on public.ticket_updates (ticket_id);

-- Row-level security. Stage 3 uses the publishable (anon) key only, so the
-- policies below allow the app's anon role to read and write. Real sign-in
-- with per-admin rules comes later, when Supabase Auth is added.
alter table public.tickets enable row level security;
alter table public.ticket_updates enable row level security;

create policy "anon can read tickets" on public.tickets for select to anon using (true);
create policy "anon can insert tickets" on public.tickets for insert to anon with check (true);
create policy "anon can update tickets" on public.tickets for update to anon using (true) with check (true);
create policy "anon can delete tickets" on public.tickets for delete to anon using (true);

create policy "anon can read ticket updates" on public.ticket_updates for select to anon using (true);
create policy "anon can insert ticket updates" on public.ticket_updates for insert to anon with check (true);
create policy "anon can delete ticket updates" on public.ticket_updates for delete to anon using (true);
