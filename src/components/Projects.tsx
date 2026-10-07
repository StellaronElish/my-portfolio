"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { Icon, type IconName } from "@/components/Icons";

type Info = { label: string; title: string; content: string; actionUrl?: string; actionLabel?: string };

type Theme = { mark: string; name: string; sub: string; status: string; kicker: string; intro: string };
const themes: Record<string, Theme> = {
  sipena: { mark: "SP", name: "SIPENA", sub: "Employee system", status: "Online", kicker: "System case study", intro: "One calm workspace for attendance, leave, overtime, and approvals, so the workday runs itself." },
  "dini-sehat-mental": { mark: "DI", name: "DINI", sub: "Mental health screening", status: "Screening", kicker: "Screening case study", intro: "A questionnaire should feel like a conversation, not an exam. DINI turns 100+ answers into reports people can act on." },
  pentadosen: { mark: "PD", name: "PentaDosen", sub: "Research records", status: "Archive", kicker: "Research system case study", intro: "Every proposal, report, and publication filed where it can be found again." },
  freemeal: { mark: "FM", name: "FreeMeal", sub: "Meal distribution", status: "Serving", kicker: "Distribution case study", intro: "Every meal counted, every school reached, every voice heard, in one traceable record." },
};
const getTheme = (project: Project): Theme =>
  themes[project.slug] ?? { mark: project.name.slice(0, 2).toUpperCase(), name: project.name, sub: project.label, status: "Live", kicker: "Case study", intro: project.description };

/* Pick an icon for a contribution from its wording, and split a sentence into separate contributions. */
const contributionIcon = (text: string): IconName => {
  const s = text.toLowerCase();
  if (/requirement|analysis/.test(s)) return "search";
  if (/database|data model|relational/.test(s)) return "database";
  if (/auth|permission|role/.test(s)) return "lock";
  if (/api|backend|service/.test(s)) return "plug";
  if (/valid|logic|rule|balance/.test(s)) return "check";
  if (/approval|workflow|scrum|crud/.test(s)) return "workflow";
  if (/deploy|production/.test(s)) return "rocket";
  if (/\bui\b|interface|react|state/.test(s)) return "layers";
  return "code";
};
const splitContribution = (text: string) =>
  text.replace(/\.$/, "").split(/,\s*(?:and\s+)?/).map((part) => part.trim()).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1));

function InfoModal({ info, theme, onClose }: { info: Info; theme: string; onClose: () => void }) {
  return (
    <div className="info-modal-backdrop" role="presentation" onClick={onClose}>
      <section className={`info-modal ${info.actionUrl ? "repository-modal" : ""} theme-${theme}`} role="dialog" aria-modal="true" aria-label={info.title} onClick={(event) => event.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose} aria-label="Close information">×</button>
        <p className="eyebrow">{info.label}</p>
        <h3>{info.title}</h3>
        <p>{info.content}</p>
        {info.actionUrl
          ? <a className="info-modal-action" href={info.actionUrl} target="_blank" rel="noreferrer" onClick={onClose}>{info.actionLabel ?? "Open repository"} <span>↗</span></a>
          : <button className="info-modal-action" onClick={onClose}>Got it <span>↗</span></button>}
      </section>
    </div>
  );
}

function InfoTrigger({ info, onOpen, className = "", icon }: { info: Info; onOpen: (info: Info) => void; className?: string; icon?: IconName }) {
  const text = <><span>{info.label}</span><b>{info.title}</b><i>Read details ↗</i></>;
  return (
    <button className={`info-trigger ${className}${icon ? " has-icon" : ""}`} onClick={() => onOpen(info)}>
      {icon ? <><em className="trigger-icon"><Icon name={icon} size={20} /></em><em className="trigger-body">{text}</em></> : text}
    </button>
  );
}

