---
title: Elements
---

::: slot nimatron-all

# Elements

Odyssey takes care to provide additional style to the following HTML elements by default.


## abbr <a name="abbr"></a>
> The HTML `<abbr>` element represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>If you're a <abbr title="Backend">BE</abbr> or <abbr title="Frontend">FE</abbr> developer, you should checkout our dev docs.</p>
  </div>

```html
<p>If you're a <abbr title="Backend">BE</abbr> or <abbr title="Frontend">FE</abbr> developer, you should checkout our dev docs.</p>
```
</figure>

## address <a name="address"></a>
> The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Okta Headquarters</p>
    <address>
      <a href="mailto:press@okta.com">press@okta.com</a><br>
      <a href="tel:+18887227871">(888) 722-7871</a>
    </address>
  </div>

```html
<p>Okta Headquarters</p>
<address>
  <a href="mailto:press@okta.com">press@okta.com</a><br>
  <a href="tel:+18887227871">(888) 722-7871</a>
</address>
```
</figure>

## blockquote <a name="blockquote"></a>
> The HTML `<blockquote>` Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `<cite>` element. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <blockquote cite="https://books.google.com/books?id=dlYEAAAAMBAJ&lpg=PP1&dq=Life,+2+May+1955&pg=PA61&hl=en#v=onepage&q=Life%2C%202%20May%201955&f=false">
      <p>The important thing is not to stop questioning. Curiosity has its own reason for existence.</p>
      <footer>Albert Einstein, <cite>Old Man's Advice to Youth: "Never Lose a Holy Curiosity," LIFE magazine (2 May 1955) statement to William Miller, p. 64.</cite></footer>
    </blockquote>
  </div>

```html
  <blockquote cite="https://books.google.com/books?id=dlYEAAAAMBAJ&lpg=PP1&dq=Life,+2+May+1955&pg=PA61&hl=en#v=onepage&q=Life%2C%202%20May%201955&f=false">
    <p>The important thing is not to stop questioning. Curiosity has its own reason for existence.</p>
    <footer>Albert Einstein, <cite>Old Man's Advice to Youth: "Never Lose a Holy Curiosity," LIFE magazine (2 May 1955) statement to William Miller, p. 64.</cite></footer>
  </blockquote>
```
</figure>

## cite <a name="cite"></a>
> The HTML Citation element (`<cite>`) is used to describe a reference to a cited creative work, and must include the title of that work. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <blockquote>
        <p>Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy.</p>
        <footer>
            First sentence in <cite><a href="https://www.gutenberg.org/files/1727/1727-h/1727-h.htm#chap01">The Odyssey</a></cite> by Homer (Book I).
        </footer>
    </blockquote>
  </div>

```html
  <blockquote>
    <p>Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy.</p>
    <footer>
        First sentence in <cite><a href="https://www.gutenberg.org/files/1727/1727-h/1727-h.htm#chap01">The Odyssey</a></cite> by Homer (Book I).
    </footer>
  </blockquote>
```
</figure>

## code <a name="code"></a>
> The HTML `<code>` element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>The <code>pop()</code> array method removes the last element of an array and returns that element.</p>
  </div>

```html
<p>The <code>pop()</code> array method removes the last element of an array and returns that element.</p>
```
</figure>

## del <a name="del"></a>
> The HTML `<del>` element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The `<ins>` element can be used for the opposite purpose: to indicate text that has been added to the document. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del'>MDN</a></cite>

### Accessibility

Many screen readers do not let users know of the presence of `del`. To fix this, you should consider using `data-a11y-start` and `data-a11y-end`, prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text, this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <blockquote>
      There is <del data-a11y-start=" [deletion start] "  data-a11y-end=" [deletion end] ">nothing</del> <ins data-a11y-start=" [insertion start] "  data-a11y-end=" [insertion end] ">no code</ins> either good or bad, but running it makes it so.
    </blockquote>
  </div>

