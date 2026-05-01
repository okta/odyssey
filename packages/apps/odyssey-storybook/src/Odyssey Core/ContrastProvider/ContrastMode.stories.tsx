/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  OdysseyThemeProvider,
  SearchField,
  Stack,
  Status,
  Surface,
  Tag,
  TagList,
} from "@okta/odyssey-react-mui";
import { Meta, StoryObj } from "@storybook/react-vite";

import { ContrastModeToggle } from "../../tools/ContrastModeToggle.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const storybookMeta: Meta = {
  component: OdysseyThemeProvider,
  decorators: [OdysseyStorybookThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const AllComponents: StoryObj = {
  render: function C() {
    return (
      <ContrastModeToggle>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <span style={{ fontSize: 12, fontWeight: "bold" }}>Status</span>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              <Status label="Default" severity="default" />
              <Status label="Error" severity="error" />
              <Status label="Info" severity="info" />
              <Status label="Success" severity="success" />
              <Status label="Warning" severity="warning" />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <span style={{ fontSize: 12, fontWeight: "bold" }}>Tag</span>
            <TagList>
              <Tag colorVariant="default" label="Default" />
              <Tag colorVariant="info" label="Info" />
              <Tag colorVariant="accentOne" label="Accent One" />
              <Tag colorVariant="accentTwo" label="Accent Two" />
              <Tag colorVariant="accentThree" label="Accent Three" />
              <Tag colorVariant="accentFour" label="Accent Four" />
            </TagList>
          </Stack>

          <Stack spacing={1}>
            <span style={{ fontSize: 12, fontWeight: "bold" }}>
              SearchField
            </span>
            <SearchField label="Search" placeholder="Type to search..." />
          </Stack>

          <Stack spacing={1}>
            <span style={{ fontSize: 12, fontWeight: "bold" }}>
              Surface (auto-detects)
            </span>
            <Surface>
              <Stack direction="row" spacing={1}>
                <Status label="In Surface" severity="info" />
                <Tag colorVariant="info" label="In Surface" />
              </Stack>
            </Surface>
          </Stack>
        </Stack>
      </ContrastModeToggle>
    );
  },
};
