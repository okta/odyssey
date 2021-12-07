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

import React, { ReactElement } from "react";
import { Story } from "@storybook/react";
import { Source } from "./Box.docgen";
import { Box, BoxProps, Heading, Text } from "@okta/odyssey-react";

import BoxMdx from "./Box.mdx";

export default {
  title: `Components/Box`,
  component: Source,
  parameters: {
    docs: {
      page: BoxMdx,
    },
  },
};

const Template: Story<BoxProps> = (args: Omit<BoxProps, "as">) => {
  return (
    <Box {...args} tabIndex={0}>
      Box
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  borderColor: "display",
  hoverBorderColor: "ui",
  borderRadius: "base",
  boxShadow: "default",
  hoverBoxShadow: "default",
  padding: "m",
  focusRing: "primary",
  focusBorderColor: "primary",
};

export const Background = (): ReactElement => (
  <>
    <Box
      backgroundColor="default"
      padding="s"
      marginBottom="s"
      borderColor="display"
    >
      Default
    </Box>
    <Box backgroundColor="disabled" padding="s" marginBottom="s">
      Disabled
    </Box>
    <Box display="flex" marginBottom="s">
      <Box
        backgroundColor="primary-light"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Primary Light
      </Box>
      <Box
        backgroundColor="primary-base"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Primary Base
      </Box>
      <Box backgroundColor="primary-dark" padding="s" flex="evenly">
        <Text as="span" color="bodyInverse">
          Primary Dark
        </Text>
      </Box>
    </Box>
    <Box display="flex" marginBottom="s">
      <Box
        backgroundColor="success-light"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Success Light
      </Box>
      <Box
        backgroundColor="success-base"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Success Base
      </Box>
      <Box backgroundColor="success-dark" padding="s" flex="evenly">
        <Text as="span" color="bodyInverse">
          Success Dark
        </Text>
      </Box>
    </Box>
    <Box display="flex" marginBottom="s">
      <Box
        backgroundColor="caution-light"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Caution Light
      </Box>
      <Box
        backgroundColor="caution-base"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Caution Base
      </Box>
      <Box backgroundColor="caution-dark" padding="s" flex="evenly">
        Caution Dark
      </Box>
    </Box>
    <Box display="flex" marginBottom="s">
      <Box
        backgroundColor="danger-light"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Danger Light
      </Box>
      <Box
        backgroundColor="danger-base"
        padding="s"
        marginRight="s"
        flex="evenly"
      >
        Danger Base
      </Box>
      <Box backgroundColor="danger-dark" padding="s" flex="evenly">
        <Text as="span" color="bodyInverse">
          Danger Dark
        </Text>
      </Box>
    </Box>
    <Box boxShadow="default" padding="s" borderColor="display">
      Default boxShadow
    </Box>
  </>
);

Background.argTypes = pickControls(["backgroundColor", "boxShadow"]);

export const Border = (): ReactElement => (
  <>
    <Box padding="s" marginBottom="s" borderColor="display">
      Display
    </Box>
    <Box padding="s" marginBottom="s" borderColor="ui">
      UI
    </Box>
    <Box padding="s" marginBottom="s" borderColor="danger">
      Danger
    </Box>
    <Box padding="xs" backgroundColor="primary-base" borderRadius="outer">
      <Box padding="s" backgroundColor="default" borderRadius="base">
        Border Radius
      </Box>
    </Box>
  </>
);

Border.argTypes = pickControls([
  "borderColor",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
]);

export const MarginPadding = (): ReactElement => (
  <>
    Margin
    <Box display="flex" alignItems="flex-end">
      <Box backgroundColor="danger-light" marginRight="s">
        <Box borderColor="ui" backgroundColor="default" margin="xs">
          &nbsp;xs&nbsp;
        </Box>
      </Box>
      <Box backgroundColor="danger-light" marginRight="s">
        <Box borderColor="ui" backgroundColor="default" margin="s">
          &nbsp;s&nbsp;
        </Box>
      </Box>
      <Box backgroundColor="danger-light" marginRight="s">
        <Box borderColor="ui" backgroundColor="default" margin="m">
          &nbsp;m&nbsp;
        </Box>
      </Box>
      <Box backgroundColor="danger-light" marginRight="s">
        <Box borderColor="ui" backgroundColor="default" margin="l">
          &nbsp;l&nbsp;
        </Box>
      </Box>
      <Box backgroundColor="danger-light" marginRight="s">
        <Box borderColor="ui" backgroundColor="default" margin="xl">
          &nbsp;xl&nbsp;
        </Box>
      </Box>
    </Box>
    Padding
    <Box display="flex" alignItems="flex-end">
      <Box
        padding="xs"
        backgroundColor="success-light"
        borderColor="ui"
        marginRight="s"
      >
        <Box backgroundColor="default">&nbsp;xs&nbsp;</Box>
      </Box>
      <Box
        padding="s"
        backgroundColor="success-light"
        borderColor="ui"
        marginRight="s"
      >
        <Box backgroundColor="default">&nbsp;s&nbsp;</Box>
      </Box>
      <Box
        padding="m"
        backgroundColor="success-light"
        borderColor="ui"
        marginRight="s"
      >
        <Box backgroundColor="default">&nbsp;m&nbsp;</Box>
      </Box>
      <Box
        padding="l"
        backgroundColor="success-light"
        borderColor="ui"
        marginRight="s"
      >
        <Box backgroundColor="default">&nbsp;l&nbsp;</Box>
      </Box>
      <Box
        padding="xl"
        backgroundColor="success-light"
        borderColor="ui"
        marginRight="s"
      >
        <Box backgroundColor="default">&nbsp;xl&nbsp;</Box>
      </Box>
    </Box>
  </>
);

MarginPadding.argTypes = pickControls([
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
]);

export const HoverFocus = (): ReactElement => (
  <>
    <Box
      padding="s"
      borderColor="ui"
      hoverBorderColor="primary"
      marginBottom="s"
    >
      Hover border color primary
    </Box>
    <Box
      padding="s"
      borderColor="display"
      hoverBorderColor="ui"
      marginBottom="s"
    >
      Hover border color ui
    </Box>
    <Box
      padding="s"
      borderColor="ui"
      boxShadow="default"
      hoverBoxShadow="default"
      marginBottom="s"
    >
      Hover box shadow
    </Box>
    <Box
      padding="s"
      borderColor="ui"
      focusRing="primary"
      focusBorderColor="primary"
      tabIndex={0}
      marginBottom="s"
    >
      Primary Focus
    </Box>
    <Box
      padding="s"
      borderColor="ui"
      focusRing="danger"
      focusBorderColor="danger"
      tabIndex={0}
      marginBottom="s"
    >
      Danger Focus
    </Box>
  </>
);

HoverFocus.argTypes = pickControls(["focusBorderColor", "focusRing"]);

export const Flexbox = (args: BoxProps): ReactElement => (
  <Box
    padding="s"
    borderColor="display"
    display="flex"
    flexDirection={args.flexDirection}
    alignItems={args.alignItems}
    justifyContent={args.justifyContent}
  >
    <Box padding="s" borderColor="display" flex={args.flex}>
      Flex
    </Box>
    <Box padding="s" borderColor="display" flexShrink={args.flexShrink}>
      Flex Shrink
    </Box>
    <Box padding="s" borderColor="display" flexGrow={args.flexGrow}>
      Flex Grow
    </Box>
  </Box>
);

Flexbox.argTypes = pickControls([
  "flex",
  "flexDirection",
  "flexWrap",
  "flexShrink",
  "flexGrow",
  "alignItems",
  "justifyContent",
]);

export const Grid = (args: BoxProps): ReactElement => (
  <Box
    padding="m"
    borderColor="display"
    backgroundColor="default"
    display="grid"
    gridTemplateColumns={args.gridTemplateColumns}
  >
    <Box gridRow="1" gridColumn="1" borderColor="display" padding="s">
      1/1
    </Box>
    <Box gridRow="1" gridColumn="2" borderColor="display" padding="s">
      1/2
    </Box>
    <Box gridRow="2" gridColumn="1" borderColor="display" padding="s">
      2/1
    </Box>
    <Box gridRow="2" gridColumn="2" borderColor="display" padding="s">
      2/2
    </Box>
    {(args.gridTemplateColumns === "3" ||
      args.gridTemplateColumns === "3-auto-1-auto-3") && (
      <>
        <Box gridRow="1" gridColumn="3" borderColor="display" padding="s">
          1/3
        </Box>
        <Box gridRow="2" gridColumn="3" borderColor="display" padding="s">
          2/3
        </Box>
      </>
    )}
  </Box>
);

Grid.argTypes = {
  ...pickControls(["gridTemplateColumns", "gridColumn", "gridRow"]),
  gridColumn: { control: { disable: true } },
  gridRow: { control: { disable: true } },
};
Grid.args = { gridTemplateColumns: "2" };

export const WidthHeight = (args: BoxProps): ReactElement => (
  <Box
    padding="m"
    borderColor="display"
    backgroundColor="default"
    width={args.width}
    height={args.height}
  >
    Width and Height
  </Box>
);

WidthHeight.argTypes = pickControls([
  "width",
  "height",
  "maxWidth",
  "maxHeight",
]);

export const Overflow = (args: BoxProps): ReactElement => (
  <Box
    padding="xs"
    borderColor="display"
    backgroundColor="default"
    width="max-line-length"
    maxHeight="screen-minus-padding"
    overflow={args.overflow}
    overflowX={args.overflowX}
    overflowY={args.overflowY}
  >
    <Heading visualLevel="3">Overflow</Heading>
    <Text>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
      nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
      Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
      enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
      felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
      elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
      ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
      ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
      ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
      nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
      rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
      libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit
      vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
      tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam
      quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
      fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
      consequat, leo eget bibendum sodales, augue velit cursus nunc,
    </Text>
  </Box>
);

Overflow.argTypes = pickControls(["overflow", "overflowX", "overflowY"]);
Overflow.args = { overflowY: "scroll" };

export const Display = (args: BoxProps): ReactElement => (
  <Box
    padding="m"
    borderColor="display"
    backgroundColor="default"
    boxShadow="default"
    display={args.display}
  >
    {args && args.display && capitalize(args.display)}
  </Box>
);

Display.argTypes = pickControls(["display"]);
Display.args = { display: "block" };

export const Position = (args: BoxProps): ReactElement => (
  <>
    <Box backgroundColor="disabled" padding="s" position="relative">
      <Box
        padding="m"
        borderColor="display"
        backgroundColor="default"
        boxShadow="default"
        position={args.position}
      >
        {args && args.position && capitalize(args.position)}
      </Box>
    </Box>
    <div style={{ height: "100vh" }} />
  </>
);

Position.argTypes = pickControls(["position"]);
Position.args = { position: "static" };

export const Cursor = (args: BoxProps): ReactElement => (
  <Box
    padding="m"
    borderColor="display"
    boxShadow="default"
    cursor={args.cursor}
  >
    {args && args.cursor && capitalize(args.cursor)}
  </Box>
);

Cursor.argTypes = pickControls(["cursor"]);
Cursor.args = { cursor: "pointer" };

export const Other = (args: BoxProps): ReactElement => (
  <>
    <Box
      padding="m"
      marginBottom="s"
      borderColor="display"
      backgroundColor="default"
      boxShadow="default"
      pointerEvents="none"
      hoverBoxShadow="default"
    >
      Pointer Events None
    </Box>
    <Box
      padding="m"
      borderColor="display"
      backgroundColor="default"
      boxShadow="default"
      userSelect={args.userSelect}
    >
      User Select
    </Box>
  </>
);

Other.argTypes = pickControls(["pointerEvents", "userSelect"]);
Other.args = { userSelect: "none" };

export const CustomClass = (): ReactElement => (
  <Box className="test-class">Custom class</Box>
);

function pickControls(properties: string[]) {
  const props = [
    "key",
    "ref",
    "as",
    "display",
    "position",
    "flexDirection",
    "flexWrap",
    "flex",
    "flexGrow",
    "flexShrink",
    "alignItems",
    "justifyContent",
    "gridTemplateColumns",
    "gridColumn",
    "gridRow",
    "width",
    "maxWidth",
    "height",
    "maxHeight",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "overflow",
    "overflowX",
    "overflowY",
    "borderColor",
    "hoverBorderColor",
    "focusBorderColor",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "backgroundColor",
    "boxShadow",
    "hoverBoxShadow",
    "focusRing",
    "cursor",
    "pointerEvents",
    "userSelect",
  ];
  const excluded = {};
  props.forEach((prop) => {
    if (!properties.includes(prop)) {
      Object.assign(excluded, { [prop]: { table: { disable: true } } });
    }
  });
  return excluded;
}

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
