---
template: plain
id: base-elements
title: Elements
headline: Elements
description: A glossary of standard HTML elements provided by Odyssey.
lead: A glossary of standard HTML elements provided by Odyssey.
---

## abbr <a name="abbr"></a>

<Description>

> The HTML `<abbr>` element represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>If you're a <abbr title="Backend">BE</abbr> or <abbr title="Frontend">FE</abbr> developer, you should checkout our dev docs.</p>
  </div>

```html
<p>If you're a <abbr title="Backend">BE</abbr> or <abbr title="Frontend">FE</abbr> developer, you should checkout our dev docs.</p>
```
</figure>

## address <a name="address"></a>

<Description>

> The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML `<blockquote>` Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `<cite>` element. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML Citation element (`<cite>`) is used to describe a reference to a cited creative work, and must include the title of that work. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML `<code>` element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>The <code>pop()</code> array method removes the last element of an array and returns that element.</p>
  </div>

```html
<p>The <code>pop()</code> array method removes the last element of an array and returns that element.</p>
```
</figure>


## del <a name="del"></a>

<Description>

> The HTML `<del>` element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The `<ins>` element can be used for the opposite purpose: to indicate text that has been added to the document. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del'>MDN</a></cite>

### Accessibility

Many screen readers do not let users know of the presence of `del`. To fix this, you should consider using `data-a11y-start` and `data-a11y-end`, prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text, this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML Details Element (`<details>`) creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label can be provided using the `<summary>` element. [...] If the first child of the `<details>` element is a `<summary>`, the contents of the `<summary>` element are used as the label for the disclosure widget.  - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details'>MDN</a></cite>

### IE11 support

IE 11 incorrectly renders the `summary` element as "always open". Other than this behavior, it is safe for use.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML Definition element (`<dfn>)` is used to indicate the term being defined within the context of a definition phrase or sentence. The `<p>` element, the `<dt>`/`<dd>` pairing, or the `<section>` element which is the nearest ancestor of the `<dfn>` is considered to be the definition of the term.

There are multiple, valid ways to use `<dfn>`. For the sake of usability, Odyssey recommends you follow one of two formats.

For most terms, the content of `<dfn>` should be term you are defining:

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>A <dfn id="def-cruller">cruller</dfn> is a small, braided torpedo of fried dough.</p>
  </div>

```html
  <p>A <dfn id="def-cruller">cruller</dfn> is a small, braided torpedo of fried dough.</p>
```
</figure>

<Description>

If you're referencing an acronym or abbreviation, you may also combine it with `<abbr>`:

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p><dfn id="def-apf"><abbr title="All Purpose Flour">APF</abbr></dfn> is general-use, unbleached wheat flour.</p>
  </div>

```html
  <p><dfn id="def-apf"><abbr title="All Purpose Flour">APF</abbr></dfn> is general-use, unbleached wheat flour.</p>
```
</figure>

<Description>

In this example, the browser can correctly identify "All Purpose Flour" as the defined term, even though "APF" is the visible acronym.

In both cases, utilizing the `id` attribute allows you to deep link to the definition, providing users with quick access.

</Description>

## dl <a name="dl"></a>

<Description>

> The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).  - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl'>MDN</a></cite>

### Accessibility

Screen readers announce `<dl>` content differently - some may not indicate that the content is a list. To improve usability make sure each list item's content communicates its relationship to other list items.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML `<em>` element marks text that has stress emphasis. The `<em>` element can be nested, with each level of nesting indicating a greater degree of emphasis. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>Do you <em>really</em> want to see that movie?</p>
  </div>

```html
<p>Do you <em>really</em> want to see that movie?</p>
```
</figure>

You can also nest `em` tags to provide an added level of emphasis. Doing so will provide additional style.

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>Do you <em>really, <em>really</em></em> want to see that movie?</p>
  </div>

```html
<p>Do you <em>really, <em>really</em></em> want to see that movie?</p>
```
</figure>

## figure & figcaption <a name="figure"></a>
<Description>

