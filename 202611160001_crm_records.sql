-- TheUrbanHuts CRM v0.3 additive migration.
-- This creates a separate flexible CRM workspace and does not alter imported tables,
-- chart of accounts, journal entries, or existing payment functions.
create extension if not exists pgcrypto;

create table if not exists public.crm_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module text not null check (module in ('leads','clients','projects','tasks','quotations','vendors','expenses','settings')),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_records_owner_module_created_idx
  on public.crm_records(user_id, module, created_at desc);

create or replace function public.crm_records_set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists crm_records_updated_at on public.crm_records;
create trigger crm_records_updated_at before update on public.crm_records
for each row execute function public.crm_records_set_updated_at();

alter table public.crm_records enable row level security;
revoke all on table public.crm_records from anon;
grant select, insert, update, delete on table public.crm_records to authenticated;

drop policy if exists "crm_records_select_own" on public.crm_records;
create policy "crm_records_select_own" on public.crm_records
for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "crm_records_insert_own" on public.crm_records;
create policy "crm_records_insert_own" on public.crm_records
for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "crm_records_update_own" on public.crm_records;
create policy "crm_records_update_own" on public.crm_records
for update to authenticated using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "crm_records_delete_own" on public.crm_records;
create policy "crm_records_delete_own" on public.crm_records
for delete to authenticated using ((select auth.uid()) = user_id);
