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

import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps as MuiAccordionProps,
  AccordionSummary as MuiAccordionSummary,
} from "@mui/material";
import { memo, ReactNode } from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { ChevronDownIcon } from "./icons.generated/index.js";
import { Support } from "./Typography.js";
import { useUniqueId } from "./useUniqueId.js";

export const accordionVariantValues = ["default", "borderless"] as const;

export type AccordionProps = {
  /**
   * The content of the Accordion itself
   */
  children: ReactNode;
  /**
   * Defines IDs for the header and the content of the Accordion
   */
  id?: string;
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
   * The label text for the AccordionSummary
   */
  label: string;
  onChange?: MuiAccordionProps["onChange"];
  /**
   * Event fired when the expansion state of the accordion is changed
   */
  /**
   * Visual style for the accordion (default or borderless)
   */
  variant?: (typeof accordionVariantValues)[number];
} & (
  | {
      isDefaultExpanded?: never;
      isExpanded: boolean;
    }
  | {
      isDefaultExpanded?: boolean;
      isExpanded?: never;
    }
) &
  Pick<HtmlProps, "testId" | "translate">;

const Accordion = ({
  children,
  label,
  id: idOverride,
  isDefaultExpanded,
  isDisabled,
  isExpanded,
  onChange,
  testId,
  translate,
  variant = "default",
}: AccordionProps) => {
  const id = useUniqueId(idOverride);
  const headerId = `${id}-header`;
  const contentId = `${id}-content`;

  return (
    <MuiAccordion
      data-ods-variant={variant}
      data-se={testId}
      defaultExpanded={isDefaultExpanded}
      disabled={isDisabled}
      disableGutters
      expanded={isExpanded}
      onChange={onChange}
    >
      <MuiAccordionSummary
        aria-controls={contentId}
        expandIcon={<ChevronDownIcon />}
        id={headerId}
      >
        <Support component="div" translate={translate}>
          {label}
        </Support>
      </MuiAccordionSummary>
      <MuiAccordionDetails aria-labelledby={headerId}>
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

const MemoizedAccordion = memo(Accordion);
MemoizedAccordion.displayName = "Accordion";

export { MemoizedAccordion as Accordion };
