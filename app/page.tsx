import Image from "next/image";
import { Suspense } from "react";
import GraphqlPlayground from "@/components/GraphqlPlayground";
import RecentRepos from "@/components/RecentRepos";
import { dashboardShots, me, projects, requirements, stats } from "@/lib/portfolio";

const byStatus = (s: string) => projects.filter((p) => p.status === s);

const evaluatorTest = `it("blocks only when the predicate matches and no signature exists", () => {
  const yes = { status: "Consent Final Yes" };
  expect(evaluateRules(def, yes, { hasPhoto: true }).ok).toBe(false);
  expect(evaluateRules(def, yes, { hasPhoto: true, hasSignature: true }).ok).toBe(true);
  expect(evaluateRules(def, { status: "Door Knock Attempt 1" }, { hasPhoto: true }).ok).toBe(true);
});`;

const enumTest = `it("rejects an invalid enum value", async () => {
  const res = await run("{ projects(status: BOGUS) { slug } }");
  expect(res.errors?.length).toBeGreaterThan(0);
});`;

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
          I build production software for people who work in real time. For three years I have
          owned Door2Door, a platform for field teams, from the React dashboard and backend
          integrations to releases and support. I am also building its offline mobile app.
        </p>
        <dl className="facts">
          <dt>Based in</dt>
          <dd>{me.location}, can work on site</dd>
          <dt>Status</dt>
          <dd>{me.workAuthorization}</dd>
          <dt>Contact</dt>
          <dd>
            <a href={`mailto:${me.email}`}>{me.email}</a> ·{" "}
            <a href={`tel:+1${me.phone.replace(/-/g, "")}`}>{me.phone}</a>
          </dd>
          <dt>Code</dt>
          <dd>
            <a href={me.github}>github.com/yalmeidarj</a> · this site is{" "}
            <a href="https://github.com/yalmeidarj/yalmeida.dev">open source</a>
          </dd>
        </dl>
        <nav aria-label="Page sections">
          <a href="#door2door">Door2Door</a>
          <a href="#case-study">Case study</a>
          <a href="#nerdypup">NerdyPup</a>
          <a href="#why">Why Presto</a>
          <a href="#evidence">Evidence</a>
          <a href="/resume">Resume</a>
        </nav>
      </header>

      <main id="main">
        <section id="door2door" aria-labelledby="d2d-h">
          <p className="kicker">01</p>
          <h2 id="d2d-h">Door2Door, a production operations platform</h2>
          <p>
            Door2Door replaced TDX&rsquo;s spreadsheets in 2023. Its fiber sales teams have used
            it daily since. Admins run sites, streets and houses in a live dashboard; agents
            record visits from a mobile app.
          </p>
          <p>
            I own the product, code, integrations, releases and support. The source is private
            because it carries customer data. The counts below come from a production snapshot.
          </p>
          <dl className="facts" aria-label="Door2Door production numbers">
            {stats.map((s) => (
              <div key={s.label} style={{ display: "contents" }}>
                <dt>{s.label}</dt>
                <dd>
                  <strong>{s.value}</strong> <span className="muted">{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="small muted">
            Counted on October 8, 2026. The current backend holds data since a January 2025
            migration; the households figure covers the full run.
          </p>

          {dashboardShots.length > 0 && (
            <div className="shots wide">
              {dashboardShots.map((s) => (
                <figure key={s.src}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    sizes="(max-width: 40rem) 90vw, 44rem"
                  />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}

          <h3>What the web dashboard does</h3>
          <ul className="plain">
            <li>
              <strong>Live operations.</strong> Dispatchers see agents clock in, move and take
              breaks on a map and a list. Inactivity detection flags a stalled agent before the
              agent calls.
            </li>
            <li>
              <strong>House records.</strong> Filter thousands of records layered from the
              client&rsquo;s Salesforce and ArcGIS FieldMaps data by street, status or agent.
              KPI charts and spreadsheet exports.
            </li>
            <li>
              <strong>Configurable forms.</strong> Admins build forms, publish fixed versions and
              assign them per site. The case study below covers the design.
            </li>
            <li>
              <strong>Verified identity.</strong> Every backend call checks a short-lived signed
              token, never an id the client sends. Enforcement went live on October 7, 2026,
              with a one-command rollback.
            </li>
          </ul>

          <h3>Working with the people who use it</h3>
          <p>
            I am the only developer, but not the only decision-maker. Ops sits a few desks away
            and I handle their IT support, so a confusing screen reaches me the same day.
          </p>
          <p>
            Field managers ask for campaign rules (a photo only on a final yes, a resident
            signature for one client). The client&rsquo;s GIS team needs photos returned to
            their FieldMaps system in their format, and house records must stay in sync with
            their Salesforce. I work out requirements with all three groups and write specs
            before building. The form builder exists so they can change rules without waiting
            for me.
          </p>

          <h3>The companion mobile app</h3>
          <p>
            Agents need to save visits without a signal. The companion app stores them locally,
            queues syncs, handles conflicts and shows pending or failed writes, so an agent
            trusts what was saved.
          </p>
          <p>
            One bug made house saves fail only during active shifts. GPS, sync and the
            agent&rsquo;s edits were competing for SQLite writes under React Native&rsquo;s new
            architecture. I routed every write through one helper and left reads concurrent.
          </p>
          <div className="shots">
            <figure>
              <Image
                src="/images/d2d-mobile-map.png"
                alt="Door2Door mobile app showing a street's houses on a map of Toronto, with an active shift timer and status filters"
                width={1080}
                height={2220}
                sizes="(max-width: 40rem) 90vw, 14rem"
              />
              <figcaption>Street view on a map, filtered by outcome, shift timer running.</figcaption>
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
          <p className="stack">
            Web: {d2d.stack.join(" · ")}. Mobile: {d2dMobile.stack.join(" · ")}. Product site:{" "}
            <a href={d2d.url}>door2door.systems</a>.
          </p>
        </section>

        <section id="case-study" aria-labelledby="cs-h">
          <p className="kicker">02</p>
          <h2 id="cs-h">Case study: one form, many clients</h2>
          <h3>The problem</h3>
          <p>
            Every client rule change needed a deploy. Door2Door&rsquo;s hardcoded form, a React
            component with Zod validation, had begun collecting exceptions: a photo required on
            a consent, photos blocked from one client&rsquo;s GIS sync, a signature required for
            another campaign.
          </p>
          <p>
            The first site-specific exception had already become a database column. Reports also
            depended on display labels, so rewording a field could break a chart.
          </p>
          <h3>Options I considered</h3>
          <ul className="plain">
            <li>
              <strong>More flags.</strong> Cheapest, but every new rule would still be my code,
              and the flags were already breeding.
            </li>
            <li>
              <strong>Free-form JSON with browser-only validation.</strong> Quick to build, but
              the server would accept unchecked answers, editing a form could change the meaning
              of old submissions, and the integrations need answers in existing columns.
            </li>
            <li>
              <strong>Versioned forms with shared validation.</strong> More work up front. This
              is what I built.
            </li>
          </ul>
          <h3>What I built</h3>
          <ul className="plain">
            <li>
              <strong>Publish without disturbing agents.</strong> Admins edit drafts, publish
              immutable versions and assign them per organization or per site. Drafts are never
              visible in the field.
            </li>
            <li>
              <strong>Run the same rules twice.</strong> One dependency-free evaluator checks
              answers in the browser and again on the server. One place to change a rule.
            </li>
            <li>
              <strong>Type-check at publish time.</strong> Rules are data with predicates, such
              as photo required when status equals a final yes. Publishing converts values typed
              in the UI to the referenced field&rsquo;s type.
            </li>
            <li>
              <strong>Keep integrations and reports working.</strong> Answers land in whitelisted
              house columns or a custom-answer bag. KPIs bind to stable keys, so renaming a label
              no longer breaks a chart.
            </li>
            <li>
              <strong>Make retries safe.</strong> One transaction validates against the assigned
              version, patches the house, projects KPIs and writes an immutable audit row. A
              client-generated id dedupes an offline retry instead of double-counting it.
            </li>
            <li>
              <strong>Keep rollback available.</strong> A seeding script reproduces the old form
              as version one, and an environment flag keeps the legacy path in the tree.
            </li>
          </ul>
          <h3>Outcome</h3>
          <p>
            The signature requirement arrived this week without touching the submission
            pipeline. It needed a new field type, a rule kind and evaluator tests.
          </p>
          <p>
            The engine merged on October 4, 2026 after a parity pass against the legacy screens.
            Rollback is one variable away. Telemetry counts submissions, dedup hits and
            projection errors, so it tells on itself before anyone reports it.
          </p>
        </section>

        <section id="nerdypup" aria-labelledby="pup-h">
          <p className="kicker">03</p>
          <h2 id="pup-h">NerdyPup, an independent product</h2>
          <p>
            NerdyPup is my shared dog-care app for households and sitters, in closed testing on
            Google Play. It combines a live shared log, timers, reminders and a Pro assistant.
          </p>
          <p>
            I handle design, the app, the backend, billing, notifications and support copy. iOS
            is next.
          </p>
          <p>Decisions behind the app:</p>
          <ul className="plain">
            <li>
              <strong>Access follows dog membership.</strong> Every query and mutation checks
              the caller&rsquo;s membership for that dog. Owners can remove members; nobody can
              remove the owner.
            </li>
            <li>
              <strong>Reminders fire once.</strong> Selecting due reminders, scheduling pushes
              and advancing the next-fire time happen in one transaction, so overlapping cron
              runs cannot schedule duplicates.
            </li>
            <li>
              <strong>Push delivery is best-effort.</strong> Every push ticket is inspected and
              unregistered device tokens are revoked. The log in the app is the source of truth,
              not the notification.
            </li>
            <li>
              <strong>The assistant has a fallback.</strong> The primary model gets ten seconds,
              then a second provider takes over on any failure. If both fail, the app shows an
              error. I test subscription access by switching sandbox entitlements on a device.
            </li>
          </ul>
          <p>
            Before a feature reaches store or website copy, I check it in code and on a device
            and record the result in a product-facts ledger. Those checks have caught defects I
            fixed before testers reached them.
          </p>
          <p className="stack">
            Stack: {pup.stack.join(" · ")}. Site: <a href={pup.url}>nerdypup.app</a>.
          </p>
        </section>

        <section id="why" aria-labelledby="why-h">
          <p className="kicker">04</p>
          <h2 id="why-h">Why Presto</h2>
          <p>
            Before I wrote software I worked in hotels and restaurants around Sugarloaf in Rio
            de Janeiro. I know the noise at peak hour and what a wrong order costs. Presto builds
            for the people I used to work beside, which is why this posting got a page and not
            just a resume.
          </p>
          <p>
            Door2Door has its own pressures: agents in the rain, poor signal, dispatchers acting
            on live data. I am used to working out requirements with the people doing the job,
            then building and supporting the result.
          </p>
          <p>
            I also use AI daily, in products and in my coding tools. The assistants and provider
            fallbacks above reflect how I treat it: a useful tool that still needs a plan for
            failure.
          </p>
        </section>

        <section id="evidence" aria-labelledby="ev-h">
          <p className="kicker">05</p>
          <h2 id="ev-h">Evidence you can check</h2>

          <h3>A test, and why it exists</h3>
          <p>
            A rule bug could block submissions across a whole site, and rules are written by
            admins. This Door2Door test checks that a signature is required only for the matching
            status, and that providing it lets the submission through.
          </p>
          <pre className="code" tabIndex={0}>
            <code>{evaluatorTest}</code>
          </pre>
          <p>
            Every push to this site runs tests, a typecheck and a production build in GitHub
            Actions. This case checks that the API rejects a bad enum instead of returning
            everything:
          </p>
          <pre className="code" tabIndex={0}>
            <code>{enumTest}</code>
          </pre>
          <p className="small muted">
            Source:{" "}
            <a href="https://github.com/yalmeidarj/yalmeida.dev/blob/main/lib/schema.test.ts">
              lib/schema.test.ts
            </a>{" "}
            · <a href="https://github.com/yalmeidarj/yalmeida.dev/actions">workflow runs</a>
          </p>

          <h3 id="graphql">GraphQL, honestly</h3>
          <p>
            GraphQL is a gap in my recent production work. I used it on freelance projects a few
            years ago and it is not in my current stack. This site&rsquo;s API is a working
            example instead of a claim: one endpoint serves the page content, the production
            counts and the requirement map.
          </p>
          <ul className="plain">
            <li>
              <strong>Why Yoga.</strong> It fits a Next.js route handler on Node, includes
              GraphiQL, and the tests call it in-process without a network.
            </li>
            <li>
              <strong>Structure.</strong> Resolvers read one typed data module. Enums constrain
              project status and evidence level.
            </li>
            <li>
              <strong>Tests.</strong> Eight Vitest cases cover filters, unknown slugs, invalid
              enums, the stats query and browser access to GraphiQL.
            </li>
            <li>
              <strong>Limits.</strong> This demo does not exercise generated types, normalized
              caching, cursor pagination, field-level partial errors or schema deprecations. I
              would need to learn your conventions for those.
            </li>
          </ul>
          <GraphqlPlayground />

          <h3>Open source and recent activity</h3>
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

          <details className="map-wrap">
            <summary>Your posting, requirement by requirement</summary>
            <p className="small muted">
              Where I have done each item in the posting. One is a gap and is marked as one.
            </p>
            <table className="map">
              <tbody>
                {requirements.map((r) => (
                  <tr key={r.id}>
                    <th scope="row">
                      {r.requirement}
                      {r.level === "HONEST_GAP" && (
                        <>
                          <br />
                          <span className="level level-HONEST_GAP">Gap</span>
                        </>
                      )}
                    </th>
                    <td>{r.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </section>

        <section id="contact" aria-labelledby="contact-h">
          <h2 id="contact-h">Next step</h2>
          <p>
            I would like to show you Door2Door live.{" "}
            <a href={`mailto:${me.email}`}>Email me</a>, call{" "}
            <a href={`tel:+1${me.phone.replace(/-/g, "")}`}>{me.phone}</a>, or read the{" "}
            <a href="/resume">printable resume</a>.
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