function DetailPanel({ project, onDetails, onInfo }: { project: Project; onDetails: () => void; onInfo: (info: Info) => void }) {
  const t = getTheme(project);
  return (
    <aside className={`project-detail ${project.slug}-detail theme-${project.slug}`}>
      <div className="detail-visual"><span>{t.mark}</span><div><b>{t.name}</b><small>{t.sub}</small></div><em>{t.status}</em></div>
      <div className="detail-heading">
        <div>
          <p className="eyebrow">PROJECT DETAIL / {project.year}</p>
          <h3>{project.name}</h3>
        </div>
        <span className={`detail-dot ${project.accent}`} />
      </div>
      <p className="detail-label">{project.label}</p>
      <div className="detail-meta"><span><b>Role</b>Full-Stack Developer</span><span><b>Team</b>{project.team ?? "Independent"}</span><span><b>Duration</b>{project.duration ?? project.year}</span></div>
      <InfoTrigger className="detail-info-trigger" onOpen={onInfo} info={{ label: "01 / Problem", title: "What needed to change?", content: project.problem }} />
      <InfoTrigger className="detail-info-trigger" onOpen={onInfo} info={{ label: "02 / Solution", title: "How the system responds", content: project.solution }} />
      <InfoTrigger className="detail-info-trigger" onOpen={onInfo} info={{ label: "03 / Architecture", title: "How the pieces connect", content: project.architecture }} />
      <div className="detail-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <button className="detail-view-button" onClick={onDetails}>View full case study <span>↓</span></button>
      {project.github !== "#" && (
        <button className="detail-link detail-repository-button" onClick={() => onInfo({ label: "Repository", title: `Open ${project.name} on GitHub`, content: `Review the source code, implementation details, and commit history for ${project.name} in the project repository.`, actionUrl: project.github, actionLabel: "Open GitHub repository" })}>
          View repository <span>↗</span>
        </button>
      )}
    </aside>
  );
}

