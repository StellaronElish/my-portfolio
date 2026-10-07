"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; d: number; a: number; s: number; t: number; c: string };

const EXTRA_BOTTOM = 80; // langit Hero memanjang 70px di bawah section (lihat CSS), jadi canvas ikut memanjang
const COLORS = ["255,255,255", "255,255,255", "255,255,255", "170,210,255", "215,190,255", "255,232,200"];

/* Catatan: efek parallax saat scroll vertikal sudah dihapus (lebih ringan).
   Yang tersisa: kelap-kelip bintang, parallax horizontal mengikuti mouse, dan meteor sesekali. */
export function StarSky({ density = 1000 }: { density?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const ctx = canvas?.getContext("2d");
    const section = wrap?.parentElement;
    if (!wrap || !canvas || !glow || !ctx || !section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let w = 0, h = 0, sectionH = 0, dpr = 1, raf = 0, visible = true;
    let stars: Star[] = [];
    let px = 0, pxTarget = 0;
    let meteor: { x: number; y: number; born: number } | null = null;
    let nextMeteor = 3000;

    const build = () => {
      const rect = section.getBoundingClientRect();
      w = rect.width;
      sectionH = rect.height;
      h = rect.height + EXTRA_BOTTOM;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.top = "0px";
      const count = Math.round((w * h) / (w < 700 ? density * 1.5 : density));
      stars = Array.from({ length: count }, () => {
        const d = Math.random(); // 0 = jauh, 1 = dekat
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          d,
          r: 0.35 + d * d * 1.25 + (Math.random() < 0.035 ? 0.7 : 0),
          a: 0.3 + Math.random() * 0.7,
          s: 0.4 + Math.random() * 1.8,
          t: Math.random() * Math.PI * 2,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = (time: number) => {
      px += (pxTarget - px) * 0.06;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const st of stars) {
        const twinkle = reduce ? 1 : 0.62 + 0.38 * Math.sin(time * 0.001 * st.s + st.t);
        const x = st.x + px * (0.15 + st.d) * 22;
        const y = st.y;
        ctx.fillStyle = `rgba(${st.c},${st.a * twinkle})`;
        if (st.r < 0.8) {
          ctx.fillRect(x, y, st.r * 1.6, st.r * 1.6);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, st.r, 0, Math.PI * 2);
          ctx.fill();
          if (st.r > 1.3) {
            ctx.fillStyle = `rgba(${st.c},${st.a * twinkle * 0.14})`;
            ctx.beginPath();
            ctx.arc(x, y, st.r * 3.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (!reduce) {
        if (!meteor && time > nextMeteor) {
          meteor = { x: w * (0.35 + Math.random() * 0.6), y: Math.random() * Math.min(sectionH * 0.4, 360), born: time };
        }
        if (meteor) {
          const life = (time - meteor.born) / 900;
          if (life > 1) {
            meteor = null;
            nextMeteor = time + 5000 + Math.random() * 6000;
          } else {
            const hx = meteor.x - life * 640;
            const hy = meteor.y + life * 340;
            const g = ctx.createLinearGradient(hx, hy, hx + 130, hy - 70);
            g.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - life)})`);
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(hx, hy);
            ctx.lineTo(hx + 130, hy - 70);
            ctx.stroke();
          }
        }
      }
      glow.style.transform = `translate3d(${-px * 14}px, 0, 0)`;
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      raf = window.requestAnimationFrame(loop);
    };
    const drawOnce = () => draw(0);
    const onPointer = (e: PointerEvent) => { pxTarget = (e.clientX / window.innerWidth - 0.5) * 2; };

    build();
    const resizeObserver = new ResizeObserver(() => { build(); if (reduce) drawOnce(); });
    resizeObserver.observe(section);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(section);

    if (reduce) {
      drawOnce();
    } else {
      raf = window.requestAnimationFrame(loop);
      if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density]);

  return (
    <div className="star-sky" ref={wrapRef} aria-hidden="true">
      <div className="star-sky-glow" ref={glowRef} />
      <canvas ref={canvasRef} />
    </div>
  );
}