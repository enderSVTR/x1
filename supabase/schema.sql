-- Supabase SQL Editor: run once to create profile/booking tables and secure access.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  profile_image_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'username'), ''), split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text not null unique default ('BK-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  motorcycle text not null,
  service text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text,
  admin_note text,
  status text not null default 'Menunggu' check (status in ('Menunggu', 'Diproses', 'Dikonfirmasi', 'Selesai', 'Dibatalkan')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  customer_name text not null,
  title text not null,
  message text not null,
  status text not null check (status in ('Menunggu', 'Diproses', 'Dikonfirmasi', 'Selesai', 'Dibatalkan')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.notifications enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

drop policy if exists "Users read own profile; admins read all" on public.profiles;
create policy "Users read own profile; admins read all" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_admin());
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()) and role = 'user');

drop policy if exists "Customers create own bookings" on public.bookings;
create policy "Customers create own bookings" on public.bookings for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "Users read own bookings; admins read all" on public.bookings;
create policy "Users read own bookings; admins read all" on public.bookings for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
drop policy if exists "Admins update bookings" on public.bookings;
create policy "Admins update bookings" on public.bookings for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins delete bookings" on public.bookings;
create policy "Admins delete bookings" on public.bookings for delete to authenticated using (public.is_admin());

drop policy if exists "Users read own notifications; admins read all" on public.notifications;
create policy "Users read own notifications; admins read all" on public.notifications for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
drop policy if exists "Users mark own notifications read" on public.notifications;
create policy "Users mark own notifications read" on public.notifications for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.bookings to authenticated;
grant select, update on public.notifications to authenticated;

-- Create an Auth user for the administrator, then assign its profile role securely:
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'ADMIN_EMAIL');
