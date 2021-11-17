/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from "react";
import { Story } from "@storybook/react";
import { Text, Heading, Link, ScreenReaderText } from "@okta/odyssey-react";
import type { TextProps } from "@okta/odyssey-react";
import { Text as Source } from "../../../../odyssey-react/src";

export default {
  title: `Utilities/Text/Elements`,
  component: Source,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
};

const Template: Story<TextProps> = (props) => <Text as="span" {...props} />;

export const span = Template.bind({});
span.storyName = "span (default)";
span.parameters = {
  docs: {
    description: {
      story:
        "> The `<span>` HTML element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. `<span>` is very much like a `<div>` element, but `<div>` is a block-level element whereas a `<span>` is an inline element. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)",
    },
  },
};
span.args = {
  children: "Text based content",
};

export const abbr = Template.bind({});
abbr.storyName = "abbr";
abbr.parameters = {
  docs: {
    description: {
      story:
        "> The HTML `<abbr>` element represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation. If present, title must contain this full description and nothing else. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr)",
    },
  },
};
abbr.args = {
  children: (
    <Text as="p">
      If you are a
      <Text as="abbr" title="Back-end">
        BE
      </Text>
      or
      <Text as="abbr" title="Front-end">
        FE
      </Text>
      developer, you should checkout our dev docs.
    </Text>
  ),
  as: "abbr",
};

export const address = Template.bind({});
address.storyName = "address";
address.parameters = {
  docs: {
    description: {
      story:
        "> The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)",
    },
  },
};
address.args = {
  children: "address",
  as: "address",
};

export const blockquote = Template.bind({});
blockquote.storyName = "blockquote";
blockquote.parameters = {
  docs: {
    description: {
      story:
        "> The `<blockquote>` HTML element indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `<cite>` element. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)",
    },
  },
};
blockquote.args = {
  children: (
    <Text>
      <Text as="p">
        The important thing is not to stop questioning. Curiosity has its own
        reason for existence.
      </Text>
      <footer>
        Albert Einstein,{" "}
        <Text as="cite">
          Old Man's Advice to Youth: "Never Lose a Holy Curiosity," LIFE
          magazine (2 May 1955) statement to William Miller, p. 64.
        </Text>
      </footer>
    </Text>
  ),
  as: "blockquote",
};

export const cite = Template.bind({});
cite.storyName = "cite";
cite.parameters = {
  docs: {
    description: {
      story:
        "> The HTML Citation element (`<cite>`) is used to describe a reference to a cited creative work, and must include the title of that work. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite)",
    },
  },
};
cite.args = {
  children: (
    <Text as="blockquote">
      <Text as="p">
        Tell me, O Muse, of that ingenious hero who travelled far and wide after
        he had sacked the famous town of Troy.
      </Text>
      <footer>
        First sentence in{" "}
        <Text as="cite">
          <Link href="https://www.gutenberg.org/files/1727/1727-h/1727-h.htm#chap01">
            The Odyssey
          </Link>
        </Text>{" "}
        by Homer (Book I).
      </footer>
    </Text>
  ),
};

export const code = Template.bind({});
code.storyName = "code";
code.parameters = {
  docs: {
    description: {
      story:
        "> The `<code>` HTML element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code)",
    },
  },
};
code.args = {
  children: "console.log(`Hello world`);",
  as: "code",
};

export const del = Template.bind({});
del.storyName = "del";
del.parameters = {
  docs: {
    description: {
      story: `> The &lt;del&gt; HTML element represents a range of text that has been deleted from a document. This can be used when rendering "track changes"
        or source code diff information, for example. The &lt;ins&gt; element can be used for the opposite purpose: to indicate text that has been added
        to the document. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del)

### Accessibility

Many screen readers do not let users know of the presence of &lt;del&gt;. To fix this, you should consider using the ScreenReaderText component to
prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text,
this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.`,
    },
  },
};
del.args = {
  children: (
    <Text>
      There is{" "}
      <Text as="del">
        <ScreenReaderText>[deletion start]</ScreenReaderText>
        nothing
        <ScreenReaderText>[deletion end]</ScreenReaderText>
      </Text>{" "}
      <Text as="del">
        <ScreenReaderText>[insertion start]</ScreenReaderText>
        no code <ScreenReaderText>[insertion start]</ScreenReaderText>
      </Text>{" "}
      either good or bad, but running it makes it so.
    </Text>
  ),
  as: "blockquote",
};

