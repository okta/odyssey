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

import { HtmlProps } from "@okta/odyssey-react-mui";
import { ArgTypes } from "@storybook/react-vite";

export const htmlPropsMetaData: ArgTypes<Required<HtmlProps>> = {
  ariaBusy: {
    control: "boolean",
    description:
      "Used in [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), the `aria-busy` state indicates an element is being modified and that assistive technologies may want to wait until the changes are complete before informing the user about the update.",
    table: {
      category: "Functional",
      type: {
        summary: "boolean",
      },
    },
  },
  ariaChecked: {
    control: "boolean",
    description:
      'The `aria-checked` attribute indicates the current "checked" state of checkboxes, radio buttons, and other widgets.\n\nNOTE: Where possible use an HTML `<input>` element with `type="checkbox"` and `type="radio"` as these have built in semantics and do not require ARIA attributes.',
    table: {
      category: "Functional",
      type: {
        summary: "boolean | 'mixed'",
      },
    },
  },
  ariaControls: {
    control: "text",
    description:
      "The `aria-controls` property identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.\n\nValue: A space-separated list of one or more ID values referencing the elements being controlled by the current element",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
  ariaCurrent: {
    control: "select",
    options: [
      "page",
      "step",
      "location",
      "date",
      "time",
      "true",
      "false",
      undefined,
    ],
    description:
      "A non-null `aria-current` state on an element indicates that this element represents the current item within a container or set of related elements.",
    table: {
      category: "Functional",
      type: {
        summary:
          "boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'",
      },
    },
  },
  ariaDescribedBy: {
    control: "text",
    description:
      "The `aria-describedby` attribute identifies the element (or elements) that describes the element on which the attribute is set.\n\nValue: The id or space-separated list of element ids that describe the current element.\n\nNote: The `aria-describedby` attribute is not designed to reference descriptions from external resources. It must reference elements in the same DOM document.",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
  ariaErrorMessage: {
    control: "text",
    description:
      "The `aria-errormessage` attribute on an object identifies the element that provides an error message for that object.\n\nValue: The value of the id of the element containing the error message for the current element",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
  ariaExpanded: {
    control: "boolean",
    description:
      "The `aria-expanded` attribute is set on an element to indicate if a control is expanded or collapsed, and whether or not the controlled elements are displayed or hidden.",
    table: {
      category: "Functional",
      type: {
        summary: "boolean",
      },
    },
  },
  ariaHasPopup: {
    control: "select",
    options: [
      "false",
      "true",
      "menu",
      "listbox",
      "tree",
      "grid",
      "dialog",
      undefined,
    ],
    description:
      "The `aria-haspopup` attribute indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set.",
    table: {
      category: "Functional",
      type: {
        summary:
          "boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'",
      },
    },
  },
  ariaHidden: {
    control: "boolean",
    description:
      "Indicates whether the element is exposed to an accessibility API.",
    table: {
      category: "Functional",
      type: {
        summary: "boolean",
      },
    },
  },
  ariaLabel: {
    control: "text",
    description:
      "The `aria-label` attribute defines a string value that labels an interactive element.",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
  ariaLabelledBy: {
    control: "text",
    description:
      "The `aria-labelledby` attribute identifies the element (or elements) that labels the element it is applied to.\n\nValue: Space separated list of one or more ID values referencing the elements that label the current element.",
    table: {
      category: "Functional",
      type: {
        summary: "string",
      },
    },
  },
  ariaPressed: {
    control: "boolean",
    description:
      'The `aria-pressed` attribute indicates the current "pressed" state of a toggle button.',
    table: {
      category: "Functional",
      type: {
        summary: "boolean | 'mixed'",
      },
    },
  },
  tabIndex: {
    control: "number",
    description:
      "The `tabindex` global attribute allows developers to make HTML elements focusable, allow or prevent them from being sequentially focusable\n\nNote: Manipulating the natural tab order is generally advised against",
    table: {
      category: "Functional",
      type: {
        summary: "number",
      },
    },
  },
  testId: {
    control: "text",
    description:
      "**WARNING:** You should be using Semantic Selectors instead of this property. This is a temporary measure for backwards compatibility with existing Selenium tests.\n\nThis prop puts a `data` attribute on an HTML element in this component with the value provided.",
    table: {
      category: "Functional",
      subcategory: "⚠️ Deprecated",
      type: {
        summary: "string",
      },
    },
  },
  translate: {
    control: "radio",
    options: ["yes", "no"],
    description:
      "This prop puts a `translate` attribute on an HTML element. It should be used to indicate whether text within the element should be translated.",
    table: {
      category: "Functional",
      type: {
        summary: "'yes' | 'no'",
      },
    },
  },
};
