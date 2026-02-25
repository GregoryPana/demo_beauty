import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import {
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
const tonerImage = '/images/toner-pic.webp'
import hpLogo from './assets/brands/hp.png'
import canonLogo from './assets/brands/canon.png'
import epsonLogo from './assets/brands/epson.png'

const brandName = 'SeyKelz'
const tagline = 'Printer Toner Sales & Ordering'
const siteUrl = 'http://localhost:5173'

const contactInfo = {
  phone: '+248 2587146',
  whatsapp: '+248 2587146',
  email: 'seykelz@yahoo.com',
  location: 'Victoria, Seychelles',
  coverage: 'Optional delivery for some orders',
}

const hours = [
  'Monday – Friday: 8:00 AM – 5:00 PM',
  'Saturday: 8:00 AM – 1:00 PM',
  'Sunday: Closed',
]

function App() {
  const location = useLocation()
  const [navCompact, setNavCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef(null)
  const scrollRafRef = useRef(null)

  const seoConfig = useMemo(
    () => ({
      '/': {
        title: 'Printer Toner Sales | SeyKelz - Seychelles',
        description:
          'Printer toner sales and ordering in Seychelles with best prices on genuine and compatible HP, Canon, and Epson cartridges. WhatsApp ordering is the main service.',
        canonical: `${siteUrl}/`,
        ogImage: `${siteUrl}/images/toner-pic.webp`,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: brandName,
            url: siteUrl,
            logo: `${siteUrl}/images/seykelz.png`,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            sameAs: [],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: brandName,
            url: siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/toner-brands?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: brandName,
            url: siteUrl,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            areaServed: 'Seychelles',
          },
        ],
      },
      '/toner-brands': {
        title: 'Toner Brands & Compatibility | SeyKelz - Seychelles',
        description:
          'HP, Canon, and Epson toner compatibility checks in Seychelles with best prices on compatible options. Send your printer model for quick confirmation.',
        canonical: `${siteUrl}/toner-brands`,
        ogImage: `${siteUrl}/images/toner-pic.webp`,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: brandName,
            url: siteUrl,
            logo: `${siteUrl}/images/seykelz.png`,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            sameAs: [],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: brandName,
            url: siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/toner-brands?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: brandName,
            url: siteUrl,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            areaServed: 'Seychelles',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Printer toner compatibility and supply',
            description: 'Compatibility checks and supply for HP, Canon, and Epson toner cartridges.',
            provider: {
              '@type': 'Organization',
              name: brandName,
              url: siteUrl,
            },
            areaServed: 'Seychelles',
          },
        ],
      },
      '/contact': {
        title: 'Contact SeyKelz | Toner Sales - Seychelles',
        description:
          'Contact SeyKelz for printer toner sales and ordering in Seychelles with best prices. WhatsApp-first ordering, phone support, and fast compatibility checks.',
        canonical: `${siteUrl}/contact`,
        ogImage: `${siteUrl}/images/toner-pic.webp`,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: brandName,
            url: siteUrl,
            logo: `${siteUrl}/images/seykelz.png`,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            sameAs: [],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: brandName,
            url: siteUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: brandName,
            url: siteUrl,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            areaServed: 'Seychelles',
          },
        ],
      },
    }),
    []
  )

  useEffect(() => {
    const config = seoConfig[location.pathname] || seoConfig['/']
    if (!config) return

    document.title = config.title

    const setMeta = (key, value, isProperty = false) => {
      const selector = isProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        if (isProperty) {
          el.setAttribute('property', key)
        } else {
          el.setAttribute('name', key)
        }
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    const setLink = (rel, href) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setMeta('description', config.description)
    setMeta('robots', 'index,follow')
    setLink('canonical', config.canonical)

    setMeta('og:title', config.title, true)
    setMeta('og:description', config.description, true)
    setMeta('og:url', config.canonical, true)
    setMeta('og:type', 'website', true)
    setMeta('og:image', config.ogImage, true)
    setMeta('og:site_name', brandName, true)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', config.title)
    setMeta('twitter:description', config.description)
    setMeta('twitter:image', config.ogImage)

    const existing = document.querySelectorAll('script[data-seo="jsonld"]')
    existing.forEach((node) => node.remove())
    config.schema.forEach((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo', 'jsonld')
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }, [location.pathname, seoConfig])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current) return
      scrollRafRef.current = requestAnimationFrame(() => {
        setNavCompact(window.scrollY > 12)
        scrollRafRef.current = null
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current)
    }
  }, [])

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    elements.forEach((el) => observer.observe(el))
    observerRef.current = observer

    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const enableDots = () => document.body.classList.add('dots-animate')
    const raf = requestAnimationFrame(() => setTimeout(enableDots, 300))
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('dots-animate')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <div className="gradient-dots" />
      <SiteHeader navCompact={navCompact} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="pt-24 md:pt-28">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toner-brands" element={<BrandsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ navCompact, menuOpen, setMenuOpen }) {
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  return (
    <header className={`site-header ${navCompact ? 'site-header-compact' : ''}`}>
        <div className={`header-row mx-auto flex w-full max-w-6xl items-center justify-between px-6 ${navCompact ? 'py-3' : 'py-4'}`}>
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <img src="/images/seykelz.png" alt="SeyKelz logo" className="logo-image" width="48" height="48" />
          <span className="logo-text">{brandName}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/toner-brands" className={linkClass}>
            Toner Brands
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>
        <div className="header-actions flex items-center gap-3">
          <a
            href="tel:+2482587146"
            className="icon-button hidden md:grid"
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a href="https://wa.me/2482587146" className="btn-primary header-cta items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="cta-full">Order on WhatsApp</span>
            <span className="cta-short">Whatsapp</span>
          </a>
          <button
            className="icon-button menu-toggle lg:hidden"
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/toner-brands" className={linkClass}>
            Toner Brands
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <a href="https://wa.me/2482587146" className="btn-primary w-full justify-center">
            Whatsapp
          </a>
        </div>
      )}
    </header>
  )
}

