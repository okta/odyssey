/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { OStyleSheet } from "./stylesheet";

describe("OStyleSheet", () => {
  afterEach(() => {
    document.querySelectorAll("style").forEach((sheet) => sheet.remove());
  });

  it("appends a style element during initialization", () => {
    expect(document.styleSheets).toHaveLength(0);
    const sheet = new OStyleSheet();
    expect(document.styleSheets).toHaveLength(1);
    // @ts-expect-error access private property for test assertion only
    expect(document.querySelector("style")).toBe(sheet.element);
  });

  it("maintains a set based cache", () => {
    const sheet = new OStyleSheet();
    expect(sheet.has("key")).toBe(false);
    sheet.add("key");
    expect(sheet.has("key")).toBe(true);
  });

  it("injects styles with cache miss and returns true", () => {
    const p = document.createElement("p");
    document.body.appendChild(p);
    const sheet = new OStyleSheet();

    const result = sheet.inject("key", "p { color: red }");
    expect(result).toBe(true);
    expect(p).toHaveStyle({ color: "red" });
  });

  it("does not inject styles with cache hit and returns false", () => {
    const p = document.createElement("p");
    document.body.appendChild(p);
    const sheet = new OStyleSheet();
    sheet.add("key");

    const result = sheet.inject("key", "p { color: red }");
    expect(result).toBe(false);
    expect(p).not.toHaveStyle({ color: "red" });
  });
});
