# Implementation Plan: Supabase CMS + Admin Panel + Performance Optimization

## 1. Supabase Setup

### 1.1 Database Tables (PostgreSQL)

**Table: `projects`**
```sql
create table projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  slug text unique not null,
  description text not null,
  tech_stack jsonb default '[]'::jsonb,
  icon text default 'code',
  github_url text,
  demo_url text,
  featured boolean default false,
  screenshot_url text,       -- Supabase Storage URL
  screenshot_alt text,
  published boolean default true,
  sort_order int default 0
);
```

**Table: `skills`**
```sql
create table skills (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  name text not null,
  category text not null check (category in ('frontend','backend','tooling')),
  proficiency text not null check (proficiency in ('beginner','intermediate','advanced','expert')),
  color text default 'primary',
  sort_order int default 0
);
```

**Table: `site_settings`** (opsional, untuk metadata, philosophy, dll)
```sql
create table site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);
```

**Table: `api_keys`**
```sql
create table api_keys (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  key_hash text not null unique,
  created_at timestamptz default now(),
  last_used_at timestamptz,
  active boolean default true
);
```

### 1.2 Row Level Security (RLS)

```sql
-- Public read untuk projects & skills yang published
create policy "Public can read published projects"
  on projects for select using (published = true);

create policy "Public can read all skills"
  on skills for select using (true);

-- Admin access via service_role key (hanya dari admin panel)
```

**Pendekatan rekomendasi:**
- Admin route menggunakan `supabaseAdmin` client (service role) yang tidak diekspos ke public pages
- Admin panel di-protect dengan custom API key login

### 1.3 Supabase Storage Bucket

- Bucket name: `project-images`
- Public read policy (untuk gambar publik)
- Upload hanya dari admin (via service role key)
- File naming: `projects/{slug}-{timestamp}.{ext}`

