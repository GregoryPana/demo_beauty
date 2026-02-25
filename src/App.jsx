import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUpRight, MessageCircle, PhoneCall, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brandName = 'SeyInk'
const tagline = 'Printer Toner Delivered Across Mahe'

const heroImage =
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80'
const brandsImage =
  'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=2000&q=80'
const contactImage =
  'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=2000&q=80'

const contactInfo = {
  phone: '+248 2 604 880',
  whatsapp: '+248 2 602 140',
  email: 'orders@seyink.sc',
  location: 'Victoria, Mahe, Seychelles',
  coverage: 'Delivery across Mahe',
}

const hours = [
  'Monday – Friday: 8:00 AM – 5:00 PM',
  'Saturday: 8:00 AM – 1:00 PM',
  'Sunday: Closed',
]

function App() {
  const location = useLocation()
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const [navSolid, setNavSolid] = useState(location.pathname !== '/')

  const heroLine = useMemo(
    () => ({ lead: 'Printer Toner Delivered', accent: 'Across Mahe' }),
    []
  )

  useEffect(() => {
    const isHome = location.pathname === '/'
    setNavSolid(!isHome)

    let ctx = gsap.context(() => {
      if (heroRef.current && isHome) {
        gsap.from('.hero-animate', {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power3.out',
        })

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'bottom top+=80',
          onEnter: () => setNavSolid(true),
          onLeaveBack: () => setNavSolid(false),
        })
      }

      gsap.utils.toArray('.section-animate').forEach((section) => {
        gsap.from(section, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        })
      })

      gsap.utils.toArray('.card-animate').forEach((card, index) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [location.pathname])

  return (
    <div ref={rootRef} className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-dark)]">
      <SiteHeader navSolid={navSolid} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage heroLine={heroLine} heroRef={heroRef} />} />
          <Route path="/toner-brands" element={<BrandsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ navSolid }) {
  const linkClass = ({ isActive }) =>
    `lift ${
      isActive
        ? 'text-[color:var(--color-accent)]'
        : navSolid
          ? 'text-[color:var(--color-dark)]/80'
          : 'text-white/80'
    }`

  return (
    <header
      className={`fixed left-1/2 top-6 z-50 w-[min(92vw,980px)] -translate-x-1/2 rounded-full border transition-all duration-300 ${
        navSolid
          ? 'border-black/10 bg-white/70 text-[color:var(--color-dark)] backdrop-blur-xl'
          : 'border-transparent text-white'
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-3 text-sm md:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-wide">
          <Sparkles className="h-4 w-4 text-[color:var(--color-accent)]" />
          {brandName}
        </Link>
        <div className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] md:flex">
          <NavLink className={linkClass} to="/" end>
            Home
          </NavLink>
          <NavLink className={linkClass} to="/toner-brands">
            Toner Brands
          </NavLink>
          <NavLink className={linkClass} to="/contact">
            Contact
          </NavLink>
        </div>
        <a
          href="https://wa.me/2482602140"
          className={`magnetic button-sheen relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${
            navSolid
              ? 'bg-[color:var(--color-accent)] text-white'
              : 'border border-white/40 bg-white/10 text-white'
          }`}
        >
          <span className="cmyk-strip opacity-70" />
          <em>Order on WhatsApp</em>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  )
}

function HomePage({ heroLine, heroRef }) {
  return (
    <div>
      <section
        ref={heroRef}
        className="relative flex min-h-[100dvh] items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,11,15,0.2), rgba(0,0,0,0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-20 pt-40 md:px-16">
          <div className="max-w-2xl">
            <p className="hero-animate text-xs font-mono uppercase tracking-[0.35em] text-white/70">{tagline}</p>
            <h1 className="hero-animate mt-4 text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
              {heroLine.lead}
            </h1>
            <p className="hero-animate mt-2 text-5xl font-serif italic text-[color:var(--color-accent)] sm:text-6xl md:text-7xl">
              {heroLine.accent}
            </p>
            <p className="hero-animate mt-6 max-w-xl text-base text-white/80 md:text-lg">
              Printer toner in Mahe with toner delivery Seychelles customers rely on. Genuine and compatible cartridges for HP, Epson, and Canon printers, ready when you need to buy toner in Mahe.
            </p>
            <div className="hero-animate mt-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: 'var(--color-primary)' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: 'var(--color-cyan)' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: 'var(--color-magenta)' }} />
              <span className="h-3 w-3 rounded-full" style={{ background: 'var(--color-yellow)' }} />
            </div>
            <div className="hero-animate mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/2482602140"
                className="magnetic button-sheen relative inline-flex items-center gap-3 rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                <span className="cmyk-strip opacity-70" />
                <em>Order on WhatsApp</em>
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="tel:+2482604880"
                className="magnetic button-sheen relative inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                <span className="cmyk-strip opacity-25" />
                <em>Call Us</em>
                <PhoneCall className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="section-animate">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[color:var(--color-muted)]">How it works</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Fast confirmation, clear pricing, delivery.</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { label: 'Send us your printer model on WhatsApp.', tone: 'cyan' },
              { label: 'We confirm availability and pricing.', tone: 'magenta' },
              { label: 'We deliver to your location in Mahe.', tone: 'yellow' },
            ].map((step, index) => (
              <div key={step.label} className={`card-animate accent-card ${step.tone} rounded-[2rem] border border-black/10 bg-white p-6 shadow-soft`}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Step 0{index + 1}</p>
                <p className="mt-3 text-sm text-[color:var(--color-dark)]">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="section-animate">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[color:var(--color-muted)]">Brands we supply</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Compatible toner for HP, Canon, and Epson.</h2>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              We supply toner cartridges compatible with leading printer brands commonly used in Seychelles.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { brand: 'HP', tone: 'cyan' },
              { brand: 'Canon', tone: 'magenta' },
              { brand: 'Epson', tone: 'yellow' },
            ].map((item) => (
              <div key={item.brand} className={`card-animate accent-card ${item.tone} rounded-[2rem] border border-black/10 bg-[color:var(--color-bg)] px-4 py-6 text-center shadow-soft`}>
                <p className="text-sm font-semibold text-[color:var(--color-dark)]">{item.brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="section-animate">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[color:var(--color-muted)]">Why choose SeyInk</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Reliable delivery without the shop visit.</h2>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              'Delivery across Mahe',
              'Genuine and compatible options available',
              'Competitive local pricing',
              'Quick response via WhatsApp',
            ].map((item) => (
              <li key={item} className="card-animate rounded-[2rem] border border-black/10 bg-white px-5 py-4 text-sm shadow-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-animate mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 rounded-[2.5rem] border border-black/10 px-6 py-10 md:flex-row">
          <div>
            <h3 className="text-xl font-semibold">Need toner? Message us now.</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">WhatsApp ordering is the fastest way to confirm compatibility.</p>
          </div>
          <a
            href="https://wa.me/2482602140"
            className="magnetic button-sheen relative inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            <span className="cmyk-strip opacity-70" />
            <em>Order on WhatsApp</em>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  )
}

function BrandsPage() {
  return (
    <div>
      <section
        className="relative flex min-h-[60vh] items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,11,15,0.2), rgba(0,0,0,0.85)), url(${brandsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-16">
          <div className="max-w-2xl">
            <p className="hero-animate text-xs font-mono uppercase tracking-[0.35em] text-white/70">Toner Brands</p>
            <h1 className="hero-animate mt-4 text-3xl font-semibold text-white md:text-4xl">Toner brands we supply</h1>
            <p className="hero-animate mt-4 text-sm text-white/80">
              SeyInk supplies compatible and genuine toner cartridges for popular printer brands used in homes and businesses across Mahe. Ask for HP toner Mahe or Canon toner Seychelles availability.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="section-animate">
            <label className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted)]" htmlFor="search">
              Search toner brand
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search HP, Canon, Epson"
              className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div className="mt-10 grid gap-8">
            <BrandBlock
              title="HP Toner Cartridges in Mahe"
              copy="We supply toner cartridges suitable for a wide range of HP laser printers. Contact us with your printer model for compatibility confirmation."
            />
            <BrandBlock
              title="Canon Toner Cartridges in Seychelles"
              copy="Reliable toner options for Canon printers, available for delivery across Mahe with genuine or compatible options."
            />
            <BrandBlock
              title="Epson Toner Cartridges"
              copy="Selected toner cartridges available for Epson printers, with compatibility confirmation before dispatch."
            />
            <p className="section-animate text-sm text-[color:var(--color-muted)]">
              This is not an e-commerce site. No SKU listings or cart functionality.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function BrandBlock({ title, copy }) {
  return (
    <div className="card-animate rounded-[2rem] border border-black/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">{copy}</p>
    </div>
  )
}

function ContactPage() {
  return (
    <div>
      <section
        className="relative flex min-h-[55vh] items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,11,15,0.2), rgba(0,0,0,0.85)), url(${contactImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-16">
          <div className="max-w-2xl">
            <p className="hero-animate text-xs font-mono uppercase tracking-[0.35em] text-white/70">Contact</p>
            <h1 className="hero-animate mt-4 text-3xl font-semibold text-white md:text-4xl">Contact SeyInk</h1>
            <p className="hero-animate mt-4 text-sm text-white/80">
              WhatsApp ordering is the fastest way to confirm compatibility and delivery timing.
            </p>
            <a
              href="https://wa.me/2482602140"
              className="hero-animate magnetic button-sheen relative mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
            >
              <span className="cmyk-strip opacity-70" />
              <em>Order on WhatsApp</em>
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-white p-8 md:grid-cols-[1fr_1.2fr] md:p-10">
            <div className="section-animate space-y-6 text-sm">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Contact information</p>
                <p className="mt-2">Phone: {contactInfo.phone}</p>
                <p>WhatsApp: {contactInfo.whatsapp}</p>
                <p>Email: {contactInfo.email}</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Location</p>
                <p className="mt-2">{contactInfo.location}</p>
                <p>{contactInfo.coverage}</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Operating hours</p>
                <ul className="mt-2 space-y-1">
                  {hours.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <form className="card-animate grid gap-4 text-sm">
              <input
                className="rounded-full border border-black/10 px-4 py-3"
                placeholder="Name"
                type="text"
                required
              />
              <input
                className="rounded-full border border-black/10 px-4 py-3"
                placeholder="Phone Number"
                type="tel"
                required
              />
              <input
                className="rounded-full border border-black/10 px-4 py-3"
                placeholder="Printer Model"
                type="text"
                required
              />
              <textarea
                className="min-h-[120px] rounded-[1.5rem] border border-black/10 px-4 py-3"
                placeholder="Message"
                required
              />
              <button className="magnetic button-sheen relative inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                <span className="cmyk-strip opacity-40" />
                <em>Send Enquiry</em>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="rounded-t-[3rem] bg-[color:var(--color-primary)] px-6 py-14 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{brandName}</p>
          <p className="mt-2 text-sm text-white/70">{tagline}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">Contact</p>
          <p className="mt-2">Phone: {contactInfo.phone}</p>
          <p>WhatsApp: {contactInfo.whatsapp}</p>
          <p>Email: {contactInfo.email}</p>
        </div>
        <div className="text-sm">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">Details</p>
          <p className="mt-2">{contactInfo.location}</p>
          <p>{contactInfo.coverage}</p>
          <p className="mt-3">{hours[0]}</p>
        </div>
      </div>
    </footer>
  )
}

export default App
