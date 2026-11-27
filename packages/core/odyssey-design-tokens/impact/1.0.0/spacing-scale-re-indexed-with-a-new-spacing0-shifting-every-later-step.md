---
summary: Spacing scale re-indexed with a new `Spacing0`, shifting every later step
affectedExports:
  - Spacing0
  - Spacing1
  - Spacing2
  - Spacing3
  - Spacing4
  - Spacing5
  - Spacing6
  - Spacing7
  - Spacing8
  - Spacing9
files:
  - packages/odyssey-design-tokens/src/spacing.json
  - packages/odyssey-design-tokens/src/space.json
commit: 8f19d3045
---

The spacing scale was re-indexed, not just renamed. A new Spacing0 holds "0", so every subsequent step shifted by one: the old SpaceScale0 (0.28571429rem) is now Spacing1, the old SpaceScale8 (4rem) is now Spacing9. Mapping SpaceScale<n> to Spacing<n> compiles and silently produces one step less space at every site.
