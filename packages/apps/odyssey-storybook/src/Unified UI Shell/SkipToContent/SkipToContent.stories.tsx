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

import { Box as MuiBox, type SxProps } from "@mui/material";
import {
  Box,
  Button,
  Dialog,
  Heading2,
  Link,
  Paragraph,
  pxToRem,
  SearchField,
  useOdysseyDesignTokens,
} from "@okta/odyssey-react-mui";
import { SkipToContent } from "@okta/odyssey-react-mui/ui-shell";
import { Meta, StoryObj } from "@storybook/react-vite";
import {
  type FocusEvent,
  type ReactNode,
  type Ref,
  useCallback,
  useMemo,
  useState,
} from "react";
import { userEvent } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  args: {
    appElement: null,
  },
  component: SkipToContent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["!autodocs"],
} satisfies Meta<typeof SkipToContent>;

export default meta;

type Story = StoryObj<typeof meta>;

type FocusSectionProps = {
  children?: ReactNode;
  focusTargetRef?: Ref<HTMLDivElement>;
  sectionLabel: string;
  sx?: SxProps;
  tabIndex?: number;
};

const FocusSection = ({
  children,
  focusTargetRef,
  sectionLabel,
  sx: additionalSx,
  tabIndex,
}: FocusSectionProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = useCallback((blurEvent: FocusEvent<HTMLElement>) => {
    if (!blurEvent.currentTarget.contains(blurEvent.relatedTarget as Node)) {
      setIsFocused(false);
    }
  }, []);

  const handleFocus = useCallback(() => setIsFocused(true), []);

  const containerSx = useMemo<SxProps>(
    () => ({
      background: isFocused
        ? odysseyDesignTokens.HueBlue50
        : odysseyDesignTokens.HueNeutral50,
      border: `2px ${isFocused ? "solid" : "dashed"} ${isFocused ? odysseyDesignTokens.PalettePrimaryMain : odysseyDesignTokens.HueNeutral200}`,
      borderRadius: odysseyDesignTokens.BorderRadiusMain,
      display: "flex",
      flexDirection: "column",
      gap: odysseyDesignTokens.Spacing2,
      padding: odysseyDesignTokens.Spacing4,
      transition: `background ${odysseyDesignTokens.TransitionDurationMain}, border-color ${odysseyDesignTokens.TransitionDurationMain}`,
      ...additionalSx,
    }),
    [isFocused, odysseyDesignTokens, additionalSx],
  );

  const headerSx = useMemo(
    () => ({
      alignItems: "center",
      display: "flex",
      gap: odysseyDesignTokens.Spacing2,
    }),
    [odysseyDesignTokens.Spacing2],
  );

  const badgeSx = useMemo(
    () => ({
      background: isFocused
        ? odysseyDesignTokens.PalettePrimaryMain
        : odysseyDesignTokens.HueNeutral600,
      borderRadius: odysseyDesignTokens.BorderRadiusTight,
      color: odysseyDesignTokens.HueNeutralWhite,
      flexShrink: 0,
      fontSize: "0.7rem",
      fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
      padding: `2px ${odysseyDesignTokens.Spacing2}`,
      transition: `background ${odysseyDesignTokens.TransitionDurationMain}`,
    }),
    [isFocused, odysseyDesignTokens],
  );

  return (
    <MuiBox
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={focusTargetRef}
      sx={containerSx}
      tabIndex={tabIndex}
    >
      <Box sx={headerSx}>
        <Box aria-hidden="true" sx={badgeSx}>
          {isFocused ? "FOCUSED" : "focus target"}
        </Box>
        <strong>{sectionLabel}</strong>
      </Box>
      {children}
    </MuiBox>
  );
};

export const Default: Story = {
  decorators: [OdysseyStorybookThemeDecorator],
  render: function C() {
    const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const outerSx = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column",
        gap: odysseyDesignTokens.Spacing3,
        padding: odysseyDesignTokens.Spacing4,
      }),
      [odysseyDesignTokens.Spacing3, odysseyDesignTokens.Spacing4],
    );

    const rowSx = useMemo(
      () => ({ display: "flex", gap: odysseyDesignTokens.Spacing3 }),
      [odysseyDesignTokens.Spacing3],
    );

    const sideNavSx = useMemo(
      () => ({ flexShrink: 0, width: `${pxToRem(200)}rem` }),
      [],
    );

    return (
      <Box sx={outerSx}>
        <SkipToContent appElement={appElement} />

        <FocusSection sectionLabel="Top Navigation" tabIndex={0} />

        <Box sx={rowSx}>
          <FocusSection
            sectionLabel="Side Navigation"
            sx={sideNavSx}
            tabIndex={0}
          />
          <FocusSection
            focusTargetRef={setAppElement}
            sectionLabel="Main Content"
            sx={{ flex: 1 }}
            tabIndex={0}
          >
            <Paragraph>
              Press Tab — the button appears. Click it to skip past Top
              Navigation and Side Navigation directly to Main Content.
            </Paragraph>
          </FocusSection>
        </Box>
      </Box>
    );
  },
  play: async () => {
    await userEvent.tab();
  },
};

