-- =============================================
-- Schema for Kresna Portfolio Notes/Blog
-- =============================================

-- Table: notes
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  tags JSONB DEFAULT '[]'::JSONB,
  published BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_notes_slug ON notes(slug);
CREATE INDEX IF NOT EXISTS idx_notes_published ON notes(published) WHERE published = TRUE;
CREATE INDEX IF NOT EXISTS idx_notes_project_id ON notes(project_id);
CREATE INDEX IF NOT EXISTS idx_notes_sort_order ON notes(sort_order);

-- Row Level Security (RLS)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Public can read published notes
CREATE POLICY "Public can read published notes"
  ON notes FOR SELECT
  USING (published = TRUE);

-- Trigger: Update updated_at on row change
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed Sample Note
INSERT INTO notes (slug, title, excerpt, content, tags, published, sort_order) VALUES
(
  'membangun-arsitektur-buildfolio',
  'Membangun Arsitektur Buildfolio: Platform Showcase Projek Developer',
  'Catatan proses belajar dan keputasan desain arsitektur saat membangun Buildfolio dengan React, Redux Toolkit, dan Tailwind CSS.',
  '# Membangun Arsitektur Buildfolio

Saat memulai proyek **Buildfolio**, tujuan utamaku adalah membuat platform showcase yang benar-benar fokus untuk developer. Terinspirasi dari *GitHub Explore* dan *Dev.to*, saya ingin antarmuka yang bersih dan mudah digunakan.

## Tech Stack & Alasan Pemilihan

Berikut adalah teknologi utama yang saya pilih:
1. **React 19 & Vite** - Untuk performa render yang cepat dan pengalaman developer yang optimal.
2. **Redux Toolkit** - Mengelola global state untuk filter projek dan bookmark pengguna.
3. **Tailwind CSS** - Mempercepat styling dengan utility-first classes.

### Tantangan yang Dihadapi

Salah satu tantangan terbesar adalah mengelola integrasi data API dari *MockAPI.io* agar tetap responsif ketika pengguna melakukan pencarian secara real-time.

```js
// Contoh custom hook sederhana untuk debounce search
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

> **Pelajaran Penting:** Selalu pisahkan layer API dengan UI component agar kode lebih mudah di-maintain di masa depan.

Kini Buildfolio sudah berjalan lancar dan terus dikembangkan!',
  '["React", "Architecture", "Redux", "Learning"]'::JSONB,
  TRUE,
  0
) ON CONFLICT (slug) DO NOTHING;
