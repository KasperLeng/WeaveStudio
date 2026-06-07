import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

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
    <html lang="en" className={`${dmSans.variable} font-sans`}>
      <body className="text-midnight bg-bg antialiased">
        <ActiveSectionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
