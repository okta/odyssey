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

async function run(
  input,
  output,
  opts = { modules: { getJSON: Function.prototype } }
) {
  const result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("minimizes non meaningful whitespace", async () => {
  await run("a {\n    margin: 1px;\n}", "a{margin:1px}");
});

describe("calc", () => {
  it("transforms css custom properties to theme expressions", async () => {
    await run(
      "a { margin: calc(1px + var(--space)); }",
      "a{margin:calc(1px + ${theme.space})}"
    );
  });

  it("reduces expressions when possible", async () => {
    await run("a { margin: calc(1px + 1px); }", "a{margin:2px}");
  });
});
