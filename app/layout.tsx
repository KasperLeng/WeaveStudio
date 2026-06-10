import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./components/AppShell";
import { dirtyline, ubuntu } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Weave Studio — Web Design Studio · Vancouver",
  description:
    "From concept to launch, we build custom websites tailored to your brand — not templates, not shortcuts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${dirtyline.variable} font-sans`}
    >
      <body className="text-black antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