> The HTML `<figure>` (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption, which is specified using the (`<figcaption>`) element. The figure, its caption, and its contents are referenced as a single unit. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <figure>
      <svg height="20vh" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 12.562C119.24 12.562 8.37402 123.428 8.37402 260.188C8.37402 396.948 119.24 507.813 256 507.813C392.76 507.813 503.626 396.947 503.626 260.187C503.626 123.427 392.761 12.562 256 12.562ZM256 347.795C207.616 347.795 168.393 308.572 168.393 260.188C168.393 211.804 207.616 172.581 256 172.581C304.384 172.581 343.607 211.804 343.607 260.188C343.607 308.572 304.385 347.795 256 347.795Z" fill="#FFD562"/>
        <path d="M255.499 4.18799C115.942 4.45099 -0.275001 121.147 -1.23822e-06 260.702C0.0359988 281.529 2.572 301.769 7.298 321.137C15.049 352.898 43.748 375.089 76.442 375.089C81.467 375.089 86.251 374.084 90.605 372.266C95.067 370.4 99.086 367.684 102.448 364.311C109.111 357.66 113.226 348.46 113.226 338.304C113.226 332.108 115.738 326.497 119.794 322.442C123.85 318.386 129.46 315.874 135.656 315.874C141.852 315.874 147.463 318.386 151.518 322.442C155.573 326.497 158.086 332.108 158.086 338.304V401.491C158.086 428.527 180.002 450.442 207.037 450.442H207.049C234.085 450.442 256 428.526 256 401.491V400.593C256 387.494 266.61 376.883 279.71 376.883C286.266 376.883 292.187 379.538 296.482 383.821C300.765 388.116 303.42 394.049 303.42 400.593C303.42 408.069 306.447 414.841 311.351 419.733C316.244 424.637 323.015 427.664 330.491 427.664H333.769C348.722 427.664 360.841 415.546 360.841 400.592V349.069C360.841 334.702 372.493 323.05 386.86 323.05C394.049 323.05 400.545 325.956 405.259 330.67C409.96 335.383 412.879 341.891 412.879 349.069V350.863C412.879 356.246 415.128 361.414 418.729 366.259C419.902 367.838 421.157 369.31 422.474 370.661C443.528 392.326 481.39 385.435 493.353 356.306C493.413 356.174 493.46 356.043 493.521 355.911C505.433 326.34 512 294.029 512 260.187C512 118.634 397.112 3.91299 255.499 4.18799ZM256 347.79C207.611 347.79 168.398 308.577 168.398 260.188C168.398 211.799 207.611 172.586 256 172.586C304.389 172.586 343.602 211.799 343.602 260.188C343.602 308.577 304.39 347.79 256 347.79Z" fill="#FF82E4"/>
        <path d="M16.743 241.7C14.375 240.528 13.405 237.657 14.577 235.289L27.311 209.556C28.483 207.188 31.354 206.218 33.722 207.39C36.09 208.562 37.06 211.433 35.888 213.801L23.154 239.534C21.981 241.901 19.111 242.872 16.743 241.7Z" fill="#0098F8"/>
        <path d="M110.051 117.289C107.683 116.117 106.713 113.246 107.885 110.878L120.619 85.145C121.791 82.777 124.662 81.8069 127.03 82.9789C129.398 84.1509 130.368 87.022 129.196 89.39L116.462 115.123C115.29 117.49 112.42 118.461 110.051 117.289Z" fill="#0098F8"/>
        <path d="M273.939 118.485C271.571 117.313 270.601 114.442 271.773 112.074L284.507 86.341C285.679 83.973 288.55 83.003 290.918 84.175C293.286 85.347 294.256 88.218 293.084 90.586L280.35 116.319C279.178 118.687 276.307 119.657 273.939 118.485Z" fill="#0098F8"/>
        <path d="M350.5 235.718C348.132 234.546 347.162 231.675 348.334 229.307L361.068 203.574C362.24 201.206 365.111 200.236 367.479 201.408C369.847 202.58 370.817 205.451 369.645 207.819L356.911 233.552C355.738 235.921 352.868 236.891 350.5 235.718Z" fill="#0098F8"/>
        <path d="M112.907 281.239C110.561 282.456 107.673 281.54 106.456 279.195L93.2352 253.71C92.0182 251.364 92.9342 248.476 95.2792 247.259C97.6252 246.042 100.513 246.958 101.73 249.303L114.951 274.789C116.168 277.134 115.253 280.022 112.907 281.239Z" fill="white"/>
        <path d="M206.215 156.828C203.869 158.045 200.981 157.129 199.764 154.784L186.543 129.298C185.326 126.952 186.242 124.064 188.587 122.847C190.933 121.63 193.821 122.546 195.038 124.891L208.259 150.377C209.477 152.723 208.561 155.611 206.215 156.828Z" fill="white"/>
        <path d="M370.103 158.025C367.757 159.242 364.869 158.326 363.652 155.981L350.431 130.495C349.214 128.149 350.13 125.261 352.475 124.044C354.821 122.827 357.709 123.743 358.926 126.088L372.147 151.574C373.364 153.919 372.448 156.808 370.103 158.025Z" fill="white"/>
        <path d="M446.663 275.258C444.317 276.475 441.429 275.559 440.212 273.214L426.991 247.728C425.774 245.382 426.69 242.494 429.035 241.277C431.381 240.06 434.269 240.976 435.486 243.321L448.707 268.807C449.925 271.153 449.009 274.041 446.663 275.258Z" fill="white"/>
        <path d="M77.218 214.252C74.644 213.655 73.042 211.083 73.639 208.509L80.133 180.543C80.73 177.969 83.302 176.367 85.876 176.964C88.45 177.561 90.052 180.133 89.455 182.707L82.961 210.673C82.363 213.247 79.792 214.85 77.218 214.252Z" fill="#FF005F"/>
        <path d="M170.527 89.841C167.953 89.244 166.351 86.672 166.948 84.098L173.442 56.132C174.039 53.558 176.611 51.956 179.185 52.553C181.759 53.15 183.361 55.722 182.764 58.296L176.27 86.262C175.672 88.836 173.101 90.439 170.527 89.841Z" fill="#FF005F"/>
        <path d="M334.414 91.037C331.84 90.44 330.238 87.868 330.835 85.294L337.329 57.328C337.926 54.754 340.498 53.152 343.072 53.749C345.646 54.346 347.248 56.918 346.651 59.492L340.157 87.458C339.56 90.032 336.988 91.634 334.414 91.037Z" fill="#FF005F"/>
        <path d="M410.975 208.271C408.401 207.674 406.799 205.102 407.396 202.528L413.89 174.562C414.487 171.988 417.059 170.386 419.633 170.983C422.207 171.58 423.809 174.152 423.212 176.726L416.718 204.692C416.12 207.266 413.549 208.868 410.975 208.271Z" fill="#FF005F"/>
        <path d="M37.817 258.494C39.241 256.268 42.2 255.617 44.426 257.041L68.612 272.509C70.838 273.933 71.489 276.892 70.065 279.118C68.641 281.344 65.682 281.995 63.456 280.571L39.27 265.103C37.044 263.679 36.394 260.721 37.817 258.494Z" fill="#FFEA00"/>
        <path d="M131.126 134.083C132.55 131.857 135.509 131.206 137.735 132.63L161.921 148.098C164.147 149.522 164.798 152.481 163.374 154.707C161.95 156.933 158.991 157.584 156.765 156.16L132.579 140.692C130.353 139.268 129.702 136.31 131.126 134.083Z" fill="#FFEA00"/>
        <path d="M295.013 135.28C296.437 133.054 299.396 132.403 301.622 133.827L325.808 149.295C328.034 150.719 328.685 153.678 327.261 155.904C325.837 158.13 322.878 158.781 320.652 157.357L296.466 141.889C294.24 140.465 293.589 137.506 295.013 135.28Z" fill="#FFEA00"/>
        <path d="M371.574 252.513C372.998 250.287 375.957 249.636 378.183 251.06L402.369 266.528C404.595 267.952 405.246 270.911 403.822 273.137C402.398 275.363 399.439 276.014 397.213 274.59L373.027 259.122C370.801 257.699 370.15 254.74 371.574 252.513Z" fill="#FFEA00"/>
        <path d="M154.939 205.504C156.081 207.886 155.076 210.745 152.693 211.888L126.805 224.3C124.423 225.442 121.564 224.437 120.421 222.054C119.279 219.672 120.284 216.813 122.667 215.67L148.555 203.258C150.938 202.116 153.796 203.121 154.939 205.504Z" fill="#52CE27"/>
        <path d="M248.247 81.093C249.389 83.475 248.384 86.334 246.001 87.477L220.113 99.89C217.731 101.032 214.872 100.027 213.729 97.644C212.587 95.262 213.592 92.403 215.975 91.26L241.863 78.848C244.247 77.704 247.105 78.71 248.247 81.093Z" fill="#52CE27"/>
        <path d="M412.135 82.289C413.277 84.671 412.272 87.53 409.889 88.673L384 101.085C381.617 102.227 378.759 101.222 377.616 98.839C376.474 96.457 377.479 93.598 379.862 92.455L405.75 80.043C408.135 78.901 410.993 79.907 412.135 82.289Z" fill="#52CE27"/>
        <path d="M488.695 199.523C489.837 201.905 488.832 204.764 486.449 205.907L460.561 218.319C458.179 219.461 455.32 218.456 454.177 216.073C453.035 213.691 454.04 210.832 456.423 209.689L482.311 197.277C484.695 196.135 487.553 197.14 488.695 199.523Z" fill="#52CE27"/>
      </svg>
      <figcaption>"Homer" by Joe Jezowski. California, 2020</figcaption>
    </figure>
  </div>

```html
<figure>
  <svg>🍩<svg>
  <figcaption>"Homer" by Joe Jezowski. California, 2020</figcaption>
</figure>
```
</figure>

### Usage

<Description>

`<figure>` is appropriate for supplemental content - standard examples include supporting images, diagrams, and code snippets. Please include a `<figcaption>` to ensure your content has appropriate context.

</Description>

## hr <a name="hr"></a>

<Description>

> The HTML `<hr>` element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML `<ins>` element represents a range of text that has been added to a document. You can use the `<del>` element to similarly represent a range of text that has been deleted from the document. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins'>MDN</a></cite>

### Accessibility

Many screen readers do not let users know of the presence of `ins`. To fix this, you should consider using `data-a11y-start` and `data-a11y-end`, prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text, this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML Keyboard Input element (`<kbd>`) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a `<kbd>` element using its default monospace font, although this is not mandated by the HTML standard. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd'>MDN</a></cite>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>Pressing <kbd>tab</kbd> will take you to the next focusable element on the page.</p>
  </div>

```html
    <p>Pressing <kbd>tab</kbd> will take you to the next focusable element on the page.</p>
```
</figure>

### Usage

When combined with <a href="#samp">`<samp>`</a>, the background of this element will swap to white for better contrast.

</Description>

## mark <a name="mark"></a>

<Description>

> The HTML Mark Text element (`<mark>`) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

## output <a name="output"></a>
> The HTML Output element (`<output>`) is a container element into which a site or app can inject the results of a calculation or the outcome of a user action. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output'>MDN</a></cite>

### Usage

Odyssey does not currently provide styling for `<output>`, but using it correctly will help improve accessibility for your users.

The most common use case is for diplaying computed values in a form:

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <form oninput="outputTotal.value=parseInt(outputJD.value)+parseInt(outputOF.value)">
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="number" name="outputJD" id="outputJD" autocomplete="name" spellcheck="false" value="12" required>
          <label class="ods-label" for="outputJD">Jelly Donuts (Amount)</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <input class="ods-text-input" type="number" name="outputOF" id="outputOF" autocomplete="name" spellcheck="false" value="12" required>
          <label class="ods-label" for="outputOF">Old Fashioned Donuts (Amount)</label>
        </div>
      </fieldset>
      <fieldset class="ods-fieldset">
        <div class="ods-fieldset-flex">
          <label class="ods-label" for="outputTotal">Total Donuts</label>
          <output aria-live="polite" id="outputTotal" name="outputTotal" for="outputJD outputoldfashioneds">24</output>
        </div>
      </fieldset>
    </form>
  </div>

```html
<form oninput="outputTotal.value=parseInt(outputJD.value)+parseInt(outputOF.value)">
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="number" name="outputJD" id="outputJD" autocomplete="name" spellcheck="false" value="12" required>
      <label class="ods-label" for="outputJD">Jelly Donuts (Amount)</label>
    </div>
  </fieldset>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <input class="ods-text-input" type="number" name="outputOF" id="outputOF" autocomplete="name" spellcheck="false" value="12" required>
      <label class="ods-label" for="outputOF">Old Fashioned Donuts (Amount)</label>
    </div>
  </fieldset>
  <fieldset class="ods-fieldset">
    <div class="ods-fieldset-flex">
      <label class="ods-label" for="outputTotal">Total Donuts</label>
      <output aria-live="polite" id="outputTotal" name="outputTotal" for="outputJD outputoldfashioneds">24</output>
    </div>
  </fieldset>
</form>
```
</figure>

### Accessibility

While many browsers automatically treat `<output>` as a "live" region, it's best to include `aria-live="polite"` to ensure best-case functionality. Though it is not well documented, `<output>` can and should utilize a paired `<label>`.

## pre <a name="pre"></a>

<Description>

> The HTML `<pre>` element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional ("monospace") font. Whitespace inside this element is displayed as written. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre">MDN</a></cite>

### Usage

Since the `pre` tag preserves all whitespace, it's best to begin and end your content without linebreaks as below.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML `<q>` element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the `<blockquote>` element. - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>While Marge was fighting the monorail, Homer wondered, <q cite="https://www.imdb.com/title/tt0701173/quotes/qt0245595">Donuts - is there anything they can't do?</q></p>
  </div>

```html
  <p>While Marge was fighting the monorail, Homer wondered, <q cite="https://www.imdb.com/title/tt0701173/quotes/qt0245595">Donuts - is there anything they can't do?</q></p>
```
</figure>

### Usage

<Description>

Only use the `<q>` element when you're quoting a person or text. Don't use this element for sarcasm, scare quotes, or similar - simply use quotes as you "normally" would.

### Smart quotes

Outside of `<q>` and `<blockquote>`, browsers do not enable automatic smart quotes (“”). Instead, they rely on content authors to determine which type to use. Since we cannot ensure broad consistency, Odyssey does not apply smart quotes to `<q>`.

</Description>

## s <a name="s"></a>

<Description>

> The HTML `<s>` element renders text with a strikethrough, or a line through it. Use the `<s>` element to represent things that are no longer relevant or no longer accurate. However, `<s>` is not appropriate when indicating document edits; for that, use the `<del>` and `<ins>` elements, as appropriate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p><s>Ramen with white "Paitan" Broth  (Limited: 15 servings per day).</s></p>
    <p><strong>This dish is now SOLD OUT!</strong></p>
  </div>

```html
<p><s>Ramen with white "Paitan" Broth  (Limited: 15 servings per day).</s></p>
<p><strong>This dish is now SOLD OUT!</strong></p>
```
</figure>

## samp <a name="samp"></a>

<Description>

> The HTML Sample Element (`<samp>`) is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console). - <cite><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp">MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>When iDonut crashed, it told me <samp>Press <kbd>F5</kbd> to refresh bakery</samp>.</p>
  </div>

