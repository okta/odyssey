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

import { Meta, StoryObj } from "@storybook/react";

import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Grid, GridProps } from "@okta/odyssey-react-mui/labs";
import { Surface } from "@okta/odyssey-react-mui";

const storybookMeta: Meta<GridProps> = {
  title: "Labs Components/Grid",
  component: Grid,
  argTypes: {
    panes: {
      control: "text",
      description:
        "The title of the layout to be situated in the layout header",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    children: {
      control: null,
      description:
        "The content of the Grid. May be a `string` or any other `ReactNode` or array of `ReactNode`s. Will often be either a single `Surface` or multiple `Surface's",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  parameters: {
    backgrounds: {
      default: "gray",
      values: [
        { name: "gray", value: "#f4f4f4" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default storybookMeta;

export const Single: StoryObj<GridProps> = {
  args: {
    panes: [1],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const Split: StoryObj<GridProps> = {
  args: {
    panes: [1, 1],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const TwoThirdsStart: StoryObj<GridProps> = {
  args: {
    panes: [2, 1],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const TwoThirdsEnd: StoryObj<GridProps> = {
  args: {
    panes: [1, 2],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const ThreeFourthsStart: StoryObj<GridProps> = {
  args: {
    panes: [3, 1],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const ThreeFourthsEnd: StoryObj<GridProps> = {
  args: {
    panes: [1, 3],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const ThreeColumnSplit: StoryObj<GridProps> = {
  args: {
    panes: [1, 1, 1],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const FourColumnSplit: StoryObj<GridProps> = {
  args: {
    panes: [1, 1, 1, 1],
  },
  render: function C(args) {
    return (
      <Grid {...args}>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
        <Surface>
          <h1>Column</h1>
        </Surface>
      </Grid>
    );
  },
};

export const KitchenSink: StoryObj<GridProps> = {
  render: function () {
    return (
      <>
        <Grid panes={[1]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[1, 1]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[2, 1]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[1, 2]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[3, 1]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[1, 3]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[1, 1, 1]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
        <Grid panes={[1, 1, 1, 1]}>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
          <Surface>
            <h1>Column</h1>
          </Surface>
        </Grid>
      </>
    );
  },
};
