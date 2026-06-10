"use client";

import { useActiveSection } from "../context/ActiveSectionContext";

export default function Hero() {
  const { scrollToSection } = useActiveSection();

  return (
    <section
      id="home"
      data-nav-section="home"
      className="page-section hero-section font-display tracking-wide text-black"
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1120px] px-10">
        <p className="mb-3 text-xl font-medium text-midnight">
          vancouver web design studio
        </p>
        <h1 className="text-7xl">
          Weaving ideas into
        </h1>
        <h1 className="text-7xl">
          digital eXperienceS
        </h1>
        <div className="mt-3 flex w-fit -translate-x-1 gap-3 text-base">
          <button
            type="button"
            onClick={() => scrollToSection("work")}
            className="rounded-full bg-white/30 shadow-sm px-4 py-1.5 transition-colors hover:bg-black/90 hover:text-white"
          >
            view our work
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="rounded-full bg-white/30 shadow-sm px-4 py-1.5 transition-colors hover:bg-black/90 hover:text-white"
          >
            get in touch
          </button>
        </div>
      </div>
    </section>
  );
}
