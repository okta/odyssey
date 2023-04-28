/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Meta, Story } from "@storybook/react";
import { SearchField, SearchFieldProps } from "@okta/odyssey-react-mui";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import SearchFieldMdx from "./SearchField.mdx";

const storybookMeta: Meta<SearchFieldProps> = {
  title: `MUI Components/Forms/SearchField`,
  component: SearchField,
  parameters: {
    docs: {
      page: SearchFieldMdx,
    },
  },
  argTypes: {
    autoCompleteType: {
      control: "text",
    },
    hasInitialFocus: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    id: {
      control: "text",
    },
    label: {
      control: "text",
    },
    onBlur: {
      control: "function",
    },
    onChange: {
      control: "function",
    },
    onFocus: {
      control: "function",
    },
    placeholder: {
      control: "text",
    },
    value: {
      control: "text",
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const Template: Story<SearchFieldProps> = (args) => {
  return <SearchField {...args} />;
};

Template.args = {
  autoCompleteType: "name",
  label: "Destination",
};

export const Default = Template.bind({});
Default.args = {
  label: "Search",
  placeholder: "Search planets",
};
