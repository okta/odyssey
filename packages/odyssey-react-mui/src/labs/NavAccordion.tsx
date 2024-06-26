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

import { ReactNode, memo } from "react";
import type { HtmlProps } from "../HtmlProps";
import {
  Box,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionProps as MuiAccordionProps,
} from "@mui/material";
import { ChevronRightIcon } from "../icons.generated";
import { Support } from "../Typography";
import { useUniqueId } from "../useUniqueId";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import styled from "@emotion/styled";

export type NavAccordionProps = {
  /**
   * The content of the Accordion itself
   */
  children: ReactNode;
  /**
   * Defines IDs for the header and the content of the Accordion
   */
  id?: string;
  /**
   * The label text for the AccordionSummary
   */
  label: string;
  /**
   * Whether the item is expanded by default
   */
  isDefaultExpanded?: boolean;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the item is expanded
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
} & (
  | {
      isExpanded: boolean;
      isDefaultExpanded?: never;
    }
  | {
      isDefaultExpanded?: boolean;
      isExpanded?: never;
    }
) &
  Pick<HtmlProps, "testId" | "translate">;

const AccordionLabelContainer = styled("span", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isIconVisible",
})<{
  odysseyDesignTokens: DesignTokens;
  isIconVisible: boolean;
}>(({ odysseyDesignTokens, isIconVisible }) => ({
  width: "100%",
  marginLeft: `${isIconVisible ? odysseyDesignTokens.Spacing3 : 0}`,
  fontSize: odysseyDesignTokens.TypographyScale0,
  fontWeight: odysseyDesignTokens.TypographyWeightHeading,
  color: odysseyDesignTokens.TypographyColorHeading,
  alignSelf: "center",
}));

const NavAccordion = ({
  children,
  label,
  id: idOverride,
  isDefaultExpanded,
  isDisabled,
  isExpanded,
  translate,
  startIcon,
}: NavAccordionProps) => {
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
      sx={{
        border: "0 !important",
        width: "100%",
      }}
    >
      <MuiAccordionSummary
        sx={{
          padding: `${odysseyDesignTokens.Spacing2} ${odysseyDesignTokens.Spacing4}`,
          ".MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-90deg) !important",
          },
        }}
        aria-controls={contentId}
        expandIcon={<ChevronRightIcon />}
        id={headerId}
      >
        <Support component="div" translate={translate}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {startIcon && (
              <Box
                component="span"
                sx={{
                  marginTop: odysseyDesignTokens.Spacing1,
                }}
              >
                {startIcon}
              </Box>
            )}
            <AccordionLabelContainer
              odysseyDesignTokens={odysseyDesignTokens}
              isIconVisible={!!startIcon}
            >
              {label}
            </AccordionLabelContainer>
          </Box>
        </Support>
      </MuiAccordionSummary>
      <MuiAccordionDetails
        aria-labelledby={headerId}
        sx={{
          paddingTop: "0",
          paddingBottom: "0",
          paddingLeft: odysseyDesignTokens.Spacing2,
        }}
      >
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

const MemoizedNavAccordion = memo(NavAccordion);
MemoizedNavAccordion.displayName = "NavAccordion";

export { MemoizedNavAccordion as NavAccordion };
