# 2026-06-23 — Project-shared config goes in the repo, not the user's local-global settings

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-23
- **Area:** process
- **Tags:** #process #tooling

## Decision (the rule)

Configuration that should apply to everyone working in the repo (and to consumers of Odyssey)
goes in the repo's checked-in settings. Do not write project-shared config into the user's
local/global settings. Confirm the target scope before writing any settings file.

## What was rejected

Writing shared config into the user's machine-local global settings. The AI defaults to the
global scope because it's the "current" settings context, but that makes the config invisible to
teammates and to consumers — it only helps the one machine it was written on.

## Why

Config in a local-global file doesn't travel with the repo, so teammates and CI never get it and
behavior diverges per machine. Checked-in repo config is versioned, reviewed, and shared. The
correction: "I didn't want those in my local global. I wanted them in the repo. … What about
consumers of Odyssey?"

## How to honor it

- Decide scope first: is this for everyone in the repo, or just this machine?
- Repo-shared → checked-in config; machine-personal → local settings.
- When unsure, ask; don't silently pick the global scope.

## Related

- [AGENTS.md is the canonical AI instruction file](2026-02-20-agents-md-canonical-ai-instructions.md)
