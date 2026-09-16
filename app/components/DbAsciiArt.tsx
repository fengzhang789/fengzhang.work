"use client";

import { useEffect, useRef } from "react";

// Site palette (kept in sync with the CSS custom properties in globals.css —
// canvas text can't read var() directly).
const SILVER = [221, 229, 239] as const;
const SODIUM = [237, 176, 74] as const;

const CHARS = [".", ".", ".", "·", "·", ":"];

// The database glyph — a stack of four ellipses (cap, two dividers, base)
// joined by straight sides — is drawn once into an offscreen canvas at a
// fixed design resolution, then its stroke is sampled into a sparse point
// cloud. Those points are stored as fractions of that design box so they can
// be re-centred into any real canvas size later without resampling.
const DESIGN_W = 400;
const DESIGN_H = 560;

type Dot = {
  x: number; // 0..1 within the design box
  y: number;
  char: string;
  sizeScale: number;
  delay: number; // ms, stagger within the fade-in/out window
  phase: number; // shimmer phase
  accent: boolean;
};

function buildDots(): Dot[] {
  const off = document.createElement("canvas");
  off.width = DESIGN_W;
  off.height = DESIGN_H;
  const ctx = off.getContext("2d");
  if (!ctx) return [];

  const cx = DESIGN_W / 2;
  const rx = 128;
  const ry = 38;
  const top = 66;
  const bottom = DESIGN_H - 66;
  const tiers = [top, top + (bottom - top) / 3, top + (2 * (bottom - top)) / 3, bottom];

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const y of tiers) {
    ctx.beginPath();
    ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(cx - rx, top);
  ctx.lineTo(cx - rx, bottom);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + rx, top);
  ctx.lineTo(cx + rx, bottom);
  ctx.stroke();

  const { data } = ctx.getImageData(0, 0, DESIGN_W, DESIGN_H);
  const cell = 9;
  const dots: Dot[] = [];
  for (let gy = 0; gy < DESIGN_H; gy += cell) {
    for (let gx = 0; gx < DESIGN_W; gx += cell) {
      let hit = false;
      for (let dy = 0; dy < cell && !hit; dy += 3) {
        for (let dx = 0; dx < cell && !hit; dx += 3) {
          const px = Math.min(DESIGN_W - 1, gx + dx);
          const py = Math.min(DESIGN_H - 1, gy + dy);
          if (data[(py * DESIGN_W + px) * 4 + 3] > 120) hit = true;
        }
      }
      if (!hit) continue;
      const x = (gx + cell / 2 + (Math.random() - 0.5) * cell * 0.7) / DESIGN_W;
      const y = (gy + cell / 2 + (Math.random() - 0.5) * cell * 0.7) / DESIGN_H;
      dots.push({
        x,
        y,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        sizeScale: 0.95 + Math.random() * 0.45,
        delay: y * 1500 + Math.random() * 500,
        phase: Math.random() * Math.PI * 2,
        accent: Math.random() < 0.1,
      });
    }
  }
  return dots;
}

// One shared cycle every loop, in ms.
const FADE_IN_RAMP = 650;
const HOLD_END = 4600;
const FADE_OUT_START = 4600;
const FADE_OUT_RAMP = 650;
const FADE_OUT_WINDOW = 1500;
// Fade-out ends at FADE_OUT_START + FADE_OUT_WINDOW (6100ms); the remainder
// of the cycle is the blank pause before the shape restarts — kept short.
const CYCLE = 6500;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function envelope(localT: number, delay: number) {
  if (localT < HOLD_END) {
    const start = delay;
    if (localT < start) return 0;
    const t = Math.min(1, (localT - start) / FADE_IN_RAMP);
    return easeInOut(t);
  }
  if (localT < FADE_OUT_START + FADE_OUT_WINDOW) {
    const start = FADE_OUT_START + (delay / HOLD_END) * FADE_OUT_WINDOW;
    if (localT < start) return 1;
    const t = Math.min(1, (localT - start) / FADE_OUT_RAMP);
    return 1 - easeInOut(t);
  }
  return 0;
}

export default function DbAsciiArt({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = buildDots();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    let hidden = document.hidden;
    const onVis = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = (localT: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      // Fit the design box (object-contain, centred) into the real canvas.
      const pad = 0.12;
      const boxW = cssW * (1 - pad * 2);
      const boxH = cssH * (1 - pad * 2);
      const fit = Math.min(boxW / DESIGN_W, boxH / DESIGN_H);
      const offX = (cssW - DESIGN_W * fit) / 2;
      const offY = (cssH - DESIGN_H * fit) / 2;
      const baseFont = Math.max(7, 13 * fit);

      for (const dot of dots) {
        let a = reduceMotion ? 1 : envelope(localT, dot.delay);
        if (a <= 0.01) continue;
        if (!reduceMotion && localT >= FADE_IN_RAMP && localT < HOLD_END) {
          a *= 0.9 + 0.1 * Math.sin(localT * 0.0028 + dot.phase);
        }
        const [r, g, b] = dot.accent ? SODIUM : SILVER;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
        ctx.font = `${(baseFont * dot.sizeScale).toFixed(1)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(dot.char, offX + dot.x * DESIGN_W * fit, offY + dot.y * DESIGN_H * fit);
      }
    };

    if (reduceMotion) {
      draw(HOLD_END);
      return () => {
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (visible && !hidden) {
        const localT = (now - start) % CYCLE;
        draw(localT);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="absolute inset-0" role="img" aria-label={label}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
