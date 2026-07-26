export const fallbackNotes = [
  {
    id: 'sample-1',
    title: 'Membangun Arsitektur Buildfolio: Platform Showcase Projek Developer',
    slug: 'membangun-arsitektur-buildfolio',
    excerpt: 'Catatan proses belajar dan keputasan desain arsitektur saat membangun Buildfolio dengan React, Redux Toolkit, dan Tailwind CSS.',
    content: `# Membangun Arsitektur Buildfolio

Saat memulai proyek **Buildfolio**, tujuan utamaku adalah membuat platform showcase yang benar-benar fokus untuk developer. Terinspirasi dari *GitHub Explore* dan *Dev.to*, saya ingin antarmuka yang bersih dan mudah digunakan.

## Tech Stack & Alasan Pemilihan

Berikut adalah teknologi utama yang saya pilih:
1. **React 19 & Vite** - Untuk performa render yang cepat dan pengalaman developer yang optimal.
2. **Redux Toolkit** - Mengelola global state untuk filter projek dan bookmark pengguna.
3. **Tailwind CSS** - Mempercepat styling dengan utility-first classes.

### Tantangan yang Dihadapi

Salah satu tantangan terbesar adalah mengelola integrasi data API dari *MockAPI.io* agar tetap responsif ketika pengguna melakukan pencarian secara real-time.

\`\`\`js
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
\`\`\`

> **Pelajaran Penting:** Selalu pisahkan layer API dengan UI component agar kode lebih mudah di-maintain di masa depan.

Kini Buildfolio sudah berjalan lancar dan terus dikembangkan!`,
    tags: ['React', 'Architecture', 'Redux', 'Learning'],
    created_at: new Date().toISOString(),
    published: true,
    projects: {
      title: 'Buildfolio',
      slug: 'buildfolio'
    }
  }
]
