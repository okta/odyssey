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

import React from "react";
import * as Tokens from "@okta/odyssey-design-tokens";
import { render } from "@testing-library/react";
import { useTheme } from ".";
import type { Theme } from "./context";

describe("useTheme", () => {
  let theme: Theme | undefined;
  const Capture = () => {
    theme = useTheme();
    return null;
  };

  afterEach(() => {
    theme = undefined;
  });

  it("provides default theme via context", () => {
    render(<Capture />);
    expect(theme).toEqual(Tokens);
  });
});
