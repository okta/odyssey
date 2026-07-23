# 2026-07-02 — Embed React in web components via renderReactInWebComponent

- **Status:** Accepted
- **Date:** 2026-07-02
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-07-02
- **Area:** architecture
- **Tags:** #architecture

## Decision (the rule)

To render React inside a web component, use Odyssey's `renderReactInWebComponent` helper. Docs and
examples must show this approach, not the manual mount (hand-wiring a root into a shadow/custom
element).

## What was rejected

Documenting and using the manual web-component mounting method (manually creating a React root and
attaching it to the custom element). It's the "from scratch" approach an agent writes when it
doesn't know the helper exists, and it misses the context/token/cleanup wiring the helper handles.

## Why

`renderReactInWebComponent` centralizes the correct provider context, token injection, and
teardown for React-in-web-component embedding. Hand-rolled mounts drift from that contract and
reintroduce bugs the helper already solved. The correction: "Please update this doc to use
`renderReactInWebComponent` instead. … I highly recommend using renderReactInWebComponent instead
of the manual method."

## How to honor it

- Use `renderReactInWebComponent` for any React-in-web-component embedding.
- Update docs/examples to show it; don't document the manual mount.

## Related

- (none yet)
