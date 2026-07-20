# Phase 1: Supabase Foundation - Setup Instructions

## Step 1: Run Database Migrations

You need to manually execute the SQL migrations in your Supabase Dashboard:

### 1.1 Create Tables & Schema
1. Go to: https://slutiyclrdrzuwdxteco.supabase.co
2. Navigate to: **SQL Editor** (left sidebar)
3. Click **+ New Query**
4. Copy the contents of `supabase/migrations/001_initial_schema.sql`
5. Paste into the SQL editor
6. Click **Run**
7. Wait for success message

### 1.2 Seed Initial Data
1. Click **+ New Query** again
2. Copy the contents of `supabase/migrations/002_seed_data.sql`
3. Paste into the SQL editor
4. Click **Run**
5. Wait for success message

### 1.3 Verify Tables
1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - `projects` (3 rows)
   - `skills` (10 rows)
   - `site_settings` (3 rows)
   - `api_keys` (1 row)

## Step 2: Create Storage Bucket

1. Go to: **Storage** (left sidebar)
2. Click **+ New Bucket**
3. Enter bucket name: `project-images`
4. Make it **Public** (toggle the radio button)
5. Click **Create bucket**

## Step 3: Test Connection

1. Start your dev server: `npm run dev`
2. Navigate to: `http://localhost:5173/test-supabase`
3. You should see:
   - ✓ 3 Projects loaded
   - ✓ 10 Skills loaded
   - ✓ 3 Site Settings loaded
   - Green success message

## Step 4: Admin API Key

**Your admin API key for Phase 4 login:**
```
admin_key_2026_kresna_portfolio_secure_xyz789
```

Store this securely. You'll use it to log into the admin panel.

## Troubleshooting

### If you see "Error: PGRST" or connection errors:
- ✓ Check `.env` file has real Supabase keys (not placeholder values)
- ✓ Verify `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_SUPABASE_SERVICE_ROLE_KEY` are correct

### If tables don't appear after running migrations:
- ✓ Check SQL Editor for error messages
- ✓ Verify you're in the correct Supabase project
- ✓ Try running migrations again (they are idempotent)

### If test page shows empty arrays:
- ✓ Confirm seed data SQL ran successfully
- ✓ Check Table Editor → each table has rows
- ✓ Verify RLS policies are enabled

## Next Steps

Once the test page shows ✓ success:
1. Commit: `git add . && git commit -m "Phase 1: Supabase foundation - DB schema, migrations, API layer"`
2. Move to **Phase 2: API Service Layer** (implement CRUD functions)

---

## Files Created in Phase 1

- `supabase/migrations/001_initial_schema.sql` - Database schema
- `supabase/migrations/002_seed_data.sql` - Initial data
- `src/api/supabase.js` - Supabase client config
- `src/api/projects.js` - Projects API (read-only)
- `src/api/skills.js` - Skills API (read-only)
- `src/api/auth.js` - Admin auth stub
- `src/pages/SupabaseTest.jsx` - Test/verification page
- `.env.example` - Environment template
- `src/App.jsx` - Added test route

## Environment Variables Added

Your `.env` already has the Supabase keys. Verify they are real values (not placeholders):
- `VITE_SUPABASE_URL` ✓
- `VITE_SUPABASE_ANON_KEY` ✓
- `VITE_SUPABASE_SERVICE_ROLE_KEY` ✓
