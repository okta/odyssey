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
import {
  Text,
  TextProps,
  Heading,
  Link,
  ScreenReaderText,
} from "../../../../odyssey-react/src";
import TextMdx from "./Text.mdx";

export default {
  title: `Components/Text/Elements`,
  component: Text,
  argTypes: {
    children: {
      control: { type: "string" },
    },
  },
  parameters: {
    docs: {
      page: TextMdx,
    },
  },
};

const Template: Story<TextProps> = (props) => <Text as="span" {...props} />;

export const span = Template.bind({});
span.storyName = "span (default)";
span.args = {
  children: "Text based content",
};

export const abbr = Template.bind({});
abbr.storyName = "abbr";
abbr.args = {
  children: (
    <Text as="p">
      If you are a{" "}
      <Text as="abbr" title="Back-end">
        BE
      </Text>{" "}
      or{" "}
      <Text as="abbr" title="Front-end">
        FE
      </Text>{" "}
      developer, you should checkout our dev docs.
    </Text>
  ),
  as: "abbr",
};

export const address = Template.bind({});
address.storyName = "address";
address.args = {
  children: "address",
  as: "address",
};

export const blockquote = Template.bind({});
blockquote.storyName = "blockquote";
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
code.args = {
  children: "console.log(`Hello world`);",
  as: "code",
};

export const del = Template.bind({});
del.storyName = "del";
del.args = {
  children: (
    <Text>
      There is{" "}
      <Text as="del">
        <ScreenReaderText>[deletion start]</ScreenReaderText>
        nothing
        <ScreenReaderText>[deletion end]</ScreenReaderText>
      </Text>{" "}
      <Text as="ins">
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
em.args = {
  children: "This text is emphasized",
  as: "em",
};

export const ins = Template.bind({});
ins.storyName = "ins";
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
p.args = {
  children:
    "Odyssey is Okta’s official design system built for use across all Okta products and sites. We aim to enable designers and developers to build efficiently and consistently while optimizing for user experience and accessibility.",
  as: "p",
};

export const pre = Template.bind({});
pre.storyName = "pre";
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
small.args = {
  children: <>&copy; 2020 Atko, Inc. All Rights Reserved.</>,
  as: "small",
};

export const strong = Template.bind({});
strong.storyName = "strong";
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
