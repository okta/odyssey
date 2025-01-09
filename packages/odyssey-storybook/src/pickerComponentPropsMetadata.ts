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

export const pickerComponentPropsMetadata = {
  errorMessage: {
    control: "text",
    description:
      "If `error` is not undefined, the `input` will indicate an error",
    table: {
      type: {
        summary: "string",
      },
    },
  },
  errorMessageList: {
    description:
      "The list of error messages rendered at the bottom of the `error` message",
    table: {
      type: {
        summary: "array",
      },
    },
  },
  id: {
    control: "text",
    description: "The id of the `input` element.",
    table: {
      type: {
        summary: "string",
      },
    },
  },
  isDisabled: {
    control: "boolean",
    description: "If `true`, the component is disabled",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  isFullWidth: {
    control: "boolean",
    description:
      "If `true`, the component can stretch to fill the width of the container",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  isOptional: {
    control: "boolean",
    description: "If `true`, the `input` element is not required",
    table: {
      type: {
        summary: "boolean",
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  isReadOnly: {
    control: "boolean",
    description: "It prevents the user from changing the value of the field",
    table: {
      type: {
        summary: "boolean",
      },
    },
  },
  name: {
    control: "text",
    description:
      "The name of the `input` element. Defaults to the `id` if not set.",
    table: {
      type: {
        summary: "string",
      },
    },
  },
};
