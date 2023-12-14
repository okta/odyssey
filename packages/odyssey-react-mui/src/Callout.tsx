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

import type { AllowedProps } from "./AllowedProps";

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
   * The title of the Callout
   */
  title?: string;
} & AllowedProps;

const Callout = ({
  children,
  role,
  severity,
  testId,
  title,
  translate,
}: CalloutProps) => {
  const { t } = useTranslation();

  return (
    <Alert data-se={testId} role={role} severity={severity} variant="callout">
      <ScreenReaderText>{t(`severity.${severity}`)}</ScreenReaderText>
      {title && <AlertTitle translate={translate}>{title}</AlertTitle>}
      <Box component="div">{children}</Box>
    </Alert>
  );
};

const MemoizedCallout = memo(Callout);
MemoizedCallout.displayName = "Callout";

export { MemoizedCallout as Callout };
