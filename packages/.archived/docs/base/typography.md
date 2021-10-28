---
template: plain
id: base-type
title: Typography
headline: Typography
lede: A set of pre-defined text styles for headers, body copy, & links designed for clarity in readability and hierarchy.
description: A set of pre-defined text styles for headers, body copy, & links designed for clarity in readability and hierarchy.
---

## Font family

<p>Odyssey offers separate font stacks for UI, copy, and code:

```scss
$body-font-family: "Public Sans", "-apple-system", "BlinkMacSystemFont",
  "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue",
  sans-serif;

$mono-font-family: "Inconsolata", "SFMono-Regular", Consolas, "Liberation Mono",
  Menlo, Courier, monospace;
```

</p>

UI and copy both utilize our `$body-font-family`. This stack prioritizes Public Sans. We fall back to a system font-stack to enable device-standard typography when our preferred families aren't available.

## Hierarchy

<Description>

Typographical hierarchy indicates importance of content. Through size and weight, a strong hierarchy can provide clarity to a user to easily understand which level of the content they’re on. Sections need subsections, and those subsections may also need their own subsections. Visually, a user should be able to clearly tell a parent section from a child section simply by the relationship in size and weight between headings.

</Description>

## Type styles

<Description>

To ensure consistency in typography sizes throughout Okta touchpoints, we’ve created a custom type scale paired with appropriate weights and line-heights.

</Description>

### Titles

<Description>

Titles are used to describe the main idea of a page, a section, or content that follows it. By default, header tags (`h1` through `h6`) use the corresponding title size.

</Description>

<Description>
  <figure class="ods-table--figure">
    <table class="ods-table type-title-sample--table">
      <thead>
        <tr>
          <th scope="column">
            Variable
          </th>
          <th scope="column">
            rem
          </th>
          <th scope="column">
            px
          </th>
          <th scope="column">
            Example
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="type-sample">
          <td class="type-sample--token"><code>$size-title-1</code></td>
          <td class="type-sample--rem"></td>
          <td class="type-sample--px"></td>
          <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample">
          <td class="type-sample--token"><code>$size-title-2</code></td>
          <td class="type-sample--rem"></td>
          <td class="type-sample--px"></td>
          <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample">
          <td class="type-sample--token"><code>$size-title-3</code></td>
          <td class="type-sample--rem"></td>
          <td class="type-sample--px"></td>
          <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample">
          <td class="type-sample--token"><code>$size-title-4</code></td>
          <td class="type-sample--rem"></td>
          <td class="type-sample--px"></td>
          <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample">
          <td class="type-sample--token"><code>$size-title-5</code></td>
          <td class="type-sample--rem"></td>
          <td class="type-sample--px"></td>
          <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample">
          <td class="type-sample--token"><code>$size-title-6</code></td>
          <td class="type-sample--rem"></td>
          <td class="type-sample--px"></td>
          <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Description>

### Body

<Description>

Odyssey ships with a base font-size of `16px`. However there are times when different sizes are required.

</Description>

<Description>
  <figure class="ods-table--figure">
    <table class="ods-table type-body-sample--table">
      <thead>
        <tr>
          <th scope="column">
            Variable
          </th>
          <th scope="column">
            rem
          </th>
          <th scope="column">
            px
          </th>
          <th scope="column">
            Example
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="type-sample-body">
          <td class="type-sample-body--token"><code>$size-body-lede</code></td>
          <td class="type-sample-body--rem"></td>
          <td class="type-sample-body--px"></td>
          <td class="type-sample-body--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample-body">
          <td class="type-sample-body--token"><code>$size-body-base</code></td>
          <td class="type-sample-body--rem"></td>
          <td class="type-sample-body--px"></td>
          <td class="type-sample-body--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
        <tr class="type-sample-body">
          <td class="type-sample-body--token"><code>$size-body-caption</code></td>
          <td class="type-sample-body--rem"></td>
          <td class="type-sample-body--px"></td>
          <td class="type-sample-body--example">Waltz, bad nymph, for quick jigs vex!</td>
        </tr>
      </tbody>
    </table>
  </figure>
</Description>

## Weight

<Description>

In order to maintain consistency across browsers and typefaces, we specify weights by their numbered value, not name. Currently, the following weights are available.

</Description>

<Description>
  <figure class="ods-table--figure">
    <table class="ods-table">
      <thead>
        <tr>
          <th scope="column">
            Weight
          </th>
          <th scope="column">
            Example
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>400</code>
          </td>
          <td class="type-sample--400">
            Normal (Book) 400
          </td>
        </tr>
        <tr>
          <td>
            <code>600</code>
          </td>
          <td class="type-sample--600">
            Bold (Medium) 600
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</Description>

## Line length

<Description>

For inline and block level content, the line length should be 50 to 75 characters long. In order to facilitate consistency across designs, `max-width: $max-line-length` can be helpful.

</Description>

## Heading implementation

<Description>

When constructing a component or page, always start with <code>h1</code> for the topmost level of hierarchy.

Do not rely on heading elements for styling purposes; instead use classes like <code>.page--title</code> to style component headings.

Following these guidelines will ensure a clean document outline, which will increase both SEO performance and accessibility.

</Description>

## Further reading

<Description>

- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height">"line-height" on MDN</a>

</Description>
