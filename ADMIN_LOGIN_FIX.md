# Quick Fix: Admin Login Issue

## Problem
Getting "Invalid API key" when trying to log in to `/admin`

## Root Cause
The SQL migrations haven't been run in your Supabase database yet, so the `api_keys` table doesn't have the admin key stored.

## Solution

### Step 1: Run Database Migrations

1. Open your Supabase dashboard: https://slutiyclrdrzuwdxteco.supabase.co
2. Go to **SQL Editor** (left sidebar)
3. Click **+ New Query**
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Ctrl/Cmd + Enter)
7. Wait for success message

### Step 2: Seed Data

1. Still in SQL Editor, click **+ New Query** again
2. Copy the entire contents of `supabase/migrations/002_seed_data.sql`
3. Paste into the SQL editor
4. Click **Run**
5. Wait for success message

### Step 3: Verify

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - `projects` (3 rows)
   - `skills` (10 rows)
   - `site_settings` (3 rows)
   - `api_keys` (1 row) ← **This is the important one!**

3. Click on `api_keys` table and verify there's one row with:
   - name: "Admin Master Key"
   - key_hash: "103c6e01f7644175515f5738254ee34c2bb85679b1bc9dc73555d074a6dc45a0"
   - active: true

### Step 4: Test Login

1. Go to http://localhost:5173/admin
2. Enter key: `admin_key_2026_kresna_portfolio_secure_xyz789`
3. Click "Login to Admin Panel"
4. You should now be able to access the dashboard!

## Alternative: Check Test Page

Visit http://localhost:5173/test-supabase to see if:
- Projects are loading (should show 3)
- Skills are loading (should show 10)
- **Admin Auth shows "OK"** (if this is FAILED, migrations haven't been run)
