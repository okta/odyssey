::: slot nimatron-all

# Link

Links are navigation elements displayed as text. A link can can be used to bring a user to another page or initiate a download.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>If you need more info, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link">view the spec on MDN</a>.</p>
  </div>

  ```html
  If you need more info, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link">view the spec on MDN</a>.
  ```

</figure>

## Specialty cases

### Icons

Icons may be included in standalone links, but are not supported within paragraph content or longer copy. Add the `.ods-link--has-icon` class to ensure proper layout.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <a href="#icons" class="ods-link--has-icon"><svg aria-hidden viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>Visit our Link docs</a>
  </div>

  ```html
  <a href="#icons" class="ods-link--has-icon"><svg aria-hidden>...</svg>Visit our Link docs</a>
  ```

</figure>

### Mailto

If a direct email link is required, display the whole address (e.g. lauren.ipsum@okta.com). Avoid colloquial text that might obfuscate the presence of a mailto link (e.g., "Contact Us").

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>
  </div>

  ```html
  <a href="mailto:lauren.ipsum@okta.com">lauren.ipsum@okta.com</a>
  ```
</figure>

### External links

An external link opens in a separate tab and can be identified by the <span class="sample--external-link-icon" aria-label="External link icon"></span> icon appended to the link.

Use an external link when:

<ul>
  <li>The destination of the link aids in the completion of a task on the current tab (e.g. additional information such as help documentation)</li>
  <li>Opening the link in the current tab would result in a significant loss of data or interruption of flow (e.g. while filling out a long form)</li>
</ul>

(See <a href="https://developers.google.com/web/tools/lighthouse/audits/noopener">Google Developer Documentation</a> for security and performance considerations when using external links)

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  </div>

  ```html
  <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  ```
</figure>

### Visited Links

Odyssey has removed unique styling for `:visited` links. This is an intentional compromise that preferences user security and ease of maintenance over the `:visited` affordance.

## Guidelines

### Best practices

<ul>
  <li>Try to limit a link to at most 3 words</li>
  <li>Choose link text that describes the destination (e.g. "Settings"), rather than generic text (e.g. "Click here" or a URL)</li>
  <li>Avoid using a link <code>&lt;a&gt;</code> for actions; use a button <code>&lt;button&gt;</code> instead</li>
</ul>

### Accessibility

Links in Odyssey are not underlined, but do maintain a minimum 3:1 contrast ratio with our body text color and a 4.5:1 contrast ratio with our available background colors. If you deviate from these standards via overrides, please ensure that your links have a non-color indicator, e.g. an underline.

Links should display a visible <code>:focus</code> state when users interact via keyboard. Odyssey preserves the default `:focus` state for each browser.

### Localization

When localizing links, avoid putting the text through a translator and applying the markup. Instead, consider the language's nuances and grammar to make the link and its surrounding messaging feel natural.

:::
