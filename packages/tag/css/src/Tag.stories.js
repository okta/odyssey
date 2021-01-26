import React from 'react';

const COMPONENT_NAME = "Tag"
const RANGE_MAX = 15
const range = (count = RANGE_MAX) => Array.from({length: count}, (_, i) => i + 1)

export default {
  title: `Components/${COMPONENT_NAME}/SCSS`,
  argTypes: {
    label: { 
      description: 'The label, usually describing an entity or type e.g. "canine", "feline", "porcine", "leonine"',
      control: { type: 'text', defaultValue: "Tag" } 
    },
    count: {
      description: 'The amount of tags to display',
      control: { type: 'range', min: 1, max: RANGE_MAX } 
    }
  }
};

const Template = ({ count, label}) => (
  <ul class="ods-tag--list">
    {range(count).map((i) => (
      <li class="ods-tag">
        {!label &&  `Tag ${i}`}
        {label}
      </li>
    ))}
  </ul>
);

export const Default = Template.bind({});
Default.args = {
  count: 3
};
