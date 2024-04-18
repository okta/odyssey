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

// import {
//   queries,
//   within,
//   type BoundFunctions,
//   type ByRoleOptions,
//   type GetByText,
// } from "@testing-library/dom";
// import { testSelector, type FeatureTestSelector } from "./testSelector";

// const querySelector = ({
//   canvas,
//   description,
//   label,
//   selector,
//   roleOverride,
//   text,
// }: {
//   canvas: BoundFunctions<typeof queries>;
//   description?: ByRoleOptions["description"];
//   label?: ByRoleOptions["name"];
//   selector: NonNullable<FeatureTestSelector["selector"]>;
//   roleOverride?: string;
//   text?: Parameters<GetByText>[1];
// }) => {
//   if (selector.method === "ByRole") {
//     return canvas.getByRole(
//       // These should eventually reference `query` as the function identifier.
//       roleOverride ?? selector.role,
//       {
//         description,
//         name: label,
//       },
//     );
//   } else if (selector.method === "ByLabelText") {
//     return canvas.getByLabelText(
//       // These should eventually reference `query` as the function identifier.
//       text, // Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
//     );
//   } else if (selector.method === "ByPlaceholderText") {
//     return canvas.getByPlaceholderText(
//       // These should eventually reference `query` as the function identifier.
//       text, // Use TypeScript `Infer` to ensure `label` is required when it's `ByLabelText`.
//     );
//   } else if (selector.method === "ByText") {
//     return canvas.getByText(
//       // These should eventually reference `query` as the function identifier.
//       text, // Use TypeScript `Infer` to ensure `description` is required when it's `ByLabelText`.
//     );
//   }

//   return null;
// };

// export const selectComponent =
//   <ComponentName extends keyof typeof testSelector>({
//     description,
//     featureName,
//     label,
//     roleOverride,
//     text,
//   }: {
//     /**
//      * ARIA accessible description for the element. Not everything has a description.
//      */
//     description?: ByRoleOptions["description"];
//     featureName?: keyof (typeof testSelector)[ComponentName]["feature"];
//     /**
//      * ARIA accessible label for the element.
//      */
//     label?: ByRoleOptions["name"];
//     /**
//      * Name of the component you want to select within.
//      */
//     componentName: ComponentName;
//     /**
//      * For when you pass a custom `role` to a component and need to override the Odyssey built-in role.
//      */
//     roleOverride?: string;
//     /**
//      * Useful when passing text to `getByText`, `getByLabelText`, and similar.
//      */
//     text: Parameters<GetByText>[1];
//   }) =>
//   (
//     canvas: BoundFunctions<typeof queries>,
//     // Screen<typeof queries>
//   ) => {
//     const rootTestSelector = testSelector[componentName];

//     const secondaryTestSelector = featureName
//       ? rootTestSelector?.feature[
//           featureName as keyof typeof rootTestSelector.feature
//         ] // TypeScript doesn't understand what to do with `[featureName]`, so I went head and typed it separately.
//       : null;

//     // // This works now, I just need to write some extra TS-safe code around it.
//     // canvasElement
//     // [`get${
//     //   rootTestSelector
//     //   .selector
//     //   .query
//     // }`](
//     //   (
//     //     roleOverride
//     //     ?? (
//     //       rootTestSelector
//     //       .selector
//     //       .role
//     //     )
//     //   ),
//     //   {
//     //     description,
//     //     name: label,
//     //   } // satisfies ByRoleOptions
//     // )

//     if (rootTestSelector.selector) {
//       const rootElement = querySelector({
//         canvas,
//         description,
//         label,
//         selector: rootTestSelector.selector,
//         roleOverride,
//         text,
//       });

//       if (rootElement && secondaryTestSelector) {
//         return querySelector({
//           canvas: within(rootElement),
//           description,
//           label,
//           selector: secondaryTestSelector.selector,
//           roleOverride,
//           text,
//         });
//       }

//       return rootElement;
//     }

//     if (secondaryTestSelector) {
//       return querySelector({
//         canvas,
//         description,
//         label,
//         selector: secondaryTestSelector.selector,
//         roleOverride,
//         text,
//       });
//     }

//     return null;
//   };

// // const element = (
// //   selectComponent({
// //     featureName: "link",
// //     label: "You've done something wrong",
// //     name: "Callout",
// //   })
// // )

// // element
