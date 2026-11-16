# TheUrbanHuts CRM Dashboard — v0.3

A Next.js 15 / React 19 + Supabase CRM starter expanded from the supplied v0.2 ZIP.

## Included in v0.3
- Supabase email/password authentication and protected dashboard.
- CRUD screens for leads, clients, projects, tasks, quotations, vendors, expenses and internal CMS/company content notes.
- Search, create, edit and delete for CRM records.
- Additive `crm_records` database table with per-user Row Level Security (RLS).
- Existing imported task/client/workforce/asset views, import review, ledger and manual payment RPC screen retained.
- Expense register is an operational tracking register only; it does not post accounting journal entries.
- Company content notes are internal only; no GoDaddy publishing integration is configured.

## Setup
1. Use Node.js 20.9 or newer.
2. Extract this ZIP and run `npm install`.
3. Copy `.env.local.example` to `.env.local`.
4. Set `NEXT_PUBLIC_SUPABASE_URL=https://nntsinkkelcpkkfxtixp.supabase.co` (confirm this is still the intended project).
5. Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the project's publishable key or legacy anon key from Supabase Project Settings → API Keys.
6. Never put a `service_role` or secret key in a `NEXT_PUBLIC_` variable.
7. In Supabase SQL Editor, review and run `supabase/migrations/202611160001_crm_records.sql`.
8. Ensure your owner/staff users already exist in Supabase Auth, then run `npm run dev`.
9. Visit `http://localhost:3000` and sign in.

## Data and security design
- New CRM data is stored in `public.crm_records`, partitioned by module and owner user ID.
- RLS limits each signed-in user to their own records. This is a safe starting point for a single-owner workspace, not yet a shared team-role model.
- The migration is additive: it does not alter existing imported tables, chart of accounts, journal entries, or payment functions.
- To allow multiple staff to share company records, implement and test an explicit organization-membership/role model before relaxing the owner-only RLS policy.
- Existing payment entry continues to call the pre-existing `record_ledger_payment` RPC. It records bookkeeping only; it does not move money or verify a bank/UPI receipt.
- Expenses are not posted to the accounting ledger. Have an accountant review GST, TDS, approvals and posting workflows.
- Existing imported data screens remain read-only and may show an access or schema error if their expected source tables/columns differ.
- Do not expose service-role keys, passwords, database URLs, or private API tokens.

## Important deployment status
This is a source-code package, not a deployed service. No connection was made to the live Supabase project and no SQL was executed. A local dependency install, TypeScript check, production build, end-to-end test, penetration test and accounting review have not been completed. Do not connect this app to the public website or use it for live accounting until those checks pass.

## Suggested next steps
1. Run the additive SQL migration in the intended Supabase project.
2. Add/confirm owner and staff accounts in Supabase Auth.
3. Install dependencies and run the local typecheck/build.
4. Test create/edit/delete with owner and a second staff account to confirm isolation.
5. Design organization-based roles, activity logs, document uploads, quotation PDF generation, WhatsApp integration and payment reconciliation as separate reviewed phases.

## References
- Supabase SSR setup: https://supabase.com/docs/guides/auth/server-side
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
