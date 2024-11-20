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
  AccordionSummary as MuiAccordionSummary,
  AccordionProps as MuiAccordionProps,
} from "@mui/material";
import { PropsWithChildren, ReactNode, memo } from "react";

import type { HtmlProps } from "../../HtmlProps";
import { ChevronDownIcon } from "../../icons.generated";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Support } from "../../Typography";
import { useUniqueId } from "../../useUniqueId";

export type NavAccordionProps = {
  /**
   * The label text for the AccordionSummary
   */
  label: string;
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
    prop !== "odysseyDesignTokens" && prop !== "isIconVisible",
})<{
  odysseyDesignTokens: DesignTokens;
  isIconVisible: boolean;
}>(({ odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  marginInlineStart: isIconVisible ? odysseyDesignTokens.Spacing3 : 0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
  color: odysseyDesignTokens.TypographyColorHeading,
}));

const AccordionSummaryContainer = styled(MuiAccordionSummary, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isCompact" &&
    prop !== "isDisabled",
})<{
  odysseyDesignTokens: DesignTokens;
  isCompact?: boolean;
  isDisabled?: boolean;
}>(({ odysseyDesignTokens, isCompact, isDisabled }) => ({
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  paddingBlock: odysseyDesignTokens.Spacing3,
  paddingInline: odysseyDesignTokens.Spacing4,

  "&:focus-visible": {
    backgroundColor: "unset",
    outline: "none",
    boxShadow: `inset 0 0 0 2px ${odysseyDesignTokens.PalettePrimaryMain}`,
  },

  ...(isCompact && {
    paddingBlock: odysseyDesignTokens.Spacing2,
    minHeight: "unset",
  }),

  ...(!isDisabled && {
    "&:hover": {
      backgroundColor: odysseyDesignTokens.HueNeutral50,
    },
  }),
}));

const NavAccordion = ({
  children,
  label,
  id: idOverride,
  isCompact,
  isDefaultExpanded,
  isDisabled,
  isExpanded,
  translate,
  startIcon,
}: PropsWithChildren<NavAccordionProps>) => {
  const id = useUniqueId(idOverride);
  const headerId = `${id}-header`;
  const contentId = `${id}-content`;
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <MuiAccordion
      defaultExpanded={isDefaultExpanded}
      disabled={isDisabled}
      disableGutters
      expanded={isExpanded}
      className="nav-accordion"
    >
      <AccordionSummaryContainer
        className="nav-accordion-summary"
        aria-controls={contentId}
        expandIcon={<ChevronDownIcon />}
        id={headerId}
        odysseyDesignTokens={odysseyDesignTokens}
        isCompact={isCompact}
        isDisabled={isDisabled}
      >
        <Support component="div" translate={translate}>
          {startIcon && startIcon}
          <AccordionLabelContainer
            odysseyDesignTokens={odysseyDesignTokens}
            isIconVisible={Boolean(startIcon)}
          >
            {label}
          </AccordionLabelContainer>
        </Support>
      </AccordionSummaryContainer>
      <MuiAccordionDetails
        className="nav-accordion-details"
        aria-labelledby={headerId}
      >
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

const MemoizedNavAccordion = memo(NavAccordion);
MemoizedNavAccordion.displayName = "NavAccordion";

export { MemoizedNavAccordion as NavAccordion };
