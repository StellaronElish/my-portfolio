"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/data/skills";

type SkillMarqueeProps = {
  items: Skill[];
  direction?: "forward" | "reverse";
};

function SkillIcon({ skill }: { skill: Skill }) {
  const [hasError, setHasError] = useState(false);
  const fallbackMark = skill.mark ?? skill.name.slice(0, 2).toUpperCase();

  if (!skill.icon || hasError) return <b className="skill-mark" aria-hidden="true">{fallbackMark}</b>;
  return <img src={skill.icon} alt="" aria-hidden="true" onError={() => setHasError(true)} />;
}

export function SkillMarquee({ items, direction = "forward" }: SkillMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastFrameRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });

  const getLoopWidth = () => {
    const track = trackRef.current;
    const group = track?.querySelector<HTMLElement>(".skill-marquee-group");
    if (!track || !group) return 0;
    return group.offsetWidth + 10;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrame = 0;
    const speed = direction === "forward" ? -0.018 : 0.018;
    if (direction === "reverse") {
      offsetRef.current = -getLoopWidth();
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      const elapsed = lastFrameRef.current ? Math.min(timestamp - lastFrameRef.current, 32) : 16;
      lastFrameRef.current = timestamp;
      if (!dragRef.current.active) {
        offsetRef.current += speed * elapsed;
        const loopWidth = getLoopWidth();
        if (!loopWidth) return;
        if (offsetRef.current <= -loopWidth) offsetRef.current += loopWidth;
        if (offsetRef.current >= 0) offsetRef.current -= loopWidth;
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [direction]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startX: event.clientX, startOffset: offsetRef.current };
    viewportRef.current?.setPointerCapture(event.pointerId);
    viewportRef.current?.classList.add("is-dragging");
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !trackRef.current) return;
    const loopWidth = getLoopWidth();
    if (!loopWidth) return;
    offsetRef.current = dragRef.current.startOffset + event.clientX - dragRef.current.startX;
    if (offsetRef.current <= -loopWidth) offsetRef.current += loopWidth;
    if (offsetRef.current >= 0) offsetRef.current -= loopWidth;
    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = false;
    viewportRef.current?.releasePointerCapture(event.pointerId);
    viewportRef.current?.classList.remove("is-dragging");
  };

  const renderGroup = (groupIndex: number) => <div className="skill-marquee-group" key={groupIndex}>{Array.from({ length: 4 }, (_, repeatIndex) => items.map((item) => <span className="skill-marquee-item" key={`${groupIndex}-${repeatIndex}-${item.name}`}><SkillIcon skill={item} /><strong>{item.name}</strong></span>))}</div>;

  return <div className="skill-marquee" ref={viewportRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} aria-label="Scrollable skills list"><div className="skill-marquee-track" ref={trackRef}>{renderGroup(0)}{renderGroup(1)}</div></div>;
}