function ProcessFlow({ steps }: { steps: string[] }) {
  return (
    <div className="process-flow">
      {steps.map((step, index) => (
        <div className="process-step" key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{step}</b>
          {index < steps.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function ArchitectureDiagram({ project, nodes, onInfo }: { project: Project; nodes: string[]; onInfo: (info: Info) => void }) {
  const root = project.name.length > 12 ? project.name.split(" ")[0] : project.name;
  const content = project.slug === "sipena"
    ? "The system connects authentication with attendance, leave, overtime, and approval workflows. Each workflow writes to the relational database so status and reporting stay consistent."
    : project.architecture;
  return (
    <button className="architecture-diagram architecture-interactive" onClick={() => onInfo({ label: "02 / Architecture", title: `${project.name} system map`, content })}>
      <div className="architecture-root">{root}</div>
      <div className="architecture-branch">{nodes.slice(0, 5).map((node) => <div className="architecture-node" key={node}>{node}</div>)}</div>
      <div className="architecture-line" />
      <div className="architecture-database">{nodes[5] ?? "Database"}</div>
      <span className="architecture-hint">Click diagram to understand the flow ↗</span>
    </button>
  );
}

/* ---------- Screenshots: carousel kartu + lightbox ----------
   Letakkan gambar di: public/projects/<slug>/screenshot-1.png, screenshot-2.png, dst.
   (urutan sesuai daftar `screenshots` di src/data/projects.ts). Atau isi `screenshotImages` di data project. */
const shotSrc = (project: Project, index: number) => project.screenshotImages?.[index] ?? `/projects/${project.slug}/screenshot-${index + 1}.png`;

function ShotImage({ src, alt, title }: { src: string; alt: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="shot-empty">
        <Icon name="image" size={30} />
        <b>{title}</b>
        <small>{src}</small>
      </span>
    );
  }
  return <img src={src} alt={alt} draggable={false} decoding="async" onError={() => setFailed(true)} />;
}

function ScreenshotCarousel({ project, onOpen }: { project: Project; onOpen: (index: number) => void }) {
  const shots = project.screenshots ?? ["Product interface"];
  const n = shots.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  /* auto slide: timer di-reset tiap kali slide berganti (termasuk saat diganti manual) */
  useEffect(() => {
    if (n < 2 || paused || reduced) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % n), 4200);
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, n]);

  const go = (index: number) => setActive(((index % n) + n) % n);
  const position = (index: number) => {
    let d = (((index - active) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d === 0 ? "center" : d === 1 ? "right" : d === -1 ? "left" : "hidden";
  };

  return (
    <div
      className="shot-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={(event) => { if ((event.target as HTMLElement).matches(":focus-visible")) setPaused(true); }}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => { if (event.key === "ArrowRight") go(active + 1); if (event.key === "ArrowLeft") go(active - 1); }}
    >
      <div className="shot-stage">
        {shots.map((title, index) => {
          const pos = position(index);
          const src = shotSrc(project, index);
          return (
            <button
              type="button"
              className="shot-card"
              data-pos={pos}
              key={`${title}-${index}`}
              tabIndex={pos === "hidden" ? -1 : 0}
              aria-hidden={pos === "hidden"}
              aria-label={pos === "center" ? `Open preview: ${title}` : `Show ${title}`}
              onClick={() => (pos === "center" ? onOpen(index) : go(index))}
            >
              <ShotImage src={src} alt={`${project.name}: ${title}`} title={title} />
            </button>
          );
        })}
      </div>
      <p className="shot-caption"><span>{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span><b>{shots[active]}</b></p>
      {n > 1 && (
        <div className="shot-controls">
          <button type="button" className="shot-arrow" onClick={() => go(active - 1)} aria-label="Previous screenshot">←</button>
          <div className="shot-dots">{shots.map((title, index) => <button type="button" key={`${title}-${index}`} className={`shot-dot${index === active ? " is-active" : ""}`} onClick={() => go(index)} aria-label={`Show ${title}`} />)}</div>
          <button type="button" className="shot-arrow" onClick={() => go(active + 1)} aria-label="Next screenshot">→</button>
        </div>
      )}
    </div>
  );
}

function ScreenshotModal({ project, index, onIndex, onClose }: { project: Project; index: number; onIndex: (index: number) => void; onClose: () => void }) {
  const shots = project.screenshots ?? ["Product interface"];
  const n = shots.length;
  const [dir, setDir] = useState(1);
  const swipeStart = useRef<number | null>(null);

  const go = useCallback((step: number) => {
    setDir(step);
    onIndex((((index + step) % n) + n) % n);
  }, [index, n, onIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const src = shotSrc(project, index);
  return (
    <div className="info-modal-backdrop" role="presentation" onClick={onClose}>
      <section className={`info-modal shot-modal theme-${project.slug}`} role="dialog" aria-modal="true" aria-label={`${project.name} screenshots`} onClick={(event) => event.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose} aria-label="Close preview">×</button>
        <p className="eyebrow">05 / Screenshot, {project.name} ({index + 1} of {n})</p>
        <h3>{shots[index]}</h3>
        <div
          className="shot-viewer"
          onPointerDown={(event) => { swipeStart.current = event.clientX; }}
          onPointerUp={(event) => {
            if (swipeStart.current === null) return;
            const dx = event.clientX - swipeStart.current;
            swipeStart.current = null;
            if (n > 1 && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="shot-slide" key={index} style={{ "--dir": dir } as CSSProperties}>
            <ShotImage key={src} src={src} alt={`${project.name}: ${shots[index]}`} title={shots[index]} />
          </div>
          {n > 1 && <>
            <button type="button" className="shot-arrow shot-arrow-prev" onClick={() => go(-1)} aria-label="Previous screenshot">←</button>
            <button type="button" className="shot-arrow shot-arrow-next" onClick={() => go(1)} aria-label="Next screenshot">→</button>
          </>}
        </div>
        {n > 1 && <div className="shot-dots shot-dots-modal">{shots.map((title, i) => <button type="button" key={`${title}-${i}`} className={`shot-dot${i === index ? " is-active" : ""}`} onClick={() => { setDir(i > index ? 1 : -1); onIndex(i); }} aria-label={`Show ${title}`} />)}</div>}
      </section>
    </div>
  );
}

function CaseStudy({ project, onClose, onInfo, onShot }: { project: Project; onClose: () => void; onInfo: (info: Info) => void; onShot: (index: number) => void }) {
  const isSipena = project.slug === "sipena";
  const t = getTheme(project);
  const contributions = project.contributions ?? splitContribution(project.contribution);
  return (
    <div className={`case-study case-${project.slug} theme-${project.slug}`} id="case-study">
      {isSipena && <div className="sipena-case-glow glow-one" />}
      {isSipena && <div className="sipena-case-glow glow-two" />}

      <div className="case-study-header">
        <span className="case-logo" aria-hidden="true">{t.mark}</span>
        <div>
          <p className="section-kicker">{t.kicker}, {project.year}</p>
          <h2>{project.name}</h2>
          <p>{project.label}</p>
        </div>
        <button className="case-close" onClick={onClose}>Close case study <span>×</span></button>
      </div>
      <p className="case-intro">{t.intro}</p>

      <div className="case-meta">
        <div className="meta-card"><em className="meta-icon"><Icon name="briefcase" size={20} /></em><div className="meta-text"><small>Role</small><strong>Full-Stack Developer</strong></div></div>
        <div className="meta-card"><em className="meta-icon"><Icon name="users" size={20} /></em><div className="meta-text"><small>Team</small><strong>{project.team ?? "Independent project"}</strong></div></div>
        <div className="meta-card"><em className="meta-icon"><Icon name="clock" size={20} /></em><div className="meta-text"><small>Duration</small><strong>{project.duration ?? project.year}</strong></div></div>
        <div className="meta-card meta-stack"><em className="meta-icon"><Icon name="code" size={20} /></em><div className="meta-text"><small>Tech stack</small><div className="meta-chips">{project.stack.map((item) => <i key={item}>{item}</i>)}</div></div></div>
      </div>

      <div className="case-grid">
        <div>
          <InfoTrigger icon="target" className="case-info-trigger" onOpen={onInfo} info={{ label: "Problem", title: `The workflow before ${project.name}`, content: project.problem }} />
          <InfoTrigger icon="bulb" className="case-info-trigger" onOpen={onInfo} info={{ label: "Solution", title: "The system response", content: project.solution }} />
          <InfoTrigger icon="users" className="case-info-trigger" onOpen={onInfo} info={{ label: "My contribution", title: "What I owned", content: project.contribution }} />
        </div>
        <div className="case-highlight">
          <div className="highlight-icon"><Icon name="star" size={20} /></div>
          <span>Why it matters</span>
          <p>{project.description}</p>
          <div className="case-stat"><b>{project.stack.length}</b><span>core technologies</span></div>
        </div>
      </div>

      {project.process && (
        <div className="case-section">
          <div className="case-section-title">
            <p className="eyebrow"><Icon name="workflow" size={15} />01 / DELIVERY FLOW</p>
            <h3>From problem<br /><em>to production.</em></h3>
          </div>
          <ProcessFlow steps={project.process} />
        </div>
      )}

      {project.architectureNodes && (
        <div className="case-section architecture-section">
          <div className="case-section-title">
            <p className="eyebrow"><Icon name="layers" size={15} />02 / ARCHITECTURE</p>
            <h3>Connected workflows,<br /><em>one source of truth.</em></h3>
          </div>
          <ArchitectureDiagram project={project} nodes={project.architectureNodes} onInfo={onInfo} />
        </div>
      )}

      <div className="case-lower-grid">
        <div className="case-section">
          <p className="eyebrow"><Icon name="database" size={15} />03 / DATABASE DESIGN</p>
          <h3>Data that follows<br /><em>the workflow.</em></h3>
          <InfoTrigger icon="database" className="case-info-trigger database-info-trigger" onOpen={onInfo} info={{ label: "03 / Database design", title: "Relational model", content: project.database ?? project.architecture }} />
        </div>
        <div className="case-section">
          <p className="eyebrow"><Icon name="users" size={15} />04 / MY CONTRIBUTION</p>
          <h3>What I<br /><em>owned.</em></h3>
          <ul className="contribution-grid">
            {contributions.map((item, index) => (
              <li key={item}>
                <button className="contribution-card" onClick={() => onInfo({ label: "04 / Contribution", title: item, content: `This contribution was part of the ${project.name} delivery and connected to the wider product workflow.` })}>
                  <span className="c-icon"><Icon name={contributionIcon(item)} size={18} /></span>
                  <b>{item}</b>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="case-section">
        <p className="eyebrow"><Icon name="image" size={15} />05 / SCREENSHOTS</p>
        <ScreenshotCarousel key={project.slug} project={project} onOpen={onShot} />
      </div>

      <div className="case-bottom-grid">
        <InfoTrigger icon="zap" className="case-info-trigger" onOpen={onInfo} info={{ label: "06 / Challenges", title: "What was difficult", content: project.challenges ?? project.problem }} />
        <InfoTrigger icon="book" className="case-info-trigger" onOpen={onInfo} info={{ label: "07 / What I learned", title: "The takeaway", content: project.learned ?? project.solution }} />
      </div>
    </div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState(projects[0]);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [activeInfo, setActiveInfo] = useState<Info | null>(null);
  const [shot, setShot] = useState<number | null>(null);
  const selectProject = (project: Project) => { setSelected(project); setShowCaseStudy(false); setActiveInfo(null); setShot(null); };
  const openCaseStudy = () => { setShowCaseStudy(true); window.requestAnimationFrame(() => document.querySelector("#case-study")?.scrollIntoView({ behavior: "smooth", block: "start" })); };

  return (
    <section id="projects" className={`projects-section section-shell project-stage project-stage-${selected.slug}`}>
      <div className="section-title projects-heading">
        <div>
          <p className="section-kicker">04 / FEATURED PROJECTS</p>
          <h2>Proof of work,<br /><em>not just words.</em></h2>
        </div>
        <p className="projects-intro"><span className="intro-icon"><Icon name="search" size={20} /></span><span>Choose a project, inspect the system, and open the full case study to see how it was built.</span></p>
      </div>
      <div className="projects-layout">
        <div className="project-list">
          {projects.map((project, index) => (
            <button className={`project-row project-row-${project.slug} ${selected.slug === project.slug ? "selected" : ""} ${hoveredSlug === project.slug ? "hovered" : ""}`} key={project.slug} onMouseEnter={() => setHoveredSlug(project.slug)} onMouseLeave={() => setHoveredSlug(null)} onClick={() => selectProject(project)}>
              <span className="row-number">0{index + 1}</span>
              <span className="row-main"><b>{project.name}</b><small>{project.label}</small></span>
              <span className="row-year">{project.year}</span>
              <span className="row-arrow">{selected.slug === project.slug ? "↘" : "↗"}</span>
            </button>
          ))}
        </div>
        <DetailPanel key={selected.slug} project={selected} onDetails={openCaseStudy} onInfo={setActiveInfo} />
      </div>
      <div className="project-footnote"><span className="footnote-hint"><Icon name="zap" size={16} />Select a project to change the atmosphere</span><span className="footnote-motto">Built with intent <i>/</i> shipped with care</span></div>
      {showCaseStudy && <CaseStudy project={selected} onClose={() => { setShowCaseStudy(false); setShot(null); }} onInfo={setActiveInfo} onShot={setShot} />}
      {shot !== null && <ScreenshotModal project={selected} index={shot} onIndex={setShot} onClose={() => setShot(null)} />}
      {activeInfo && <InfoModal info={activeInfo} theme={selected.slug} onClose={() => setActiveInfo(null)} />}
    </section>
  );
}