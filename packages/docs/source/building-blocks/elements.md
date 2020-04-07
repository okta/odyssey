# Elements

Odyssey takes care to provide additional style to the following HTML elements by default.


## abbr <a name="abbr"></a> 
> The HTML `<abbr>` element represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>You can use <abbr title="Cascading Style Sheets">CSS</abbr> to style your <abbr title="HyperText Markup Language">HTML</abbr>.</p>
  </div>

```html
<p>You can use <abbr title="Cascading Style Sheets">CSS</abbr> to style your <abbr title="HyperText Markup Language">HTML</abbr>.</p>
```
</figure>

## address <a name="address"></a> 
> The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Contact the author of this page:</p>
    <address>
      <a href="mailto:jim@rock.com">jim@rock.com</a><br>
      <a href="tel:+13115552368">(311) 555-2368</a>
    </address>
  </div>

```html
<p>Contact the author of this page:</p>
<address>
  <a href="mailto:jim@rock.com">jim@rock.com</a><br>
  <a href="tel:+13115552368">(311) 555-2368</a>
</address>
```
</figure>

## blockquote <a name="blockquote"></a>
> The HTML `<blockquote>` Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `<cite>` element. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <blockquote cite="https://www.huxley.net/bnw/four.html">
      <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
      <footer>—Aldous Huxley, <cite>Brave New World</cite></footer>
    </blockquote>
  </div>

```html
  <blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
    <footer>—Aldous Huxley, <cite>Brave New World</cite></footer>
  </blockquote>
```
</figure>

## cite <a name="cite"></a>
> The HTML Citation element (`<cite>`) is used to describe a reference to a cited creative work, and must include the title of that work. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <blockquote>
        <p>It was a bright cold day in April, and the clocks were striking thirteen.</p>
        <footer>
            First sentence in <cite><a href="http://www.george-orwell.org/1984/0.html">Nineteen Eighty-Four</a></cite> by George Orwell (Part 1, Chapter 1).
        </footer>
    </blockquote>
  </div>

```html
  <blockquote>
    <p>It was a bright cold day in April, and the clocks were striking thirteen.</p>
    <footer>
      First sentence in <cite><a href="http://www.george-orwell.org/1984/0.html">Nineteen Eighty-Four</a></cite> by George Orwell (Part 1, Chapter 1).
    </footer>
  </blockquote>
```
</figure>

## code <a name="code"></a> 
> The HTML `<code>` element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>The <code>push()</code> method adds one or more elements to the end of an array and returns the new length of the array.</p>
  </div>

```html
<p>The <code>push()</code> method adds one or more elements to the end of an array and returns the new length of the array.</p>
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

## em <a name="em"></a>
> The HTML `<em>` element marks text that has stress emphasis. The `<em>` element can be nested, with each level of nesting indicating a greater degree of emphasis. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Get out of bed <em>now</em>!</p>
    <p>We <em>had</em> to do something about it.</p>
    <p>This is <em>not</em> a drill!</p>
  </div>

```html
<p>Get out of bed <em>now</em>!</p>
<p>We <em>had</em> to do something about it.</p>
<p>This is <em>not</em> a drill!</p>
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
    <p>§1: The first rule of Fight Club is: You do not talk about Fight Club.</p>
    <hr>
    <p>§2: The second rule of Fight Club is: Always bring cupcakes.</p>
  </div>

```html
<p>§1: The first rule of Fight Club is: You do not talk about Fight Club.</p>
<hr>
<p>§2: The second rule of Fight Club is: Always bring cupcakes.</p>
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
    <p>Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.</p>
  </div>

```html
<p>Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.</p>
```
</figure>

## mark <a name="mark"></a>
> The HTML Mark Text element (`<mark>`) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance or importance in the enclosing context. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Search results for "salamander":</p>
    <hr>
    <p>Several species of <mark>salamander</mark> inhabit the temperate rainforest of the Pacific Northwest.</p>
    <p>Most <mark>salamander</mark>s are nocturnal, and hunt for insects, worms, and other small creatures.</p>
  </div>

```html
<p>Search results for "salamander":</p>

