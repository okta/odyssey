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

import {
  Autocomplete,
  Box,
  Button,
  type ColorScheme,
  CssBaseline,
  DatePicker,
  Dialog,
  Drawer,
  MenuButton,
  MenuItem,
  OdysseyProvider,
  OdysseyThemeProvider,
  Paragraph,
  Select,
  Stack,
  Status,
  Surface,
  Tag,
  TagList,
  Toast,
  ToastStack,
  Tooltip,
  useColorScheme,
} from "@okta/odyssey-react-mui";
import { appRootElementId } from "@okta/odyssey-react-mui/__internal";
import { DownloadIcon } from "@okta/odyssey-react-mui/icons";
import { Layout, PageTemplate } from "@okta/odyssey-react-mui/labs";
// `@okta/unified-ui-shell` bundles the published `odyssey-react-mui` it pins, which predates `colorScheme`, so these stories render core's `renderUiShell` to follow the toolbar's scheme. The string-icon story stays on the wrapper because the icon names are the wrapper's feature.
import { renderUiShell as coreRenderUiShell } from "@okta/odyssey-react-mui/ui-shell";
import {
  renderReactInWebComponent,
  webComponentDataAttributeName,
} from "@okta/odyssey-react-mui/web-component";
import { renderUiShell } from "@okta/unified-ui-shell";
import { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useEffect, useRef } from "react";
import { action } from "storybook/actions";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta = {
  component: () => null,
  decorators: [
    // UI Shell and the app inside it are separate React roots, so the toolbar's scheme cannot reach them through context. This provider only lets each story read it with `useColorScheme` and pass it in, and the key remounts the shell when it changes because the app root renders once.
    (Story, context) => (
      <OdysseyThemeProvider
        colorScheme={(context.globals.colorScheme as ColorScheme) ?? "light"}
        hasWrapperElement={false}
        key={context.globals.colorScheme as string}
      >
        <Story />
      </OdysseyThemeProvider>
    ),
  ],
  parameters: {
    a11y: {
      disable: true, // As these are only visual tests, we don't need to worry about Axe. It has a lot of issues because of the Shadow DOM and throws a bunch of random errors because of those issues.
    },
    layout: "fullscreen",
  },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const getAppRootElementInShadowDom = async (canvasElement: HTMLElement) => {
  const odysseyReactWebComponentElements = await waitFor(() => {
    const odysseyReactWebComponentElements = canvasElement.querySelectorAll(
      `[${webComponentDataAttributeName}]`,
    );

    expect(odysseyReactWebComponentElements).toHaveLength(2);

    return odysseyReactWebComponentElements;
  });

  const shadowRootElement = odysseyReactWebComponentElements[1].shadowRoot;

  expect(shadowRootElement).not.toBeNull();

  return await waitFor(() => {
    const appRootElement = shadowRootElement!.getElementById(appRootElementId);

    expect(appRootElement).not.toBeNull();

    expect(appRootElement!.innerHTML.length > 0).toBe(true);

    return appRootElement!;
  });
};

type SlotProps = {
  outerSlot?: ReactNode;
  surfaceSlot?: ReactNode;
};

type CreateOnRenderProps = SlotProps & {
  colorScheme: ColorScheme;
  hasTranslationProvider?: boolean;
};

const createOnRender: ({
  colorScheme,
  hasTranslationProvider,
  outerSlot,
  surfaceSlot,
}: CreateOnRenderProps) => (uiShellReturnValues: {
  appElement?: HTMLElement;
}) => void =
  ({ colorScheme, hasTranslationProvider = true, outerSlot, surfaceSlot }) =>
  ({ appElement }) => {
    if (!appElement) {
      return;
    }

    renderReactInWebComponent({
      getReactComponent: (reactRootElements) => (
        <OdysseyProvider
          colorScheme={colorScheme}
          emotionRootElement={reactRootElements.stylesRootElement}
          hasTranslationProvider={hasTranslationProvider}
          shadowRootElement={reactRootElements.appRootElement}
        >
          <CssBaseline />

          <PageTemplate
            description="This is my app."
            title="Access Certification"
          >
            <Layout regions={[1]}>
              <Surface>{surfaceSlot}</Surface>
            </Layout>
          </PageTemplate>

          {outerSlot}
        </OdysseyProvider>
      ),
      webComponentParentElement: appElement,
    });
  };

const UiShellWrapper = ({ outerSlot, surfaceSlot }: SlotProps) => {
  const rootElementRef = useRef<HTMLDivElement>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (rootElementRef.current) {
      coreRenderUiShell({
        appElementScrollingMode: "vertical",
        colorScheme,
        parentElement: rootElementRef.current,
        onRender: createOnRender({
          colorScheme,
          outerSlot,
          surfaceSlot,
        }),
      });
    }
  }, [colorScheme, outerSlot, surfaceSlot]);

  return <div ref={rootElementRef} />;
};

