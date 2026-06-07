"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useActiveSection } from "../context/ActiveSectionContext";

const navLinks = [
  { label: "Work", href: "#work", section: "work" },
  { label: "Services", href: "#services", section: "services" },
  { label: "About Us", href: "#services", section: "services" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export default function Navbar() {
  const { activeSection } = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-mist bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-10">
        <Link
          href="#top"
          className="text-[18px] font-medium text-midnight"
          onClick={closeMenu}
        >
          Weave Studio.
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-[22px] rounded-sm bg-midnight transition-transform duration-200 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded-sm bg-midnight transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-[22px] rounded-sm bg-midnight transition-transform duration-200 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        <nav
          id="site-nav"
          aria-label="Primary"
          className={`absolute left-0 right-0 top-[60px] flex flex-col border-b border-mist bg-white/98 px-10 py-4 backdrop-blur-sm transition-all duration-200 md:static md:flex-row md:items-center md:gap-6 md:border-none md:bg-transparent md:p-0 md:opacity-100 ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0 md:pointer-events-auto md:translate-y-0"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b border-frost py-3 text-[14px] text-slate transition-colors hover:text-anchor md:border-none md:py-0 ${
                  isActive ? "font-medium text-anchor" : ""
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
