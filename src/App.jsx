import { createElement, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
} from 'motion/react'
import {
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  Copy,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Server,
  Smartphone,
  Sun,
  Wrench,
  X,
} from 'lucide-react'
import {
  SiDart,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiReact,
  SiVercel,
  SiVite,
} from '@icons-pack/react-simple-icons'
import { journey, navItems, profile, projects, skills, socials, stats } from './data'

/* Link dibuat lewat createElement agar aman saat copy-paste dari chat */
const A = (props) => createElement('a', props)

/* Link web dibuka di tab baru, sedangkan mailto:/#anchor dibuka biasa */
const linkProps = (href) =>
  /^https?:/.test(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

const brandIcons = {
  laravel: SiLaravel,
  php: SiPhp,
  mysql: SiMysql,
  flutter: SiFlutter,
  dart: SiDart,
  react: SiReact,
  vite: SiVite,
  js: SiJavascript,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
}

const wideIcons = new Set(['php', 'mysql'])
const groupIcons = { server: Server, mobile: Smartphone, monitor: Monitor, tools: Wrench }
const journeyIcons = { work: Briefcase, edu: GraduationCap }

function BrandIcon({ name, size = 16 }) {
  const Icon = brandIcons[name]
  if (!Icon) return null
  return <Icon size={wideIcons.has(name) ? Math.round(size * 1.4) : size} />
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const socialIcons = { github: SiGithub, linkedin: LinkedinIcon, email: Mail }
const sectionIds = navItems.map(([id]) => id)

/* ============================ Hooks ============================ */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('ecv-theme-v2') || 'dark'
    } catch {
      return 'dark'
    }
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('ecv-theme-v2', theme)
    } catch {
      /* abaikan */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

function useTypewriter(words, type = 70, erase = 35, hold = 1400) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('typing')
  useEffect(() => {
    const word = words[index % words.length]
    let timer
    if (phase === 'typing') {
      if (text === word) timer = setTimeout(() => setPhase('erasing'), hold)
      else timer = setTimeout(() => setText(word.slice(0, text.length + 1)), type)
    } else if (text === '') {
      timer = setTimeout(() => {
        setPhase('typing')
        setIndex((n) => n + 1)
      }, 200)
    } else {
      timer = setTimeout(() => setText(word.slice(0, text.length - 1)), erase)
    }
    return () => clearTimeout(timer)
  }, [text, phase, index, words, type, erase, hold])
  return text
}

/* ====================== Komponen pembantu ====================== */

