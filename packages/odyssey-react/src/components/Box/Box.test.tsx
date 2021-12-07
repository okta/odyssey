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
import { render, screen } from "@testing-library/react";
import { Box } from ".";

describe("Box", () => {
  it("renders visibly", () => {
    render(<Box>box</Box>);

    expect(screen.getByText("box")).toBeVisible();
  });

  it("renders as element", () => {
    render(<Box as="span">box</Box>);

    expect(screen.getByText("box").tagName.toLowerCase() === "span").toBe(true);
  });

  it("allows a custom class", () => {
    render(<Box className="testClass">box</Box>);

    expect(screen.getByText("box")).toHaveClass("testClass");
  });

  it("uses the display property to attach a class", () => {
    render(<Box display="inline">box</Box>);

    expect(screen.getByText("box")).toHaveClass("displayInline");
  });

  it("uses the position property to attach a class", () => {
    render(<Box position="absolute">box</Box>);

    expect(screen.getByText("box")).toHaveClass("positionAbsolute");
  });

  it("uses the flexDirection property to attach a class", () => {
    render(<Box flexDirection="column">box</Box>);

    expect(screen.getByText("box")).toHaveClass("flexDirectionColumn");
  });

  it("uses the flexWrap property to attach a class", () => {
    render(<Box flexWrap="nowrap">box</Box>);

    expect(screen.getByText("box")).toHaveClass("flexWrapNowrap");
  });

  it("uses the flex property to attach a class", () => {
    render(<Box flex="auto">box</Box>);

    expect(screen.getByText("box")).toHaveClass("flexAuto");
  });

  it("uses the flexGrow property to attach a class", () => {
    render(<Box flexGrow="1">box</Box>);

    expect(screen.getByText("box")).toHaveClass("flexGrow1");
  });

  it("uses the flexShrink property to attach a class", () => {
    render(<Box flexShrink="1">box</Box>);

    expect(screen.getByText("box")).toHaveClass("flexShrink1");
  });

  it("uses the alignItems property to attach a class", () => {
    render(<Box alignItems="flex-start">box</Box>);

    expect(screen.getByText("box")).toHaveClass("alignItemsFlexStart");
  });

  it("uses the justifyContent property to attach a class", () => {
    render(<Box justifyContent="flex-start">box</Box>);

    expect(screen.getByText("box")).toHaveClass("justifyContentFlexStart");
  });

  it("uses the width property to attach a class", () => {
    render(<Box width="1px">box</Box>);

    expect(screen.getByText("box")).toHaveClass("width1px");
  });

  it("uses the maxWidth property to attach a class", () => {
    render(<Box maxWidth="full">box</Box>);

    expect(screen.getByText("box")).toHaveClass("maxWidthFull");
  });

  it("uses the height property to attach a class", () => {
    render(<Box height="1em">box</Box>);

    expect(screen.getByText("box")).toHaveClass("height1em");
  });

  it("uses the maxHeight property to attach a class", () => {
    render(<Box maxHeight="screen">box</Box>);

    expect(screen.getByText("box")).toHaveClass("maxHeightScreen");
  });

  it("uses the margin property to attach a class", () => {
    render(<Box margin="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("marginS");
  });

  it("uses a margin property 2 element array to attach multiple classes", () => {
    render(<Box margin={["s", "m"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "marginTopS",
      "marginBottomS",
      "marginLeftM",
      "marginRightM"
    );
  });

  it("uses a margin property 3 element array to attach multiple classes", () => {
    render(<Box margin={["s", "m", "l"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "marginTopS",
      "marginRightM",
      "marginLeftM",
      "marginBottomL"
    );
  });

  it("uses a margin property 4 element array to attach multiple classes", () => {
    render(<Box margin={["s", "m", "l", "xl"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "marginTopS",
      "marginRightM",
      "marginBottomL",
      "marginLeftXl"
    );
  });

  it("uses the marginTop property to attach a class", () => {
    render(<Box marginTop="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("marginTopS");
  });

  it("uses the marginRight property to attach a class", () => {
    render(<Box marginRight="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("marginRightS");
  });

  it("uses the marginBottom property to attach a class", () => {
    render(<Box marginBottom="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("marginBottomS");
  });

  it("uses the marginLeft property to attach a class", () => {
    render(<Box marginLeft="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("marginLeftS");
  });

  it("uses the padding property to attach a class", () => {
    render(<Box padding="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("paddingS");
  });

  it("uses a padding property 2 element array to attach multiple classes", () => {
    render(<Box padding={["s", "m"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "paddingTopS",
      "paddingBottomS",
      "paddingLeftM",
      "paddingRightM"
    );
  });

  it("uses a padding property 3 element array to attach multiple classes", () => {
    render(<Box padding={["s", "m", "l"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "paddingTopS",
      "paddingRightM",
      "paddingLeftM",
      "paddingBottomL"
    );
  });

  it("uses a padding property 4 element array to attach multiple classes", () => {
    render(<Box padding={["s", "m", "l", "xl"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "paddingTopS",
      "paddingRightM",
      "paddingBottomL",
      "paddingLeftXl"
    );
  });

  it("uses the paddingTop property to attach a class", () => {
    render(<Box paddingTop="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("paddingTopS");
  });

  it("uses the paddingRight property to attach a class", () => {
    render(<Box paddingRight="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("paddingRightS");
  });

  it("uses the paddingBottom property to attach a class", () => {
    render(<Box paddingBottom="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("paddingBottomS");
  });

  it("uses the paddingLeft property to attach a class", () => {
    render(<Box paddingLeft="s">box</Box>);

    expect(screen.getByText("box")).toHaveClass("paddingLeftS");
  });

  it("uses the overflow property to attach a class", () => {
    render(<Box overflow="scroll">box</Box>);

    expect(screen.getByText("box")).toHaveClass("overflowScroll");
  });

  it("uses a overflow property 2 element array to attach multiple classes", () => {
    render(<Box overflow={["scroll", "hidden"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "overflowXScroll",
      "overflowYHidden"
    );
  });

  it("uses the overflowX property to attach a class", () => {
    render(<Box overflowX="scroll">box</Box>);

    expect(screen.getByText("box")).toHaveClass("overflowXScroll");
  });

  it("uses the overflowY property to attach a class", () => {
    render(<Box overflowY="scroll">box</Box>);

    expect(screen.getByText("box")).toHaveClass("overflowYScroll");
  });

  it("uses the borderColor property to attach a class", () => {
    render(<Box borderColor="display">box</Box>);

    expect(screen.getByText("box")).toHaveClass("borderColorDisplay");
  });

  it("uses the hoverBorderColor property to attach a class", () => {
    render(<Box hoverBorderColor="primary">box</Box>);

    expect(screen.getByText("box")).toHaveClass("hoverBorderColorPrimary");
  });

  it("uses the borderRadius property to attach a class", () => {
    render(<Box borderRadius="base">box</Box>);

    expect(screen.getByText("box")).toHaveClass("borderRadiusBase");
  });

  it("uses a borderRadius property 2 element array to attach multiple classes", () => {
    render(<Box borderRadius={["base", "outer"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "borderTopLeftRadiusBase",
      "borderBottomRightRadiusBase",
      "borderTopRightRadiusOuter",
      "borderBottomLeftRadiusOuter"
    );
  });

  it("uses a borderRadius property 3 element array to attach multiple classes", () => {
    render(<Box borderRadius={["base", "outer", "base"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "borderTopLeftRadiusBase",
      "borderTopRightRadiusOuter",
      "borderBottomLeftRadiusOuter",
      "borderBottomRightRadiusBase"
    );
  });

  it("uses a borderRadius property 4 element array to attach multiple classes", () => {
    render(<Box borderRadius={["base", "outer", "base", "outer"]}>box</Box>);

    expect(screen.getByText("box")).toHaveClass(
      "borderTopLeftRadiusBase",
      "borderTopRightRadiusOuter",
      "borderBottomRightRadiusBase",
      "borderBottomLeftRadiusOuter"
    );
  });

  it("uses the borderTopLeftRadius property to attach a class", () => {
    render(<Box borderTopLeftRadius="base">box</Box>);

    expect(screen.getByText("box")).toHaveClass("borderTopLeftRadiusBase");
  });

  it("uses the borderTopRightRadius property to attach a class", () => {
    render(<Box borderTopRightRadius="base">box</Box>);

    expect(screen.getByText("box")).toHaveClass("borderTopRightRadiusBase");
  });

  it("uses the borderBottomLeftRadius property to attach a class", () => {
    render(<Box borderBottomLeftRadius="base">box</Box>);

    expect(screen.getByText("box")).toHaveClass("borderBottomLeftRadiusBase");
  });

  it("uses the borderBottomRightRadius property to attach a class", () => {
    render(<Box borderBottomRightRadius="base">box</Box>);

    expect(screen.getByText("box")).toHaveClass("borderBottomRightRadiusBase");
  });

  it("uses the backgroundColor property to attach a class", () => {
    render(<Box backgroundColor="default">box</Box>);

    expect(screen.getByText("box")).toHaveClass("backgroundColorDefault");
  });

  it("uses the boxShadow property to attach a class", () => {
    render(<Box boxShadow="default">box</Box>);

    expect(screen.getByText("box")).toHaveClass("boxShadowDefault");
  });

  it("uses the hoverBoxShadow property to attach a class", () => {
    render(<Box hoverBoxShadow="default">box</Box>);

    expect(screen.getByText("box")).toHaveClass("hoverBoxShadowDefault");
  });

  it("uses the focusRing property to attach a class", () => {
    render(<Box focusRing="primary">box</Box>);

    expect(screen.getByText("box")).toHaveClass("focusRingPrimary");
  });

  it("uses the cursor property to attach a class", () => {
    render(<Box cursor="pointer">box</Box>);

    expect(screen.getByText("box")).toHaveClass("cursorPointer");
  });

  it("uses the pointerEvents property to attach a class", () => {
    render(<Box pointerEvents="none">box</Box>);

    expect(screen.getByText("box")).toHaveClass("pointerEventsNone");
  });

  it("uses the userSelect property to attach a class", () => {
    render(<Box userSelect="none">box</Box>);

    expect(screen.getByText("box")).toHaveClass("userSelectNone");
  });

  a11yCheck(() => render(<Box />));
});
