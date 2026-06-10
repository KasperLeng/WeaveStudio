"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ActiveSectionProvider } from "../context/ActiveSectionContext";
import Background from "./Background";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";

const MIN_LOAD_MS = 700;
const MAX_LOAD_MS = 5000;

export default function AppShell({ children }: { children: ReactNode }) {
  const [bgReady, setBgReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_LOAD_MS);
    const maxTimer = setTimeout(() => setBgReady(true), MAX_LOAD_MS);
    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  const handleBgReady = useCallback(() => setBgReady(true), []);
  const showLoader = !(bgReady && minTimeElapsed);

  return (
    <>
      <Background onReady={handleBgReady} />
      <LoadingScreen visible={showLoader} />
      <ActiveSectionProvider>
        <Navbar />
        <main>{children}</main>
      </ActiveSectionProvider>
    </>
  );
}
