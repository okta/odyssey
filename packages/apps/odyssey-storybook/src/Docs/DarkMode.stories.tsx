/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Banner,
  Button,
  buttonVariantValues,
  createOdysseyStyledComponent,
  OdysseyThemeProvider,
  Status,
  Switch,
  Tabs,
  Tag,
  tagColorVariants,
  Typography,
} from "@okta/odyssey-react-mui";
import {
  staticBoardParameters,
  StoryCell,
  StoryRow,
  StorySection,
} from "@okta/odyssey-storybook-preset/story-helpers";

const ReviewSurface = createOdysseyStyledComponent({
  tag: "section",
  shouldForwardProp: (prop) => prop !== "isPage",
})<{ isPage?: boolean }>(({ isPage, odysseyDesignTokens }) => ({
  backgroundColor: isPage
    ? odysseyDesignTokens.HueNeutral50
    : odysseyDesignTokens.HueNeutralWhite,
  color: odysseyDesignTokens.TypographyColorBody,
  padding: odysseyDesignTokens.Spacing5,
}));

const meta = {
  component: OdysseyThemeProvider,
  parameters: staticBoardParameters,
  globals: { colorScheme: "dark" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentStates: Story = {
  args: { children: null },
  render: function C() {
    return (
      <OdysseyThemeProvider colorScheme="dark">
        <ReviewSurface isPage>
          <Typography variant="h2">Dark component states</Typography>
          {[true, false].map((isPage) => (
            <ReviewSurface isPage={isPage} key={String(isPage)}>
              <OdysseyThemeProvider>
                <StorySection title={isPage ? "Page" : "Surface"}>
                  <StoryRow>
                    {buttonVariantValues.map((variant) => (
                      <StoryCell key={variant} label={variant}>
                        <Button label="Action" variant={variant} />
                        <Button isDisabled label="Disabled" variant={variant} />
                      </StoryCell>
                    ))}
                  </StoryRow>
                  <StoryRow>
                    {tagColorVariants.map((colorVariant) => (
                      <Tag
                        colorVariant={colorVariant}
                        key={colorVariant}
                        label={colorVariant}
                        onRemove={() => undefined}
                      />
                    ))}
                  </StoryRow>
                  <StoryRow>
                    <Switch label="Off" value="off" />
                    <Switch isDefaultChecked label="On" value="on" />
                    <Switch isDisabled label="Disabled" value="disabled" />
                  </StoryRow>
                  <Banner
                    severity="warning"
                    text="Review permissions before continuing."
                  />
                  <Status label="Warning" severity="warning" variant="lamp" />
                  <Tabs
                    ariaLabel="Dark mode navigation"
                    tabs={[
                      {
                        label: "Overview",
                        value: "overview",
                        children: <Typography>Overview content</Typography>,
                      },
                      {
                        label: "Settings",
                        value: "settings",
                        children: <Typography>Settings content</Typography>,
                      },
                    ]}
                  />
                </StorySection>
              </OdysseyThemeProvider>
            </ReviewSurface>
          ))}
        </ReviewSurface>
      </OdysseyThemeProvider>
    );
  },
};