function Stagger({ children, className, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

function Item({ children, className }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

function Reveal({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function Spot({ className = '', children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <motion.div className={`spot ${className}`} variants={fadeUp} onPointerMove={onMove} {...rest}>
      {children}
    </motion.div>
  )
}

function Tilt({ children, className, max = 8 }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sy = useSpring(ry, { stiffness: 200, damping: 20 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  )
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

function Words({ text, accentIndex }) {
  return text.split(' ').map((word, i) => (
    <span className="mask" key={word + i} aria-hidden="true">
      <motion.span
        className={`mask-in ${i === accentIndex ? 'grad-text' : ''}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
      >
        {word}&nbsp;
      </motion.span>
    </span>
  ))
}

function SectionHead({ no, label, title, desc }) {
  return (
    <Stagger className="sec-head">
      <Item>
        <p className="eyebrow mono">
          <span>{no}</span>
          <i />
          {label}
        </p>
      </Item>
      <Item>
        <h2 className="h2">{title}</h2>
      </Item>
      {desc && (
        <Item>
          <p className="sec-desc">{desc}</p>
        </Item>
      )}
    </Stagger>
  )
}

/* ========================= Background ========================= */

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return <motion.div className="progress no-print" style={{ scaleX }} />
}

function Background() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${e.clientX}px`)
        root.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="bg no-print" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <span className="grid-bg" />
      <span className="cursor-glow" />
      <span className="noise" />
    </div>
  )
}

/* =========================== Navbar =========================== */

function Navbar({ theme, onToggle }) {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  return (
    <div className="nav-wrap no-print">
      <motion.header
        className="nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      >
        <nav className="nav-links" aria-label="Navigasi utama">
          {navItems.map(([id, label]) => (
            <A key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="nav-label">{label}</span>
            </A>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={onToggle} aria-label="Ganti tema">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                className="icon-swap"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map(([id, label]) => (
              <A key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </A>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============================ Hero ============================ */

function Hero({ onPrint }) {
  const typed = useTypewriter(profile.roles)
  const [photoOk, setPhotoOk] = useState(true)
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <section id="beranda" className="hero container">
      <div className="hero-copy">
        <h1 className="name" aria-label={profile.name}>
          <Words text={profile.name} accentIndex={1} />
        </h1>
        <motion.p className="role-line" {...rise(0.7)}>
          <span className="role-print">{profile.role}</span>
          <span className="role-live">
            Saya seorang <span className="typed grad-text">{typed}</span>
            <span className="caret" aria-hidden="true" />
          </span>
        </motion.p>
        <motion.p className="tagline" {...rise(0.8)}>
          {profile.tagline}
        </motion.p>
        <motion.div className="hero-cta no-print" {...rise(0.9)}>
          <Magnetic>
            <A href="#kontak" className="btn btn-primary">
              <Mail size={18} /> Hubungi Saya
            </A>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={onPrint}>
              <Download size={18} /> Unduh PDF
            </button>
          </Magnetic>
        </motion.div>
        <motion.div className="hero-social no-print" {...rise(1)}>
          {socials
            .filter((s) => s.id !== 'email')
            .map((s) => {
              const Icon = socialIcons[s.id]
              return (
                <A
                  key={s.id}
                  {...linkProps(s.href)}
                  className="social-btn"
                  aria-label={s.label}
                >
                  <Icon size={20} />
                </A>
              )
            })}
        </motion.div>
        <motion.p className="hero-loc mono" {...rise(1.1)}>
          <MapPin size={15} /> {profile.location}
        </motion.p>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
      >
        <Tilt className="tilt">
          <div className="avatar-card">
            <span className="ring" aria-hidden="true" />
            <div className="avatar-inner">
              {photoOk ? (
                <img
                  src={profile.photo}
                  alt={`Foto ${profile.name}`}
                  onError={() => setPhotoOk(false)}
                />
              ) : (
                <span className="monogram">{initials}</span>
              )}
            </div>
          </div>
          <span className="float-badge fb1" aria-hidden="true">
            <SiLaravel size={24} />
          </span>
          <span className="float-badge fb2" aria-hidden="true">
            <SiFlutter size={24} />
          </span>
          <span className="float-badge fb3" aria-hidden="true">
            <SiReact size={24} />
          </span>
        </Tilt>
      </motion.div>

      <A href="#tentang" className="scroll-cue no-print" aria-label="Scroll ke bawah">
        <ChevronDown size={26} />
      </A>
    </section>
  )
}

function Marquee() {
  const items = skills.flatMap((g) => g.items).filter((i) => i.icon)
  const loop = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((it, i) => (
          <span className="marquee-item" key={it.name + i}>
            <BrandIcon name={it.icon} size={22} /> {it.name}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ========================== Sections ========================== */

function AboutSection() {
  return (
    <section id="tentang" className="section container">
      <SectionHead
        no="01"
        label="Tentang"
        title={
          <>
            Sedikit tentang <em>saya</em>
          </>
        }
      />
      <Stagger className="bento">
        <Spot className="bento-about">
          <p className="lead">{profile.about[0]}</p>
          <p className="muted">{profile.about[1]}</p>
        </Spot>
        <Spot className="bento-side">
          <span className="mini-label mono">Fokus utama</span>
          <div className="chips">
            {profile.focus.map((f) => (
              <span className="chip" key={f.name}>
                <BrandIcon name={f.icon} size={14} />
                {f.name}
              </span>
            ))}
          </div>
        </Spot>
        <Spot className="bento-side">
          <span className="mini-label mono">Lokasi</span>
          <p className="big-line">{profile.location}</p>
          <p className="muted small">Indonesia</p>
        </Spot>
      </Stagger>
      <Stagger className="stats">
        {stats.map((s) => (
          <Item className="stat" key={s.label}>
            <strong className="stat-num grad-text">
              <Counter to={s.value} suffix={s.suffix} />
            </strong>
            <span>{s.label}</span>
          </Item>
        ))}
      </Stagger>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skill" className="section container">
      <SectionHead
        no="02"
        label="Skill"
        title={
          <>
            Teknologi yang saya <em>gunakan</em>
          </>
        }
        desc="Dari sisi server sampai tampilan, ini alat-alat yang saya pakai untuk membangun produk."
      />
      <Stagger className="skill-grid">
        {skills.map((g) => {
          const GIcon = groupIcons[g.icon] ?? Server
          return (
            <Spot className="skill-card" key={g.group}>
              <div className="skill-head">
                <span className="icon-tile">
                  <GIcon size={20} />
                </span>
                <h3>{g.group}</h3>
              </div>
              <p className="muted small">{g.desc}</p>
              <div className="chips">
                {g.items.map((it) => (
                  <span className="chip" key={it.name}>
                    <BrandIcon name={it.icon} size={14} />
                    {it.name}
                  </span>
                ))}
              </div>
            </Spot>
          )
        })}
      </Stagger>
    </section>
  )
}

function JourneySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return (
    <section id="perjalanan" className="section container">
      <SectionHead
        no="03"
        label="Perjalanan"
        title={
          <>
            Pendidikan & <em>pengalaman</em>
          </>
        }
      />
      <div className="tl" ref={ref}>
        <span className="tl-line" aria-hidden="true">
          <motion.span className="tl-fill" style={{ scaleY }} />
        </span>
        {journey.map((j) => {
          const Icon = journeyIcons[j.type] ?? Briefcase
          return (
            <motion.article
              className="tl-item"
              key={j.title + j.place}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="tl-dot">
                <Icon size={18} />
              </span>
              <Spot className="tl-card">
                <span className="period mono">{j.period}</span>
                <h3>{j.title}</h3>
                <p className="tl-place">{j.place}</p>
                <p className="muted">{j.desc}</p>
              </Spot>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="proyek" className="section container">
      <SectionHead
        no="04"
        label="Proyek"
        title={
          <>
            Karya <em>pilihan</em>
          </>
        }
        desc="Beberapa proyek yang pernah saya bangun dan kerjakan."
      />
      <Stagger className="proj-grid" amount={0.1}>
        {projects.map((p, i) => (
          <Spot key={p.name} className={`proj ${p.featured ? 'featured' : ''}`}>
            <div className="proj-cover" style={{ '--h': p.hue, '--h2': p.hue2 ?? p.hue + 30 }}>
              <span className="proj-no mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="mock" aria-hidden="true">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="l l1" />
                <span className="l l2" />
                <span className="l l3" />
              </div>
            </div>
            <div className="proj-body">
              <span className="proj-meta mono">{p.kind}</span>
              <h3>{p.name}</h3>
              <p className="muted">{p.desc}</p>
              <div className="chips">
                {p.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {(p.repo || p.demo) && (
                <div className="proj-links no-print">
                  {p.repo && (
                    <A {...linkProps(p.repo)} className="proj-link">
                      <SiGithub size={16} /> Kode sumber <ArrowUpRight size={16} />
                    </A>
                  )}
                  {p.demo && (
                    <A {...linkProps(p.demo)} className="proj-link">
                      Lihat demo <ArrowUpRight size={16} />
                    </A>
                  )}
                </div>
              )}
            </div>
          </Spot>
        ))}
      </Stagger>
    </section>
  )
}

function ContactSection() {
  const [copied, setCopied] = useState(false)
  const email = socials.find((s) => s.id === 'email')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email.handle)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = email.href
    }
  }

  return (
    <section id="kontak" className="section container">
      <Reveal className="cta">
        <span className="cta-glow" aria-hidden="true" />
        <p className="eyebrow mono">
          <span>05</span>
          <i />
          Kontak
        </p>
        <h2 className="cta-title">
          Mari <em>berkolaborasi</em>,
          <br />
          atau sekadar menyapa.
        </h2>
        <p className="muted">Terbuka untuk diskusi proyek, kolaborasi, dan peluang belajar.</p>
        <div className="cta-actions no-print">
          <Magnetic>
            <A {...linkProps(email.href)} className="btn btn-primary">
              <Mail size={18} /> Kirim Email
            </A>
          </Magnetic>
          <button className="btn btn-ghost" onClick={copy}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="btn-text">{copied ? 'Tersalin!' : email.handle}</span>
          </button>
        </div>
        <div className="social-row">
          {socials.map((s) => {
            const Icon = socialIcons[s.id]
            return (
              <A
                key={s.id}
                {...linkProps(s.href)}
                className="social-link"
                aria-label={`${s.label}: ${s.handle}`}
              >
                <span className="social-ico">
                  <Icon size={20} />
                </span>
                <span className="social-text">
                  <b>{s.label}</b>
                  <span>{s.handle}</span>
                </span>
                <ArrowUpRight size={18} className="no-print" />
              </A>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer container">
      <p className="mono">
        © {new Date().getFullYear()} {profile.name} · {profile.brand}
      </p>
      <p className="mono no-print">Dibuat dengan React, Vite & Motion · vibe coding dengan bantuan AI</p>
      <A href="#beranda" className="to-top no-print">
        <ArrowUp size={16} /> Kembali ke atas
      </A>
    </footer>
  )
}

/* ============================= App ============================= */

export default function App() {
  const [theme, toggleTheme] = useTheme()
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Background />
      <div className="app">
        <Navbar theme={theme} onToggle={toggleTheme} />
        <main>
          <Hero onPrint={() => window.print()} />
          <Marquee />
          <AboutSection />
          <SkillsSection />
          <JourneySection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}