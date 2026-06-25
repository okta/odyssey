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

import styled from "@emotion/styled";
import { Tooltip as MuiTooltip } from "@mui/material";
import { memo, ReactNode } from "react";

import { HtmlProps } from "./HtmlProps.js";
import { InformationCircleIcon } from "./icons.generated/index.js";
import { useMuiProps } from "./MuiPropsContext.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";

const IconContainer = styled.span<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "inline-flex",
  transitionProperty: "border-color, box-shadow, outline",
  transitionDuration: odysseyDesignTokens.TransitionDurationMain,
  border: "1px solid transparent",

  "&:focus, &:focus-visible": {
    borderColor: odysseyDesignTokens.FocusOutlineColorPrimary,
    boxShadow: `0 0 0 1px ${odysseyDesignTokens.FocusOutlineColorPrimary}`,
    outline: `${odysseyDesignTokens.FocusOutlineWidthMain} ${odysseyDesignTokens.FocusOutlineStyle} transparent`,
    outlineOffset: odysseyDesignTokens.FocusOutlineOffsetTight,
  },

  svg: {
    display: "flex",
  },
}));

export type IconWithTooltipProps = {
  /**
   * The icon to render. Defaults to `InformationCircleIcon`.
   * @default `<InformationCircleIcon />`
   */
  IconComponent?: ReactNode;
  /**
   * The placement of the Tooltip.
   * @default "right"
   */
  placement?: MuiTooltipProps["placement"];
  /**
   * The text to display in the Tooltip
   */
  tooltipText: string;
} & Pick<HtmlProps, "testId" | "translate">;

/**
 * Displays an icon (defaulting to an information circle) that reveals a tooltip on focus or hover.
 * Use it to surface supplementary help text inline next to a label or form field.
 */
const IconWithTooltip = ({
  IconComponent = <InformationCircleIcon />,
  placement = "right",
  testId,
  tooltipText,
  translate,
}: IconWithTooltipProps) => {
  const muiProps = useMuiProps();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <MuiTooltip
      data-se={testId}
      describeChild
      placement={placement}
      tabIndex={0}
      title={tooltipText}
      translate={translate}
    >
      <IconContainer
        aria-label={tooltipText}
        odysseyDesignTokens={odysseyDesignTokens}
        role="img"
        {...muiProps}
      >
        {IconComponent}
      </IconContainer>
    </MuiTooltip>
  );
};

const MemoizedIconWithTooltip = memo(IconWithTooltip);
MemoizedIconWithTooltip.displayName = "IconWithTooltip";

export { MemoizedIconWithTooltip as IconWithTooltip };
