-- ==========================================================
-- JAYARAJ A - PORTFOLIO DATABASE SCHEMA & RLS POLICIES
-- Supabase Postgres Migration
-- ==========================================================

-- Enable pgcrypto extension for UUID generation if needed
create extension if not exists "pgcrypto";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null,
  bio text not null,
  email text not null,
  phone text,
  location text,
  linkedin_url text,
  github_url text,
  resume_url text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  category text not null default 'AI / ML',
  github_url text,
  live_demo_url text,
  image_url text,
  status text not null default 'Completed',
  featured boolean not null default false,
  date text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CERTIFICATES TABLE
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuing_organization text not null,
  issue_date text not null,
  credential_id text,
  verification_url text,
  file_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SKILLS TABLE
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null, -- 'Programming', 'Data Analytics', 'AI/ML', 'Cyber Security', 'Web Development', 'Tools'
  proficiency_level text default 'Proficient',
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. EDUCATION TABLE
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text not null,
  start_year text not null,
  end_year text not null,
  description text,
  grade text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ACHIEVEMENTS TABLE
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  date text,
  link_url text,
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. ACTIVITY LOGS (For Admin Dashboard)
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  entity text not null,
  entity_title text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Public users: SELECT only
-- Authenticated admins: SELECT, INSERT, UPDATE, DELETE
-- ==========================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.certificates enable row level security;
alter table public.skills enable row level security;
alter table public.education enable row level security;
alter table public.achievements enable row level security;
alter table public.activity_logs enable row level security;

-- PROFILES Policies
create policy "Allow public read access on profiles"
  on public.profiles for select using (true);
create policy "Allow authenticated admin full access on profiles"
  on public.profiles for all using (auth.role() = 'authenticated');

-- PROJECTS Policies
create policy "Allow public read access on projects"
  on public.projects for select using (true);
create policy "Allow authenticated admin full access on projects"
  on public.projects for all using (auth.role() = 'authenticated');

-- CERTIFICATES Policies
create policy "Allow public read access on certificates"
  on public.certificates for select using (true);
create policy "Allow authenticated admin full access on certificates"
  on public.certificates for all using (auth.role() = 'authenticated');

-- SKILLS Policies
create policy "Allow public read access on skills"
  on public.skills for select using (true);
create policy "Allow authenticated admin full access on skills"
  on public.skills for all using (auth.role() = 'authenticated');

-- EDUCATION Policies
create policy "Allow public read access on education"
  on public.education for select using (true);
create policy "Allow authenticated admin full access on education"
  on public.education for all using (auth.role() = 'authenticated');

-- ACHIEVEMENTS Policies
create policy "Allow public read access on achievements"
  on public.achievements for select using (true);
create policy "Allow authenticated admin full access on achievements"
  on public.achievements for all using (auth.role() = 'authenticated');

-- ACTIVITY LOGS Policies
create policy "Allow authenticated admin full access on activity_logs"
  on public.activity_logs for all using (auth.role() = 'authenticated');

-- ==========================================================
-- STORAGE BUCKETS SETUP
-- ==========================================================
-- Insert bucket for portfolio assets
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

-- Storage Policies
create policy "Allow public read on portfolio-assets"
  on storage.objects for select using (bucket_id = 'portfolio-assets');

create policy "Allow authenticated users to upload to portfolio-assets"
  on storage.objects for insert with check (
    bucket_id = 'portfolio-assets' and auth.role() = 'authenticated'
  );

create policy "Allow authenticated users to update portfolio-assets"
  on storage.objects for update using (
    bucket_id = 'portfolio-assets' and auth.role() = 'authenticated'
  );

create policy "Allow authenticated users to delete portfolio-assets"
  on storage.objects for delete using (
    bucket_id = 'portfolio-assets' and auth.role() = 'authenticated'
  );

-- ==========================================================
-- SEED INITIAL DATA FOR JAYARAJ A
-- ==========================================================
insert into public.profiles (
  full_name,
  headline,
  bio,
  email,
  location,
  linkedin_url,
  github_url,
  resume_url
) values (
  'Jayaraj A',
  'BCA Student | Data Analytics | Python | AI | Cyber Security',
  'Passionate Computer Applications undergraduate at Shree Devi College of Information Science with hands-on focus in Python programming, Machine Learning, Exploratory Data Analysis, and Cyber Security fundamentals. Dedicated to building robust data-driven solutions and secure systems.',
  'jayaraj.a@example.com',
  'Mangalore, Karnataka, India',
  'https://linkedin.com/in/jayaraj-a',
  'https://github.com/jayaraj-a',
  '/resume.pdf'
) on conflict do nothing;

insert into public.education (
  degree,
  institution,
  start_year,
  end_year,
  description,
  grade
) values (
  'Bachelor of Computer Applications (BCA)',
  'Shree Devi College of Information Science',
  '2023',
  '2026',
  'Undergraduate program focused on Computer Science fundamentals, Object-Oriented Programming, Database Management Systems, Data Analytics, Artificial Intelligence, and Network Security.',
  'Pursuing'
);

insert into public.skills (name, category, proficiency_level, display_order) values
('Python', 'Programming', 'Advanced', 1),
('SQL / PostgreSQL', 'Programming', 'Intermediate', 2),
('JavaScript / TypeScript', 'Programming', 'Intermediate', 3),
('Data Analytics & Pandas', 'Data Analytics', 'Advanced', 4),
('NumPy & SciPy', 'Data Analytics', 'Intermediate', 5),
('Power BI / Tableau', 'Data Analytics', 'Intermediate', 6),
('Machine Learning Fundamentals', 'AI/ML', 'Intermediate', 7),
('Scikit-Learn', 'AI/ML', 'Intermediate', 8),
('Big Data Concepts', 'AI/ML', 'Intermediate', 9),
('Network Security Fundamentals', 'Cyber Security', 'Intermediate', 10),
('Vulnerability Assessment Basics', 'Cyber Security', 'Intermediate', 11),
('Linux System Administration', 'Cyber Security', 'Intermediate', 12),
('React & Tailwind CSS', 'Web Development', 'Intermediate', 13),
('REST APIs & Supabase', 'Web Development', 'Intermediate', 14),
('Git & GitHub', 'Tools', 'Advanced', 15),
('VS Code & Jupyter Notebooks', 'Tools', 'Advanced', 16);
