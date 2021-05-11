import React from "react";
import { capitalize } from "../.storybook/utils" 
import classNames from "classnames" 

const COMPONENT_NAME = "Button"

export default {
  title: `Components/${COMPONENT_NAME}/SCSS`,
  argTypes: {
    label: {
      description: 'Human readable text displayed within the button',
      control: 'text'
    },
    variant: {
      description: 'Button appearance based on use-case',
      control: {
        defaultValue: 'primary',
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'clear'],
      }
    },
  }
};

const Template = ({ variant, label, icon, fullWidth, labelHidden }) => {
  const componentClass = classNames({
    "ods-button": true,
    [`is-ods-button-${variant}`]: variant,
    [`is-ods-button-full-width`]: fullWidth,
  })
  const labelClass = classNames({
    "ods-button--label": true,
    "u-visually-hidden": labelHidden
  })

  return (
    <>
      <button className={componentClass}>
        {variant === 'dismiss' && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ods-icon"><path d="M2.32289 10.1181C1.89237 10.5486 1.89237 11.2466 2.32289 11.6771C2.7534 12.1076 3.45141 12.1076 3.88192 11.6771L7 8.55904L10.1181 11.6771C10.5486 12.1076 11.2466 12.1076 11.6771 11.6771C12.1076 11.2466 12.1076 10.5486 11.6771 10.1181L8.55904 7L11.6771 3.88193C12.1076 3.45141 12.1076 2.7534 11.6771 2.32289C11.2466 1.89237 10.5486 1.89237 10.1181 2.32289L7 5.44096L3.88193 2.32289C3.45141 1.89237 2.7534 1.89237 2.32289 2.32289C1.89237 2.7534 1.89237 3.45141 2.32289 3.88192L5.44096 7L2.32289 10.1181Z" fill="currentColor"/></svg>}
        {icon && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>}
        <span className={labelClass}>{capitalize(variant) || 'Default'}</span>
      </button>
    </>
  )
};

export const Primary = Template.bind({});
Primary.storyName = "Primary (default)"
Primary.args = {
  variant: "primary"
};
Primary.argTypes = {
  variant: { table: { disable: true } },
}