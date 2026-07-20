-- =============================================
-- Initial Schema for Kresna Portfolio CMS
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Table: projects
-- =============================================
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  tech_stack JSONB DEFAULT '[]'::JSONB,
  icon TEXT DEFAULT 'code',
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  screenshot_url TEXT,
  screenshot_alt TEXT,
  published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0
);

-- Create index for faster queries
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = TRUE;
CREATE INDEX idx_projects_published ON projects(published) WHERE published = TRUE;
CREATE INDEX idx_projects_sort_order ON projects(sort_order);

-- =============================================
-- Table: skills
-- =============================================
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tooling')),
  proficiency TEXT NOT NULL CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
  color TEXT DEFAULT 'primary',
  sort_order INT DEFAULT 0
);

-- Create index for faster queries
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_sort_order ON skills(sort_order);

-- =============================================
-- Table: site_settings
-- =============================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Table: api_keys (for admin authentication)
-- =============================================
CREATE TABLE api_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Projects: Public can read published projects
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = TRUE);

-- Skills: Public can read all skills
CREATE POLICY "Public can read all skills"
  ON skills FOR SELECT
  USING (TRUE);

-- Site Settings: Public can read all settings
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (TRUE);

-- API Keys: No public access (admin only via service role)

-- =============================================
-- Trigger: Update updated_at on row change
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
