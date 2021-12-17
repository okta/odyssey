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

const postcss = require("postcss");
const { default: plugin } = require("../dist");

async function run(input, output) {
  const result = await postcss([plugin]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("transforms css custom properties", async () => {
  await run(
    "a { color: var(--linkColor); }",
    "a { color: ${theme.linkColor || 'inherit'}; }"
  );
});

it("transforms css custom properties within shorthand syntax", async () => {
  await run(
    "a { margin: var(--linkMarginTop) 2rem var(--linkMarginBottom) 1rem; }",
    "a { margin: ${theme.linkMarginTop || 'inherit'} 2rem ${theme.linkMarginBottom || 'inherit'} 1rem; }"
  );
});
