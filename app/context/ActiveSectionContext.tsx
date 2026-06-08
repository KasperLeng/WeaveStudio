"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type IndicatorStyle = {
  left: number;
  width: number;
  top: number;
  height: number;
  opacity: number;
};

type ActiveSectionContextValue = {
  activeSection: string;
  scrollToSection: (section: string) => void;
  indicatorStyle: IndicatorStyle;
  registerNav: (element: HTMLElement | null) => void;
  registerNavButton: (section: string, element: HTMLButtonElement | null) => void;
};

const defaultIndicatorStyle: IndicatorStyle = {
  left: 0,
  width: 0,
  top: 0,
  height: 0,
  opacity: 0,
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeSection: "",
  scrollToSection: () => { },
  indicatorStyle: defaultIndicatorStyle,
  registerNav: () => { },
  registerNavButton: () => { },
});

function getActiveSectionFromScroll(sections: Element[]): string {
  if (window.scrollY < 80) return "home";

  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  if (scrollBottom >= docHeight - 80) {
    const last = sections[sections.length - 1];
    return last?.getAttribute("data-nav-section") ?? "contact";
  }

  let bestId = "home";
  let bestRatio = 0;

  sections.forEach((el) => {
    const id = el.getAttribute("data-nav-section");
    if (!id) return;

    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(window.innerHeight, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const ratio = visibleHeight / rect.height;

    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestId = id;
    }
  });

  return bestId;
}

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState(defaultIndicatorStyle);
  const navRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const scrollToSection = useCallback((section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const registerNav = useCallback((element: HTMLElement | null) => {
    navRef.current = element;
  }, []);

  const registerNavButton = useCallback(
    (section: string, element: HTMLButtonElement | null) => {
      buttonRefs.current[section] = element;
    },
    [],
  );

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("[data-nav-section]"),
    );

    const syncFromScroll = () => {
      setActiveSection(getActiveSectionFromScroll(sections));
    };

    const observer = new IntersectionObserver(() => syncFromScroll(), {
      threshold: [0, 0.1, 0.25, 0.4, 0.5, 0.75, 1],
    });

    sections.forEach((section) => observer.observe(section));

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const activeBtn = buttonRefs.current[activeSection];
      if (!nav || !activeBtn) return;

      const navRect = nav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
        top: btnRect.top - navRect.top,
        height: btnRect.height,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        scrollToSection,
        indicatorStyle,
        registerNav,
        registerNavButton,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