function HomePage() {
  const [brandQuery, setBrandQuery] = useState('')
  const brandModels = useMemo(
    () => ({
      HP: ['HP 26A (CF226A)', 'HP 05A (CE505A)', 'HP 85A (CE285A)'],
      Canon: ['Canon 737', 'Canon 057', 'Canon 051'],
      Epson: ['Epson S050190', 'Epson S050187', 'Epson S050166'],
    }),
    []
  )

  return (
    <div>
      <section className="hero-section">
        <div className="hero-content mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <p className="eyebrow">{tagline}</p>
            <h1 className="hero-title">Printer Toner Sales & Ordering</h1>
            <p className="mt-4 text-base text-[color:var(--color-muted)]">
              SeyKelz sells genuine and compatible toner cartridges for HP, Epson, and Canon printers at best prices. Ordering and supply are the core service; delivery is optional for some orders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://wa.me/2482587146" className="btn-primary">
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp
              </a>
              <Link to="/toner-brands" className="btn-secondary">
                View Supported Brands
              </Link>
            </div>
            <div className="trust-row">
              <span>
                <BadgeCheck className="h-4 w-4 text-[color:var(--color-yellow)]" /> Genuine + Compatible
              </span>
              <span>
                <Truck className="h-4 w-4 text-[color:var(--color-cyan)]" /> Optional Delivery
              </span>
              <span>
                <Send className="h-4 w-4 text-[color:var(--color-magenta)]" /> Fast Response
              </span>
            </div>
          </div>
          <div className="reveal hero-card">
            <div className="cmyk-ribbon" />
            <img
              src={tonerImage}
              srcSet="/images/toner-pic-900.webp 900w, /images/toner-pic.webp 1400w"
              sizes="(max-width: 768px) 90vw, 560px"
              alt="Toner cartridge"
              className="hero-image"
              width="1400"
              height="933"
              fetchPriority="high"
              decoding="sync"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="section-header reveal">
            <p className="eyebrow">How It Works</p>
            <h2 className="section-title">Order toner fast, confirm compatibility.</h2>
          </div>
          <div className="stepper">
            {[
              {
                title: 'Send your printer model',
                text: 'Message the model or cartridge code on WhatsApp.',
                icon: <MessageCircle className="h-5 w-5" />,
              },
              {
                title: 'Confirm availability & price',
                text: 'We verify genuine and compatible options.',
                icon: <CheckCircle2 className="h-5 w-5" />,
              },
              {
                title: 'Optional delivery',
                text: 'Delivery is available for some orders when needed.',
                icon: <Truck className="h-5 w-5" />,
              },
            ].map((step, index) => (
              <div key={step.title} className="step-card reveal">
                <div className="step-icon">{step.icon}</div>
                <p className="step-title">Step 0{index + 1}</p>
                <h3>{step.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="section-header reveal">
            <p className="eyebrow">Brands We Supply</p>
            <h2 className="section-title">Compatible toner for HP, Canon, and Epson.</h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              We supply toner cartridges compatible with leading printer brands commonly used in Seychelles, including HP toner Seychelles and Canon toner Seychelles requests.
            </p>
          </div>
          <div className="reveal mt-4 max-w-md">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]" htmlFor="brand-search">
              Search toner model
            </label>
            <input
              id="brand-search"
              type="text"
              value={brandQuery}
              onChange={(event) => setBrandQuery(event.target.value)}
              placeholder="Search model (e.g., 26A, 737)"
              className="mt-2 w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm"
            />
          </div>
          <div className="brand-grid mt-6">
            {[
              { name: 'HP', tone: 'accent-cyan', logo: hpLogo },
              { name: 'Canon', tone: 'accent-magenta', logo: canonLogo },
              { name: 'Epson', tone: 'accent-yellow', logo: epsonLogo },
            ].map((brand) => (
              <details
                key={brand.name}
                className={`brand-card ${brand.tone} reveal`}
                open={
                  brandQuery.trim().length > 0 &&
                  brandModels[brand.name].some((model) =>
                    model.toLowerCase().includes(brandQuery.trim().toLowerCase())
                  )
                }
              >
                <summary>
                  <div>
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="brand-logo"
                      width="128"
                      height="56"
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="mt-2 text-sm font-semibold">{brand.name}</p>
                    <p className="text-xs text-[color:var(--color-muted)]">Laser toner support</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-[color:var(--color-muted)]" />
                </summary>
                <div className="brand-models">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Popular models</p>
                  <ul>
                    {brandModels[brand.name]
                      .filter((model) => model.toLowerCase().includes(brandQuery.trim().toLowerCase()))
                      .map((model) => (
                        <li key={model}>{model}</li>
                      ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <div className="reveal mt-6">
            <Link to="/toner-brands" className="btn-secondary inline-flex items-center gap-2">
              View all toner brands
              <ChevronDown className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="section-header reveal">
            <p className="eyebrow">Why Choose SeyKelz</p>
            <h2 className="section-title">Fast answers. Compatible supply.</h2>
          </div>
          <div className="value-grid">
            {[
              {
                title: 'Optional delivery',
                text: 'Delivery is available for some orders when needed.',
                tone: 'accent-cyan',
                icon: <Truck className="h-5 w-5" />,
              },
              {
                title: 'Genuine & Compatible Options',
                text: 'Choose the right fit for your printer and budget.',
                tone: 'accent-magenta',
                icon: <ShieldCheck className="h-5 w-5" />,
              },
              {
                title: 'WhatsApp Ordering',
                text: 'Send your model and get fast confirmation.',
                tone: 'accent-yellow',
                icon: <MessageCircle className="h-5 w-5" />,
              },
            ].map((item) => (
              <div key={item.title} className={`value-card ${item.tone} reveal`}>
                <div className="value-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="section-header reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Quick answers before you order.</h2>
          </div>
          <div className="faq-grid">
            {[
              {
                q: 'How do I know which toner I need?',
                a: 'Send your printer model or a photo of the cartridge label on WhatsApp.',
              },
              {
                q: 'Do you have genuine toner?',
                a: 'Yes. We supply both genuine and compatible toner options.',
              },
              {
                q: 'How do I order?',
                a: 'Message us on WhatsApp with your printer model and we confirm availability.',
              },
            ].map((item) => (
              <details key={item.q} className="faq-item reveal">
                <summary>
                  {item.q}
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="bg-dots fade-center" />
        <div className="cta-content mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="reveal">
            <h3>Need toner? Message us now.</h3>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              WhatsApp ordering is the fastest way to confirm compatibility.
            </p>
          </div>
          <a href="https://wa.me/2482587146" className="btn-primary reveal">
            <MessageCircle className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

function BrandsPage() {
  const brandSections = useMemo(
    () => [
      {
        name: 'HP',
        description: 'We supply toner cartridges suitable for a wide range of HP laser printers.',
      },
      {
        name: 'Canon',
        description: 'Reliable toner options for Canon printers, available for delivery services.',
      },
      {
        name: 'Epson',
        description: 'Selected toner cartridges available for Epson printers, with compatibility checks.',
      },
    ],
    []
  )

  return (
    <div>
      <section className="page-hero">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Toner Brands</p>
            <h1 className="section-title">Toner Brands We Supply</h1>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              SeyKelz supplies compatible and genuine toner cartridges for popular printer brands used in homes and businesses across Seychelles.
            </p>
          </div>
          <div className="search-bar reveal">
            <Search className="h-4 w-4 text-[color:var(--color-muted)]" />
            <input placeholder="Search HP, Canon, Epson" type="text" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="accordion">
            {brandSections.map((brand) => (
              <details key={brand.name} className="accordion-item reveal">
                <summary>
                  <div>
                    <h3>{brand.name} Toner Cartridges</h3>
                    <p>{brand.description}</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="accordion-body">
                  <p className="text-sm text-[color:var(--color-muted)]">What to send us:</p>
                  <ul>
                    <li>Printer model</li>
                    <li>Old cartridge code (if available)</li>
                  </ul>
                  <a href="https://wa.me/2482587146" className="btn-primary">
                    Order this brand on WhatsApp
                  </a>
                </div>
              </details>
            ))}
          </div>
          <div className="helper-card reveal">
            <div>
              <h3>Not sure?</h3>
              <p>Send us a photo of your cartridge label on WhatsApp.</p>
            </div>
            <a href="https://wa.me/2482587146" className="btn-secondary">
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const modelRef = useRef(null)
  const messageRef = useRef(null)

  const handleMailto = (event) => {
    event.preventDefault()
    const lines = [
      `Name: ${nameRef.current?.value || ''}`,
      `Phone: ${phoneRef.current?.value || ''}`,
      `Printer Model: ${modelRef.current?.value || ''}`,
      `Message: ${messageRef.current?.value || ''}`,
    ]
    const body = encodeURIComponent(lines.join('\n'))
    const subject = encodeURIComponent('New Enquiry')
    window.location.href = `mailto:seykelz@yahoo.com?subject=${subject}&body=${body}`
  }

  return (
    <div>
      <section className="page-hero">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Contact</p>
            <h1 className="section-title">Contact SeyKelz</h1>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              WhatsApp ordering is the fastest way to confirm compatibility and availability.
            </p>
            <a href="https://wa.me/2482587146" className="btn-primary mt-6">
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="contact-grid">
            <div className="contact-card reveal">
              <div>
                <p className="eyebrow">Contact Information</p>
              <p className="mt-3 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+2482587146">{contactInfo.phone}</a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a href="https://wa.me/2482587146">{contactInfo.whatsapp}</a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:seykelz@yahoo.com">{contactInfo.email}</a>
              </p>
              </div>
              <div>
                <p className="eyebrow">Location</p>
                <p className="mt-3">{contactInfo.location}</p>
                <p>{contactInfo.coverage}</p>
              </div>
              <div>
                <p className="eyebrow">Operating Hours</p>
                <ul className="mt-3 space-y-1">
                  {hours.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
            <form className="form-card reveal" onSubmit={handleMailto}>
              <input ref={nameRef} placeholder="Name" type="text" required />
              <input ref={phoneRef} placeholder="Phone" type="tel" required />
              <input ref={modelRef} placeholder="Printer Model (optional)" type="text" />
              <textarea ref={messageRef} placeholder="Message" rows="5" required />
              <button className="btn-primary" type="submit">
                Send Enquiry
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
    <footer className="site-footer">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{brandName}</p>
          <p className="mt-2 text-sm text-white/70">{tagline}</p>
        </div>
        <div className="text-sm">
          <p className="footer-title">Contact</p>
          <p className="mt-2">
            Phone: <a href="tel:+2482587146">{contactInfo.phone}</a>
          </p>
          <p>
            WhatsApp: <a href="https://wa.me/2482587146">{contactInfo.whatsapp}</a>
          </p>
          <p>
            Email: <a href="mailto:seykelz@yahoo.com">{contactInfo.email}</a>
          </p>
        </div>
        <div className="text-sm">
          <p className="footer-title">Details</p>
          <p className="mt-2">{contactInfo.location}</p>
          <p>{contactInfo.coverage}</p>
          <p className="mt-3">{hours[0]}</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-10">
        <p className="footer-credit text-sm text-white/60">
          Designed and built by{' '}
          <a href="https://horizondigitalsey.com">Horizon Digital</a> — Web Design in Seychelles. Contact:{' '}
          <a href="mailto:horizondigital.sey@gmail.com">horizondigital.sey@gmail.com</a> |{' '}
          <a href="tel:+2482604525">+248 2604525</a> |{' '}
          <a href="https://wa.me/2482604525">
            Lets Chat on <span className="footer-whatsapp">Whatsapp</span>
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default App
