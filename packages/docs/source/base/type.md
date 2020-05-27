# Type

Okta’s typography system is designed for clarity in readability and hierarchy.

## Hierarchy

Typographical hierarchy indicates importance of content. Through size and weight, a strong hierarchy can provide clarity to a user to easily understand which level of the content they’re on. Sections need subsections, and those subsections may also need their own subsections. Visually, a user should be able to clearly tell a parent section from a child section simply by the relationship in size and weight between headings.

## Titles

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <h1 class="type-sample--example">Title 1</h1>
    <h2 class="type-sample--example">Title 2</h2>
    <h3 class="type-sample--example">Title 3</h3>
    <h4 class="type-sample--example">Title 4</h4>
    <h5 class="type-sample--example">Title 5</h5>
    <h6 class="type-sample--example">Title 6</h6>
  </div>
</figure>

<figure class="ods-table--figure">
  <table class="ods-table type-sample--table">
    <thead>
      <tr>
        <th scope="column">
          variable
        </th>
        <th scope="column">
          rem
        </th>
        <th scope="column">
          px
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-title-1</code></td>
        <td class="type-sample--rem">3rem</td>
        <td class="type-sample--px">48px</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-title-2</code></td>
        <td class="type-sample--rem">2rem</td>
        <td class="type-sample--px">32px</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-title-3</code></td>
        <td class="type-sample--rem">1.5rem</td>
        <td class="type-sample--px">24px</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-title-4</code></td>
        <td class="type-sample--rem">1.25rem</td>
        <td class="type-sample--px">20px</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-title-5</code></td>
        <td class="type-sample--rem">1.125rem</td>
        <td class="type-sample--px">18px</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-title-6</code></td>
        <td class="type-sample--rem">1rem</td>
        <td class="type-sample--px">16px</td>
      </tr>
    </tbody>
  </table>
</figure>

## Display sizes
<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <h1 class="type-sample--example type-sample--example-size-display-1">Display 1</h1>
    <h1 class="type-sample--example type-sample--example-size-display-2">Display 2</h1>
  </div>
</figure>


<figure class="ods-table--figure">
  <table class="ods-table type-sample--table">
    <thead>
      <tr>
        <th scope="column">
          variable
        </th>
        <th scope="column">
          rem
        </th>
        <th scope="column">
          px
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-display-1</code></td>
        <td class="type-sample--rem">8rem</td>
        <td class="type-sample--px">128px</td>
      </tr>
      <tr class="type-sample">
        <td class="type-sample--token"><code>$size-display-2</code></td>
        <td class="type-sample--rem">6rem</td>
        <td class="type-sample--px">96px</td>
      </tr>
    </tbody>
  </table>
</figure>

## Weight

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
          <code>$title-line-height</code>
        </td>
        <td>
          1:1.2
        </td>
      </tr>
    </tbody>
  </table>
</figure>

Our heading line-height should be used for any `font-size` set to `$size-title-2` or higher.

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
