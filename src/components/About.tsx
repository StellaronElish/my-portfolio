import { Icon, type IconName } from "@/components/Icons";

const capabilities: { icon: IconName; label: string }[] = [
  { icon: "code", label: "Full-stack web apps" },
  { icon: "lock", label: "Authentication & authorization" },
  { icon: "database", label: "Database design" },
  { icon: "plug", label: "API development" },
  { icon: "layers", label: "Component-based interfaces" },
  { icon: "rocket", label: "Application deployment" },
];

export function About() {
  return (
    <section id="about" className="about-section section-shell">
      <div className="section-title">
        <p className="section-kicker">02 / ABOUT ME</p>
        <h2>Turning ideas<br /><em>into systems.</em></h2>
      </div>

      <div className="about-bento">
        <article className="bento bento-profile">
          <div className="about-card-top">
            <span className="avatar-large">RA</span>
            <div>
              <p className="eyebrow">PROFILE / 2026</p>
              <h3>Rafly Eryan Azis</h3>
              <p>Informatics Engineering · GPA 3.70</p>
            </div>
          </div>
          <p className="about-copy">
            Fresh Graduate in Informatics Engineering with hands-on experience developing full-stack web applications both
            independently and in collaborative teams. Experienced in building end-to-end systems using Laravel, CodeIgniter,
            React.js, Vue.js, TypeScript, REST APIs, and relational databases. Skilled in implementing authentication and
            authorization, database design, API development, websocket, component-based interfaces, and application deployment.
            Familiar with Agile, Scrum, and Prototype development methodologies, with experience delivering web applications
            that have been used by real users. Familiar with AWS cloud fundamentals, including S3, EC2, Lambda, and RDS
          </p>
          <div className="bento-status">
            <Icon name="pin" size={16} /> Karawang, Cikampek <i />
            <b>Open to junior roles</b>
          </div>
        </article>

        <article className="bento bento-edu">
          <span className="bento-icon"><Icon name="grad" /></span>
          <p className="bento-big">3.71<small> GPA</small></p>
          <h4>YARSI University</h4>
          <p className="bento-sub">Informatics Engineering | 2022 - 2026</p>
        </article>

        <article className="bento bento-proj">
          <span className="bento-icon"><Icon name="layers" /></span>
          <p className="bento-big">4+</p>
          <h4>Projects built</h4>
          <p className="bento-sub">Solo and team delivery</p>
        </article>

        <article className="bento bento-cloud">
          <span className="bento-icon"><Icon name="cloud" /></span>
          <h4>AWS fundamentals</h4>
          <div className="bento-tags"><span>S3</span><span>EC2</span><span>Lambda</span><span>RDS</span></div>
        </article>

        <article className="bento bento-method">
          <span className="bento-icon"><Icon name="branch" /></span>
          <h4>Ways of working</h4>
          <div className="bento-tags"><span>Agile</span><span>Scrum</span><span>Prototype</span></div>
        </article>

        <article className="bento bento-cap">
          <h4>What I build</h4>
          <div className="cap-grid">
            {capabilities.map((item) => (
              <span className="cap-item" key={item.label}>
                <span className="cap-icon"><Icon name={item.icon} size={18} /></span>
                {item.label}
              </span>
            ))}
          </div>
        </article>

        <article className="bento bento-note about-note">
          <span className="quote-mark">“</span>
          <p>Good software is not only about making things work. It is about making the next step obvious.</p>
          <span className="note-signature">— a principle I bring to every build</span>
        </article>
      </div>
    </section>
  );
}