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

import type { TooltipProps as MuiTooltipProps } from "@mui/material";

import { Tooltip as MuiTooltip } from "@mui/material";
import { memo, ReactElement } from "react";

import { HtmlProps } from "./HtmlProps.js";
import { MuiPropsChild } from "./MuiPropsChild.js";

export type TooltipProps = {
  /**
   * The type of ARIA attribute to use
   */
  ariaType: "description" | "label";
  /**
   * The content that triggers the Tooltip when hovered
   */
  children: ReactElement;
  /**
   * The placement of the Tooltip
   */
  placement?: MuiTooltipProps["placement"];
  /**
   * The text to display in the Tooltip
   */
  text: string;
} & Pick<HtmlProps, "testId" | "translate">;

const Tooltip = ({
  ariaType,
  children,
  placement = "top",
  testId,
  text,
  translate,
}: TooltipProps) => (
  <MuiTooltip
    data-se={testId}
    describeChild={ariaType === "description"}
    placement={placement}
    title={text}
    translate={translate}
  >
    <MuiPropsChild>{children}</MuiPropsChild>
  </MuiTooltip>
);

const MemoizedTooltip = memo(Tooltip);
MemoizedTooltip.displayName = "Tooltip";

export { MemoizedTooltip as Tooltip };
