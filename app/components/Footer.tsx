import Link from "next/link";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-midnight py-8">
      <div className="mx-auto max-w-[1120px] px-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-[16px] font-medium text-white">Weave Studio.</p>
            <p className="mt-1 text-[13px] text-[#85B7EB]">Vancouver, BC</p>
          </div>
          <nav
            className="flex flex-wrap gap-6"
            aria-label="Footer"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#85B7EB] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 border-t border-white/10 pt-4 text-center text-[12px] text-white/40">
          © 2025 Weave Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
