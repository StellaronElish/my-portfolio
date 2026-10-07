import { HeroPhoto } from "@/components/HeroPhoto";
import { StarSky } from "@/components/StarSky";

export function Hero() {
return <section className="hero section-shell">
  <StarSky />
  <div className="hero-copy">
    <p className="section-kicker">FULL-STACK DEVELOPER / 01</p>
    <h1>Hi, I&apos;m<br /><em>Rafly Eryan Azis.</em></h1>
    <p className="hero-role">Junior Full-Stack Developer</p>
    <p className="hero-description">Fresh graduate in Informatics Engineering who builds functional, responsive, and user-focused web applications from database to interface.</p>
    <div className="hero-actions"><a className="primary-button" href="#projects">View projects <span>→</span></a><a className="secondary-button" href="mailto:raflyeryanazis@gmail.com">Let&apos;s connect <span>↗</span></a></div>
  </div>
  <div className="hero-visual">
    <div className="hero-orbit orbit-a" />
    <div className="hero-orbit orbit-b" />
    <div className="hero-portrait">
      <HeroPhoto />
      <div className="hero-badge">
        <i className="hero-badge-dot" aria-hidden="true" />
        <span><strong>Available for work</strong><small>Junior full-stack roles</small></span>
      </div>
    </div>
  </div>
</section>;
}