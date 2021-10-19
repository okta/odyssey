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
import { Status } from ".";

const status = "status";
const statusLabel = "Status Label";
const statusDescriptor = "Status Descriptor";

describe("Status", () => {
  it('renders the appropriate role of "status"', () => {
    render(
      <Status
        variant="success"
        label={statusLabel}
        descriptor={statusDescriptor}
      />
    );

    expect(screen.getByRole(status)).toBeVisible();
  });

  it('renders visible screen reader content with "labelHidden" true', () => {
    render(
      <Status
        variant="danger"
        label={statusLabel}
        descriptor={statusDescriptor}
        labelHidden={true}
      />
    );

    expect(screen.getByText(statusLabel)).toBeVisible();
  });

  a11yCheck(() => render(<Status label="foo" descriptor="bar" />));
});
