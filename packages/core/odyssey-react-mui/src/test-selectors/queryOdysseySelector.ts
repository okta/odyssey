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

import { AutocompleteTestSelector } from "./AutocompleteTestSelector.js";
import { CalloutTestSelector } from "./CalloutTestSelector.js";
import { querySelector } from "./querySelector.js";
import { SelectTestSelector } from "./SelectTestSelector.js";
import { TabsTestSelector } from "./TabsTestSelector.js";
import { type TestSelector } from "./testSelector.js";
import { TextFieldTestSelector } from "./TextFieldTestSelector.js";

export const odysseyTestSelector = {
  Autocomplete: AutocompleteTestSelector,
  Callout: CalloutTestSelector,
  Select: SelectTestSelector,
  Tabs: TabsTestSelector,
  TextField: TextFieldTestSelector,
} as const satisfies Record<string, TestSelector>;

export const queryOdysseySelector = <
  ComponentName extends keyof typeof odysseyTestSelector,
>(
  /**
   * Name of the component you want to select within.
   */
  componentName: ComponentName,
) => querySelector(odysseyTestSelector[componentName]);
