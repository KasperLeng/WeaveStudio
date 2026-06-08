import type { Metadata } from "next";
import "./globals.css";
import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
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
        <Background />
        <ActiveSectionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
