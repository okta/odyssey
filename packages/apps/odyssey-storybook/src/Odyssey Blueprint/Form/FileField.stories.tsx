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
  OdysseyBlueprintRenderer,
  type OdysseyBlueprintRendererProps,
} from "@okta/odyssey-blueprint";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../tools/boardStoryHelpers.js";
import { OdysseyBlueprintStorybookThemeDecorator } from "../../tools/OdysseyBlueprintStorybookThemeDecorator.js";

const storybookMeta: Meta<OdysseyBlueprintRendererProps> = {
  component: OdysseyBlueprintRenderer,
  decorators: [OdysseyBlueprintStorybookThemeDecorator],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs", "alpha"],
  args: {
    blueprint: {
      from: "odyssey-blueprint/file-field@1",
      instanceId: "playground.file",
      inputs: {
        hint: "PDF or PNG, up to 2 MB",
        label: "Attachment",
        variant: "button",
      },
    },
  },
};

export default storybookMeta;

type Story = StoryObj<OdysseyBlueprintRendererProps>;

export const Playground: Story = {};

// One renderer per cell rather than one blueprint holding every variant:
// `OdysseyBlueprintRenderer` takes a single root entry, and there is no container
// block yet to nest siblings under. Each entry needs its own `instanceId` because
// instance registration is keyed by it.
export const AllVariants: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every file-field@1 variant.">
        <StoryGrid columns={3}>
          <StoryCell label="button">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "variants.file.button",
                inputs: { label: "Attachment", variant: "button" },
              }}
            />
          </StoryCell>

          <StoryCell label="dragAndDrop">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "variants.file.dragAndDrop",
                inputs: { label: "Attachment", variant: "dragAndDrop" },
              }}
            />
          </StoryCell>

          <StoryCell label="dragAndDropWithIcon">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "variants.file.dragAndDropWithIcon",
                inputs: {
                  label: "Attachment",
                  variant: "dragAndDropWithIcon",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every prop-driven state file-field@1 supports.">
        <StoryGrid columns={3}>
          <StoryCell label="optional">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.optional",
                inputs: {
                  isOptional: true,
                  label: "Attachment",
                  variant: "button",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="hint">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.hint",
                inputs: {
                  hint: "PDF or PNG, up to 2 MB",
                  label: "Attachment",
                  variant: "button",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="disabled">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.disabled",
                inputs: {
                  isDisabled: true,
                  label: "Attachment",
                  variant: "button",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.error",
                inputs: {
                  errorMessage: "Attach a signed copy to continue",
                  label: "Attachment",
                  variant: "button",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="error, dragAndDrop">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.errorDragAndDrop",
                inputs: {
                  errorMessage: "Attach a signed copy to continue",
                  label: "Attachment",
                  variant: "dragAndDrop",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="multiple, accepted types">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.multiple",
                inputs: {
                  acceptedFileTypes: ["application/pdf", "image/png"],
                  hint: "Up to 5 files",
                  label: "Attachments",
                  maxFileCount: 5,
                  type: "multiple",
                  variant: "button",
                },
              }}
            />
          </StoryCell>

          <StoryCell label="full width, dragAndDrop">
            <OdysseyBlueprintRenderer
              blueprint={{
                from: "odyssey-blueprint/file-field@1",
                instanceId: "states.file.fullWidth",
                inputs: {
                  isFullWidth: true,
                  label: "Attachment",
                  maxSizeBytes: 2_097_152,
                  variant: "dragAndDrop",
                },
              }}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
