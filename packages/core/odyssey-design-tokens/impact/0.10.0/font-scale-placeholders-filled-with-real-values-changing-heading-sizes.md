---
summary: "`font.scale.*` placeholders filled with real values, changing heading sizes"
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
commit: bc3da9bcb
---

Scale steps 5 through 12 got their real values: 1.571rem, 1.786rem, 2rem, 2.286rem, 2.571rem, 2.857rem, 3.214rem, 3.643rem. With the references c277be9d8 added earlier in the release, the sizes 0.10.0 actually ships are H1 2rem to 2.571rem, H2 1.741 to 2.286, H3 1.516 to 2, H4 1.32 to 1.571, H5 1.149 to 1.286, H6 1rem to 1.143rem, and caption 0.871 to 0.857. FontSizeBody is unchanged at 1rem. Check headings in fixed-height containers and anywhere headings sit beside body text.
