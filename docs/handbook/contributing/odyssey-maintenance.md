# Odyssey-Owned Maintenance

Odyssey owns every repository area outside `packages/contributions/`. This guide
orients Odyssey team members, new maintainers, and people using AI agents to
finish work in Core, apps, configuration, platform packages, tools, scripts, CI,
release automation, and repository documentation.

The Odyssey team normally implements and reviews this work. Pull requests from
other teams directly into Odyssey-owned areas are exceptional and should be
coordinated with Odyssey before implementation.

Core APIs and design tokens are shared broadly. Preserve backward compatibility,
prefer deprecation over removal, and coordinate token changes with the Figma
libraries. A reusable capability that is not part of the shared Odyssey contract
and should remain owned and released by another team belongs under
`packages/contributions/` instead.

## Before Making a Change

1. Confirm which Odyssey-owned package or repository area owns the behavior.
2. Read its source, tests, package documentation, and scoped `AGENTS.md` file when
   one exists.
3. Identify consumers and compatibility risks before changing public APIs or
   shared tooling.
4. Coordinate design-token changes with the Figma libraries and identify
   generated or downstream outputs owned by the changed tool.

## Implementation Expectations

- Follow package-local patterns and the repository coding standards.
- Add focused tests for behavior changes and regressions.
- Update component JSDoc, package documentation, and Storybook stories together
  with the implementation.
- Render the state being reviewed directly in its Storybook story. Put interaction
  behavior in browser tests; use a Storybook `play` function only when the
  interaction itself must be captured and direct rendering is not practical.
- Run the applicable changed packages and root quality gates described in the
  [contribution paths overview](../README.md).
  choices with rejected alternatives.
- Review visual changes according to the
  [visual regression testing guide](../testing/visual-regression-testing.md).

## Shared Contract

Core packages publish the shared Odyssey contract. Avoid new required props,
renaming or removing tokens, and changes that force consumers onto a new API
without a migration path. Apply the same compatibility care to shared
configuration, tooling, automation, and generated outputs. Document intentional
compatibility changes explicitly.
