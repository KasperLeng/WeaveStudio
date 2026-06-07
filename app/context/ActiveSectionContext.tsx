"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ActiveSectionContextValue = {
  activeSection: string;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeSection: "",
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-nav-section]");
    let currentSection = "";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-nav-section");
          if (id && id !== currentSection) {
            currentSection = id;
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((section) => observer.observe(section));

    const visible = Array.from(sections).find((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.25;
    });
    if (visible) {
      const id = visible.getAttribute("data-nav-section");
      if (id) setActiveSection(id);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ activeSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
