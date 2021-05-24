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
import { render } from "@testing-library/react";
import Status from "./Status";

const statusLabel = "Status Label";
const statusDescriptor = "Status Descriptor";

describe("Status", () => {
  it("should render the status component", () => {
    const { getByTestId } = render(
      <Status 
        variant="neutral" 
        label={statusLabel}
        descriptor={statusDescriptor}
      />
    );

    expect(getByTestId('ods-status')).toBeInTheDocument();
  });
    
  it('should visually hide the label, but keep it in the DOM for assistive purposes', () => {
    const { getByTestId } = render(
      <Status 
        variant="danger" 
        label={statusLabel}
        descriptor={statusDescriptor}
        labelHidden={true}
      />
    );
    const statusElement = getByTestId('ods-status');
    const labelElement = statusElement.querySelector('.ods-status--label')

    expect(statusElement).toHaveClass("is-ods-status-label-hidden");
    expect(labelElement).toHaveTextContent(statusLabel)
    expect(labelElement).toBeVisible();
  });

  it('should apply an aria role of `status` when the `prop.role` is set', () => {
    const { getByTestId } = render(
      <Status 
        label={statusLabel}
        descriptor={statusDescriptor}
        role="status"
      />
    );
    const statusElement = getByTestId('ods-status');

    expect(statusElement).toHaveAttribute('role', 'status');
  });
});
