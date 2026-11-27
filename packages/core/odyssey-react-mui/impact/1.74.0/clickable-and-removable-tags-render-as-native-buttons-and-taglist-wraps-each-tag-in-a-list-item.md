---
summary: Clickable and removable tags render as native buttons, and TagList wraps each tag in a list item
affectedExports:
  - Tag
  - TagList
  - DataFilters
  - DataTable
  - DataView
  - GroupPicker
  - PickerWithOptionAdornment
files:
  - packages/core/odyssey-react-mui/src/Tag.tsx
  - packages/core/odyssey-react-mui/src/TagList.tsx
  - packages/core/odyssey-react-mui/src/TagListContext.tsx
commit: 90ec5c35d0aa6a3a3341cdd47496f5d55a4ec733
onlyRelevantIf: the app renders Tag or TagList, or the active filter tags of DataFilters, DataTable, or DataView, or the selected tags of GroupPicker or PickerWithOptionAdornment
---

Tag's root element and TagList's structure changed:

- A Tag with `onClick` or `onRemove` rendered as `<div role="button">` (or `<li role="button">` inside a TagList). It now renders as a native `<button type="button">` everywhere, with no `role` attribute. A disabled one now gets the native `disabled` attribute as well as `aria-disabled`. The accessible role and name stay the same.
- A Tag with neither prop still renders as a `<div>`. Inside a TagList it was an `<li>`; it is now a `<div>` inside an `<li>`.
- TagList wrapped nothing: each Tag rendered as the `<li>` itself. It now wraps every child in its own `<li>`, so the list is `ul > li > (div | button)`. Every tag is now a list item in the accessibility tree; before, clickable and removable tags were buttons placed directly in the list and were not list items. A child that renders nothing, such as `{condition && <Tag />}` when the condition is false, now still produces an empty `<li>`, which counts as a list item and takes a gap in the row.
- `data-se` (`testId`) stays on the tag element, not on the new `<li>`, so inside a TagList it moved from the `<li>` to its child.
- The internal `TagListContext` is gone. It was not exported.

The same change reaches the removable tags that DataFilters, DataTable, and DataView show for active filters, and the selected-value tags of GroupPicker and PickerWithOptionAdornment.

Check selectors and tests that match `[role="button"]`, `div` or `li` as the tag element, `li[data-se=...]`, `closest("li")` from a tag, or a count of list items in a TagList. Check markup that places a clickable or removable Tag inside another `<button>` or a link, which is now invalid nesting, and CSS that targets the tag by element. Check visual snapshots of tag lists, since each tag now sits inside an extra `<li>`.
