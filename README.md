# Jayaraj A - Personal Developer Portfolio

A production-ready personal developer portfolio website for **Jayaraj A** (BCA Student at Shree Devi College of Information Science | Data Analytics | Python | AI | Cyber Security).

Built with a bespoke **Black + Dark Red + Crimson** aesthetic (`#080808`, `#101010`, `#151515`, `#292929`, `#B11226`, `#750F1C`, `#D62839`), avoiding generic AI templates, purple gradients, emojis, or neon effects.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Iconography**: Lucide React (vector icons only, strictly zero emojis)
- **Routing**: React Router DOM (supports both single-page smooth scrolling and dedicated recruiter sub-pages `/about`, `/projects`, `/certificates`, `/skills`, `/education`, `/contact`)
- **Backend & Database**: Supabase (PostgreSQL, Storage, Auth) with an automatic persistent LocalStorage fallback layer for offline development.

---

## Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** v18+ and **npm**

### 2. Installation
```bash
git clone <your-repo-url>
cd Portfolio_Antigravity
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> The application is pre-configured to run out of the box in **Local Development Mode** with authentic seed data for Jayaraj A. You can explore the public website and test the full admin dashboard immediately without needing Supabase credentials right away.

---

## Accessing the Admin Panel

The Admin Dashboard is completely hidden from the public navigation to preserve recruiter focus.

1. Navigate to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (or click the discreet "Admin" shield icon in the footer).
2. **In Local Development Mode**:
   - Click **"Auto-fill Dev Credentials"** or enter:
     - **Email**: `admin@jayaraj.dev`
     - **Password**: `devadmin2024` (or any password 6+ characters)
   - Click **Sign In**.
3. **In Supabase Mode**:
   - Enter your registered Supabase Admin user credentials.
4. You will be redirected to `/admin/dashboard`, where you can manage:
   - **Profile**: Name, headline, biography, location, social links, resume, and avatar photo.
   - **Projects**: Create, edit, search, filter, and delete projects (with confirmation prompts).
   - **Certifications**: Add credentials, issuing bodies, IDs, and verification URLs.
   - **Skills**: Manage capabilities categorized into Programming, Data Analytics, AI/ML, Cyber Security, Web Development, and Tools.
   - **Education**: Maintain degrees, institutions, and timelines.
   - **Achievements**: Manage symposium presentations, workshops, and milestones.
   - **Settings**: View Supabase connection state, export JSON backups, or reset to original seeds.

---

## Supabase Setup (Production Backend)

To connect Supabase for cloud persistence, storage, and authentication:

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Note your **Project URL** and **anon public API key** from **Project Settings > API**.

### 2. Run Database Migrations
1. In the Supabase Dashboard, open the **SQL Editor**.
2. Open the file [`supabase/schema.sql`](file:///d:/Portfolio_Antigravity/supabase/schema.sql) in this repository.
3. Paste the entire content into the SQL Editor and click **Run**.
   - This creates all necessary tables (`profiles`, `projects`, `certificates`, `skills`, `education`, `achievements`, `activity_logs`).
   - It enables **Row Level Security (RLS)** so public visitors can only read data, while only authenticated admins can create, update, or delete content.
   - It initializes the `portfolio-assets` storage bucket and uploads initial seed data.

### 3. Create Your Admin User
1. In Supabase Dashboard, go to **Authentication > Users**.
2. Click **Add User > Create User** (e.g. `your-email@example.com` and a secure password).
3. Toggle "Auto Confirm User" so you can sign in immediately.

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Restart the dev server:
```bash
npm run dev
```
The admin panel header will now display a green **"Supabase Live"** badge!

---

## Adding Assets & Customizing

### Adding Your Profile Photo
- **Method 1 (File system)**: Replace `public/profile.jpg` with your photo.
- **Method 2 (Admin Panel)**: Go to `/admin/dashboard/profile` and upload an image file. The page will never break if the image is missing — it automatically renders an elegant initials monogram (`JA`) fallback.

### Adding Resume
- **Method 1**: Replace `public/resume.pdf` with your updated resume PDF.
- **Method 2**: Go to `/admin/dashboard/profile` and upload your new resume file.

---

## Deploying to Vercel

1. Push your repository to **GitHub**.
2. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset: **Vite**.
5. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL` (optional: your Supabase URL)
   - `VITE_SUPABASE_ANON_KEY` (optional: your Supabase anon key)
6. Click **Deploy**.
7. Vercel will build and assign your live production URL.

---

## License & Credits

Designed and built for **Jayaraj A** | BCA Student, Shree Devi College of Information Science.
