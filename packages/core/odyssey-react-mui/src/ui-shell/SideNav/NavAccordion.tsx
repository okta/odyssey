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

import styled from "@emotion/styled";
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps as MuiAccordionProps,
  AccordionSummary as MuiAccordionSummary,
} from "@mui/material";
import { memo, PropsWithChildren, ReactNode } from "react";

import type { HtmlProps } from "../../HtmlProps.js";

import { ContrastColors } from "../../createContrastColors.js";
import { ChevronDownIcon } from "../../icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import {
  UiShellColors,
  useUiShellContext,
} from "../../ui-shell/UiShellProvider.js";
import { useUniqueId } from "../../useUniqueId.js";
import { useSideNavItemContent } from "./SideNavItemContentContext.js";

const SideNavAccordionContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "backgroundColor" && prop !== "fontColor",
})<{
  backgroundColor?: UiShellColors["sideNavBackgroundColor"];
  fontColor?: ContrastColors["fontColor"];
}>(({ backgroundColor, fontColor }) => ({
  width: "100%",

  ".MuiAccordion-root": {
    backgroundColor: backgroundColor,
    color: fontColor || "inherit",
  },
}));

export type NavAccordionProps = {
  /**
   * Defines IDs for the header and the content of the Accordion
   */
  id?: string;
  /**
   *  Determines if the Accordion component use compact layout
   */
  isCompact?: boolean;
  /**
   * Whether the item is expanded by default
   */
  isDefaultExpanded?: boolean;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * If true, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  isExpanded?: boolean;
  /**
   * The label text for the AccordionSummary
   */
  label: string;
  /**
   * Event fired when the expansion state of the accordion is changed
   */
  onChange?: MuiAccordionProps["onChange"];
  /**
   * The icon element to display at the start of the Nav Item
   */
  startIcon?: ReactNode;
} & Pick<HtmlProps, "testId" | "translate">;

const AccordionLabelContainer = styled("span", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isIconVisible" &&
    prop !== "sideNavContrastColors",
})<{
  isIconVisible: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors?: UiShellColors["sideNavContrastColors"];
}>(({ sideNavContrastColors, odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  marginInlineStart: isIconVisible ? odysseyDesignTokens.Spacing3 : 0,
  fontWeight: odysseyDesignTokens.TypographyWeightBody,
  color:
    sideNavContrastColors?.fontColor ||
    odysseyDesignTokens.TypographyColorHeading,

  ".Mui-disabled &": {
    color: odysseyDesignTokens.TypographyColorDisabled,

    ...(sideNavContrastColors?.itemDisabledFontColor && {
      color: sideNavContrastColors?.itemDisabledFontColor,
    }),
  },
}));

const AccordionSummaryContainer = styled(MuiAccordionSummary, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isCompact" &&
    prop !== "isDisabled" &&
    prop !== "sideNavContrastColors" &&
    prop !== "depth",
})<{
  depth?: number;
  isCompact?: boolean;
  isDisabled?: boolean;
  odysseyDesignTokens: DesignTokens;
  sideNavContrastColors?: UiShellColors["sideNavContrastColors"];
}>(
  ({
    odysseyDesignTokens,
    sideNavContrastColors,
    isCompact,
    isDisabled,
    depth = 1,
  }) => ({
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    paddingBlock: odysseyDesignTokens.Spacing3,
    paddingInlineStart: `calc(${odysseyDesignTokens.Spacing4} * ${depth})`,
    paddingInlineEnd: odysseyDesignTokens.Spacing4,
    alignItems: "center",

    ".MuiAccordionSummary-content": {
      alignItems: "center",
    },

    ...(isDisabled && {
      opacity: "1 !important",

      ...(sideNavContrastColors?.itemDisabledFontColor && {
        svg: {
          path: {
            fill: `${sideNavContrastColors.itemDisabledFontColor} !important`,
          },
        },
      }),
    }),

    ...(!isDisabled && {
      "&:hover": {
        backgroundColor: odysseyDesignTokens.HueNeutral50,
      },
    }),

    ...(!isDisabled &&
      sideNavContrastColors?.fontColor && {
        svg: {
          path: {
            fill: `${sideNavContrastColors.fontColor} !important`,
          },
        },
      }),

    ...(sideNavContrastColors?.itemHoverBackgroundColor && {
      ...(!isDisabled && {
        "&:hover": {
          backgroundColor: sideNavContrastColors.itemHoverBackgroundColor,
        },
      }),
    }),

    "&:focus-visible": {
      backgroundColor: "unset",
      outline: "none",
      boxShadow: `inset 0 0 0 2px ${odysseyDesignTokens.PalettePrimaryMain}`,

      ...(sideNavContrastColors?.focusRingColor && {
        boxShadow: `inset 0 0 0 2px ${sideNavContrastColors.focusRingColor}`,
      }),
    },

    ...(isCompact && {
      paddingBlock: odysseyDesignTokens.Spacing2,
      minHeight: "unset",
    }),
  }),
);

const NavAccordion = ({
  children,
  label,
  id: idOverride,
  isCompact,
  isDefaultExpanded,
  isDisabled,
  isExpanded,
  onChange,
  translate,
  startIcon,
}: PropsWithChildren<NavAccordionProps>) => {
  const id = useUniqueId(idOverride);
  const headerId = `${id}-header`;
  const contentId = `${id}-content`;
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const uiShellContext = useUiShellContext();
  const sideNavItemContentContext = useSideNavItemContent();

  return (
    <SideNavAccordionContainer
      backgroundColor={uiShellContext?.sideNavBackgroundColor}
    >
      <MuiAccordion
        className="nav-accordion"
        defaultExpanded={isDefaultExpanded}
        disabled={isDisabled}
        disableGutters
        expanded={isExpanded}
        onChange={onChange}
      >
        <AccordionSummaryContainer
          aria-controls={contentId}
          className="nav-accordion-summary"
          depth={sideNavItemContentContext.depth}
          expandIcon={<ChevronDownIcon />}
          id={headerId}
          isCompact={isCompact}
          isDisabled={isDisabled}
          odysseyDesignTokens={odysseyDesignTokens}
          sideNavContrastColors={uiShellContext?.sideNavContrastColors}
        >
          {startIcon && startIcon}
          <AccordionLabelContainer
            isIconVisible={Boolean(startIcon)}
            odysseyDesignTokens={odysseyDesignTokens}
            sideNavContrastColors={uiShellContext?.sideNavContrastColors}
            translate={translate}
          >
            {label}
          </AccordionLabelContainer>
        </AccordionSummaryContainer>
        <MuiAccordionDetails
          aria-labelledby={headerId}
          className="nav-accordion-details"
        >
          {children}
        </MuiAccordionDetails>
      </MuiAccordion>
    </SideNavAccordionContainer>
  );
};

const MemoizedNavAccordion = memo(NavAccordion);
MemoizedNavAccordion.displayName = "NavAccordion";

export { MemoizedNavAccordion as NavAccordion };
