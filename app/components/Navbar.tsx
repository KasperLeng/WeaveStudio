"use client";

import Link from "next/link";
import { useActiveSection } from "../context/ActiveSectionContext";

const navLinks = [
  { label: "index", href: "#home", section: "home" },
  { label: "work", href: "#work", section: "work" },
  { label: "services", href: "#services", section: "services" },
  { label: "contact", href: "#contact", section: "contact" },
];

export default function Navbar() {
  const {
    activeSection,
    scrollToSection,
    indicatorStyle,
    registerNav,
    registerNavButton,
  } = useActiveSection();

  return (
    <header className="sticky top-3 z-50 h-16">
      <div className="mx-auto flex h-full items-center justify-between px-10">
        <Link
          href="#home"
          className="font-display text-2xl font-medium text-black"
          onClick={() => scrollToSection("home")}
        >
          Weave Studio.
        </Link>

        <nav
          ref={registerNav}
          className="relative flex items-center gap-1 rounded-full p-1 backdrop-blur-md"
        >
          <div
            className="pointer-events-none absolute rounded-full bg-white/40 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              top: indicatorStyle.top,
              height: indicatorStyle.height,
              opacity: indicatorStyle.opacity,
            }}
          />

          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <button
                key={link.label}
                ref={(el) => registerNavButton(link.section, el)}
                type="button"
                onClick={() => scrollToSection(link.section)}
                className={`relative z-10 items-center justify-center rounded-full px-4 py-1.5 font-display text-base font-medium transition-colors duration-200 ${
                  isActive ? "text-black" : "text-midnight hover:text-black"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
