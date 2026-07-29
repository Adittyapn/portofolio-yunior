"use client";

import Aurora from "@/components/Aurora";

export function BackgroundAurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden">
      <div className="absolute inset-0 opacity-55">
        <Aurora colorStops={["#29BFEA", "#FF5D9E", "#8C7DFF"]} amplitude={0.9} blend={0.7} />
      </div>
      <div className="portfolio-dots absolute inset-0 opacity-35" />
    </div>
  );
}
