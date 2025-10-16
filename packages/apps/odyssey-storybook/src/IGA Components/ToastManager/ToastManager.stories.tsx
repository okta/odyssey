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

import type { Meta, StoryObj } from "@storybook/react";

import {
  ToastManager,
  ToastManagerProps,
  useToast,
} from "@okta/odyssey-contributions-iga-components";
import { Button } from "@okta/odyssey-react-mui";
import { useCallback } from "react";

import { IgaComponentsLegacyOdysseyDecorator } from "../../tools/IgaComponentsLegacyOdysseyDecorator.js";
import { OdysseyStorybookThemeDecorator } from "../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: ToastManager,
  decorators: [
    OdysseyStorybookThemeDecorator,
    IgaComponentsLegacyOdysseyDecorator,
  ],
  args: {},
  argTypes: {},
} satisfies Meta<ToastManagerProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const ChildComponent = () => {
  const { addToast } = useToast();

  const handleClick = useCallback(
    () =>
      addToast({
        severity: "success",
        message: "This is a success toast",
      }),
    [addToast],
  );

  return <Button label="Add Toast" onClick={handleClick} variant={"primary"} />;
};

export const Example: Story = {
  name: "Example",
  render: (args) => {
    return <ToastManager>{args.children}</ToastManager>;
  },
  args: {
    children: <ChildComponent />,
  },
};