```html
<p>When iDonut crashed, it told me <samp>Press <kbd>F5</kbd> to refresh bakery</samp>.</p>
```
</figure>

## small <a name="small"></a>

<Description>

> The HTML `<small>` element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p><small>&copy; 2020 Atko, Inc. All Rights Reserved.</small></p>
  </div>

```html
<p><small>&copy; 2020 Atko, Inc. All Rights Reserved.</small></p>
```
</figure>

## strong <a name="strong"></a>

<Description>

> The HTML Strong Importance Element (`<strong>`) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

You can also nest `strong`. Doing so will provide additional style.

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML Subscript element (`<sub>`) specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
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

<Description>

> The HTML Disclosure Summary element (`<summary>`) element specifies a summary, caption, or legend for a `<details>` element's disclosure box. Clicking the `<summary>` element toggles the state of the parent `<details>` element open and closed.

See <a href="#details">`details`</a> for example.

</Description>

## sup <a name="sup"></a>

<Description>

> The HTML Superscript element (`<sup>`) specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <p>The <b>Pythagorean theorem</b> is often expressed as the following equation:</p>
    <p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
  </div>

```html
<p>The <b>Pythagorean theorem</b> is often expressed as the following equation:</p>
<p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
```
</figure>

## var <a name="var"></a>

<Description>

> The HTML `<var>` element represents the name of a variable in a mathematical expression or a programming context. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var'>MDN</a></cite>

</Description>

<figure class="docs-example">
  <div class="docs-example--rendered">
    <h3>Solve for <var>x</var></h3>
    <p>2<sup>2</sup>(<var>x</var>+3)+9-5=32</p>
  </div>

```html
<h3>Solve for <var>x</var></h3>
<p>2<sup>2</sup>(<var>x</var>+3)+9-5=32</p>
```
</figure>
