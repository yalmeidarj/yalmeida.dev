import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const defaultQuery = [
  "# Everything on the page is available here.",
  "{",
  "  me { name title location }",
  "  projects(status: PRODUCTION) { name since stack }",
  "  requirements(level: HONEST_GAP) { requirement evidence }",
  "}",
  "",
].join("\n");

export function createPortfolioYoga() {
  return createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    fetchAPI: { Response },
    graphiql: { title: "yalmeida.dev GraphQL", defaultQuery },
  });
}

export async function query<T = unknown>(
  yoga: ReturnType<typeof createPortfolioYoga>,
  source: string,
  variables?: Record<string, unknown>,
) {
  const res = await yoga.fetch("http://localhost/api/graphql", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ query: source, variables }),
  });
  return (await res.json()) as { data?: T; errors?: { message: string }[] };
}
