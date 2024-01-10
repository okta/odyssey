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

import { FileUpload } from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
// import { userEvent, within } from "@storybook/testing-library";
// import { expect } from "@storybook/jest";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { fieldComponentPropsMetaData } from "../../../fieldComponentPropsMetaData";
// import { axeRun } from "../../../axe-util";

const storybookMeta: Meta<typeof FileUpload> = {
  title: "Labs Components/FileUpload",
  component: FileUpload,
  argTypes: {
    type: {
      control: "boolean",
      description: "If `multiple`, the user can upload multiple files",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hint: fieldComponentPropsMetaData.hint,
    id: fieldComponentPropsMetaData.id,
    isButtonOnly: {
      control: "boolean",
      description:
        "If `true` drag and drop area is not rendered. Only the button",
      table: {
        type: {
          summary: "boolean",
        },
      },
      type: {
        name: "boolean",
      },
    },
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    label: {
      control: "text",
      description: "The label text for the FileUpload",
      table: {
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
        name: "string",
      },
    },
    onChange: {
      control: null,
      description: "Callback fired when a file is uploaded or deleted",
      table: {
        type: {
          summary: "(files: File[]) => void",
        },
      },
      type: {
        name: "string",
        required: true,
      },
    },
  },
  args: {
    hint: "Some helpful text about what format to use",
    label: "Upload your files here",
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<typeof FileUpload> = {
  render: function C(args) {
    return <FileUpload {...args} />;
  },
};