```html
  <blockquote>
      There is <del data-a11y-start=" [deletion start] "  data-a11y-end=" [deletion end] ">nothing</del> <ins data-a11y-start=" [insertion start] "  data-a11y-end=" [insertion end] ">no code</ins> either good or bad, but running it makes it so.
  </blockquote>
```
</figure>

## details <a name="details"></a>
> The HTML Details Element (`<details>`) creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label can be provided using the `<summary>` element. [...] If the first child of the `<details>` element is a `<summary>`, the contents of the `<summary>` element are used as the label for the disclosure widget.  - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details'>MDN</a></cite>

### IE11 support

IE 11 incorrectly renders the `summary` element as "always open". Other than this behavior, it is safe for use.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <details>
      <summary>What is Okta?</summary>
      <p>Okta is the foundation for secure connections between people and technology. It’s a service that gives employees, customers, and partners secure access to the tools they need to do their most important work.</p>
    </details>
  </div>

```html
  <details>
    <summary>What is Okta?</summary>
    <p>Okta is the foundation for secure connections between people and technology. It’s a service that gives employees, customers, and partners secure access to the tools they need to do their most important work.</p>
  </details>
```
</figure>

## dfn <a name="dfn"></a>
> The HTML Definition element (`<dfn>)` is used to indicate the term being defined within the context of a definition phrase or sentence. The `<p>` element, the `<dt>`/`<dd>` pairing, or the `<section>` element which is the nearest ancestor of the `<dfn>` is considered to be the definition of the term.

There are multiple, valid ways to use `<dfn>`. For the sake of usability, Odyssey recommends you follow one of two formats.

For most terms, the content of `<dfn>` should be term you are defining:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>A <dfn id="def-cruller">cruller</dfn> is a small, braided torpedo of fried dough.</p>
  </div>

```html
  <p>A <dfn id="def-cruller">cruller</dfn> is a small, braided torpedo of fried dough.</p>
```
</figure>

If you're referencing an acronym or abbreviation, you may also combine it with `<abbr>`:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p><dfn id="def-apf"><abbr title="All Purpose Flour">APF</abbr></dfn> is general-use, unbleached wheat flour.</p>
  </div>

```html
  <p><dfn id="def-apf"><abbr title="All Purpose Flour">APF</abbr></dfn> is general-use, unbleached wheat flour.</p>
```
</figure>

In this example, the browser can correctly identify "All Purpose Flour" as the defined term, even though "APF" is the visible acronym.

In both cases, utilizing the `id` attribute allows you to deep link to the definition, providing users with quick access.

## dl <a name="dl"></a>
> The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).  - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl'>MDN</a></cite>

### Accessibility

Screen readers announce `<dl>` content differently - some may not indicate that the content is a list. To improve usability make sure each list item's content communicates its relationship to other list items.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <h4>Gentlemen of the Mushroom Kingdon</h4>
    <dl>
      <dt>Mario</dt>
      <dd>red hat, older twin brother, classic mustache</dd>
      <dt>Luigi</dt>
      <dd>green hat, younger twin brother, classic mustache</dd>
      <dt>Wario</dt>
      <dd>yellow hat, not a twin, kinked mustache</dd>
      <dd>loves garlic</dd>
      <dt>Waluigi</dt>
      <dd>purple hat, not a twin, pointy mustache</dd>
    </dl>
  </div>

```html
  <h4>Gentlemen of the Mushroom Kingdon</h4>
  <dl>
      <dt>Mario</dt>
      <dd>red hat, older twin brother, classic mustache</dd>
      <dt>Luigi</dt>
      <dd>green hat, younger twin brother, classic mustache</dd>
      <dt>Wario</dt>
      <dd>yellow hat, not a twin, kinked mustache</dd>
      <dd>loves garlic</dd>
      <dt>Waluigi</dt>
      <dd>purple hat, not a twin, pointy mustache</dd>
    </dl>
```
</figure>