export const Default: Story = {
  render: function C() {
    return <UiShellWrapper />;
  },
};

// The language stories pass `hasTranslationProvider: false` to the app-content `OdysseyProvider`. This is critical: the shell and the app render in separate React trees that share the same module-level `i18nInstance`. If the inner provider mounted its own `TranslationProvider`, its `useEffect` would call `changeLanguage(...)` with its own `languageCode` (defaulting to `window.navigator.language`) and overwrite the language the shell just set.
export const InitialLanguageCodeFrench: Story = {
  render: function C() {
    const rootElementRef = useRef<HTMLDivElement>(null);
    const colorScheme = useColorScheme();

    useEffect(() => {
      if (rootElementRef.current) {
        coreRenderUiShell({
          appElementScrollingMode: "vertical",
          colorScheme,
          languageCode: "fr",
          parentElement: rootElementRef.current,
          onRender: createOnRender({
            colorScheme,
            hasTranslationProvider: false,
            surfaceSlot: <Paragraph>This is the surface content.</Paragraph>,
          }),
        });
      }
    }, [colorScheme]);

    return <div ref={rootElementRef} />;
  },
};

export const RuntimeLanguageSwitchToSpanish: Story = {
  render: function C() {
    const rootElementRef = useRef<HTMLDivElement>(null);
    const colorScheme = useColorScheme();

    useEffect(() => {
      if (rootElementRef.current) {
        const { setTranslationSettings } = coreRenderUiShell({
          appElementScrollingMode: "vertical",
          colorScheme,
          languageCode: "fr",
          parentElement: rootElementRef.current,
          onRender: createOnRender({
            colorScheme,
            hasTranslationProvider: false,
            surfaceSlot: <Paragraph>This is the surface content.</Paragraph>,
          }),
        });

        setTranslationSettings({ languageCode: "es" });
      }
    }, [colorScheme]);

    return <div ref={rootElementRef} />;
  },
};

export const OpenedAutocompleteInSurface: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        surfaceSlot={
          <Autocomplete
            label="Test Autocomplete"
            options={[
              { label: "Anderson Station" },
              { label: "Bara Gaon Complex" },
              { label: "Ceres" },
              { label: "Corley Station" },
              { label: "Deep Transfer Station Three" },
              { label: "Eros" },
              { label: "Free Navy Supply Depot" },
              { label: "Ganymede" },
              { label: "Gewitter Base" },
              { label: "Iapetus Station" },
              { label: "Kelso Station" },
              { label: "Laconian Transfer Station" },
              { label: "Mao Station" },
              { label: "Medina Station" },
              { label: "Nauvoo" },
              { label: "Oshima" },
              { label: "Osiris Station" },
              { label: "Pallas" },
              { label: "Phoebe Station" },
              { label: "Prospero Station" },
              { label: "Shirazi-Ma Complex" },
              { label: "Terryon Lock" },
              { label: "Thoth Station" },
              { label: "Tycho Station" },
              { label: "Vesta" },
            ]}
          />
        }
      />
    );
  },
  play: ({ canvasElement, step }) =>
    step("click Autocomplete to show items", async () => {
      const appRootElement = await getAppRootElementInShadowDom(canvasElement);

      const canvas = within(appRootElement);

      const autocompleteElement = canvas.getByRole("combobox", {
        name: "Test Autocomplete",
      });

      await userEvent.click(autocompleteElement);
    }),
};

