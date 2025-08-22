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

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./index.js";
import { OdysseyCacheProvider } from "./OdysseyCacheProvider.js";

// This component needs to be tested, even if it doesn't make much sense, because it can't be loaded by Storybook; therefore, any issues will only be seen by consumers of Odyssey.
describe(OdysseyCacheProvider.displayName!, () => {
  test("renders without crashing the app", () => {
    expect(() =>
      render(
        <OdysseyCacheProvider>
          <div />
        </OdysseyCacheProvider>,
      ),
    ).not.toThrow();
  });

  test("themes a Button", () => {
    render(
      <OdysseyCacheProvider>
        <Button label="text" variant="primary" />
      </OdysseyCacheProvider>,
    );

    expect(screen.queryByRole("button")).toHaveTextContent("text");
  });
});
