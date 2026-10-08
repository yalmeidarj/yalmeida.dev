export type ProjectStatus = "PRODUCTION" | "SHIPPING" | "TESTING" | "OPEN_SOURCE";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  summary: string;
  role: string;
  stack: string[];
  url?: string;
  repo?: string;
  since: string;
};

export type Requirement = {
  id: string;
  requirement: string;
  evidence: string;
  level: "STRONG" | "SOLID" | "HONEST_GAP";
};

export const me = {
  name: "Yuri Almeida",
  title: "Full-stack developer",
  location: "Toronto, ON",
  email: "yalmeida.rj@gmail.com",
  phone: "647-632-6597",
  github: "https://github.com/yalmeidarj",
  site: "https://yalmeida.dev",
  workAuthorization: "Canadian permanent resident",
};

export type Stat = { label: string; value: string; note: string };

// Counted from a production database snapshot taken 2026-10-08. The current
// backend holds data since the January 2025 migration; the 120,000+ households
// figure covers the full run since 2023.
export const stats: Stat[] = [
  { label: "Households engaged", value: "120,000+", note: "since 2023, across both backends" },
  { label: "Sites", value: "88", note: "neighbourhood-scale canvassing areas" },
  { label: "House records", value: "12,900", note: "each with a per-visit status" },
  { label: "Agent shifts", value: "1,880", note: "4,170 tracked hours" },
  { label: "Audited house edits", value: "56,000", note: "every change logged with who and when" },
];

export type Shot = { src: string; alt: string; caption: string; width: number; height: number };

// Anonymized screenshots of the Door2Door web dashboard. Drop files in
// public/images/ and add an entry; the section renders nothing while empty.
// Wanted: live agent map, filterable house table, form builder, a loading/empty/error state.
export const dashboardShots: Shot[] = [];

export const projects: Project[] = [
  {
    slug: "door2door",
    name: "Door2Door",
    status: "PRODUCTION",
    summary:
      "Multi-tenant platform for door-to-door field sales. Admins run sites, streets and houses from a real-time web dashboard; agents log visits from a mobile app. In daily production use by TDX fiber sales teams since 2023.",
    role: "I own it end to end: product decisions, frontend, backend, auth, integrations, releases and support.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Convex", "NextAuth", "shadcn/ui", "Tailwind", "Leaflet", "Recharts", "Stripe", "Vitest", "Vercel"],
    url: "https://www.door2door.systems",
    since: "2023",
  },
  {
    slug: "door2door-mobile",
    name: "Door2Door mobile",
    status: "SHIPPING",
    summary:
      "Offline-first field agent app. Local SQLite with a sync queue, conflict handling, background GPS during shifts, native camera, and a visible pending/failed mutation state so agents trust what was saved.",
    role: "Sole developer.",
    stack: ["Expo", "React Native", "TypeScript", "expo-sqlite", "react-native-maps", "Convex"],
    since: "2026",
  },
  {
    slug: "nerdypup",
    name: "NerdyPup",
    status: "TESTING",
    summary:
      "Shared dog-care tracker for households and sitters. One-tap logging, a live shared timeline, duration timers, reminders with push, webhooks, and a Pro tier with an AI assistant. Closed testing on Google Play.",
    role: "Sole developer of the app, backend, and marketing site.",
    stack: ["Expo Router", "React Native", "NativeWind", "Clerk", "Convex", "RevenueCat", "Expo Push", "Next.js 16"],
    url: "https://www.nerdypup.app",
    since: "2026",
  },
  {
    slug: "claude-proxy",
    name: "claude-proxy",
    status: "OPEN_SOURCE",
    summary:
      "Lightweight HTTP proxy that routes Claude Code requests through alternative LLM providers with automatic failover on rate limits or outages.",
    role: "Author.",
    stack: ["Python"],
    repo: "https://github.com/yalmeidarj/claude-proxy",
    since: "2026",
  },
  {
    slug: "mcp-football-server",
    name: "mcp-football-server",
    status: "OPEN_SOURCE",
    summary: "MCP server exposing football data to LLM agents.",
    role: "Author.",
    stack: ["TypeScript", "Node.js"],
    repo: "https://github.com/yalmeidarj/mcp-football-server",
    since: "2025",
  },
  {
    slug: "auto-notifier",
    name: "auto-notifier",
    status: "OPEN_SOURCE",
    summary:
      "Python package on PyPI: decorator and context-manager APIs that fire a desktop notification when a script finishes or fails.",
    role: "Author.",
    stack: ["Python"],
    repo: "https://github.com/yalmeidarj/auto-notifier",
    since: "2025",
  },
];

