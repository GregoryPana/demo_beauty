import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import {
  CheckCircle2,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Truck,
  X,
} from 'lucide-react'
import blushModelImage from '../images/blush model.png'
import blushImage from '../images/blush.png'
import eyelinerImage from '../images/eyeliner.png'
import foundationImage from '../images/foundation.png'
import setImage from '../images/set.png'
import setTwoImage from '../images/set 2.png'

const imageAssets = {
  heroModel: blushModelImage,
  texture: blushImage,
  eyeliner: eyelinerImage,
  foundation: foundationImage,
  setOne: setImage,
  setTwo: setTwoImage,
}

const brandName = 'Glow Beauty Supplies'
const tagline = 'Warm beauty and wellness experiences in Seychelles'
const siteUrl = 'https://glowbeauty.sc'

const contactInfo = {
  phone: '+248 2522200',
  whatsapp: '+248 2522200',
  email: 'hello@glowbeauty.sc',
  location: 'Victoria, Seychelles',
  coverage: 'Islandwide support with pickup and scheduled delivery',
}

const hours = ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 8:00 AM - 1:00 PM', 'Sunday: Closed']

function App() {
  const location = useLocation()
  const [navCompact, setNavCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const observerRef = useRef(null)
  const scrollRafRef = useRef(null)

  const seoConfig = useMemo(
    () => ({
      '/': {
        title: 'Glow Beauty Supplies | Premium Beauty Stock in Seychelles',
        description:
          'Explore premium beauty products, skin essentials, and customer-favorite looks with Glow Beauty Supplies in Seychelles.',
        canonical: `${siteUrl}/`,
        ogImage: `${siteUrl}${imageAssets.heroModel}`,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: brandName,
            url: siteUrl,
            logo: `${siteUrl}${imageAssets.foundation}`,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            sameAs: [],
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
      '/product-categories': {
        title: 'Beauty Product Categories | Glow Beauty Supplies',
        description:
          'Explore premium makeup and skincare categories with product matching support for Seychelles shoppers.',
        canonical: `${siteUrl}/product-categories`,
        ogImage: `${siteUrl}${imageAssets.setOne}`,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Beauty and wellness support',
            description: 'Calm beauty service guidance and product shade matching support for retail customers.',
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
        title: 'Contact Glow Beauty Supplies | Seychelles',
        description:
          'Contact Glow Beauty Supplies for product availability and shade matching support in Seychelles.',
        canonical: `${siteUrl}/contact`,
        ogImage: `${siteUrl}${imageAssets.setTwo}`,
        schema: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: brandName,
            url: siteUrl,
            logo: `${siteUrl}${imageAssets.foundation}`,
            email: contactInfo.email,
            telephone: contactInfo.phone,
            sameAs: [],
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
        setNavCompact(window.scrollY > 10)
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
      { threshold: 0.16 }
    )
    elements.forEach((el) => observer.observe(el))
    observerRef.current = observer
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <div className="site-root">
      <div className="ambient-layer" />
      <SiteHeader navCompact={navCompact} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-categories" element={<CategoriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ navCompact, menuOpen, setMenuOpen }) {
  const linkClass = ({ isActive }) => `main-nav-link ${isActive ? 'main-nav-link-active' : ''}`

  return (
    <header className={`site-header ${navCompact ? 'site-header-compact' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="brand-wrap" aria-label="Glow Beauty Supplies home">
          <div className="brand-mark">GB</div>
          <div>
            <p className="brand-name">{brandName}</p>
            <p className="brand-tag">Beauty and wellness</p>
          </div>
        </Link>

        <nav className="desktop-nav" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/product-categories" className={linkClass}>
            Category
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="header-actions">
          <button className="icon-button hidden-phone" type="button" aria-label="Call Glow Beauty Supplies">
            <Phone className="h-4 w-4" />
          </button>
          <button className="appointment-btn" type="button">
            Appointment
          </button>
          <button
            className="icon-button menu-btn"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/product-categories" className={linkClass}>
            Category
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <button className="appointment-btn mobile-appointment" type="button">
            Message on WhatsApp
          </button>
        </div>
      )}
    </header>
  )
}

function HomePage() {
  const serviceItems = ['Facials', 'Pedicure', 'Face Cleaner', 'Manicure']
  const launchTags = ['Foundation', 'Blush', 'Lipstick', 'Eyeliner']
  const catalogueItems = [
    { name: 'Foundation', note: '20 shades', image: imageAssets.foundation },
    { name: 'Blush', note: '15 shades', image: imageAssets.texture },
    { name: 'Eyeliner', note: '12 shades', image: imageAssets.eyeliner },
  ]

  return (
    <div className="page-wrap page-wrap-home">
      <section className="beauty-magazine reveal">
        <div className="mag-left">
          <article className="hero-slate">
            <img className="hero-slate-image" src={imageAssets.heroModel} alt="Serene beauty portrait" />
            <div className="hero-slate-tone" aria-hidden="true" />
            <div className="hero-slate-copy">
            <div className="mini-tab-row">
              <span className="mini-tab mini-tab-active">Home</span>
              <span className="mini-tab">Services</span>
              <span className="mini-tab">Products</span>
            </div>
              <h1>Transform Your Look with Luxury Beauty Care</h1>
              <p>Calm rituals. Shade-perfect beauty.</p>
            <div className="hero-chip-row hero-chip-row-soft">
              <span className="hero-pill">Pedicure</span>
              <span className="hero-pill">Manicure</span>
              <span className="hero-pill">Facial Treatment</span>
              <span className="hero-pill">Aromatherapy</span>
            </div>
              <div className="hero-mini-cards">
                <div className="hero-mini-card">
                  <img src={imageAssets.foundation} alt="Facial care" />
                  <p>Facial Care</p>
                </div>
                <div className="hero-mini-card">
                  <img src={imageAssets.setTwo} alt="Hand care" />
                  <p>Hand Care</p>
                </div>
              </div>
            </div>
          </article>

          <section className="start-here-block">
            <div className="start-here-head">
              <h2>Your Beauty And Success Start Here</h2>
              <button type="button" className="circle-cta">About us</button>
            </div>
            <div className="start-here-grid">
              <article className="start-card">
                <img src={imageAssets.setTwo} alt="Beauty look" />
                <p>Revitalize your skin and spirit</p>
              </article>
              <article className="start-card">
                <img src={imageAssets.texture} alt="Blush texture" />
                <p>Soft tones. Radiant finish.</p>
              </article>
              <article className="start-card">
                <img src={imageAssets.setOne} alt="Beauty studio" />
                <p>Discover your beauty potential</p>
              </article>
            </div>
          </section>
        </div>

        <div className="mag-right">
          <article className="panel-card services-panel">
            <p className="panel-title">Service We Provide</p>
            <ul className="service-list">
              {serviceItems.map((service) => (
                <li key={service}>
                  <span>{service}</span>
                  <span className="arrow-pill">+</span>
                </li>
              ))}
            </ul>
            <img className="service-thumb" src={imageAssets.setOne} alt="Service preview" />
          </article>

          <article className="panel-card launch-panel">
            <div className="launch-top">
              <div>
                <p className="panel-title">Latest Product Launch</p>
                <h3>Available Now</h3>
              </div>
              <div className="tag-row">
                {launchTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="launch-body">
              <div className="launch-ring">
                <img src={imageAssets.foundation} alt="Featured beauty product" />
              </div>
              <div>
                <p className="launch-name">Velvet Skin Collection</p>
                <p className="launch-sub">20 foundation shades, 15 blush shades, 24 lipstick shades, 12 eyeliner shades, and 10 primer shades.</p>
                <button type="button" className="mini-action">Discover range</button>
              </div>
            </div>
          </article>

          <article className="panel-card exclusive-panel">
            <div className="panel-heading-row">
              <div>
                <p className="panel-title">Exclusive Beauty</p>
                <h3>Transformation Awaits</h3>
              </div>
              <button type="button" className="line-link">More services</button>
            </div>
            <div className="portrait-row">
              <img src={imageAssets.heroModel} alt="Holistic beauty approach" />
              <img src={imageAssets.setTwo} alt="Makeup portrait" />
              <img src={imageAssets.eyeliner} alt="Eye definition look" />
            </div>
          </article>

          <article className="panel-card catalogue-panel">
            <div className="panel-heading-row">
              <div>
                <p className="panel-title">Your Beauty Catalogue</p>
                <h3>20+ shade options</h3>
              </div>
            </div>
            <div className="catalog-grid">
              {catalogueItems.map((item) => (
                <article className="catalog-item" key={item.name}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <span>{item.note}</span>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="duo-section reveal">
        <article className="duo-card">
          <p className="eyebrow">Wellness Services</p>
          <h3>Relax. Reset. Glow.</h3>
          <ul>
            <li>Pedicure and manicure</li>
            <li>Facial treatment</li>
            <li>Foot and body massage</li>
            <li>Aromatherapy</li>
          </ul>
        </article>
        <article className="duo-card">
          <p className="eyebrow">Beauty Products</p>
          <h3>20 foundation shades. 15 blush shades.</h3>
          <div className="duo-badges">
            <span>Foundation - 20 shades</span>
            <span>Blush - 15 shades</span>
            <span>Lipstick - 24 shades</span>
            <span>Eyeliner - 12 shades</span>
            <span>Primer - 10 shades</span>
          </div>
        </article>
      </section>

      <section className="process-block reveal">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2>A calm beauty journey in three simple steps</h2>
        </div>
        <div className="process-grid">
          {[
            {
              title: 'Share your look or treatment preference',
              text: 'Tell us the service you want or the product shade you are looking for.',
              icon: <MessageCircle className="h-4 w-4" />,
            },
            {
              title: 'Receive gentle recommendations',
              text: 'We guide you through services, formulas, and shade families that suit your features.',
              icon: <CheckCircle2 className="h-4 w-4" />,
            },
            {
              title: 'Enjoy your beauty moment',
              text: 'Book your service or choose your products and enjoy a smooth, unhurried experience.',
              icon: <Truck className="h-4 w-4" />,
            },
          ].map((step, index) => (
            <article key={step.title} className="process-card">
              <span className="step-index">0{index + 1}</span>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="category-teaser reveal">
        <p className="eyebrow">Explore more</p>
        <h3>Visit Categories for full service details, shade counts, and featured brands.</h3>
        <Link to="/product-categories" className="appointment-btn">
          Explore categories
        </Link>
      </section>

      <section className="cta-banner reveal">
        <div>
          <p className="eyebrow">Ready to explore</p>
          <h3>Step into a warm beauty and wellness experience</h3>
          <p>Take your time, explore tones calmly, and discover treatments designed to make you feel your best.</p>
        </div>
        <button type="button" className="appointment-btn">
          <Send className="h-4 w-4" />
          Start your beauty journey
        </button>
      </section>
    </div>
  )
}

function CategoriesPage() {
  const serviceCategories = [
    {
      name: 'Beauty and Wellness Services',
      detail: 'Pedicure, manicure, facial treatment, foot massage, body massage, and aromatherapy in a calm setting.',
      examples: ['Preferred service', 'Preferred time'],
    },
  ]

  const productCategories = [
    {
      name: 'Complexion and Base',
      detail: 'Foundation and primer collections in warm, neutral, and cool undertones with full shade depth.',
      examples: ['Fenty Pro Filt\'r Foundation', 'Dior Forever Foundation', 'MAC Studio Fix Fluid', 'Chanel Les Beiges Primer'],
    },
    {
      name: 'Lip and Color',
      detail: 'Lipstick and blush options with soft everyday tones and richer evening tones.',
      examples: ['MAC Matte Lipstick', 'Dior Addict Lip Glow', 'Chanel Lip Colour', 'Fenty Cheeks Blush'],
    },
    {
      name: 'Eyes and Definition',
      detail: 'Eyeliner selections for subtle daily definition or bold evening looks, including classic and modern finishes.',
      examples: ['Dior On Stage Eyeliner', 'Chanel Stylo Yeux', 'MAC Liquidlast Liner', 'Fenty Flyliner'],
    },
  ]

  const specialists = [
    { name: 'Ariane', image: imageAssets.heroModel },
    { name: 'Leticia', image: imageAssets.foundation },
    { name: 'Rebecca', image: imageAssets.setTwo },
    { name: 'Tiffany', image: imageAssets.eyeliner },
  ]

  const testimonials = [
    {
      name: 'Clara Becker',
      role: 'Anse Royale Customer',
      quote: 'I found my shade quickly and the quality felt premium. The selection really feels made for us here in Seychelles.',
    },
    {
      name: 'Thalia Carter',
      role: 'Beau Vallon Customer',
      quote: 'The textures are beautiful, and the shade choices feel clear and easy to compare without feeling overwhelming.',
    },
    {
      name: 'Alberta Nels',
      role: 'Victoria Customer',
      quote: 'Everything looks elegant and easy to browse. I always end up spotting at least one product I want to try.',
    },
  ]

  const highlightsRows = [
    { label: 'Signature facial treatment flow', note: 'Gentle cleanse, hydration, and glow finish' },
    { label: 'Pedicure and manicure ritual', note: 'Comfort-focused care with polished finishing' },
    { label: 'Body and foot massage sessions', note: 'Relaxing pressure adapted to your preference' },
    { label: 'Aromatherapy moments', note: 'Calm scent blends for rest and balance' },
    { label: 'Makeup shade guidance', note: 'Foundation, blush, lipstick, eyeliner, and primer' },
  ]

  return (
    <div className="page-wrap page-wrap-categories">
      <section className="subpage-hero reveal">
        <div>
          <p className="eyebrow">Product categories</p>
          <h1>Curated beauty lines for everyday customers</h1>
          <p>
            Explore premium categories with balanced layouts that let you discover products at a comfortable pace.
          </p>
        </div>
        <div className="subpage-hero-card">
          <Sparkles className="h-5 w-5" />
          <p>Need recommendations?</p>
          <span>Tell us what look or finish you love and we suggest matching products for your routine.</span>
          <button type="button" className="mini-action">
            Get curated list
          </button>
        </div>
      </section>

      <section className="category-list reveal">
        {serviceCategories.map((category) => (
          <details key={category.name} className="category-item">
            <summary>
              <div>
                <h3>{category.name}</h3>
                <p>{category.detail}</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </summary>
            <div className="category-body">
              <p>What to share:</p>
              <ul>
                {category.examples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button type="button" className="appointment-btn">
                Explore services
              </button>
            </div>
          </details>
        ))}
      </section>

      <section className="specialist-strip reveal">
        <div>
          <p className="eyebrow">Our specialists</p>
          <h2>Beauty picks inspired by real Seychelles routines</h2>
        </div>
        <div className="specialist-row">
          {specialists.map((specialist) => (
            <article key={specialist.name} className="specialist-card">
              <img src={specialist.image} alt={`${specialist.name} beauty specialist`} />
              <p>{specialist.name}</p>
              <span>Beauty Advisor</span>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-block reveal">
        <div className="section-head">
          <p className="eyebrow">Reviews</p>
          <h2>What retail customers are saying</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p className="testimonial-quote">"{item.quote}"</p>
              <p className="testimonial-name">{item.name}</p>
              <p className="testimonial-role">{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="category-list reveal">
        {productCategories.map((category) => (
          <details key={category.name} className="category-item">
            <summary>
              <div>
                <h3>{category.name}</h3>
                <p>{category.detail}</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </summary>
            <div className="category-body">
              <p>What to send us:</p>
              <ul>
                {category.examples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button type="button" className="appointment-btn">
                View shade counts
              </button>
            </div>
          </details>
        ))}
      </section>

      <section className="pricing-block reveal">
        <article className="pricing-media">
          <img src={imageAssets.setOne} alt="Beauty treatment showcase" />
        </article>
        <article className="pricing-table-card">
          <p className="eyebrow">Experience highlights</p>
          <h3>What you can explore in-store</h3>
          <ul>
            {highlightsRows.map((row) => (
              <li key={row.label}>
                <span>{row.label}</span>
                <strong>{row.note}</strong>
              </li>
            ))}
          </ul>
          <button type="button" className="appointment-btn">
            View full experience menu
          </button>
        </article>
      </section>
    </div>
  )
}

function ContactPage() {
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const productRef = useRef(null)
  const messageRef = useRef(null)

  const handleMockSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form && typeof form.reset === 'function') form.reset()
  }

  return (
    <div className="page-wrap page-wrap-contact">
      <section className="subpage-hero reveal">
        <div>
          <p className="eyebrow">Contact us</p>
          <h1>Speak with our beauty support team</h1>
          <p>Use this mock contact page to preview a warm and inviting enquiry flow for beauty and wellness clients.</p>
          <button type="button" className="appointment-btn">
            <MessageCircle className="h-4 w-4" />
            Open enquiry flow
          </button>
        </div>
        <img src={imageAssets.heroModel} alt="Contact Glow Beauty Supplies" className="subpage-image" />
      </section>

      <section className="contact-layout reveal">
        <article className="contact-info-card">
          <div>
            <p className="eyebrow">Contact information</p>
            <p className="icon-line">
              <Phone className="h-4 w-4" />
              <span>{contactInfo.phone}</span>
            </p>
            <p className="icon-line">
              <MessageCircle className="h-4 w-4" />
              <span>{contactInfo.whatsapp}</span>
            </p>
            <p className="icon-line">
              <Mail className="h-4 w-4" />
              <span>{contactInfo.email}</span>
            </p>
          </div>

          <div>
            <p className="eyebrow">Location</p>
            <p>{contactInfo.location}</p>
            <p>{contactInfo.coverage}</p>
          </div>

          <div>
            <p className="eyebrow">Hours</p>
            <ul className="hours-list">
              {hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </article>

        <form className="contact-form-card" onSubmit={handleMockSubmit}>
          <input ref={nameRef} placeholder="Name" type="text" required />
          <input ref={phoneRef} placeholder="Phone" type="tel" required />
          <input ref={productRef} placeholder="Product or shade (optional)" type="text" />
          <textarea ref={messageRef} rows="5" placeholder="Tell us what you need" required />
          <button className="appointment-btn" type="submit">
            Submit mock enquiry
          </button>
        </form>
      </section>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="brand-name">{brandName}</p>
          <p className="footer-muted">{tagline}</p>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <p>Phone: {contactInfo.phone}</p>
          <p>WhatsApp: {contactInfo.whatsapp}</p>
          <p>Email: {contactInfo.email}</p>
        </div>
        <div>
          <p className="footer-title">Details</p>
          <p>{contactInfo.location}</p>
          <p>{contactInfo.coverage}</p>
          <p>{hours[0]}</p>
        </div>
      </div>
      <div className="footer-credit-wrap">
        <p className="footer-credit">
          Designed by Horizon Digital - Web Design in Seychelles.
        </p>
      </div>
    </footer>
  )
}

export default App
