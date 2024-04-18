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
import {
  queries,
  within,
  type BoundFunctions,
  type ByRoleOptions,
} from "@testing-library/dom";
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

const querySelector = ({
  canvas,
  description,
  label,
  selector,
  roleOverride,
}: {
  canvas: BoundFunctions<typeof queries>;
  description?: ByRoleOptions["description"];
  label?: ByRoleOptions["name"];
  selector: NonNullable<FeatureTestSelector["selector"]>;
  roleOverride?: string;
}) => {
  if (selector.queryName === "ByRole") {
    return canvas.getByRole(
      // These should eventually reference `query` as the function identifier.
      roleOverride ?? selector.role,
      {
        description,
        name: label,
      },
    );
  } else if (selector.queryName === "ByLabelText") {
    return canvas.getByLabelText(
      // These should eventually reference `query` as the function identifier.
      label!, // Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
    );
  } else if (selector.queryName === "ByPlaceholderText") {
    return canvas.getByText(
      // These should eventually reference `query` as the function identifier.
      label!, // Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
    );
  } else if (selector.queryName === "ByText") {
    return canvas.getByText(
      // These should eventually reference `query` as the function identifier.
      description!, // Use TypeScript `Infer` to ensure `description` is required when it's `ByLabelText`.
    );
  }

  return null;
};

export const selectComponent =
  <Name extends keyof typeof testSelector>({
    description,
    featureName,
    label,
    // method,
    name,
    roleOverride,
  }: {
    description?: ByRoleOptions["description"];
    featureName?: keyof (typeof testSelector)[Name]["feature"];
    label?: ByRoleOptions["name"];
    // method: keyof BoundFunctions<typeof queries>,
    name: Name;
    /**
     * For when you pass a custom `role` to a component and need to override the Odyssey built-in role.
     */
    roleOverride?: string;
  }) =>
  (
    canvas: BoundFunctions<typeof queries>,
    // Screen<typeof queries>
  ) => {
    const rootTestSelector = testSelector[name];

    const secondaryTestSelector = featureName
      ? rootTestSelector?.feature[
          featureName as keyof typeof rootTestSelector.feature
        ] // TypeScript doesn't understand what to do with `[featureName]`, so I went head and typed it separately.
      : null;

    // // This works now, I just need to write some extra TS-safe code around it.
    // canvasElement
    // [`get${
    //   rootTestSelector
    //   .selector
    //   .query
    // }`](
    //   (
    //     roleOverride
    //     ?? (
    //       rootTestSelector
    //       .selector
    //       .role
    //     )
    //   ),
    //   {
    //     description,
    //     name: label,
    //   } // satisfies ByRoleOptions
    // )

    if (rootTestSelector.selector) {
      const rootElement = querySelector({
        canvas: canvas,
        description,
        label,
        selector: rootTestSelector.selector,
        roleOverride,
      });

      if (rootElement && secondaryTestSelector) {
        return querySelector({
          canvas: within(rootElement),
          description,
          label,
          selector: secondaryTestSelector.selector,
          roleOverride,
        });
      }

      return rootElement;
    }

    if (secondaryTestSelector) {
      return querySelector({
        canvas: canvas,
        description,
        label,
        selector: secondaryTestSelector.selector,
        roleOverride,
      });
    }

    return null;
  };

// const element = (
//   selectComponent({
//     featureName: "link",
//     label: "You've done something wrong",
//     name: "Callout",
//   })
// )

// element