export const OpenedDatePickerInSurface: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        surfaceSlot={
          <DatePicker
            label="Test DatePicker"
            value="2025-09-10T00:00:00.000Z"
          />
        }
      />
    );
  },
  play: ({ canvasElement, step }) =>
    step("click Select to show items", async () => {
      const appRootElement = await getAppRootElementInShadowDom(canvasElement);

      const canvas = within(appRootElement);

      // Hack because of MUI `DatePicker` issues.
      await new Promise((resolve) => {
        setTimeout(resolve, 250);
      });

      const inputElement = canvas.getByRole("textbox", {
        name: "Test DatePicker",
      });

      const buttonElement = within(inputElement.parentElement!).getByRole(
        "button",
        { name: "Choose date" },
      );

      await userEvent.click(buttonElement);

      expect(await canvas.findByRole("dialog")).toBeVisible();
    }),
};

export const OpenedDialog: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        outerSlot={
          <>
            <Button label="My Button" variant="primary" />

            <Dialog isOpen onClose={action("onClose")} title="Test Dialog">
              This is the text in my Dialog.
            </Dialog>
          </>
        }
      />
    );
  },
};

export const OpenedDialogWithToast: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        outerSlot={
          <>
            <Button label="My Button" variant="primary" />

            <ToastStack>
              <Toast
                isDismissable
                isVisible
                onHide={action("onHide")}
                role="status"
                severity="info"
                text="This toast should float ABOVE the dialog backdrop."
              />
            </ToastStack>

            <Dialog isOpen onClose={action("onClose")} title="Test Dialog">
              If the fix works, the info toast is visible above this dialog's
              dark backdrop. If broken, the toast is hidden behind it.
            </Dialog>
          </>
        }
      />
    );
  },
};

export const OpenedDrawer: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        outerSlot={
          <>
            <Button label="My Button" variant="primary" />

            <Drawer
              hasDividers
              isOpen
              onClose={action("onClose")}
              title="Test Drawer"
            >
              <Paragraph>This is the text in my Drawer.</Paragraph>
            </Drawer>
          </>
        }
      />
    );
  },
};

export const OpenedDrawerWithToast: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        outerSlot={
          <>
            <Button label="My Button" variant="primary" />

            <ToastStack>
              <Toast
                isDismissable
                isVisible
                onHide={action("onHide")}
                role="status"
                severity="info"
                text="This toast should float ABOVE the drawer backdrop."
              />
            </ToastStack>

            <Drawer
              hasDividers
              isOpen
              onClose={action("onClose")}
              title="Test Drawer"
            >
              <Paragraph>
                If the fix works, the info toast is visible above this drawer's
                dark backdrop. If broken, the toast is hidden behind it.
              </Paragraph>
            </Drawer>
          </>
        }
      />
    );
  },
};

export const OpenedMenuButtonInSurface: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        surfaceSlot={
          <MenuButton buttonLabel="Test MenuButton">
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </MenuButton>
        }
      />
    );
  },
  play: ({ canvasElement, step }) =>
    step("click Select to show items", async () => {
      const appRootElement = await getAppRootElementInShadowDom(canvasElement);

      const canvas = within(appRootElement);

      const buttonElement = canvas.getByRole("button", {
        name: "Test MenuButton",
      });

      await userEvent.click(buttonElement);
    }),
};

