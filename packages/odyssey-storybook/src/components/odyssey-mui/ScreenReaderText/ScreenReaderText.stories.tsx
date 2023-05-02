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

import { ScreenReaderText } from "@okta/odyssey-react-mui";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import ScreenReaderTextMdx from "./ScreenReaderText.mdx";

const storybookMeta: ComponentMeta<typeof ScreenReaderText> = {
  title: "MUI Components/ScreenReaderText",
  component: ScreenReaderText,
  parameters: {
    docs: {
      page: ScreenReaderTextMdx,
    },
  },
  argTypes: {
    children: {
      control: "text",
      defaultValue: "This text is visually hidden.",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: ComponentStory<typeof ScreenReaderText> = (args) => {
  return (
    <>
      The following text is visually hidden:
      <ScreenReaderText {...args}></ScreenReaderText>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
