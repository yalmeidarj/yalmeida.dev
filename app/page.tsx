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
          I build production software for people who work in real time: dispatchers watching a
          live map, agents at a door, a household sharing one dog. Three years owning a field
          operations platform end to end, from the React dashboard to the backend integrations
          to the offline mobile app.
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
          <p>{d2d.summary}</p>
          <p>
            {d2d.role} The company moved from spreadsheets to it in 2023 and has run on it
            since. The source is private because it carries customer data; the numbers below
            are table counts from a production snapshot, not estimates.
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
              <strong>Live operations.</strong> An agent map and list that update as people
              clock in, move and go on break, with inactivity detection so a dispatcher sees a
              stalled agent before the agent calls.
            </li>
            <li>
              <strong>Data-heavy views.</strong> Thousands of house records layered from the
              client&rsquo;s Salesforce and ArcGIS FieldMaps data, filterable by street, status
              and agent, with KPI charts and spreadsheet exports.
            </li>
            <li>
              <strong>Admin-configurable forms.</strong> The door-knock form is designed in a
              builder, published as immutable versions and assigned per site. The case study
              below is about this.
            </li>
            <li>
              <strong>Authorization from a verified identity.</strong> Every backend call is
              checked against a short-lived signed token, never an id the client sends. Enforce
              mode went live on October 7, 2026 behind a compat flag that rolls back in one
              command.
            </li>
          </ul>

          <h3>Working with the people who use it</h3>
          <p>
            I am the only developer, but not the only decision-maker. The ops team sits a few
            desks away and I also do their IT support, so I hear about a confusing screen the
            same day. Field managers ask for rules (a photo only on a final yes, a resident
            signature for one client&rsquo;s campaign). The client&rsquo;s GIS team sends house
            lists from their FieldMaps system and expects photo evidence back in it, in their
            format and with their flags. House records have to stay in sync with the
            client&rsquo;s Salesforce. Most of what I build is negotiated between those three
            groups, and the form builder exists precisely because I did not want to be the
            bottleneck every time a rule changed.
          </p>

          <h3>The companion mobile app</h3>
          <p>
            {d2dMobile.summary} The hard part was not the UI. It was making saves trustworthy
            when the GPS stream, the sync pusher and the agent&rsquo;s edits all write to the
            same local database: house saves failed only while a shift was active, which turned
            out to be lock contention under React Native&rsquo;s new architecture. The fix was
            to serialize writes through one helper and leave reads concurrent.
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
            Door2Door started with one door-knock form, hardcoded as a React component with its
            validation in Zod schemas. Every client got the same fields and the same rules. Then
            the rules diverged: one campaign needed a photo only on a consent, another was not
            allowed to push photos to the client&rsquo;s GIS at all, a third wanted a signature.
            Each change was a deploy, each client-specific branch lived inside the component, and
            the first per-site exception had already leaked into the database as a boolean column
            on the site table. Reports also broke whenever a label was reworded, because the
            analytics keyed on the label.
          </p>
          <h3>Options I considered</h3>
          <ul className="plain">
            <li>
              <strong>More flags.</strong> Keep the hardcoded form and add per-site switches.
              Cheapest, but every rule is still my code, and the flags were already breeding.
            </li>
            <li>
              <strong>A free-form JSON form with client-side validation.</strong> Fast to
              build, but the server would accept anything, historical submissions would lose
              their meaning when a form changed, and the Salesforce and ArcGIS syncs depend on
              answers landing in real columns.
            </li>
            <li>
              <strong>Versioned definitions with one shared evaluator.</strong> More work up
              front, and the one I built.
            </li>
          </ul>
          <h3>What I built</h3>
          <ul className="plain">
            <li>
              Admins compose a form from fields, rules and KPI bindings in a builder. Saving a
              draft changes nothing for agents. Publishing snapshots the draft into an immutable
              version; assigning picks the version per organization or per site.
            </li>
            <li>
              A dependency-free module holds the types and the rule evaluator. The React renderer
              runs it for inline validation; the submit mutation runs the same code again on the
              server. One place to change a rule, no drift.
            </li>
            <li>
              Rules are data with predicates (&ldquo;photo required when status equals Consent
              Final Yes&rdquo;). Predicate values typed in the UI are strings, so publishing
              coerces them to the referenced field&rsquo;s type instead of relying on loose
              comparisons at submit time.
            </li>
            <li>
              Each field declares where its answer lives: a whitelisted house column, which keeps
              the integrations and legacy queries working, or a custom-answer bag for everything
              else. KPIs bind to semantic keys, so renaming a label no longer breaks a chart.
            </li>
            <li>
              Submission is one transaction: validate against the currently assigned version,
              re-run the rules, patch the house, project KPIs, write an immutable audit row. It is
              idempotent on a client-generated id, so an offline retry from a phone is deduped
              rather than double-counted.
            </li>
            <li>
              The old form stayed in the tree behind one environment flag, and a seeding script
              reproduces the legacy schema as the first version, so the cutover was reversible
              and started from parity rather than a redesign.
            </li>
          </ul>
          <h3>Outcome</h3>
          <p>
            The engine merged on October 4, 2026 after a parity pass against the legacy screens,
            with the legacy path one variable away. Telemetry counts submissions, dedup hits and
            projection errors so I can see it misbehave before anyone reports it. This week the
            resident signature arrived as a new field type and a new rule kind, tested in the
            evaluator, without touching the submission pipeline. That is the test I wanted the
            design to pass.
          </p>
        </section>

        <section id="nerdypup" aria-labelledby="pup-h">
          <p className="kicker">03</p>
          <h2 id="pup-h">NerdyPup, an independent product</h2>
          <p>
            {pup.summary} It is my own product, built to prove I can take a consumer app from an
            idea to a store listing: design, backend, billing, notifications, support copy. It is
            in closed testing on Google Play with iOS next.
          </p>
          <p>Decisions that mattered more than the feature list:</p>
          <ul className="plain">
            <li>
              <strong>Authorization is per dog, not per user.</strong> Every query and mutation
              resolves the caller from the auth provider, then looks up their membership row for
              that dog on an indexed pair. No membership, no data. Owners can remove members;
              nobody can remove the owner; a membership id has to belong to the dog it is being
              removed from.
            </li>
            <li>
              <strong>Reminders cannot double-fire.</strong> A cron runs a single mutation that
              selects reminders due by an index on status and next-fire time, schedules the push
              and advances the next-fire time in the same transaction. The database&rsquo;s
              serializable mutations make two overlapping runs impossible to observe.
            </li>
            <li>
              <strong>Push failures are handled, not ignored.</strong> Every push ticket is
              inspected; a device that reports itself unregistered has its token revoked so the
              app stops retrying a dead phone. Delivery is best-effort by design, and the log in
              the app is the source of truth, not the notification.
            </li>
            <li>
              <strong>The AI feature degrades, it does not hang.</strong> The Pro assistant calls
              the primary model with a ten-second abort, falls back to a second provider on any
              failure, and surfaces an error if both fail. The feature is gated by a subscription
              entitlement, which I test by switching sandbox entitlement states on a device.
            </li>
          </ul>
          <p>
            Before any feature goes into store copy or the marketing site I check it against the
            code and on a device and record the result in a product-facts ledger. Several entries
            are defects I found in my own work and fixed before testers hit them.
          </p>
          <p className="stack">
            Stack: {pup.stack.join(" · ")}. Site: <a href={pup.url}>nerdypup.app</a>.
          </p>
        </section>

        <section id="why" aria-labelledby="why-h">
          <p className="kicker">04</p>
          <h2 id="why-h">Why Presto</h2>
          <p>
            Before I wrote software I worked in hospitality in Rio de Janeiro, in hotels and
            restaurants around Sugarloaf. I know what a loud counter at peak hour feels like and
            what a wrong order costs. Presto builds for the people I used to work beside, in the
            noisy, customer-facing environment your posting describes.
          </p>
          <p>
            Field canvassing is the same kind of problem: agents on phones in the rain, bad
            signal, a dispatcher watching a live map, data someone will act on. The interfaces
            have to be fast, obvious and correct. That is the work I like, and it is why a
            real-time dashboard for restaurant operators is the posting I wanted to answer
            properly rather than with a resume alone.
          </p>
          <p>
            I also build with AI every day, inside products (an assistant in the Door2Door
            dashboard, the NerdyPup assistant) and in my workflow (a proxy that keeps coding
            agents running when a provider goes down). I treat it as a tool with failure modes,
            which is why the fallbacks above exist.
          </p>
        </section>

        <section id="evidence" aria-labelledby="ev-h">
          <p className="kicker">05</p>
          <h2 id="ev-h">Evidence you can check</h2>

          <h3>A test, and why it exists</h3>
          <p>
            This is from the Door2Door evaluator suite. Rules are authored by admins, so a bug in
            predicate matching would block submissions for a whole site. The test pins the
            conditional case: block only when the status matches and the signature is missing,
            and never when the status is something else.
          </p>
          <pre className="code" tabIndex={0}>
            <code>{evaluatorTest}</code>
          </pre>
          <p>
            This site has its own suite, run by GitHub Actions on every push along with a
            typecheck and a production build. One of its cases checks that the API refuses a
            bad enum instead of silently returning everything:
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
            Your posting asks for GraphQL. I used it on freelance work a few years ago and it is
            not in my current stack, so rather than list it I built this page&rsquo;s API with
            it. The page data, the production numbers and the requirement map are all served by
            a GraphQL endpoint on this site.
          </p>
          <ul className="plain">
            <li>
              <strong>Why GraphQL Yoga.</strong> It runs on the standard fetch API, so it fits a
              Next.js route handler on Node without an adapter, ships GraphiQL, and tests can
              call the server in-process with no network.
            </li>
            <li>
              <strong>How it is organized.</strong> The content lives in one typed data module.
              The schema is SDL plus resolvers that read that module, with enums for the states
              that matter (project status, evidence level). The route handler is three lines.
            </li>
            <li>
              <strong>How it is checked.</strong> Eight Vitest cases cover filters, null for an
              unknown slug, enum rejection, the stats query and GraphiQL on GET for a browser.
            </li>
            <li>
              <strong>What I would do differently against a large production API.</strong>{" "}
              Generate types from the schema, use a client with a normalized cache and cursor
              pagination, handle partial errors per field instead of per request, and evolve the
              schema with deprecations rather than versions. Those are the parts this demo does
              not exercise, and I would expect to learn your conventions for them in the first
              weeks.
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
