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
import { UiShell, UiShellProps } from "@okta/odyssey-react-mui/labs";

const storybookMeta: Meta<UiShellProps> = {
  title: "Labs Components/UI Shell",
  component: UiShell,
  argTypes: {
    appComponent: {
      control: "",
      description: "The heading of the card.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    onError: {
      control: "function",
      description:
        'Notifies when a React rendering error occurs. This could be useful for logging, flagging "p0"s, and recovering UI Shell when errors occur.',
      table: {
        defaultValue: console.error,
        type: {
          summary: "string",
        },
      },
    },
    onSubscriptionCreated: {
      control: "function",
      description:
        "Notifies when subscribed to prop changes. UI Shell listens to prop updates, and it won't subscribe synchronously. Because of that, this callback notifies when that subscription is ready.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    optionalComponents: {
      control: null,
      description:
        "Components that will render as children of various other components such as the top nav or side nav.",
      table: {
        type: {
          summary: "ReactElement",
        },
      },
    },
    subscribeToPropChanges: {
      control: "function",
      description:
        "This is a callback that provides a subscriber callback to listen for changes to state. It allows UI Shell to listen for state changes. The props coming in this callback go directly to a React state; therefore, it shares the same signature and provides a previous state.",
      table: {
        type: {
          summary: "MouseEventHandler",
        },
      },
    },
  },
  args: {
    appComponent: (
      <div
        style={{
          height: "200px",
          width: "100%",
        }}
      />
    ),
    subscribeToPropChanges: () => () => {},
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

export const Default: StoryObj<UiShellProps> = {};
