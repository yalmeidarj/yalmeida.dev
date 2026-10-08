import { describe, expect, it } from "vitest";
import { createPortfolioYoga, query } from "./yoga";
import { projects, requirements } from "./portfolio";

const yoga = createPortfolioYoga();
const run = <T,>(source: string, variables?: Record<string, unknown>) =>
  query<T>(yoga, source, variables);

describe("portfolio GraphQL API", () => {
  it("returns the applicant", async () => {
    const res = await run<{ me: { name: string; location: string } }>("{ me { name location } }");
    expect(res.errors).toBeUndefined();
    expect(res.data?.me).toEqual({ name: "Yuri Almeida", location: "Toronto, ON" });
  });

  it("lists every project when no filter is given", async () => {
    const res = await run<{ projects: { slug: string }[] }>("{ projects { slug } }");
    expect(res.errors).toBeUndefined();
    expect(res.data?.projects).toHaveLength(projects.length);
  });

  it("filters projects by status", async () => {
    const res = await run<{ projects: { slug: string; status: string }[] }>(
      "query($s: ProjectStatus) { projects(status: $s) { slug status } }",
      { s: "PRODUCTION" },
    );
    expect(res.errors).toBeUndefined();
    const list = res.data?.projects ?? [];
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((p) => p.status === "PRODUCTION")).toBe(true);
  });

  it("returns null for an unknown project slug", async () => {
    const res = await run<{ project: null }>('{ project(slug: "nope") { slug } }');
    expect(res.errors).toBeUndefined();
    expect(res.data?.project).toBeNull();
  });

  it("exposes the requirement map, including the honest gap", async () => {
    const res = await run<{ requirements: { id: string }[] }>(
      "{ requirements(level: HONEST_GAP) { id } }",
    );
    expect(res.errors).toBeUndefined();
    expect(res.data?.requirements).toEqual([{ id: "graphql" }]);
    expect(requirements.filter((r) => r.level === "HONEST_GAP")).toHaveLength(1);
  });

  it("rejects an invalid enum value", async () => {
    const res = await run("{ projects(status: BOGUS) { slug } }");
    expect(res.errors?.length).toBeGreaterThan(0);
  });

  it("serves GraphiQL on GET for browsers", async () => {
    const res = await yoga.fetch("http://localhost/api/graphql", {
      headers: { accept: "text/html" },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
  });
});
