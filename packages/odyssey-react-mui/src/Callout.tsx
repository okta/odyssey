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

import { memo, ReactNode } from "react";
import { Alert, AlertTitle, Box } from "@mui/material";
import { ScreenReaderText } from "./ScreenReaderText";
import { useTranslation } from "react-i18next";

import type { SeleniumProps } from "./SeleniumProps";
import { Link } from "./Link";
import { Paragraph } from "./Typography";

export const calloutRoleValues = ["status", "alert"] as const;
export const calloutSeverityValues = [
  "success",
  "info",
  "warning",
  "error",
] as const;

export type CalloutProps = {
  /**
   * The contents of the Callout
   */
  children: ReactNode;
  /**
   * If linkUrl is not undefined, this is the text of the link.
   * If left blank, it defaults to "Learn more".
   * Note that linkText does nothing if linkUrl is not defined
   */
  linkText?: string;
  /**
   * If defined, the Toast will include a link to the URL
   */
  linkUrl?: string;
  /**
   * Sets the ARIA role of the Callout
   * ("status" for something that dynamically updates, "alert" for errors, null for something
   * unchanging)
   */
  role?: (typeof calloutRoleValues)[number];
  /**
   * Determine the color and icon of the Callout
   */
  severity: (typeof calloutSeverityValues)[number];
  /**
   * The text content of the Toast
   */
  text: string;
  /**
   * The title of the Callout
   */
  title?: string;
} & SeleniumProps;

const Callout = ({
  children,
  linkText,
  linkUrl,
  role,
  severity,
  testId,
  text,
  title,
}: CalloutProps) => {
  const { t } = useTranslation();

  return (
    <Alert data-se={testId} role={role} severity={severity} variant="callout">
      <ScreenReaderText>{t(`severity.${severity}`)}</ScreenReaderText>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children && <Box component="div">{children}</Box>}
      {text && <Paragraph>{text}</Paragraph>}
      {linkUrl && (
        <Link href={linkUrl} variant="monochrome">
          {linkText}
        </Link>
      )}
    </Alert>
  );
};

const MemoizedCallout = memo(Callout);
MemoizedCallout.displayName = "Callout";

export { MemoizedCallout as Callout };
