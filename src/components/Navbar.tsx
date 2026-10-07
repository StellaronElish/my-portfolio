"use client";

import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      setIsHidden(scrollingDown && currentScrollY > 120);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${isHidden ? "is-hidden" : ""}`}>
      <a className="navbar-brand" href="#top">
        <span>RA</span>
        <strong>Rafly Eryan Azis</strong>
      </a>
      <nav className="navbar-links" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-status" href="mailto:raflyeryanazis@gmail.com">
        <i /> Available for work
      </a>
    </header>
  );
}