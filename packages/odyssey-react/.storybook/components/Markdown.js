import React from 'react';
import Markdown from 'markdown-to-jsx';
import { components } from '@storybook/components'

// The purpose of the overrides const is to leverage the default
// typographical  components within Storybook. Alternatively, we
// could write custom CSS or use Odyssey base; However, this 
// approach could lead to visual inconsistencies. Instead, we 
// chose to rely on the Storybook theming API and have consistent 
// styles throughout our Markdown and SB docs.

const overrides = {}

Object.keys(components).forEach((key) => {
  overrides[key] = {
      component: components[key]
  }
});

export default ({ content }) => (
  <Markdown options={{ overrides }}>{content}</Markdown>
)