### 1.4 Environment Variables (`.env`)

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
VITE_SUPABASE_SERVICE_ROLE_KEY=xxxxx   # hanya untuk admin
VITE_ADMIN_API_KEY=xxxxx               # custom API key untuk admin login
```

---

## 2. File Structure Changes

```
src/
├── api/
│   ├── supabase.js          # Supabase client config
│   ├── projects.js          # Projects API functions
│   ├── skills.js            # Skills API functions
│   └── auth.js              # Admin auth functions
├── admin/
│   ├── AdminLayout.jsx      # Layout untuk halaman admin
│   ├── AdminDashboard.jsx   # Dashboard overview
│   ├── AdminLogin.jsx       # Login page
│   ├── ProjectsManager.jsx  # CRUD projects
│   ├── SkillsManager.jsx    # CRUD skills
│   └── components/
│       ├── ProjectForm.jsx  # Form add/edit project
│       ├── SkillForm.jsx    # Form add/edit skill
│       ├── ImageUploader.jsx # Component upload gambar
│       └── AdminSidebar.jsx # Admin navigation
├── components/
│   ├── ProjectCard.jsx      # MODIFIED — loading="lazy" for images
│   ├── SkillCard.jsx        # MODIFIED — data dari API
│   └── layout/
│       ├── Layout.jsx       # MODIFIED — tambah admin route
│       └── Sidebar.jsx      # MODIFIED — tambah nav admin (if logged in)
├── hooks/
│   ├── useProjects.js       # React Query / custom hook for projects
│   └── useSkills.js         # Custom hook for skills
├── context/
│   ├── ThemeContext.jsx      # unchanged
│   └── AdminContext.jsx     # NEW — admin auth state
├── pages/
│   ├── Home.jsx             # MODIFIED — fetch projects dari API
│   ├── Projects.jsx         # MODIFIED — fetch dari API
│   └── Skills.jsx           # MODIFIED — fetch dari API
├── App.jsx                  # MODIFIED — add admin routes
└── main.jsx                 # unchanged
```

---

## 3. Implementation Phases

### Phase 1: Supabase Foundation (Estimated: 2-3 hours)

**Step 1.1: Install dependencies**
```bash
npm install @supabase/supabase-js
```

**Step 1.2: Create Supabase Client (`src/api/supabase.js`)**
- Initialize dengan anon key
- Export `supabase` instance
- Export `supabaseAdmin` instance (service role key untuk admin)

**Step 1.3: Create Supabase Tables**
- Run SQL migrations via Supabase Dashboard SQL Editor
- Setup RLS policies

**Step 1.4: Create Storage Bucket**
- `project-images` bucket
- Set public access

**Step 1.5: Seed initial data**
- Migrate existing data dari `projectsData.js` dan `skillsData.js` ke Supabase
- Generate API key untuk admin

---

### Phase 2: API Service Layer (Estimated: 2-3 hours)

**Step 2.1: `src/api/projects.js`**
```js
export async function getProjects({ featured, limit } = {})
export async function getProjectBySlug(slug)
export async function createProject(projectData)  // admin only
export async function updateProject(id, projectData) // admin only
export async function deleteProject(id)             // admin only
export async function uploadProjectImage(file, slug) // admin only
```

**Step 2.2: `src/api/skills.js`**
```js
export async function getSkills()
export async function getSkillsByCategory(category)
export async function createSkill(skillData)    // admin only
export async function updateSkill(id, skillData) // admin only
export async function deleteSkill(id)            // admin only
```

**Step 2.3: `src/api/auth.js`**
```js
export async function verifyAdminKey(key)
export function getStoredAdminKey()
export function storeAdminKey(key)
export function clearAdminKey()
```

---

### Phase 3: Frontend Data Integration (Estimated: 2-3 hours)

**Step 3.1: Custom hooks**
- `src/hooks/useProjects.js` — fetch, loading, error states
- `src/hooks/useSkills.js` — fetch, loading, error states

**Step 3.2: Modify pages to fetch from Supabase**
- `Home.jsx`: Replace `import { projects } from '../data/projectsData.js'` with `useProjects()`
- `Projects.jsx`: Same approach
- `Skills.jsx`: Replace static imports with `useSkills()`

**Step 3.3: Caching strategy**
- **Recommended: React Query** (`@tanstack/react-query`)
  - Automatic caching & refetching
  - Optimistic updates untuk admin CRUD
  - Loading/error states built-in
  - Cache invalidation setelah mutasi

```bash
npm install @tanstack/react-query
```

**Step 3.4: Modify `JsonCodePanel.jsx`**
- Dynamic data dari Supabase instead of static import

---

### Phase 4: Admin Panel (Estimated: 4-5 hours)

**Step 4.1: Admin Context (`src/context/AdminContext.jsx`)**
- `isAuthenticated` state
- `login(key)`, `logout()` functions
- Persist session ke localStorage (hashed key)

**Step 4.2: Admin Login Page**
- Simple password/API key input
- Theme-matching UI (terminal style)
- Redirect ke dashboard setelah login

**Step 4.3: Admin Layout**
- Mirip layout utama tapi dengan admin sidebar
- Navigation: Dashboard, Projects, Skills, Logout
- Responsive dengan tab bar

**Step 4.4: Project Manager**
- **List view**: Table/cards dari semua projects (including unpublished)
- **Create**: Form dengan fields: title, slug, description, techStack (tag input), icon picker, URLs, featured toggle, screenshot upload
- **Edit**: Reuse form, pre-populated
- **Delete**: Confirmation dialog
- **Image Upload**: File input → Supabase Storage → return URL

**Step 4.5: Skill Manager**
- **List view**: Grouped by category (frontend, backend, tooling)
- **Create/Edit**: Form with name, category dropdown, proficiency select, color select
- **Delete**: Confirmation dialog

**Step 4.6: Admin Routes**
```jsx
// Di App.jsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminLogin />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="projects" element={<ProjectsManager />} />
  <Route path="skills" element={<SkillsManager />} />
</Route>

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? children : <Navigate to="/admin" replace />
}
```

**Step 4.7: Update Sidebar & MobileTabBar**
- Jika admin authenticated, tambah navigasi ke `/admin/dashboard`

---

### Phase 5: Performance Optimization (Estimated: 1-2 hours)

**Step 5.1: Image Lazy Loading**
```jsx
<img
  src={project.screenshot_url}
  alt={project.screenshot_alt}
  loading="lazy"
  decoding="async"
