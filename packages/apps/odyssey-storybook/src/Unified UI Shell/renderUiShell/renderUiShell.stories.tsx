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
  Button,
  CssBaseline,
  DatePicker,
  Dialog,
  Drawer,
  MenuButton,
  MenuItem,
  OdysseyProvider,
  Paragraph,
  Select,
  Surface,
  Tooltip,
} from "@okta/odyssey-react-mui";
import { DownloadIcon } from "@okta/odyssey-react-mui/icons";
import { Layout, PageTemplate } from "@okta/odyssey-react-mui/labs";
import {
  renderReactInWebComponent,
  webComponentDataAttributeName,
} from "@okta/odyssey-react-mui/web-component";
import { renderUiShell } from "@okta/unified-ui-shell";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { type ReactNode, useEffect, useRef } from "react";

import { appRootElementId } from "../../../../../core/odyssey-react-mui/src/web-component/createReactRootElements.js";

const meta = {
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

const createOnRender: ({
  outerSlot,
  surfaceSlot,
}: SlotProps) => Parameters<typeof renderUiShell>[0]["onRender"] =
  ({ outerSlot, surfaceSlot }) =>
  (uiShellReturnValues) => {
    renderReactInWebComponent({
      getReactComponent: (reactRootElements) => (
        <OdysseyProvider
          emotionRootElement={reactRootElements.stylesRootElement}
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
      webComponentParentElement: uiShellReturnValues.appElement,
    });
  };

const UiShellWrapper = ({ outerSlot, surfaceSlot }: SlotProps) => {
  const rootElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootElementRef.current) {
      renderUiShell({
        appElementScrollingMode: "vertical",
        parentElement: rootElementRef.current,
        onRender: createOnRender({
          outerSlot,
          surfaceSlot,
        }),
      });
    }
  }, [outerSlot, surfaceSlot]);

  return <div ref={rootElementRef} />;
};

export const Default: Story = {
  render: function C() {
    return <UiShellWrapper />;
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
