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

import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import {
  translate as odysseyTranslate,
  TranslationProvider as OdysseyTranslationProvider,
} from "./i18n.generated/i18n.js";
import { TextField } from "./TextField.js";

describe(OdysseyTranslationProvider.name, () => {
  test("defaults to 'en' translation bundle", async () => {
    await render(
      <OdysseyTranslationProvider>
        <span>{odysseyTranslate("fieldlabel.optional.text")}</span>
      </OdysseyTranslationProvider>,
    );

    await expect.element(page.getByText("Optional")).toBeVisible();
  });

  test("defaults to 'en' for unsupported languages", async () => {
    await render(
      <OdysseyTranslationProvider languageCode="test">
        <span>{odysseyTranslate("fieldlabel.optional.text")}</span>
      </OdysseyTranslationProvider>,
    );

    await expect.element(page.getByText("Optional")).toBeVisible();
  });

  test("allows translations for non-okta supported languages for existing keys", async () => {
    const translationOverrides = {
      ar: {
        "fieldlabel.optional.text":
          "\u063A\u064A\u0631 \u0645\u0637\u0644\u0648\u0628",
      },
    };

    await render(
      <OdysseyTranslationProvider<"ar">
        languageCode="ar"
        translationOverrides={translationOverrides}
      >
        <TextField isOptional label="" />
      </OdysseyTranslationProvider>,
    );

    await expect
      .element(
        page.getByText("\u063A\u064A\u0631 \u0645\u0637\u0644\u0648\u0628"),
      )
      .toBeVisible();
  });

  test("can modify a translation bundle with translationOverrides", async () => {
    const translationOverrides = {
      en: {
        "fieldlabel.optional.text": "Non Required",
      },
    };

    await render(
      <OdysseyTranslationProvider translationOverrides={translationOverrides}>
        <TextField isOptional label="" />
      </OdysseyTranslationProvider>,
    );

    await expect.element(page.getByText("Non Required")).toBeVisible();
  });

  test("can change the displayed language with languageCode", async () => {
    const translationOverrides = {
      fr: {
        "fieldlabel.optional.text": "Optionnel",
      },
    };

    await render(
      <OdysseyTranslationProvider
        languageCode="fr"
        translationOverrides={translationOverrides}
      >
        <TextField isOptional label="" />
      </OdysseyTranslationProvider>,
    );

    await expect.element(page.getByText("Optionnel")).toBeVisible();
  });
});
