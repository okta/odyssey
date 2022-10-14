/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { RenderResult } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { axe } from "jest-axe";

export const a11yCheck = (renderFn: () => RenderResult): void => {
  describe("accessibility", () => {
    it("meets WCAG 2.1 AA criteria", async () => {
      const { container } = renderFn();
      const results = await axe(container, {
        runOnly: ["section508", "wcag21a", "wcag21aa"],
      });

      expect(results).toHaveNoViolations();
    });
  });
};
