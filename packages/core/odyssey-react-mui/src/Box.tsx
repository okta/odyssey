/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Box as MuiBox, BoxProps as MuiBoxProps } from "@mui/material";
import { AriaRole, forwardRef, memo, ReactNode } from "react";

import type { HtmlProps } from "./HtmlProps.js";

export type BoxProps = {
  /** Content rendered inside the box. */
  children?: ReactNode;
  /** The underlying HTML element or React component to render as the root node. */
  component?: MuiBoxProps["component"];
  /** The HTML `id` attribute applied to the root element. */
  id?: MuiBoxProps["id"];
  /** The ARIA role applied to the root element. */
  role?: AriaRole;
  /** MUI system styles applied directly to the root element via the `sx` prop. */
  sx?: MuiBoxProps["sx"];
} & Pick<HtmlProps, "testId" | "translate">;

/**
 * A generic layout primitive that renders as a `<div>` by default and supports MUI system styles
 * via the `sx` prop. Use it as a flexible building block for spacing, alignment, and structural
 * composition.
 */
const Box = forwardRef<HTMLElement, BoxProps>(
  ({ children, component, id, role, sx, testId, translate }, ref) => (
    <MuiBox
      children={children}
      component={component}
      data-se={testId}
      id={id}
      ref={ref}
      role={role}
      sx={sx}
      translate={translate}
    />
  ),
);

const MemoizedBox = memo(Box);
MemoizedBox.displayName = "Box";

export { MemoizedBox as Box };
