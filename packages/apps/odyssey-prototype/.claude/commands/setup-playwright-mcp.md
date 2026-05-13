# /setup-playwright-mcp — Add Playwright MCP to Claude settings

Adds the Playwright MCP server to `~/.claude.json` scoped to the current project directory, so Claude can control a browser.

The `@playwright/mcp` package is already a devDependency of `@okta/odyssey-prototype` and exposes a `playwright-mcp` binary via its `playwright-mcp` script.

---

## Step 1: Determine the project path

The project path is the current working directory (the repo root Claude is running from). Capture it:

```bash
pwd
```

---

## Step 2: Check if already configured

Read `~/.claude.json` and check if `projects["<project-path>"].mcpServers.playwright` already exists.

If it does, print:

> Playwright MCP is already configured for this project in `~/.claude.json`. Nothing to do.

Then stop.

---

## Step 3: Add the MCP server entry

Use `node` to safely merge the config into `~/.claude.json`:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const projectPath = process.cwd();
const claudeJsonPath = path.join(process.env.HOME, '.claude.json');
const data = JSON.parse(fs.readFileSync(claudeJsonPath, 'utf8'));
data.projects = data.projects || {};
data.projects[projectPath] = data.projects[projectPath] || {};
data.projects[projectPath].mcpServers = data.projects[projectPath].mcpServers || {};
data.projects[projectPath].mcpServers.playwright = {
  command: 'yarn',
  args: ['playwright-mcp']
};
fs.writeFileSync(claudeJsonPath, JSON.stringify(data, null, 2));
console.log('Done. mcpServers.playwright added for', projectPath);
"
```

---

## Step 4: Confirm

Print the resulting `mcpServers` block for the current project and tell the user:

> Playwright MCP added to `~/.claude.json` for this project.
> Restart Claude Code to pick up the new MCP server.