/** @todo revisit this example, its a complex one */
export const dfn = Template.bind({});
dfn.storyName = "dfn";
dfn.parameters = {
  docs: {
    description: {
      story: `> The &lt;dfn&gt; is used to indicate the term being defined within the context of a definition phrase or sentence. The &lt;p&gt; element, the &lt;dt&gt;/&lt;dd&gt; pairing, or the &lt;section&gt; element which is the nearest ancestor of the &lt;dfn&gt; is considered to be the definition of the term. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Eldfnent/dfn)
        There are multiple, valid ways to use &lt;dfn&gt;.

For the sake of usability, Odyssey recommends you follow one of two formats.
For most terms, the content of &lt;dfn&gt; should be term you are defining:`,
    },
  },
};
dfn.args = {
  children: (
    <Text as="p">
      A{" "}
      <Text as="dfn" id="def-cruller">
        cruller
      </Text>{" "}
      is a small, braided torpedo of fried dough.
    </Text>
  ),
};

export const em = Template.bind({});
em.storyName = "em";
em.parameters = {
  docs: {
    description: {
      story:
        "> The `<em>` HTML element marks text that has stress emphasis. The `<em>` element can be nested, with each level of nesting indicating a greater degree of emphasis. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)",
    },
  },
};
em.args = {
  children: "This text is emphasized",
  as: "em",
};

export const ins = Template.bind({});
ins.storyName = "ins";
ins.parameters = {
  docs: {
    description: {
      story: `> The HTML &lt;ins&gt; element represents a range of text that has been added to a document. You can use the <del> element to similarly represent a range of text that has been deleted from the document. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins)

### Accessibility

Many screen readers do not let users know of the presence of ins. To fix this, you should consider using the ScreenReaderText component, prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text, this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.`,
    },
  },
};
ins.args = {
  children: (
    <>
      <Text as="p">“You're late!”</Text>
      <Text as="del">
        <p>“I apologize for the delay.”</p>
      </Text>
      <Text as="ins" cite="../howtobeawizard.html">
        <p>“A wizard is never late &hellip;”</p>
      </Text>
    </>
  ),
};

export const kbd = Template.bind({});
kbd.storyName = "kbd";
kbd.parameters = {
  docs: {
    description: {
      story:
        "> The `<kbd>` HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a <kbd> element using its default monospace font, although this is not mandated by the HTML standard. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)",
    },
  },
};
kbd.args = {
  children: (
    <Text as="p">
      Pressing <Text as="kbd">tab</Text> will take you to the next focusable
      element on the page.
    </Text>
  ),
};

export const mark = Template.bind({});
mark.storyName = "mark";
mark.parameters = {
  docs: {
    description: {
      story:
        "> The `<mark>` HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a <mark> element using its default monospace font, although this is not mandated by the HTML standard. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)",
    },
  },
};
mark.args = {
  children: (
    <Text>
      <Text as="p">Search results for "Button":</Text>
      <hr />
      <ul>
        <li>
          <Text as="mark">Button</Text> labels should clearly indicate what
          action the user is taking, e.g. "Add User" instead of "Submit".
        </li>
        <li>
          Please follow normal <mark>Button</mark> variant guidelines within
          tables.
        </li>
      </ul>
    </Text>
  ),
};

export const p = Template.bind({});
p.storyName = "p";
p.parameters = {
  docs: {
    description: {
      story:
        "> The `<p>` HTML element represents a paragraph. Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, but HTML paragraphs can be any structural grouping of related content, such as images or form fields. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)",
    },
  },
};
p.args = {
  children:
    "Odyssey is Okta’s official design system built for use across all Okta products and sites. We aim to enable designers and developers to build efficiently and consistently while optimizing for user experience and accessibility.",
  as: "p",
};

