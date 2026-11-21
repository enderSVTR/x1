-- MotoFix Pro Supabase schema and role separation.
-- Run this entire file once in the Supabase SQL Editor (not in parts).
-- Credentials remain in Supabase Auth. User and admin profile/role records are
-- stored separately in public.user_profiles and public.admin_profiles.

begin;

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Profiles: migrate the existing profiles table, if present, into two tables.
-- ---------------------------------------------------------------------------
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  profile_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  profile_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- If the previous schema's public.profiles is a table, copy its data first.
-- Users/admins are moved to exactly one of the new profile tables according to
-- their existing role. Drop the old table afterwards so it cannot conflict.
do $$
declare
  profiles_kind "char";
begin
  select c.relkind into profiles_kind
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'profiles';

  if profiles_kind = 'r' or profiles_kind = 'p' then
    execute $copy_users$
      insert into public.user_profiles (id, username, profile_image_url, created_at, updated_at)
      select p.id,
             coalesce(nullif(trim(p.username), ''), 'user_' || left(p.id::text, 8)),
             p.profile_image_url,
             coalesce(p.created_at, now()),
             coalesce(p.updated_at, p.created_at, now())
      from public.profiles p
      where coalesce(p.role, 'user') <> 'admin'
      on conflict (id) do update set
        username = excluded.username,
        profile_image_url = excluded.profile_image_url,
        updated_at = excluded.updated_at
    $copy_users$;

    execute $copy_admins$
      insert into public.admin_profiles (id, username, profile_image_url, created_at, updated_at)
      select p.id,
             coalesce(nullif(trim(p.username), ''), 'admin_' || left(p.id::text, 8)),
             p.profile_image_url,
             coalesce(p.created_at, now()),
             coalesce(p.updated_at, p.created_at, now())
      from public.profiles p
      where p.role = 'admin'
      on conflict (id) do update set
        username = excluded.username,
        profile_image_url = excluded.profile_image_url,
        updated_at = excluded.updated_at
    $copy_admins$;

    -- Remove legacy auth triggers before replacing the old profile table.
    drop trigger if exists on_auth_user_created on auth.users;
    drop trigger if exists on_auth_user_created_profile on auth.users;
    drop trigger if exists profiles_set_updated_at on public.profiles;
    drop table public.profiles;
  end if;
end;
$$;

-- Keep timestamps current for editable records.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_profiles_set_updated_at on public.user_profiles;
create trigger user_profiles_set_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();

drop trigger if exists admin_profiles_set_updated_at on public.admin_profiles;
create trigger admin_profiles_set_updated_at
before update on public.admin_profiles
for each row execute function public.set_updated_at();

-- New Auth registrations always become ordinary users, never administrators.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  chosen_username text;
begin
  chosen_username := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
    'user_' || left(new.id::text, 8)
  );

  if exists (select 1 from public.user_profiles u where lower(u.username) = lower(chosen_username)) then
    chosen_username := left(chosen_username, 80) || '_' || left(new.id::text, 8);
  end if;

  -- A newly registered account is inserted ONLY into user_profiles.
  insert into public.user_profiles (id, username)
  values (new.id, chosen_username)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

-- Compatibility read view used by the current Next.js profile/auth code.
-- It presents the currently authenticated account's row and derives role from
-- membership in separate tables; applications cannot write roles through it.
create or replace view public.profiles
with (security_invoker = true)
as
  select u.id, u.username, u.profile_image_url, 'user'::text as role,
         u.created_at, u.updated_at
  from public.user_profiles u
  union all
  select a.id, a.username, a.profile_image_url, 'admin'::text as role,
         a.created_at, a.updated_at
  from public.admin_profiles a;

