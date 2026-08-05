/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  OrpheusComponentsProvider,
  TranslationProvider,
} from "@okta/odyssey-contributions-orpheus-components";
import { Decorator } from "@storybook/react-vite";

export const OrpheusComponentsStorybookThemeDecorator: Decorator = (
  Story,
  context,
) => (
  <OrpheusComponentsProvider languageCode={context.globals.locale as string}>
    {/* This package's strings live on their own i18next instance, so
        `OrpheusComponentsProvider` alone does not switch them. Nesting the
        package's own provider is what makes the locale toolbar reach them. */}
    <TranslationProvider languageCode={context.globals.locale as string}>
      <Story />
    </TranslationProvider>
  </OrpheusComponentsProvider>
);
