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
// Dev-app share proxy — lets an agent inside the workspace container hand you a
// browsable URL for a dev server it just started, without publishing a fresh
// container port per app and without the dev server binding anything but
// loopback.
//
// How it fits together
// --------------------
//   agent ──POST /register {port}──▶ control API (127.0.0.1 only, never published)
//         ◀──── { id, url } ────────┘   returns http://<id>.localhost:3774
//
//   you ──▶ http://storybook-a1b2.localhost:3774
//        └─▶ published DATA port  ──▶  this proxy (in the container)
//                                       └─▶ 127.0.0.1:6006  (the dev server)
//
// Two listeners:
//   • DATA plane (DEVPROXY_DATA_PORT, published to host loopback in
//     docker-compose.yml): reverse-proxies inbound requests to the right dev
//     server by reading the Host header's leftmost label as the registration id.
//     Handles websocket upgrades so Vite/Storybook HMR works.
//   • CONTROL plane (DEVPROXY_CONTROL_PORT, bound to 127.0.0.1): the tiny
//     register/unregister/list JSON API the in-container agents call via
//     `devshare`. Never published.
//
// Routing is by subdomain rather than by path prefix on purpose. Dev servers emit
// root-absolute URLs (`/assets/*.js`, Storybook's `/sb-manager/*`, the HMR socket
// at `/`), which all 404 under a `/<id>/` prefix unless every dev server is
// reconfigured with a matching base path. Host-based routing leaves the path space
// untouched, so nothing needs per-app configuration. Wildcard `*.localhost`
// resolves to 127.0.0.1 on macOS and in Chromium with no /etc/hosts entry, so this
// costs nothing to set up.
//
// The registry lives in memory only, so a container recreate wipes every shared
// URL automatically — that IS the cleanup. While running, a liveness reaper also
// drops routes whose dev server stopped answering, so the list cannot rot.
//
// Zero dependencies on purpose: node:http/node:net only, so the image needs no
// vendored proxy binary. See agent-container.md for the runbook.

import http from "node:http";
import net from "node:net";
import crypto from "node:crypto";

const intEnv = (name, fallback) => {
  const raw = process.env[name];
  if (raw == null || raw === "") return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const DATA_PORT = intEnv("DEVPROXY_DATA_PORT", 3774);
const CONTROL_PORT = intEnv("DEVPROXY_CONTROL_PORT", 3775);
// The zone this proxy answers for. The returned URLs are
// <scheme>://<id>.<PUBLIC_BASE>[:PUBLIC_PORT]; the Host matcher strips this
// suffix to recover <id>.
const PUBLIC_BASE = (
  process.env.DEVPROXY_PUBLIC_BASE || "localhost"
).toLowerCase();
// Port appended when BUILDING the returned URL. Kept separate from PUBLIC_BASE so
// the Host matcher keeps comparing bare hostnames — folding the port into
// PUBLIC_BASE makes every strict match miss and silently relies on the
// leftmost-label fallback below.
const PUBLIC_PORT = intEnv("DEVPROXY_PUBLIC_PORT", 0);
const URL_SCHEME = process.env.DEVPROXY_URL_SCHEME || "http";
// Where the dev servers listen — same network namespace as this proxy.
const UPSTREAM_HOST = process.env.DEVPROXY_UPSTREAM_HOST || "127.0.0.1";
// Rewrite the upstream Host header to loopback so dev servers with host
// allow-lists (Vite's `server.allowedHosts`, which otherwise 403s "This host is
// not allowed") accept the proxied request. The original rides X-Forwarded-Host.
const REWRITE_HOST = process.env.DEVPROXY_REWRITE_HOST !== "0";
// Liveness reaper: periodically TCP-probe each upstream, drop a route after N misses.
const REAP = process.env.DEVPROXY_REAP !== "0";
const REAP_INTERVAL_MS = intEnv("DEVPROXY_REAP_INTERVAL", 60) * 1000;
const REAP_MAX_MISSES = intEnv("DEVPROXY_REAP_FAILURES", 3);

// id -> { id, port, label, url, createdAt, expiresAt, misses }
const routes = new Map();

const now = () => Date.now();
const timestamp = () => new Date(now()).toISOString();
const log = (...parts) => console.log(`[dev-proxy ${timestamp()}]`, ...parts);

const publicAuthority = PUBLIC_PORT
  ? `${PUBLIC_BASE}:${PUBLIC_PORT}`
  : PUBLIC_BASE;

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

// A DNS-label id: optional human slug plus a short random suffix so it reads well
// in the URL yet cannot collide. Bare random when no usable label was given.
const makeId = (label) => {
  const base = slugify(label);
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = crypto.randomBytes(2).toString("hex");
    const id = base ? `${base}-${suffix}` : `app-${suffix}`;
    if (!routes.has(id)) return id;
  }
  return `app-${crypto.randomBytes(4).toString("hex")}`;
};

