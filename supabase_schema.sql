-- Create a table for public profiles if you want (optional, but good for storing extra user data)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,

  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create expenses table
create table public.expenses (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  amount numeric not null,
  category text not null,
  date timestamp with time zone not null default now(),
  note text,
  type text check (type in ('income', 'expense')) default 'expense',
  currency text check (currency in ('ILS', 'USD')) default 'ILS',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),

  primary key (id)
);

alter table public.expenses enable row level security;

create policy "Users can view their own expenses." on public.expenses
  for select using (auth.uid() = user_id);

create policy "Users can insert their own expenses." on public.expenses
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own expenses." on public.expenses
  for update using (auth.uid() = user_id);

create policy "Users can delete their own expenses." on public.expenses
  for delete using (auth.uid() = user_id);

-- Function to handle new user signup (automatically create profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