<hr>

<p>Several species of <mark>salamander</mark> inhabit the temperate rainforest of the Pacific Northwest.</p>

<p>Most <mark>salamander</mark>s are nocturnal, and hunt for insects, worms, and other small creatures.</p>
```
</figure>

## s <a name="s"></a>
> The HTML `<s>` element renders text with a strikethrough, or a line through it. Use the `<s>` element to represent things that are no longer relevant or no longer accurate. However, `<s>` is not appropriate when indicating document edits; for that, use the `<del>` and `<ins>` elements, as appropriate. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p><s>There will be a few tickets available at the box office tonight.</s></p>
    <p><strong>The show is now SOLD OUT!</strong></p>
  </div>

```html
  <p><s>There will be a few tickets available at the box office tonight.</s></p>
  <p><strong>The show is now SOLD OUT!</strong></p>
```
</figure>

## small <a name="small"></a>
> The HTML `<small>` element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small'>MDN</a></cite>


<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>MDN Web Docs is a learning platform for Web technologies and the software that powers the Web.</p>
    <hr>
    <p><small>The content is licensed under a Creative Commons Attribution-ShareAlike 2.5 Generic License.</small></p>
  </div>

```html
<p>MDN Web Docs is a learning platform for Web technologies and the software that powers the Web.</p>
<hr>
<p><small>The content is licensed under a Creative Commons Attribution-ShareAlike 2.5 Generic License.</small></p>
```
</figure>   

## strong <a name="strong"></a>
> The HTML Strong Importance Element (`<strong>`) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong'>MDN</a></cite>


<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      &hellip; the most important rule, the rule you can never 
      forget, no matter how much he cries, no matter how much 
      he begs: <strong>never feed him after midnight</strong>.
    </p>
  </div>

```html
<p>
  &hellip; the most important rule, the rule you can never 
  forget, no matter how much he cries, no matter how much 
  he begs: <strong>never feed him after midnight</strong>.
</p>
```
</figure>

You can also nest `strong`. Doing so will provide additional style.

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>
      &hellip; the most important rule, the rule you can never 
      forget, no matter how much he cries, no matter how much 
      he begs: <strong>never feed him <strong>after midnight</strong></strong>.
    </p>
  </div>

```html
<p>
  &hellip; the most important rule, the rule you can never 
  forget, no matter how much he cries, no matter how much 
  he begs: <strong>never feed him <strong>after midnight</strong></strong>.
</p>
```

## sub <a name="sub"></a>
> The HTML Subscript element (`<sub>`) specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>Almost every developer's favorite molecule is <var>C</var><sub>8</sub><var>H</var><sub>10</sub><var>N</var><sub>4</sub><var>O</var><sub>2</sub>, also known as "caffeine."</p>
  </div>

```html
<p>
  Almost every developer's favorite molecule is <var>C</var><sub>8</sub><var>H</var><sub>10</sub><var>N</var><sub>4</sub><var>O</var><sub>2</sub>, also known as "caffeine."
</p>
```
</figure>

## sup <a name="sup"></a>
> The HTML Superscript element (`<sup>`) specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>The <b>Pythagorean theorem</b> is often expressed as the following equation:</p>
    <p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
  </div>

```html
<p>The <b>Pythagorean theorem</b> is often expressed as the following equation:</p>
<p><var>a<sup>2</sup></var> + <var>b<sup>2</sup></var> = <var>c<sup>2</sup></var></p>
```
</figure>

## var <a name="var"></a> 
> The HTML `<var>` element represents the name of a variable in a mathematical expression or a programming context. - <cite><a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var'>MDN</a></cite>

<figure class="nimatron--example">
  <div class="nimatron--rendered">
    <p>The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where <var>l</var> represents the length, <var>w</var> the width and <var>h</var> the height of the box.</p>
  </div>

```html
<p>The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where <var>l</var> represents the length, <var>w</var> the width and <var>h</var> the height of the box.</p>
```
</figure>
