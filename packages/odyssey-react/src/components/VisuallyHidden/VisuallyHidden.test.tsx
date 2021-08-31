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

import { render } from "@testing-library/react";
import VisuallyHidden from ".";

const content = "This string is visually hidden, but screen-reader accessible.";

describe("VisuallyHidden", () => {
  it("renders invisibly into the document", () => {
    const { getByText } = render(
      <VisuallyHidden>{content}</VisuallyHidden>
    );

    expect(getByText(content)).toBeVisible();
    expect(getByText(content)).toHaveStyle(`clip: rect(0 0 0 0)`);
  });

  a11yCheck(() => render(<VisuallyHidden>{content}</VisuallyHidden>))
});
