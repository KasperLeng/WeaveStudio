import Link from "next/link";

export default function Hero() {
  return (
    <section id="top" className="flex min-h-[90vh] items-center bg-bg py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-8 px-10 md:grid-cols-[55%_45%]">
        <div className="relative z-[1]">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-clarity">
            Web Design Studio · Vancouver
          </p>
          <h1 className="text-[36px] font-medium leading-[1.15] tracking-[-0.02em] text-midnight md:text-[52px]">
            We weave ideas into digital experiences.
          </h1>
          <p className="mt-4 max-w-[420px] text-[17px] leading-[1.7] text-slate">
            From concept to launch, we build custom websites tailored to your brand —
            not templates, not shortcuts.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="rounded-[6px] bg-anchor px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-clarity"
            >
              See Our Work
            </Link>
            <Link
              href="#contact"
              className="rounded-[6px] border border-clarity px-6 py-3 text-sm text-anchor transition-colors hover:bg-frost"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div
          className="relative flex items-center justify-center md:static md:opacity-100"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute left-1/2 top-[-32px] z-0 w-full max-w-[380px] -translate-x-1/2 opacity-[0.18] md:pointer-events-auto md:static md:max-w-none md:translate-x-0 md:opacity-100">
            <svg
              className="h-auto w-full max-w-[480px]"
              viewBox="0 0 480 480"
              width="480"
              height="480"
            >
              <rect
                x="60"
                y="80"
                width="200"
                height="120"
                rx="8"
                fill="#E6F1FB"
                opacity="0.35"
              />
              <rect
                x="220"
                y="200"
                width="180"
                height="140"
                rx="8"
                fill="#378ADD"
                opacity="0.22"
              />
              <rect
                x="100"
                y="260"
                width="160"
                height="100"
                rx="8"
                fill="#E6F1FB"
                opacity="0.35"
              />
              <g stroke="#B5D4F4" strokeWidth="1" fill="none">
                <line x1="0" y1="80" x2="480" y2="400" />
                <line x1="0" y1="160" x2="480" y2="480" />
                <line x1="0" y1="240" x2="400" y2="0" />
                <line x1="80" y1="480" x2="480" y2="80" />
                <line x1="0" y1="320" x2="320" y2="0" />
                <line x1="0" y1="0" x2="480" y2="480" />
                <line x1="160" y1="0" x2="480" y2="320" />
                <line x1="240" y1="480" x2="480" y2="240" />
                <line x1="0" y1="400" x2="400" y2="480" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
