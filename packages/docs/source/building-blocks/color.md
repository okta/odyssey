# Color
<div class="is-not-provisional">

These foundations are only available in the draft spec.

</div>

<div class="is-provisional">

<section class="sample--colors-wrap">
  <ul class="sample--color-list">
    <li class="sample--color is-sample-success-lightest"></li>
    <li class="sample--color is-sample-success-base"></li>
    <li class="sample--color is-sample-success-dark"></li>
  </ul>

  <ul class="sample--color-list">
    <li class="sample--color is-sample-action-lightest"></li>
    <li class="sample--color is-sample-action-base"></li>
    <li class="sample--color is-sample-action-dark"></li>
  </ul>

  <ul class="sample--color-list">
    <li class="sample--color is-sample-danger-lightest"></li>
    <li class="sample--color is-sample-danger-base"></li>
    <li class="sample--color is-sample-danger-dark"></li>
  </ul>
</section>

The current palette is constrained to three shades per hue. Use <strong>lightest</strong> variants to highlight specific states in typically-white backgrounds (e.g. a Text Input might have a `cv('danger', 'lightest')` background during an error state. The <strong>base</strong> variant can be treated as a safe default. <strong>Dark</strong> shades should be used for `:hover`-esque  states or to increase contrast.

## Semantic hues

Every selection from our palette should communicate meaning, not just be used for decoration.

### Success

Use our "Success" green sparingly. It should indicate positive feedback to the user in the form of detailing.

It should never be used as a text color, as it is not AA compliant.

### Action

"Action" blue is our primary color. It indicates actionable and active states in interactive components.

### Danger

"Danger" red is used to highlight UI elements that require critical attention - both in the cases of errors or potentially destructive actions.

## Grays

<ul class="sample--color-list">
  <li class="sample--color is-sample-gray-000"></li>
  <li class="sample--color is-sample-gray-100"></li>
  <li class="sample--color is-sample-gray-200"></li>
  <li class="sample--color is-sample-gray-300"></li>
  <li class="sample--color is-sample-gray-400"></li>
  <li class="sample--color is-sample-gray-500"></li>
  <li class="sample--color is-sample-gray-600"></li>
  <li class="sample--color is-sample-gray-700"></li>
  <li class="sample--color is-sample-gray-800"></li>
  <li class="sample--color is-sample-gray-900"></li>
</ul>

We have a large selection of grays available for use. We've currently standardized around a few shades:

```scss
$text-body: cv('gray', '900');
$text-heading: cv('gray', '900');
$text-sub: cv('gray', '500');

$base-border-color: cv('gray', '300');
```

</div>
