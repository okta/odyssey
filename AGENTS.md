# Odyssey agent instructions

This is the canonical repository entry point for every AI tool. Keep it small: universal rules and task routes only. Linked guides are required instructions, read before the relevant work. They are ordinary Markdown links, not imports; do not bulk-load unrelated guides.

## Always

- Follow [responses and safety](docs/agents/responses-and-safety.md). Write plainly, protect secrets, and preserve other people's work.
- Confirm ownership and read the relevant package's `AGENTS.md` and README before editing. Use the [repository and package map](docs/agents/README.md#repository-and-package-ownership).
- List and read relevant [decisions](docs/decisions/README.md) before non-trivial work.
- Before integrating any change, obtain an independent agent review under [adversarial reviews](docs/runbooks/adversarial-reviews.md). Self-review and passing checks do not replace it.

## Read before the matching work

| Work | Required guidance |
| --- | --- |
| Repository edits, Git, PRs, merges, or workers | [Git and worker workflow](docs/agents/git-workflow.md) |
| Code, tests, scripts, dependencies, or configuration | [Coding standards](docs/agents/coding-standards.md) |
| Installs, builds, checks, or pushes | [Commands and validation](docs/agents/commands-and-validation.md) |
| Components, apps, tokens, or UI debugging | [Project conventions](docs/agents/project-conventions.md); [component source](docs/agents/component-source.md) for library components |
| Test files | [Testing](docs/agents/testing.md) |
| Storybook stories or VRT | [Story-file guidance](docs/agents/story-file-guidance.md) and [Storybook examples](docs/agents/storybook-and-vrt.md) |
| Docs, Confluence pages, public APIs, or decisions | [Documentation and decisions](docs/agents/documentation.md) |
| Worker worktree dependencies | [Worker setup](docs/agents/worker-worktree-setup.md) and [worker workflow](docs/agents/git-workflow.md#worker-task-workflow) |

## Maintain the guides

“Add this to AGENTS” means update the relevant topic guide first. Change an entry point only for a universal rule or a new task route. Keep durable corrections in tracked docs, not agent memory. See the [guide index](docs/agents/README.md#maintaining-instructions) and [organization decision](docs/decisions/2026-10-29-small-agent-entry-points.md).
