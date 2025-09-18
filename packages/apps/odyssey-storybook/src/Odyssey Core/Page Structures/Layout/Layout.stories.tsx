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

import styled from "@emotion/styled";
import { Subordinate } from "@okta/odyssey-react-mui";
import { Layout, LayoutProps } from "@okta/odyssey-react-mui/labs";
import { Meta, StoryObj } from "@storybook/react";
// import { Surface } from "@okta/odyssey-react-mui";

const VisibleRegion = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  border: "1px dashed #cbcbcb",
});

const RegionLabel = styled.h3({
  margin: 0,
});

const DisclaimerContainer = styled.div({
  maxWidth: "55ch",
  marginBlockEnd: "8px",
});

const RegionDisclaimer = () => {
  return (
    <DisclaimerContainer>
      <Subordinate>
        <strong>NOTE:</strong> Dashed border and padding are applied to show
        region boundries in Storybook only. They will not be present when you
        are using Layout
      </Subordinate>
    </DisclaimerContainer>
  );
};

const MarginContainer = styled.div({
  "& + &": {
    marginBlockStart: "16px",
  },
});

const storybookMeta: Meta<LayoutProps> = {
  component: Layout,
  argTypes: {
    regions: {
      control: "text",
      description:
        "The supported region ratios for the `Layout`. Each number is a fractional unit that is mapped to the 'fr' CSS unit. For example: [2, 1] defines a 2/3, 1/3 layout and [1, 1, 1] defines a 1/3, 1/3, 1/3 layout",
      table: {
        type: {
          summary: "SupportedRegionRatios",
        },
      },
    },
    children: {
      description:
        "The content of the `Layout`. May be a `string` or any other `ReactNode` or array of `ReactNode`s. Will often be either a single `Surface` or multiple `Surface's",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <>
          <RegionDisclaimer />
          <Story />
        </>
      );
    },
  ],
};

export default storybookMeta;

export const Single: StoryObj<LayoutProps> = {
  args: {
    regions: [1],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const Split: StoryObj<LayoutProps> = {
  args: {
    regions: [1, 1],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const TwoThirdsStart: StoryObj<LayoutProps> = {
  args: {
    regions: [2, 1],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const TwoThirdsEnd: StoryObj<LayoutProps> = {
  args: {
    regions: [1, 2],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const ThreeFourthsStart: StoryObj<LayoutProps> = {
  args: {
    regions: [3, 1],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const ThreeFourthsEnd: StoryObj<LayoutProps> = {
  args: {
    regions: [1, 3],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const ThreeRegionSplit: StoryObj<LayoutProps> = {
  args: {
    regions: [1, 1, 1],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const FourRegionSplit: StoryObj<LayoutProps> = {
  args: {
    regions: [1, 1, 1, 1],
  },
  render: function C(args) {
    return (
      <Layout {...args}>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
        <VisibleRegion>
          <RegionLabel>Region</RegionLabel>
        </VisibleRegion>
      </Layout>
    );
  },
};

export const KitchenSink: StoryObj<LayoutProps> = {
  render: function () {
    return (
      <>
        <MarginContainer>
          <Layout regions={[1]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[1, 1]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[2, 1]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[1, 2]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[3, 1]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[1, 3]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[1, 1, 1]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>

        <MarginContainer>
          <Layout regions={[1, 1, 1, 1]}>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
            <VisibleRegion>
              <RegionLabel>Region</RegionLabel>
            </VisibleRegion>
          </Layout>
        </MarginContainer>
      </>
    );
  },
};
