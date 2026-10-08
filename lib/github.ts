export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
};

const featuredRepos = new Set(["yalmeida.dev", "claude-proxy"]);

export async function recentRepos(user: string, limit = 6): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?sort=pushed&per_page=20`,
      {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "yalmeida.dev" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as Repo[];
    return repos
      .filter((r) => !r.fork && featuredRepos.has(r.name.toLowerCase()))
      .slice(0, limit);
  } catch {
    return [];
  }
}
