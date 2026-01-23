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

/**
 * Configuration for a single axe-core accessibility rule.
 */
export interface A11yRuleConfig {
  /** The axe-core rule ID (e.g., "color-contrast", "button-name") */
  id: string;
  /** Whether the rule is enabled */
  enabled: boolean;
}

/**
 * Accessibility configuration that can be passed to story parameters.
 *
 * @example
 * ```tsx
 * export const MyStory: Story = {
 *   parameters: {
 *     a11y: {
 *       config: {
 *         rules: [{ id: "color-contrast", enabled: false }],
 *       },
 *     },
 *   },
 * };
 * ```
 */
export interface A11yConfig {
  rules?: A11yRuleConfig[];
}

/**
 * Full a11y parameters object for story parameters.
 */
export interface A11yParameters {
  /** Set to true to disable all a11y checks for this story */
  disable?: boolean;
  /** Configuration for specific rule overrides */
  config?: A11yConfig;
}
