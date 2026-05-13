/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  ImageUploader,
  ImageUploaderProps,
} from "@okta/odyssey-contributions-oin-components";
import { Link } from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";
import { OinComponentsStorybookThemeDecorator } from "../../tools/OinComponentsStorybookThemeDecorator.js";

const storybookMeta: Meta<ImageUploaderProps> = {
  component: ImageUploader,
  argTypes: {
    label: {
      control: "text",
      description: "The label for the uploader field.",
    },
    hint: {
      control: "text",
      description: "Hint text displayed below the label.",
    },
    aspectRatio: {
      control: "number",
      description:
        "The aspect ratio to enforce when cropping (width / height).",
      table: { defaultValue: { summary: "1" } },
    },
    initialImageUrl: {
      control: "text",
      description: "URL of an existing image to pre-populate the uploader.",
    },
  },
  args: {
    label: "Logo",
    hint: "Max file size is 1 MB. Formats: PNG (preferred) or JPG.",
    HintLinkComponent: <Link href="#">Guidelines</Link>,
    onChange: fn(),
    onConfirm: fn(),
    onDelete: fn(),
  },
  decorators: [
    OdysseyStorybookThemeDecorator,
    OinComponentsStorybookThemeDecorator,
  ],
  tags: ["autodocs"],
};

export default storybookMeta;

type Story = StoryObj<ImageUploaderProps>;

export const Default: Story = {};

export const SquareCrop: Story = {
  args: {
    aspectRatio: 1,
  },
};

export const LandscapeCrop: Story = {
  args: {
    aspectRatio: 244 / 156,
    label: "Landscape Logo",
  },
};
