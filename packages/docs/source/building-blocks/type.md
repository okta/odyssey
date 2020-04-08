# Type

Okta’s typography system is designed for clarity in readability and hierarchy.

## Hierarchy

Typographical hierarchy indicates importance of content. Through size and weight, a strong hierarchy can provide clarity to a user to easily understand which level of the content they’re on. Sections need subsections, and those subsections may also need their own subsections. Visually, a user should be able to clearly tell a parent section from a child section simply by the relationship in size and weight between headings.

### Scale

To ensure consistency in typography sizes throughout Okta touchpoints, we’ve created a custom modular type scale.

<figure class="ods-table--figure">
  <table class="ods-table type-sample--table">
    <thead>
      <tr>
        <th scope="column">
          rem
        </th>
        <th scope="column">
          px
        </th>
        <th scope="column">
          function
        </th>
        <th scope="column">
          example
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--rem"></td>
        <td class="type-sample--px"></td>
        <td class="type-sample--function"></td>
        <td class="type-sample--example">Waltz, bad nymph, for quick jigs vex!</td>
      </tr>
    </tbody>
  </table>
</figure>

Each step up in the modular scale is proportionally larger than the step before. The function looks like this:

```scss
@function ms($step) {
  $value: 1rem;

  @if $step > 0 {
    @for $i from 1 through $step {
      $value: ($value * $scale-ratio);
    }
  }

  @if $step < 0 {
    @for $i from $step through -1 {
      $value: ($value / $scale-ratio);
    }
  }

  @return $value;
}
```

### Weight

In order to maintain consistency across browsers and typefaces, we specify weights by their numbered value, not name. Currently, the following weights are available:

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
          <code>font-weight: 400</code>
        </td>
        <td class="type-sample--400">
          Normal 400
        </td>
      </tr>
      <tr>
        <td>
          <code>font-weight: 600</code>
        </td>
        <td class="type-sample--600">
          Semi-bold 600
        </td>
      </tr>
    </tbody>
  </table>
</figure>

## Line-height

Our type variants include two <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height">line-heights</a> available for use:

<figure class="ods-table--figure">
  <table class="ods-table">
    <thead>
      <tr>
        <th scope="column">
          Line-height
        </th>
        <th scope="column"
          Variable
        </th>
        <th scope="column">
          Ratio
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Body Copy &amp; Standard UI
        </td>
        <td>
          <code>$base-line-height</code>
        </td>
        <td>
          1:1.5
        </td>
      </tr>
      <tr>
        <td>
          Headings
        </td>
        <td>
          <code>$heading-line-height</code>
        </td>
        <td>
          1:1.2
        </td>
      </tr>
    </tbody>
  </table>
</figure>

Our heading line-height should be used for any `font-size` set to `ms(4)` or higher.

### Accessibility concerns

Our body copy line-height is based on the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#Accessibility_concerns">MDN recommendation</a>. A minimum value of 1.5 help text remain legible for low-vision users, as well as those with cognitive concerns.

Unitless values ensure that page zooming behaves as expected.

## Line length

For inline and block level content, the line length should be 50 to 75 characters long. In order to facilitate consistency across designs, `max-width: $max-line-length` can be helpful.

## Heading implementation

When constructing a component or page, always start with <code>h1</code> for the topmost level of hierarchy.

Do not rely on heading elements for styling purposes; instead use classes like <code>.callout--title</code> to style component headings.

Following these guidelines will ensure a clean document outline, which will increase both SEO performance and accessibility.

## Further reading

<ul>
  <li>
    <a href="https://alistapart.com/article/more-meaningful-typography">More Meaningful Typography</a>
  </li>
  <li>
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height">"line-height" on MDN</a>
  </li>
</ul>

### Components referenced

<ul>
  <li>
    <a href="/components/callout.html">Callout</a>
  </li>
  <li>
    <a href="/components/forms.html">Form</a>
  </li>
  <li>
    <a href="/components/text-input.html">Text Input</a>
  </li>
</ul>
