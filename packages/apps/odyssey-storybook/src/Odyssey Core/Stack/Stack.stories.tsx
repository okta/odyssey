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

import styled from "@emotion/styled";
import {
  DesignTokens,
  OdysseyStackProps,
  Stack,
  stackDirectionValues,
  stackSpacingValues,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const ContentBox = styled.div<{ odysseyDesignTokens: DesignTokens }>(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: odysseyDesignTokens.Spacing8,
    height: odysseyDesignTokens.Spacing8,
    backgroundColor: odysseyDesignTokens.HueNeutral100,
    border: `1px dashed ${odysseyDesignTokens.PalettePrimaryDarker}`,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
  }),
);

const Content = () => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <>
      <ContentBox odysseyDesignTokens={odysseyDesignTokens}>1</ContentBox>
      <ContentBox odysseyDesignTokens={odysseyDesignTokens}>2</ContentBox>
      <ContentBox odysseyDesignTokens={odysseyDesignTokens}>3</ContentBox>
      <ContentBox odysseyDesignTokens={odysseyDesignTokens}>4</ContentBox>
    </>
  );
};

const storybookMeta: Meta<OdysseyStackProps> = {
  component: Stack,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: <></>,
      description: "The content of the component",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    direction: {
      options: stackDirectionValues,
      control: { type: "radio" },
      description: "The flex-direction applied to the Stack",
      table: {
        type: {
          summary: stackDirectionValues.join(" | "),
        },
      },
      type: {
        name: "other",
        value: "radio",
      },
    },
    spacing: {
      control: "select",
      options: stackSpacingValues.map((value) => value),
    },
    sx: {
      control: "object",
      description:
        "The system prop that allows defining system overrides as well as additional CSS styles. See the [MUI `sx` page](https://mui.com/system/getting-started/the-sx-prop/) for more details.",
      table: {
        type: {
          summary: "object",
        },
      },
    },
  },
  args: {
    children: <Content />,
    spacing: 2,
  },
};

export default storybookMeta;

export const Default: StoryObj<OdysseyStackProps> = {};
// export const DefaultPill: StoryObj<StackProps> = {
//   args: {
//     label: "Warp drive in standby",
//   },
// };

// export const ErrorPill: StoryObj<StackProps> = {
//   args: {
//     label: "Warp drive unstable",
//     severity: "error",
//   },
// };

// export const Info: StoryObj<StackProps> = {
//   args: {
//     label: "Warp drive unstable",
//     severity: "info",
//   },
// };

// export const Success: StoryObj<StatusProps> = {
//   args: {
//     label: "Warp drive online",
//     severity: "success",
//   },
// };

// export const WarningPill: StoryObj<StatusProps> = {
//   args: {
//     label: "Warp fuel low",
//     severity: "warning",
//   },
// };

// export const DefaultLamp: StoryObj<StatusProps> = {
//   args: {
//     label: "Warp drive in standby",
//     variant: "lamp",
//   },
// };

// export const ErrorLamp: StoryObj<StatusProps> = {
//   args: {
//     label: "Warp drive unstable",
//     severity: "error",
//     variant: "lamp",
//   },
// };

// export const SuccessLamp: StoryObj<StatusProps> = {
//   args: {
//     label: "Warp drive online",
//     severity: "success",
//     variant: "lamp",
//   },
// };

// export const WarningLamp: StoryObj<StatusProps> = {
//   args: {
//     label: "Warp fuel low",
//     severity: "warning",
//     variant: "lamp",
//   },
// };
