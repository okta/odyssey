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
import { ByRoleOptions } from "@testing-library/dom";
import { AriaRole } from "react";

export type Selector = {
  options?: ByRoleOptions;
  templateVariableNames: string[];
} & (
  | {
      // element: keyof HTMLElementTagNameMap
      method: "ByRole";
      role: AriaRole;
    }
  | {
      // element: keyof HTMLElementTagNameMap
      method: "ByLabelText" | "ByPlaceholderText" | "ByText";
      text: string;
    }
);

export type TestSelector = {
  selector: Selector;
};

export type FeatureSelector = {
  feature: Record<string, FeatureTestSelector>;
};

export type FeatureTestSelector =
  | TestSelector
  | FeatureSelector
  | (FeatureSelector & TestSelector);
