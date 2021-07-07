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
import RadioButtonGroup from ".";
import RadioButton from "../RadioButton";

const group = 'group';
const legend = 'Select speed';
const name = 'speed';

const tree = (
  <RadioButtonGroup
    legend={ legend }
    name={ name }
  >
    <RadioButton label="Lightspeed" value="light" />
    <RadioButton label="Warp speed" value="warp" />
    <RadioButton label="Ludicrous speed" value="ludicrous" />
  </RadioButtonGroup>
);

describe("RadioButtonGroup", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(tree);

    expect(getByRole(group, { name: legend })).toBeVisible();
  });

  it('renders through children that are not expected Radio components', () => {
    const { getByRole } = render(
      // @ts-expect-error 'RadioButtonGroup' components don't accept text as child elements.
      <RadioButtonGroup legend={ legend } name={ name }>
        oops
      </RadioButtonGroup>
    );

    expect(getByRole(group)).toContainHTML('oops');
  });

  a11yCheck(() => render(tree));
});