// Pull the registration id out of an inbound Host header:
// "<id>.<PUBLIC_BASE>[:port]" -> "<id>". Falls back to the leftmost label when the
// base does not match, which covers curling with a made-up Host and a temporary
// base misconfiguration.
const idFromHost = (hostHeader) => {
  if (!hostHeader) return null;
  const host = hostHeader.toLowerCase().split(":")[0];
  const suffix = `.${PUBLIC_BASE}`;
  if (host.endsWith(suffix)) {
    const subdomain = host.slice(0, -suffix.length);
    return subdomain.split(".")[0] || null;
  }
  if (host === PUBLIC_BASE) return null; // the apex itself — no app
  const firstLabel = host.split(".")[0];
  return firstLabel && firstLabel !== host ? firstLabel : null;
};

const lookup = (request) => {
  const id = idFromHost(request.headers.host);
  if (!id) return null;
  return routes.get(id) || null;
};

// ---------------------------------------------------------------------------
// Data plane — reverse proxy inbound HTTP and websocket upgrades to the dev server
// ---------------------------------------------------------------------------

const upstreamHeaders = (request, route) => {
  const headers = { ...request.headers };
  const originalHost = headers.host;
  if (REWRITE_HOST) headers.host = `${UPSTREAM_HOST}:${route.port}`;
  headers["x-forwarded-host"] = originalHost;
  headers["x-forwarded-proto"] = URL_SCHEME;
  headers["x-forwarded-for"] = request.socket.remoteAddress || "";
  return headers;
};

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

const page = (response, code, title, bodyHtml) => {
  const body =
    `<!doctype html><meta charset=utf-8><title>${escapeHtml(title)}</title>` +
    `<body style="font:15px system-ui;max-width:44rem;margin:4rem auto;padding:0 1rem">` +
    `<h1>${escapeHtml(title)}</h1>${bodyHtml}` +
    `<p style="color:#888">dev-proxy · ${escapeHtml(publicAuthority)}</p></body>`;
  if (!response.headersSent)
    response.writeHead(code, { "content-type": "text/html; charset=utf-8" });
  response.end(body);
};

// Landing page for the apex (http://localhost:3774/): list what is shared so you
// can click through instead of keeping URLs around.
const routeIndex = (response) => {
  const live = [...routes.values()];
  if (!live.length) {
    return page(
      response,
      200,
      "No dev apps shared",
      `<p>Nothing is registered yet. Inside the container, run ` +
        `<code>devshare &lt;port&gt; [label]</code> to share a dev server, or ` +
        `<code>devshots</code> to publish the screenshot gallery.</p>`,
    );
  }
  const items = live
    .map(
      (route) =>
        `<li><a href="${escapeHtml(route.url)}">${escapeHtml(route.url)}</a>` +
        ` <span style="color:#888">→ :${route.port}` +
        `${route.label ? ` (${escapeHtml(route.label)})` : ""}</span></li>`,
    )
    .join("");
  page(
    response,
    200,
    `${live.length} dev app${live.length === 1 ? "" : "s"} shared`,
    `<ul style="line-height:1.9">${items}</ul>`,
  );
};

