import Image from "next/image";
import { Suspense } from "react";
import GraphqlPlayground from "@/components/GraphqlPlayground";
import RecentRepos from "@/components/RecentRepos";
import { me, projects, requirements } from "@/lib/portfolio";

const levelLabel = {
  STRONG: "Strong",
  SOLID: "Solid",
  HONEST_GAP: "Honest gap",
} as const;

const byStatus = (s: string) => projects.filter((p) => p.status === s);

export default function Page() {
  const d2d = projects.find((p) => p.slug === "door2door")!;
  const d2dMobile = projects.find((p) => p.slug === "door2door-mobile")!;
  const pup = projects.find((p) => p.slug === "nerdypup")!;
  const oss = byStatus("OPEN_SOURCE");

  return (
    <div className="wrap">
      <header className="masthead">
        <p className="dateline">Application for Web Developer at Presto · Toronto · October 2026</p>
        <h1>{me.name}</h1>
        <p className="lede">
          Full-stack developer in Toronto. I build React apps that field teams use every day.
        </p>
        <nav aria-label="Page sections">
          <a href="#why">Why Presto</a>
          <a href="#door2door">Door2Door</a>
          <a href="#nerdypup">NerdyPup</a>
          <a href="#posting">Your posting, line by line</a>
          <a href="#graphql">GraphQL</a>
          <a href="/resume">Resume</a>
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="intro-h">
          <h2 id="intro-h" className="muted small" style={{ marginBottom: "0.5rem" }}>
            Hello, Presto team
          </h2>
          <p>
            This page is the long version of my application. It covers the production app I
            have built and run on my own for three years, two apps about to ship, and an honest
            line-by-line read of your posting against what I have actually done. Everything on it
            is also served by a small GraphQL API at the bottom, because your posting asks for
            GraphQL and I would rather show it than list it.
          </p>
          <dl className="facts">
            <dt>Based in</dt>
            <dd>{me.location}, can work on site</dd>
            <dt>Status</dt>
            <dd>{me.workAuthorization}</dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${me.email}`}>{me.email}</a>
            </dd>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:+1${me.phone.replace(/-/g, "")}`}>{me.phone}</a>
            </dd>
            <dt>Code</dt>
            <dd>
              <a href={me.github}>github.com/yalmeidarj</a>
            </dd>
          </dl>
        </section>

        <section id="why" aria-labelledby="why-h">
          <h2 id="why-h">Why Presto</h2>
          <p>
            Before I wrote software I worked in hospitality in Rio de Janeiro, in hotels and
            restaurants around Sugarloaf. I know what a loud counter at peak hour feels like,
            what a wrong order costs, and how much operators care about speed and accuracy.
            Presto builds software for the people I used to work beside, in exactly the noisy,
            customer-facing environment your posting describes. That is why this role stood out.
          </p>
          <p>
            For the last three years I have been the only developer on Door2Door, the system
            fiber sales teams at TDX use daily to run door-to-door canvassing. Field work is the
            same kind of messy, real-world problem: agents on phones in the rain, bad signal,
            dispatchers watching a live map, data that has to be right because someone acts on
            it. The interfaces have to be fast, obvious, and correct. That is the work I like.
          </p>
          <p>
            I also build with AI tooling every day: an AI assistant inside the Door2Door
            dashboard, a model-fallback chat in NerdyPup, a proxy that keeps coding agents
            running when a provider goes down. &ldquo;We move at the pace of AI&rdquo; reads
            like a description of how I already work.
          </p>
        </section>

        <section id="door2door" aria-labelledby="d2d-h">
          <h2 id="d2d-h">Door2Door, in production since 2023</h2>
          <p>{d2d.summary}</p>
          <p>
            {d2d.role} The company moved from spreadsheets to this app in 2023, and more than
            120,000 households have been engaged through it since. There is no team behind it;
            if it breaks, I fix it. Source is private because it carries customer data, so this
            section describes the parts that matter for your role.
          </p>
          <h3>What the dashboard does</h3>
          <ul className="plain">
            <li>
              <strong>Real-time operations.</strong> A live agent map and list over Convex
              subscriptions, shift clock-in and clock-out with breaks, and inactivity
              detection. Dispatchers watch the field as it happens.
            </li>
            <li>
              <strong>Data-heavy views.</strong> House records layered from Salesforce and ArcGIS
              FieldMaps integrations, filterable street and house lists, KPI charts, and
              spreadsheet exports.
            </li>
            <li>
              <strong>A configurable form engine.</strong> Admins design door-knock forms
              (fields, validation rules, KPIs, card layouts) in a builder and publish immutable
              versions per site. Agents render whatever schema is assigned and submit into an
              atomic, idempotent, audited pipeline.
            </li>
            <li>
              <strong>Auth done carefully.</strong> NextAuth with Google OAuth and a custom
              Convex adapter; every backend call is authorized from a short-lived signed JWT,
              never from an id the client sends. The enforce mode went live in production on
              October 7, 2026 behind a compat flag so it could be rolled back in one command.
            </li>
            <li>
              <strong>Tests and docs.</strong> Vitest on the pure server logic (form evaluator,
              identity, stats), an architecture overview, a forms-engine spec, and a dashboard
              redesign spec written for the next engineer.
            </li>
          </ul>
          <p className="stack">Stack: {d2d.stack.join(" · ")}</p>

          <h3>The mobile app, shipping now</h3>
          <p>{d2dMobile.summary}</p>
          <p>
            The hard part was not the UI. It was making saves trustworthy when the GPS stream,
            the sync pusher and the agent&rsquo;s edits all write to the same local database.
            On React Native&rsquo;s new architecture that showed up as house saves that failed
            only while a shift was active. The fix was to serialize every write through one
            helper and leave reads concurrent.
          </p>
          <p className="stack">Stack: {d2dMobile.stack.join(" · ")}</p>
          <div className="shots">
            <figure>
              <Image
                src="/images/d2d-mobile-map.png"
                alt="Door2Door mobile app showing a street's houses on a map of Toronto, with an active shift timer and status filters"
                width={1080}
                height={2220}
                sizes="(max-width: 40rem) 90vw, 14rem"
              />
              <figcaption>Street view on a map, filtered by outcome, with the shift timer running.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/d2d-mobile-performance.png"
                alt="Shift performance screen with hours, visits, yes and no counts, and a conversion rate chart by day"
                width={1080}
                height={2220}
                sizes="(max-width: 40rem) 90vw, 14rem"
              />
              <figcaption>Per-agent performance over 7, 15 or 30 days.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/d2d-mobile-sync.png"
                alt="Profile screen showing online status, pending and failed mutation counts, and a data export option"
                width={1080}
                height={2220}
                sizes="(max-width: 40rem) 90vw, 14rem"
              />
              <figcaption>Sync state is visible: pending and failed writes, never a silent loss.</figcaption>
            </figure>
          </div>
          <p className="small muted">
            Product site: <a href={d2d.url}>door2door.systems</a>
          </p>
        </section>

        <section id="nerdypup" aria-labelledby="pup-h">
          <h2 id="pup-h">NerdyPup, in closed testing</h2>
          <p>{pup.summary}</p>
          <p>
            It is the same real-time backend pattern as Door2Door applied to a consumer app:
            every phone in the household sees a log the moment it happens. Subscriptions run
            through RevenueCat, reminders fire from a cron with per-user subscriptions and push
            delivery, and the Pro assistant calls Claude with a timeout and an automatic fallback
            model so a slow provider never hangs the UI.
          </p>
          <p>
            Before any feature goes into store copy or the marketing site I check it against the
            code and on a device and record the result in a product-facts ledger. Several items
            in that ledger are defects I found in my own work and fixed before testers hit them.
          </p>
          <p className="stack">Stack: {pup.stack.join(" · ")}</p>
          <p className="small muted">
            Site: <a href={pup.url}>nerdypup.app</a>
          </p>
        </section>

        <section id="posting" aria-labelledby="posting-h">
          <h2 id="posting-h">Your posting, line by line</h2>
          <p>
            Each requirement from the Web Developer posting, and where I have done it. One of
            them is a gap and it is marked as one.
          </p>
          <table className="map">
            <caption>Strong: done in production. Solid: done, smaller scale. Honest gap: see note.</caption>
            <tbody>
              {requirements.map((r) => (
                <tr key={r.id}>
                  <th scope="row">
                    {r.requirement}
                    <br />
                    <span className={`level level-${r.level}`}>{levelLabel[r.level]}</span>
                  </th>
                  <td>{r.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="graphql" aria-labelledby="gql-h">
          <h2 id="gql-h">This page as a GraphQL API</h2>
          <p>
            Everything above is served by a GraphQL endpoint on this site, built with GraphQL
            Yoga on Node inside a Next.js route handler, with a Vitest suite that runs in GitHub
            Actions on every push. Edit the query and run it.
          </p>
          <GraphqlPlayground />
        </section>

        <section id="code" aria-labelledby="code-h">
          <h2 id="code-h">Open source and recent activity</h2>
          <ul className="plain">
            {oss.map((p) => (
              <li key={p.slug}>
                <a href={p.repo}>{p.name}</a> ({p.stack.join(", ")}): {p.summary}
              </li>
            ))}
          </ul>
          <p className="small muted">Most recently pushed public repositories, from the GitHub REST API:</p>
          <Suspense fallback={<p className="small muted">Loading from GitHub…</p>}>
            <RecentRepos />
          </Suspense>
        </section>

        <section id="contact" aria-labelledby="contact-h">
          <h2 id="contact-h">Next step</h2>
          <p>
            I would like to walk you through the Door2Door dashboard live. Email{" "}
            <a href={`mailto:${me.email}`}>{me.email}</a> or call{" "}
            <a href={`tel:+1${me.phone.replace(/-/g, "")}`}>{me.phone}</a>. A printable resume is
            at <a href="/resume">yalmeida.dev/resume</a>.
          </p>
        </section>
      </main>

      <footer>
        <p>
          Built by hand with Next.js, React and plain CSS. No tracking. Source on{" "}
          <a href="https://github.com/yalmeidarj/yalmeida.dev">GitHub</a>.
        </p>
      </footer>
    </div>
  );
}
