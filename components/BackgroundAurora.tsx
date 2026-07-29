"use client";

import Aurora from "@/components/Aurora";

export function BackgroundAurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-full opacity-60">
      <Aurora colorStops={["#6C4CF1", "#9B7BFF", "#111111"]} amplitude={0.9} blend={0.5} />
    </div>
  );
}
