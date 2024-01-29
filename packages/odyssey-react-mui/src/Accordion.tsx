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
import type { AllowedProps } from "./AllowedProps";
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionProps as MuiAccordionProps,
} from "@mui/material";
import { ChevronDownIcon } from "./icons.generated";
import { Support } from "./Typography";
import { useUniqueId } from "./useUniqueId";

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
   * The label text for the AccordionSummary
   */
  label: string;
  /**
   * If true, the Accordion item will have a shadow.
   */
  hasShadow?: boolean;
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
  AllowedProps;

const Accordion = ({
  children,
  label,
  hasShadow = true,
  id: idOverride,
  isDefaultExpanded,
  isDisabled,
  isExpanded,
  onChange,
  translate,
}: AccordionProps) => {
  const id = useUniqueId(idOverride);
  const headerId = `${id}-header`;
  const contentId = `${id}-content`;
  return (
    <MuiAccordion
      defaultExpanded={isDefaultExpanded}
      disabled={isDisabled}
      disableGutters
      expanded={isExpanded}
      onChange={onChange}
      className={hasShadow ? `hasShadow` : undefined}
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
