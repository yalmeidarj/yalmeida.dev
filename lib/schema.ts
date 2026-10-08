import { createSchema } from "graphql-yoga";
import { me, projects, requirements, stats, type ProjectStatus } from "./portfolio";

export const typeDefs = /* GraphQL */ `
  enum ProjectStatus { PRODUCTION SHIPPING TESTING OPEN_SOURCE }
  enum EvidenceLevel { STRONG SOLID HONEST_GAP }

  type Person {
    name: String!
    title: String!
    location: String!
    email: String!
    github: String!
    workAuthorization: String!
  }

  type Project {
    slug: ID!
    name: String!
    status: ProjectStatus!
    summary: String!
    role: String!
    stack: [String!]!
    url: String
    repo: String
    since: String!
  }

  type Requirement {
    id: ID!
    requirement: String!
    evidence: String!
    level: EvidenceLevel!
  }

  type Stat {
    label: String!
    value: String!
    note: String!
  }

  type Query {
    "About Yuri Almeida."
    me: Person!
    "Door2Door production numbers, counted from a database snapshot on 2026-10-08."
    door2doorStats: [Stat!]!
    "Projects, optionally filtered by status."
    projects(status: ProjectStatus): [Project!]!
    "One project by slug."
    project(slug: ID!): Project
    "Development experience, with examples from projects and areas for further learning."
    requirements(level: EvidenceLevel): [Requirement!]!
  }
`;

export const resolvers = {
  Query: {
    me: () => me,
    door2doorStats: () => stats,
    projects: (_: unknown, args: { status?: ProjectStatus }) =>
      args.status ? projects.filter((p) => p.status === args.status) : projects,
    project: (_: unknown, args: { slug: string }) =>
      projects.find((p) => p.slug === args.slug) ?? null,
    requirements: (_: unknown, args: { level?: string }) =>
      args.level ? requirements.filter((r) => r.level === args.level) : requirements,
  },
};

export const schema = createSchema({ typeDefs, resolvers });
