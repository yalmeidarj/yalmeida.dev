# yalmeida.dev

Personal site for Yuri Almeida, featuring selected projects and production work. It is a small Next.js
app with a GraphQL API that serves the same content as the page, a Vitest suite for that
API, and a GitHub Actions workflow that runs on every push.

Live at https://yalmeida.dev. Resume at https://yalmeida.dev/resume. GraphiQL at
https://yalmeida.dev/api/graphql.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest, in-process against the Yoga server
npm run typecheck  # tsc --noEmit
npm run build
```

Node 22 or newer.

## Layout

```
app/
  page.tsx              the portfolio page
  resume/page.tsx       redirect to the resume PDF in public/
  api/graphql/route.ts  GraphQL Yoga mounted on a Next.js route handler
  globals.css           plain CSS: responsive portfolio and printable resume
components/
  GraphqlPlayground.tsx client component; POSTs the query to /api/graphql
  RecentRepos.tsx       server component; GitHub REST API, revalidated hourly
lib/
  portfolio.ts          the content: person, projects, requirement map, production stats
  schema.ts             SDL + resolvers over lib/portfolio.ts
  yoga.ts               createPortfolioYoga() and a query() helper used by the tests
  schema.test.ts        the API tests
  github.ts             recentRepos()
.github/workflows/ci.yml  npm ci, typecheck, test, build
```

The content is one typed module. The page and the GraphQL schema both read it, so there is
one place to change a fact and the tests fail if the schema and the data drift apart.

## The GraphQL API

Schema-first with GraphQL Yoga. `Query` exposes `me`, `projects(status)`, `project(slug)`,
`requirements(level)` and `door2doorStats`. Yoga runs on the fetch API, so the tests call
`yoga.fetch()` directly without starting a server. GraphiQL is served on GET for browsers.

```graphql
{
  me { name location workAuthorization }
  projects(status: PRODUCTION) { name since stack }
  door2doorStats { label value note }
}
```

## Accessibility and performance choices

Semantic landmarks, a skip link, visible focus states, responsive layouts,
no information carried by colour alone, reduced motion respected, no client-side JS except
the playground. No analytics or tracking of any kind.

## Deploying

Vercel, production from `main`. The `www` host is an A record to Vercel; the apex is the
same.
