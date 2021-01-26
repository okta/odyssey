const COMPONENT_NAME = "Tag"

export default {
  title: `Components/${COMPONENT_NAME}/web-components`,
  argTypes: {
    label: 'Tag1'
  }
};

const Template = ({ label }) => {
  return (
    <>
      <ods-tag>
          { label || 'Default' }
      </ods-tag>
    </>
  )
};

export const Default = Template.bind({});
Default.storyName = "Tag (Default)"
Default.args = {
  label: 'Default'
};
