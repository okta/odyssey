# Odyssey Handbook

The handbook contains current guidance for people working in the
Odyssey monorepo. Start here when you need to understand how the repository is
organized, how to contribute, or which standards apply to your work.

## Handbook Contents

- Contribution paths
  - [Choose an ownership path](../../CONTRIBUTING.md)
  - [Home-team-owned contributions](contributing/odyssey-contributions.md)
  - [Odyssey-owned maintenance](contributing/odyssey-maintenance.md)
- Design guidance
  - [Design tokens](design/tokens.md)
  - [Buttons](design/components/buttons.md)
  - [Checkbox](design/components/checkbox.md)
  - [Fields](design/components/fields.md)
  - [Radio buttons](design/components/radio.md)
  - [Typography](design/components/typography.md)
- Testing guidance
  - [Visual regression testing](testing/visual-regression-testing.md)

## Documentation Map

Odyssey documentation is organized by purpose and lifecycle:

| Location                                      | Purpose                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| `docs/handbook/`                              | Current guidance for people working in the monorepo                      |
| `docs/decisions/`                             | Append-only records explaining accepted and superseded decisions         |
| `docs/runbooks/`                              | Repeatable operational procedures used when performing a specific task   |
| `packages/*/README.md` and `packages/*/docs/` | Package-owned API, integration, and operational documentation            |
| `AGENTS.md`                                   | Automatically loaded constraints for AI agents working in the repository |
| `CHANGELOG.md`                                | Release history                                                          |

Put new guidance in the narrowest location that owns it. Cross-package,
long-lived guidance belongs in the handbook. Package-specific guidance stays
with its package. A notable decision belongs in `docs/decisions/`, while the
procedure used to carry it out belongs in `docs/runbooks/`.

Do not create a separate top-level specification archive. Capture a durable
choice in `docs/decisions/`, put a repeatable procedure in `docs/runbooks/`, and
keep implementation plans with the active task rather than preserving stale
planning documents in the repository.
