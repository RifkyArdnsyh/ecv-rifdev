export const profile = {
  name: "Rifky Ardiansyah",
  brand: "RifDev",
  role: "Full-Stack Developer",
  roles: ["Full-Stack Developer", "Laravel Developer", "Flutter Developer"],
  location: "Tasikmalaya, Jawa Barat",
  photo: "/foto.webp",
  tagline:
    "Membangun aplikasi web dan mobile yang rapi, fungsional, dan siap dipakai.",
  about: [
    "Mahasiswa Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) Kampus Kota Tasikmalaya yang mulai belajar coding sejak SMK pada 2021.",
    "Fokus saya di pengembangan web dengan Laravel dan aplikasi mobile dengan Flutter. Saya suka membangun sistem dari awal sampai dipakai, mulai dari analisis kebutuhan, backend, hingga tampilan.",
  ],
  focus: [
    { name: "Laravel", icon: "laravel" },
    { name: "Flutter", icon: "flutter" },
  ],
};

export const navItems = [
  ["beranda", "Beranda"],
  ["tentang", "Tentang"],
  ["skill", "Skill"],
  ["perjalanan", "Perjalanan"],
  ["proyek", "Proyek"],
  ["kontak", "Kontak"],
];

// handle = teks yang ditampilkan, href = tujuan link
// Email memakai Gmail compose (jalan di browser mana pun yang login Gmail),
// karena mailto: tidak berfungsi di perangkat tanpa aplikasi email default.
export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@RifkyArdnsyh",
    href: "https://github.com/RifkyArdnsyh",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/rifkyardiansyah-si",
    href: "https://www.linkedin.com/in/rifkyardiansyah-si",
  },
  {
    id: "email",
    label: "Email",
    handle: "rifkyardiansyah687@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=rifkyardiansyah687@gmail.com&su=Halo%20Rifky",
  },
];

// icon: kunci ikon brand (lihat brandIcons di App.jsx). Tanpa icon = tampil sebagai teks saja.
export const skills = [
  {
    group: "Backend",
    icon: "server",
    desc: "Logika bisnis, API, dan database.",
    items: [
      { name: "Laravel", icon: "laravel" },
      { name: "PHP", icon: "php" },
      { name: "MySQL", icon: "mysql" },
      { name: "REST API" },
      { name: "Laravel Sanctum" },
      { name: "Midtrans" },
    ],
  },
  {
    group: "Mobile",
    icon: "mobile",
    desc: "Aplikasi lintas platform.",
    items: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
      { name: "Provider" },
    ],
  },
  {
    group: "Frontend",
    icon: "monitor",
    desc: "Antarmuka web yang responsif.",
    items: [
      { name: "React", icon: "react" },
      { name: "Vite", icon: "vite" },
      { name: "JavaScript", icon: "js" },
      { name: "HTML & CSS" },
      { name: "Tailwind CSS" },
      { name: "Alpine.js" },
    ],
  },
  {
    group: "Tools",
    icon: "tools",
    desc: "Alur kerja dan deployment.",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Figma" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
];

// type: 'work' atau 'edu'
export const journey = [
  {
    type: "work",
    period: "2026 - sekarang",
    title: "Backend & Web Specialist (Magang)",
    place: "Diskominfo Kota Tasikmalaya",
    desc: "Menjalani program magang pada bagian backend dan pengembangan web.",
  },
  {
    type: "edu",
    period: "2024 - sekarang",
    title: "S1 Sistem Informasi",
    place:
      "Universitas Bina Sarana Informatika (UBSI), Kampus Kota Tasikmalaya",
    desc: "Fakultas Teknik dan Informatika.",
  },
  {
    type: "edu",
    period: "2021 - 2024",
    title: "SMK Pengembangan Perangkat Lunak dan Gim (PPLG)",
    place: "SMKN 2 Kota Tasikmalaya",
    desc: "Mulai belajar pemrograman pada tahun 2021.",
  },
];

// repo = link kode (GitHub), demo = link situs yang sudah di-deploy.
// Biarkan "" kalau belum ada: tombolnya otomatis tidak ditampilkan.
// hue = warna sampul (0-360), hue2 = warna kedua (opsional), featured = kartu besar.
export const projects = [
  {
    name: "ngeGym",
    kind: "Web + Mobile",
    desc: "Sistem informasi gym berbasis digital dengan empat peran (Admin, Trainer, Member, Guest): backend Laravel dan aplikasi mobile Flutter. Telah tercatat Hak Cipta (HKI) tahun 2026 sebagai karya tim.",
    tags: ["Laravel", "Flutter", "Midtrans", "HKI"],
    repo: "", // repo masih privat, jadi tidak ditautkan
    demo: "",
    hue: 24,
    hue2: 350,
  },
  {
    name: "SATU RUMAH (Backend)",
    kind: "Proyek Tim",
    desc: "Backend dan panel admin web SATU RUMAH untuk Disperwaskim Kota Tasikmalaya. Peran saya: Backend & Web Specialist (modul API dan web admin).",
    tags: ["Laravel", "Blade", "REST API"],
    repo: "https://github.com/RifkyArdnsyh/Backend-SatuRumah",
    demo: "",
    hue: 215,
    hue2: 255,
  },
];

const START_YEAR = 2021;
const techCount = skills.reduce((sum, g) => sum + g.items.length, 0);

export const stats = [
  {
    value: new Date().getFullYear() - START_YEAR,
    suffix: "+",
    label: "Tahun belajar coding",
  },
  { value: projects.length, suffix: "", label: "Proyek unggulan" },
  { value: techCount, suffix: "+", label: "Teknologi digunakan" },
];
