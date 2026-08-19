#!/usr/bin/env node
/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
// Screenshot gallery for the workspace container.
//
// The container's Playwright MCP is headless and writes its screenshots to a
// directory inside the container (see the `--output-dir` in the generated
// mcp-servers.json), so without this you cannot see what an agent captured.
// Agents worked around that by hand-writing HTML with linked images; this makes it
// a served page instead.
//
// Pairs with dev-proxy.mjs: this binds loopback only, and `devshots` registers it
// with the proxy so the gallery is reachable from the host as
// http://shots-<id>.localhost:3774.
//
// Newest first, because the thing you just captured is the thing you want to see.
// Zero dependencies — node:http/node:fs only.

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const intEnv = (name, fallback) => {
  const raw = process.env[name];
  if (raw == null || raw === "") return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const PORT = intEnv("DEVPROXY_SHOTS_PORT", 3776);
const ROOT = process.env.DEVPROXY_SHOTS_DIR || "/home/agent/.screenshots";

const CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};
const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
]);

const log = (...parts) =>
  console.log(`[shot-server ${new Date().toISOString()}]`, ...parts);

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

// Resolve a request path inside ROOT, refusing anything that escapes it. The
// gallery is loopback-only, but a traversal bug would expose the whole container
// filesystem through the published proxy port, so this is not optional.
const resolveWithinRoot = (requestPath) => {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const resolved = path.resolve(ROOT, `.${path.posix.normalize(decoded)}`);
  return resolved === ROOT || resolved.startsWith(`${ROOT}${path.sep}`)
    ? resolved
    : null;
};

const formatBytes = (bytes) =>
  bytes < 1024
    ? `${bytes} B`
    : bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const galleryPage = (entries) => {
  const cards = entries
    .map((entry) => {
      const href = `/${encodeURIComponent(entry.name)}`;
      const preview = IMAGE_EXTENSIONS.has(entry.extension)
        ? `<img src="${href}" alt="${escapeHtml(entry.name)}" loading="lazy" ` +
          `style="width:100%;height:auto;display:block;border-radius:6px 6px 0 0;background:#0002">`
        : `<div style="padding:2.5rem 1rem;text-align:center;color:#888">` +
          `${escapeHtml(entry.extension || "file")}</div>`;
      return (
        `<a href="${href}" style="text-decoration:none;color:inherit;border:1px solid #0002;` +
        `border-radius:6px;overflow:hidden;display:block">${preview}` +
        `<div style="padding:.5rem .6rem;font:13px system-ui">` +
        `<div style="word-break:break-all">${escapeHtml(entry.name)}</div>` +
        `<div style="color:#888;margin-top:.15rem">${escapeHtml(entry.modified)} · ` +
        `${formatBytes(entry.size)}</div></div></a>`
      );
    })
    .join("");

  const body = entries.length
    ? `<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr))">${cards}</div>`
    : `<p style="color:#888">Nothing captured yet. Screenshots taken by the ` +
      `container's Playwright MCP land in <code>${escapeHtml(ROOT)}</code> and appear here.</p>`;

  return (
    `<!doctype html><meta charset=utf-8><title>Screenshots (${entries.length})</title>` +
    `<meta name=viewport content="width=device-width,initial-scale=1">` +
    `<body style="font:15px system-ui;margin:2rem auto;max-width:80rem;padding:0 1rem">` +
    `<h1 style="font-size:1.3rem">Screenshots <span style="color:#888;font-weight:400">` +
    `(${entries.length}, newest first)</span></h1>${body}` +
    `<p style="color:#888;margin-top:2rem">Cleared whenever the container is recreated.</p></body>`
  );
};

const listEntries = async () => {
  const names = await fs.readdir(ROOT);
  const stats = await Promise.all(
    names.map(async (name) => {
      try {
        const fileStat = await fs.stat(path.join(ROOT, name));
        return fileStat.isFile()
          ? {
              name,
              extension: path.extname(name).toLowerCase(),
              size: fileStat.size,
              modifiedAt: fileStat.mtimeMs,
              modified: new Date(fileStat.mtimeMs)
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
            }
          : null;
      } catch {
        return null;
      }
    }),
  );
  return stats
    .filter(Boolean)
    .toSorted((left, right) => right.modifiedAt - left.modifiedAt);
};

const server = http.createServer(async (request, response) => {
  const target = resolveWithinRoot(request.url || "/");
  if (!target) {
    response.writeHead(403, { "content-type": "text/plain" });
    return response.end("forbidden\n");
  }

  try {
    const targetStat = await fs.stat(target);
    if (targetStat.isDirectory()) {
      const html = galleryPage(await listEntries());
      response.writeHead(200, {
        "content-type": "text/html; charset=utf-8",
        // The gallery must never be cached: its whole job is showing what was
        // captured seconds ago.
        "cache-control": "no-store",
      });
      return response.end(html);
    }
    response.writeHead(200, {
      "content-type":
        CONTENT_TYPES[path.extname(target).toLowerCase()] ||
        "application/octet-stream",
      "content-length": targetStat.size,
      "cache-control": "no-store",
    });
    const handle = await fs.open(target, "r");
    handle.createReadStream().pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("not found\n");
  }
});

await fs.mkdir(ROOT, { recursive: true });
server.listen(PORT, "127.0.0.1", () =>
  log(`serving ${ROOT} on 127.0.0.1:${PORT} — share it with 'devshots'`),
);

const shutdown = (signal) => {
  log(`${signal} — shutting down`);
  server.close();
  process.exit(0);
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
