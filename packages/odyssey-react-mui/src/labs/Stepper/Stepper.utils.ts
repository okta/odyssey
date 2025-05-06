/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

export const createShouldForwardProp =
  (excludedProps: string[]) => (prop: string) =>
    !excludedProps.includes(prop);

export const filterExcludedProps =
  (excludedProps: string[]) => (prop: string) =>
    !excludedProps.includes(prop);

export const shouldForwardStepIconContainerProps = createShouldForwardProp([
  "completed",
  "active",
  "variant",
  "odysseyDesignTokens",
  "nonLinear",
]);

export const shouldForwardStepperProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "allowBackStep",
  "nonLinear",
  "stepVariant",
]);

export const shouldForwardStepDescriptionProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "completed",
  "active",
  "orientation",
]);

export const shouldForwardStepNumberProps = createShouldForwardProp([
  "odysseyDesignTokens",
  "completed",
  "active",
  "nonLinear",
]);

export const shouldForwardStepperNavigationProps = createShouldForwardProp([
  "odysseyDesignTokens",
]);

export const shouldForwardNavigationSectionProps = createShouldForwardProp([
  "align",
]);