export const OpenedSelectInSurface: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        surfaceSlot={
          <Select
            label="Test Select"
            options={[
              { text: "English", value: "en", language: "en" },
              { text: "Español", value: "es", language: "es" },
              { text: "Français", value: "fr", language: "fr" },
              { text: "Deutsch", value: "de", language: "de" },
              { text: "中文", value: "zh", language: "zh" },
              { text: "日本語", value: "ja", language: "ja" },
              { text: "한국어", value: "ko", language: "ko" },
            ]}
          />
        }
      />
    );
  },
  play: ({ canvasElement, step }) =>
    step("click Select to show items", async () => {
      const appRootElement = await getAppRootElementInShadowDom(canvasElement);

      const canvas = within(appRootElement);

      const selectElement = canvas.getByRole("combobox", {
        name: "Test Select",
      });

      await userEvent.click(selectElement);
    }),
};

export const ContrastModeInShadowDom: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        surfaceSlot={
          <>
            <Paragraph>
              These components are rendered inside a shadow DOM. The contrast
              mode hook should cross the shadow boundary and detect the Surface
              background color.
            </Paragraph>
            <Box sx={{ marginBottom: 2 }}>
              <Stack direction="row" spacing={1}>
                <Status label="Default" severity="default" />
                <Status label="Error" severity="error" />
                <Status label="Info" severity="info" />
                <Status label="Success" severity="success" />
                <Status label="Warning" severity="warning" />
              </Stack>
            </Box>
            <TagList>
              <Tag colorVariant="default" label="Default" />
              <Tag colorVariant="info" label="Info" />
              <Tag colorVariant="accentOne" label="Accent One" />
              <Tag colorVariant="accentTwo" label="Accent Two" />
            </TagList>
          </>
        }
      />
    );
  },
};

export const OpenedTooltipInSurface: Story = {
  render: function C() {
    return (
      <UiShellWrapper
        surfaceSlot={
          <Tooltip ariaType="label" text="Test Tooltip">
            <Button
              ariaLabel="Download logs"
              startIcon={<DownloadIcon />}
              variant="secondary"
            />
          </Tooltip>
        }
      />
    );
  },
  play: ({ canvasElement, step }) =>
    step("hover Button to show Tooltip", async () => {
      const appRootElement = await getAppRootElementInShadowDom(canvasElement);

      const canvas = within(appRootElement);

      const buttonElement = canvas.getByRole("button", {
        name: "Download logs",
      });

      await userEvent.hover(buttonElement);
    }),
};

// `renderUiShell` accepts side-nav icons as string names (`startIconName` / `endIconName`) in addition to React elements. Names are resolved lazily through Odyssey's icon dictionary, so consuming apps don't bundle the full icon set. The icon transformation runs inside `setComponentProps`, so items are set there rather than in the initial render args.
export const SideNavWithStringIcons: Story = {
  render: function C() {
    const rootElementRef = useRef<HTMLDivElement>(null);
    const colorScheme = useColorScheme();

    useEffect(() => {
      if (rootElementRef.current) {
        const { setComponentProps } = renderUiShell({
          appElementScrollingMode: "vertical",
          parentElement: rootElementRef.current,
          onRender: createOnRender({
            colorScheme,
            surfaceSlot: (
              <Paragraph>
                The side nav icons are resolved from string names via Odyssey's
                lazy icon dictionary.
              </Paragraph>
            ),
          }),
        });

        setComponentProps({
          sideNavProps: {
            sideNavItems: [
              {
                id: "dashboard",
                label: "Dashboard",
                href: "#dashboard",
                startIconName: "HomeIcon",
              },
              {
                id: "applications",
                label: "Applications",
                href: "#applications",
                startIconName: "AppsIcon",
              },
              {
                id: "settings",
                label: "Settings",
                isDefaultExpanded: true,
                nestedNavItems: [
                  {
                    id: "settings-profile",
                    label: "Profile",
                    href: "#profile",
                    endIconName: "SettingsIcon",
                  },
                ],
              },
            ],
          },
        });
      }
    }, [colorScheme]);

    return <div ref={rootElementRef} />;
  },
};