/>
```

**Step 5.2: Intersection Observer for images** (opsional)
- Custom hook `useLazyImage` untuk fallback browser yang tidak support `loading="lazy"`
- Placeholder shimmer/blur effect

**Step 5.3: Better Code Splitting**
Update `vite.config.js`:
```js
manualChunks(id) {
  if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
    return 'react-vendor'
  }
  if (id.includes('node_modules/react-router')) {
    return 'router'
  }
  if (id.includes('node_modules/@supabase')) {
    return 'supabase'
  }
  if (id.includes('node_modules/@tanstack')) {
    return 'query'
  }
  // Admin bundle terpisah
  if (id.includes('/src/admin/')) {
    return 'admin'
  }
}
```

**Step 5.4: Route-level splitting**
- Already done dengan `React.lazy()` untuk pages
- Tambah untuk admin routes juga

**Step 5.5: Image optimization notes**
- Supabase Storage supports image transformation via URL
- Format: `?width=400&quality=80&format=webp` (jika diaktifkan)
- Atau: Generate thumbnails saat upload (menggunakan Supabase Edge Functions atau sharp)

---

### Phase 6: Polish & Testing (Estimated: 1-2 hours)

**Step 6.1: Loading states**
- Skeleton components untuk Projects, Skills
- Loading spinner untuk CRUD operations di admin

**Step 6.2: Error handling**
- Error boundaries untuk API calls
- Retry logic (React Query handles this)
- User-friendly error messages

**Step 6.3: Fallback data**
- Jika Supabase down, fallback ke static data (keep `src/data/` files as backup)
- Tampilkan notifikasi

**Step 6.4: Admin UX**
- Toast notifications for success/error
- Unsaved changes warning
- Form validation (required fields, URL format)

**Step 6.5: Security**
- Jangan expose `service_role` key ke client bundle
- Admin route hanya di-load saat user authenticated
- Rate limiting di sisi Supabase (jika perlu)

---

## 4. Effort Estimation Summary

| Phase | Task | Estimated Time |
|-------|------|---------------|
| 1 | Supabase foundation | 2-3 jam |
| 2 | API service layer | 2-3 jam |
| 3 | Frontend data integration | 2-3 jam |
| 4 | Admin panel | 4-5 jam |
| 5 | Performance optimization | 1-2 jam |
| 6 | Polish & testing | 1-2 jam |
| **Total** | | **12-18 jam** |

---

## 5. Potential Architecture Decision Records

### ADR-1: Service Role Key Strategy
- **Option**: Gunakan `supabaseAdmin` client di admin pages, bukan RLS policy complex
- **Risk**: Service role key ada di Vite env (`VITE_SUPABASE_SERVICE_ROLE_KEY`) — walaupun di admin route, technically masih ada di client bundle
- **Mitigation**: Pisah admin jadi lazy-loaded chunk. Service role key tetap ada di build tapi admin route di-protect oleh custom API key login
- **Better alternative**: Proxy server (Vercel Edge Function atau Express) — tapi ini overkill untuk use case saat ini

### ADR-2: State Management
- **Option**: React Query (Recommended)
- **Rationale**: Built-in caching, deduplication, background refetch, optimistic updates untuk admin CRUD
- **Install**: `@tanstack/react-query` (~13KB gzipped)

### ADR-3: Image Handling
- **Strategy**: Upload langsung dari admin ke Supabase Storage
- **Transformation**: Manfaatkan `?width=` query params (Supabase Image Transformation jika diaktifkan)
- **Fallback**: Ikon Material Symbols jika screenshot tidak ada

---

## 6. Dependencies to Install

```bash
npm install @supabase/supabase-js @tanstack/react-query
```

Total added size: ~25KB gzipped

---

## 7. Current Files to MODIFY

| File | Change Description |
|------|-------------------|
| `src/App.jsx` | Add admin routes, QueryClientProvider |
| `src/components/ProjectCard.jsx` | Support image + lazy loading |
| `src/components/ProjectFileCard.jsx` | Support image + lazy loading |
| `src/components/layout/Layout.jsx` | Admin route outlet |
| `src/components/layout/Sidebar.jsx` | Admin nav link (if auth) |
| `src/components/layout/MobileTabBar.jsx` | Admin tab (if auth) |
| `src/components/SkillCard.jsx` | No change (data-driven) |
| `src/components/JsonCodePanel.jsx` | Fetch from API |
| `src/data/projectsData.js` | Keep as fallback |
| `src/data/skillsData.js` | Keep as fallback |
| `src/pages/Home.jsx` | Fetch from API, add loading state |
| `src/pages/Projects.jsx` | Fetch from API, add loading state |
| `src/pages/Skills.jsx` | Fetch from API, add loading state |
| `vite.config.js` | Additional manualChunks for supabase, query, admin |
| `.env` | Add Supabase env vars |
| `index.css` | Minor additions (skeleton animation) |

## 8. Files to CREATE (NEW)

| File | Description |
|------|-------------|
| `src/api/supabase.js` | Supabase client config |
| `src/api/projects.js` | Projects CRUD functions |
| `src/api/skills.js` | Skills CRUD functions |
| `src/api/auth.js` | Admin auth functions |
| `src/context/AdminContext.jsx` | Admin auth context |
| `src/hooks/useProjects.js` | Projects data hook |
| `src/hooks/useSkills.js` | Skills data hook |
| `src/admin/AdminLayout.jsx` | Admin layout |
| `src/admin/AdminDashboard.jsx` | Dashboard |
| `src/admin/AdminLogin.jsx` | Login form |
| `src/admin/ProjectsManager.jsx` | Project CRUD page |
| `src/admin/SkillsManager.jsx` | Skill CRUD page |
| `src/admin/components/ProjectForm.jsx` | Add/Edit project form |
| `src/admin/components/SkillForm.jsx` | Add/Edit skill form |
| `src/admin/components/ImageUploader.jsx` | Image upload component |
| `src/admin/components/AdminSidebar.jsx` | Admin navigation |
