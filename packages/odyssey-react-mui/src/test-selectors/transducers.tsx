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

import { map } from "rxjs";

import {
  type AriaRole,
  type FeatureTestSelector,
  type TestSelector,
} from "./featureTestSelector";
import { getComputedAccessibleText } from "./getComputedAccessibleText";
import { getByQuerySelector } from "./getByQuerySelector";
import { interpolateString } from "./interpolateString";
import { getControlledElement } from "./linkedHtmlSelectors";

const selectChild = () => {
  map(<TestSelectors extends FeatureTestSelector>({
    element: parentElement,
    options: querySelectorOptions,
    testSelectors,
  }: {
    /**
     * Refers to Testing Library's canvas. This is usually `screen`, but Storybook uses `within(canvas)`.
     */
    element: HTMLElement;
    /**
     * Required values help narrow down selection.
     */
    options?: (TestSelectors extends TestSelector
      ? Record<
          TestSelectors["selector"]["templateVariableNames"][number],
          string | RegExp
        > &
          (TestSelectors extends TestSelector & {
            method: "ByRole";
            role: infer Role;
          }
            ? Role extends AriaRole[]
              ? {
                  role: Role[number];
                }
              : object
            : object)
      : object) &
      (TestSelectors extends {
        selector: {
          method: "ByRole";
          role: AriaRole[];
        };
      }
        ? {
            role: TestSelectors["selector"]["role"][number];
          }
        : object) & {
        queryMethod?: Parameters<typeof getByQuerySelector>[0]["queryMethod"];
      };
    /**
     * Selectors object.
     */
    testSelectors: TestSelectors;
  }) => (
    //
  )),
}
