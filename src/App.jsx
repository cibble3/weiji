// One-Page Weiji Landing (React + Tailwind)
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

// ── CONFIG: Edit these to brand your page ──────────────────────────────────────
const CONFIG = {
  name: "危机",
  ticker: "$WEIJI",
  // Cleaner, higher-status, less explanatory:
  tagline: "Opportunity in crisis.",
  contract: "0xe71bab6f1a82e04bd893223b482edc3be7564444",
  symbolImage: null, // Using glyph instead
  glyph: "危机",
};

export default function App() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const chars = (CONFIG.glyph || "").split("");

  // Subtle dual-tone: top slightly cooler, bottom slightly warmer (very subtle)
  const glyphColor = (index) => {
    if (chars.length < 2) return "#F2E8C6";
    if (index === 0) return "rgba(242,232,198,0.95)"; // slightly cooler/neutral
    return "rgba(242,232,198,0.95)"; // keep subtle + consistent (can warm later if you want)
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Optional gradient glow: pale center fading to black */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_45%,rgba(242,232,198,0.07),transparent_70%)]" />

      {/* Content card */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16">
        <section className="rounded-3xl border border-[#F2E8C6]/15 bg-black/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] p-10 flex flex-col items-center gap-8">
          {/* Symbol */}
          <div className="aspect-square w-48 sm:w-56 md:w-64 grid place-items-center rounded-full bg-black/30 border border-[#F2E8C6]/10 shadow-inner">
            {CONFIG.symbolImage ? (
              <img
                src={CONFIG.symbolImage}
                alt={`${CONFIG.name} symbol`}
                className="w-3/4 h-3/4 object-contain"
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center select-none animate-fade-in"
                style={{
                  fontFamily: "'Noto Serif SC', 'ZCOOL XiaoWei', 'STSong', serif",
                  // tighter stack so it reads like a single emblem:
                  lineHeight: 0.82,
                }}
                aria-label="token symbol"
                title={CONFIG.name}
              >
                {chars.map((char, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: "6rem",
                      color: glyphColor(index),
                      // a tiny bit of depth without looking “effect-y”
                      textShadow: "0 1px 10px rgba(0,0,0,0.35)",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Name + Ticker + Tagline */}
          <div className="text-center space-y-2">
            {/* Split name & ticker for higher-status layout */}
            <div className="space-y-1">
              <h1
                className="text-3xl sm:text-4xl font-semibold tracking-tight"
                style={{ color: "#F2E8C6" }}
              >
                {CONFIG.name}
              </h1>
              <div
                className="text-sm sm:text-base font-mono tracking-wide"
                style={{ color: "#F2E8C6", opacity: 0.7 }}
              >
                {CONFIG.ticker}
              </div>
            </div>

            <p
              className="text-sm sm:text-base"
              style={{ color: "#F2E8C6", opacity: 0.55 }}
            >
              {CONFIG.tagline}
            </p>
          </div>

          {/* Contract bar */}
          <div className="w-full flex items-center gap-2">
            <div className="flex-1 group relative">
              <input
                readOnly
                value={CONFIG.contract}
                className="w-full truncate rounded-2xl border border-[#F2E8C6]/15 bg-black/40 px-5 py-4 pr-14 font-mono text-sm shadow-inner outline-none focus:ring-2 focus:ring-[#EAB308]/20"
                style={{ color: "#F2E8C6" }}
                aria-label="Contract address"
              />
              <button
                onClick={handleCopy}
                className="absolute right-1.5 top-1.5 h-9 w-9 grid place-items-center rounded-xl bg-black/60 hover:bg-[#EAB308]/15 active:scale-[0.98] transition"
                aria-label="Copy contract address"
                title={copied ? "Copied" : "Copy"}
              >
                {copied ? (
                  <Check className="h-4 w-4" style={{ color: "#10B981" }} />
                ) : (
                  <Copy className="h-4 w-4" style={{ color: "#F2E8C6" }} />
                )}
              </button>
            </div>
          </div>

          {/* Micro-footer */}
          <div
            className="pt-2 text-[11px] text-center"
            style={{ color: "#F2E8C6", opacity: 0.35 }}
          >
            <p>DYOR. This is a memecoin.</p>
          </div>
        </section>

        {/* Bottom status */}
        <div
          className="mt-8 flex items-center justify-center gap-2 text-xs"
          style={{ color: "#F2E8C6", opacity: 0.5 }}
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-[#EAB308]/60 mr-1" />
          Live on BNB • {CONFIG.ticker}
        </div>
      </main>
    </div>
  );
}
