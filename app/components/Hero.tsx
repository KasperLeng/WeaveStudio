"use client";

import { useActiveSection } from "../context/ActiveSectionContext";

export default function Hero() {
  const { scrollToSection } = useActiveSection();

  return (
    <section
      id="home"
      data-nav-section="home"
      className="font-display tracking-wide text-black flex min-h-[calc(100dvh-4rem)] scroll-mt-20 items-center"
    >
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-8 px-10">
        <div className="relative z-[1] mb-20">
          <p className="text-xl font-medium text-midnight mb-3">
            vancouver web design studio
          </p>
          <h1 className="text-7xl">
            Weaving ideas into
          </h1>
          <h1 className="text-7xl">
            digital eXperienceS
          </h1>
          <div className="flex gap-3 text-base w-fit -translate-x-1 mt-3">
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
      </div>
    </section>
  );
}