const dataServer = http.createServer((request, response) => {
  const route = lookup(request);
  if (!route) {
    const id = idFromHost(request.headers.host);
    if (!id) return routeIndex(response);
    return page(
      response,
      404,
      "No dev app here",
      `<p>Nothing is registered as <code>${escapeHtml(id)}</code>. It may have been ` +
        `unregistered, reaped after its server stopped answering, or lost on a ` +
        `container recreate.</p><p><a href="${URL_SCHEME}://${escapeHtml(publicAuthority)}/">See what is shared</a></p>`,
    );
  }
  const proxyRequest = http.request(
    {
      host: UPSTREAM_HOST,
      port: route.port,
      method: request.method,
      path: request.url,
      headers: upstreamHeaders(request, route),
    },
    (proxyResponse) => {
      response.writeHead(
        proxyResponse.statusCode || 502,
        proxyResponse.headers,
      );
      proxyResponse.pipe(response);
    },
  );
  proxyRequest.on("error", (error) => {
    page(
      response,
      502,
      "Dev app not responding",
      `<p><code>${escapeHtml(route.id)}</code> is registered on port ${route.port}, ` +
        `but the server there is not answering (${escapeHtml(error.code || error.message)}).</p>`,
    );
  });
  request.pipe(proxyRequest);
});

// Websocket / HTTP upgrade bridging: reopen the upgrade request upstream, relay the
// 101 handshake back, then splice the two sockets in both directions.
dataServer.on("upgrade", (request, clientSocket, head) => {
  const route = lookup(request);
  if (!route) return clientSocket.destroy();

  const proxyRequest = http.request({
    host: UPSTREAM_HOST,
    port: route.port,
    method: request.method,
    path: request.url,
    headers: upstreamHeaders(request, route),
  });

  proxyRequest.on("upgrade", (proxyResponse, upstreamSocket, upstreamHead) => {
    const lines = [
      `HTTP/1.1 ${proxyResponse.statusCode} ${proxyResponse.statusMessage}`,
    ];
    for (const [key, value] of Object.entries(proxyResponse.headers)) {
      if (Array.isArray(value))
        for (const one of value) lines.push(`${key}: ${one}`);
      else lines.push(`${key}: ${value}`);
    }
    lines.push("\r\n");
    clientSocket.write(lines.join("\r\n"));
    if (upstreamHead && upstreamHead.length) clientSocket.write(upstreamHead);

    const drop = () => {
      upstreamSocket.destroy();
      clientSocket.destroy();
    };
    upstreamSocket.on("error", drop);
    clientSocket.on("error", drop);
    upstreamSocket.pipe(clientSocket);
    clientSocket.pipe(upstreamSocket);
  });
  proxyRequest.on("error", () => clientSocket.destroy());
  if (head && head.length) proxyRequest.write(head);
  proxyRequest.end();
});

// ---------------------------------------------------------------------------
// Control plane — the register/unregister API agents call (loopback only)
// ---------------------------------------------------------------------------

const readJson = (request) =>
  new Promise((resolve) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1 << 20) request.destroy(); // 1 MiB guard
    });
    request.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve(null);
      }
    });
    request.on("error", () => resolve(null));
  });

const sendJson = (response, code, payload) => {
  response.writeHead(code, { "content-type": "application/json" });
  response.end(JSON.stringify(payload));
};

const publicView = (route) => ({
  id: route.id,
  url: route.url,
  port: route.port,
  label: route.label,
  createdAt: route.createdAt,
  expiresAt: route.expiresAt,
});

