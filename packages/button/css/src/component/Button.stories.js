import React from "react";
import { capitalize } from '../../../../storybook/.storybook/utils';
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
        {icon && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>}
        <span className={labelClass}>{capitalize(variant) || 'Default'}</span>
      </button>
      <button className={[componentClass, 'is-ods-button-focus'].join(' ')}>
        {icon && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>}
        <span className={labelClass}>{label || "Focus"}</span>
      </button>
      <button className={[componentClass, 'is-ods-button-hover'].join(' ')}>
        {icon && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>}
        <span className={labelClass}>{label || "Hover"}</span>
      </button>
      <button className={componentClass} disabled>
        {icon && <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="ods-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM8 6V11H6V6H8Z" fill="currentColor"/></svg>}
        <span className={labelClass}>{label || "Disabled"}</span>
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

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};
Secondary.argTypes = {
  variant: { table: { disable: true } },
}

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger"
};

Danger.argTypes = {
  variant: { table: { disable: true } },
}

export const Overlay = Template.bind({});
Overlay.args = {
  variant: "overlay"
};
Overlay.parameters = {
  backgrounds: { default: 'gradient' }
};
Overlay.argTypes = {
  variant: { table: { disable: true } },
}

export const Clear = Template.bind({});
Clear.args = {
  variant: "clear"
};
Clear.argTypes = {
  variant: { table: { disable: true } },
}

export const Icon = Template.bind({});
Icon.storyName = "with Icon"
Icon.argTypes = {
  icon: { table: { disable: true } }
}
Icon.args = {
  label: "Help",
  labelHidden: false,
  icon: true
};

export const IconOnly = Template.bind({});
IconOnly.storyName = "with Icon, no label"
IconOnly.argTypes = {
  labelHidden: { table: { disable: true } },
  icon: { table: { disable: true } }
}
IconOnly.args = {
  label: "Help",
  labelHidden: true,
  icon: true
};

export const FullWidth = Template.bind({});
FullWidth.storyName = "with full-width layout"
FullWidth.args = {
  label: "Full width",
  fullWidth: true
};
