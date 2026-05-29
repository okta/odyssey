# PAM / OPA Prototype — AI Agent Instructions

These instructions extend the prototype-wide rules in
[`packages/apps/odyssey-prototype/AGENTS.md`](../../../../AGENTS.md). They
apply only when working in the PAM / Okta Privileged Access prototype
(anything under `src/pam/`, or any task that mentions PAM, OPA, or
Privileged Access).

---

## Reference Repo

When you build, change, or seed anything in the PAM prototype, try to
ground your work in the real PAM product source.

Follow this order exactly — do not skip steps:

1. **Check the `PLATFORM_REPO` environment variable first.**
   Read it with `echo "$PLATFORM_REPO"` (or equivalent). If it points at a
   readable path, treat that path as the PAM repo and use it as context
   for business-logic decisions (data models, page structures, naming,
   workflows). Do not ask the user for a link.

2. **If `PLATFORM_REPO` is empty or unreadable, ask the user once:**

   > "I'm about to work on the PAM/OPA prototype. Do you have a local
   > path or link to the real PAM (Okta Privileged Access) repo I can
   > use as reference? I checked `$PLATFORM_REPO` and it's not set.
   > If you don't have one handy, that's fine — I'll continue with the
   > prototype task as-is."

3. **If the user provides a path, use it as PAM business-logic context.**
   Read relevant files there to understand domain concepts before making
   non-trivial design decisions in the prototype. Treat it as read-only
   reference — never modify it.

4. **If the user says no / doesn't have one / declines, just continue
   the task** with the information you already have. Do not ask again
   in the same conversation, and do not block on this.

This rule applies only to PAM/OPA work. Do not ask for reference repos
for other apps (Admin Console, Enduser Dashboard, Enduser Settings,
Workflows, ISPM, Partner Portal).
