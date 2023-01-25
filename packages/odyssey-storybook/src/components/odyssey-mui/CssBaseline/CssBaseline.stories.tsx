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

import { Story } from "@storybook/react";
import { CssBaseline, ScopedCssBaseline } from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import CssBaselineMdx from "./CssBaseline.mdx";

export default {
  title: `MUI Components/CSS Baseline`,
  component: CssBaseline,
  parameters: {
    docs: {
      page: CssBaselineMdx,
    },
  },
  decorators: [MuiThemeDecorator],
};

const KbdTemplate: Story = () => {
  return (
    <ScopedCssBaseline>
      <p>
        Press and hold <kbd>Ctrl + X</kbd> to start the ignition process.
      </p>
    </ScopedCssBaseline>
  );
};

const ParagraphTemplate: Story = () => {
  return (
    <ScopedCssBaseline>
      <p>
        He fixed things--clocks, refrigerators, vidsenders and destinies. But he
        had no business in the future, where the calculators could not handle
        him. He was Earth's only hope--and its sure failure!
      </p>

      <p>
        Security Commissioner Reinhart rapidly climbed the front steps and
        entered the Council building. Council guards stepped quickly aside and
        he entered the familiar place of great whirring machines. His thin face
        rapt, eyes alight with emotion, Reinhart gazed intently up at the
        central SRB computer, studying its reading.
      </p>
    </ScopedCssBaseline>
  );
};

const OlTemplate: Story = () => {
  return (
    <ScopedCssBaseline>
      <p>To initiate launch:</p>
      <ol>
        <li>
          Begin ignition sequence
          <ol>
            <li>
              Access control panel
              <ol>
                <li>Ensure safety checks are green</li>
                <li>Toggle fuel valve to "Open"</li>
                <li>Set throttle to "Launch"</li>
              </ol>
            </li>
          </ol>
        </li>
        <li>Hold on to your butts</li>
      </ol>
    </ScopedCssBaseline>
  );
};

const SampTemplate: Story = () => {
  return (
    <ScopedCssBaseline>
      <p>Before we crashed, the console displayed:</p>

      <p>
        <samp>
          Press <kbd>F5</kbd> to jettison fuel
        </samp>
        .
      </p>
    </ScopedCssBaseline>
  );
};

const StrongTemplate: Story = () => {
  return (
    <ScopedCssBaseline>
      <p>
        Before proceeding, <strong>ensure the landing pad is clear</strong>.
      </p>
    </ScopedCssBaseline>
  );
};

const UlTemplate: Story = () => {
  return (
    <ScopedCssBaseline>
      <p>Don't forget to pack:</p>
      <ul>
        <li>
          Food for the trip
          <ul>
            <li>
              Freeze-dried sundries
              <ul>
                <li>Ice cream</li>
                <li>Apple slices</li>
                <li>More ice cream</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Space suit</li>
      </ul>
    </ScopedCssBaseline>
  );
};

export const kbd = KbdTemplate.bind({});
kbd.args = {};

export const p = ParagraphTemplate.bind({});
p.args = {};

export const ol = OlTemplate.bind({});
ol.args = {};

export const samp = SampTemplate.bind({});
samp.args = {};

export const strong = StrongTemplate.bind({});
strong.args = {};

export const ul = UlTemplate.bind({});
ul.args = {};
