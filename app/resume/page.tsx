import type { Metadata } from "next";
import { me } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Resume",
  description: "Yuri Almeida, full-stack developer in Toronto. Printable resume.",
};

export default function Resume() {
  return (
    <div className="wrap resume">
      <header className="masthead">
        <p className="dateline no-print">
          <a href="/">Back to the application</a> · Use your browser&rsquo;s print dialog to save as PDF
        </p>
        <h1>{me.name}</h1>
        <p>
          Full-stack developer · {me.location} · {me.workAuthorization}
        </p>
        <p className="small">
          <a href={`mailto:${me.email}`}>{me.email}</a> · {me.phone} ·{" "}
          <a href={me.github}>github.com/yalmeidarj</a> · <a href={me.site}>yalmeida.dev</a>
        </p>
      </header>

      <main id="main">
        <h2>Summary</h2>
        <p>
          Three years owning a production React and Node platform for field teams, from the
          frontend and REST integrations to releases and support. I work out requirements with
          ops, field managers and the client&rsquo;s data teams. Earlier hospitality work in Rio
          informs how I build for people under pressure.
        </p>

        <h2>Skills</h2>
        <p>
          <strong>Frontend:</strong> React 19, Next.js 15 App Router, TypeScript, HTML, CSS,
          Tailwind, shadcn/ui and Radix, React Native and Expo, responsive and accessible UI.
          <br />
          <strong>Backend and APIs:</strong> Node.js, Convex, REST integrations (Salesforce,
          ArcGIS, Stripe, RevenueCat, Expo Push, Geocodio), GraphQL (GraphQL Yoga), NextAuth,
          JWT, PostgreSQL and Prisma, SQLite, Python.
          <br />
          <strong>Practice:</strong> Vitest, GitHub Actions, Vercel, EAS and Gradle release
          builds, Git, written specs and architecture docs, AI tooling (Vercel AI SDK, MCP).
        </p>

        <h2>Experience</h2>
        <article className="job">
          <header>
            <strong>Full-stack developer and IT support, TDX-Management (Door2Door)</strong>
            <span>Toronto · May 2023 to present</span>
          </header>
          <ul className="plain">
            <li>
              Replaced the company&rsquo;s spreadsheet workflow with Door2Door, a multi-tenant
              canvassing platform (Next.js, React, Convex, NextAuth) in daily use by field teams:
              120,000+ households engaged since launch, 88 sites, 1,880 agent shifts and 56,000
              audited house edits in the current backend alone.
            </li>
            <li>
              Built a real-time admin dashboard: live agent map, shift and break tracking,
              inactivity detection, KPI charts, filterable house and street views, spreadsheet
              exports.
            </li>
            <li>
              Designed and shipped a versioned, admin-configurable form engine with an atomic,
              idempotent, audited submission pipeline, so rule changes requested by field
              managers no longer need a deploy. Case study at yalmeida.dev.
            </li>
            <li>
              Gather requirements directly from the ops team, field managers and the
              client&rsquo;s GIS and Salesforce stakeholders; write specs before building.
            </li>
            <li>
              Integrated Salesforce and ArcGIS FieldMaps for house records and photo sync;
              Stripe for billing.
            </li>
            <li>
              Hardened authorization: JWT-based identity for every backend call, rolled out to
              production behind a reversible flag.
            </li>
            <li>
              Building the offline-first mobile app (Expo, SQLite sync queue, background GPS,
              camera) now shipping to agents.
            </li>
            <li>Day-to-day IT support for the team of about 15.</li>
          </ul>
        </article>

        <article className="job">
          <header>
            <strong>Founder and developer, NerdyPup</strong>
            <span>Toronto · 2026 to present</span>
          </header>
          <ul className="plain">
            <li>
              Shared dog-care app for households and sitters: Expo Router, NativeWind, Clerk,
              Convex, RevenueCat, Expo Push; marketing site on Next.js 16. In closed testing on
              Google Play.
            </li>
            <li>
              Pro assistant on Claude with a fallback model and timeouts; reminders with cron,
              per-user subscriptions and push; webhooks for external logging.
            </li>
          </ul>
        </article>

        <article className="job">
          <header>
            <strong>Hospitality, hotels and restaurants</strong>
            <span>Rio de Janeiro · 2009 to 2013</span>
          </header>
          <ul className="plain">
            <li>
              Guest-facing roles in tourist-area hotels and restaurants near Sugarloaf. Fast,
              noisy, customer-facing work; the reason I care about order accuracy.
            </li>
          </ul>
        </article>

        <h2>Open source</h2>
        <ul className="plain">
          <li>
            <strong>claude-proxy</strong> (Python): HTTP proxy that routes Claude Code through
            alternative LLM providers with automatic failover.
          </li>
          <li>
            <strong>mcp-football-server</strong> (TypeScript): MCP server exposing football data
            to LLM agents.
          </li>
          <li>
            <strong>auto-notifier</strong> (Python, PyPI): decorator and context-manager desktop
            notifications when scripts finish or fail.
          </li>
        </ul>

        <h2>Education</h2>
        <p>Seneca Polytechnic, Toronto: software development coursework (two semesters).</p>
        <p className="small muted">Languages: English, Portuguese (native).</p>
      </main>
    </div>
  );
}
