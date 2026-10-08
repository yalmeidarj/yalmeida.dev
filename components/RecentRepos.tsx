import { recentRepos } from "@/lib/github";

function ago(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "a month ago" : `${months} months ago`;
}

export default async function RecentRepos() {
  const repos = await recentRepos("yalmeidarj");
  if (repos.length === 0) {
    return (
      <p className="small muted">
        GitHub is not answering right now. The repositories are at{" "}
        <a href="https://github.com/yalmeidarj">github.com/yalmeidarj</a>.
      </p>
    );
  }
  return (
    <ul className="repos">
      {repos.map((r) => (
        <li key={r.name}>
          <a href={r.html_url}>{r.name}</a>
          {r.description ? <> &middot; {r.description}</> : null}
          <div className="meta">
            {r.language ?? "Mixed"} &middot; pushed {ago(r.pushed_at)}
            {r.stargazers_count > 0 ? <> &middot; {r.stargazers_count} stars</> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