## em <a name="em"></a>
> The HTML `<em>` element marks text that has stress emphasis. The `<em>` element can be nested, with each level of nesting indicating a greater degree of emphasis. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Do you <em>really</em> want to see that movie?</p>
  </div>

```html
<p>Do you <em>really</em> want to see that movie?</p>
```
</figure>

You can also nest `em` tags to provide an added level of emphasis. Doing so will provide additional style.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Do you <em>really, <em>really</em></em> want to see that movie?</p>
  </div>

```html
<p>Do you <em>really, <em>really</em></em> want to see that movie?</p>
```
</figure>


## hr <a name="hr"></a>
> The HTML `<hr>` element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>This is the first paragraph.</p>
    <hr>
    <p>This is the second paragraph.</p>
  </div>

```html
<p>This is the first paragraph.</p>
<hr>
<p>This is the second paragraph.</p>
```
</figure>

## ins <a name="ins"></a>
> The HTML `<ins>` element represents a range of text that has been added to a document. You can use the `<del>` element to similarly represent a range of text that has been deleted from the document. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins'>MDN</a></cite>

### Accessibility

Many screen readers do not let users know of the presence of `ins`. To fix this, you should consider using `data-a11y-start` and `data-a11y-end`, prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text, this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>“You're late!”</p>
    <del data-a11y-start=" [deletion start] "  data-a11y-end=" [deletion end] ">
        <p>“I apologize for the delay.”</p>
    </del>
    <ins data-a11y-start=" [insertion start] "  data-a11y-end=" [insertion end] " cite="../howtobeawizard.html" datetime="2018-05">
        <p>“A wizard is never late &hellip;”</p>
    </ins>
  </div>

```html
<p>“You're late!”</p>
<del>
    <p>“I apologize for the delay.”</p>
</del>
<ins cite="../howtobeawizard.html" datetime="2018-05">
    <p>“A wizard is never late &hellip;”</p>
</ins>
```
</figure>

## kbd <a name="kbd"></a>
> The HTML Keyboard Input element (`<kbd>`) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a `<kbd>` element using its default monospace font, although this is not mandated by the HTML standard. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Pressing <kbd>tab</kbd> will take you to the next focusable element on the page.</p>
  </div>

```html
    <p>Pressing <kbd>tab</kbd> will take you to the next focusable element on the page.</p>
```
</figure>

### Usage

When combined with <a href="#samp">`<samp>`</a>, the background of this element will swap to white for better contrast.

## mark <a name="mark"></a>
> The HTML Mark Text element (`<mark>`) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Search results for "Button":</p>
    <hr>
    <ul>
      <li><mark>Button</mark> labels should clearly indicate what action the user is taking, e.g. "Add User" instead of "Submit".</li>
      <li>Please follow normal <mark>Button</mark> variant guidelines within tables.</li>
    </ul>
  </div>

```html
<p>Search results for "Button":</p>
<hr>
<ul>
  <li><mark>Button</mark> labels should clearly indicate what action the user is taking, e.g. "Add User" instead of "Submit".</li>
  <li>Please follow normal <mark>Button</mark> variant guidelines within tables.</li>
</ul>
```
</figure>

## pre <a name="pre"></a>
> The HTML `<pre>` element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional ("monospace") font. Whitespace inside this element is displayed as written. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre">MDN</a></cite>

### Usage

Since the `pre` tag preserves all whitespace, it's best to begin and end your content without linebreaks as below.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
<pre><code>const fruitColors = {
  apple: 'red',
  banana: 'yellow'
}</code></pre>
  </div>

```html
<pre><code>const fruitColors = {
  apple: 'red',
  banana: 'yellow'
}</code></pre>
```
</figure>

## q <a href="q"></a>
> The HTML `<q>` element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the `<blockquote>` element. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>While Marge was fighting the monorail, Homer wondered, <q cite="https://www.imdb.com/title/tt0701173/quotes/qt0245595">Donuts - is there anything they can't do?</q></p>
  </div>