const controlServer = http.createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://control");

  if (
    request.method === "GET" &&
    (pathname === "/healthz" || pathname === "/")
  ) {
    return sendJson(response, 200, {
      ok: true,
      base: publicAuthority,
      dataPort: DATA_PORT,
      count: routes.size,
    });
  }

  if (request.method === "GET" && pathname === "/list") {
    return sendJson(response, 200, {
      base: publicAuthority,
      routes: [...routes.values()].map(publicView),
    });
  }

  if (request.method === "POST" && pathname === "/register") {
    const body = await readJson(request);
    if (!body) return sendJson(response, 400, { error: "invalid JSON body" });
    const port = Number.parseInt(body.port, 10);
    if (!Number.isInteger(port) || port < 1 || port > 65535)
      return sendJson(response, 400, {
        error: "port must be an integer 1-65535",
      });

    // Idempotent-ish: reuse a live route for the same port and label instead of
    // minting a second URL for the same server.
    const label = body.label ? String(body.label) : "";
    for (const route of routes.values()) {
      if (route.port === port && route.label === slugify(label))
        return sendJson(response, 200, publicView(route));
    }

    const ttl = Number.parseInt(body.ttl, 10);
    const id = makeId(label);
    const route = {
      id,
      port,
      label: slugify(label),
      url: `${URL_SCHEME}://${id}.${publicAuthority}`,
      createdAt: timestamp(),
      expiresAt: Number.isInteger(ttl) && ttl > 0 ? now() + ttl * 1000 : null,
      misses: 0,
    };
    routes.set(id, route);
    log(
      `register ${id} -> ${UPSTREAM_HOST}:${port}${label ? ` (${label})` : ""} => ${route.url}`,
    );
    return sendJson(response, 201, publicView(route));
  }

  if (request.method === "POST" && pathname === "/unregister") {
    const body = await readJson(request);
    if (!body) return sendJson(response, 400, { error: "invalid JSON body" });
    // Accept { id } or { port } — an agent may only remember the port it opened.
    let removed = null;
    if (body.id && routes.has(body.id)) {
      removed = body.id;
      routes.delete(body.id);
    } else if (body.port != null) {
      const port = Number.parseInt(body.port, 10);
      for (const [id, route] of routes) {
        if (route.port === port) {
          removed = id;
          routes.delete(id);
        }
      }
    }
    if (removed) log(`unregister ${removed}`);
    return sendJson(response, removed ? 200 : 404, {
      ok: Boolean(removed),
      removed,
    });
  }

  if (request.method === "POST" && pathname === "/reset") {
    const count = routes.size;
    routes.clear();
    log(`reset — cleared ${count} route(s)`);
    return sendJson(response, 200, { ok: true, cleared: count });
  }

  return sendJson(response, 404, { error: "not found" });
});

// ---------------------------------------------------------------------------
// Liveness reaper and TTL sweep — keep the registry from accumulating dead routes
// ---------------------------------------------------------------------------

const probe = (port) =>
  new Promise((resolve) => {
    const socket = net.connect({ host: UPSTREAM_HOST, port }, () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
    socket.setTimeout(2000, () => {
      socket.destroy();
      resolve(false);
    });
  });

const sweep = async () => {
  const at = now();
  for (const [id, route] of [...routes]) {
    if (route.expiresAt && at > route.expiresAt) {
      routes.delete(id);
      log(`expire ${id} (ttl)`);
      continue;
    }
    if (!REAP) continue;
    if (await probe(route.port)) {
      route.misses = 0;
      continue;
    }
    route.misses += 1;
    if (route.misses >= REAP_MAX_MISSES) {
      routes.delete(id);
      log(`reap ${id} — upstream :${route.port} unreachable ${route.misses}x`);
    }
  }
};

// ---------------------------------------------------------------------------

dataServer.listen(DATA_PORT, "0.0.0.0", () =>
  log(`data plane on 0.0.0.0:${DATA_PORT} (public base ${publicAuthority})`),
);
controlServer.listen(CONTROL_PORT, "127.0.0.1", () =>
  log(
    `control API on 127.0.0.1:${CONTROL_PORT} — POST /register {port,label?}`,
  ),
);

setInterval(() => {
  sweep().catch((error) => log("sweep error", error.message));
}, REAP_INTERVAL_MS).unref();

const shutdown = (signal) => {
  log(`${signal} — shutting down`);
  dataServer.close();
  controlServer.close();
  process.exit(0);
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
