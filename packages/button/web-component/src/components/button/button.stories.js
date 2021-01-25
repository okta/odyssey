const COMPONENT_NAME = "Button"

export default {
  title: `Components/${COMPONENT_NAME}/web-components`,
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
  return (
    <>
      <ods-button type={variant}>
          { label || 'Default' }
      </ods-button>
    </>
  )
};

export const Primary = Template.bind({});
Primary.storyName = "Primary (default)"
Primary.args = {
  variant: "Primary",
  label: 'Primary'
};
Primary.argTypes = {
  variant: { table: { disable: true } },
}

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: 'Secondary'
};
Secondary.argTypes = {
  variant: { table: { disable: true } },
}

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  label: 'Danger'
};

Danger.argTypes = {
  variant: { table: { disable: true } },
}

export const Overlay = Template.bind({});
Overlay.args = {
  variant: "overlay",
  label: 'Overlay'
};
Overlay.parameters = {
  backgrounds: { default: 'gradient' }
};
Overlay.argTypes = {
  variant: { table: { disable: true } },
}

export const Clear = Template.bind({});
Clear.args = {
  variant: "clear",
  label: 'Clear'
};
Clear.argTypes = {
  variant: { table: { disable: true } },
}