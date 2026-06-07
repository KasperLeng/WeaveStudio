import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    title: "Business Presentation",
    body: "Pitch decks, proposal sites, and one-pagers that make your brand impossible to ignore.",
    tags: ["Pitch Sites", "One-Pagers", "Brand Decks"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" />
        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
      </svg>
    ),
    title: "Web Storefront",
    body: "E-commerce and product sites designed to convert — fast, clean, and built to scale.",
    tags: ["E-Commerce", "Product Pages", "Checkout Flow"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-1a8 8 0 0 1 16 0v1" />
      </svg>
    ),
    title: "Personal Websites",
    body: "Portfolios and personal brands that actually represent who you are.",
    tags: ["Portfolios", "Resumes", "Personal Brand"],
  },
];

const pricingRows = [
  {
    label: "All-Inclusive Flat Rate",
    detail: "One price, zero surprises. Covers design, development, and launch.",
  },
  {
    label: "Full-Service Retainer",
    detail: "Ongoing support, updates, and new features — we become your web team.",
  },
  {
    label: "Your Idea, Our Build",
    detail: "Bring a concept or mood board. We'll quote it, shape it, and ship it.",
  },
  {
    label: "Work With Us",
    detail: "Agencies and studios — we take on white-label builds and overflow work.",
  },
];

export default function Services() {
  return (
    <section id="services" data-nav-section="services" className="bg-bg py-20">
      <div className="mx-auto max-w-[1120px] px-10">
        <header className="mb-10">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-clarity">
            What We Offer
          </p>
          <h2 className="text-[32px] font-medium leading-[1.2] tracking-[-0.01em] text-midnight">
            Built for your business.
          </h2>
          <p className="mt-4 max-w-[560px] text-[16px] text-slate">
            Every project is different. We offer three core service types — pick what fits,
            or bring your own idea and we&apos;ll shape it together.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[55%_45%]">
          <div className="flex flex-col gap-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="rounded-[12px] border border-mist bg-white px-6 shadow-[0_1px_4px_rgba(24,95,165,0.06)]">
            {pricingRows.map((row) => (
              <div
                key={row.label}
                className="border-b border-mist py-5 last:border-none"
              >
                <p className="mb-1 text-[15px] font-medium text-midnight">{row.label}</p>
                <p className="text-[13px] leading-[1.6] text-slate">{row.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
