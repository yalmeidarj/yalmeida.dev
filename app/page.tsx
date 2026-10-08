import Image from "next/image";
import { Suspense } from "react";
import GraphqlPlayground from "@/components/GraphqlPlayground";
import RecentRepos from "@/components/RecentRepos";
import { dashboardShots, me, projects, stats } from "@/lib/portfolio";

const mobileShots = [
  { src: "map", title: "A day in the field", caption: "House records, visit outcomes and a running shift timer.", alt: "Door2Door map showing houses, visit filters and an active shift timer" },
  { src: "performance", title: "The numbers behind it", caption: "Hours, visits and conversion rates, all in one place.", alt: "Door2Door performance screen with hours, visit counts and a daily conversion chart" },
  { src: "sync", title: "Know what’s saved", caption: "Pending and failed syncs stay visible to the agent.", alt: "Door2Door profile showing connection status and pending and failed sync counts" },
];

export default function Page() {
  const d2d = projects.find((p) => p.slug === "door2door")!;
  const pup = projects.find((p) => p.slug === "nerdypup")!;
  return (
    <div className="portfolio">
      <header className="site-header shell">
        <a className="wordmark" href="#main" aria-label="Yuri Almeida home">ya<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="/Yuri-Almeida-Resume-oct-26.pdf">Resume <span aria-hidden="true">↗</span></a>
        </nav>
        <a className="header-contact" href={`mailto:${me.email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main" className="shell">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow"><span className="status-dot" />Yuri Almeida · Full-stack developer · Toronto</p>
          <h1 id="hero-title">Software for<br />the <span>working day.</span></h1>
          <div className="hero-bottom">
            <p>I build web and mobile apps, and stay with them after launch. Since 2023, I’ve been building and supporting the software TDX’s field teams use every day.</p>
            <a className="button" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-foot"><span>React / Next.js / TypeScript / React Native</span><span>From the first conversation to production.</span></div>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-heading"><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Built. Shipped. Supported.</h2></div>
          <article id="door2door" className="featured-project">
            <div className="project-intro">
              <div><span className="badge"><span className="status-dot" />In production since 2023</span><h3>Door2Door<span className="orange">.</span></h3><p className="project-subtitle">The daily workspace for a team out in the field.</p></div>
              <div><p>What started as a replacement for spreadsheets now runs TDX’s fiber sales operations. Dispatchers follow live shifts, managers assign sites, and agents record visits.</p><p>I’m the sole developer: I work with the team on requirements, build the product, and handle releases and support.</p><a className="text-link" href={d2d.url}>Visit Door2Door <span aria-hidden="true">↗</span></a></div>
            </div>
            <div className="project-visual">
              <div className="visual-note"><span className="eyebrow">Door2Door / Mobile</span><p>Out of the office.<br />Still in sync.</p><span className="small">Companion app · Shipping to agents</span></div>
              <div className="phone-pair">
                <Image className="phone first-phone" src="/images/d2d-mobile-map.png" alt={mobileShots[0].alt} width={1080} height={2220} sizes="(max-width: 600px) 40vw, 230px" priority />
                <Image className="phone second-phone" src="/images/d2d-mobile-performance.png" alt={mobileShots[1].alt} width={1080} height={2220} sizes="(max-width: 600px) 40vw, 230px" />
              </div>
            </div>
            <dl className="stat-grid">{[stats[0], stats[1], stats[3], stats[4]].map((stat) => <div key={stat.label}><dd>{stat.value}</dd><dt>{stat.label}</dt><span>{stat.note}</span></div>)}</dl>
            <p className="data-note">Production snapshot · October 8, 2026. Current backend counts start in January 2025; households cover the full run since 2023.</p>
            <div className="project-details">
              <div><h4>One place to run operations</h4><p>A live agent map, house records, configurable forms and reporting. Salesforce and ArcGIS integrations keep the team’s existing systems connected.</p></div>
              <div><h4>Built for patchy reception</h4><p>The mobile app saves visits locally and queues them for sync. Agents can see what’s pending or failed before they move on to the next house.</p></div>
            </div>
            {dashboardShots.length > 0 && <div className="shots wide">{dashboardShots.map((shot) => <figure key={shot.src}><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 768px) 90vw, 1000px" /><figcaption>{shot.caption}</figcaption></figure>)}</div>}
            <details id="case-study" className="project-disclosure"><summary><span>Under the hood <span className="summary-note">/ Forms, offline saves and the decisions behind them</span></span><span className="expand" aria-hidden="true">+</span></summary>
              <div className="disclosure-content">
                <h4>When every client needs a different form</h4><p>A photo for one campaign. A signature for another. Each new rule used to mean a code change, and renaming a field could break a report.</p><p>I built versioned forms that admins can publish and assign by site. The browser and server share a validator; reports use stable field keys. Each submission records the form version, and repeated offline requests are counted once.</p><p>The engine shipped in October 2026. Adding a signature requirement needed a new field type and tests, without changes to the submission pipeline.</p>
                <h4>A save bug that only appeared during shifts</h4><p>GPS updates, syncs and agent edits were competing for SQLite writes. I routed writes through a single helper and kept reads concurrent, fixing the lock contention.</p>
                <div className="shots">{mobileShots.map((shot) => <figure key={shot.src}><Image src={`/images/d2d-mobile-${shot.src}.png`} alt={shot.alt} width={1080} height={2220} sizes="(max-width: 600px) 75vw, 250px" /><figcaption><strong>{shot.title}</strong><br />{shot.caption}</figcaption></figure>)}</div>
                <p className="stack">{d2d.stack.join(" · ")}</p>
              </div>
            </details>
          </article>

          <article id="nerdypup" className="secondary-project">
            <div><p className="eyebrow">Independent product / 2026</p><h3>NerdyPup<span className="orange">.</span></h3><p className="project-subtitle">Did someone feed the dog?</p><span className="badge">Closed testing on Google Play</span></div>
            <div><p>A shared dog-care app for households and sitters. Meals, walks, timers and reminders live in one shared log, so everyone knows what’s been done.</p><p>I’m building the app and backend, including subscriptions, push notifications and a Pro assistant. Access is checked per dog, and reminders are scheduled in a transaction to prevent duplicates.</p><p className="stack">React Native · Expo · Convex · RevenueCat</p><a className="text-link" href={pup.url}>Visit NerdyPup <span aria-hidden="true">↗</span></a></div>
          </article>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div><p className="eyebrow">02 / A little background</p><h2 id="about-title">Close to the work.<br />Close to the people.</h2></div>
          <div className="about-copy"><p>At TDX, operations sits a few desks away. I also handle IT support, so I hear about a confusing screen or a broken workflow directly from the person using it.</p><p>Before software, I worked in hotels and restaurants in Rio de Janeiro. That experience still shapes how I build: people are busy, interruptions happen, and the next step should be easy to find.</p><p>I’m based in Toronto. I’m interested in teams where I can work across the product and talk to the people it’s for.</p><a className="text-link" href="/Yuri-Almeida-Resume-oct-26.pdf">Read my resume <span aria-hidden="true">↗</span></a></div>
        </section>

        <section id="code" className="code-section" aria-labelledby="code-title">
          <div className="section-heading"><p className="eyebrow">03 / Code & experiments</p><h2 id="code-title">A few things you can open.</h2></div>
          <div className="repo-grid">{projects.filter((p) => p.status === "OPEN_SOURCE").map((project) => <a className="repo-card" href={project.repo} key={project.slug}><span className="repo-top">{project.stack.join(" / ")}<span aria-hidden="true">↗</span></span><h3>{project.name}</h3><p>{project.summary}</p><span className="repo-link">View repository</span></a>)}</div>
          <details className="project-disclosure"><summary><span>Try this site’s GraphQL API</span><span className="expand" aria-hidden="true">+</span></summary><div className="disclosure-content"><p>The API serves the same project data used on this page. It’s a small example built with GraphQL Yoga, with tests for filters, invalid inputs and schema responses. My current production work uses Convex; this is a separate working demo.</p><GraphqlPlayground /><p className="small"><a href="https://github.com/yalmeidarj/yalmeida.dev">Browse the source</a> · <a href="https://github.com/yalmeidarj/yalmeida.dev/actions">View CI runs</a></p></div></details>
          <details className="project-disclosure"><summary><span>Recent GitHub activity</span><span className="expand" aria-hidden="true">+</span></summary><div className="disclosure-content"><Suspense fallback={<p>Loading repositories…</p>}><RecentRepos /></Suspense></div></details>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title"><p className="eyebrow">Have a role or a project in mind?</p><h2 id="contact-title">Let’s talk<span>.</span></h2><div className="contact-bottom"><a href={`mailto:${me.email}`}>{me.email} <span aria-hidden="true">↗</span></a><p>Happy to walk you through the work<br />and hear what you’re building.</p></div></section>
      </main>
      <footer className="site-footer shell"><p>© {new Date().getFullYear()} Yuri Almeida · Toronto</p><div><a href={me.github}>GitHub ↗</a><a href="/Yuri-Almeida-Resume-oct-26.pdf">Resume ↗</a><a href="https://github.com/yalmeidarj/yalmeida.dev">Site source ↗</a></div><span>No tracking. Just the work.</span></footer>
    </div>
  );
}
