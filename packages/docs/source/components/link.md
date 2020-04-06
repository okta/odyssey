# Links

Links are navigation elements displayed as text. A link can open another page or jump to a section of a page.

## Types of links

### Default

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Here is a <a href="#" class="is-link-default">regular link</a>.</p>
    <p>Here is a <a href="#" class="is-link-hover">hovered link</a>.</p>
    <p>Here is a <a href="#" class="is-link-visited">visited link</a>.</p>
  </div>

  ```html
  <a href="#">Link</a>
  ```

</figure>

The <code>:active</code> state of a link does not have any unique styling, so it matches the <code>:hover</code> styling.

### Anchor

An anchor link takes you to a location on the current page. It is typically used in documentation.

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

(See <a href="https://developers.google.com/web/tools/lighthouse/audits/noopener" target="_blank" rel="noopener">Google Developer Documentation</a> for security and performance considerations when using external links)

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  </div>

  ```html
  <a href="https://okta.com" target="_blank" rel="noopener">Okta.com</a>
  ```
</figure>

## Guidelines

### Best practices

<ul>
  <li>Try to limit a link to at most 3 words</li>
  <li>Choose link text that describes the destination (e.g. "Settings"), rather than generic text (e.g. "Click here" or a URL)</li>
  <li>Avoid using a link <code>&lt;a&gt;</code> for actions; use a button <code>&lt;button&gt;</code> instead</li>
  <li>Avoid underlining text for purely decorative purposes, as it will be mistaken for linked text</li>
</ul>

### Styling

By default, links embedded inside blocks of prose text are underlined, while links used inside navigational menus and nav bars do not require an underline and may be custom-styled. 

Link styling can also be adjusted for branding, theme, or contextual purposes. Examples include color, font size, or font weight. Be mindful of consistency with the system you are designing for.

### Accessibility

Links should display a visible <code>:focus</code> state when users interact via keyboard.

### Localization

When localizing links, avoid putting the text through a translator and applying the markup. Instead, consider the language's nuances and grammar to make the link and its surrounding messaging feel natural.

## Further reading

<ul>
  <li><a href="https://usabilitygeek.com/hyperlink-usability-guidelines-usable-links/ " target="_blank" rel="noopener">https://usabilitygeek.com/hyperlink-usability-guidelines-usable-links/</a></li>
  <li><a href="https://www.theverge.com/2014/3/13/5503894/google-removes-underlined-links-site-redesign " target="_blank" rel="noopener">https://www.theverge.com/2014/3/13/5503894/google-removes-underlined-links-site-redesign</a></li>
  <li><a href="https://www.webfx.com/blog/web-design/hyperlink-design/ " target="_blank" rel="noopener">https://www.webfx.com/blog/web-design/hyperlink-design/</a></li>
  <li><a href="https://developers.google.com/web/tools/lighthouse/audits/noopener " target="_blank" rel="noopener">https://developers.google.com/web/tools/lighthouse/audits/noopener</a></li>
  <li><a href="https://google.github.io/material-design-icons/#icons-in-rtl " target="_blank" rel="noopener">https://google.github.io/material-design-icons/#icons-in-rtl</a></li>
  <li><a href="https://ux.stackexchange.com/questions/19892/opening-website-external-links-in-new-window-published-usability-tests " target="_blank" rel="noopener">https://ux.stackexchange.com/questions/19892/opening-website-external-links-in-new-window-published-usability-tests</a></li>
</ul>


