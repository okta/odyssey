---
summary: Field group's optional indicator changed element, size, and text
affectedExports:
  - CheckboxGroup
  - RadioGroup
files:
  - packages/core/odyssey-react-mui/src/Field.tsx
commit: 7438c4079
onlyRelevantIf: a field group marked optional, which is a CheckboxGroup, a RadioGroup, or a Field given `fieldType="group"`
---

The optional indicator on a field group changed from a `span` to a `p`, lost its surrounding parentheses, and moved from the body type size to the smaller subordinate size. Its color is unchanged, because the subordinate variant's color token and MUI's secondary text color both resolve to the same neutral. The `p` now sits inside the group's `legend`, which permits phrasing content only, so browsers may restructure it. The label's text content changed, so the group's accessible name changed with it. In English, `getByRole('group', { name: 'Notifications (Optional)' })` must become `getByRole('group', { name: 'Notifications Optional' })`. The word comes from the `fieldlabel.optional.text` translation, so it differs in other locales. Single fields already rendered the indicator this way, so this aligns groups with them. Check the appearance of optional group labels, accessibility snapshots, and CSS or tests matching the old element or the parenthesized text.
