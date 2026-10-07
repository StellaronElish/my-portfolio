import { skillGroups } from "@/data/skills";
import { SkillMarquee } from "@/components/SkillMarquee";

export function Skills() {
  return <section id="skills" className="skills-section section-shell"><div className="section-title skills-heading"><p className="section-kicker">03 / TECHNICAL SKILLS</p><h2>Tools for<br /><em>real work.</em></h2><p>My toolkit keeps growing, but the goal stays simple: choose the right tool for the problem. Drag any row to explore.</p></div><div className="skill-groups">{skillGroups.map((group, index) => <div className="skill-group" key={group.title}><div className="skill-group-heading"><span>0{index + 1}</span><h3>{group.title}</h3></div><SkillMarquee items={group.items} direction={index % 2 === 0 ? "forward" : "reverse"} /></div>)}</div></section>;
}
