"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useEffect, useRef } from "react";

type BackgroundProps = {
  onReady?: () => void;
};

export default function Background({ onReady }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!onReady) return;

    let raf = 0;
    let frames = 0;

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      onReady();
    };

    const poll = () => {
      const canvas = containerRef.current?.querySelector("canvas");

      if (canvas && canvas.width > 0 && canvas.height > 0) {
        frames += 1;
        if (frames >= 2) {
          markReady();
          return;
        }
      }

      raf = requestAnimationFrame(poll);
    };

    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, [onReady]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10" aria-hidden="true">
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1.5}
        pointerEvents="none"
        fov={45}
      >
        <ShaderGradient
          animate="on"
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={3.6}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#a0ffda"
          color2="#94f6fe"
          color3="#7dbef6"
          envPreset="city"
          grain="off"
          lightType="3d"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="plane"
          uAmplitude={1}
          uDensity={1.3}
          uFrequency={5.5}
          uSpeed={0.2}
          uStrength={4}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}