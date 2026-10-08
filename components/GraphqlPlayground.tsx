"use client";

import { useId, useState } from "react";

const DEFAULT_QUERY = `{
  me { name location workAuthorization }
  projects(status: PRODUCTION) { name since stack }
  door2doorStats { label value }
}`;

export default function GraphqlPlayground() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const textareaId = useId();
  const outputId = useId();

  async function run() {
    setBusy(true);
    setStatus("Running query…");
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      setResult(JSON.stringify(json, null, 2));
      setStatus(json.errors ? "Query returned errors." : "Done.");
    } catch (err) {
      setResult(String(err));
      setStatus("Request failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="playground">
      <label htmlFor={textareaId}>Query (edit it, then run)</label>
      <textarea
        id={textareaId}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
        aria-describedby={outputId}
      />
      <div className="row">
        <button className="btn" type="button" onClick={run} disabled={busy}>
          {busy ? "Running…" : "Run query"}
        </button>
        <span className="small muted" role="status" aria-live="polite">
          {status}
        </span>
        <a className="small" href="/api/graphql" target="_blank" rel="noreferrer">
          Open GraphiQL
        </a>
      </div>
      <pre id={outputId} aria-label="Query result" tabIndex={0}>
        {result || "// Result appears here."}
      </pre>
    </div>
  );
}
