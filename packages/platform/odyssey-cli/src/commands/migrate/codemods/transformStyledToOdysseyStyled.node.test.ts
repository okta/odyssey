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

import jscodeshift from "jscodeshift";
import { describe, expect, test } from "vitest";

import transformer from "./transformStyledToOdysseyStyled.js";

const buildApi = () => {
  const jscodeshiftWithParser = jscodeshift.withParser("tsx");
  return {
    j: jscodeshiftWithParser,
    jscodeshift: jscodeshiftWithParser,
    stats: (() => {}) as jscodeshift.Stats,
    report: () => {},
  };
};

const transform = (source: string) =>
  transformer({ source, path: "test.tsx" }, buildApi());

describe(transformer.name, () => {
  test("emotion default import — styled.tag(styles)", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled.div({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
`.trim(),
    );
  });

  test("emotion default import — styled('tag')(styles)", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled("div")({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
`.trim(),
    );
  });

  test("emotion default import — styled('tag', opts)(styles)", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled("div", { shouldForwardProp: (prop) => prop !== "isActive" })({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div",
  shouldForwardProp: (prop) => prop !== "isActive"
})({ color: "red" });
`.trim(),
    );
  });

  test("MUI named import — styled('tag')(styles)", () => {
    const input = `
import { styled } from "@mui/material/styles";
const Box = styled("div")({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
`.trim(),
    );
  });

  test("MUI partial import — only styled specifier removed", () => {
    const input = `
import { styled, createTheme } from "@mui/material/styles";
const Box = styled("div")({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createTheme } from "@mui/material/styles";
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
`.trim(),
    );
  });

  test("TypeScript generic — odysseyDesignTokens stripped from type param", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled("div")<{ odysseyDesignTokens: DesignTokens; isActive: boolean }>({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})<{
  isActive: boolean;
}>({ color: "red" });
`.trim(),
    );
  });

  test("TypeScript generic — whole generic dropped when odysseyDesignTokens was only member", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled("div")<{ odysseyDesignTokens: DesignTokens }>({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
`.trim(),
    );
  });

  test("JSX odysseyDesignTokens prop removed", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled("div")({ color: "red" });
const element = <Box odysseyDesignTokens={tokens} isActive={true} />;
`.trim();

    expect(transform(input)).toBe(
      `
import { createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
const element = <Box isActive={true} />;
`.trim(),
    );
  });

  test("tagged template literal — file returned unchanged with stderr warning", () => {
    const input = `
import styled from "@emotion/styled";
const Box = styled.div\`color: red;\`;
`.trim();

    expect(transform(input)).toBe(input);
  });

  test("no styled import — file returned unchanged", () => {
    const input = `
import { something } from "other-package";
const value = 42;
`.trim();

    expect(transform(input)).toBe(input);
  });

  test("existing odyssey-react-mui import — createOdysseyStyledComponent added to it", () => {
    const input = `
import styled from "@emotion/styled";
import { Button } from "@okta/odyssey-react-mui";
const Box = styled.div({ color: "red" });
`.trim();

    expect(transform(input)).toBe(
      `
import { Button, createOdysseyStyledComponent } from "@okta/odyssey-react-mui";
const Box = createOdysseyStyledComponent({
  tag: "div"
})({ color: "red" });
`.trim(),
    );
  });
});
