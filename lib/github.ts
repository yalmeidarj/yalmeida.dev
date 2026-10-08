export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
};

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
    return repos.filter((r) => !r.fork).slice(0, limit);
  } catch {
    return [];
  }
}
