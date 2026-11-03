import { ConsultationButton } from "@/components/ConsultationModal";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  Calendar,
  Check,
  Droplet,
  House,
  ShieldCheck,
  Thermometer,
} from "@/components/icons";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1665019251577-a4b38ad04767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1800";

const services = [
  {
    number: "01",
    title: "Interior & Exterior",
    copy: "A thorough room-by-room and perimeter check, looking for anything out of place.",
    icon: <House />,
  },
  {
    number: "02",
    title: "Systems & Utilities",
    copy: "Visual checks of plumbing, electrical, HVAC, appliances, and water systems.",
    icon: <Droplet />,
  },
];

const checks = [
  "Doors, windows & security",
  "Leaks & water damage",
  "HVAC & temperature",
  "Pests & visible concerns",
  "Pool & outdoor areas",
  "Vehicles & key systems",
];

export default function HomePage() {
  return (
    <main id="top">
      <Header />

      <section className="hero">
        {/* Native img matches the source layout: full-bleed cover photo. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="A peaceful lake house overlooking the water"
          className="hero-image"
          src={HERO_IMAGE}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light">Your home, cared for</p>
          <h1>
            Peace of mind,
            <br />
            wherever you are.
          </h1>
          <p className="hero-copy">
            Professional home watch and concierge care for primary residences and second homes
            across Southern Maine, the Southern New Hampshire Seacoast, and the lake regions of
            Southern Maine and New Hampshire.
          </p>
          <div className="hero-actions">
            <ConsultationButton className="button button-primary">
              Schedule a consultation <ArrowRight />
            </ConsultationButton>
            <a className="text-link light-link" href="#services">
              Explore our services
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span>
            <ShieldCheck />
          </span>
          <p>
            <strong>Trusted local care</strong>
            Detailed reports after every visit
          </p>
        </div>
      </section>

      <section className="intro" id="about">
        <div>
          <p className="eyebrow">A watchful eye. A caring hand.</p>
          <h2>Your home deserves more than a drive-by.</h2>
        </div>
        <div className="intro-copy">
          <p>
            An unoccupied home can face small issues that quickly become costly problems. New
            England Haven provides thoughtful, consistent oversight—so your property feels cared
            for even when you&apos;re miles away.
          </p>
          <div className="trust-line">
            <span>
              <ShieldCheck />
            </span>
            <p>
              <strong>Insured &amp; accredited</strong>
              Home Watch Professionals
            </p>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we watch over</p>
            <h2>Care that covers every corner.</h2>
          </div>
          <p>
            From the front gate to the back patio, each visit is thorough, documented, and tailored
            to your home.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-top">
                <span className="icon-tile">{service.icon}</span>
                <span className="service-number">{service.number}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#contact" aria-label={`Learn more about ${service.title}`}>
                Learn more <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="process" id="how-it-works">
        <div className="process-copy">
          <p className="eyebrow light">Simple by design</p>
          <h2>How New England Haven works.</h2>
          <p className="process-intro">
            Reliable home care shouldn&apos;t add to your to-do list. We make it personal,
            transparent, and easy.
          </p>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <div>
                <h3>We get to know your home</h3>
                <p>
                  Every property is different. We walk through yours together and create a watch
                  plan around what matters most.
                </p>
              </div>
            </div>
            <div className="step">
              <span>2</span>
              <div>
                <h3>We check while you&apos;re away</h3>
                <p>
                  Your dedicated home watch professional visits on schedule and completes a
                  detailed, multi-point inspection.
                </p>
              </div>
            </div>
            <div className="step">
              <span>3</span>
              <div>
                <h3>You stay in the know</h3>
                <p>
                  A timestamped digital report with photos arrives after every visit, so you&apos;re
                  never left wondering.
                </p>
              </div>
            </div>
          </div>
        </div>
        <aside className="report-card">
          <div className="report-header">
            <span className="report-icon">
              <Calendar />
            </span>
            <div>
              <small>VISIT REPORT</small>
              <strong>May 24, 2025</strong>
            </div>
            <span className="status">
              <i /> All clear
            </span>
          </div>
          <div className="report-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Well cared for house exterior" src={HERO_IMAGE} />
            <span>
              <Check size={15} /> Visit complete
            </span>
          </div>
          <div className="report-checks">
            {checks.map((item) => (
              <p key={item}>
                <span>
                  <Check />
                </span>
                {item}
              </p>
            ))}
          </div>
          <div className="report-footer">
            <span>
              <Thermometer /> Interior 74°
            </span>
            <span>
              <Droplet size={19} /> Humidity 46%
            </span>
          </div>
        </aside>
      </section>

      <section className="testimonial">
        <House size={29} />
        <blockquote>
          “We keep a thoughtful eye on your home while you&apos;re away—providing trusted local
          care, detailed updates, and the peace of mind to fully enjoy your time elsewhere.”
        </blockquote>
        <div className="person">
          <span>NEH</span>
          <p>
            <strong>The New England Haven promise</strong>
            Your home, cared for
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div>
          <p className="eyebrow">Let&apos;s look after your home</p>
          <h2>Come home to everything just as you left it.</h2>
        </div>
        <div className="contact-action">
          <p>Tell us about your property and we&apos;ll create a care plan that fits.</p>
          <ConsultationButton className="button button-dark">
            Schedule a consultation <ArrowRight />
          </ConsultationButton>
          <small>No obligation. Just a thoughtful conversation.</small>
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div>
            <Logo light />
            <p>Thoughtful home watch and concierge care for the places that matter most.</p>
          </div>
          <div className="footer-links">
            <p>
              <strong>Explore</strong>
              <a href="#services">Services</a>
              <a href="#how-it-works">How it works</a>
              <a href="#about">About New England Haven</a>
            </p>
            <p>
              <strong>Get in touch</strong>
              <a href="mailto:hello@newenglandhavenhomewatch.com">
                hello@newenglandhavenhomewatch.com
              </a>
              <a href="tel:+15550142836">(555) 014-2836</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 New England Haven. All rights reserved.</span>
          <span>Privacy &nbsp;&nbsp; Terms</span>
        </div>
      </footer>
    </main>
  );
}
