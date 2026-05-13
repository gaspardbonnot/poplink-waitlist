# Poplink — Waitlist

Landing page liste d'attente pour la marque Poplink (bracelet "La Royal Pop").

## Stack
- HTML / CSS / JS vanilla
- Supabase (Postgres + RLS) pour stocker les inscriptions
- Vercel pour le déploiement (auto-deploy depuis GitHub)

## Setup local

```bash
cp .env.local.example .env.local
# remplir SUPABASE_URL et SUPABASE_ANON_KEY
SUPABASE_URL=... SUPABASE_ANON_KEY=... node build.js
# puis ouvrir index.html via un serveur statique (npx serve .)
```

## Supabase — SQL initial

À exécuter une fois dans le SQL editor Supabase :

```sql
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  prenom text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table public.waitlist enable row level security;
create policy "public_insert" on public.waitlist
  for insert to anon with check (true);
```

## Export CSV des inscrits

Dans le SQL editor Supabase :

```sql
select prenom, email, created_at
from public.waitlist
order by created_at desc;
```

Puis bouton "Download CSV" dans l'UI du résultat. Ou via Table editor → waitlist → Export.
