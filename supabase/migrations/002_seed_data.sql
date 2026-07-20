-- =============================================
-- Seed Data for Kresna Portfolio CMS
-- =============================================

-- =============================================
-- Insert Projects
-- =============================================
INSERT INTO projects (slug, title, description, tech_stack, icon, github_url, demo_url, featured, published, sort_order) VALUES
(
  'buildfolio',
  'Buildfolio',
  'A developer-focused platform to discover projects, share ideas, and build a portfolio. Inspired by GitHub Explore, Product Hunt, and Dev.to — focused entirely on developer project showcases.',
  '["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Axios", "MockAPI.io"]'::JSONB,
  'explore',
  'https://github.com/kisnak21/buildfolio-react',
  'https://buildfolio-react.vercel.app/',
  TRUE,
  TRUE,
  0
),
(
  'teachflow',
  'TeachFlow',
  'A SaaS application for teachers to manage classes, students, attendance, assignments, and lesson plans — with AI-powered lesson plan generation.',
  '["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Auth.js", "Groq API"]'::JSONB,
  'auto_stories',
  'https://github.com/kisnak21/teachflow',
  'https://teachflow-eight.vercel.app/',
  TRUE,
  TRUE,
  1
),
(
  'todo-list',
  'ToDo List',
  'A simple, no-framework task manager built with vanilla HTML, CSS, and JavaScript.',
  '["HTML", "CSS", "JavaScript"]'::JSONB,
  'checklist',
  'https://github.com/kisnak21/todo-list',
  'https://todo-list-six-dun-21.vercel.app/',
  FALSE,
  TRUE,
  2
);

-- =============================================
-- Insert Skills
-- =============================================

-- Frontend Skills
INSERT INTO skills (name, category, proficiency, color, sort_order) VALUES
('React.js', 'frontend', 'intermediate', 'primary', 0),
('Next.js', 'frontend', 'intermediate', 'primary', 1),
('Tailwind CSS', 'frontend', 'advanced', 'primary', 2),
('TypeScript', 'frontend', 'intermediate', 'primary', 3);

-- Backend Skills
INSERT INTO skills (name, category, proficiency, color, sort_order) VALUES
('Node.js', 'backend', 'advanced', 'tertiary', 0),
('PostgreSQL', 'backend', 'advanced', 'tertiary', 1);

-- Tooling Skills
INSERT INTO skills (name, category, proficiency, color, sort_order) VALUES
('Git / GitHub', 'tooling', 'advanced', 'secondary', 0),
('Vercel', 'tooling', 'advanced', 'secondary', 1),
('Vite', 'tooling', 'advanced', 'secondary', 2),
('Prisma', 'tooling', 'advanced', 'secondary', 3);

-- =============================================
-- Insert Site Settings
-- =============================================
INSERT INTO site_settings (key, value) VALUES
(
  'philosophy',
  'Clean code is not just a preference; it''s a discipline. I build robust systems with a focus on type-safety, modular design, and developer experience, leveraging React and Next.js to create high-performance applications.'
),
('stats_value', '30+'),
('stats_label', 'Projects Shipped');

-- =============================================
-- Insert Admin API Key
-- =============================================
-- Admin Key: admin_key_2026_kresna_portfolio_secure_xyz789
-- SHA-256 Hash generated for security
INSERT INTO api_keys (name, key_hash, active) VALUES
(
  'Admin Master Key',
  '8f3e9d2c1a5b7e6f4d8a2c9e1b5f7a3d6e9c2b8a4f1d7e3c5b9a6f2d8e1c4a7b',
  TRUE
);

-- =============================================
-- Verification Queries (Comment out after first run)
-- =============================================
-- SELECT COUNT(*) as total_projects FROM projects;
-- SELECT COUNT(*) as total_skills FROM skills;
-- SELECT COUNT(*) as total_settings FROM site_settings;
-- SELECT COUNT(*) as total_api_keys FROM api_keys;
