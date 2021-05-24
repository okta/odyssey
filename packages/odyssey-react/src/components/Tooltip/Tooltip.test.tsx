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
import Tooltip from "./Tooltip";

const tooltipLabel = "Tooltip label"

describe("Tooltip", () => {
  it("should render the tooltip", () => {
    const { getByTestId } = render(
      <Tooltip label={tooltipLabel} position="top">
        <button>Top</button>
      </Tooltip>
    );

    expect(getByTestId('ods-tooltip')).toBeInTheDocument();
  });

  it("should render the tooltip label", () => {
    const { getByTestId } = render(
      <Tooltip label={tooltipLabel} position="top">
        <button>Top</button>
      </Tooltip>
    );
    const label = getByTestId('ods-tooltip').querySelector('[role="tooltip"]');
    expect(label).toHaveTextContent(tooltipLabel)
  });
});
