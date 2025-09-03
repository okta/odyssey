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

import { addSpecificity } from "./addSpecificity.js";

describe("addSpecificity", () => {
  it("should add specificity with direct selector", () => {
    expect(addSpecificity(2, ".MuiButton-root")).toBe("&&.MuiButton-root");
  });

  it("should add specificity with descendant selector", () => {
    expect(addSpecificity(2, " .MuiButton-root")).toBe("&& .MuiButton-root");
  });

  it("should work with class references", () => {
    const buttonClasses = { root: "MuiButton-root" };
    expect(addSpecificity(2, `.${buttonClasses.root}`)).toBe(
      "&&.MuiButton-root",
    );
  });

  it("should work with descendant selector and class references", () => {
    const buttonClasses = { root: "MuiButton-root" };
    expect(addSpecificity(2, ` .${buttonClasses.root}`)).toBe(
      "&& .MuiButton-root",
    );
  });

  it("should combine multiple selectors", () => {
    // Updated test to pass a single concatenated string instead of multiple params
    expect(addSpecificity(2, ".MuiButton-root:hover")).toBe(
      "&&.MuiButton-root:hover",
    );
  });

  it("should handle different specificity levels", () => {
    expect(addSpecificity(1, ".MuiButton-root")).toBe("&.MuiButton-root");
    expect(addSpecificity(3, ".MuiButton-root")).toBe("&&&.MuiButton-root");
  });

  it("should handle more complex selector combinations", () => {
    // Updated test to pass a single concatenated string
    expect(addSpecificity(2, ".MuiButton-root:not(.MuiButton-disabled)")).toBe(
      "&&.MuiButton-root:not(.MuiButton-disabled)",
    );
  });
});
