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

import { Tooltip as MuiTooltip } from "@mui/material";
import type { TooltipProps as MuiTooltipProps } from "@mui/material";

import { RefChild } from "./RefChild";
import { ReactElement } from "react";

export type TooltipProps = {
  children: ReactElement;
  ariaType: "description" | "label";
  text: string;
  placement?: MuiTooltipProps["placement"];
};

export const Tooltip = ({
  ariaType,
  children,
  text,
  placement,
}: TooltipProps) => (
  <MuiTooltip
    placement={placement}
    describeChild={ariaType === "description"}
    title={text}
  >
    <RefChild>{children}</RefChild>
  </MuiTooltip>
);
