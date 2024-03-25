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

import { Meta, StoryObj } from "@storybook/react";
import { Button, EmptyState, EmptyStateProps } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const storyBookMeta: Meta<EmptyStateProps> = {
  title: "MUI Components/EmptyState",
  component: EmptyState,
  argTypes: {
    heading: {
      control: "text",
      description: "Main heading of the empty state",
      type: {
        required: true,
        name: "string",
      },
    },

    text: {
      control: "text",
      description:
        "A descriptive text explaining more context as to why we don't have data",
      type: {
        required: true,
        name: "string",
      },
    },

    primaryCallToActionComponent: {
      description: "Primary call to action",
      control: "custom",
    },

    secondaryCallToActionComponent: {
      description: "Secondary call to action",
      control: "custom",
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storyBookMeta;

export const Default: StoryObj<EmptyStateProps> = {
  args: {
    heading: "Start by adding data assets",
    text: "All relevant data will be displayed and can be searched and filtered",
    primaryCallToActionComponent: (
      <Button label="Button label" variant="primary" />
    ),
    secondaryCallToActionComponent: (
      <Button label="Button label" variant="secondary" />
    ),
  },

  render: (props) => {
    return <EmptyState {...props} />;
  },
};
