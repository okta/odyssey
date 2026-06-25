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

import { Alert, AlertColor, AlertProps, AlertTitle } from "@mui/material";
import { memo } from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { useTranslation } from "./i18n.generated/i18n.js";
import { Link, LinkProps } from "./Link.js";
import { ScreenReaderText } from "./ScreenReaderText.js";

export const bannerRoleValues = ["status", "alert"] as const;
export const bannerSeverityValues: AlertColor[] = [
  "success",
  "info",
  "warning",
  "error",
];

export type BannerProps = {
  /**
   * Called when the user clicks the close button. When undefined, the close button is not shown.
   */
  onClose?: AlertProps["onClose"];
  /**
   * Sets the ARIA live-region role.
   * - If `'status'`, announces updates politely; use for non-critical dynamic messages.
   * - If `'alert'`, announces updates assertively; use for errors or urgent information.
   */
  role?: (typeof bannerRoleValues)[number];
  /**
   * Visual severity level that controls the banner's color and icon.
   */
  severity: (typeof bannerSeverityValues)[number];
  /**
   * Primary message text displayed inside the banner.
   */
  text: string;
} & Pick<HtmlProps, "testId" | "translate"> &
  // if linkText is provided, either linkUrl or onLinkClick must be provided
  (| {
        /** The `rel` attribute of the action link. */
        linkRel?: LinkProps["rel"];
        /** The `target` attribute of the action link (e.g., `"_blank"`). */
        linkTarget?: LinkProps["target"];
        /** Visible label for the action link rendered after the banner text. */
        linkText: string;
        /** The URL the action link navigates to. Required when `onLinkClick` is not provided. */
        linkUrl: LinkProps["href"];
        onLinkClick?: never;
      }
    | {
        linkRel?: never;
        linkTarget?: never;
        /** Visible label for the action link rendered after the banner text. */
        linkText: string;
        linkUrl?: never;
        /** Click handler for the action link. Required when `linkUrl` is not provided. */
        onLinkClick: LinkProps["onClick"];
      }
    | {
        linkRel?: never;
        linkTarget?: never;
        linkText?: never;
        linkUrl?: never;
        onLinkClick?: never;
      }
  );

/**
 * A full-width alert strip displayed at the top of a page or section to communicate
 * high-priority information such as errors, warnings, or status updates.
 */
const Banner = ({
  linkRel,
  linkTarget,
  linkText,
  linkUrl,
  onClose,
  onLinkClick,
  role,
  severity,
  testId,
  text,
  translate,
}: BannerProps) => {
  const { t } = useTranslation();

  return (
    <Alert
      data-se={testId}
      onClose={onClose}
      role={role}
      severity={severity}
      variant="banner"
    >
      <ScreenReaderText translate={translate}>
        {t(`severity.${severity}`)}
      </ScreenReaderText>
      <AlertTitle translate={translate}>{text}</AlertTitle>
      {linkText && (
        <Link
          href={linkUrl ?? "#"}
          onClick={onLinkClick}
          rel={linkRel}
          target={linkTarget}
          translate={translate}
          variant="monochrome"
        >
          {linkText}
        </Link>
      )}
    </Alert>
  );
};

const MemoizedBanner = memo(Banner);
MemoizedBanner.displayName = "Banner";

export { MemoizedBanner as Banner };
