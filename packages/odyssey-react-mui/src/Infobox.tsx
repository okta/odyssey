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

import { AlertColor } from "@mui/material";
import { memo, ReactNode } from "react";
import { Alert, AlertTitle, ScreenReaderText } from ".";
import { useTranslation } from "react-i18next";

export type InfoboxProps = {
  /**
   * The contents of the alert
   */
  children: ReactNode;
  /**
   * Sets the ARIA role of the alert
   * ("status" for something that dynamically updates, "alert" for errors, null for something
   * unchanging)
   */
  role?: "status" | "alert";
  /**
   * Determine the color and icon of the alert
   */
  severity: AlertColor;
  /**
   * The title of the alert
   */
  title?: string;
};

const Infobox = ({ children, role, severity, title }: InfoboxProps) => {
  const { t } = useTranslation();

  return (
    <Alert role={role} severity={severity} variant="infobox">
      <ScreenReaderText>{t(`severity.${severity}`)}: </ScreenReaderText>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
};

const MemoizedInfobox = memo(Infobox);
MemoizedInfobox.displayName = "Infobox";

export { MemoizedInfobox as Infobox };
