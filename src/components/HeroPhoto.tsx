"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

/* Letakkan foto kamu di: public/profile.jpg
   Selama file itu belum ada, bingkai ini menampilkan placeholder. */
const PHOTO_SRC = "/profile.jpg";

export function HeroPhoto() {
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setHasPhoto(true);
    probe.onerror = () => setHasPhoto(false);
    probe.src = PHOTO_SRC;
  }, []);

  return (
    <div className={`hero-portrait-frame${hasPhoto ? " has-photo" : ""}`}>
      {hasPhoto ? (
        <img src={PHOTO_SRC} alt="Foto Rafly Eryan Azis" draggable={false} />
      ) : (
        <div className="hero-portrait-empty">
          <svg viewBox="0 0 120 140" aria-hidden="true">
            <circle cx="60" cy="48" r="26" />
            <path d="M8 140c0-36 23-56 52-56s52 20 52 56z" />
          </svg>
          <b>Your photo here</b>
          <small>public/profile.jpg</small>
        </div>
      )}
    </div>
  );
}