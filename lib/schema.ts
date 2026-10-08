import { createSchema } from "graphql-yoga";
import { me, projects, requirements, type ProjectStatus } from "./portfolio";

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

  type Query {
    "The applicant."
    me: Person!
    "Projects, optionally filtered by status."
    projects(status: ProjectStatus): [Project!]!
    "One project by slug."
    project(slug: ID!): Project
    "The Presto posting, requirement by requirement, with where I have done it."
    requirements(level: EvidenceLevel): [Requirement!]!
  }
`;

export const resolvers = {
  Query: {
    me: () => me,
    projects: (_: unknown, args: { status?: ProjectStatus }) =>
      args.status ? projects.filter((p) => p.status === args.status) : projects,
    project: (_: unknown, args: { slug: string }) =>
      projects.find((p) => p.slug === args.slug) ?? null,
    requirements: (_: unknown, args: { level?: string }) =>
      args.level ? requirements.filter((r) => r.level === args.level) : requirements,
  },
};

export const schema = createSchema({ typeDefs, resolvers });
