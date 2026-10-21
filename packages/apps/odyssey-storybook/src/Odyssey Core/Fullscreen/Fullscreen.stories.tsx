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

import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";

import {
  Button,
  buttonSizeValues,
  createFullscreenModeHost,
  FullscreenButton,
  type FullscreenButtonProps,
  FullscreenRegion,
  Heading4,
  Heading5,
  Paragraph,
  Surface,
  useFullscreen,
  useFullscreenId,
} from "@okta/odyssey-react-mui";
import { Layout } from "@okta/odyssey-react-mui/labs";
import { staticBoardParameters } from "@okta/odyssey-storybook-preset/story-helpers";
import { memo, useEffect, useState } from "react";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

// UI Shell runs the fullscreen mode host in an app. These stories render without the shell, so each one runs its own while it's on screen.
const FullscreenModeHostDecorator: Decorator = (Story) => {
  useEffect(() => createFullscreenModeHost().destroy, []);

  return <Story />;
};

// Shared by one story, but a component defined inside `render` remounts on every render, which would hide the very behavior the story shows.
const FullscreenReadout = memo(({ fullscreenId }: { fullscreenId: string }) => {
  const { hasActiveFullscreen, isFullscreen } = useFullscreen({ fullscreenId });

  return (
    <Paragraph>
      Readout mounted later:{" "}
      {hasActiveFullscreen
        ? "the page is in fullscreen"
        : "nothing in fullscreen"}
      , {isFullscreen ? "and this region is on top" : "and this region isn't"}.
    </Paragraph>
  );
});
FullscreenReadout.displayName = "FullscreenReadout";

const meta = {
  component: FullscreenButton,
  decorators: [FullscreenModeHostDecorator, OdysseyStorybookThemeDecorator],
  tags: ["autodocs", "alpha"],
  argTypes: {
    ariaLabel: {
      control: "text",
      description:
        "Accessible name for the button. It stays the same in and out of fullscreen; `aria-pressed` carries the state.",
    },
    fullscreenId: {
      control: false,
      description:
        "The id of the `FullscreenRegion` this button controls, from `useFullscreenId`.",
    },
    isDisabled: {
      control: "boolean",
    },
    size: {
      control: "radio",
      options: buttonSizeValues,
    },
    variant: {
      control: "radio",
      options: ["primary", "secondary", "floating"],
    },
  },
  args: {
    fullscreenId: "playground",
    variant: "secondary",
  },
} satisfies Meta<FullscreenButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function C(props) {
    const fullscreenId = useFullscreenId();

    return (
      <>
        <Heading4>Access certification</Heading4>
        <Paragraph>
          The report grows from its place on the page to fill the screen. The
          summary beside it and the text below it stay where they are.
        </Paragraph>
        <Layout regions={[2, 1]}>
          <Surface>
            <FullscreenRegion fullscreenId={fullscreenId}>
              <FullscreenButton {...props} fullscreenId={fullscreenId} />
              <Heading5>Campaign report</Heading5>
              <Paragraph>
                Press the button again, or Escape, to put the report back.
              </Paragraph>
            </FullscreenRegion>
          </Surface>
          <Surface>
            <Heading5>Summary</Heading5>
            <Paragraph>Not in a region, so it stays on the page.</Paragraph>
          </Surface>
        </Layout>
        <Paragraph>
          This text sits below the report. Its position doesn't change while the
          report is in fullscreen.
        </Paragraph>
      </>
    );
  },
};

export const KeyboardFocus: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const fullscreenId = useFullscreenId();

    return (
      <>
        <Button label="Before the region" variant="secondary" />
        <FullscreenButton
          ariaLabel="Enable fullscreen for the report"
          fullscreenId={fullscreenId}
        />
        <Surface>
          <FullscreenRegion fullscreenId={fullscreenId}>
            <Paragraph>
              Tab from the button above. Once the report is in fullscreen, Tab
              and Shift+Tab stay inside it, and Escape returns focus to the
              button that opened it.
            </Paragraph>
            <Button label="Inside the region" variant="secondary" />
            <FullscreenButton fullscreenId={fullscreenId} />
          </FullscreenRegion>
        </Surface>
        <Button label="After the region" variant="secondary" />
      </>
    );
  },
};

export const StackedRegions: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const outerFullscreenId = useFullscreenId();
    const innerFullscreenId = useFullscreenId();

    return (
      <Surface>
        <FullscreenRegion fullscreenId={outerFullscreenId}>
          <FullscreenButton
            ariaLabel="Enable fullscreen for the dashboard"
            fullscreenId={outerFullscreenId}
          />
          <Paragraph>
            Put the dashboard in fullscreen, then the chart. Escape goes back to
            the dashboard, and Escape again goes back to the page.
          </Paragraph>
          <Surface>
            <FullscreenRegion fullscreenId={innerFullscreenId}>
              <FullscreenButton
                ariaLabel="Enable fullscreen for the chart"
                fullscreenId={innerFullscreenId}
              />
              <Paragraph>The chart.</Paragraph>
            </FullscreenRegion>
          </Surface>
        </FullscreenRegion>
      </Surface>
    );
  },
};

export const MultiRegions: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const usersFullscreenId = useFullscreenId();
    const groupsFullscreenId = useFullscreenId();

    return (
      <>
        <Heading4>Directory</Heading4>
        <Paragraph>
          One surface holds two regions side by side. Each one goes fullscreen
          on its own, and the other stays on the page.
        </Paragraph>
        <Layout regions={[1]}>
          <Surface>
            <FullscreenRegion fullscreenId={usersFullscreenId}>
              <FullscreenButton
                ariaLabel="Enable fullscreen for users"
                fullscreenId={usersFullscreenId}
              />
              <Heading5>Users</Heading5>
              <Paragraph>
                Put users in fullscreen. Groups stays in the surface.
              </Paragraph>
            </FullscreenRegion>
          </Surface>
          <Surface>
            <FullscreenRegion fullscreenId={groupsFullscreenId}>
              <FullscreenButton
                ariaLabel="Enable fullscreen for groups"
                fullscreenId={groupsFullscreenId}
              />
              <Heading5>Groups</Heading5>
              <Paragraph>
                Put groups in fullscreen. Users stays in the surface.
              </Paragraph>
            </FullscreenRegion>
          </Surface>
        </Layout>
      </>
    );
  },
};

export const LateSubscriber: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const fullscreenId = useFullscreenId();
    const [hasReadout, setHasReadout] = useState(false);

    return (
      <Surface>
        <FullscreenRegion fullscreenId={fullscreenId}>
          <FullscreenButton fullscreenId={fullscreenId} />
          <Paragraph>
            Enter fullscreen, then mount the readout. It asks the host for the
            stack and gets one snapshot back, so it reads the right state
            without replaying the enter.
          </Paragraph>
          <Button
            label={hasReadout ? "Unmount the readout" : "Mount the readout"}
            onClick={() => setHasReadout((hadReadout) => !hadReadout)}
            variant="secondary"
          />
          {hasReadout && <FullscreenReadout fullscreenId={fullscreenId} />}
        </FullscreenRegion>
      </Surface>
    );
  },
};
