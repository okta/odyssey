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

import {
  FileUploader,
  fileUploadTypes,
  fileUploadVariants,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { fieldComponentPropsMetaData } from "../fieldComponentPropsMetaData.js";

// TODO: Write tests for this component @see https://oktainc.atlassian.net/browse/OKTA-704264
const meta = {
  component: FileUploader,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    acceptedFileTypes: {
      description:
        "An array of file types the user is able to upload. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers for examples",
      table: {
        type: {
          summary: "string[]",
        },
      },
    },
    type: {
      options: fileUploadTypes,
      control: { type: "radio" },
      description: "If `multiple`, the user can upload multiple files",
      table: {
        type: {
          summary: fileUploadTypes.join(" | "),
        },
      },
    },
    errorMessage: fieldComponentPropsMetaData.errorMessage,
    hint: fieldComponentPropsMetaData.hint,
    id: fieldComponentPropsMetaData.id,
    isDisabled: fieldComponentPropsMetaData.isDisabled,
    isFullWidth: fieldComponentPropsMetaData.isFullWidth,
    label: {
      control: "text",
      description: "The label text for the FileUploader",
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
    variant: {
      options: fileUploadVariants,
      control: { type: "radio" },
      description: "How the component appears visually",
      table: {
        type: {
          summary: fileUploadVariants.join(" | "),
        },
      },
      type: {
        name: "string",
        required: true,
      },
    },
  },
  args: {
    hint: "Maybe some helpful text about what format to use",
    label: "Upload your files here",
    onChange: fn(),
  },
} satisfies Meta<typeof FileUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonOnly: Story = {
  args: {
    variant: "button",
  },
};

export const DragAndDropWithIcon: Story = {
  args: {
    type: "multiple",
    variant: "dragAndDropWithIcon",
  },
};

export const DragAndDropWithoutIcon: Story = {
  args: {
    variant: "dragAndDrop",
  },
};

export const SingleFileAllowed: Story = {
  args: {
    variant: "dragAndDropWithIcon",
  },
};

export const MultipleFileAllowed: Story = {
  args: {
    type: "multiple",
    variant: "dragAndDropWithIcon",
  },
};

export const SpecificFileTypes: Story = {
  args: {
    acceptedFileTypes: [".jpg", ".png"],
    variant: "dragAndDropWithIcon",
  },
};