export const AutoFocusedTopBar: Story = {
  decorators: [OdysseyStorybookThemeDecorator],
  render: function C() {
    const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const outerSx = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column",
        gap: odysseyDesignTokens.Spacing3,
        padding: odysseyDesignTokens.Spacing4,
      }),
      [odysseyDesignTokens.Spacing3, odysseyDesignTokens.Spacing4],
    );

    return (
      <Box sx={outerSx}>
        <SkipToContent appElement={appElement} />

        <FocusSection sectionLabel="Top Navigation">
          <SearchField hasInitialFocus label="Search (auto-focused on load)" />
          <Paragraph>
            The search field is focused on load. Press Tab — the "Skip to main
            content" button should intercept and appear.
          </Paragraph>
        </FocusSection>

        <FocusSection
          focusTargetRef={setAppElement}
          sectionLabel="Main Content"
          tabIndex={0}
        >
          <Paragraph>Click "Skip to main content" to land here.</Paragraph>
        </FocusSection>
      </Box>
    );
  },
};

export const WithNavigation: Story = {
  decorators: [OdysseyStorybookThemeDecorator],
  render: function C() {
    const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const outerSx = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column",
        gap: odysseyDesignTokens.Spacing3,
        padding: odysseyDesignTokens.Spacing4,
      }),
      [odysseyDesignTokens.Spacing3, odysseyDesignTokens.Spacing4],
    );

    const rowSx = useMemo(
      () => ({ display: "flex", gap: odysseyDesignTokens.Spacing3 }),
      [odysseyDesignTokens.Spacing3],
    );

    const topNavLinksSx = useMemo(
      () => ({ display: "flex", gap: odysseyDesignTokens.Spacing3 }),
      [odysseyDesignTokens.Spacing3],
    );

    const sideNavSx = useMemo(
      () => ({ flexShrink: 0, width: `${pxToRem(200)}rem` }),
      [],
    );

    const sideNavLinksSx = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column",
        gap: odysseyDesignTokens.Spacing1,
      }),
      [odysseyDesignTokens.Spacing1],
    );

    const actionButtonsSx = useMemo(
      () => ({ display: "flex", gap: odysseyDesignTokens.Spacing2 }),
      [odysseyDesignTokens.Spacing2],
    );

    return (
      <Box sx={outerSx}>
        <SkipToContent appElement={appElement} />

        <FocusSection sectionLabel="Top Navigation">
          <Box
            aria-label="Top navigation links"
            component="nav"
            sx={topNavLinksSx}
          >
            <Link href="#home">Home</Link>
            <Link href="#settings">Settings</Link>
            <Link href="#help">Help</Link>
          </Box>
        </FocusSection>

        <Box sx={rowSx}>
          <FocusSection sectionLabel="Side Navigation" sx={sideNavSx}>
            <Box
              aria-label="Side navigation links"
              component="nav"
              sx={sideNavLinksSx}
            >
              {[
                "Dashboard",
                "Users",
                "Applications",
                "Security",
                "Reports",
              ].map((navItemLabel) => (
                <Link
                  href={`#${navItemLabel.toLowerCase()}`}
                  key={navItemLabel}
                >
                  {navItemLabel}
                </Link>
              ))}
            </Box>
          </FocusSection>

          <FocusSection
            focusTargetRef={setAppElement}
            sectionLabel="Main Content"
            sx={{ flex: 1 }}
            tabIndex={0}
          >
            <Heading2>Dashboard</Heading2>
            <Paragraph>
              Use the "Skip to main content" button (press Tab) to jump directly
              here, bypassing the top nav and side nav.
            </Paragraph>
            <Box sx={actionButtonsSx}>
              <Button label="Primary Action" variant="primary" />
              <Button label="Secondary Action" variant="secondary" />
            </Box>
          </FocusSection>
        </Box>
      </Box>
    );
  },
};

export const WithDialog: Story = {
  decorators: [OdysseyStorybookThemeDecorator],
  render: function C() {
    const [appElement, setAppElement] = useState<HTMLDivElement | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const odysseyDesignTokens = useOdysseyDesignTokens();

    const outerSx = useMemo(
      () => ({
        display: "flex",
        flexDirection: "column",
        gap: odysseyDesignTokens.Spacing3,
        padding: odysseyDesignTokens.Spacing4,
      }),
      [odysseyDesignTokens.Spacing3, odysseyDesignTokens.Spacing4],
    );

    const openDialog = useCallback(() => setIsDialogOpen(true), []);
    const closeDialog = useCallback(() => setIsDialogOpen(false), []);

    return (
      <Box sx={outerSx}>
        <SkipToContent appElement={appElement} />

        <FocusSection sectionLabel="Top Navigation" tabIndex={0} />

        <FocusSection
          focusTargetRef={setAppElement}
          sectionLabel="Main Content"
          sx={{ flex: 1 }}
          tabIndex={0}
        >
          <Paragraph>
            Use "Skip to main content" to land here, then open the dialog.
          </Paragraph>
          <Button label="Open dialog" onClick={openDialog} variant="primary" />
        </FocusSection>

        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          primaryCallToActionComponent={
            <Button label="Close" onClick={closeDialog} variant="primary" />
          }
          title="Example dialog"
        >
          <Paragraph>
            This dialog launched from the main content area. The skip link
            helped get here without tabbing through the navigation.
          </Paragraph>
        </Dialog>
      </Box>
    );
  },
};
