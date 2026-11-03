"use client";

import { useState } from "react";
import { ConsultationButton } from "./ConsultationModal";
import { Close, Menu } from "./icons";
import { Logo } from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <Logo />
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <ConsultationButton className="nav-cta" onClick={() => setOpen(false)}>
          Schedule a consultation
        </ConsultationButton>
      </nav>
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <Close /> : <Menu />}
      </button>
    </header>
  );
}
