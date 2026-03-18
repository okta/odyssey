#!/usr/bin/env node
const [major, minor] = process.versions.node.split(".").map(Number);

if (major < 20 || (major === 20 && minor < 12)) {
  console.error(
    `Error: Node.js >=20.12.0 is required (current: ${process.version}). Please upgrade your runtime.`,
  );
  process.exit(1);
}

await import("./cli.js");
