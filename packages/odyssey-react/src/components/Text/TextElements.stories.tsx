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

import { Story } from "@storybook/react";
import Text from ".";
import type { Props } from ".";

export default {
  title: `Utilities/Text/Elements`,
  component: Text,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
};

const Template: Story<Props> = ({ children, as, ...rest }) => (
  <Text as={as} {...rest}>
    {children}
  </Text>
);

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
  children: "abbr",
  as: "abbr",
  title: "Represents an abbreviation or acronym",
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
  children: "This text represents strong importance",
  as: "strong",
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
  children: "This text represents pre importance",
  as: "pre",
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
  children: "This text represents cite importance",
  as: "cite",
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

Many screen readers do not let users know of the presence of &lt;del&gt;. To fix this, you should consider using **a11yStart** and **a11yEnd** props to 
prepend and append assistive text to the contents of the tag. In the above example, there are additional spaces before and after the text,
this is intentional. Not adding these spaces will cause the content within the tag to run into the text within the tag.`,
    },
  },
};
del.args = {
  children: (
    <Text>
      There is{" "}
      <Text as="del" a11yStart=" [deletion start] " a11yEnd=" [deletion end] ">
        nothing
      </Text>{" "}
      <Text
        as="ins"
        a11yStart=" [insertion start] "
        a11yEnd=" [insertion end] "
      >
        no code
      </Text>{" "}
      either good or bad, but running it makes it so.
    </Text>
  ),
  as: "blockquote",
};
