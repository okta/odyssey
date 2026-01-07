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

import { FieldComponentProps } from "@okta/odyssey-react-mui";
import { ArgTypes } from "@storybook/react";

export const fieldComponentPropsMetaData: Partial<
  ArgTypes<FieldComponentProps>
> = {
  errorMessage: {
    control: "text",
    description:
      "If `error` is not undefined, the `input` will indicate an error",
    table: {
      category: "Visual",
      type: {
        summary: "string",
      },
    },
  },
  errorMessageList: {
    control: { type: "check" },
    options: ["Error A", "Error B", "Error C"],
    description:
      "The list of error messages rendered at the buttom of the `error` message",
    table: {
      category: "Visual",
      type: {
        summary: "array",
      },
    },
  },
  hint: {
    control: "text",
    description: "A helper text that is displayed under the label",
    table: {
      category: "Visual",
      type: {
        summary: "string",
      },
    },
  },
  HintLinkComponent: {
    control: false,
    description:
      "A `HintLink` component rendered alongside the `hint` text to provide greater context. See [HintLink](../?path=/docs/odyssey-core-fields-hintlink--docs) for usage and available props",
    table: {
      category: "Visual",
      type: {
        summary: "ReactNode",
      },
    },
  },
  id: {
    control: "text",
    description: "The id of the `input` element",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
  isDisabled: {
    control: "boolean",
    description: "If `true`, the component is disabled",
    table: {
      category: "Visual",
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: "false",
      },
    },
  },
  isFullWidth: {
    control: "boolean",
    description:
      "If `true`, the component can stretch to fill the width of the container",
    table: {
      category: "Visual",
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: "false",
      },
    },
  },
  isOptional: {
    control: "boolean",
    description: "If `true`, the `input` element is not required",
    table: {
      category: "Visual",
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: "false",
      },
    },
  },
  isReadOnly: {
    control: "boolean",
    description:
      "If `true`, it prevents the user from changing the value of the field",
    table: {
      category: "Visual",
      type: {
        summary: "boolean",
      },
    },
  },
  name: {
    control: "text",
    description:
      "The name of the `input` element. Defaults to the `id` if not set",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
};
