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

import { render, screen } from "@testing-library/react";
import { OdysseyTranslationProvider } from "./OdysseyTranslationProvider.js";
import { odysseyTranslate } from "./i18n.js";
import { TextField } from "./TextField.js";

describe("OdysseyTranslationProvider", () => {
  it("defaults to 'en' translation bundle", () => {
    render(
      <OdysseyTranslationProvider>
        <span>{odysseyTranslate("fieldlabel.optional.text")}</span>
      </OdysseyTranslationProvider>,
    );

    expect(screen.getByText("Optional"));
  });

  it("defaults to 'en' for unsupported langauges", () => {
    render(
      <OdysseyTranslationProvider languageCode="test">
        <span>{odysseyTranslate("fieldlabel.optional.text")}</span>
      </OdysseyTranslationProvider>,
    );

    expect(screen.getByText("Optional"));
  });

  it("allows translations for non-okta supported languages for existing keys", () => {
    const translationOverrides = {
      ar: {
        "fieldlabel.optional.text":
          "\u063A\u064A\u0631 \u0645\u0637\u0644\u0648\u0628",
      },
    };

    render(
      <OdysseyTranslationProvider<"ar">
        languageCode="ar"
        translationOverrides={translationOverrides}
      >
        <TextField label="" isOptional />
      </OdysseyTranslationProvider>,
    );

    expect(
      screen.getByText("\u063A\u064A\u0631 \u0645\u0637\u0644\u0648\u0628"),
    );
  });

  it("can modify a translation bundle with translantionOverrides", () => {
    const translationOverrides = {
      en: {
        "fieldlabel.optional.text": "Non Required",
      },
    };

    render(
      <OdysseyTranslationProvider translationOverrides={translationOverrides}>
        <TextField label="" isOptional />
      </OdysseyTranslationProvider>,
    );

    expect(screen.getByText("Non Required"));
  });

  it("can change the displayed language with languageCode", () => {
    const translationOverrides = {
      fr: {
        "fieldlabel.optional.text": "Optionnel",
      },
    };

    render(
      <OdysseyTranslationProvider
        languageCode="fr"
        translationOverrides={translationOverrides}
      >
        <TextField label="" isOptional />
      </OdysseyTranslationProvider>,
    );

    expect(screen.getByText("Optionnel"));
  });
});
