
-- 1. Create Profiles Table (Public profile data for users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('Tenant', 'Landlord')),
  phone_number text,
  avatar_url text,
  aadhar_number text,
  dob date,
  -- Landlord specific
  address_proof_url text,
  ownership_proof_url text,
  verification_status text default 'Unverified' check (verification_status in ('Unverified', 'Pending', 'Verified', 'Rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Properties Table
create table public.properties (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id) not null,
  title text not null,
  description text,
  address text not null,
  city text not null,
  monthly_price numeric not null,
  images text[], -- Array of image URLs
  latitude numeric,
  longitude numeric,
  amenities text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Bookings Table
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references public.properties(id) not null,
  tenant_id uuid references public.profiles(id) not null,
  status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected', 'Completed')),
  message text,
  security_deposit numeric,
  monthly_rental numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Grievances Table
create table public.grievances (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  description text not null,
  status text default 'Open' check (status in ('Open', 'In Progress', 'Resolved')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.bookings enable row level security;
alter table public.grievances enable row level security;

-- 6. RLS Policies

-- Profiles
-- Everyone can view their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Landlords can view profiles of tenants who booked (simplified for now: authenticated users can read basic profile info)
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true); 

-- Users can update their own profile
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Users can insert their own profile (triggers usually handle this, but allowing for client-side creation if needed)
create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Properties
-- Everyone can view properties
create policy "Properties are public" on public.properties
  for select using (true);

-- Landlords can insert/update/delete their own properties
create policy "Landlords can manage own properties" on public.properties
  for all using (auth.uid() = owner_id);

-- Bookings
-- Tenants can view their own bookings
create policy "Users can view own bookings" on public.bookings
  for select using (auth.uid() = tenant_id);

-- Landlords can view bookings for their properties
create policy "Landlords can view bookings for their properties" on public.bookings
  for select using (
    exists (
      select 1 from public.properties
      where properties.id = bookings.property_id
      and properties.owner_id = auth.uid()
    )
  );

-- Tenants can create bookings
create policy "Tenants can create bookings" on public.bookings
  for insert with check (auth.uid() = tenant_id);

-- Landlords can update bookings (approve/reject)
create policy "Landlords can update bookings" on public.bookings
  for update using (
    exists (
      select 1 from public.properties
      where properties.id = bookings.property_id
      and properties.owner_id = auth.uid()
    )
  );

-- Storage Buckets (Execute this in SQL Editor as well to set up storage)
-- Note: You usually create buckets in the Storage UI, but this inserts into the storage.buckets table if you have permissions.
-- insert into storage.buckets (id, name, public) values ('pimages', 'pimages', true);
-- insert into storage.buckets (id, name, public) values ('documents', 'documents', false);