export const pre = Template.bind({});
pre.storyName = "pre";
pre.parameters = {
  docs: {
    description: {
      story:
        '> The `<pre>` HTML element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional, or "monospaced, font. Whitespace inside this element is displayed as written. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)',
    },
  },
};
pre.args = {
  children: (
    <Text as="pre">
      <code>
        {`const fruitColors = {
  apple: 'red',
  banana: 'yellow'
}`}
      </code>
    </Text>
  ),
  as: "pre",
};

export const q = Template.bind({});
q.storyName = "q";
q.parameters = {
  docs: {
    description: {
      story:
        "> The HTML `<q>` element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the <blockquote> element - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)",
    },
  },
};
q.args = {
  children: (
    <Text as="p">
      While Marge was fighting the monorail, Homer wondered,{" "}
      <Text as="q" cite="https://www.imdb.com/title/tt0701173/quotes/qt0245595">
        Donuts - is there anything they can't do?
      </Text>
    </Text>
  ),
};

export const s = Template.bind({});
s.storyName = "s";
s.parameters = {
  docs: {
    description: {
      story:
        "> The HTML `<s>` element renders text with a strikethrough, or a line through it. Use the <s> element to represent things that are no longer relevant or no longer accurate. However, <s> is not appropriate when indicating document edits; for that, use the <del> and <ins> elements, as appropriate. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s)",
    },
  },
};
s.args = {
  children: (
    <>
      <Text as="p">
        <Text as="s">
          Ramen with white "Paitan" Broth (Limited: 15 servings per day).
        </Text>
      </Text>
      <Text as="p">
        <Text as="strong">
          This dish is now <strong>sold out!</strong>
        </Text>
      </Text>
    </>
  ),
};

export const samp = Template.bind({});
samp.storyName = "samp";
samp.parameters = {
  docs: {
    description: {
      story:
        "> The HTML Sample Element (`<samp>`) is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console). - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp)",
    },
  },
};
samp.args = {
  children: (
    <Text as="p">
      When iDonut crashed, it told me
      <Text as="samp">
        Press <Text as="kbd">F5</Text> to refresh bakery.
      </Text>
    </Text>
  ),
};

export const small = Template.bind({});
small.storyName = "small";
small.parameters = {
  docs: {
    description: {
      story:
        "> The `<small>` HTML element indicates that its contents have small importance, seriousness, or urgency. Browsers typically render the contents in bold type. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small)",
    },
  },
};
small.args = {
  children: <>&copy; 2020 Atko, Inc. All Rights Reserved.</>,
  as: "small",
};

export const strong = Template.bind({});
strong.storyName = "strong";
strong.parameters = {
  docs: {
    description: {
      story:
        "> The `<strong>` HTML element indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)",
    },
  },
};
strong.args = {
  children: (
    <Text as="p">
      For your safety and the safety of others,{" "}
      <Text as="strong">please don't run.</Text>
    </Text>
  ),
  as: "strong",
};

export const sub = Template.bind({});
sub.storyName = "sub";
sub.parameters = {
  docs: {
    description: {
      story:
        "> The `<sub>` HTML element specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub)",
    },
  },
};
sub.args = {
  children: (
    <Text>
      Penicillin (R-C<Text as="sub">9</Text>H<Text as="sub">11</Text>N
      <Text as="sub">2</Text>O<Text as="sub">4</Text>S) was discovered by
      Alexander Fleming in 1928.
    </Text>
  ),
};

export const sup = Template.bind({});
sup.storyName = "sup";
sup.parameters = {
  docs: {
    description: {
      story:
        "> The `<sup>` HTML element specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup)",
    },
  },
};
sup.args = {
  children: (
    <Text>
      a<Text as="sup">2</Text> + b<Text as="sup">2</Text> = c
      <Text as="sup">2</Text>
    </Text>
  ),
};

export const varElement = Template.bind({});
varElement.storyName = "var";
varElement.parameters = {
  docs: {
    description: {
      story:
        "> The `<var>` HTML element represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent. - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var)",
    },
  },
};
varElement.args = {
  children: (
    <>
      <Heading level="3">
        Solve for <Text as="var">x</Text>
      </Heading>
      <Text as="p">
        2<sup>2</sup>(<var>x</var>+3)+9-5=32
      </Text>
    </>
  ),
};