export const requirements: Requirement[] = [
  {
    id: "html-css-js",
    requirement: "Hands-on HTML, CSS and JavaScript",
    evidence:
      "Every project here, plus this page: hand-written semantic HTML and CSS, no UI framework, light and dark themes from system preference.",
    level: "STRONG",
  },
  {
    id: "react",
    requirement: "Production React",
    evidence:
      "Door2Door dashboard: React 19 and Next.js 15 App Router, in daily use by field teams since 2023. Reusable component library on shadcn/ui, Convex hooks for live state.",
    level: "STRONG",
  },
  {
    id: "node",
    requirement: "Node.js for tooling, services or full-stack work",
    evidence:
      "Next.js route handlers, release and data scripts, Convex functions in TypeScript, and this site's GraphQL server running on Node.",
    level: "STRONG",
  },
  {
    id: "rest",
    requirement: "REST API integration",
    evidence:
      "Salesforce, ArcGIS FieldMaps, Geocodio, Expo Push, RevenueCat and Stripe integrations in Door2Door and NerdyPup. The GitHub activity on this page comes from the GitHub REST API.",
    level: "STRONG",
  },
  {
    id: "graphql",
    requirement: "GraphQL API integration",
    evidence:
      "Used on freelance work a few years back, not in my current stack. So instead of claiming it, this site exposes its own GraphQL API built with GraphQL Yoga, and the playground above queries it.",
    level: "HONEST_GAP",
  },
  {
    id: "fundamentals",
    requirement: "Software fundamentals: data structures, debugging, testing",
    evidence:
      "Vitest suites on the pure server logic (form evaluator, identity resolution, stats). One debugging story: house saves failing only mid-shift turned out to be SQLite lock contention with the GPS writer on React Native's new architecture, fixed by serializing all writers through one helper.",
    level: "SOLID",
  },
  {
    id: "responsive",
    requirement: "Responsive and mobile-first design",
    evidence:
      "Door2Door agents used the web dashboard on phones for two years before the native app existed. This page is written mobile-first.",
    level: "STRONG",
  },
  {
    id: "a11y",
    requirement: "Accessibility (WCAG 2.1)",
    evidence:
      "This page: landmarks, skip link, visible focus states, 4.5:1 contrast in both themes, no information carried by color alone, reduced-motion respected. Form components in Door2Door use labelled Radix primitives.",
    level: "SOLID",
  },
  {
    id: "ambiguity",
    requirement: "Thrives in fast-paced, ambiguous startup environments",
    evidence:
      "Three years owning a product real teams depend on daily, with requirements arriving from ops, field managers and a client's GIS team rather than a spec: I scope it, build it, ship it, and answer the phone when it breaks.",
    level: "STRONG",
  },
  {
    id: "communication",
    requirement: "Strong written and verbal communication",
    evidence:
      "Door2Door has an architecture overview, a forms-engine spec and a dashboard redesign spec written for the next engineer. NerdyPup keeps a product-facts ledger: no claim goes into marketing copy unless it is verified in code or on a device.",
    level: "SOLID",
  },
  {
    id: "cicd",
    requirement: "Nice to have: CI/CD (GitHub Actions)",
    evidence:
      "This site runs typecheck, tests and a build in GitHub Actions on every push, with Vercel preview deployments per branch. Mobile releases use scripted EAS and Gradle builds.",
    level: "SOLID",
  },
  {
    id: "realtime",
    requirement: "Nice to have: real-time or data-heavy dashboards",
    evidence:
      "Door2Door's admin dashboard: live agent map and list over Convex subscriptions, shift and inactivity tracking, KPI charts, and spreadsheet exports over house records layered from Salesforce and ArcGIS.",
    level: "STRONG",
  },
  {
    id: "ai-native",
    requirement: "Nice to have: AI-native company experience",
    evidence:
      "Built Dori, an AI assistant inside the Door2Door dashboard on the Vercel AI SDK; NerdyPup's Pro assistant with a model fallback and timeouts; claude-proxy; an MCP server. I use agents daily and know where they break.",
    level: "SOLID",
  },
];
