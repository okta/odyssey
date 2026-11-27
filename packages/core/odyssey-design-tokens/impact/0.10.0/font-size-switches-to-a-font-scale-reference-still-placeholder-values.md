---
summary: "`font.size.*` switches to a `font.scale.*` reference, still placeholder values"
affectedExports:
  - FontSizeHeading1
  - FontSizeHeading2
  - FontSizeHeading3
  - FontSizeHeading4
  - FontSizeHeading5
  - FontSizeHeading6
  - FontSizeCaption
files:
  - packages/odyssey-design-tokens/src/font.json
commit: c277be9d8
---

font.size.* stopped holding literal rem values and now references a new font.scale.* ramp: caption to scale.0, body to scale.1, heading6 to scale.2, heading5 to scale.3, heading4 to scale.5, heading3 to scale.7, heading2 to scale.8, heading1 to scale.9. At this commit scale steps 5 through 12 are all placeholders holding 0.857rem, so H1 through H4 resolve to 0.857rem here. bc3da9bcb fills in the real values later in the same release. font.lineHeight was also rebuilt, from base and heading to per-level values.
