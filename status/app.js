async function load() {
  const res = await fetch("./data.json", { cache: "no-store" });
  const data = await res.json();
  document.getElementById("generated").textContent =
    "Generated: " + data.generatedAt + " (" + data.timezone + ")";

  const s = data.summary;
  const summary = document.getElementById("summary");
  summary.innerHTML = [
    ["Overall", s.overall],
    ["OK", s.ok],
    ["Issue", s.issue],
    ["Blocked", s.blocked]
  ].map(([label, value]) => {
    const cls = label === "Overall" ? s.overall : "";
    return `<span class="pill ${cls}">${label}: ${value}</span>`;
  }).join("");

  const root = document.getElementById("checks");
  root.innerHTML = data.checks.map((c) => {
    const highlights = (c.highlights || [])
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join("");
    return `<article class="card">
      <div class="card-top">
        <h2>${escapeHtml(c.name)}</h2>
        <span class="badge ${c.status}">${c.status}</span>
      </div>
      <p class="detail">${escapeHtml(c.detail)}</p>
      ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}
      <p class="source">${escapeHtml(c.source || "")}</p>
    </article>`;
  }).join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

load().catch((err) => {
  document.getElementById("generated").textContent = "Failed to load data.json: " + err.message;
});