```html
  <p>While Marge was fighting the monorail, Homer wondered, <q cite="https://www.imdb.com/title/tt0701173/quotes/qt0245595">Donuts - is there anything they can't do?</q></p>
```
</figure>

### Usage

Only use the `<q>` element when you're quoting a person or text. Don't use this element for sarcasm, scare quotes, or similar - simply use quotes as you "normally" would.

### Smart quotes

Outside of `<q>` and `<blockquote>`, browsers do not enable automatic smart quotes (“”). Instead, they rely on content authors to determine which type to use. Since we cannot ensure broad consistency, Odyssey does not apply smart quotes to `<q>`.

## s <a name="s"></a>
> The HTML `<s>` element renders text with a strikethrough, or a line through it. Use the `<s>` element to represent things that are no longer relevant or no longer accurate. However, `<s>` is not appropriate when indicating document edits; for that, use the `<del>` and `<ins>` elements, as appropriate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p><s>Ramen with white "Paitan" Broth  (Limited: 15 servings per day).</s></p>
    <p><strong>This dish is now SOLD OUT!</strong></p>
  </div>

```html
<p><s>Ramen with white "Paitan" Broth  (Limited: 15 servings per day).</s></p>
<p><strong>This dish is now SOLD OUT!</strong></p>
```
</figure>

## samp <a name="samp"></a>
> The HTML Sample Element (`<samp>`) is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console). - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp">MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>When iDonut crashed, it told me <samp>Press <kbd>F5</kbd> to refresh bakery</samp>.</p>
  </div>

```html
<p>When iDonut crashed, it told me <samp>Press <kbd>F5</kbd> to refresh bakery</samp>.</p>
```
</figure>

## small <a name="small"></a>
> The HTML `<small>` element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p><small>&copy; 2020 Atko, Inc. All Rights Reserved.</small></p>
  </div>

```html
<p><small>&copy; 2020 Atko, Inc. All Rights Reserved.</small></p>
```
</figure>

## strong <a name="strong"></a>
> The HTML Strong Importance Element (`<strong>`) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      For your safety and the safety of others, <strong>please don't run.</strong>
    </p>
  </div>

```html
<p>
  For your safety and the safety of others, <strong>please don't run.</strong>
</p>
```
</figure>

You can also nest `strong`. Doing so will provide additional style.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      <strong>For your safety and the safety of others, <strong>please don't run.</strong></strong>
    </p>
  </div>

```html
<p>
  <strong>For your safety and the safety of others, <strong>please don't run.</strong></strong>
</p>
```
</figure>

## sub <a name="sub"></a>
> The HTML Subscript element (`<sub>`) specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      Penicillin (R-C<sub>9</sub>H<sub>11</sub>N<sub>2</sub>O<sub>4</sub>S) was discovered by Alexander Fleming in 1928.
    </p>
  </div>

```html
<p>
  Penicillin (R-C<sub>9</sub>H<sub>11</sub>N<sub>2</sub>O<sub>4</sub>S) was discovered by Alexander Fleming in 1928.
</p>
```
</figure>

## summary <a name="summary"></a>
> The HTML Disclosure Summary element (`<summary>`) element specifies a summary, caption, or legend for a `<details>` element's disclosure box. Clicking the `<summary>` element toggles the state of the parent `<details>` element open and closed.

See <a href="#details">`details`</a> for example.

## sup <a name="sup"></a>
> The HTML Superscript element (`<sup>`) specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>The <b>Pythagorean theorem</b> is often expressed as the following equation:</p>
    <p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
  </div>

```html
<p> </p>
<p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
```
</figure>

## var <a name="var"></a>
> The HTML `<var>` element represents the name of a variable in a mathematical expression or a programming context. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <h3>Solve for <var>x</var></h3>
    <p>2<sup>2</sup>(<var>x</var>+3)+9-5=32</p>
  </div>

```html
<h3>Solve for <var>x</var></h3>
<p>2<sup>2</sup>(<var>x</var>+3)+9-5=32</p>
```
</figure>

:::
