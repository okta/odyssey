/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

export type HtmlProps = {
  /**
   * This prop puts a `data` attribute on an HTML element in this component with the value provided.
   *
   * @deprecated **WARNING:** You should be using Semantic Selectors instead of this property. This is a temporary measure for backwards compatibility with existing Selenium tests.
   */
  testId?: string;
  /**
   * This prop puts a `translate` attribute on an HTML element. It should be used to indicate whether text within the element should be translated.
   */
  translate?: "yes" | "no";
};
