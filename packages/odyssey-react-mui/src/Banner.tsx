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

import { AlertColor, AlertProps } from "@mui/material";
import { SyntheticEvent } from "react";
import { Alert, Link } from "./";

export interface BannerProps {
  /**
   * Determine the color and icon of the alert
   */
  severity?: AlertColor;
  /**
   * Sets the ARIA role of the alert
   * ("status" for something that dynamically updates, null for something
   * unchanging)
   */
  role?: "status" | undefined;
  /**
   * The text content of the alert
   */
  text: string;
  /**
   * The function that's fired when the user clicks the close button. If undefined,
   * the close button will not be shown.
   */
  onClose?: ((event: SyntheticEvent<Element, Event>) => void) | undefined;
  /**
   * If defined, the alert will include a link to the URL
   */
  linkUrl?: string;
  /**
   * If linkUrl is not undefined, this is the text of the link.
   * If left blank, it defaults to "Learn more".
   * Note that linkText does nothing if linkUrl is not defined
   */
  linkText?: string;
}

export const Banner = ({
  onClose,
  severity = "info",
  role,
  linkUrl,
  linkText = "Learn more",
  text,
}: BannerProps) => (
  <Alert role={role} variant="banner" severity={severity} onClose={onClose}>
    {text}
    {linkUrl && (
      <Link href={linkUrl} variant="monochrome">
        {linkText}
      </Link>
    )}
  </Alert>
);
