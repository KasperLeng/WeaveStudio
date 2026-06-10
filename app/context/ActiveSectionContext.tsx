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

const SCROLL_SPY_OFFSET = 120;

function getActiveSectionFromScroll(sections: Element[]): string {
  let active = "home";

  for (const el of sections) {
    const id = el.getAttribute("data-nav-section");
    if (!id) continue;
    if (el.getBoundingClientRect().top <= SCROLL_SPY_OFFSET) {
      active = id;
    }
  }

  return active;
}

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("home");
  const [indicatorStyle, setIndicatorStyle] = useState(defaultIndicatorStyle);
  const navRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isScrollingTo = useRef<string | null>(null);

  const scrollToSection = useCallback((section: string) => {
    isScrollingTo.current = section;
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

    let rafId = 0;
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

    const applyActiveSection = () => {
      setActiveSection(getActiveSectionFromScroll(sections));
    };

    const syncFromScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyActiveSection);
    };

    const endProgrammaticScroll = () => {
      if (!isScrollingTo.current) return;
      isScrollingTo.current = null;
      applyActiveSection();
    };

    const onScroll = () => {
      if (isScrollingTo.current) {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(endProgrammaticScroll, 100);
        return;
      }
      syncFromScroll();
    };

    const onScrollEnd = () => {
      clearTimeout(scrollEndTimer);
      endProgrammaticScroll();
    };

    applyActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", syncFromScroll);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
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
