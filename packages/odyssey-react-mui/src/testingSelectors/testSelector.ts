/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// import { queries, type BoundFunctions, type ByRoleOptions, type GetByRole, type GetByText, type Screen, within } from "@testing-library/dom" // TEMP: REMOVE THIS IF NOT NEEDED!
import { AriaRole } from "react";

// import { testSelectors as calloutTestSelectors } from "./Callout"
// import { testSelectors as toastTestSelectors } from "./Toast"

export type FeatureTestSelector = {
  feature?: Record<string, FeatureTestSelector>;
  selector?:
    | {
        // element: keyof HTMLElementTagNameMap
        queryName: "ByRole";
        role: AriaRole;
      }
    | {
        // element: keyof HTMLElementTagNameMap
        queryName: "ByLabelText" | "ByPlaceholderText" | "ByText";
      };
};

const calloutTestSelector = {
  feature: {
    content: {
      selector: {
        // element: "div",
        queryName: "ByText",
      },
    },
    link: {
      selector: {
        // element: "a",
        queryName: "ByRole",
        role: "link",
      },
    },
    title: {
      selector: {
        // element: "div",
        queryName: "ByLabelText",
      },
    },
  },
  selector: {
    // element: "div",
    queryName: "ByRole",
    role: "alert",
  },
} as const satisfies FeatureTestSelector;

const toastTestSelectors = {
  feature: {
    content: {
      selector: {
        // element: "div",
        queryName: "ByText",
      },
    },
    link: {
      selector: {
        // element: "a",
        queryName: "ByRole",
        role: "link",
      },
    },
    title: {
      selector: {
        // element: "div",
        queryName: "ByLabelText",
      },
    },
  },
  selector: {
    // element: "div",
    queryName: "ByRole",
    role: "alert",
  },
} as const satisfies FeatureTestSelector;

export const testSelector = {
  Callout: calloutTestSelector,
  Toast: toastTestSelectors,
} as const satisfies Record<string, FeatureTestSelector>;