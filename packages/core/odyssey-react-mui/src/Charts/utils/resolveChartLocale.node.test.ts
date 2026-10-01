/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { resolveChartLocale } from "./resolveChartLocale.js";

describe(resolveChartLocale.name, () => {
  test("underscore region subtag becomes a hyphen", () => {
    expect(resolveChartLocale("pt_BR")).toBe("pt-BR");
  });

  test("language code with no region subtag", () => {
    expect(resolveChartLocale("ja")).toBe("ja");
  });

  test("the Applitools environment's language code", () => {
    expect(resolveChartLocale("en-us@posix")).toBe("en-US");
  });

  test("empty language code", () => {
    expect(resolveChartLocale("")).toBe("en-US");
  });

  test("language code that is only whitespace", () => {
    expect(resolveChartLocale("  ")).toBe("en-US");
  });

  test("structurally invalid language code", () => {
    expect(resolveChartLocale("not a locale")).toBe("en-US");
  });

  test("already canonical BCP 47 tag", () => {
    expect(resolveChartLocale("en-GB")).toBe("en-GB");
  });

  test("region subtag becomes upper case", () => {
    expect(resolveChartLocale("pt_br")).toBe("pt-BR");
  });
});