-- ---------------------------------------------------------------------------
-- Bookings and notifications.
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default extensions.gen_random_uuid(),
  booking_code text not null unique default ('BK-' || upper(substr(replace(extensions.gen_random_uuid()::text, '-', ''), 1, 8))),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  motorcycle text not null,
  service text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text,
  admin_note text,
  status text not null default 'Menunggu'
    check (status in ('Menunggu', 'Diproses', 'Dikonfirmasi', 'Selesai', 'Dibatalkan')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_appointment_idx on public.bookings (appointment_date, appointment_time);

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create table if not exists public.notifications (
  id uuid primary key default extensions.gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  customer_name text not null,
  title text not null,
  message text not null,
  status text not null
    check (status in ('Menunggu', 'Diproses', 'Dikonfirmasi', 'Selesai', 'Dibatalkan')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_created_idx on public.notifications (user_id, created_at desc);

create or replace function public.notify_booking_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.notifications (booking_id, user_id, customer_name, title, message, status)
    values (
      new.id, new.user_id, new.customer_name,
      'Booking Berhasil Terkirim',
      'Pesanan booking Anda (' || new.booking_code || ') sedang menunggu konfirmasi admin.',
      new.status
    );
  elsif new.status is distinct from old.status then
    insert into public.notifications (booking_id, user_id, customer_name, title, message, status)
    values (
      new.id, new.user_id, new.customer_name,
      'Update Booking ' || new.booking_code,
      'Status booking Anda telah diperbarui menjadi ' || new.status || '.',
      new.status
    );
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_create_notification on public.bookings;
create trigger bookings_create_notification
after insert or update of status on public.bookings
for each row execute function public.notify_booking_change();

-- ---------------------------------------------------------------------------
-- Catalog, services, and testimonials.
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('ban', 'oli', 'sparepart')),
  name text not null,
  brand text not null,
  product_type text,
  price numeric(12, 2) not null check (price >= 0),
  image_url text,
  description text,
  full_description text,
  details jsonb not null default '{}'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  compatibility jsonb not null default '[]'::jsonb,
  recommended_bikes jsonb not null default '[]'::jsonb,
  in_stock boolean not null default true,
  rating numeric(2, 1) check (rating >= 0 and rating <= 5),
  reviews_count integer not null default 0 check (reviews_count >= 0),
  warranty text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_brand_idx on public.products (brand);
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table if not exists public.service_types (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.service_types (name) values
  ('Ganti Ban (Pemasangan & Balancing)'),
  ('Ganti Oli & Filter Mesin'),
  ('Pemasangan Sparepart Motor'),
  ('Servis Berkala / Tune Up'),
  ('Perbaikan Mesin & Injeksi'),
  ('Perbaikan CVT Matic'),
  ('Servis Rem & Kopling'),
  ('Kelistrikan & Aki'),
  ('Cuci & Detailing'),
  ('Lainnya')
on conflict (name) do nothing;

create table if not exists public.testimonials (
  id uuid primary key default extensions.gen_random_uuid(),
  customer_name text not null,
  motorcycle text,
  content text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Admin check and Row Level Security.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_profiles a
    where a.id = (select auth.uid())
  );
$$;

alter table public.user_profiles enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.notifications enable row level security;
alter table public.products enable row level security;
alter table public.service_types enable row level security;
alter table public.testimonials enable row level security;

-- Drop policies created by this script first so it can be safely re-run.
drop policy if exists "Users and admins read user profiles" on public.user_profiles;
drop policy if exists "Users update own user profile" on public.user_profiles;
drop policy if exists "Admins read admin profiles" on public.admin_profiles;
drop policy if exists "Admins update own admin profile" on public.admin_profiles;
drop policy if exists "Guests and users can submit bookings" on public.bookings;
drop policy if exists "Customers and admins can read bookings" on public.bookings;
drop policy if exists "Admins can update bookings" on public.bookings;
drop policy if exists "Admins can delete bookings" on public.bookings;
drop policy if exists "Customers and admins can read notifications" on public.notifications;
drop policy if exists "Users and admins mark notifications read" on public.notifications;
drop policy if exists "Anyone can read products" on public.products;
drop policy if exists "Admins can manage products" on public.products;
drop policy if exists "Anyone can read active services" on public.service_types;
drop policy if exists "Admins can manage services" on public.service_types;
drop policy if exists "Anyone can read published testimonials" on public.testimonials;
drop policy if exists "Admins can manage testimonials" on public.testimonials;

create policy "Users and admins read user profiles"
on public.user_profiles for select to authenticated
using (id = (select auth.uid()) or (select public.is_admin()));

create policy "Users update own user profile"
on public.user_profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Admins read admin profiles"
on public.admin_profiles for select to authenticated
using (id = (select auth.uid()) or (select public.is_admin()));

create policy "Admins update own admin profile"
on public.admin_profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Guests and users can submit bookings"
on public.bookings for insert to anon, authenticated
with check (user_id is null or user_id = (select auth.uid()));

create policy "Customers and admins can read bookings"
on public.bookings for select to authenticated
using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Admins can update bookings"
on public.bookings for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins can delete bookings"
on public.bookings for delete to authenticated
using ((select public.is_admin()));

create policy "Customers and admins can read notifications"
on public.notifications for select to authenticated
using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Users and admins mark notifications read"
on public.notifications for update to authenticated
using (user_id = (select auth.uid()) or (select public.is_admin()))
with check (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Anyone can read products"
on public.products for select to anon, authenticated
using (true);

create policy "Admins can manage products"
on public.products for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Anyone can read active services"
on public.service_types for select to anon, authenticated
using (is_active = true or (select public.is_admin()));

create policy "Admins can manage services"
on public.service_types for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Anyone can read published testimonials"
on public.testimonials for select to anon, authenticated
using (is_published = true or (select public.is_admin()));

create policy "Admins can manage testimonials"
on public.testimonials for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Read-only compatibility view for the app's existing getProfile() query.
-- Role membership cannot be changed through this view.
grant select on public.profiles to authenticated;
grant select, update on public.user_profiles to authenticated;
grant select, update on public.admin_profiles to authenticated;
grant select, insert, update, delete on public.bookings to authenticated;
grant insert on public.bookings to anon;
grant select, update on public.notifications to authenticated;
grant select on public.products, public.service_types, public.testimonials to anon, authenticated;
grant insert, update, delete on public.products, public.service_types, public.testimonials to authenticated;

drop policy if exists "Avatar images are publicly readable" on storage.objects;
drop policy if exists "Users can upload their own avatar" on storage.objects;
drop policy if exists "Users can update their own avatar" on storage.objects;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Avatar images are publicly readable"
on storage.objects for select to anon, authenticated
using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
on storage.objects for insert to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "Users can update their own avatar"
on storage.objects for update to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text)
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

commit;

-- To move an existing account into the admin table, run this separately in the
-- SQL Editor after the account exists in Authentication > Users:
-- insert into public.admin_profiles (id, username, profile_image_url)
-- select u.id, coalesce(nullif(p.username, ''), split_part(u.email, '@', 1)), p.profile_image_url
-- from auth.users u
-- left join public.user_profiles p on p.id = u.id
-- where lower(u.email) = lower('admin123@gmail.com')
-- on conflict (id) do nothing;
-- delete from public.user_profiles
-- where id = (select id from auth.users where lower(email) = lower('admin123@gmail.com'));
