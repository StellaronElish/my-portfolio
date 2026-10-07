"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; t: number };
type Spark = { x: number; y: number; vx: number; vy: number; born: number; life: number; r: number; c: number };

/* Warna ekor: dipakai dari kepala (baru) ke ujung (lama). Sama dengan palet bintang langit
   (biru muda, ungu muda, krem hangat), dibuat sedikit lebih jenuh supaya tetap terlihat di section terang. */
const TAIL_STOPS: [number, number, number][] = [
  [96, 170, 255],  // kepala: biru
  [150, 140, 255], // ungu
  [226, 150, 255], // magenta muda
  [255, 190, 160], // krem hangat / coral lembut
];
const SPARK_COLORS = ["120,185,255", "190,160,255", "255,215,170", "255,255,255"];
const TRAIL_LIFE = 620; // ms sebelum ujung ekor hilang
const MAX_POINTS = 48;
const MAX_SPARKS = 36;

const tailColor = (life: number) => {
  // life: 1 (kepala) -> 0 (ujung ekor)
  const pos = (1 - life) * (TAIL_STOPS.length - 1);
  const i = Math.min(Math.floor(pos), TAIL_STOPS.length - 2);
  const f = pos - i;
  const a = TAIL_STOPS[i];
  const b = TAIL_STOPS[i + 1];
  return [Math.round(a[0] + (b[0] - a[0]) * f), Math.round(a[1] + (b[1] - a[1]) * f), Math.round(a[2] + (b[2] - a[2]) * f)];
};

export function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = trailRef.current;
    const ctx = canvas?.getContext("2d");
    if (!dot || !ring || !canvas || !ctx || !window.matchMedia("(pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.add("custom-cursor-active");
    let ringX = -100;
    let ringY = -100;
    let targetX = -100;
    let targetY = -100;
    let headX = -100;
    let headY = -100;
    let hasMoved = false;
    let frame = 0;
    let dpr = 1;
    let vw = 0;
    let vh = 0;
    let dirty = false; // true kalau canvas masih berisi gambar yang perlu dibersihkan
    const points: TrailPoint[] = [];
    const sparks: Spark[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
    };

    const drawTrail = (now: number) => {
      // buang titik yang sudah habis umurnya
      while (points.length && now - points[0].t > TRAIL_LIFE) points.shift();
      for (let i = sparks.length - 1; i >= 0; i--) if (now - sparks[i].born > sparks[i].life) sparks.splice(i, 1);

      if (!points.length && !sparks.length) {
        if (dirty) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, vw, vh); dirty = false; }
        return;
      }

      dirty = true;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // ekor meteor: segmen demi segmen, makin tua makin tipis, pudar, dan berganti warna
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const life = 1 - (now - p1.t) / TRAIL_LIFE; // 1 = baru
        if (life <= 0) continue;
        const [r, g, b] = tailColor(life);
        const eased = life * life;

        // aura lebar + transparan
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.2 * eased})`;
        ctx.lineWidth = 3 + life * 13;
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();

        // badan ekor
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.75 * eased})`;
        ctx.lineWidth = 1 + life * 5.5;
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();

        // inti terang di dekat kepala
        if (life > 0.55) {
          ctx.strokeStyle = `rgba(255,255,255,${0.85 * (life - 0.55) / 0.45})`;
          ctx.lineWidth = 0.8 + life * 1.6;
          ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
        }
      }

      // percikan debu bintang yang tertinggal di jalur kursor
      for (const s of sparks) {
        const age = (now - s.born) / s.life;
        const x = s.x + s.vx * (now - s.born) * 0.06;
        const y = s.y + s.vy * (now - s.born) * 0.06 + age * age * 10;
        const alpha = (1 - age) * 0.9;
        const size = s.r * (1 - age * 0.6);
        ctx.fillStyle = `rgba(${SPARK_COLORS[s.c]},${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${SPARK_COLORS[s.c]},${alpha * 0.18})`;
        ctx.beginPath(); ctx.arc(x, y, size * 3.2, 0, Math.PI * 2); ctx.fill();
      }
    };

    const animate = (time: number) => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      if (!reduce && hasMoved) {
        // kepala ekor mengejar kursor dengan sedikit delay supaya lengkungannya halus
        headX += (targetX - headX) * 0.45;
        headY += (targetY - headY) * 0.45;
        const last = points[points.length - 1];
        const dx = last ? headX - last.x : 99;
        const dy = last ? headY - last.y : 99;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.6) {
          points.push({ x: headX, y: headY, t: time });
          if (points.length > MAX_POINTS) points.shift();
          // semakin cepat gerakan, semakin banyak percikan
          if (dist > 4 && sparks.length < MAX_SPARKS && Math.random() < Math.min(0.9, dist / 22)) {
            sparks.push({
              x: headX + (Math.random() - 0.5) * 6,
              y: headY + (Math.random() - 0.5) * 6,
              vx: (Math.random() - 0.5) * 1.4 - dx * 0.04,
              vy: (Math.random() - 0.5) * 1.4 - dy * 0.04,
              born: time,
              life: 450 + Math.random() * 450,
              r: 0.7 + Math.random() * 1.3,
              c: Math.floor(Math.random() * SPARK_COLORS.length),
            });
          }
        }
        drawTrail(time);
      }
      frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasMoved) { hasMoved = true; headX = targetX; headY = targetY; ringX = targetX; ringY = targetY; }
      document.body.classList.add("custom-cursor-visible");
    };
    const onPointerOver = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button, [role='button']")) document.body.classList.add("custom-cursor-hover");
    };
    const onPointerOut = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button, [role='button']")) document.body.classList.remove("custom-cursor-hover");
    };
    const onPointerLeave = () => document.body.classList.remove("custom-cursor-visible");

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.body.classList.remove("custom-cursor-active", "custom-cursor-visible", "custom-cursor-hover");
    };
  }, []);

  return (
    <>
      <canvas className="custom-cursor-trail" ref={trailRef} aria-hidden="true" />
      <span className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
      <span className="custom-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}